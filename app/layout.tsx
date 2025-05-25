import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "모비로그 - 마비노기 모바일 정보 사이트",
  description: "마비노기 모바일 게임의 스킬, 룬, 타이틀 정보를 한눈에 확인하세요. 실시간 검색과 필터링으로 원하는 정보를 빠르게 찾아보세요.",
  keywords: "마비노기 모바일, 모비노기, 스킬, 룬, 타이틀, 게임 정보, 마비노기 모바일 가이드",
  authors: [{ name: "모비로그" }],
  creator: "모비로그",
  publisher: "모비로그",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://mobilog.golrajo.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "모비로그 - 마비노기 모바일 정보 사이트",
    description: "마비노기 모바일 게임의 스킬, 룬, 타이틀 정보를 한눈에 확인하세요.",
    url: 'https://mobilog.golrajo.com',
    siteName: '모비로그',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: 'https://mobilog.golrajo.com/images/og-image.svg',
        width: 1200,
        height: 630,
        alt: '모비로그 - 마비노기 모바일 정보 사이트',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "모비로그 - 마비노기 모바일 정보 사이트",
    description: "마비노기 모바일 게임의 스킬, 룬, 타이틀 정보를 한눈에 확인하세요.",
    images: ['https://mobilog.golrajo.com/images/og-image.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'cdwci1-E5pXAF6bKnSPr2o9L2hb7TitFM6X1Hc7q30U',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "모비로그",
              "url": "https://mobilog.golrajo.com",
              "description": "마비노기 모바일 게임의 스킬, 룬, 타이틀 정보를 한눈에 확인하세요.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://mobilog.golrajo.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} bg-gray-100 min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
