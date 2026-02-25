import { useContext, useEffect, useState } from "react"
import SearchComponent from "./components/searchComponent"
import { Context } from "../../context/Context"
import ProductRow from "./components/elements/row"

const ListProducts = props => {
    const { products, orgcats } = useContext(Context)
    const [elements, setElements] = useState()

    const [searchName, SetSearchName] = useState()
    const [searchCat, SetSearchCat] = useState()


    useEffect(() => {
        if (products.length > 0) {
            let list = [...products].map((item, r) => <ProductRow key={r} item={{ ...item, r }} changeItem={(val) => {

                props?.changeItem(val)
            }} />)
            setElements(list)
        }
    }, [products])

    useEffect(() => {
        if (searchName) {
            let items = [...products].filter((item) => String(item.product_name).includes(searchName))
            if (searchCat) {
                items = items.filter(item => item.category_id == searchCat)
            }
            let list = items.map((item, r) => <ProductRow
                changeItem={(val) => {

                    props?.changeItem(val)
                }} key={r}
                item={{ ...item, r }} />)
            setElements(list)
        } else if (searchName == "") {
            if (products.length > 0) {
                let list = [...products].map((item, r) => {
                    if (searchCat) {
                        if (item.category_id == searchCat)
                            return <ProductRow
                                changeItem={(val) => {
                                    props.changeItem(val)
                                }} key={r} item={{ ...item, r }}
                            />
                    } else {
                        return <ProductRow changeItem={(val) => {
                            props?.changeItem(val)
                        }} key={r} item={{ ...item, r }} />
                    }

                })
                setElements(list)
            }
        } else if (!searchName) { }
    }, [searchName])

    useEffect(() => {
        if (searchCat == "") {
            if (products.length > 0) {
                let list = [...products].map((item, r) => <ProductRow changeItem={(val) => {

                    props?.changeItem(val)
                }} key={r} item={{ ...item, r }} />)
                setElements(list)
            }
        }
        if (searchCat) {
            let filter = [...products].filter(item => item.category_id == searchCat)
            let list = filter.map((item, r) => <ProductRow changeItem={(val) => {

                props?.changeItem(val)
            }} key={r} item={{ ...item, r }} />)
            setElements(list)
        }
    }, [searchCat])

    return (
        <div className="flex flex-col justify-start items-start w-2/3 mx-2 h-full bg-white dark:bg-zinc-700 dark:text-gray-300 p-2 rounded shadow">
            <SearchComponent SetSearchName={val => SetSearchName(val)} SetSearchCat={id => SetSearchCat(id)} />
            <table className="font-sans list flex flex-col justify-start align-sub w-full h-full overflow-y-scroll">
                <tr className="flex flex-row justify-between items-center align-middle w-full">
                    <th className="w-1/12 text-center ">r</th>
                    <th className="w-1/12 text-center ">id</th>
                    <th className="w-4/12 text-center ">نام محصول</th>
                    <th className="w-1/12 text-center ">دسته بندی</th>
                    <th className="w-1/12 text-center ">واحد</th>
                    <th className="w-1/12 text-center ">تعداد</th>
                    <th className="w-2/12 text-center ">قیمت</th>
                </tr>
                {
                    elements?.length == 0 &&
                    <div className="flex justify-center align-middle w-full h-full">
                        <h1>بدون کالا</h1>
                    </div>
                }
                {
                    elements?.length >= 0 &&
                    <div className="flex flex-col w-full">
                        {elements}
                    </div>
                }

            </table>
        </div>
    )
}

export default ListProducts