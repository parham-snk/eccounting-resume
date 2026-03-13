import { useEffect, useState } from "react"
import DOC_ROW from "./components/doc_row"

const DOC_TABLE = props => {
    const [orgForm, setOrgForm] = useState(props.form)
    const [form, setForm] = useState([]);
    const [rows, setRows] = useState([1, 2]);
    const [elements, setElements] = useState();

    const [totalbed, setTotalBed] = useState()
    const [totalbes, setTotalBes] = useState()
    const [total, setTotal] = useState()

    useEffect(() => {
        const list = [...rows].map((item, index) => <DOC_ROW key={index} r={index} update={(value) => {

            setForm({ ...form, [index + 1]: value })
        }} />)

        setElements(list)

    }, [rows])

    useEffect(() => {
        props.update(form)
    }, [form])

    useEffect(() => {
        if (props.form) {
            let vals = Object.values(Object.values(props.form))
            if (vals.length > 0) {
                let bed = vals.map(item => item.bed).reduce((t, c) => Number(c) ? Number(t) + Number(c) : Number(t))
                let bes = vals.map(item => item.bes).reduce((t, c) => Number(c) ? Number(t) + Number(c) : Number(t))

                setTotalBed(bed)
                setTotalBes(bes)
            }

        }
    }, [props])

    useEffect(() => {
        let res = Number(totalbed) - Number(totalbes)
        setTotal(res < 0 ? res * -1 : res)
    }, [totalbed, totalbes])
    return (
        <div className="w-full">
            <table className="
        w-full relative
        border border-black dark:border-white 
        rounded-2xl
        my-6
        ">
                <tr>
                    <th className="w-1/20 border p-1">r</th>
                    <th className="w-1/8 border p-1">حساب</th>
                    <th className="w-2/6 border p-1">توضیحات</th>
                    <th className="w-1/6 border p-1">بدهکار</th>
                    <th className="w-1/6 border p-1">بستانکار</th>
                    <th className="w-1/6 border p-1">کل</th>
                </tr>
                {
                    elements
                }

                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className=" bg-white min-h-20 border-black border p-2 text-black text-center">
                        {totalbed}
                    </td>

                    <td className=" bg-white min-h-20 border-black border p-2 text-black text-center">
                        {totalbes}
                    </td>

                    <td className=" bg-white min-h-20 border-black border p-2 text-black text-center">
                        {total}
                    </td>
                </tr>
                <div 
                onClick={()=>{
                    setRows([...rows,[...rows].length])
                }}
                className="absolute w-7 h-7 rounded-full bg-white text-black border border-black -left-1 bottom-10 flex justify-center items-center align-middle text-xl cursor-pointer">
                    +
                </div>
                <button onClick={()=>{
                    props.submit(total)
                }}>submit</button>
            </table>
        </div>
    )
}

export default DOC_TABLE