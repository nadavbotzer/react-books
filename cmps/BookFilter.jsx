
const { useState, useEffect } = React


export function BookFilter({ filterBy, onSetFilter }) {

    //* { txt: '', minSpeed: '' }
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function onSubmit(ev) {
        ev.preventDefault()
        console.log('Submit filter')
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
        <section className="car-filter">
            <h2>Filter Our Books</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="txt">Book Title</label>
                <input id="txt" name="txt" onChange={handleChange} value={txt} type="text" />
                <label htmlFor="maxPrice">Max Price {maxPrice}</label>
                <input id="maxPrice" name="maxPrice" onChange={handleChange} value={maxPrice} type="range" max="300" min="20" step="10" title={maxPrice} />
                <button>Submit</button>
            </form>
        </section>
    )
}