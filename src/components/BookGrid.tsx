import type { Content } from "@/lib/types";
import BookCard from "./BookCard";

export default function BookGrid({ books }: { books: Content[] }) {
  return (
    <div className="grid">
      {books.map((b) => (
        <BookCard key={b.id} book={b} />
      ))}
    </div>
  );
}
