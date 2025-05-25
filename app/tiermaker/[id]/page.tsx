'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import TierMaker from '../components/TierMaker';
import { RuneType } from '@/app/types/rune';
import { ItemGrade } from '@/app/types/item';
import ItemBox from '@/app/components/ItemBox';
import { getRuneTypeKorean } from '@/app/types/rune';
import Script from 'next/script';

interface Rune {
  id: number;
  type: RuneType;
  grade: ItemGrade;
  name: string;
  description: string;
  imageUrl?: string;
}

interface TierDto {
  id: string;
  order: number;
  runeIds: number[];
}

interface TiermakerGetRs {
  id: string;
  name: string;
  tiers: TierDto[];
  waitingSlots: number[];
  runes: Rune[];
}

const TierMakerViewPage = () => {
  const params = useParams();
  const id = params.id as string;
  const [runes, setRunes] = useState<Rune[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialTierData, setInitialTierData] = useState<{
    tiers: { name: string; order: number; runeIds: number[] }[];
    waitingSlots: number[];
  } | null>(null);

  useEffect(() => {
    const fetchTiermaker = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/tiermaker/${id}`);
        if (!response.ok) {
          throw new Error('티어메이커를 불러오는데 실패했습니다.');
        }
        
        const data: TiermakerGetRs = await response.json();
        setRunes(data.runes);
        
        const formattedTiers = data.tiers.map(tier => ({
          name: `Tier ${tier.order}`,
          order: tier.order,
          runeIds: tier.runeIds
        }));
        
        setInitialTierData({
          tiers: formattedTiers,
          waitingSlots: data.waitingSlots
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTiermaker();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">로딩 중...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  const items = runes.map((rune) => ({
    id: rune.id.toString(),
    content: (
      <div className="group relative">
        <div className="flex flex-col items-center">
          <ItemBox grade={rune.grade}>
            룬
          </ItemBox>
          <div className="text-sm font-medium">{rune.name}</div>
        </div>
        <div className="hidden group-hover:block absolute z-10 left-1/2 transform -translate-x-1/2 mt-2 w-64 p-3 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="text-sm">
            <div className="font-bold mb-1">{rune.name}</div>
            <div className="text-gray-600 mb-2">{getRuneTypeKorean(rune.type)}</div>
            <div 
              className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: rune.description }}
            />
          </div>
        </div>
      </div>
    ),
  }));

  return (
    <>
      <Script
        id="tiermaker-view-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "마비노기 모바일 룬 티어메이커",
            "description": "마비노기 모바일의 룬 티어메이커를 통해 룬의 등급을 평가하고 공유하세요.",
            "url": `https://mobilog.golrajo.com/tiermaker/${id}`,
            "about": {
              "@type": "Thing",
              "name": "마비노기 모바일 룬 티어메이커",
              "description": "마비노기 모바일 게임의 룬 티어메이커"
            }
          })
        }}
      />
      <div className="max-w-5xl mx-auto px-4 py-10 rounded-2xl bg-white shadow-lg">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold mb-2 tracking-tight">룬 티어메이커</h1>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <TierMaker 
            items={items} 
            initialData={initialTierData}
          />
        </div>
      </div>
    </>
  );
};

export default TierMakerViewPage; 