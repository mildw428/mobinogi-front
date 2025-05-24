'use client';
import React, { useState, useEffect } from 'react';
import RuneSearch from './components/RuneSearch';
import RuneCardList from './components/RuneCardList';
import RuneTable from './components/RuneTable';
import { Rune } from '@/app/types/rune';

export default function RunesPage() {
  const [runes, setRunes] = useState<Rune[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // 768px 미만일 때 모바일로 간주
    };

    // 초기 화면 크기 체크
    checkScreenSize();

    // 화면 크기 변경 시 이벤트 리스너
    window.addEventListener('resize', checkScreenSize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 rounded-2xl bg-white shadow-lg">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold mb-2 tracking-tight">룬 목록</h1>
      </div>
      <RuneSearch 
        onRunesChange={setRunes} 
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
      />
      {isMobile ? (
        <RuneCardList runes={runes} searchTerm={searchTerm} />
      ) : (
        <RuneTable runes={runes} searchTerm={searchTerm} />
      )}
    </div>
  );
} 