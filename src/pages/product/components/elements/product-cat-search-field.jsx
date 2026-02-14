import { useContext, useEffect, useState } from "react"
import { Context } from "../../../../context/Context"
import SuggestedElement from "./suggested-element"


const ProductCatSearchField = props => {
    const { products } = useContext(Context)

    const [suggest, setSuggest] = useState()
    const [show, setShow] = useState(false)

    function filter(val, arr) {
        let res = [...arr].filter(item => String(item.product_name).includes(val))
        let elements = res.map(item => <SuggestedElement data={{ ...item }} setCat={val => props.setCat(val)} />)
        setSuggest(elements)
        setShow(true)
    }

    useEffect(()=>{console.log(suggest)},[suggest])
    return (
        <div className="flex flex-row justify-between items-center">
            <label className="text-sm" htmlFor="parent">دسته بندی</label>
            <div className="relative">
                <input
                    type="text" id="parent" className="bg-white border border-gray-300 p-1 rounded mx-1"

                    onBlur={e => {
                        [...products]?.forEach(item => {
                            if (item.product_name == e.target.value) {
                                props.setCat(item?.product_id)
                            }
                        })
                        setShow(true)
                    }}

                    onChange={e => filter(e.target.value, products)}
                />

                {show && suggest &&
                    suggest
                }
            </div>

        </div>
    )
}

export default ProductCatSearchField