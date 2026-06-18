import Link from "next/link";
import { redirect } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import BookGrid from "@/components/BookGrid";
import SetupNotice from "@/components/SetupNotice";
import { searchContents, getByCategory } from "@/lib/queries";
import { supabaseConfigured } from "@/lib/env";

export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q, category } = await searchParams;
  const query = (q ?? "").trim();
  const cat = (category ?? "").trim();

  // 빈 검색(키워드/분야 모두 없음) → 홈 기본 상태로
  if (!query && !cat) redirect("/");

  if (!supabaseConfigured()) return <SetupNotice />;

  const results = query
    ? await searchContents(query)
    : await getByCategory(cat);
  const heading = query ? `“${query}” 검색 결과` : `${cat} 분야`;

  return (
    <section>
      <SearchBar defaultValue={query} />
      <h1 className="results-heading">
        {heading} <span className="count">{results.length}건</span>
      </h1>

      {results.length === 0 ? (
        <p className="empty">
          검색 결과가 없습니다. 다른 키워드로 검색해 보세요.
        </p>
      ) : (
        <BookGrid books={results} />
      )}

      <p className="back">
        <Link href="/">← 홈으로</Link>
      </p>
    </section>
  );
}
