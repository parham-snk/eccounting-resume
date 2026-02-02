const ProductListItem = ({ data }) => {
    const { id, name, qty, price, last_used_price } = data
    return (
        <div className="flex flex-row w-full p-2 my-1">
            <h1>{name}</h1>
            
        </div>
    )
}

export default ProductListItem