const Tr = ({data}) => {
    let {id,date,desc,price,type}=data
    let d=new Date(date).toLocaleString("fa-IR")
    let dd =d.split(",")[0]
    return (
        <tr className="py-2 border-b-0 hover:bg-gray-200">
            <td className="py-4">{id}</td>
            <td className="py-4">{dd}</td>
            <td className="py-4">{desc}</td>
            <td className="py-4">{price}</td>
            <td className="py-4">{type==0?"بد":"بس"}</td>
            <td className="py-4">نمایش</td>
        </tr>
    )
}

export default Tr