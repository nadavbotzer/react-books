import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookDetails({ bookId, onBack }) {

    const [book, setBook] = useState(null)

    useEffect(() => {
        loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
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

    function getPriceTxtColor() {
        if (!listPrice.isOnSale) return ''
        else return 'yellow'
    }

    if (!book) return <div>Loading...</div>
    const { title, subtitle, description, authors, listPrice, publishedDate, pageCount, thumbnail, categories } = book
    const displayedTextForPageCount = getDisplayedTextForPageCount(pageCount)
    const priceTxtColor = getPriceTxtColor()
    return (
        <section className="book-details">
            <section className="details-section">
                <button className="back-btn" onClick={onBack}>Back</button>
                <h1>{title}</h1>
                <h2>{subtitle}</h2>
                <h3>{description}</h3>
                <br></br>
                <h3>Authors:</h3>
                {authors.map((author, idx) => (
                    <h4 key={idx}>
                        {author}
                    </h4>
                ))}
                <h5>{displayedTextForPageCount}</h5>
                <h5>Published: {publishedDate}</h5>
            </section>
            <section className="img-categories-section">
                <img src={thumbnail} alt="Book Image" />
                {listPrice.isOnSale && <p className="on-sale">On Sale!</p>}
                <p className={priceTxtColor + ' price'}>Price: {listPrice.amount} {listPrice.currencyCode}
                </p>
                <div className="categories-wrapper">
                    <h3>Categories:</h3>
                    {categories.map((categorie, idx) => (
                        <p className="category" key={idx}>
                            {categorie}
                        </p>
                    ))}
                </div>

            </section>
        </section>
    )
}