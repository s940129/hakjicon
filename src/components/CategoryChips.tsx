import Link from "next/link";

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
          {c}
        </Link>
      ))}
    </div>
  );
}
