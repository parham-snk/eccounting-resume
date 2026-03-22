import { useContext, useEffect, useState } from "react"
import { Context } from "../context/Context"
import Billing_search from "./billing/Billing_search"
import Billing_Result from "./billing/billing_result"


const Billing_Page = props => {
    const { getEccount } = useContext(Context)
    const [eccount, setEccount] = useState()
    const [result, setResult] = useState()

    useEffect(()=>{
        document.title="صورتحساب ها"
    },[])
    useEffect(() => {
        if (eccount) {
            getEccount(eccount.eccount_id).then(data => {
                setResult(data)
            })
        }
    }, [eccount])
    return (
        <div className="w-full h-full bg-white dark:bg-zinc-700 dark:text-white">
            <Billing_search update={ecc => setEccount(ecc)} />
            {
                eccount &&
                <Billing_Result data={result} />
            }

        </div>
    )
}

export default Billing_Page