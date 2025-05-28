import React from 'react';

export default function LoadingState() {
  return (
    <div className="w-full flex justify-center items-center py-12">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em]"></div>
        <p className="mt-2 text-gray-600">룬 데이터를 불러오는 중...</p>
      </div>
    </div>
  );
}
