'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Rune, RuneType } from '@/app/types/rune';
import { ItemGrade } from '@/app/types/item';
import { Job } from '@/app/types/job';
import { getRuneTypeKorean } from '@/app/types/rune';
import { getJobKorean } from '@/app/types/job';
import { getItemGradeKorean } from '@/app/types/item';

interface RuneSearchProps {
  onSearch: (params: SearchParams) => void;
  onRuneSelect?: (rune: Rune) => void;
}

interface SearchParams {
  term: string;
  types: RuneType[];
  grades: ItemGrade[];
  jobs: Job[];
}

export default function RuneSearch({ onSearch }: RuneSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<RuneType[]>([]);
  const [selectedGrades, setSelectedGrades] = useState<ItemGrade[]>([]);
  const [selectedJobs, setSelectedJobs] = useState<Job[]>([]);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTypeChange = (type: RuneType) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleGradeChange = (grade: ItemGrade) => {
    setSelectedGrades(prev => 
      prev.includes(grade)
        ? prev.filter(g => g !== grade)
        : [...prev, grade]
    );
  };

  const handleJobChange = (job: Job) => {
    setSelectedJobs(prev => 
      prev.includes(job)
        ? prev.filter(j => j !== job)
        : [...prev, job]
    );
  };

  const handleSearch = () => {
    onSearch({
      term: searchTerm,
      types: selectedTypes,
      grades: selectedGrades,
      jobs: selectedJobs
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getSelectedPreview = () => {
    const items = [];
    if (selectedTypes.length > 0) {
      items.push(`타입: ${selectedTypes.map(getRuneTypeKorean).join(', ')}`);
    }
    if (selectedGrades.length > 0) {
      items.push(`등급: ${selectedGrades.map(getItemGradeKorean).join(', ')}`);
    }
    if (selectedJobs.length > 0) {
      items.push(`직업: ${selectedJobs.map(getJobKorean).join(', ')}`);
    }
    return items.join(' | ');
  };

  return (
    <div className="w-full">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="룬 이름 검색..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="relative" ref={filterRef}>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            필터
          </button>
          {isFilterOpen && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10">
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">타입</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.values(RuneType).map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => handleTypeChange(type)}
                        className="mr-1"
                      />
                      <span className="text-sm">{getRuneTypeKorean(type)}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">등급</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.values(ItemGrade).map((grade) => (
                    <label key={grade} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedGrades.includes(grade)}
                        onChange={() => handleGradeChange(grade)}
                        className="mr-1"
                      />
                      <span className="text-sm">{getItemGradeKorean(grade)}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">직업</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.values(Job).map((job) => (
                    <label key={job} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedJobs.includes(job)}
                        onChange={() => handleJobChange(job)}
                        className="mr-1"
                      />
                      <span className="text-sm">{getJobKorean(job)}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          검색
        </button>
      </div>
      {getSelectedPreview() && (
        <div className="text-sm text-gray-600 mb-4">
          {getSelectedPreview()}
        </div>
      )}
    </div>
  );
} 