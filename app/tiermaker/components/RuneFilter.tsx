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
            <div className="absolute z-10 right-0 mt-2 w-80 p-4 border rounded-lg bg-white shadow-lg">
              <div className="flex flex-col gap-6 max-h-[500px] overflow-y-auto pr-2">
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
          )}
        </div>
        <button
          onClick={onSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          검색
        </button>
      </div>
    </div>
  );
};

export default RuneFilter; 