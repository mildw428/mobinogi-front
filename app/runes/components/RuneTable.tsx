'use client';
import React from 'react';
import { Rune, getRuneTypeKorean } from '@/app/types/rune';
import { getJobKorean } from '@/app/types/job'
import ItemBox from '@/app/components/ItemBox';
import { highlightText } from '@/app/utils/highlight';
// import { Rune } from '../data/dummyRunes'; // TODO: 더미 데이터 타입 정의 후 사용


interface RuneTableProps {
  runes: Rune[];
  searchTerm: string;
}

export default function RuneTable({ runes, searchTerm }: RuneTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl shadow border bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="px-4 py-3 text-left font-bold text-gray-700 tracking-wide"></th>
            <th className="px-4 py-3 text-left font-bold text-gray-700 tracking-wide">이름</th>
            <th className="px-4 py-3 text-left font-bold text-gray-700 tracking-wide">직업</th>
            <th className="px-4 py-3 text-left font-bold text-gray-700 tracking-wide">타입</th>
            <th className="px-4 py-3 text-left font-bold text-gray-700 tracking-wide">효과/설명</th>
            {/* <th className="px-4 py-3 text-left font-bold text-gray-700 tracking-wide">획득처</th> */}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {runes.map((rune) => (
            <tr key={rune.id} className="hover:bg-blue-50 transition">
              <td className="px-4 py-3">
                <ItemBox grade={rune.grade}>
                  룬
                  {/* <img src={rune.imageUrl} alt='룬' className="w-12 h-12 object-contain" /> */}
                </ItemBox>
              </td>
              <td 
                className="px-4 py-3 font-bold text-gray-900 whitespace-nowrap"
                dangerouslySetInnerHTML={{ __html: highlightText(rune.name, searchTerm) }}
              />
              <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{getJobKorean(rune.job)}</td>
              <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{getRuneTypeKorean(rune.type)}</td>
              <td 
                className="px-4 py-3 text-gray-700"
                dangerouslySetInnerHTML={{ 
                  __html: highlightText(rune.description, searchTerm)
                }}
              />
              {/* <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{rune.acquisition}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 