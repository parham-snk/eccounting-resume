import { useEffect, useState } from "react"
import SearchUserModal from "./modals/searchUser"
const Modal = props => {
    const [show, setshow] = useState(true)
    useEffect(() => {
        window.addEventListener("keypress", e => {
            console.log(e.location)
        })
    })
    return (
        <div id="modal" className="fixed w-full h-full z-50  top-0 left-0 flex flex-row justify-center align-middle items-center" >
            <div className="z-0 absolute top-0 left-0 backdrop-blur-xs w-full h-full modal" onClick={() => {
                props.close()
                setshow(false)
            }}></div>

            <props.component />

        </div>
    )
}

export default Modal