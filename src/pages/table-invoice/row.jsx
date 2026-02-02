import { useEffect, useState } from "react"
import TableCol from "./col"

const TableRow = props => {
    let { counter, update } = props
    const [values, setValues] = useState()
    const list = [{ name: "name", type: "name" }, { name: "qty", type: "qty" }, { name: "price", type: "price" }, { name: "discount", type: "percent" }, { name: "totalPrice", type: "price" }]
    const elements = list.map((item) => <TableCol update={({ name, value }) => {
        setValues({ ...values, [name]: value })
    }} name={item.name} r={counter} type={item.type} />)
    useEffect(() => {
        if (values != "") {
            update({ counter, values })
        }
        if (values?.qty && values?.price) {
            let number = values.discount ? values.qty * Number(String(values.price).split(",").join("")) - ((values.discount / 100) * values.qty * Number(String(values.price).split(",").join(""))) : values.qty * Number(String(values.price).split(",").join(""))
            number += "."
            let reg = /\d(?=(\d{3})+\.)/gm
            number = number.replace(reg, "$&,")
            number = number.slice(0, number.length - 1)
            document.getElementById(`totalPrice-${counter -= 1}`).value = number
            document.getElementById(`totalPrice-${counter}`)?.focus()
            document.getElementById(`totalPrice-${counter}`)?.blur()
        } else {
            document.getElementById(`totalPrice-${counter -= 1}`).value =""
        }
        update({ counter, values })

    }, [values])
    return (
        <tr className="h-fit">
            <td className="px-3 border">{counter += 1}</td>
            {elements}
        </tr>
    )
}

export default TableRow