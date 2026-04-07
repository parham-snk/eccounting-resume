import { useEffect, useState } from "react"
import splitNumber from "../../../../components/util/split-numbers"

const Invoice_table_modal = props => {
    const [rows, setRows] = useState()


    const Tr = props => {
        let data = props.data
        let total = Number(data.price * data.p_qty)

        if (data.discount) {
            total -= total * data.discount / 100

        }
        return <tr>
            <td className="text-center border p-2">{data?.r}</td>
            <td className="text-center border p-2">{data?.product_name}</td>
            <td className="text-center border p-2">{data?.p_qty}</td>
            <td className="text-center border p-2">{splitNumber(data?.price)}</td>
            <td className="text-center border p-2">{data?.discount == "" ? 0 : data?.discount}</td>
            <td className="text-center border p-2">{splitNumber(total)}</td>
        </tr>
    }
    useEffect(() => {
        if (props.data) {
            let R = [...props.data].map((item, index) => <Tr data={item} key={index} />)
            setRows(R)
        }
    }, [props])

    return (
        <table className="w-full    table  ">
            <thead className="sticky z-10  top-0 bg-gray-500 rounded-md text-white w-full h-full ">
                <th className=" w-auto relative">r</th>
                <th className=" relative">نام کالا</th>
                <th className=" relative">تعداد کالا</th>
                <th className=" relative">قیمت واحد </th>
                <th className=" relative">درصد تخفیف</th>
                <th className=" relative">قیمت کل</th>
            </thead>
            {
                rows &&
                rows
            }
            {
                rows &&
                <tr>
                    <td className="bg-gray-500"></td>
                    <td className="bg-gray-500"></td>
                    <td className="bg-gray-500"></td>
                    <td className="bg-gray-500"></td>
                    <td className="bg-gray-500"></td>
                    <td className="text-center border p-2">{props.total_price && splitNumber(props?.total_price)}</td>
                </tr>
            }
        </table>
    )
}

export default Invoice_table_modal