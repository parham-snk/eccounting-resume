import { useEffect, useState } from "react"
import TableCol from "./col"
import Name_Invoice_Input from "./cells/name_invoice"
import QTY_INVOICE_INPUT from "./cells/qty_invoice"
import PRICE_INVOICE_INPUT from "./cells/price_invoice"
import DISCOUNT_INVOICE_INPUT from "./cells/discount_invoice"
import splitNumber from "../../components/util/split-numbers"

const TableRow = props => {
    let { counter, update, remove } = props
    const [values, setValues] = useState()
    const [price, setPrice] = useState()
    const [qty, setQTY] = useState()
    const [off, setOff] = useState()
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        console.log("changed!")
        if (values) {
            if (price && qty && price > 0 && qty > 0) {
                let total = price * qty

                if (off) {
                    total = total - total * (off / 100)
                }
                setTotalPrice(splitNumber(total))
            } else {
                setTotalPrice(0)
            }
        } else {
            setOff(false)
            setPrice(false)
            setQTY(false)
            setTotalPrice("")
        }
    }, [price, qty, off])
    useEffect(() => {
        if (!values) {
            setOff(false)
            setPrice(false)
            setQTY(false)
            setTotalPrice("")
        }
    }, [values])

    useEffect(() => {
        if (totalPrice) {
            update({
                r: counter, product_id: values?.product.product_id, qty: Number(qty), price, off: Number(off), totalPrice: Number(String(totalPrice).split(",").join(""))
            })
        }
    }, [totalPrice])
    return (
        <tr className="h-fit">
            <td className="px-3 border">{counter += 1}</td>
            {/* {elements} */}
            <Name_Invoice_Input update={val => {
                if (!val) {
                    remove(counter)
                    return setValues(false)
                }
                setValues({ ...values, product: val })
            }} />
            <QTY_INVOICE_INPUT update={val => {
                setQTY(val)
            }} enable={values?.product ? true : false} product={values?.product ? values.product : null} />
            <PRICE_INVOICE_INPUT update={val => {
                setPrice(val)
            }} enable={values?.product ? true : false} product={values?.product} />

            <DISCOUNT_INVOICE_INPUT update={val => {
                setOff(val)
            }} enable={values?.product ? true : false} />

            <td className="table-cell w-full select-none" style={{ userSelect: "none !important" }}>
                <input disabled value={totalPrice} className={"border w-fit text-center h-7 "} />
            </td>
        </tr>
    )
}

export default TableRow