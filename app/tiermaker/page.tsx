'use client';

import React, { useEffect, useState, useRef } from 'react';
import TierMaker from './components/TierMaker';
import RuneFilter from './components/RuneFilter';
import { RuneType } from '@/app/types/rune';
import { ItemGrade } from '@/app/types/item';
import { Job } from '@/app/types/job';
import ItemBox from '../components/ItemBox';
import { getRuneTypeKorean } from '@/app/types/rune';
import Link from 'next/link';
import Script from 'next/script';

interface Rune {
  id: number;
  type: RuneType;
  grade : ItemGrade;
  name: string;
  description: string;
  imageUrl?: string;
}

interface TierDto {
  id: string;
  order: number;
  runeIds: number[];
}

interface TiermakerGetRs {
  id: string;
  name: string;
  tiers: TierDto[];
  waitingSlots: number[];
  runes: Rune[];
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

interface TiermakerListItem {
  id: string;
  name: string;
  createdAt: string;
  username: string;
}

const TierMakerPage = () => {
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
  const [initialTierData, setInitialTierData] = useState<{
    tiers: { name: string; order: number; runeIds: number[] }[];
    waitingSlots: number[];
  } | null>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const authModalRef = useRef<HTMLDivElement>(null);
  const tierMakerRef = useRef<TierMakerRef>(null);
  const [tiermakers, setTiermakers] = useState<TiermakerListItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');

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
    setSearchQuery(searchInput);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
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
    const fetchTiermaker = async () => {
      try {
        const pathSegments = window.location.pathname.split('/');
        const tiermakerId = pathSegments[pathSegments.length - 1];
        
        if (tiermakerId && tiermakerId !== 'tiermaker') {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/tiermaker/${tiermakerId}`);
          if (!response.ok) {
            throw new Error('티어메이커를 불러오는데 실패했습니다.');
          }
          
          const data: TiermakerGetRs = await response.json();
          setRunes(data.runes);
          setTiermakerName(data.name);
          
          const formattedTiers = data.tiers.map(tier => ({
            name: `Tier ${tier.order}`,
            order: tier.order,
            runeIds: tier.runeIds
          }));
          
          setInitialTierData({
            tiers: formattedTiers,
            waitingSlots: data.waitingSlots
          });
        } else {
          // 기본 룬 데이터 로드
          const params: SearchParams = {
            types: [RuneType.EMBLEM],
            itemGrades: [ItemGrade.LEGENDARY],
            jobs: []
          };
          fetchRunes(params);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTiermaker();
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
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    const fetchTiermakers = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (searchQuery) {
          queryParams.append('q', searchQuery);
        }
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/tiermaker/list?${queryParams.toString()}`);
        if (!response.ok) {
          throw new Error('티어메이커 목록을 불러오는데 실패했습니다.');
        }
        
        const data = await response.json();
        setTiermakers(data.tiermakers);
      } catch (err) {
        setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
      }
    };

    fetchTiermakers();
  }, [searchQuery]);

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
        id="tiermaker-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "마비노기 모바일 룬 티어메이커",
            "description": "마비노기 모바일의 룬 티어메이커를 통해 룬의 등급을 평가하고 공유하세요.",
            "url": "https://mobilog.golrajo.com/tiermaker",
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
          <h1 className="text-4xl font-extrabold mb-2 tracking-tight">룬 티어메이커</h1>
        </div>
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="티어메이커 검색..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                검색
              </button>
            </div>
          </div>
          <Link
            href="/tiermaker/create"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            새 티어메이커 만들기
          </Link>
        </div>

        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2">
                    제목
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                    작성자
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                    작성일
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tiermakers.map((tiermaker) => (
                  <tr 
                    key={tiermaker.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => window.location.href = `/tiermaker/${tiermaker.id}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {tiermaker.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {tiermaker.username}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {new Date(tiermaker.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default TierMakerPage; 