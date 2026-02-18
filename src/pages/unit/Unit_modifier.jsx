import { useContext, useEffect, useState } from "react"
import { Context } from "../../context/Context"

const UnitModifier = props => {
    const { units, addUnit } = useContext(Context)
    const [name, setName] = useState()
    const [unitList, setUnitList] = useState()
    const [err, setErr] = useState(false)
    const [suggestion, setSuggestion] = useState()
    const [show, setShow] = useState(false)
    useEffect(() => {
        if (units) {
            setUnitList(units)
            let items = [...units].map((item, index) => <p key={index} className="p-2 hover:bg-gray-200 bg-white">{item.name}</p>)
            setSuggestion(items)
        }
    }, [units])

    useEffect(() => {
        if (unitList) {
            if (name != "") {
                let filter = [...unitList].filter(unit => String(unit.name).includes(name))
                let items = filter.map((item, index) => <p key={index} className="p-2 hover:bg-gray-200 bg-white">{item.name}</p>)
                if (filter.length > 0) {
                    setShow(true)
                    setSuggestion(items)
                }
            }
            if (name == "") {
                let items = [...unitList].map((item, index) => <p key={index} className="p-2 hover:bg-gray-200 bg-white">{item.name}</p>)
                setShow(true)
                setSuggestion(items)
            }
        }
    }, [name])
    function testInput(e) {
        let value = e.target.value.trim();
        setName(value)
        let err = [...unitList]?.filter(unit => unit.name.trim() == value)
        if (err.length > 0) {
            setName(false)
            return setErr(true)
        }
        setName(value)
        setErr(false)
    }
    return <div className="flex flex-row align-baseline items-start">
        <div className="relative w-1/4 ">
            <input type="text" placeholder="نام"
                className={`${err ? "bg-red-400" : "bg-white"} p-2 w-full rounded`}
                onChange={testInput}
                onBlur={() => setShow(false)}
                onFocus={() => setShow(true)}
            />

            {
                suggestion && show &&
                <div className="absolute top-10 left-0 w-full h-auto  flex flex-col shadow bg-white mt-2 rounded z-10">
                    <p className="p-2 text-red-400">اسامی غیرمجاز</p>
                    {suggestion}
                </div>

            }
        </div>
        <button
        className="bg-blue-400 text-white p-2 w-1/6 rounded mx-3 cursor-pointer"
            onClick={() => {
                if (name && name != "") {
                    addUnit(name)
                }

            }}
        >افزودن</button>
    </div>
}

export default UnitModifier