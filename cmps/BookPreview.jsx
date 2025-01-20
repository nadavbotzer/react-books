const { Link, useNavigate } = ReactRouterDOM

export function BookPreview({ book, onRemoveBook }) {
    const { title, description, listPrice, thumbnail } = book
    const navigate = useNavigate()
    function onBookDetails() {
        navigate(`/book/${book.id}`)
    }

    function onBookEdit(ev) {
        ev.stopPropagation()
        navigate(`/book/edit/${book.id}`)
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

    function shortTxt(txt, length = 50) {
        if (txt.length <= length) return txt
        return txt.substring(0, length) + '...'
    }

    return (
        <article onClick={onBookDetails} className="book-preview">
            <div className="info">
                <button className="remove-btn" onClick={handleRemoveBook}>X</button>
                <h3>{shortTxt(title, 15)}</h3>
                <h5>{shortTxt(description, 100)}</h5>
                <p className={priceTxtColor + ' price'}>{listPrice.amount} {listPrice.currencyCode}
                </p>
                <button className="edit-btn" onClick={onBookEdit}>Edit</button>
                {listPrice.isOnSale && <p className="on-sale">On Sale!</p>}
            </div>
            <img src={thumbnail} alt="Book Image" />
        </article>
    )
}