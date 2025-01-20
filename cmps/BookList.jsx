import { BookPreview } from "./BookPreview.jsx";

export function BookList({ books, onRemoveBook, onSetSelectedBookId }) {
    return (
        <ul className="book-list">
            {books.map(book => (
                <li key={book.id}>
                    <BookPreview
                        book={book}
                        onSetBook={() => onSetSelectedBookId(book.id)}
                        onRemoveBook={() => { onRemoveBook(book.id) }} />
                </li>
            ))}
        </ul>
    )
}