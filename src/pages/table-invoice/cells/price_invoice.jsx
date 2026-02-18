import { useEffect, useRef, useState } from "react"
import splitNumber from "../../../components/util/split-numbers"

const PRICE_INVOICE_INPUT = props => {
    const { enable, product, update } = props
    const [price, setPrice] = useState()
    const input = useRef()
    useEffect(() => {
        if (props.product) {
            setPrice(product.product_price)
            input.current.value = splitNumber(product.product_price)
        } else {
            input.current.value = ""
            setPrice(0)
        }
    }, [props.product])

    useEffect(() => {
        if (price) {
            props.update(price)
        }

    }, [price])
    return (
        <td className="table-cell w-full">
            <input className={"border w-fit text-center h-7"}
                ref={input}
                placeholder={product ? `قیمت پیشنهادی: ${splitNumber(product.product_price)}` : ""}
                disabled={enable ? false : true}
                onKeyDown={e => {
                    if (e.key == "Backspace" || /\d/.test(e.key)) {

                    } else {
                        e.preventDefault()
                    }
                }}
                onChange={e => {
                    e.target.value = splitNumber(String(e.target.value).split(",").join(""))
                    setPrice(String(e.target.value).split(",").join(""))
                }}
                onBlur={e => {
                    update(e.target.value == "" ? false : String(e.target.value).split(",").join(""))
                }}

            />
        </td>
    )
}

export default PRICE_INVOICE_INPUT