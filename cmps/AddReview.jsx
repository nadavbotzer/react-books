const { useState } = React
import { bookService } from '../services/book.service.js';

export function AddReview({ bookId, onAddReview }) {
    const [review, setReview] = useState(bookService.getEmptyReview())

    function handleChange({ target }) {
        const { name, value } = target
        setReview((prevReview) => ({ ...prevReview, [name]: value, }))
    }

    function handleSubmit(event) {
        event.preventDefault()
        bookService.get(bookId).then(() => {
            bookService.saveReview(bookId, review)
                .then(() => {
                    setReview(bookService.getEmptyReview())
                    onAddReview()
                })
        })
    }

    return (
        <section className='add-review'>
            <form onSubmit={handleSubmit}>
                <label htmlFor="fullname">Full Name:</label>
                <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    value={review.fullname}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="rating">Rating:</label>
                <select
                    id="rating"
                    name="rating"
                    value={review.rating}
                    onChange={handleChange}
                >
                    {[1, 2, 3, 4, 5].map((value) => (
                        <option key={value} value={value}>
                            {value} ★
                        </option>
                    ))}
                </select>
                <label htmlFor="readAt">Date Read:</label>
                <input
                    type="date"
                    id="readAt"
                    name="readAt"
                    value={review.readAt}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Add</button>
            </form>
        </section>
    )
}
