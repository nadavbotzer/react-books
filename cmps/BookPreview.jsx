
export function BookPreview({ book }) {
    const { title, description, listPrice, thumbnail } = book
    function getPriceTxtColor() {
        if (!listPrice.isOnSale) return ''
        else return 'yellow'
    }
    const priceTxtColor = getPriceTxtColor()
    return (
        <article className="book-preview">
            <div className="info">
                <h3>{title}</h3>
                <h5>{description}</h5>
                <p className={priceTxtColor + ' price'}>Price:{listPrice.amount} {listPrice.currencyCode}
                </p>
                {listPrice.isOnSale && <p className="on-sale">On Sale!</p>}
            </div>
            <img src={thumbnail} alt="Book Image" />
        </article>
    )
}