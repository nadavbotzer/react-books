import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { BookDetails } from "./BookDetails.jsx"
import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(setBooks)
            .catch(err => {
                console.log('Problem getting books:', err)
            })
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(books => books.filter(book => book.id !== bookId))
            })
            .catch(err => {
                console.log('Problems removing book:', err)
            })
    }

    function onSetFilter(filterByToEdit) {
        // console.log('filterByToEdit - index:', filterByToEdit)
        setFilterBy(filterBy => ({ ...filterBy, ...filterByToEdit }))
    }

    if (!books) return <div>Loading...</div>
    const { txt, maxPrice } = filterBy
    return (
        <section className="car-index">
            {<React.Fragment>
                <BookFilter onSetFilter={onSetFilter} filterBy={{ txt, maxPrice }} />
                <BookList
                    onRemoveBook={onRemoveBook}
                    books={books}
                />
            </React.Fragment>
            }
        </section>
    )

}