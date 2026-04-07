import { useContext, useEffect, useState } from "react"
import get_Date from "../../components/util/get_date"
import { Context } from "../../context/Context"
import splitNumber from "../../components/util/split-numbers"

const Invoice_list_page = props => {
    let { data } = props
    const { eccounts } = useContext(Context)
    const [rows, setRows] = useState()

    useEffect(() => {
        if (props.data) {

            let { data } = props;


            let R = [...data].map((item, index) => {

                return <tr
                    key={index}
                    onDoubleClick={() => {
                        if (props.eccount) {
                            props.setModal(item)
                        } else {
                            props.setModal(item)
                        }
                    }}

                    className="cursor-pointer sticky"
                >
                    <td className="border dark:border-white p-2">{index + 1}</td>
                    <td className="border dark:border-white p-2">{item.doc_id}</td>
                    <td className="border dark:border-white p-2">{get_Date(item.custom_date)}</td>
                    <td className="border dark:border-white p-2">{item.invoice_id}</td>
                    <td className="border dark:border-white p-2">{item.eccount_name}</td>
                    <td className="border dark:border-white p-2">{item.invoice_type == "bed" ? "خرید" : "فروش"}</td>
                    <td className="border dark:border-white p-2">{splitNumber(item.total_price)}</td>
                </tr>
            });
            setRows(R)
        }
    }, [props])
    return (
        <div className="w-full overflow-y-scroll p-2">
            <table className="w-full text-center h-2/3 overflow-y-scroll ">
                <tr className="bg-black text-white dark:text-black dark:bg-white p-2">
                    <th className="p-1">r</th>
                    <th className="p-1">شماره سند</th>
                    <th className="p-1">تاریخ</th>
                    <th className="p-1">شماره فاکتور</th>
                    <th className="p-1">حساب</th>
                    <th className="p-1">نوع فاکتور</th>
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