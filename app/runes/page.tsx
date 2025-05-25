'use client';
import React, { useState, useEffect } from 'react';
import RuneSearch from './components/RuneSearch';
import RuneCardList from './components/RuneCardList';
import RuneTable from './components/RuneTable';
import { Rune } from '@/app/types/rune';
import Script from "next/script";

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
    <>
      <Script
        id="runes-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "마비노기 모바일 룬 정보",
            "description": "마비노기 모바일의 모든 룬 정보를 확인하세요. 룬명, 속성, 효과, 획득처, 설명 등 상세 정보를 제공합니다.",
            "url": "https://mobilog.golrajo.com/runes",
            "about": {
              "@type": "Thing",
              "name": "마비노기 모바일 룬",
              "description": "마비노기 모바일 게임에서 사용할 수 있는 모든 룬 정보"
            }
          })
        }}
      />
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
    </>
  );
} 