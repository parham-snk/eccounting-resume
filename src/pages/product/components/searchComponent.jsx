import { useEffect, useState } from "react"
import CatParentInput from "../../cat/add-cat/cat_parent"
import ProductCatSearchField from "./elements/product-cat-search-field"

const SearchComponent = props => {
    const { SetSearchName,SetSearchCat } = props
    const [name, setName] = useState()
    const [cat, setCat] = useState()

    useEffect(() => {
        SetSearchName(name)
    }, [name])
    useEffect(()=>SetSearchCat(cat),[cat])
    return (
        <div className="flex flex-row justify-start items-center w-full">
            {
                //name_field
            }
            <label >نام :</label>
            <input className="border border-gray-300 rounded mx-2 p-1"
                placeholder="نام دسته بندی " type="text" value={name}
                onChange={e => setName((e.target.value).trim())} />
            {
                //cat_field
            }
            {/* <ProductCatSearchField setCat={val=>setCat(val)}/> */}
            <div className="w-1/3">
                <CatParentInput placeholder={"دسته بندی"} setCatParent={e => setCat(e)} />
            </div>
        </div>
    )
}

export default SearchComponent