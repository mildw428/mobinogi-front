import React, { useRef, useEffect } from 'react';
import { RuneType, getRuneTypeKorean } from '@/app/types/rune';
import { ItemGrade, getItemGradeKorean } from '@/app/types/item';
import { Job, getJobKorean, JOB_CATEGORIES } from '@/app/types/job';

interface RuneFilterProps {
  selectedTypes: RuneType[];
  selectedGrades: ItemGrade[];
  selectedJobs: Job[];
  onTypeChange: (type: RuneType) => void;
  onGradeChange: (grade: ItemGrade) => void;
  onJobChange: (job: Job) => void;
  onSearch: () => void;
}

const RuneFilter: React.FC<RuneFilterProps> = ({
  selectedTypes,
  selectedGrades,
  selectedJobs,
  onTypeChange,
  onGradeChange,
  onJobChange,
  onSearch,
}) => {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
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

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-4 justify-end">
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
                      <h3 className="font-medium text-gray-700">타입</h3>
                      <div className="flex flex-wrap gap-2">
                        {Object.values(RuneType).map((type) => (
                          <label key={type} className="flex items-center gap-1">
                            <input
                              type="checkbox"
                              checked={selectedTypes.includes(type)}
                              onChange={() => onTypeChange(type)}
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
                              onChange={() => onGradeChange(grade)}
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
                                    onChange={() => onJobChange(job)}
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
                <div className="p-4 border-t md:border-t-0">
                  <button
                    onClick={() => {
                      onSearch();
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
    </div>
  );
};

export default RuneFilter; 