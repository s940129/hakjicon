# CLAUDE.md

이 파일은 이 저장소에서 작업하는 Claude Code(claude.ai/code)에게 지침을 제공합니다.

## 이 저장소의 정체

**OpenSpec으로 관리되는 스펙 주도(spec-driven) 프로젝트**입니다. 현재 시점에 **애플리케이션 코드는 없으며**, OpenSpec 아티팩트와 `.claude/` 워크플로 도구만 존재합니다. 계획 중인 제품은 **학지사 콘텐츠 검색·추천 미니서비스**(MVP)이며, **Next.js (App Router) + Supabase (Postgres)** 로 구현할 예정입니다.

*무엇을 만들지*에 대한 단일 진실원천은 `openspec/changes/add-content-search/`(proposal, design, spec, tasks)에 있습니다 — 애플리케이션 코드를 작성하기 전에 반드시 읽으세요. 의도된 MVP 형태:
- `contents` 테이블 하나(도서 카탈로그): `id, title, author, category, description, cover_url, isbn, link`.
- `title/author/description`에 대한 `ILIKE '%term%'` 키워드 검색(MVP에서는 전문검색/벡터 미사용 — Postgres FTS는 한국어 처리가 약함).
- 추천 = "같은 `category`, 최대 5권, 현재 도서 제외"(ML/협업필터링 없음; 콜드스타트 회피).
- 읽기 전용 접근(Supabase RLS public `SELECT`); 쓰기는 시드 적재 시에만.
- 화면 3개: 홈/검색, 검색 결과, 도서 상세.

이 기능들을 구현할 때, 스펙의 요구사항과 시나리오가 곧 인수 기준(acceptance criteria)입니다.

## OpenSpec 워크플로

작업은 `openspec/changes/<name>/` 아래의 변경 아티팩트를 통해 진행되며, 각 단계는 `/opsx:*` 슬래시 명령(`.claude/commands/opsx/`에 정의)으로 구동됩니다:

- `/opsx:explore` — 사고/조사 전용. **explore 모드에서는 애플리케이션 코드를 절대 작성하지 않음**(OpenSpec 아티팩트 생성은 허용).
- `/opsx:propose` — 변경을 생성하고 `proposal.md`, `design.md`, `tasks.md`를 만듦.
- `/opsx:apply` — 변경의 tasks를 구현.
- `/opsx:verify` — 아카이브 전에 구현이 아티팩트와 일치하는지 확인.
- `/opsx:sync` — 변경의 delta 스펙을 메인 `openspec/specs/`로 에이전트 주도 병합.
- `/opsx:archive` — 완료된 변경을 아카이브.

아티팩트 의존 순서: `proposal → (design, specs) → tasks`. `design.md`는 선택(교차 관심사 변경, 신규 의존성, 까다로운 데이터 모델/결정이 있을 때 포함).

## 자주 쓰는 명령

```bash
openspec list --json                              # 활성 변경 목록
openspec new change <kebab-name>                  # 변경 디렉터리 스캐폴드
openspec status --change "<name>" --json          # 아티팩트 완료 상태 + 해석된 경로
openspec instructions <proposal|design|specs|tasks> --change "<name>"   # 아티팩트 작성 지침
openspec validate <change-name> --strict          # 단일 변경 검증(--strict 권장)
openspec validate --changes                       # 모든 변경 검증
openspec show <change-or-spec-name> --json        # 파싱된 내용 확인
openspec archive <change-name>                    # 완료 시 아카이브
```

참고: 인자 없는 `openspec validate`는 아무 일도 하지 않습니다 — 항상 이름이나 `--changes`/`--specs`/`--all`을 함께 넘기세요.

## 스펙 작성 규약 (중요·비자명)

스펙은 **한국어 산문**으로 작성하지만, OpenSpec 검증기는 영어 구조 키워드를 강제합니다:

- delta 스펙 파일은 `## ADDED Requirements` 헤더 사용(그 외 `MODIFIED`/`REMOVED`/`RENAMED`).
- 각 요구사항은 `### Requirement: <name>` 이며, **그 서술 문장에는 `MUST` 또는 `SHALL`이 문자 그대로 포함되어야 함** — 한국어 문장이라도 마찬가지(미포함 시 "must contain SHALL or MUST" 오류로 검증 실패; 이 프로젝트는 인라인 `(MUST)` 패턴 사용, 예: "시스템은 … 반환(MUST)해야 한다").
- 모든 요구사항에는 `#### Scenario:` 블록이 최소 1개 필요하며 `- **WHEN** …` / `- **THEN** …` 형식으로 작성(추가 절은 `- **AND** …`).

스펙을 완료로 간주하기 전에 항상 `openspec validate <name> --strict`를 실행하고 "is valid"를 확인하세요.

## 스펙 (Single Source of Truth)

이 프로젝트의 스펙·설계·작업은 OpenSpec change가 SSoT다. 코드보다 스펙이 상류다.

- 활성 change: `openspec/changes/add-content-search/`
  - 요구사항: `specs/content/spec.md`
  - 데이터 모델·API: `design.md`
  - 작업 목록: `tasks.md` (구현하며 `- [ ]` → `- [x]`로 체크)
- 새 작업은 `openspec list`로 change를 확인하고 `tasks.md`를 따른다.
- 스펙을 바꾸려면 코드가 아니라 **change 파일을 먼저 고친다.**

## 환경 변수

앱 구현 전이라 아직 `.env`가 없습니다. 계획된 Next.js + Supabase 앱은 다음을 필요로 하며, Next.js 규약상 `.env.local`(git 미추적)에 둡니다:

```bash
NEXT_PUBLIC_SUPABASE_URL=               # Supabase 프로젝트 URL (클라이언트 노출 OK)
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=   # publishable 키 sb_publishable_... (읽기 전용 접근; RLS로 보호)
SUPABASE_SECRET_KEY=                    # secret 키 sb_secret_... 시드 적재 전용. 서버에서만 사용, 절대 클라이언트 노출/커밋 금지
```

- `NEXT_PUBLIC_*` 두 개는 브라우저에 노출되어도 안전(읽기 전용 RLS 전제).
- `SUPABASE_SECRET_KEY`는 RLS를 우회하므로 시드 스크립트 등 서버 측에서만 쓰고, `.env.local`/시크릿에만 보관.
- 네이밍은 Supabase 신규 API 키 체계 기준: publishable(구 anon) / secret(구 service_role).
- 배포(예: Vercel) 시 동일 키들을 프로젝트 환경 변수로 등록.

## 설정

`openspec/config.yaml`은 `schema: spec-driven`을 설정하고, 선택적 프로젝트 `context:`/`rules:`를 담습니다. AI가 작성하는 아티팩트가 의도된 규약에서 벗어나기 시작하면 `context:` 블록에 Next.js/Supabase 스택과 한국어 도메인 메모를 채워 넣으세요.

## 작업 언어

이 프로젝트의 모든 산출물(문서, OpenSpec 아티팩트, 답변)은 **한국어로 작성**합니다. 단, OpenSpec 검증이 요구하는 구조 키워드와 코드/식별자(테이블·컬럼명 등)는 영어를 유지합니다.
