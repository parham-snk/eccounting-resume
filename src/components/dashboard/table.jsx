import { useEffect, useState } from "react"
import Tr from "./tr"

const Table = (props) => {
    const [rows, setRows] = useState()
    useEffect(() => {
        let arr =props.data.map((row, index) => <Tr setInvoiceItem={val=>props.setInvoiceItem(val)} key={index} data={row} />)
        setRows(arr)
    }, [props])

    return (
        <table className="w-full h-full max-h-full  text-center overflow-y-scroll scale-99 md:scale-100 text-xs ">
            <tr className="py-2 sticky -top-1 md:top-0 bg-white dark:bg-zinc-800 shadow">
                <th className="py-2 w-1/10">شماره سند</th>
                <th className="py-2 w-1/10">تاریخ</th>
                <th className="py-2 w-1/10">حساب</th>
                <th className="py-2">توضیحات</th>
                <th className="py-2">مبلغ</th>
                <th className="py-2">بد / بس</th>
                <th className="py-2">اپراتور</th>
            </tr>
            {rows && rows}
        </table>
    )
}

export default Table