import { useContext, useEffect, useState } from "react"
import splitNumber from "../../../../components/util/split-numbers"
import { Context } from "../../../../context/Context"

import { jQuery as $ } from "jquery"
const ProductRow = props => {
    const { item, changeItem } = props
    const { units, orgcats } = useContext(Context)
    const { selected, setSelected } = useState(false)

    const getUnit = (val) => {
        let list = [...units].filter(unit => unit.id == Number(val))
        return list[0]?.name
    }
    const getCat = (val) => {
        let list = [...orgcats].filter(cat => cat.cat_id == Number(val))
        return list[0]?.cat_name
    }
    return (
        <tr className={`cursor-pointer flex flex-row py-1 justify-between items-center align-middle w-full
             hover:bg-gray-200 odd:bg-blue-100 border-b border-b-gray-400 odd:dark:bg-zinc-500 odd:dark:text-black
             dark:hover:bg-zinc-900 dark:hover:text-white 
             `
        }

            draggable={true}
            onDragStart={(ev) => {
                ev.dataTransfer.setData("product", JSON.stringify(item))
            }}

            onClick={() => {
                if (props.changeItem) {

                    props?.changeItem(item)
                }
            }}
        >
            {
                //r
            }
            <td className="w-1/12 text-center">
                {item?.r + 1}
            </td>
            {
                //id
            }
            <td className="w-1/12 text-center">
                {item?.product_id}
            </td>
            {
                //name
            }
            <td className="text-start w-4/12 ">{item?.product_name}</td>
            {
                //category
            }
            <td className="text-center w-2/12 text-xs">{item ? getCat(item?.category_id) : null}</td>
            {
                //unit
            }
            <td className="text-center w-1/12 ">{item ? getUnit(item?.qty_unit) : null}</td>
            {
                //qty
            }
            <td className="text-center w-1/12 ">{item?.qty}</td>
            {
                //price
            }
            <td className="text-center w-2/12 ">{splitNumber(item.product_price)}</td>
        </tr>
    )
}
export default ProductRow