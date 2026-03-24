import { useContext, useEffect, useRef, useState } from "react"
import { Context } from "../../../../context/Context"

const Eccount_Field = props => {
    const { updateEccountFilter } = props

    const { eccounts } = useContext(Context)
    const [field, setField] = useState("")
    const [suggestions, setSuggestions] = useState()
    const [showSuggestion, setShowSuggestion] = useState(false)

    const inputRef = useRef()
    const P = ({ item }) => {
        return <p

            className="flex cursor-pointer p-2 rounded justify-start align-middle items-center w-full h-10 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
            onClick={() => {
                inputRef.current.value = item.eccount_name
                updateEccountFilter(item)
            }}
        >
            {item.eccount_name}
        </p>
    }


    useEffect(() => {
        if (eccounts) {
            let rows = [...eccounts].map((item, index) => <P item={item} key={index} />)
            setSuggestions(rows)

        }
        if (eccounts && field) {
            let filter = [...eccounts].filter((item, index) => String(item.eccount_name).includes(field))
            if (filter.length > 0) {
                let rows = filter.map((item, index) => <P item={item} key={index} />)
                setSuggestions(rows)
            }
        }
        if (eccounts && field == "") {
            let rows = [...eccounts].map((item, index) => <P item={item} key={index} />)
            return setSuggestions(rows)
        }



    }, [field])
    return (
        <div className="relative w-50">
            <input
                ref={inputRef}
                className="border dark:border-white mx-2 rounded p-2 w-60"
                onFocus={() => setShowSuggestion(true)}
                onBlur={(e) => {
                    if(e.target.value==""){
                        updateEccountFilter(false)
                    }
                    setTimeout(() => {
                        setShowSuggestion(false)
                    }, 100)
                }}
                type="text" onChange={e => setField(e.target.value)} />
            {
                showSuggestion &&
                <div className="absolute w-60 min-h-60 left-0 rounded bg-white dark:bg-zinc-900 shadow dark:text-white flex flex-col z-10">
                    {
                        suggestions && suggestions
                    }
                </div>
            }

        </div>
    )
}

export default Eccount_Field