import React from 'react';

interface ErrorStateProps {
  errorMessage: string;
}

export default function ErrorState({ errorMessage }: ErrorStateProps) {
  return (
    <div className="w-full flex justify-center items-center py-12">
      <div className="text-center text-red-500">
        <p>{errorMessage}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
}
