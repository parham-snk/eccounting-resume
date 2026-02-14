import { useContext, useEffect } from "react"
import splitNumber from "../../../../components/util/split-numbers"
import { Context } from "../../../../context/Context"

const ProductRow = props => {
    const { item } = props
    const { units } = useContext(Context)

    const getCat = (val) => {
        let list = [...units].filter(unit => unit.id == Number(val))
        return list[0]?.name
    }
    return (
        <div className="flex flex-row justify-between items-center align-middle w-full hover:bg-gray-200"

            draggable={true}
            onDragStart={(ev) => {
                ev.dataTransfer.setData("product", JSON.stringify(item))
            }}
        >
            {
                //r
            }
            <div className="w-1/12">
                {item?.r + 1}
            </div>
            {
                //id
            }
            <div className="w-1/12">
                {item?.product_id}
            </div>
            {
                //name
            }
            <div className="">{item?.product_name}</div>
            {
                //category
            }
            <div className="">{item ? getCat(item?.qty_unit) : null}</div>
            {
                //qty
            }
            <div className="">{item?.qty}</div>
            {
                //price
            }
            <div className="">{splitNumber(item.product_price)}</div>
        </div>
    )
}
export default ProductRow