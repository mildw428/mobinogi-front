'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md mb-10">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-start">
          <Link href="/" className="text-xl mr-10 font-bold text-gray-800">
            모비로그
          </Link>
          <div className="space-x-6">
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
      </nav>
    </header>
  );
} 