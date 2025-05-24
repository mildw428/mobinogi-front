'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Job, getJobKorean, JOB_CATEGORIES } from '@/app/types/job';
import { Skill } from '../data/dummySkills';

interface SkillSearchProps {
  onSkillsChange: (skills: Skill[]) => void;
  onSearchTermChange: (term: string) => void;
}

export default function SkillSearch({
  onSkillsChange,
  onSearchTermChange,
}: SkillSearchProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedJobs, setSelectedJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
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

  const handleJobChange = (job: Job) => {
    const newJobs = selectedJobs.includes(job)
      ? selectedJobs.filter(j => j !== job)
      : [...selectedJobs, job];
    setSelectedJobs(newJobs);
  };

  const getSelectedItemsPreview = (items: Job[], getKoreanName: (item: Job) => string) => {
    if (items.length === 0) return '전체';
    if (items.length > 2) return `${getKoreanName(items[0])} 외 ${items.length - 1}개`;
    return items.map(getKoreanName).join(', ');
  };

  const handleSearch = () => {
    searchSkills();
    onSearchTermChange(searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const searchSkills = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/skills/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: searchTerm,
          jobs: selectedJobs,
        }),
      });

      if (!response.ok) {
        throw new Error('API 요청 실패');
      }

      const data = await response.json();
      onSkillsChange(data.skills);
    } catch (error) {
      console.error('스킬 검색 중 오류 발생:', error);
    }
  };

  React.useEffect(() => {
    searchSkills();
  }, [selectedJobs]);

  return (
    <div className="mb-6 flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        <div className="relative" ref={filterRef}>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center justify-between p-2 border rounded-lg bg-white hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium pr-3">필터</span>
            <span className="text-sm text-gray-500">
              {getSelectedItemsPreview(selectedJobs, getJobKorean)}
            </span>
          </button>
          {isFilterOpen && (
            <div className="absolute z-10 left-full ml-2 top-0 w-80 p-4 border rounded-lg bg-white shadow-lg">
              <div className="flex flex-col gap-6 max-h-[500px] overflow-y-auto pr-2">
                <div className="flex flex-col gap-2">
                  <h3 className="font-medium text-gray-700">직업</h3>
                  <div className="flex flex-col gap-3">
                    {JOB_CATEGORIES.map((category) => (
                      <div key={category.title} className="flex flex-col gap-1">
                        <span className="text-sm text-gray-600">{category.title}</span>
                        <div className="flex flex-wrap gap-2">
                          {category.jobs.map((job) => (
                            <label key={job} className="flex items-center gap-1">
                              <input
                                type="checkbox"
                                checked={selectedJobs.includes(job)}
                                onChange={() => handleJobChange(job)}
                                className="rounded border-gray-300"
                              />
                              <span>{getJobKorean(job)}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
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
          onChange={handleSearchChange}
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