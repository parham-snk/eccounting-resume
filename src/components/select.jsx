import { useEffect, useState } from "react"

const Select = props => {
    const [show, setShow] = useState(false)
    useEffect(() => {
        if (show) {
            setShow(!show)


        } else {
            setShow(!show)

        }
    }, [])
    return (
        <div className="flex flex-row justify-start align-middle w-10 h-5   mx-2 cursor-pointer" onClick={() => {
            if (show) {
                setShow(!show)
                document.querySelector('#w').style.background = "#1E2939"
                document.querySelector('#w').querySelector("div").style.background = "white"
                document.querySelector('#w').querySelector("div").style.marginLeft = "60%"

            } else {
                setShow(!show)
                document.querySelector('#w').style.background = "white"
                document.querySelector('#w').querySelector("div").style.background = "#1E2939"
                document.querySelector('#w').querySelector("div").style.marginLeft = "0%"
            }
        }}>
            <div id="w" className="w-full h-full bg-white  flex flex-row justify-end align-middle items-center border-2 p-1 border-gray-800 rounded-full ">

                <div id="" className="h-3 w-3 bg-gray-800 rounded-full"></div>


            </div>
        </div>
    )
}

export default Select