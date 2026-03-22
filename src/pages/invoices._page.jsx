import { useContext, useEffect, useState } from "react"
import Invoice_search from "./invoices/invoice_search"
import { Context } from "../context/Context"
import Invoice_list_page from "./invoices/Invoice_list_page"

const Invoices_page = props => {
    const { invoices } = useContext(Context)

    const [name, setName] = useState()
    const [eccountFilter, setEccountFilter] = useState()
    const [result, setResult] = useState()


    const [modal_invoice, set_modal_invoice] = useState()
    const [showModal,setShowModal]=useState()

    
    // searching conditions
    useEffect(() => {

        if (name == "خرید" || String(name).trim() == "فاکتور خرید") {
            let filter = [...invoices].filter(item => item.invoice_type = "bed")
            if (eccountFilter) {
                filter = filter.filter(item => item.custommer_id == eccountFilter)
                return setResult(filter)
            }
            return setResult(filter)
        }

        if (name == "فروش" || String(name).trim() == "فاکتور فروش") {
            let filter = [...invoices].filter(item => item.invoice_type = "bes")
            if (eccountFilter) {
                filter = filter.filter(item => item.custommer_id == eccountFilter)
                return setResult(filter)
            }
            return setResult(filter)
        }

        if (/\d+/.test(name)) {
            let filter = [...invoices].filter(item => item.invoice_id == name || item.doc_id == name)
            if (eccountFilter) {
                filter = filter.filter(item => item.custommer_id == eccountFilter)
                return setResult(filter)
            }
            return setResult(filter)
        }


    }, [name])

    useEffect(() => {
        if (eccountFilter) {
            let filter = [...invoices].filter(item => item.custommer_id == eccountFilter.eccount_id)
            setResult(filter)

        }
    }, [eccountFilter])

    useEffect(() => {
        document.title = "فاکتورها"
    }, [])
    return (
        <div className="bg-white dark:bg-zinc-700 dark:text-white flex flex-col w-full h-full rounded shadow">
            <Invoice_search updateName={val => setName(val)} updateEccountFilter={val => setEccountFilter(val)} />
            <Invoice_list_page data={result} eccount={eccountFilter} />
        </div>
    )
}

export default Invoices_page