const SuggestedElement = props => {
    const { data, setCat } = props
    const { product_id, product_name } = data
    return (
        <p
            onClick={() => setCat(product_id)}
        >
            {product_name}
        </p>
    )
}

export default SuggestedElement