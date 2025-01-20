const { useState } = React
import { bookService } from '../services/book.service.js';

export function AddReview({ bookId, onAddReview }) {
    const [review, setReview] = useState({
        fullname: '',
        rating: 1,
        readAt: ''
    })

    function handleChange(event) {
        const { name, value } = event.target;
        setReview((prevReview) => ({
            ...prevReview,
            [name]: value,
        }))
    }

    function handleSubmit(event) {
        event.preventDefault()

        if (!review.fullname || !review.readAt) {
            alert('Please fill in all the fields.')
            return
        }

        bookService.get(bookId).then(book => {
            if (!book.reviews) book.reviews = []
            book.reviews.push(review)
            bookService.save(book)
                .then(() => {
                    setReview({ fullname: '', rating: 1, readAt: '' }); // Reset review after adding it
                    onAddReview(); // Notify parent to reload reviews
                    console.log(book)
                })
                .catch((err) => console.error('Failed to add review:', err));
        })
    }

    return (
        <section>
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
                <button type="submit">Add Review</button>
            </form>
        </section>
    );
}
