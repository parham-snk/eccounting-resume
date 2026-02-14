import { useEffect, useRef, useState } from "react"
import splitNumber from "../../components/util/split-numbers"
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
                    } else if (e.key == "Backspace" || e.key == "Tab") {
                    } else {
                        e.preventDefault()
                    }
                })
                input.current.addEventListener("keyup", e => {
                    let val = String(e.target.value).split(",").join("")
                    let inputValue = splitNumber(val)
                    e.target.value = inputValue
                })
                break;
            case "qty":
                input.current.addEventListener("keydown", e => {
                    if (/\d/.test(e.key)) {

                    } else if (e.key == "Backspace" || e.key == "Tab") {

                    } else {
                        e.preventDefault()
                    }
                })

                break;
            case "percent":
                input.current.addEventListener("keydown", e => {
                    if (/\d/.test(e.key)) {
                    } else if (e.key == "Backspace" || e.key == "Tab") {

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
            if (e.target.value == "") {
                if(name == "name" || name=="price" || name=="qty")  input.current.style.backgroundColor = "rgba(255,0,0,.2)" 
            } else {
                input.current.style.backgroundColor = "white"

            }
        })

    }, [])


    useEffect(() => {
        update({ name, value })
    }, [value])
    return (
        <td className="table-cell w-full">
            <input disabled={name=="totalPrice"?true:false} className={"border w-fit text-center h-7" + (name == "name" ? " w-full" : "")}
                placeholder={name} id={`${name}-${r}`} autoComplete="false" aria-autocomplete="false" autoCorrect="false" ref={input} type="text" />
        </td>
    )
}

export default TableCol