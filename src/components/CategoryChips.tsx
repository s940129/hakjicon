import Link from "next/link";

// 분야별 갸루 이모지 (없는 분야는 기본값)
const EMOJI: Record<string, string> = {
  상담: "💬",
  교육: "📚",
  특수교육: "🌈",
  사회복지: "🤝",
  유아교육: "🧸",
  심리: "🧠",
};

export default function CategoryChips({ categories }: { categories: string[] }) {
  if (categories.length === 0) return null;
  return (
    <div className="chips">
      {categories.map((c) => (
        <Link
          key={c}
          href={`/search?category=${encodeURIComponent(c)}`}
          className="chip"
        >
          {EMOJI[c] ?? "💕"} {c}
        </Link>
      ))}
    </div>
  );
}
