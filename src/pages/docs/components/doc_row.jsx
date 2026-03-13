import { useEffect, useRef, useState } from "react"
import splitNumber from "../../../components/util/split-numbers"
import Modal from "../../../components/modal"
import SearchUserModal from "../../../components/modals/searchUser"

const DOC_ROW = props => {



    const [bed, setBed] = useState("")
    const [bes, setBes] = useState("")
    const [desc, setDesc] = useState("")
    const [eccount, setEccount] = useState("")
    const [modal, showModal] = useState(false)
    const [total, setTotal] = useState()

    const eccountRef = useRef()
    const bedRef = useRef()
    const besRef = useRef()
    const totalRef = useRef()



    useEffect(() => {

        props.update({ eccount, bed, bes, desc })
    }, [eccount, bed, bes, desc])
    useEffect(() => {

        if (eccount)
            eccountRef.current.value = eccount.eccount_name
    }, [eccount])
    return <tr >

        <td className="border text-center">{
            //eccount
            Number(props?.r)+1
        }</td>

        <td className="border">
            <input ref={eccountRef} autoComplete="off" type="text" className=" cursor-pointer  rounded p-1 my-1 text text-center select-none" onFocus={() => {
                if (!modal) {
                    showModal(true)
                }
            }} />
            {
                modal &&
                <Modal close={() => {
                    showModal(false)
                }} >
                    <SearchUserModal close={() => showModal(false)} setEccount={eccount => {

                        setEccount(eccount)
                    }} />
                </Modal>
            }
        </td>
        {
            //description
        }
        <td className="border">

            <textarea cols={1} name="" id="" className="w-full rounded-none outline-0 p-2" onChange={e => setDesc(e.target.value)}></textarea>
        </td>
        {
            //bed col

        }
        <td className="border text-2xl">

            <input type="text" disabled={bes ? true : false} className="p-2 text-center w-full  h-full" onKeyDown={e => {
                const dig = /\d/
                if (dig.test(e.key)) {

                }
                else if (e.key == "Backspace") {

                }
                else {
                    e.preventDefault()
                }
            }}
                onChange={e => {
                    let number = String(e.target.value).split(",").join("")
                    setBed(number)
                    e.target.value = splitNumber(number)
                }}
            />
        </td>
        {
            //bes col

        }
        <td className="border text-2xl">

            <input type="text" disabled={bed ? true : false} className="p-2 w-full text-center" onKeyDown={e => {
                const dig = /\d/
                if (dig.test(e.key)) {

                }
                else if (e.key == "Backspace") {

                }
                else {
                    e.preventDefault()
                }
            }}
                onChange={e => {
                    let number = String(e.target.value).split(",").join("")
                    setBes(number)
                    e.target.value = splitNumber(number)
                }}
            />
        </td>
        {
            //total
        }
        <td className="border w-full text-2xl">
            {
                bed &&
                <p className="text-red-400 w-full text-center">{splitNumber(bed)}</p>
            }
            {
                bes &&
                <p className="text-blue-400 w-full text-center">{splitNumber(bes)}</p>
            }

        </td>
    </tr>
}

export default DOC_ROW