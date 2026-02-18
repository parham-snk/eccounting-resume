import { useContext, useEffect, useRef, useState } from "react"
import { Context } from "../../../../context/Context"

const Qty_Unit = props => {
    let { unit, setUnit } = props
    const { units } = useContext(Context)
    const [suggestion, setSuggestion] = useState(unit ? unit : "")
    const [name, setName] = useState()
    const [show, setShow] = useState(false)
    const node = useRef()
    const verifyName = value => {
        let arr = [...units].filter(item => item.name == String(value).trim())
        return arr.length == 1 ? arr[0] : false
    }
    const verifyId = id => {
        let item = [...units].filter(item => item.id == id)[0]
        return item ? item : false
    }
    useEffect(() => {
        if (verifyId(unit)) {
            node.current.value = verifyId(unit).name
        }
    }, [unit])
    useEffect(() => {
        let filter = [...units].filter(item => String(item.name).includes(name))
        let results = filter.map((item, index) =>
            <p className="w-full p-2 hover:bg-gray-200" key={index}
                onClick={() => {
                    setUnit(item.id)
                    setName(item.name)
                    node.current.value = item.name
                    setShow(false)
                }}
            >
                {item.name}
            </p>)

        setSuggestion(results.slice(0, 6))


    }, [name])
    return (
        <div className="w-full relative">
            <input className="bg-white shadow px-2 focus:bg-blue-200 p-1 my-1"
                ref={node}
                type="text" id="unit" placeholder=""
                onChange={e => {
                    setName(e.target.value)
                }
                }
                onFocus={() => {
                    setShow(true)
                    let results = units.map((item, index) =>
                        <p className="w-full p-2 hover:bg-gray-200" key={index}
                            onClick={() => {
                                setUnit(item.id)
                                setName(item.name)
                                node.current.value = item.name
                                setShow(false)
                            }}
                        >
                            {item.name}
                        </p>)

                    setSuggestion(results.slice(0, 6))
                }}
                onBlur={(e) => {
                    setTimeout(() => {
                        setShow(false)
                    }, 200);
                }}
            />

            {
                show && suggestion &&
                <div className="absolute w-full max-h-200 bg-white shadow rounded">
                    {suggestion}
                </div>
            }

        </div>

    )
}


export default Qty_Unit