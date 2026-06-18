# 학지사 콘텐츠 검색·추천 (MVP)

학지사 도서 카탈로그를 **키워드로 검색**하고, 도서 상세에서 **같은 분야의 다른 책을 추천**하는 미니서비스입니다. Next.js(App Router) + Supabase(Postgres)로 구현되어 있습니다.

> 스펙·설계의 단일 진실원천은 `openspec/changes/add-content-search/` 입니다.

## 빠른 시작

### 1. 의존성 설치

```bash
npm install
```

### 2. Supabase 프로젝트 준비

1. [supabase.com](https://supabase.com) 에서 프로젝트를 생성합니다.
2. **SQL Editor** 에 `supabase/migrations/0001_contents.sql` 내용을 붙여넣고 실행합니다. → `contents` 테이블 + 읽기 전용 RLS 생성.
3. 프로젝트 설정의 **API 키**에서 값을 복사합니다.

### 3. 환경변수 설정

`.env.example` 을 `.env.local` 로 복사한 뒤 값을 채웁니다.

```bash
cp .env.example .env.local
```

```bash
NEXT_PUBLIC_SUPABASE_URL=              # 프로젝트 URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=  # publishable 키 (구 anon)
SUPABASE_SECRET_KEY=                   # secret 키 (구 service_role) — 시드 적재 전용, 커밋 금지
```

### 4. 시드 데이터 적재

```bash
npm run seed
```

`supabase/seed/contents.json` 의 도서를 테이블에 넣습니다(실행 시 기존 데이터를 비우고 다시 적재).

### 5. 개발 서버 실행

```bash
npm run dev
```

`http://localhost:3000` 접속.

## 구조

```
src/
  app/
    page.tsx              홈: 검색창 + 분야 둘러보기
    search/page.tsx       검색 결과 (?q= 키워드 / ?category= 분야)
    book/[id]/page.tsx    도서 상세 + 같은 분야 추천
  components/             SearchBar / BookCard / BookGrid / CategoryChips / SetupNotice
  lib/
    queries.ts            검색·분야·상세·추천 쿼리 (ILIKE / category)
    supabase/server.ts    읽기 전용 Supabase 클라이언트 (publishable 키)
    env.ts, types.ts
supabase/
  migrations/0001_contents.sql   테이블 + RLS
  seed/contents.json             시드 도서
scripts/seed.mjs                 시드 적재 스크립트
```

## 검색·추천 동작

- **검색**: `title`, `author`, `description` 에 대한 `ILIKE '%키워드%'` 부분일치(대소문자 무시). 빈 검색어는 무시되고 홈 기본 상태를 유지합니다.
- **추천**: 도서 상세에서 같은 `category` 의 다른 도서를 최대 5권. 행동 데이터/ML 없이 동작(콜드스타트 없음).

## 참고

- 시드 데이터(`supabase/seed/contents.json`)는 **샘플(예시) 도서 24권**입니다. 실제 학지사 카탈로그 데이터(표지 `cover_url`, `isbn`, 원본 `link` 포함)로 교체하면 그대로 동작합니다.
- 한국어 검색 정밀도가 필요해지면 `0001_contents.sql` 의 주석 처리된 `pg_trgm` 인덱스를 활성화하거나 향후 pgvector 로 확장할 수 있습니다.
- 배포(예: Vercel): 저장소 연결 후 환경변수 3개를 프로젝트에 등록하면 됩니다.
