import { useContext, useEffect, useState } from "react"
import { Context } from "../../context/Context"
import UnitListItem from "./list_item"

const UnitList = props => {
    const { units ,removeUnit} = useContext(Context)
    const [list, setList] = useState()

    const [show, setShow] = useState(false)
    const [item, setItem] = useState(false)
    const [showContext, setShowContext] = useState(false)
    const [coordinates, setCoordinates] = useState()
    useEffect(() => {
        if (units) {
            let items = [...units].map((item, index) => <UnitListItem key={index} item={item} setItem={() => setItem(item)} setShowContext={val => setShowContext(val)} setCoordinates={val => { setCoordinates(val) }} />)
            setList(items)
        }
    }, [units])

    useEffect(() => {
        window.onclick = () => {
            // setTimeout(() => {
            setShowContext(false)
            setCoordinates("")
            // }, 10);
        }
    }, [])
    return (
        <div className="p-2">
            {list &&
                list
            }
            {
                showContext &&
                <div id={item.id} style={{
                    top: coordinates.y + "px",
                    left: (coordinates.x-120) + "px"
                }}
                    onContextMenu={e => e.preventDefault()}
                    className="w-30 min-h-10 rounded bg-white shadow  absolute overflow-hidden">
                    <p className="text-xs border-b w-full p-1 bg-gray-800 text-white">{item.name}</p>
                    <p
                        className="text-red-500 cursor-pointer p-2 hover:bg-gray-200"
                        onClick={() => {
                            removeUnit(item.id)
                        }}>حذف</p>
                </div>
            }
        </div>
    )
}

export default UnitList