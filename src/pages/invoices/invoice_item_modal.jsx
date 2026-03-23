import { useContext, useEffect, useState } from "react"
import get_Date from "../../components/util/get_date"
import { Context } from "../../context/Context"
import Invoice_table_modal from "./components/invoice_modal/invoice_table_modal"

const Invoice_item_modal = props => {
    const { getInvoice } = useContext(Context)
    const [invoice, setInvoice] = useState()
    const [items, setItems] = useState()
    const [trs, setTrs] = useState()

    useEffect(() => {
        if (props.data)
            setInvoice(props.data)
    }, [props])

    useEffect(() => {
        if (invoice) {
            getInvoice(invoice.invoice_id).then(data => {
                setItems(data)
            })
        }
    }, [invoice])


    return <div className="w-1/2 h-4/5 my-2  
    bg-white dark:bg-zinc-800 rounded shadow dark:text-white
    z-10
    ">

        <div className="bg-white dark:bg-zinc-700 w-full h-full shadow rounded flex flex-col  md:justify-start align-middle items-start p-3 md:p-0 ">
            <div className="w-full justify-center flex py-2 pt-3 "><p className="bg-gray-500 rounded p-2 text-white text-sm ">
                فاکتور {invoice?.invoice_type == "bed" ? "خرید" : "فروش"}  </p></div>
            <table className="flex flex-row  justify- align-middle items-center w-1/4 right-0 md:w-full py-2 dark:text-white">
                <tr className="flex flex-col items-center mx-2">
                    <th className="my-1 p-1 text-xs bg-gray-500 w-full rounded text-white text-nowrap">شماره فاکتور</th>
                    <th className="my-1 p-1 text-xs bg-gray-500 w-full rounded text-white">تاریخ</th>
                    <th className="my-1 p-1 text-xs bg-gray-500 w-full rounded text-white">{invoice?.invoice_type=="bed"?"فروشنده":"خریدار"}</th>
                </tr>
                <tr className="flex flex-col justify-between align-middle items-center">
                    {
                        //شماره فاکتور
                    }
                    <td className="my-2" >{invoice?.invoice_id}</td>
                    {
                        //تاریخ
                    }
                    <td className="my-2">
                        {get_Date(invoice?.custom_date)}
                    </td>
                    {
                        //حساب
                    }
                    <td className="relative my-2">

                        {
                            invoice?.eccount_name
                        }
                    </td>

                </tr>
            </table>
            <div className="p-2 w-full">
                {
                    items &&
                    <Invoice_table_modal data={items} total_price={invoice.total_price} />
                }
            </div>

        </div >
    </div>
}

export default Invoice_item_modal