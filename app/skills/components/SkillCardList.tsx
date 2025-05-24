'use client';
import React from 'react';
import { getJobKorean, Job } from '@/app/types/job';
import { highlightText } from '@/app/utils/highlight';
// import { Skill } from '../data/dummySkills'; // TODO: 더미 데이터 타입 정의 후 사용

interface Skill {
  id: string;
  name: string;
  job: Job;
  type: string;
  description: string;
  tags: string;
  runes: string; // 룬 효과
  imageUrl?: string; // 이미지 URL
}

interface SkillCardListProps {
  skills: Skill[];
  searchTerm: string;
}

export default function SkillCardList({ skills, searchTerm }: SkillCardListProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {skills.map((skill) => (
        <div key={skill.id} className="bg-white rounded-lg shadow border">
          {/* 스킬 이름 영역 */}
          <div className="mb-2 p-2 bg-gray-200 rounded-t-lg border-b flex flex-col items-center justify-center">
             {/* <img src={skill.imageUrl} alt='스킬' className="w-16 h-16 mb-2 object-contain" /> */}
             <span 
               className="text-lg font-extrabold text-gray-900"
               dangerouslySetInnerHTML={{ __html: highlightText(skill.name, searchTerm) }}
             />
          </div>

          <div className="p-2">
            {/* 계열 */}
            <div className="mb-2">
              <span className="inline-block bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">계열</span>
              <span className="ml-2 text-sm text-gray-700">{getJobKorean(skill.job)}</span>
            </div>
            {/* 타입 */}
            <div className="mb-2">
              <span className="inline-block bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">타입</span>
              <span className="ml-2 text-sm text-gray-700">{skill.type}</span>
            </div>
             {/* 설명 */}
             <div className="mb-2">
               <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">설명</span>
               <div 
                 className="mt-1 pl-4 text-sm text-gray-700"
                 dangerouslySetInnerHTML={{ 
                   __html: highlightText(skill.description, searchTerm)
                 }}
               />
             </div>
            {/* 룬 효과 */}
            <div> {/* 마지막 항목에는 mb 없음 */}
              <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">룬 효과</span>
              <div 
                className="mt-1 pl-4 text-sm text-gray-700"
                dangerouslySetInnerHTML={{ 
                  __html: highlightText(skill.runes, searchTerm)
                }}
              />
            </div>
            {/* 태그 (필요시 주석 해제 및 스타일 조정) */}
            {/* <div className="mt-2">
              <span className="inline-block bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">태그</span>
              <div className="mt-1 pl-4 text-sm text-gray-700">{skill.tags}</div>
            </div> */}
          </div>
        </div>
      ))}
    </div>
  );
} 