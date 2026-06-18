import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "학지사 콘텐츠 검색·추천",
  description: "학지사 도서를 검색하고 같은 분야의 책을 추천받으세요.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <header className="site-header">
          <Link href="/" className="brand">
            학지사 콘텐츠
          </Link>
        </header>
        <main className="container">{children}</main>
        <footer className="site-footer">
          학지사 콘텐츠 검색·추천 미니서비스 (MVP)
        </footer>
      </body>
    </html>
  );
}
