import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Black_Han_Sans, Jua } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const display = Black_Han_Sans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
});

const sans = Jua({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "학지사 콘텐츠 검색·추천",
  description: "학지사 도서를 검색하고 같은 분야의 책을 추천받으세요.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className={`${display.variable} ${sans.variable}`}>
      <body>
        <header className="site-header">
          <Link href="/" className="brand">
            학지사 야호~ ✨♡
          </Link>
          <span className="brand-tag">최애 책 찾으러 가즈아 ✨</span>
        </header>
        <div className="top-ment">오이데 오이데~ 파라파라 추면서 책 보러 가자 💃🪩✨</div>
        <main className="container">{children}</main>
        <footer className="site-footer">
          <span className="quote">책으로 더 빛나는 나 ⭐️</span>
          학지사 콘텐츠 검색·추천 미니서비스
        </footer>
      </body>
    </html>
  );
}
