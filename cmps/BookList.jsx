import { BookPreview } from "./BookPreview.jsx";
const { Link, NavLink } = ReactRouterDOM

export function BookList({ books, onRemoveBook }) {
    return (
        <ul className="book-list">
            {books.map(book => (
                <li key={book.id}>
                    <BookPreview
                        book={book}
                        onRemoveBook={() => { onRemoveBook(book.id) }} />
                    <button>
                        <Link to={`/book/${book.id}`}>Details</Link>
                    </button>
                </li>
            ))}
        </ul>
    )
}