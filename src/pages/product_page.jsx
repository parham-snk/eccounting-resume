import { useEffect, useState } from "react"
import ProductModifier from "./product/product_modifier"
import ListProducts from "./product/products_list"

const ProductPage = props => {

    const [changeItem, setChangeItem] = useState()
    useEffect(() => {
        document.title="مدیریت  انبار"
    }, [changeItem])
    return (
        <div className="flex flex-row justify-between align-middle w-full h-full">
            <ListProducts changeItem={val => setChangeItem(val)} />

            <ProductModifier item={changeItem} />
        </div>
    )
}

export default ProductPage