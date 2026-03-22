import { useEffect, useState } from "react"
import Eccount_Field from "./components/invoice_search/eccount_field"

const Invoice_search = props => {
    const { updateName, updateEccountFilter } = props

    const [str, setStr] = useState("")
    const [eccount, setEccount] = useState("")

    useEffect(() => {
        if (updateName) {
            updateName(str)
        }
    }, [str])
    useEffect(() => {
        if (updateEccountFilter) {
            updateEccountFilter(eccount)
        }
    }, [eccount])
    return (
        <div className="w-full h-14 flex flex-row justify-start align-middle items-center p-2">
            <p>متن جست و جو :</p>
            <input className="border dark:border-white mx-2 rounded p-2 w-60" type="text" onChange={e => setStr(e.target.value)} />
            <p className="ms-2">حساب :</p>
            <Eccount_Field updateEccountFilter={val=>updateEccountFilter(val)}/>

        </div>
    )
}

export default Invoice_search