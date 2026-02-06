import { useContext, useEffect, useState } from "react"
import { Context } from "../../context/Context"
import ItemSearch from "./item-search"
import CatNameInput from "./add-cat/cat_name"
import CatParentInput from "./add-cat/cat_parent"

const AddCat = props => {
    let { orgcats, setUploadCat } = useContext(Context)
    const [name, setName] = useState()
    const [catParent, setCatParent] = useState()
    const addcat = () => {
        if (!catParent) {
            setUploadCat({ cat_name: name, parent_id: 100 })
        }
        if (name && catParent) {
            setUploadCat({ cat_name: name, parent_id: catParent })
        }
    }
    useEffect(() => {

    }, [catParent, name])
    // useEffect(() => {
    //     let filter = [...orgcats].filter(item => String(item.cat_name).includes(catParent))
    //     if (filter.length > 0) {
    //         let elements = filter.map((item, index) => {
    //             return <div
    //                 key={index}
    //                 className={`px-2 hover:bg-gray-400  hover:text-white cursor-pointer py-2 border-b border-b-gray-400 ${/^[a-zA-Z]/.test(item.cat_name) ? "text-end" : "text-start"}`}
    //                 onClick={function () {
    //                     setCatParent(item.cat_name)
    //                     setCatParentid(item.cat_id)
    //                     setcatres()
    //                 }}>
    //                 {item.cat_name}
    //             </div>
    //         })
    //         setcatres(elements)
    //     }
    // }, [catParent])
    return (
        <div className="flex flex-row justify-between align-middle items-center w-2/3 pb-4 ">
            <CatNameInput setname={(val) => {
                setName(val)
            }} />
            <CatParentInput setCatParent={val => {

                return setCatParent(val ? val : 100)

            }} />
            <button className="bg-blue-400 rounded w-25 p-2 text-white cursor-pointer" onClick={addcat}>اضافه کردن</button>
        </div>
    )
}

export default AddCat