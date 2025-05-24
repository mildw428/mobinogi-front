'use client';
import React from 'react';
import { Title } from '../data/dummyTitles';
import { highlightText } from '@/app/utils/highlight';

interface TitleTableProps {
  titles: Title[];
  searchTerm?: string;
}

export default function TitleTable({ titles, searchTerm = '' }: TitleTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl shadow border bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="px-4 py-3 text-left font-bold text-gray-700 tracking-wide">번호</th>
            <th className="px-4 py-3 text-left font-bold text-gray-700 tracking-wide">이름</th>
            <th className="px-4 py-3 text-left font-bold text-gray-700 tracking-wide">장착 효과</th>
            <th className="px-4 py-3 text-left font-bold text-gray-700 tracking-wide">패시브 효과</th>
            <th className="px-4 py-3 text-left font-bold text-gray-700 tracking-wide">획득 조건</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {titles.map((title) => (
            <tr key={title.id} className="hover:bg-blue-50 transition">
              <td className="px-4 py-3 font-semibold text-gray-500 whitespace-nowrap">[{title.num}]</td>
              <td className="px-4 py-3 font-bold text-gray-900 whitespace-nowrap" dangerouslySetInnerHTML={{ __html: highlightText(title.name, searchTerm) }}></td>
              <td className="px-4 py-3 text-gray-700 whitespace-nowrap" dangerouslySetInnerHTML={{ __html: highlightText(title.equipEffect || '[X]', searchTerm) }}></td>
              <td className="px-4 py-3 text-gray-700 whitespace-nowrap" dangerouslySetInnerHTML={{ __html: highlightText(title.passiveEffect || '[X]', searchTerm) }}></td>
              <td className="px-4 py-3 text-gray-500 whitespace-nowrap" dangerouslySetInnerHTML={{ __html: highlightText(title.conditions, searchTerm) }}></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 