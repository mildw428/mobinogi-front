'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Job, getJobKorean, JOB_CATEGORIES } from '@/app/types/job';
import { RuneType, getRuneTypeKorean } from '@/app/types/rune';
import { ItemGrade, getItemGradeKorean } from '@/app/types/item';
import { Rune } from '@/app/types/rune';

interface RuneSearchProps {
  onRunesChange: (runes: Rune[]) => void;
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
}

interface SearchParams {
  q: string;
  types: RuneType[];
  itemGrades: ItemGrade[];
  jobs: Job[];
}

export default function RuneSearch({
  onRunesChange,
  searchTerm,
  onSearchTermChange,
}: RuneSearchProps) {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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

  const getSelectedItemsPreview = <T,>(items: T[], getKoreanName: (item: T) => string) => {
    if (items.length === 0) return '전체';
    if (items.length > 2) return `${getKoreanName(items[0])} 외 ${items.length - 1}개`;
    return items.map(getKoreanName).join(', ');
  };

  const getFilterPreview = () => {
    const typePreview = getSelectedItemsPreview(selectedTypes, getRuneTypeKorean);
    const gradePreview = getSelectedItemsPreview(selectedGrades, getItemGradeKorean);
    const jobPreview = getSelectedItemsPreview(selectedJobs, getJobKorean);
    
    return `${typePreview} / ${gradePreview} / ${jobPreview}`;
  };

  const searchRunes = async (params: SearchParams) => {
    try {
      const response = await fetch('http://localhost:8080/api/runes/search', {
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
      onRunesChange(data.runes);
    } catch (error) {
      console.error('룬 검색 중 오류 발생:', error);
    }
  };

  const handleSearch = () => {
    const params: SearchParams = {
      q: localSearchTerm,
      types: selectedTypes,
      itemGrades: selectedGrades,
      jobs: selectedJobs,
    };
    searchRunes(params);
    onSearchTermChange(localSearchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    handleSearch();
  }, [selectedTypes, selectedGrades, selectedJobs]);

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
              {getFilterPreview()}
            </span>
          </button>
          {isFilterOpen && (
            <div className="absolute z-10 left-full ml-2 top-0 w-80 p-4 border rounded-lg bg-white shadow-lg">
              <div className="flex flex-col gap-6 max-h-[500px] overflow-y-auto pr-2">
                <div className="flex flex-col gap-2">
                  <h3 className="font-medium text-gray-700">타입</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.values(RuneType).map((type) => (
                      <label key={type} className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={selectedTypes.includes(type)}
                          onChange={() => handleTypeChange(type)}
                          className="rounded border-gray-300"
                        />
                        <span>{getRuneTypeKorean(type)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="font-medium text-gray-700">등급</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.values(ItemGrade).map((grade) => (
                      <label key={grade} className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          checked={selectedGrades.includes(grade)}
                          onChange={() => handleGradeChange(grade)}
                          className="rounded border-gray-300"
                        />
                        <span>{getItemGradeKorean(grade)}</span>
                      </label>
                    ))}
                  </div>
                </div>

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
          value={localSearchTerm}
          onChange={(e) => setLocalSearchTerm(e.target.value)}
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