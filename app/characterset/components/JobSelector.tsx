import React from 'react';
import { Job, JOB_CATEGORIES, getJobKorean } from '@/app/types/job';

interface JobSelectorProps {
  selectedJob: Job | null;
  onJobChange: (job: Job | null) => void;
}

export default function JobSelector({ selectedJob, onJobChange }: JobSelectorProps) {
  const handleJobChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onJobChange(value ? value as Job : null);
  };

  return (
    <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">직업 선택</h2>
      <div className="max-w-xs">
        <select 
          value={selectedJob || ''}
          onChange={handleJobChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">직업을 선택하세요</option>
          {JOB_CATEGORIES.map((category) => (
            <optgroup key={category.title} label={category.title}>
              {category.jobs.map((job) => (
                <option key={job} value={job}>
                  {getJobKorean(job)}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
      {selectedJob && (
        <div className="mt-3 text-sm text-gray-600">
          선택된 직업: <span className="font-medium text-gray-800">{getJobKorean(selectedJob)}</span>
        </div>
      )}
    </div>
  );
}
