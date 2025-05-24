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

interface SkillTableProps {
  skills: Skill[];
  searchTerm: string;
}

export default function SkillTable({ skills, searchTerm }: SkillTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl shadow border bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 border-b">
          <tr>
            {/* <th className="px-4 py-3 text-left font-bold text-gray-700 tracking-wide"></th> */}
            <th className="px-4 py-3 text-left font-bold text-gray-700 tracking-wide">스킬명</th>
            <th className="px-4 py-3 text-left font-bold text-gray-700 tracking-wide">계열</th>
            <th className="px-4 py-3 text-left font-bold text-gray-700 tracking-wide">타입</th>
            <th className="px-4 py-3 text-left font-bold text-gray-700 tracking-wide">설명</th>
            <th className="px-4 py-3 text-left font-bold text-gray-700 tracking-wide">룬 효과</th>
            {/* <th className="px-4 py-3 text-left font-bold text-gray-700 tracking-wide">태그</th> */}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {skills.map((skill) => (
            <tr key={skill.id} className="hover:bg-blue-50 transition">
              {/* <td className="px-4 py-3">
                <img src={skill.imageUrl} alt='스킬' className="w-12 h-12 object-contain" />
              </td> */}
              <td 
                className="px-4 py-3 font-bold text-gray-900 whitespace-nowrap"
                dangerouslySetInnerHTML={{ __html: highlightText(skill.name, searchTerm) }}
              />
              <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{getJobKorean(skill.job)}</td>
              <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{skill.type}</td>
              <td 
                className="px-4 py-3 text-gray-700"
                dangerouslySetInnerHTML={{ 
                  __html: highlightText(skill.description, searchTerm)
                }}
              />
              <td 
                className="px-4 py-3 text-gray-700"
                dangerouslySetInnerHTML={{ 
                  __html: highlightText(skill.runes, searchTerm)
                }}
              />
              {/* <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{skill.tags}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 