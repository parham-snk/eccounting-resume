import get_Date from "../../../components/util/get_date"
import splitNumber from "../../../components/util/split-numbers"



const Bill_table_row = props => {

    return (
        <tr>
            <td className="p-2  border text-center">{Number(props.r) + 1}</td>
            <td className="p-2  border text-center">{get_Date(props.data.customeDate)}</td>
            <td className="p-2 w-1/5 border text-start text-wrap">{props.data.text}</td>
            <td className="p-2 w-1/6 border text-center">{props.data.price_type == "bed" && splitNumber(props.data.price_value)}</td>
            <td className="p-2 w-1/6 border text-center">{props.data.price_type == "bes" && splitNumber(props.data.price_value)}</td>
            <td className="p-2  border text-center">{props.data.total_type=="bed"?"بد":"بس"}</td>
            <td className="p-2  border text-center w-1/10">{splitNumber(props.data.total_value)}</td>
        </tr>
    )
}

export default Bill_table_row