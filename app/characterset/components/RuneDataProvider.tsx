import React, { useState, useEffect } from 'react';
import { Rune } from '@/app/types/rune';

interface RuneDataProviderProps {
  children: (data: {
    allRunes: Rune[];
    isLoading: boolean;
    error: string | null;
  }) => React.ReactNode;
}

export default function RuneDataProvider({ children }: RuneDataProviderProps) {
  const [allRunes, setAllRunes] = useState<Rune[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch all runes on initial load
  useEffect(() => {
    const fetchAllRunes = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/runes/search`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            term: '',
            types: [],
            grades: [],
            jobs: [],
          }),
        });
        
        const data = await response.json();
        setAllRunes(data.runes);
        setError(null);
      } catch (err) {
        console.error('룬 데이터 로딩 중 오류 발생:', err);
        setError('룬 데이터를 불러오는데 실패했습니다. 다시 시도해주세요.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAllRunes();
  }, []);

  return <>{children({ allRunes, isLoading, error })}</>;
}
