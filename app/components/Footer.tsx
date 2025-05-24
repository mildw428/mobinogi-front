import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white mt-10">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* <div className="flex space-x-6">
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              소개
            </Link>
            <Link href="/terms" className="text-gray-600 hover:text-gray-900">
              이용약관
            </Link>
            <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
              개인정보처리방침
            </Link>
          </div> */}
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} 모비로그. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 