import Link from "next/link";
import type { Content } from "@/lib/types";

export default function BookCard({ book }: { book: Content }) {
  return (
    <Link href={`/book/${book.id}`} className="card">
      <div className="card-cover">
        {book.cover_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={book.cover_url} alt={`${book.title} 표지`} />
        ) : (
          <span className="card-cover-fallback">{book.category}</span>
        )}
      </div>
      <div className="card-body">
        <span className="card-category">{book.category}</span>
        <strong className="card-title">{book.title}</strong>
        <span className="card-author">{book.author}</span>
      </div>
    </Link>
  );
}
