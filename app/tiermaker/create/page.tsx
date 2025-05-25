'use client';

import React, { useEffect, useState, useRef } from 'react';
import TierMaker from '../components/TierMaker';
import RuneFilter from '../components/RuneFilter';
import { RuneType } from '@/app/types/rune';
import { ItemGrade } from '@/app/types/item';
import { Job } from '@/app/types/job';
import ItemBox from '@/app/components/ItemBox';
import { getRuneTypeKorean } from '@/app/types/rune';
import { useRouter } from 'next/navigation';
import Script from 'next/script';

interface Rune {
  id: number;
  type: RuneType;
  grade: ItemGrade;
  name: string;
  description: string;
  imageUrl?: string;
}

interface SearchParams {
  types: RuneType[];
  itemGrades: ItemGrade[];
  jobs: Job[];
}

interface TierMakerRef {
  getTierData: () => {
    tiers: {
      name: string;
      order: number;
      runeIds: number[];
    }[];
    waitingSlots: number[];
  };
}

const TierMakerCreatePage = () => {
  const router = useRouter();
  const [runes, setRunes] = useState<Rune[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showReloadAlert, setShowReloadAlert] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<RuneType[]>([]);
  const [selectedGrades, setSelectedGrades] = useState<ItemGrade[]>([]);
  const [selectedJobs, setSelectedJobs] = useState<Job[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [tiermakerName, setTiermakerName] = useState('');
  const [userIp, setUserIp] = useState<string>('');
  const alertRef = useRef<HTMLDivElement>(null);
  const authModalRef = useRef<HTMLDivElement>(null);
  const tierMakerRef = useRef<TierMakerRef>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (alertRef.current && !alertRef.current.contains(event.target as Node)) {
        setShowReloadAlert(false);
      }
      if (authModalRef.current && !authModalRef.current.contains(event.target as Node)) {
        setShowAuthModal(false);
      }
    };

    if (showReloadAlert || showAuthModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showReloadAlert, showAuthModal]);

  useEffect(() => {
    // IP 주소 가져오기
    const fetchIpAddress = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setUserIp(data.ip);
      } catch (error) {
        console.error('IP 주소를 가져오는데 실패했습니다:', error);
      }
    };

    fetchIpAddress();
  }, []);

  const handleTypeChange = (type: RuneType) => {
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type];
    setSelectedTypes(newTypes);
  };

  const handleGradeChange = (grade: ItemGrade) => {
    const newGrades = selectedGrades.includes(grade)
      ? selectedGrades.filter(g => g !== grade)
      : [...selectedGrades, grade];
    setSelectedGrades(newGrades);
  };

  const handleJobChange = (job: Job) => {
    const newJobs = selectedJobs.includes(job)
      ? selectedJobs.filter(j => j !== job)
      : [...selectedJobs, job];
    setSelectedJobs(newJobs);
  };

  const fetchRunes = async (params: SearchParams) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/runes/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error('룬 데이터를 불러오는데 실패했습니다.');
      }

      const data = await response.json();
      setRunes(data.runes);
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    setShowReloadAlert(true);
  };

  const handleConfirmReload = () => {
    setShowReloadAlert(false);
    const params: SearchParams = {
      types: selectedTypes,
      itemGrades: selectedGrades,
      jobs: selectedJobs,
    };
    fetchRunes(params);
  };

  const handleCancelReload = () => {
    setShowReloadAlert(false);
  };

  useEffect(() => {
    const params: SearchParams = {
      types: [RuneType.EMBLEM],
      itemGrades: [ItemGrade.LEGENDARY],
      jobs: []
    };
    fetchRunes(params);
  }, []);

  const items = runes.map((rune) => ({
    id: rune.id.toString(),
    content: (
      <div className="group relative">
        <div className="flex flex-col items-center">
          <ItemBox grade={rune.grade}>
            룬
          </ItemBox>
          <div className="text-sm font-medium">{rune.name}</div>
        </div>
        <div className="hidden group-hover:block absolute z-10 left-1/2 transform -translate-x-1/2 mt-2 w-64 p-3 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="text-sm">
            <div className="font-bold mb-1">{rune.name}</div>
            <div className="text-gray-600 mb-2">{getRuneTypeKorean(rune.type)}</div>
            <div
              className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: rune.description }}
            />
          </div>
        </div>
      </div>
    ),
  }));

  const handleSave = async () => {
    if (!tierMakerRef.current) return;
    setShowAuthModal(true);
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tierMakerRef.current) return;

    if (!tiermakerName.trim()) {
      setSaveError('티어메이커 이름을 입력해주세요.');
      return;
    }

    try {
      setIsSaving(true);
      setSaveError(null);

      const tierData = tierMakerRef.current.getTierData();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/tiermaker/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: tiermakerName,
          username,
          password,
          userIp,
          ...tierData
        }),
      });

      if (!response.ok) {
        throw new Error('티어메이커 저장에 실패했습니다.');
      }

      setShowAuthModal(false);
      setUsername('');
      setPassword('');
      setTiermakerName('');
      alert('티어메이커가 성공적으로 저장되었습니다.');
      router.push('/tiermaker');
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">로딩 중...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Script
        id="tiermaker-create-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "마비노기 모바일 룬 티어메이커 생성",
            "description": "마비노기 모바일의 룬 티어메이커를 생성하고 룬의 등급을 평가하세요.",
            "url": "https://mobilog.golrajo.com/tiermaker/create",
            "about": {
              "@type": "Thing",
              "name": "마비노기 모바일 룬 티어메이커",
              "description": "마비노기 모바일 게임의 룬 티어메이커"
            }
          })
        }}
      />
      <div className="max-w-5xl mx-auto px-4 py-10 rounded-2xl bg-white shadow-lg">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold mb-2 tracking-tight">룬 티어메이커 생성</h1>
        </div>

        <RuneFilter
          selectedTypes={selectedTypes}
          selectedGrades={selectedGrades}
          selectedJobs={selectedJobs}
          onTypeChange={handleTypeChange}
          onGradeChange={handleGradeChange}
          onJobChange={handleJobChange}
          onSearch={handleSearch}
        />

        {showReloadAlert && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              ref={alertRef}
              className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4"
            >
              <h3 className="text-lg font-bold mb-4">알림</h3>
              <p className="text-gray-700 mb-6">
                룬 목록을 새로 불러오면 현재 설정된 티어가 모두 초기화됩니다.
                계속하시겠습니까?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleCancelReload}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  취소
                </button>
                <button
                  onClick={handleConfirmReload}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        )}

        {showAuthModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              ref={authModalRef}
              className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4"
            >
              <h3 className="text-lg font-bold mb-4">저장하기</h3>
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                <div>
                  <label htmlFor="tiermakerName" className="block text-sm font-medium text-gray-700 mb-1">
                    게시글 제목
                  </label>
                  <input
                    type="text"
                    id="tiermakerName"
                    value={tiermakerName}
                    onChange={(e) => setTiermakerName(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-200"
                    required
                    placeholder="게시글 제목을 입력하세요"
                  />
                </div>
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    사용자 이름
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-200"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    비밀번호
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-200"
                    required
                  />
                </div>
                {saveError && (
                  <div className="text-red-500 text-sm">{saveError}</div>
                )}
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowAuthModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
                  >
                    {isSaving ? '저장 중...' : '저장하기'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-6">
          <TierMaker ref={tierMakerRef} items={items} />
        </div>
        <div className="flex justify-end mb-4">
            <button
              onClick={handleSave}
              className="px-4 py-2 mt-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              저장하기
            </button>
          </div>
      </div>
    </>
  );
};

export default TierMakerCreatePage; 