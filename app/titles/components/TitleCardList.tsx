'use client';
import React from 'react';
import { Title } from '../data/dummyTitles';
import { highlightText } from '@/app/utils/highlight';

interface TitleCardListProps {
  titles: Title[];
  searchTerm?: string;
}

export default function TitleCardList({ titles, searchTerm = '' }: TitleCardListProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {titles.map((title) => (
        <div key={title.id} className="bg-white rounded-lg shadow border">
          <div className="mb-2 p-2 bg-gray-200 rounded-t-lg border-b">
            <span className="text-base font-bold text-gray-800 mr-2">[{title.num}]</span>
            <span className="text-lg font-extrabold text-gray-900" dangerouslySetInnerHTML={{ __html: highlightText(title.name, searchTerm) }}></span>
          </div>
          <div className="p-2 mb-3">
            <div className="mb-3">
              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-gray-200 dark:text-gray-900">장착 효과</span>
              <div className="mt-1 pl-4 text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: highlightText(title.equipEffect || '[X]', searchTerm) }}></div>
            </div>
            <div className="mb-3">
              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-gray-200 dark:text-gray-900">패시브 효과</span>
              <div className="mt-1 pl-4 text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: highlightText(title.passiveEffect || '[X]', searchTerm) }}></div>
            </div>
            <div>
              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-gray-200 dark:text-gray-900">획득 조건</span>
              <div className="mt-1 pl-4 text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: highlightText(title.conditions, searchTerm) }}></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 