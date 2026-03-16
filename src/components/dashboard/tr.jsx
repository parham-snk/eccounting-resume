import get_Date from "../util/get_date"
import splitNumber from "../util/split-numbers"

const Tr = ({data}) => {
    let {invoice_id,custom_date,invoice_type,total_price,eccount_name}=data
    // let d=new Date(date).toLocaleString("fa-IR")
    // let dd =d.split(",")[0]
    
    return (
        <tr className="py-2 border-b-0 hover:bg-gray-200 dark:hover:bg-zinc-900 dark:hover:text-white">
            <td className="py-4">{invoice_id}</td>
            <td className="py-4">{get_Date(custom_date)}</td>
            <td className="py-4">{eccount_name}</td>
            <td className="py-4">{invoice_type=="bed"?`فاکتور خرید ${invoice_id}`:`فاکتور فروش ${invoice_id}`}</td>
            <td className="py-4">{splitNumber(total_price)}</td>
            <td className="py-4">{invoice_type=="bed"?"بد":"بس"}</td>
            <td className="py-4">نمایش</td>
        </tr>
    )
}

export default Tr