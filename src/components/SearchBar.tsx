"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function SearchBar({ defaultValue = "" }: { defaultValue?: string }) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = value.trim();
    if (!q) return; // 빈 검색어 → 아무 동작 안 함 (홈 기본 상태 유지)
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <form className="searchbar" onSubmit={onSubmit} role="search">
      <input
        type="search"
        name="q"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="도서명, 저자, 키워드로 검색"
        aria-label="콘텐츠 검색"
      />
      <button type="submit">검색</button>
    </form>
  );
}
