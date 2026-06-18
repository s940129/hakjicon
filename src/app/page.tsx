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
      <h1 className="home-title">무엇을 찾고 계신가요?</h1>
      <p className="home-sub">
        학지사 도서를 검색하고, 같은 분야의 책을 추천받으세요.
      </p>
      <SearchBar />

      {configured ? (
        <>
          <h2 className="section-title">분야 둘러보기</h2>
          <CategoryChips categories={categories} />
        </>
      ) : (
        <SetupNotice />
      )}
    </section>
  );
}
