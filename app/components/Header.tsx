'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md mb-10">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-800">
            모비로그
          </Link>
          
          {/* 모바일 햄버거 메뉴 버튼 */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="메뉴"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* 데스크톱 메뉴 */}
          <div className="hidden md:flex space-x-6">
            <Link href="/titles" className="text-gray-600 hover:text-gray-900">
              타이틀
            </Link>
            <Link href="/skills" className="text-gray-600 hover:text-gray-900">
              스킬
            </Link>
            <Link href="/runes" className="text-gray-600 hover:text-gray-900">
              룬
            </Link>
            <Link href="/tiermaker" className="text-gray-600 hover:text-gray-900">
              룬 티어메이커
            </Link>
            <Link href="https://moaform.com/q/gcLmBR" className="text-gray-600 hover:text-gray-900" target="_blank" rel="noopener noreferrer">
              문의하기
            </Link>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <Link href="/titles" className="block text-gray-600 hover:text-gray-900">
              타이틀
            </Link>
            <Link href="/skills" className="block text-gray-600 hover:text-gray-900">
              스킬
            </Link>
            <Link href="/runes" className="block text-gray-600 hover:text-gray-900">
              룬
            </Link>
            <Link href="/tiermaker" className="block text-gray-600 hover:text-gray-900">
              룬 티어메이커
            </Link>
            <Link href="https://moaform.com/q/gcLmBR" className="block text-gray-600 hover:text-gray-900" target="_blank" rel="noopener noreferrer">
              문의하기
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
} 