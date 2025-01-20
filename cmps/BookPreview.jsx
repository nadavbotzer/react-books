const { Link, NavLink, useNavigate } = ReactRouterDOM

export function BookPreview({ book, onRemoveBook }) {
    const { title, description, listPrice, thumbnail } = book
    const navigate = useNavigate()
    function onBookDetails() {
        navigate(`/book/${book.id}`)
    }
    function getPriceTxtColor() {
        if (!listPrice.isOnSale) return ''
        else return 'yellow'
    }
    const priceTxtColor = getPriceTxtColor()

    function handleRemoveBook(ev) {
        ev.stopPropagation()
        onRemoveBook()
    }

    return (
        <article onClick={onBookDetails} className="book-preview">
            <div className="info">
                <button className="remove-btn" onClick={handleRemoveBook}>X</button>
                <h3>{title}</h3>
                <h5>{description}</h5>
                <p className={priceTxtColor + ' price'}>{listPrice.amount} {listPrice.currencyCode}
                </p>
                {listPrice.isOnSale && <p className="on-sale">On Sale!</p>}
            </div>
            <img src={thumbnail} alt="Book Image" />
        </article>
    )
}