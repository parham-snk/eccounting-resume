import { useEffect, useRef, useState } from "react"

const Notification = (props) => {
    const { text, type, setShow } = props

    let timer = useRef();
    useEffect(() => {
        timer.current = setTimeout(() => {
            setShow(false)
        }, 3000)
    }, [])

    return (
        <div
            className={`absolute w-80 h-13 rounded p-2 border right-10 bottom-10 z-10
        dark:bg-zinc-800 ${type ? "dark:border-green-600" : "dark:border-white border-green-400"}  dark:text-white
        flex flex-row justify-start align-middle items-center
        `}
            onMouseMove={() => {
                // clearTimeout(timer)
                clearTimeout(timer.current)
            }}
            onMouseOut={() => {
                timer.current = setTimeout(() => {
                    setShow(false)
                }, 3000)
            }}
        >
            <p className={`border-r-4 ${type ? "border-r-green-600" : "border-r-red-600"}  ps-2`}>{text}</p>
        </div>
    )
}

export default Notification