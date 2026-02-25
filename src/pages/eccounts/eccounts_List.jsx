import { useContext, useEffect, useState } from "react"
import SearchBar_eccount from "./components/searchBar_Eccoun"
import { Context } from "../../context/Context"

const Eccount_List = props => {
    const { changeModifier } = props
    const { eccounts } = useContext(Context)
    const [name, setName] = useState(false)
    const [suggestion, setSuggestion] = useState()
    function P(item, index) {
        return <p key={index} className="w-full borderb last:border-b-0 p-2 cursor-pointer" onClick={() => {
            changeModifier(item)
        }}>
            {item?.eccount_name}
        </p>
    }
    useEffect(() => {
        if (name) {
            if (eccounts) {
                let list = [...eccounts].filter(item => String(item.eccount_name).includes(name))
                let items = list.map((item, index) => P(item, index))
                setSuggestion(items)
            } else {

            }

        } else {
            if (eccounts) {
                let items = [...eccounts].map((item, index) => P(item, index))
                setSuggestion(items)
            }

        }
    }, [name])
    useEffect(() => {
        if (eccounts) {
            let items = [...eccounts].map((item, index) => P(item, index))
            if (name) {
                items = [...eccounts].filter(item => item.eccount_name == name)
                items = items.map((item, index) => P(item, index))
            }
            setSuggestion(items)
        }
    }, [eccounts])
    useEffect(() => {

    }, [suggestion])
    return <div className="flex flex-col w-2/3 h-full rounded bg-white shadow-xl dark:bg-zinc-700 dark:text-white">
        <SearchBar_eccount setName={val => setName(val)} />
        <div className="flex flex-col min-h-full w-full justify-start align-top">
            {
                suggestion &&
                suggestion
            }
        </div>
    </div>
}

export default Eccount_List