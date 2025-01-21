import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

export function BookEdit() {
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    const { bookId } = useParams()

    useEffect(() => {
        if (bookId) loadBook()
    }, [])

    function handleChange({ target }) {
        const field = target.name
        let value

        // Handle checkbox inputs
        if (target.type === 'checkbox') {
            value = target.checked // Use 'checked' for checkboxes
        } else if (target.type === 'number' || target.type === 'range') {
            value = +target.value // Convert number inputs
        } else {
            value = target.value
        }

        setBookToEdit((prevBook) => {
            const newBook = { ...prevBook }

            if (field === 'authors' || field === 'categories') {
                // Allow typing freely and only split the value when saving
                newBook[field] = value;
            } else if (field.includes('.')) {
                // Handle nested fields (e.g., 'listPrice.amount')
                const keys = field.split('.')
                let nestedObj = newBook;
                keys.slice(0, -1).forEach((key) => {
                    if (!nestedObj[key]) nestedObj[key] = {}
                    nestedObj = nestedObj[key]
                });
                nestedObj[keys[keys.length - 1]] = value
            } else {
                // For other fields like title, description, etc.
                newBook[field] = value
            }

            return newBook
        })
    }

    function loadBook() {
        bookService.get(bookId)
            .then(setBookToEdit)
            .catch(err => console.log(err))
    }

    function onSaveBook(ev) {
        ev.preventDefault()

        // Ensure authors and categories are properly formatted as arrays
        const updatedBook = { ...bookToEdit }

        if (updatedBook.authors && typeof updatedBook.authors === 'string') {
            updatedBook.authors = updatedBook.authors
                .split(',')
                .map((item) => item.trim()) // Trim spaces around each author
                .filter((item) => item.length > 0) // Remove any empty strings
        }

        if (updatedBook.categories && typeof updatedBook.categories === 'string') {
            updatedBook.categories = updatedBook.categories
                .split(',')
                .map((item) => item.trim()) // Trim spaces around each category
                .filter((item) => item.length > 0) // Remove any empty strings
        }

        const txtMsg = updatedBook.id ? updatedBook.id + ' edit' : 'created'

        // Save the updated book
        bookService.save(updatedBook)
            .then(() => {
                navigate('/book')
                showSuccessMsg(`Book ${txtMsg} successfully`)
            })
            .catch((err) => {
                showErrorMsg(`Could not ${txtMsg} book`)
                console.log(err)
            })
    }


    const { title, subtitle, authors, publishedDate, description, pageCount, categories, thumbnail, language, listPrice } = bookToEdit

    return (
        <section className="book-edit">
            <h1>{bookId ? 'Edit Book' : 'Add Book'}</h1>
            <form onSubmit={onSaveBook}>
                <label htmlFor="title">Title:</label>
                <input required value={title} onChange={handleChange} type="text" name="title" id="title" />

                <label htmlFor="subtitle">Subtitle:</label>
                <input value={subtitle} onChange={handleChange} type="text" name="subtitle" id="subtitle" />

                <label htmlFor="authors">Authors:</label>
                <input value={authors.join(', ')} onChange={(e) => handleChange({ target: { name: 'authors', value: e.target.value.split(',').map(author => author.trim()) } })} type="text" name="authors" id="authors" />

                <label htmlFor="publishedDate">Published Date:</label>
                <input value={publishedDate} onChange={handleChange} type="number" name="publishedDate" id="publishedDate" />

                <label htmlFor="description">Description:</label>
                <textarea value={description} onChange={handleChange} name="description" id="description" />

                <label htmlFor="pageCount">Page Count:</label>
                <input value={pageCount || ''} onChange={handleChange} type="number" name="pageCount" id="pageCount" />

                <label htmlFor="categories">Categories:</label>
                <input value={categories.join(', ')} onChange={(e) => handleChange({ target: { name: 'categories', value: e.target.value.split(',').map(cat => cat.trim()) } })} type="text" name="categories" id="categories" />

                <label htmlFor="thumbnail">Thumbnail URL:</label>
                <input value={thumbnail} onChange={handleChange} type="text" name="thumbnail" id="thumbnail" />

                <label htmlFor="language">Language:</label>
                <input value={language} onChange={handleChange} type="text" name="language" id="language" />

                <label htmlFor="price">Price:</label>
                <input required value={listPrice.amount || ''} onChange={handleChange} type="number" name="listPrice.amount" id="price" />

                <div>
                    <label htmlFor="sale">On Sale:</label>
                    <input
                        checked={listPrice.isOnSale}
                        onChange={handleChange}
                        type="checkbox"
                        name="listPrice.isOnSale"
                        id="sale"
                    />
                </div>

                <button>Save</button>
            </form>
        </section>
    )
}
