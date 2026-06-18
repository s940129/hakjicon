import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Content } from "@/lib/types";

const COLUMNS = "id, title, author, category, description, cover_url, isbn, link";

/** ILIKE 패턴/`.or()` 필터에서 의미를 갖는 문자를 제거해 안전하게 만든다 */
function sanitize(term: string): string {
  return term.replace(/[%,()]/g, " ").trim();
}

/** 제목·저자·소개에 대한 대소문자 무시 부분일치 검색 */
export async function searchContents(rawQuery: string): Promise<Content[]> {
  const q = sanitize(rawQuery);
  if (!q) return [];
  const supabase = createSupabaseServerClient();
  const pattern = `%${q}%`;
  const { data, error } = await supabase
    .from("contents")
    .select(COLUMNS)
    .or(
      `title.ilike.${pattern},author.ilike.${pattern},description.ilike.${pattern}`
    )
    .order("title");
  if (error) throw error;
  return (data ?? []) as Content[];
}

/** 분야 목록 (둘러보기용) */
export async function getCategories(): Promise<string[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("contents")
    .select("category")
    .order("category");
  if (error) throw error;
  return Array.from(new Set((data ?? []).map((r) => r.category as string)));
}

/** 특정 분야의 도서 목록 */
export async function getByCategory(category: string): Promise<Content[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("contents")
    .select(COLUMNS)
    .eq("category", category)
    .order("title");
  if (error) throw error;
  return (data ?? []) as Content[];
}

/** 단일 도서 상세 (없으면 null) */
export async function getById(id: number): Promise<Content | null> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("contents")
    .select(COLUMNS)
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return (data as Content | null) ?? null;
}

/** 같은 분야 추천 (현재 도서 제외, 최대 limit권) */
export async function getRelated(
  category: string,
  excludeId: number,
  limit = 5
): Promise<Content[]> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("contents")
    .select(COLUMNS)
    .eq("category", category)
    .neq("id", excludeId)
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as Content[];
}
