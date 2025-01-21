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
        const field = target.name;
        let value;

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
            if (field.includes('.')) {
                const keys = field.split('.')
                let nestedObj = newBook
                keys.slice(0, -1).forEach((key) => {
                    if (!nestedObj[key]) nestedObj[key] = {}
                    nestedObj = nestedObj[key]
                });
                nestedObj[keys[keys.length - 1]] = value
            } else {
                newBook[field] = value
            }
            return newBook
        })
    }


    function loadBook() {
        bookService.get(bookId).
            then(setBookToEdit)
            .catch(err => console.log(err))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        const txtMsg = bookToEdit.id ? bookToEdit.id + ' edit' : 'created'
        bookService.save(bookToEdit)
            .then(savedBook => {
                navigate('/book')
                showSuccessMsg(`Book ${txtMsg} successfully`)
            })
            .catch(err => {
                showSuccessMsg(`Could not ${txtMsg} book`)
            })
    }

    const { title, listPrice } = bookToEdit
    return (
        <section className="book-edit">
            <h1>{bookId ? 'Edit Book' : 'Add Book'}</h1>
            <form onSubmit={onSaveBook}>
                <label htmlFor="title">Title:</label>
                <input required value={title} onChange={handleChange} type="text" name="title" id="title" />
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