'use client';
import React, { useState, useEffect } from 'react';
import TitleSearch from './components/TitleSearch';
import TitleTable from './components/TitleTable';
import TitleCardList from './components/TitleCardList';
import { Title } from '@/app/types/title';
import Script from "next/script";

export default function TitlesPage() {
  const [titles, setTitles] = useState<Title[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      // Tailwind의 md breakpoint (768px) 기준으로 모바일/PC 구분
      setIsMobile(window.innerWidth < 768);
    };

    // 초기 로드 시 체크
    checkIsMobile();

    // 리사이즈 이벤트 리스너 등록
    window.addEventListener('resize', checkIsMobile);

    // 컴포넌트 언마운트 시 리스너 제거
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return (
    <>
      <Script
        id="titles-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "마비노기 모바일 타이틀 정보",
            "description": "마비노기 모바일의 모든 타이틀 정보를 확인하세요. 타이틀명, 능력치, 획득조건, 효과 등 상세 정보를 제공합니다.",
            "url": "https://mobilog.golrajo.com/titles",
            "about": {
              "@type": "Thing",
              "name": "마비노기 모바일 타이틀",
              "description": "마비노기 모바일 게임에서 획득할 수 있는 모든 타이틀 정보"
            }
          })
        }}
      />
      <div className="max-w-5xl mx-auto px-4 py-10 rounded-2xl bg-white shadow-lg">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold mb-2 tracking-tight">타이틀 목록</h1>
          <p className="text-gray-500 text-base">마비노기 모바일에서 획득 가능한 모든 타이틀 정보를 한눈에 확인하세요.</p>
        </div>
        <TitleSearch onTitlesChange={setTitles} onSearchTermChange={setSearchTerm} />
        {isMobile ? (
          <TitleCardList titles={titles} searchTerm={searchTerm} />
        ) : (
          <TitleTable titles={titles} searchTerm={searchTerm} />
        )}
      </div>
    </>
  );
} 