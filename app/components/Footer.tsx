
export default function Footer() {
  return (
    <footer className="bg-white mt-10">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} 모비로그. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 