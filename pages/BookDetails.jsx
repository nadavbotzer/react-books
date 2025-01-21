import { AddReview } from "../cmps/AddReview.jsx"
import { Accordion } from "../cmps/Accordion.jsx"
import { bookService } from "../services/book.service.js"
const { useState, useEffect } = React
const { useParams, Link } = ReactRouterDOM

export function BookDetails() {

    const [book, setBook] = useState(null)
    const params = useParams()

    useEffect(() => {
        loadBook()
    }, [params])

    function loadBook() {
        bookService.get(params.bookId)
            .then(setBook)
            .catch(err => {
                console.log('Problem getting book:', err)
            })

    }

    function getDisplayedTextForPageCount(pageCount) {
        if (pageCount > 500) return 'Serious Reading'
        if (pageCount > 200) return 'Descent Reading'
        return 'Light Reading'

    }

    function onRemoveReview(reviewIndex) {
        const updatedBook = { ...book }
        updatedBook.reviews.splice(reviewIndex, 1)
        bookService.save(updatedBook).then(() => {
            setBook(updatedBook)
        })
    }

    function handleAddReview() {
        bookService.get(params.bookId).then(setBook)
    }

    if (!book) return <div>Loading...</div>
    const { title, subtitle, description, authors, listPrice, publishedDate, pageCount, thumbnail, categories } = book
    const displayedTextForPageCount = getDisplayedTextForPageCount(pageCount)
    return (
        <section className="book-details">
            <section className="details-section">
                <section className="nav-btn-wrapper flex">
                    <Link className="btn" to="/book">Back</Link>
                    <Link className="btn" to={`/book/${book.prevBookId}`}>Prev</Link>
                    <Link className="btn" to={`/book/${book.nextBookId}`}>Next</Link>
                </section>
                <h1>{title}</h1>
                <h2>{subtitle}</h2>
                <h3>{description}</h3>
                <br></br>
                <div className="authors flex">
                    <h3>Authors:</h3>
                    {authors &&
                        authors.map((author, idx) => (
                            <h4 key={idx}>
                                {author}
                            </h4>
                        ))}
                </div>
                <h3 className="more-details">More Details:</h3>
                <h4>{displayedTextForPageCount}</h4>
                <h4>Published, {publishedDate}</h4>
            </section>
            <section className="img-categories-section">
                <div className="img-wrapper">
                    {listPrice.isOnSale && <p className="on-sale">On Sale!</p>}
                    <img src={thumbnail} alt="Book Image" />
                </div>
                <p className="price">Price: {listPrice.amount} {listPrice.currencyCode}
                </p>
                <div className="categories-wrapper">
                    <h3>Categories:</h3>
                    {categories && categories.map((categorie, idx) => (
                        <p className="category" key={idx}>
                            {categorie}
                        </p>
                    ))}
                </div>
            </section>
            <section className="reviews-wrapper flex flex-column">
                <Accordion title={'Reviews'}>
                    <section className="reviews">
                        {(!book.reviews || !book.reviews.length) && <span>No Reviews</span>}
                        {book.reviews &&
                            <ul>
                                {book.reviews.map((review, index) => (
                                    <li key={index}>
                                        <p><strong>{review.fullname}</strong> - {review.rating} ★</p>
                                        <p>Read on: {review.readAt}</p>
                                        <button onClick={() => onRemoveReview(index)}>X</button>
                                    </li>
                                ))}
                            </ul>
                        }
                    </section>
                </Accordion>
                <Accordion title={'Add Review'}>
                    <AddReview bookId={params.bookId} onAddReview={handleAddReview} />
                </Accordion>
            </section>
        </section>
    )
}