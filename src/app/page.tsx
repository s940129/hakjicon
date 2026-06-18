import SearchBar from "@/components/SearchBar";
import CategoryChips from "@/components/CategoryChips";
import SetupNotice from "@/components/SetupNotice";
import { getCategories } from "@/lib/queries";
import { supabaseConfigured } from "@/lib/env";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const configured = supabaseConfigured();
  const categories = configured ? await getCategories() : [];

  return (
    <section className="home">
      <h1 className="home-title">오늘은 어떤 책 살래? ✨</h1>
      <p className="home-sub">
        학지사 책 검색하고, 같은 분야 책도 같이 찾아봐 💖
      </p>
      <SearchBar />

      {configured ? (
        <>
          <h2 className="section-title">최애 분야 골라골라 💖</h2>
          <CategoryChips categories={categories} />
        </>
      ) : (
        <SetupNotice />
      )}
    </section>
  );
}
