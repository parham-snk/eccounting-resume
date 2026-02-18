import { useEffect } from "react"

const DISCOUNT_INVOICE_INPUT = props => {
    const { enable, update } = props
    useEffect(()=>{
        update(0)
    },[])
    return <td className="table-cell w-full">
        <input className={"border w-fit text-center h-7"}
            disabled={enable ? false : true}
            onKeyDown={e => {
                if (e.key == "Backspace" || /\d/.test(e.key)) {

                } else {
                    e.preventDefault()
                }
            }}
            onChange={e => {
                if (Number(e.target.value) > 100) {
                    alert("مقدار غیر مجاز برای فیلد تخفیف")
                    e.target.value = ""
                }
            }}
            onBlur={(e)=>{
                update(e.target.value==""?0:e.target.value)
            }}
        />
    </td>
}

export default DISCOUNT_INVOICE_INPUT