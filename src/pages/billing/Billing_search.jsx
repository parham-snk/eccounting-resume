import { useContext, useEffect, useRef, useState } from "react"
import { Context } from "../../context/Context"

const Billing_search = props => {
    const { eccounts } = useContext(Context)
    const [name, setName] = useState()
    const [suggestion, setSuggestion] = useState()
    const [showSuggestion, setShowSuggestion] = useState(false)

    const inputRef = useRef()


    const P = (item) => {
        return <p
            className="cursor-pointer w-full p-2 dark:hover:bg-black rounded"
            onClick={() => {
                props.update(item)
                setName(item.eccount_name)
                inputRef.current.value = item.eccount_name
                setTimeout(() => {
                    setShowSuggestion(false)
                }, 100);
            }}>

            {item.eccount_name}
        </p>
    }

    useEffect(() => {
        if (eccounts) {
            let filter = [...eccounts].filter(item => String(item.eccount_name).includes(name))
            if (filter.length > 0) {
                let elements = [...filter].map((item, index) => {
                    return P(item)
                })
                setSuggestion(elements)
            } else {
                setSuggestion()
            }
        }





    }, [name])
    return (
        <div className="w-full h-auto p-2 border-b flex flex-row align-middle items-center relative">
            <label htmlFor="">نام حساب:</label>
            <input ref={inputRef} type="text" className="border rounded w-1/4 h-8 m-2 p-2" onChange={e => {
                setName(e.target.value)
                setShowSuggestion(true)
            }} onClick={() => {
                setShowSuggestion(true)
            }}
                onBlur={() => {
                    setTimeout(() => {
                        setShowSuggestion(false)
                    }, 100);
                }}
            />

            {
                suggestion && showSuggestion &&
                <div className="absolute w-50 h-100 bg-white dark:bg-zinc-800 dark:text-white top-15 rounded shadow p-2">
                    {
                        suggestion
                    }
                </div>
            }
        </div>
    )
}

export default Billing_search