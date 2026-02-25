import { useContext, useEffect, useRef, useState } from "react"
import { Context } from "../../../context/Context"

import ElementI from "./element"

const Div = props => {
    return
}
const CatParentInput = props => {
    const input = useRef()
    const [nameInput, setNameInput] = useState()
    const { orgcats } = useContext(Context)
    const [show, setshow] = useState(false)

    const [suggested, setsuggested] = useState()
    useEffect(() => {
        function ClickEvent(item) {
            input.current.value = String(item.cat_name)
            setsuggested()
            setshow(false)
            props.setCatParent(item.cat_id)
        }
        let filter = [...orgcats].filter(item => String(item.cat_name).includes(nameInput))
        if (filter.length > 0 && nameInput) {
            setshow(true)
            setsuggested(filter.map((item, index) =>
                <ElementI item={item} key={index} ClickEvent={(item) => {
                    ClickEvent(item)
                }} />).slice(0, 7))
        } else {
            setsuggested()
            setshow(false)
            props.setCatParent()
        }
    }, [nameInput])

    useEffect(() => {
        if (props?.value) {
            [...orgcats].forEach(item => item.cat_id == props.value ? input.current.value = item.cat_name : null)
        }
    }, [props])


    window.onkeydown = e => {

        if (e.key == "ArrowDown") {

        }
    }

    return (
        <div div className="relative w-full" >
            <input autoComplete="off" ref={input} id="cat" className={` w-full p-2 rounded shadow bg-white dark:text-black`} type="text"
                onFocus={() => {
                    setsuggested([...orgcats].map((item, index) => <ElementI item={item} key={index} ClickEvent={(item) => {
                        input.current.value = String(item.cat_name)
                        setsuggested()
                        setshow(false)
                        props.setCatParent(item.cat_id)
                    }} />).slice(0, 7))
                    setshow(true)
                }}
                onBlur={(e) => {


                    setTimeout(() => {
                        setshow(false)
                    }, 100);
                    if (e.target.value) {
                        let value = String(e.target.value).trim()
                        orgcats.forEach(item => item.cat_name == value ? props.setCatParent(item.cat_id) : null)

                    } else {
                        props.setCatParent()
                    }
                }}
                onChange={e => {
                    if (e.target.value == "") {
                        setshow(false)
                        return props.setCatParent(false)
                    }
                    if (e.target.value) {
                        setNameInput(e.target.value)
                    } else {
                        props.setCatParent()
                    }
                }}
                placeholder={props.placeholder ? props.placeholder : "زیر مجموعه"} />
            {
                suggested && show &&
                <div className="w-full h-fit p-2 bg-white dark:bg-zinc-700 shadow-xl rounded absolute mt-2 z-10 dark:text-white">
                    <p className="text-xs py-1 border-b">پیشنهادها</p>
                    {suggested}
                </div>
            }
        </div >
    )
}

export default CatParentInput