'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Title } from '@/app/types/title';

interface TitleSearchProps {
  onTitlesChange: (titles: Title[]) => void;
  onSearchTermChange: (searchTerm: string) => void;
}

interface SearchParams {
  q: string;
  searchType: string;
  isPassiveEffect: boolean;
  isEquipEffect: boolean;
}

export default function TitleSearch({
  onTitlesChange,
  onSearchTermChange,
}: TitleSearchProps) {
  const [searchField, setSearchField] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isPassiveEffect, setIsPassiveEffect] = useState(false);
  const [isEquipEffect, setIsEquipEffect] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    const params: SearchParams = {
      q: searchTerm,
      searchType: searchField.toUpperCase(),
      isPassiveEffect,
      isEquipEffect,
    };
    searchTitles(params);
    onSearchTermChange(searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleEffectTypeChange = (type: string, checked: boolean) => {
    if (type === 'passiveEffect') {
      setIsPassiveEffect(checked);
    } else if (type === 'equipEffect') {
      setIsEquipEffect(checked);
    }
  };

  const searchTitles = async (params: SearchParams) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/titles/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error('API 요청 실패');
      }

      const data = await response.json();
      onTitlesChange(data.titles);
    } catch (error) {
      console.error('타이틀 검색 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchField, isPassiveEffect, isEquipEffect]);

  const getSearchFieldKorean = (field: string) => {
    switch (field) {
      case 'all': return '전체';
      case 'num': return '번호';
      case 'name': return '이름';
      case 'effect': return '효과';
      case 'conditions': return '획득 조건';
      default: return field;
    }
  };

  const getFilterPreview = () => {
    const effects = [];
    if (isEquipEffect) effects.push('장착 효과');
    if (isPassiveEffect) effects.push('패시브 효과');
    return `${getSearchFieldKorean(searchField)}${effects.length > 0 ? ` / ${effects.join(', ')}` : ''}`;
  };

  return (
    <div className="mb-6 flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        <div className="relative w-full md:w-auto" ref={filterRef}>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full md:w-auto flex items-center justify-between p-2 border rounded-lg bg-white hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium pr-3">필터</span>
            <span className="text-sm text-gray-500 truncate">
              {getFilterPreview()}
            </span>
          </button>
          {isFilterOpen && (
            <div className="fixed md:absolute inset-0 md:inset-auto z-50 md:z-10 md:right-0 md:mt-2 md:w-80 bg-white md:rounded-lg md:shadow-lg md:border">
              <div className="flex flex-col h-full md:h-auto">
                <div className="flex justify-between items-center p-4 border-b md:hidden">
                  <h3 className="text-lg font-medium">필터</h3>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 md:p-4">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <h3 className="font-medium text-gray-700">검색 필드</h3>
                      <select
                        value={searchField}
                        onChange={(e) => setSearchField(e.target.value)}
                        className="p-2 border rounded-lg focus:ring-1 focus:ring-blue-200"
                      >
                        <option value="all">전체</option>
                        <option value="num">번호</option>
                        <option value="name">이름</option>
                        <option value="effect">효과</option>
                        <option value="conditions">획득 조건</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <h3 className="font-medium text-gray-700">효과 유형</h3>
                      <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isEquipEffect}
                            onChange={(e) => handleEffectTypeChange('equipEffect', e.target.checked)}
                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span>장착 효과</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isPassiveEffect}
                            onChange={(e) => handleEffectTypeChange('passiveEffect', e.target.checked)}
                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span>패시브 효과</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t md:border-t-0">
                  <button
                    onClick={() => {
                      handleSearch();
                      setIsFilterOpen(false);
                    }}
                    className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    적용하기
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-200"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          검색
        </button>
      </div>
    </div>
  );
} 