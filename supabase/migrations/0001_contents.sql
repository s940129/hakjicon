-- 학지사 콘텐츠 검색·추천 MVP — contents 테이블 + 읽기 전용 RLS
-- Supabase SQL Editor 에 붙여넣고 실행하세요.

create table if not exists public.contents (
  id          bigint generated always as identity primary key,
  title       text not null,
  author      text not null,
  category    text not null,
  description text,
  cover_url   text,
  isbn        text,
  link        text,
  created_at  timestamptz not null default now()
);

-- 분야별 둘러보기 / 추천 가속
create index if not exists contents_category_idx on public.contents (category);

-- (선택) 향후 ILIKE 검색 가속이 필요하면 trigram 인덱스 활성화:
-- create extension if not exists pg_trgm;
-- create index contents_title_trgm_idx on public.contents using gin (title gin_trgm_ops);
-- create index contents_author_trgm_idx on public.contents using gin (author gin_trgm_ops);

-- 읽기 전용 접근: 익명/인증 사용자 모두 SELECT 만 허용. 쓰기는 secret 키(서버)만.
alter table public.contents enable row level security;

drop policy if exists "Public read access" on public.contents;
create policy "Public read access"
  on public.contents
  for select
  to anon, authenticated
  using (true);
