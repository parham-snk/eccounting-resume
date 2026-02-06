import { useContext, useEffect, useState } from "react"
import hash_sum from "hash-sum"
import { Context } from "../context/Context"
import CatField from "./cat/cats"
import AddCat from "./cat/add-cat"

function hash(str) {
    return hash_sum(str)
}
const CAT_PAGE = (props) => {
    // const { updateList } = props
    let { cats } = useContext(Context)
    const [catList, setCatList] = useState(cats)
    const [key, setkey] = useState(1)
    const [elements, setElements] = useState([])
    useEffect(() => {
        const randomNumber = Math.floor(Math.random().toFixed(2))
        setkey(randomNumber)

        setCatList(cats)

    }, [cats])
    return (
        <div className="flex flex-col relative w-full h-full">
            <div className="shadow z-10">
                <AddCat />
            </div>
            <div className="w-full overflow-y-scroll z-0 py-9">

                <div className="flex flex-row flex-wrap w-full h-fit cats">
                    {
                        catList && catList.map((item, index) => {
                            return < CatField key={hash(item)} cat={item} />
                        })
                    }
                </div>
            </div>
        </div>

    )

}

export default CAT_PAGE