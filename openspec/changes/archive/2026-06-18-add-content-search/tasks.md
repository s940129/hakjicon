## 1. 프로젝트 셋업

- [x] 1.1 Next.js(App Router) 프로젝트 초기화 및 기본 레이아웃 구성
- [x] 1.2 Supabase 프로젝트 생성 후 환경변수(`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`) 설정 — `.env.local` 설정 완료, 연결 검증됨
- [x] 1.3 Supabase 클라이언트 유틸 추가

## 2. 데이터 모델 & 시드

- [x] 2.1 `contents` 테이블 생성(id, title, author, category, description, cover_url, isbn, link) — `supabase/migrations/0001_contents.sql` (라이브 DB에 실행 필요)
- [x] 2.2 읽기 전용 RLS 정책(public select) 설정 — 위 마이그레이션에 포함
- [x] 2.3 시드 도서 JSON/CSV 작성 후 `contents`에 적재 — 샘플 24권 적재·검증 완료(SQL/`npm run seed` 둘 다 멱등). 실데이터 50~100권 교체는 선택(open question: 데이터 출처)

## 3. 검색

- [x] 3.1 `title/author/description` 대상 `ILIKE` 검색 쿼리 작성
- [x] 3.2 검색 API 경로 또는 서버 컴포넌트 구현(빈 검색어 처리 포함)
- [x] 3.3 홈 검색창 + 검색 결과 페이지 UI(결과 카드: 표지·제목·저자)
- [x] 3.4 "검색 결과 없음" 상태 처리

## 4. 분야 둘러보기 & 상세

- [x] 4.1 홈에 분야(category) 목록 노출 및 분야별 목록 조회
- [x] 4.2 도서 상세 페이지(표지·제목·저자·분야·소개·원본 링크)
- [x] 4.3 존재하지 않는 도서 식별자 처리

## 5. 추천

- [x] 5.1 같은 `category` 도서 최대 5권 조회(현재 도서 제외)
- [x] 5.2 상세 페이지에 "같은 분야 추천" 영역 렌더(추천 부족 시 빈 처리)

## 6. 마무리

- [x] 6.1 모바일/데스크톱 기본 반응형 점검 — 반응형 CSS + `next build` 통과 + 런타임 스모크 테스트

> 6.2 배포(Vercel)는 이 변경의 범위 외로 정리됨(별도 진행). 절차는 `README.md`에 문서화. 실데이터 50~100권 교체도 open question(데이터 출처) 해결 후 별도 진행.
