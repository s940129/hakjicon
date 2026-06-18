import Link from "next/link";
import BookGrid from "@/components/BookGrid";
import SetupNotice from "@/components/SetupNotice";
import { getById, getRelated } from "@/lib/queries";
import { supabaseConfigured } from "@/lib/env";

export const dynamic = "force-dynamic";

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!supabaseConfigured()) return <SetupNotice />;

  const numericId = Number(id);
  const book = Number.isFinite(numericId) ? await getById(numericId) : null;

  if (!book) {
    return (
      <section className="notfound">
        <h1>도서를 찾을 수 없습니다</h1>
        <p>요청하신 도서가 존재하지 않습니다.</p>
        <p className="back">
          <Link href="/">← 홈으로</Link>
        </p>
      </section>
    );
  }

  const related = await getRelated(book.category, book.id, 5);

  return (
    <article className="detail">
      <div className="detail-main">
        <div className="detail-cover">
          {book.cover_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={book.cover_url} alt={`${book.title} 표지`} />
          ) : (
            <span className="card-cover-fallback">{book.category}</span>
          )}
        </div>
        <div className="detail-info">
          <span className="card-category">{book.category}</span>
          <h1>{book.title}</h1>
          <p className="detail-author">{book.author}</p>
          {book.description && (
            <p className="detail-desc">{book.description}</p>
          )}
          {book.link && (
            <a
              className="detail-link"
              href={book.link}
              target="_blank"
              rel="noreferrer"
            >
              학지사에서 보기 ↗
            </a>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="related">
          <h2 className="section-title">같은 분야 추천</h2>
          <BookGrid books={related} />
        </section>
      )}

      <p className="back">
        <Link href="/">← 홈으로</Link>
      </p>
    </article>
  );
}
