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
      const response = await fetch('http://localhost:8080/api/titles/search', {
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

  return (
    <div className="mb-6 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-stretch sm:items-center rounded-xl" ref={filterRef}>
        <select
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
          onClick={() => setIsFilterOpen(true)}
          className="p-2 border rounded-lg min-w-[120px] focus:ring-1 focus:ring-blue-200"
        >
          <option value="all">전체</option>
          <option value="num">번호</option>
          <option value="name">이름</option>
          <option value="effect">효과</option>
          <option value="conditions">획득 조건</option>
        </select>
        <div className="flex gap-2 flex-1">
          <input
            type="text"
            placeholder={`검색...`}
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
      <div className="flex gap-4">
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
  );
} 