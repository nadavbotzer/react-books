import { bookService } from "../services/book.service.js"
const { useState } = React
const { useNavigate } = ReactRouterDOM


export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        // Convert number inputs to numbers
        if (target.type === 'number' || target.type === 'range') {
            value = +value
        }

        // Handle nested fields like "listPrice.amount"
        setBookToEdit((prevBook) => {
            const newBook = { ...prevBook }
            if (field.includes('.')) {
                const keys = field.split('.')
                let nestedObj = newBook
                keys.slice(0, -1).forEach((key) => {
                    if (!nestedObj[key]) nestedObj[key] = {}
                    nestedObj = nestedObj[key]
                })
                nestedObj[keys[keys.length - 1]] = value
            } else {
                newBook[field] = value
            }
            return newBook
        })
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then(savedBook => {
                console.log(savedBook)
                navigate('/book')
            })
    }

    const { title, listPrice } = bookToEdit

    return (
        <section className="book-edit">
            <h1>Book Edit</h1>
            <form onSubmit={onSaveBook}>
                <label htmlFor="title">Title:</label>
                <input value={title} onChange={handleChange} type="text" name="title" id="title" />
                <label htmlFor="price">Price:</label>
                <input value={listPrice.amount} onChange={handleChange} type="number" name="listPrice.amount" id="price" />
                <button>Save</button>
            </form>
        </section>
    )
}