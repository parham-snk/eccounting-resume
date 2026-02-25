import { useEffect, useRef, useState } from "react"

const QTY_INVOICE_INPUT = props => {
    const { value, product, enable ,limit} = props
    const [item, setItem] = useState()
    const [qtyInput, setqtyInput] = useState()
    const [err, setErr] = useState(false)
    const input = useRef()
    useEffect(() => {
        if (props.product) {
            setItem(product)
        } else {
            input.current.value = ''
            input.current.focus()
        }
    }, [props])
    
    return <td className="table-cell w-full">
        <input className={`border w-fit text-center h-7 ${err ? "bg-red-200 dark:bg-red-300" : "bg-white dark:bg-zinc-700"} dark:placeholder:text-gray-500`}
            disabled={enable ? false : true}
            ref={input}

            onKeyDown={e => {
                if (e.key == "Backspace") {

                }
                else if (/\d/.test(e.key) == false) {
                    e.preventDefault()
                }

            }}
            onChange={(e) => {
                if (Number(e.target.value) > item?.qty && limit) {
                    e.target.value = ""
                    alert("مقدار غیر مجاز (از موجودی انبار بیشتر است)")
                }
            }}
            onBlur={(e) => {
                if (e.target.value == "") {
                    setErr(true)
                    props.update(false)
                } else {
                    setErr(false)
                    props.update(e.target.value)
                }
            }}
            placeholder={product &&limit ? `حداکثر تعداد مجاز : ${item?.qty}` : ""}
        />
    </td>
}

export default QTY_INVOICE_INPUT