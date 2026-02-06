import { useContext, useEffect, useRef, useState } from "react"
import { Context } from "../../../context/Context"

const CatNameInput = props => {
    const input = useRef()
    const [nameInput, setNameInput] = useState()
    const [currect, setCorect] = useState(true)


    const { orgcats } = useContext(Context)

    const [suggested, setsuggested] = useState()
    useEffect(() => {
        let filter = [...orgcats].filter(item => String(item.cat_name).includes(nameInput))
        if (filter.length > 0 && nameInput) {
            setsuggested(filter.map((item,index) =>
                <div
                key={index}
                    className={`px-2  py-2 border-b border-b-gray-400 ${/^[a-zA-Z]/.test(item.cat_name) ? "text-end" : "text-start"}`}
                    onClick={() => {
                    }}>{item.cat_name}</div>))
        }
        let res = [...orgcats].filter(({ cat_name }) => cat_name == String(nameInput).trim())
        if (res.length > 0) {

            setCorect(false)
            return props.setname(false)

        } else {
            setCorect(true)
            props.setname(nameInput)
        }
    }, [nameInput])


    return (
        <div div className="w-1/4 relative" >
            <input ref={input} value={nameInput} className={` w-full p-2 rounded shadow ${!currect ? "bg-red-300" : "bg-white"}`  } type="text"
            onBlur={() => {
                setsuggested()
            }} onChange={e => setNameInput(e.target.value)}
                placeholder="نام دسته بندی" />
            {
                suggested &&
                <div className="w-full h-fit p-2 bg-white shadow rounded absolute mt-2 z-10">
                    <p className="text-xs py-1 border-b"><span className="text-red-500">نکته:</span>از این نام ها استفاده نکنید!</p>
                    {suggested}
                </div>
            }
        </div >
    )
}

export default CatNameInput