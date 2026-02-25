import { useEffect, useState } from "react"
import TableRow from "./row"
import splitNumber from "../../components/util/split-numbers"

const Table = props => {
    const { limit } = props
    const [form, setForm] = useState([])
    const [arr, setArr] = useState([1, 2, 3, 4])
    const [total, setTotal] = useState(0)
    const [emptyList, setEmptyList] = useState([])


    function getTotalPrice() {
        let numbers = []
        //گرفتن مقدار هر totalPrice در آرایه فرم و push کردن اون به آرایه numbers جهت به دست آوردن مبلغ کل فاکتور 
        for (let value in form) {
            if (form[value]?.totalPrice) {
                numbers.push(form[value].totalPrice)
            }
        }

        // به دست آوردن مبلغ کل فاکتور با استفاده از آرایه numbers
        if (numbers.length > 0) {
            let t = numbers.reduce((t, c) => Number(c) + Number(t))
            t = splitNumber(t)
            setTotal(t)
        } else {
            setTotal(0)
        }
        //اضافه کردن ردیف جدید بعد از تکمیل فیلدهای ردیف آخر
        if (form[arr.length - 1]?.totalPrice) {
            addRow().then(() => {
                setTimeout(() => {
                    document.getElementById(`name-${(arr.length)}`)?.focus()
                }, 900);

            })
        }
    }

    let elements = arr.map((i, index) => <TableRow limit={limit} update={(row) => {
        setForm({ ...form, [index + 1]: row })

    }} remove={index => {
        let f = form
        delete f[index]
        getTotalPrice()
        setForm(f)
    }} key={index} counter={index} />)
    useEffect(() => {
        if (form)
            getTotalPrice()
    }, [form])
    // فانکشن افزودن ردیف در جدول

    async function addRow() {
        setArr([...arr, arr.length + 1])
        document.getElementById("box").scrollTo(0, (document.getElementById("box").scrollHeight))
    }

    return (
        <div className="w-full flex justify-center align-sub  overflow-y-scroll" id="box">
            <table className="w-fit   mx-2  table  ">
                <thead className="sticky z-10  top-0 bg-gray-500 rounded-md text-white w-full h-full ">
                    <th className=" w-auto relative">r</th>
                    <th className=" relative">نام کالا</th>
                    <th className=" relative">تعداد کالا</th>
                    <th className=" relative">قیمت واحد </th>
                    <th className=" relative">درصد تخفیف</th>
                    <th className=" relative">قیمت کل</th>
                </thead>
                <tbody className="relative dark:text-white">
                    {
                        elements
                    }
                    {
                        //add row BTN
                    }
                    <button
                        className="absolute -left-10 bottom-0 bg-black text-white py-1 px-2  transition rounded-full cursor-pointer"
                        onClick={addRow}>+</button>
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