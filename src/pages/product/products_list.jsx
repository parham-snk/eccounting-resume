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
            let list = [...products].map((item, r) => <ProductRow key={r} item={{ ...item, r }} />)
            setElements(list)
        }
    }, [products])

    useEffect(() => {
        if (searchName) {
            let items = [...products].filter((item) => String(item.product_name).includes(searchName))
            if (searchCat) {
                items = items.filter(item => item.category_id == searchCat)
            }
            let list = items.map((item, r) => <ProductRow key={r} item={{ ...item, r }} />)
            setElements(list)
        } else if (searchName == "") {
            if (products.length > 0) {
                let list = [...products].map((item, r) => {
                    if (searchCat) {
                        if (item.category_id == searchCat) return <ProductRow key={r} item={{ ...item, r }} />
                    } else {
                        return <ProductRow key={r} item={{ ...item, r }} />
                    }

                })
                setElements(list)
            }
        } else if (!searchName) { }
    }, [searchName])

    useEffect(() => {
        if (searchCat) {
            let filter = [...products].filter(item => item.category_id == searchCat)
            let list = filter.map((item, r) => <ProductRow key={r} item={{ ...item, r }} />)
            setElements(list)
        }
    }, [searchCat])

    return (
        <div className="flex flex-col justify-start items-start w-2/3 mx-2 h-full bg-white p-2 rounded shadow">
            <SearchComponent SetSearchName={val => SetSearchName(val)} SetSearchCat={id => SetSearchCat(id)} />
            <div className="flex flex-col justify-start align-sub w-full h-full overflow-y-scroll">
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

            </div>
        </div>
    )
}

export default ListProducts