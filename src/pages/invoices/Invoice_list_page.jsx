import { useEffect, useState } from "react"
import get_Date from "../../components/util/get_date"

const Invoice_list_page = props => {
    let { data } = props
    const [rows, setRows] = useState()

    useEffect(() => {
        if (props.data) {
            let { data } = props;
            let R = [...data].map((item, index) => {
                return <tr
                onDoubleClick={()=>{
                    alert(index+1)
                }}

                className="cursor-pointer"
                >
                    <td className="border dark:border-white p-1">{index+1}</td>
                    <td className="border dark:border-white p-1">{item.doc_id}</td>
                    <td className="border dark:border-white p-1">{get_Date(item.custom_date)}</td>
                    <td className="border dark:border-white p-1">{item.invoice_id}</td>
                    <td className="border dark:border-white p-1">{props.eccount.eccount_name}</td>
                    <td className="border dark:border-white p-1">{item.invoice_type == "bed" ? "بد" : "بس"}</td>
                    <td className="border dark:border-white p-1">{item.total_price}</td>
                </tr>
            });
            setRows(R)
        }
    }, [props])
    return (
        <div className="w-full">
            <table className="w-full text-center">
                <tr className="bg-black text-white dark:text-black dark:bg-white p-2">
                    <th className="p-1">r</th>
                    <th className="p-1">شماره سند</th>
                    <th className="p-1">تاریخ</th>
                    <th className="p-1">شماره فاکتور</th>
                    <th className="p-1">حساب</th>
                    <th className="p-1">بد/بس</th>
                    <th className="p-1">کل فاکتور</th>
                </tr>
                {
                    rows && rows.length > 0 &&
                    rows
                }
            </table>
        </div>
    )
}
export default Invoice_list_page