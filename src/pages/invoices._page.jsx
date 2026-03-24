import { useContext, useEffect, useState } from "react"
import Invoice_search from "./invoices/invoice_search"
import { Context } from "../context/Context"
import Invoice_list_page from "./invoices/Invoice_list_page"
import Modal from "../components/modal"
import Invoice_item_modal from "./invoices/invoice_item_modal"

const Invoices_page = props => {
    let { invoices } = useContext(Context)
    invoices = invoices ? [...invoices].reverse() : invoices
    const [name, setName] = useState()
    const [eccountFilter, setEccountFilter] = useState()
    const [result, setResult] = useState()


    const [modal_invoice, set_modal_invoice] = useState()
    const [showModal, setShowModal] = useState()

    useEffect(() => {
        document.title = "فاکتورها"
    }, [])

    // searching conditions
    function SearchByName() {
        if (String(name).trim() == "خرید" || String(name).trim() == "فاکتور خرید") {
            let filter = [...invoices].filter(item => item.invoice_type == "bed")
            if (eccountFilter || eccountFilter != "") {
                filter = filter.filter(item => item.custommer_id == eccountFilter)
                return setResult(filter)
            }
            return setResult(filter)
        }

        else if (String(name).trim() == "فروش" || String(name).trim() == "فاکتور فروش") {
            let filter = [...invoices].filter(item => item.invoice_type == "bes")
            if (eccountFilter || eccountFilter != "") {
                filter = filter.filter(item => item.custommer_id == eccountFilter)
                return setResult(filter)
            }
            return setResult(filter)
        }

        else if (/\d+/.test(name)) {
            let filter = [...invoices].filter(item => String(item.invoice_id).includes(name) || String(item.doc_id).includes(name))
            if (eccountFilter) {
                filter = filter.filter(item => item.custommer_id == eccountFilter)
                return setResult(filter)
            }
            return setResult(filter)
        }
        else if (name == "" && !eccountFilter) {
            setResult(invoices)
        } else if (name == "" && eccountFilter) {
            let filter = [...invoices].filter(item => item.custommer_id == eccountFilter)
            setResult(filter)
        }
    }
    useEffect(() => {

        SearchByName()


    }, [name])

    useEffect(() => {
        if (eccountFilter) {
            let filter = [...invoices].filter(item => item.custommer_id == eccountFilter.eccount_id)
            setResult(filter)

        } else {
            if (name) {
                SearchByName()

            } else {
                setResult(invoices)
            }
        }
    }, [eccountFilter])


    useEffect(() => {
        if (modal_invoice) {
            setShowModal(true)
        } else {
            setShowModal(false)
        }
    }, [modal_invoice])
    return (
        <div className="bg-white dark:bg-zinc-700 dark:text-white flex flex-col w-full h-full rounded shadow p-2">
            <Invoice_search updateName={val => setName(val)} updateEccountFilter={val => setEccountFilter(val)} />
            <Invoice_list_page data={result} setModal={val => {
                set_modal_invoice(val)
                setShowModal(true) 
            }}/>
            {
                showModal &&
                <Modal close={() => setShowModal(false)}>
                    <Invoice_item_modal data={modal_invoice} />
                </Modal>
            }
        </div>
    )
}

export default Invoices_page