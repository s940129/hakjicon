export default function SetupNotice() {
  return (
    <div className="notice">
      <h2>Supabase 설정이 필요합니다</h2>
      <p>
        <code>.env.local</code> 에 다음을 채워 주세요:
      </p>
      <pre>
{`NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...`}
      </pre>
      <p>
        이후 <code>supabase/migrations/0001_contents.sql</code> 실행 →{" "}
        <code>npm run seed</code> 순서로 진행하세요. 자세한 절차는{" "}
        <code>README.md</code> 를 참고하세요.
      </p>
    </div>
  );
}
