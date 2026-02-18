import { useEffect, useState } from "react"
import Eccount_Modifier from "./eccounts/eccount_modifire"
import Eccount_List from "./eccounts/eccounts_List"

const Eccounts_page = props => {
    const [eccount, setEccount] = useState()
    useEffect(() => {
        document.title = "حسابها"
    }, [])
    return <div className="flex flex-row justify-between align-middle items-center w-full h-full ">
        <Eccount_List changeModifier={eccount => {
            setEccount(eccount)
        }} />
        <Eccount_Modifier eccount={eccount ? eccount : null} />
    </div>
}

export default Eccounts_page