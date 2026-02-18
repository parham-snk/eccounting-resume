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
    let { cats, changeParent } = useContext(Context)
    const [catList, setCatList] = useState(cats)
    const [key, setkey] = useState(1)
    const [elements, setElements] = useState([])
    const [hover, setHover] = useState(false)
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

                <div className={`${hover ? "bg-blue-300" : "bg-gray-100"} flex flex-row flex-wrap w-full h-fit cats relative`}

                >
                    <div className="absolute w-full h-full top-0 left-0"

                        onDragOver={e => {
                            e.preventDefault()
                            setHover(true)
                        }}
                        onDragLeave={() => {
                            setHover(false)
                        }}
                        onDrop={ev => {
                            ev.preventDefault()
                            let id = ev.dataTransfer.getData("li").split("-")[1]

                            changeParent({ cat_id: id, parent_id: 100 })

                            setHover(false)
                            // ev.target.appendChild(document.getElementById(id).parentElement)
                        }}
                    >
                        {
                            //virtual element
                        }
                    </div>
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