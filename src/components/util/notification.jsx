import { useEffect, useRef, useState } from "react"

const Notification = (props) => {
    const { text, type, setShow } = props
    const [show, setshow] = useState(false)
    let timer = useRef();

    function hide() {
        setshow(false)
        setTimeout(() => {
            setShow(false)
        }, 1000);
    }
    useEffect(() => {
        setTimeout(() => {
            setshow(true)
        }, 100);
        timer.current = setTimeout(hide, 5000)
    }, [])

    return (
        <div
            className={` absolute w-80 h-13 rounded p-2 border -right-100 bottom-10 z-50 ${show ? "mr-110" : "-mr-100"}
        dark:bg-zinc-800 ${type ? "dark:border-green-600" : "dark:border-white border-green-400"}  dark:text-white bg-white shadow
        flex flex-row justify-start align-middle items-center
        `}
            onMouseMove={() => {
                clearTimeout(timer.current)
            }}
            onMouseOut={() => {
                timer.current = setTimeout(hide, 3000)
            }}
        >
            <p className={`border-r-4 ${type ? "border-r-green-600" : "border-r-red-600"}  ps-2`}>{text}</p>
        </div>
    )
}

export default Notification