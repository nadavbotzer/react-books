
const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM


export function BookFilter({ filterBy, onSetFilter }) {

    //* { txt: '', maxPrice: '' }
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function onSubmit(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            default:
                break;
        }
        setFilterByToEdit(filterBy => ({ ...filterBy, [field]: value }))
    }

    const { txt, maxPrice } = filterByToEdit
    return (
        <section className="book-filter">
            <h2>Filter Our Books</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="txt">Book Title</label>
                <input id="txt" name="txt" onChange={handleChange} value={txt} type="text" />
                <label htmlFor="maxPrice">Max Price {!!maxPrice && maxPrice}</label>
                <input id="maxPrice" name="maxPrice" onChange={handleChange} value={maxPrice || 0} type="range" max="300" step="10" title={maxPrice} />
            </form>
        </section>
    )
}