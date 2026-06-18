import { createClient } from "@supabase/supabase-js";

/**
 * 읽기 전용 서버 클라이언트.
 * publishable 키 + public SELECT RLS 전제 (쓰기 권한 없음).
 */
export function createSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Supabase 환경변수가 없습니다 (.env.local 의 NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY 확인)"
    );
  }
  return createClient(url, key, { auth: { persistSession: false } });
}
