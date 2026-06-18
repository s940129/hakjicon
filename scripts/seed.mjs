// 시드 도서를 Supabase contents 테이블에 적재한다 (멱등: 전체 삭제 후 삽입).
// 실행: npm run seed   (내부적으로 node --env-file=.env.local 사용)
import { readFile } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secret = process.env.SUPABASE_SECRET_KEY;

if (!url || !secret) {
  console.error(
    "환경변수 NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SECRET_KEY 가 필요합니다."
  );
  console.error("예: node --env-file=.env.local scripts/seed.mjs");
  process.exit(1);
}

// secret 키는 RLS 를 우회하므로 삽입/삭제가 가능하다.
const supabase = createClient(url, secret, { auth: { persistSession: false } });

const raw = await readFile(
  new URL("../supabase/seed/contents.json", import.meta.url),
  "utf8"
);
const books = JSON.parse(raw);

console.log(`시드 ${books.length}권 적재를 시작합니다...`);

const { error: delErr } = await supabase.from("contents").delete().neq("id", 0);
if (delErr) {
  console.error("기존 데이터 삭제 실패:", delErr.message);
  process.exit(1);
}

const { error: insErr } = await supabase.from("contents").insert(books);
if (insErr) {
  console.error("적재 실패:", insErr.message);
  process.exit(1);
}

console.log(`완료: ${books.length}권 적재됨.`);
