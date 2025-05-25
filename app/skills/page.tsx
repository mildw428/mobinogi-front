'use client';
import React, { useState, useEffect } from 'react';
import SkillSearch from './components/SkillSearch';
import SkillTable from './components/SkillTable';
import SkillCardList from './components/SkillCardList';
import { Skill } from './data/dummySkills';
import Script from "next/script";

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
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
        id="skills-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "마비노기 모바일 스킬 정보",
            "description": "마비노기 모바일의 모든 스킬 정보를 확인하세요. 스킬명, 계열, 설명, 수치, 습득 조건 등 상세 정보를 제공합니다.",
            "url": "https://mobilog.golrajo.com/skills",
            "about": {
              "@type": "Thing",
              "name": "마비노기 모바일 스킬",
              "description": "마비노기 모바일 게임에서 사용할 수 있는 모든 스킬 정보"
            }
          })
        }}
      />
      <div className="max-w-5xl mx-auto px-4 py-10 rounded-2xl bg-white shadow-lg">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold mb-2 tracking-tight">스킬 목록</h1>
          <p className="text-gray-500 text-base">마비노기 모바일에서 사용 가능한 스킬 정보를 확인하세요.</p>
        </div>
        <SkillSearch onSkillsChange={setSkills} onSearchTermChange={setSearchTerm} />
        {isMobile ? (
          <SkillCardList skills={skills} searchTerm={searchTerm} /> // 모바일일 때 카드 뷰
        ) : (
          <SkillTable skills={skills} searchTerm={searchTerm} /> // PC일 때 테이블 뷰
        )}
      </div>
    </>
  );
} 