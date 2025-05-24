'use client';
import ItemBox from '@/app/components/ItemBox';
import { ItemGrade, getItemGradeKorean } from '@/app/types/item';
import { Rune, RuneType, getRuneTypeKorean } from '@/app/types/rune';
import { Job, getJobKorean } from '@/app/types/job'
import React from 'react';
import { highlightText } from '@/app/utils/highlight';
// import { Rune } from '../data/dummyRunes'; // TODO: 더미 데이터 타입 정의 후 사용

interface RuneCardListProps {
  runes: Rune[];
  searchTerm: string;
}

export default function RuneCardList({ runes, searchTerm }: RuneCardListProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {runes.map((rune) => (
        <div key={rune.id} className="bg-white rounded-lg shadow border">
          {/* 룬명 영역 */}
          <div className="mb-2 p-2 bg-gray-200 rounded-t-lg border-b flex flex-col items-center justify-center">
            <ItemBox grade={rune.grade}>
              룬{/* <img src={rune.imageUrl} alt='룬' className="w-16 h-16 mb-2 object-contain" /> */}
            </ItemBox>
            <span 
              className="text-lg font-extrabold text-gray-900 mt-2"
              dangerouslySetInnerHTML={{ __html: highlightText(rune.name, searchTerm) }}
            />
          </div>

          <div className="p-2">
            {/* 직업 */}
            <div className="mb-2">
              <span className="inline-block bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">직업</span>
              <span className="ml-2 text-sm text-gray-700">{getJobKorean(rune.job)}</span>
            </div>
            {/* 타입 */}
            <div className="mb-2">
              <span className="inline-block bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">타입</span>
              <span className="ml-2 text-sm text-gray-700">{getRuneTypeKorean(rune.type)}</span>
            </div>


            {/* 효과/설명 */}
            <div> {/* 마지막 항목에는 mb 없음 */}
              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">효과/설명</span>
              <div 
                className="mt-1 pl-4 text-sm text-gray-700"
                dangerouslySetInnerHTML={{ 
                  __html: highlightText(rune.description, searchTerm)
                }}
              ></div>
            </div>
            {/* 획득처 (필요시 주석 해제 및 스타일 조정) */}
            {/* <div className="mt-2">
              <span className="inline-block bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">획득처</span>
              <div className="mt-1 pl-4 text-sm text-gray-700">{rune.acquisition}</div>
            </div> */}
          </div>
        </div>
      ))}
    </div>
  );
} 