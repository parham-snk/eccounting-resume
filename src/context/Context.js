import { createContext, useEffect, useMemo, useState } from "react";
import axios from 'axios'




const Context = createContext({ cats: [] })

const ContextProvider = ({ children }) => {
    const [orgcats, setorgcats] = useState([])
    const [cats, setCats] = useState([])
    const [products, setProducts] = useState([])
    const [units, setUnits] = useState([])
    const [uploadCat, setUploadCat] = useState()
    const [prices, setPrices] = useState()
    //fetch categories list
    function fetchList() {
        fetch("http://localhost:8080/cat").then(data => data.json()).then(data => {
            let arr = [...data]
            setorgcats([...data])
            function getChild(parrentId) {
                let childs = [...arr].filter(item => item.parent_id == parrentId)
                arr = arr.filter(item => item.parent_Id != parrentId)
                setCats([...arr])
                childs = childs.map(item => new Cat(item))
                return childs
            }
            function Cat(cat) {
                this.cat = cat
                this.children = getChild(cat.cat_id)
            }

            if (arr.length > 0) {
                let startArr = arr.filter(item => item.parent_id == 100)

                startArr = startArr.map(item => new Cat(item))
                console.log('got!')
                setCats(startArr)
            }
            else {
                setCats(data)
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    //fetch products list
    async function fetchProducts() {
        axios.get("http://localhost:8080/products").then(data => data.data).then(data => {
            setProducts([...data])
        }).catch(console.log)
    }
    function fetchUnits() {
        fetch("http://localhost:8080/unit")
            .then(data => data.json()).then(data => data.ok ? setUnits(data.data) : alert("err"))
            .catch(err => alert(err))
    }
    async function fetchPrices() {
        fetch("http://localhost:8080/prices")
            .then(data => data.json()).then(data => {
                if (data.ok) {
                    setPrices(data.data)
                }
            })
            .catch(err => alert(err))

    }

    function update() {
        fetchList();
        fetchProducts()
        fetchUnits()
        fetchPrices()
    }
    //fetch lists
    useEffect(update, [])
    //add cat
    useEffect(() => {
        if (uploadCat) {
            const { cat_name, parent_id } = uploadCat
            if ((cat_name && parent_id) || (cat_name && parent_id == null)) {
                axios.post("http://localhost:8080/cat", { cat_name, parent_id })
                    .then(data => data.data)
                    .then(data => data.ok ? fetchList() : alert('failed'))
                    .catch(err => console.log(`err : ${err}`))
            }

        }
    }, [uploadCat])

    function removeCat(cat) {
        const { cat_id, childstoo } = cat
        axios.delete(`http://localhost:8080/cat/${cat_id}`).then(console.log).then(fetchList)
    }
    //change cat parent
    function changeParent({ cat_id, parent_id }) {
        axios.post("http://localhost:8080/cat/update", { cat_id, parent_id }).then(fetchList)
    }
    function addProduct(product) {
        let { name, qty, price, cat, unit } = product
        price = String(price).split(",").join("")
        if (name && qty && price && cat && unit) {
            axios.post("http://localhost:8080/products", { name, qty: Number(qty), price: Number(price), cat: Number(cat), unit: Number(unit) })
                .then(data => data.data).then(data => data.ok ? alert("ok") : null).then(fetchProducts)
                .catch(err => console.log(err))
        }
    }
    function updateProduct(product) {
        let { id, name, qty, price, cat, unit } = product
        price = String(price).split(",").join("")
        console.log(id)
        axios.post("http://localhost:8080/products/modify", { id, name, qty, price, cat, unit })
            .then(data => data.data).then(data => data.ok ? alert("product updated") : alert("err")).then(async () => {
                await fetchProducts()
                await fetchPrices()
            })
            .catch(err => console.log(err))
    }
    async function removeProduct(product_id) {
        axios.delete(`http://localhost:8080/products/${product_id}`).then(data => data.data).then(data => {
            if (data.ok) {
                fetchList()
                fetchPrices()
                fetchProducts()
                return true
            } else {
                return false
            }
        }).catch(err => {
            return err
        })
    }
    async function addUnit(unitName) {
        axios.post("http://localhost:8080/unit", { name: unitName }).then(data => data.data).then(data => {
            if (data.ok) {
                fetchUnits()
                alert("unit added!")
            } else {
                alert("failed add unit action!")
            }
        })
    }
    async function removeUnit(unitID) {
        axios.delete("http://localhost:8080/unit", { data: { id: unitID } })
            .then(data => data.data).then(data => {
                if (data.ok) {
                    fetchUnits()
                    alert("unit removed!")
                    return true

                }
                alert("unit dosnt removed!")
                return false

            })
            .catch(err => {
                alert(err)
                return err
            })

    }


    return (
        <Context.Provider 
        value={{update, cats, orgcats, products, units, prices, 
        changeParent, setUploadCat, removeCat, addProduct, updateProduct, removeProduct, addUnit, removeUnit }}>
            {children}
        </Context.Provider>
    )
}


export { ContextProvider, Context }