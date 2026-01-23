import { useEffect, useRef, useState } from "react"

const TableCol = props => {
    const { r, name, type, update } = props
    const [value, setValue] = useState()
    const input = useRef()
    useEffect(() => {
        switch (type) {
            case "name":
                input.current.addEventListener("keydown", e => {

                })
                break;
            case "price":
                input.current.addEventListener("keydown", e => {
                    if (/\d/.test(e.key)) {
                    } else if (e.key == "Backspace") {
                    } else {
                        e.preventDefault()
                    }
                })
                input.current.addEventListener("keyup", e => {
                    let inputValue = String(e.target.value).split(",").join("")
                    let x = inputValue + '.'
                    let reg = /\d(?=(\d{3})+\.)/gm
                    x = x.replace(reg, "$&,")
                    x = x.slice(0, x.length - 1)
                    e.target.value = x
                })
                break;
            case "qty":
                input.current.addEventListener("keydown", e => {
                    if (/\d/.test(e.key)) {

                    } else if (e.key == "Backspace") {

                    } else {
                        e.preventDefault()
                    }
                })

                break;
            case "percent":
                input.current.addEventListener("keydown", e => {
                    if (/\d/.test(e.key)) {
                    } else if (e.key == "Backspace") {

                    } else {
                        e.preventDefault()
                    }
                })
                input.current.addEventListener("blur", e => {
                    if (Number(e.target.value) > 100 || Number(e.target.value) < 0) {
                        alert('اشکال در اعمال تخفیف ( مقدار غیر مجاز)')
                        e.target.value = ""
                    }
                })
                break;
        }
        input.current.addEventListener("blur", e => {
            setValue(e.target.value)
        })

    }, [])


    useEffect(() => {
        update({ name, value })
    }, [value])
    return (
        <td className="table-cell w-full">
            <input className={"border w-fit text-center h-7" + (name == "name" ? " w-full" : "")}
                placeholder={name} id={`${name}-${r}`} ref={input} type="text" />
        </td>
    )
}

export default TableCol