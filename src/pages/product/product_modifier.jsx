import { useContext, useEffect, useState } from "react"
import CatParentInput from "../cat/add-cat/cat_parent"
import { Context } from "../../context/Context"
import splitNumber from "../../components/util/split-numbers"
import Qty_Unit from "./components/elements/qty_unit_element"
import Chart_product_prices from "./components/elements/chart-product-prices"

const ProductModifier = props => {
    const { item } = props
    let { addProduct, updateProduct, prices, removeProduct } = useContext(Context)

    const [id, setId] = useState()
    const [name, setName] = useState(item?.product_name || "")
    const [qty, setQTY] = useState(item?.qty || "")
    const [price, setPrice] = useState(item?.product_price || "")
    const [cat, setCat] = useState(item?.category_id || "")
    const [unit, setUnit] = useState(item?.qty_unit || "")
    const [pricesList, setPricesList] = useState()
    const [productPrices, setProductPrices] = useState()

    const [chart, setChart] = useState()
    useEffect(() => {
        if (prices) {
            let list = prices.map(p => {
                let d = new Date(p.createAt).toLocaleString("fa-IR").split(",")[0]
                p = { ...p, createAt: d }
                return p
            })
            setPricesList(list)
        }

    }, [productPrices, prices])

    useEffect(() => {
        setChart(<Chart_product_prices data={productPrices} id={id} />)
    }, [productPrices])
    useEffect(() => {
        if (id) {
            let p = [...pricesList].filter(item => item.parent_id == id)
            setProductPrices(p)
        }

    }, [prices])

    useEffect(() => {
        if (props.item) {
            const { product_id, product_name, qty, product_price, category_id, qty_unit } = props?.item
            setId(product_id)
            setName(product_name)
            setQTY(qty)
            setPrice(splitNumber(product_price))
            setCat(category_id)
            setUnit(qty_unit)
        }

    }, [props])

    function resetFields() {
        document.querySelectorAll("input").forEach(item => item.value = "")
        setId()
        setName("")
        setQTY(0)
        setPrice(0)
        setCat("")
        setUnit("")
        setProductPrices()
    }

    useEffect(() => {
        if (pricesList && id) {
            let p = [...pricesList].filter(item => item.parent_id == id)
            setProductPrices(p)
        }
    }, [id])
    return <div id="modifier"
        className="flex flex-col w-1/3 h-full pb-5   productModifier rounded shadow overflow-hidden overflow-y-scroll z-10
        bg-white dark:bg-zinc-700 
        "
        onDragOver={e => {
            e.preventDefault()
            document.getElementById("modifier").style.background = "rgba(81, 150, 255,.5)"
        }}

        onDragLeave={e => {
            e.preventDefault()
            document.getElementById("modifier").style.background = "white"

        }}
        onDrop={ev => {
            document.getElementById("modifier").style.background = "white";
            let data = ev.dataTransfer.getData("product")
            let { category_id, last_used_price, product_id, product_name, product_price, qty, qty_unit } = JSON.parse(data)
            setCat(category_id)
            setId(product_id)
            setName(product_name)
            setPrice(splitNumber(product_price))
            setQTY(qty)
            setUnit(qty_unit)
            document.getElementById("cat").value = ""
        }}

    >
        <div className="w-full flex flex-row justify-between items-center align-middle sticky top-0 mt-2
         bg-white dark:bg-zinc-700 
         shadow">
            <button className="bg-blue-100 dark:bg-blue-400 rounded dark:text-white text-sm font-medium cursor-pointer w-1/3 mt-2 p-2  mb-2" onClick={resetFields}>ریست کردن فرم</button>
            {
                id &&
                <button className="bg-red-100 dark:bg-red-400 dark:text-white rounded mx-2 text-sm font-medium cursor-pointer w-1/3  mt-2 p-2  mb-2 " onClick={() => {
                    removeProduct(id).then(resetFields)
                }
                }>حذف محصول</button>

            }
        </div>
        {
            //id
            id &&
            <h1 className="flex flex-row-reverse justify-end px-3 mb-2 items-center"> <span className="text-2xl dark:text-white" id="p_id">{id}</span> id : </h1>
        }
        {
            //name
        }
        <div className="flex flex-col justify-start mx-2 px-2 mt-5 my-2">
            <label className="dark:text-white" htmlFor={"name"}>نام کالا: </label>
            <input autoComplete="off" className="bg-white dark:text-black shadow px-2 focus:bg-blue-200 p-1 my-1" type="text" value={name} id="name" placeholder="نام کالا" onChange={e => setName(e.target.value)} />
        </div>

        {
            //price
        }
        <div className="flex flex-col justify-start mx-2 px-2 my-2">
            <label className="dark:text-white" htmlFor={"price"}>{"قیمت واحد :"}</label>
            <input autoComplete="off" className="bg-white dark:text-black shadow px-2 focus:bg-blue-200 p-1 my-1"
                type="text" value={price} id={"price"} placeholder=""
                onKeyDown={e => {
                    let reg = /\d/

                    if (e.key == "Backspace") {
                        return
                    }
                    if (reg.test(e.key) == false) return e.preventDefault()
                }}
                onChange={e => {
                    let p = String(e.target.value).split(",").join("")
                    setPrice(splitNumber(p))
                }} />
        </div>
        {
            //cat
        }
        <div className="flex flex-col justify-start mx-2 pl-6 px-2 w-full my-2 ">
            <label className="my-2 dark:text-white" htmlFor={"cat"}>{"دسته بندی :"}</label>
            {/* <input className="bg-white shadow px-2 focus:bg-blue-200 p-1 my-1" type="text" value={cat} id="cat" name={"cat"} placeholder="" onChange={e => setCat(e.target.value)} /> */}
            <CatParentInput value={cat} placeholder={"دسته بندی"} setCatParent={e => setCat(e)} />
        </div>
        {
            //qty
        }
        <div className="flex flex-col justify-start mx-2 px-2 my-2">
            <label className="dark:text-white" htmlFor={"qty"}>{qty ? "موجودی کالا :" : "موجودی اولیه انبار :"}</label>
            <input autoComplete="off" className="bg-white dark:text-black shadow px-2 focus:bg-blue-200 p-1 my-1"
                type="text" value={qty} id="qty"
                onKeyDown={e => {
                    let reg = /\d/
                    if (e.key == "Backspace") { return }
                    if (reg.test(e.key) == false) return e.preventDefault()
                }}
                onChange={e => setQTY(e.target.value)} />
        </div>
        {
            //qty-unit
        }
        <div className="flex flex-col justify-start mx-2 px-2 my-2">
            <label className="dark:text-white" htmlFor={"unit"}>{"واحد شمارش کالا : "}</label>
            <Qty_Unit unit={unit} setUnit={val => setUnit(val)} />
        </div>
        {
            id &&
            <button className="cursor-pointer bg-blue-400 py-2 rounded m-4 text-white"
                onClick={() => { updateProduct({ id, name, qty, price, cat, unit }) }}
            >به روز رسانی محصول
            </button>
        }
        {
            !id &&
            <button className="cursor-pointer bg-blue-400 py-2 rounded m-4 text-white" onClick={() => {
                addProduct({ name, qty, price, cat, unit })
                // resetFields()
            }}>افزودن محصول</button>
        }


        {
            productPrices && chart && id &&
            chart
        }
    </div >
}

export default ProductModifier