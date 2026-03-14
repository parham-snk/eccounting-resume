import splitNumber from "../../components/util/split-numbers"
import Bill_table_row from "./components/bill_table_row"
import BILL_TABLE from "./components/bill_table_row"

const { useState, useEffect } = require("react")

const Billing_Result = props => {
    const [res, setRes] = useState()
    const [rows, setRows] = useState()
    const [sumbed, setsumbed] = useState()
    const [sumbes, setsumbes] = useState()
    const [sumTotal, setSumTotal] = useState()
    useEffect(() => {
        if (props.data) {
            setRes(props.data)
        }
    }, [props])


    useEffect(() => {
        if (res) {
            let items = [...res].map((item, index) => <Bill_table_row data={item} r={index} key={index} />)
            setRows(items)
            if(items.length==0){
                return setRows()
            }
            if (items.length > 1) {
                let Sum_bed = [...res].filter(item => item.price_type == "bed").map(item => item.price_value)
                if (Sum_bed.length > 1) {
                    Sum_bed = [...Sum_bed].reduce((t, c) => Number(t) + Number(c))
                } else {
                    Sum_bed = Sum_bed[0]
                }
                setsumbed(Sum_bed)
                let Sum_bes = [...res].filter(item => item.price_type == "bes").map(item => item.price_value)
                if (Sum_bes.length > 1) {
                    Sum_bes = [...Sum_bes].reduce((t, c) => Number(t) + Number(c))
                } else {
                    Sum_bes = Sum_bes[0]
                }
                setsumbes(Sum_bes)
            } else {

                setsumbed(res[0].price_type == "bed" ? res[0].price_value : 0)

                setsumbes(res[0].price_type == "bes" ? res[0].price_value : 0)
            }


        }

    }, [res])
    useEffect(() => {

    }, [rows])
    return (
        <div>
            <table className="w-full my-5 border">
                <tr className="bg-white text-black">
                    <th className="text-center">r</th>
                    <th className="text-center">تاریخ</th>
                    <th className="w-1/3 text-center">توضیحات</th>
                    <th className="text-center">بد</th>
                    <th className="text-center">بس</th>
                    <th className="text-center">نوع</th>
                    <th className="text-center">باقی مانده</th>
                </tr>
                {
                    rows &&
                    rows
                }
                {
                    rows &&
                    <tr>
                        <td className="p-2 bg-white text-center"></td>
                        <td className="p-2 bg-white text-center"></td>
                        <td className="p-2 bg-white text-center"></td>
                        <td className="p-2 border text-center">{splitNumber(sumbed)}</td>
                        <td className="p-2 border text-center">{splitNumber(sumbes)}</td>
                        <td className="p-2 border text-center">{splitNumber(res[[...res].length - 1].total_type) == "bed" ? "بد" : "بس"}</td>
                        <td className="p-2 border text-center">{splitNumber(res[[...res].length - 1].total_value)}</td>
                    </tr>
                }

            </table>
        </div>
    )
}

export default Billing_Result