import { BookPreview } from "./BookPreview.jsx";
const { Link } = ReactRouterDOM

export function BookList({ books, onRemoveBook }) {
    return (
        <ul className="book-list">
            <li className="add-book-btn">
                <Link to="/book/edit">+</Link>
            </li>
            {books.map(book => (
                <li key={book.id}>
                    <BookPreview
                        book={book}
                        onRemoveBook={() => { onRemoveBook(book.id) }} />
                </li>
            ))}
        </ul>
    )
}