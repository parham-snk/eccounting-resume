import { useEffect, useState } from "react"
import TableRow from "./row"

const Table = props => {
    const [form, setForm] = useState([])
    const [arr, setArr] = useState([1, 2, 3, 4])
    let elements = arr.map((i, index) => <TableRow update={({ counter, values }) => {
        setForm({ ...form, [counter]: values })
    }} key={index} counter={index} />)
    const [total, setTotal] = useState(0)
    useEffect(() => {

        let numbers = []
        for (let value in form) {

            if (form[value]?.totalPrice) {
                numbers.push(form[value].totalPrice.split(",").join(""))
            }
        }
        if (numbers.length > 0) {
            let t = numbers.reduce((t, c) => Number(c) + Number(t))
            if (String(t).includes(".")) {
                t = Number(t).toFixed(2)
            }
            setTotal(t)
        }

    }, [form])


    return (
        <div className="w-full flex justify-center align-sub  overflow-y-scroll" id="box">
            <table className="w-4/5   mx-2  table ">
                <thead className="sticky  top-0 bg-white w-full h-full">
                    <th className="bg-white relative">r</th>
                    <th className="bg-white relative">نام کالا</th>
                    <th className="bg-white relative">تعداد کالا</th>
                    <th className="bg-white relative">فیمت واحد </th>
                    <th className="bg-white relative">درصد تخفیف</th>
                    <th className="bg-white relative">قیمت کل</th>
                </thead>
                <tbody className="relative">
                    {
                        elements
                    }
                    <button className="absolute -left-10 bottom-0 bg-black text-white py-1 px-2  transition rounded-full cursor-pointer" onClick={() => {
                        setArr([...arr, arr.length])
                        document.getElementById("box").scrollTo(0, (document.getElementById("box").scrollHeight))
                    }}>+</button>
                </tbody>
                <tfoot className="relative border">
                    <td className="text-center">مجموع</td>

                    <td className="w-1/6 text-center px-2 absolute left-0 top-0 bg-gray-500 text-white">{total}</td>
                </tfoot>
            </table>


        </div>
    )
}
export default Table