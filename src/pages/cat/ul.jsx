import { useEffect, useState } from "react"
import Li from "./li"

const Ul = props => {
    const { childs } = props
    const [elements, setElements] = useState()
    useEffect(() => {
        setElements(childs)
    }, [])
    return (
        <ul
            className="m-2 shadow border  rounded   p-2 px-4 bg-white">
            {
                elements &&
                <Li item={elements} />
            }
        </ul>
    )
}

export default Ul