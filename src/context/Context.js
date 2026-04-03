import { createContext, useEffect, useMemo, useState } from "react";
import axios from 'axios'
import Notification from "../components/util/notification";




const Context = createContext({ cats: [] })

const ContextProvider = ({ children }) => {
    const [orgcats, setorgcats] = useState([])
    const [cats, setCats] = useState([])
    const [products, setProducts] = useState([])
    const [units, setUnits] = useState([])
    const [uploadCat, setUploadCat] = useState()
    const [prices, setPrices] = useState()
    const [eccounts, setEccounts] = useState()
    const [allowSubmitForm, setAllowSubmitForm] = useState(false)
    const [invoices, setInvoices] = useState()
    const [yearInvoice, setYearInvioce] = useState()
    const [cashTotal, setCashTotal] = useState()

    const [notification, setNotification] = useState(false)
    const [notificationText, setNotificationText] = useState()
    const [notificationType, setNotifictionType] = useState()

    //a function for Notification component
    function NOTIFICATION(text, type) {
        setNotificationText(text)
        setNotifictionType(type)
        setNotification(true)
    }




    //fetch categories list
    function fetchList() {
        axios.get("http://localhost:8080/cat").then(data => data.data).then(data => {
            let arr = [...data.data]
            setorgcats([...data.data])
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
                setCats(startArr)
            }
            else {
                setCats(data)
            }
            // NOTIFICATION("لیست به روز  شد!",true)
        }).catch(err => {
            setNotifictionType(false)
            setNotificationText("ارتباط با سرور بر قرار نشد!")
            setNotification(true)
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
    function fetchEccounts() {
        fetch("http://localhost:8080/eccounts").then(data => data.json()).then(data => {
            if (data.ok) {
                setEccounts(data.data)
            }
        }).catch((err) => {
            alert(err)
        })
    }
    function update() {
        fetchList();
        fetchProducts()
        fetchUnits()
        fetchPrices()
        fetchEccounts()
        getInvoices()
        getCashTotal()
        get_year_invoices(1405)
    }
    function get_year_invoices(year) {
        fetch(`http://localhost:8080/invoice/year/${year}`)
            .then(data => data.json()).then(data => {
                if (data.err) {
                    NOTIFICATION("خطا در گرفتن اطلاعات نمودار", false)
                } else {
                    setYearInvioce(data.data)
                }
            })
    }
    function getInvoices() {
        fetch("http://localhost:8080/invoice").then(data => data.json())
            .then(data => {
                if (data.ok) {
                    data = data.data
                    setInvoices(data)
                } else {
                    NOTIFICATION("خطا در دریافت صورتحساب ها ", false)
                }
            })
    }
    function getCashTotal() {
        fetch("http://localhost:8080/docs/box").then(data => data.json())
            .then(data => {
                if (data.err) {
                    return NOTIFICATION("خطا در گرفتن مبلغ صندوق", false)
                }
                if (data.ok) {
                    if (data.total) {
                        setCashTotal(data.total)
                    }
                }
            }).catch(err => {
                NOTIFICATION("خطای سرور در گرفتن مبلغ صندوق", false)
            })
    }
    //cats
    function removeCat(cat) {
        const { cat_id, childstoo } = cat
        axios.delete(`http://localhost:8080/cat/${cat_id}`).then(data => data.data).then(data => {
            if (data.ok) {
                NOTIFICATION("دسته بندی حذف شد !", true)
                update()
            } else {
                NOTIFICATION("خطا در حذف دسته بندی!", false)
            }
        }).catch(NOTIFICATION("خطا در  سرور حین حذف دسته بندی!", false))
    }
    //add cat
    function addCat(uploadCat) {
        const { cat_name, parent_id } = uploadCat
        if ((cat_name && parent_id) || (cat_name && parent_id == null)) {
            axios.post("http://localhost:8080/cat", { cat_name, parent_id })
                .then(data => data.data)
                .then(data => {
                    if (data.ok) {
                        NOTIFICATION("دسته بندی افزوده شد!", true)
                        update()
                    } else {
                        NOTIFICATION("خطا در افزودن دسته بندی", false)

                    }
                })
                .catch(() => NOTIFICATION("خطای سرور در افزودن دسته بندی", false))
        }
    }


    //change cat parent
    function changeParent({ cat_id, parent_id }) {
        axios.post("http://localhost:8080/cat/update", { cat_id, parent_id }).then(data => data.data)
            .then(data => {
                if (data.ok) {
                    update()
                    NOTIFICATION("والد دسته بندی تغییر کر د!", true)
                } else {
                    NOTIFICATION("خطا در تغییر والد دسته بندی", false)
                }

            }).catch(NOTIFICATION("خطای سرور در تغییر والد دسته بندی", false))
    }




    // products
    function addProduct(product) {
        let { name, qty, price, cat, unit } = product
        price = String(price).split(",").join("")
        if (name && cat && unit) {
            axios.post("http://localhost:8080/products", { name, qty: Number(qty), price: Number(price), cat: Number(cat), unit: Number(unit) })
                .then(data => data.data).then(data => {
                    if (data.ok) {
                        NOTIFICATION("کالا افزوده شد!", true)

                    } else {
                        NOTIFICATION("خطا در فزودن کالا!", false)

                    }
                })
                .catch(err => NOTIFICATION("خطا در ارباط با سرور در حیا افزودن کالا", false)
                )
        }
    }
    function updateProduct(product) {
        let { id, name, qty, price, cat, unit } = product
        price = String(price).split(",").join("")
        axios.post("http://localhost:8080/products/modify", { id, name, qty, price, cat, unit })
            .then(data => data.data).then(data => {
                if (data.ok) {
                    NOTIFICATION("کالا به روز رسانی شد!", true)
                    update()
                } else {
                    NOTIFICATION("خطا در بروزرسانی کالا!", false)

                }
            })
            .catch(err => NOTIFICATION("خطا در برقراری ارتباط با سرور حین بروزرسلنی کالا!", false))
    }
    async function removeProduct(product_id) {
        axios.delete(`http://localhost:8080/products/${product_id}`).then(data => data.data).then(data => {
            if (data.ok) {
                fetchList()
                fetchPrices()
                fetchProducts()

                return NOTIFICATION("کالا حذف شد !", true)
            } else {
                return NOTIFICATION("کالا حذف نشد !", false)
            }
        }).catch(err => {
            return NOTIFICATION("قطع ارتباط با سرور حین حدف کالا!", false)
        })
    }
    //unit
    async function addUnit(unitName) {
        axios.post("http://localhost:8080/unit", { name: unitName }).then(data => data.data).then(data => {
            if (data.ok) {
                fetchUnits()
                NOTIFICATION("واحد ثبت شد!", true)
            } else {
                NOTIFICATION("خطا در ثبت واحد !", false)

            }
        }).catch(NOTIFICATION("عدم برقراری ارتباط با سرور حین ثبت واحد!", false))
    }
    async function removeUnit(unitID) {
        axios.delete("http://localhost:8080/unit", { data: { id: unitID } })
            .then(data => data.data).then(data => {
                if (data.ok) {
                    fetchUnits()
                    NOTIFICATION("واحد مورد نظر حذف شد!", true)
                    return true

                }
                NOTIFICATION("خطا در حذف واحد !", false)

                return false

            })
            .catch(err => {
                NOTIFICATION("خطا در برقراری ارتباط با سرور حین حذف واحد", false)
                return err
            })

    }

    //eccounts
    async function addEccount(eccount_name, eccount_total, eccount_last_status_total) {
        axios.post("http://localhost:8080/eccounts", { eccount_name, eccount_total, eccount_last_status_total }).then(data => data.data).then(data => {
            if (data.ok) {
                NOTIFICATION("حساب اضاف شد !", true)
                return update()
            }
            NOTIFICATION("حساب اضاف نشد!", false)

        }).catch(err => NOTIFICATION("خطای سرور حین افزودن حساب !", false))
    }
    function deleteEccount(eccount_id) {
        if (eccount_id)
            axios.delete(`http://localhost:8080/eccounts/${eccount_id}`).then(data => data.data).then(data => {
                if (data.ok) {
                    update()
                    NOTIFICATION("حساب حذف شد !", true)
                } else {
                    NOTIFICATION("حساب حذف نشد !", false)

                }
            }).catch(err => {
                NOTIFICATION("خطای سرور حین حذف حساب!", false)

            })
    }
    function updateEccount(eccount) {
        if (eccount)
            axios.put("http://localhost:8080/eccounts", { eccount }).then(data => data.data).then(data => {
                if (data.ok) {
                    update()
                    NOTIFICATION("اکانت با موفقیت به روز رسانی شد!", true)

                } else {
                    NOTIFICATION("خطا در بروزرسانی حساب!", false)
                }
            }).catch(err => {
                NOTIFICATION("خطا در برقراری ارتباط با سرور! ", false)
            })
    }
    async function getEccount(eccount_id) {
        let res;
        await fetch(`http://localhost:8080/docs/${eccount_id}`)
            .then(data => data.json()).then(data => {
                if (data.ok) {
                    NOTIFICATION("اطلاعات دریافت شد!", true)
                    res = data.data
                } else {
                    NOTIFICATION("اطلاعات دریافت نشد", false)
                }

            }).catch(err => {
                NOTIFICATION("خطای سرور در دریافت صورتحساب!", false)
            })
        return res

    }

    //invoice
    function addBuyInvoice(index, custommer_id, custom_date, form) {
        // let custom_date = new Date(custome_date)

        let items = Object.values(form)
        index = Number(index)
        axios.post("http://localhost:8080/invoice/buy-invoice", { index, custommer_id, custom_date, items }).then(data => data.data).then((data) => {
            if (data.ok) {
                NOTIFICATION("فاکتور با موفقیت ثبت شد !", true)
                setTimeout(() => {
                    return window.location.reload()

                }, 1000);
            } else {

                NOTIFICATION("خطا در ثبت فاکتور!", false)
            }

        }).catch(() => {
            NOTIFICATION("خطار در ارتباط با سرور در حین ثبت فاکتور!", false)
        })
    }
    function addSellInvoice(index, custommer_id, custome_date, form) {
        let custom_date = custome_date

        let items = Object.values(form)
        index = Number(index)

        axios.post("http://localhost:8080/invoice/sell-invoice", { index, custommer_id, custom_date, items })
            .then(data => data.data).then(data => {
                if (data.ok) {
                    NOTIFICATION("فاکتور قبت شد!", true)

                    setTimeout(() => {
                        return window.location.reload()

                    }, 1000);
                } else {
                    switch (data.err.code) {
                        case "ER_DUP_ENTRY":
                            return NOTIFICATION("شماره فاکتور تکراری است!", false)
                    }
                }
            })
            .catch(err => {
                NOTIFICATION("خطا در برقراری ارتباط با سرور حین ثبت فاکتور فروش!", false)

            })
    }
    async function getInvoice(invoice_id) {
        return fetch(`http://localhost:8080/invoice/${invoice_id}`).then(data => data.json())
            .then(data => {
                if (data.err) {
                    NOTIFICATION("خطا در دریافت فاکتور", false)
                }

                return data.data

            }).catch(err => {
                NOTIFICATION("خطای سرور در دریافت فاکتور", false)
            })
    }

    //doc
    function getDocs() {

    }
    function addDoc(data) {
        if (Number(data.total) == 0) {
            const { date, form } = data
            const custome_date = date
            const rows = Object.values(form)
            let err = rows.filter(item => item.bed == "" && item.bes == "")
            if (err.length > 0) {
                return NOTIFICATION("بعضی از فیلد ها خالی هستند!", false)
            }
            axios.post("http://localhost:8080/docs", { form, custome_date })
                .then(data => data.data).then(data => {
                    if (data.ok) {
                        NOTIFICATION("سند افزوده شد!", true)
                        update()
                    } else {
                        Notification("خطا در افزودن سند!", false)
                    }
                }).catch(err => {
                    NOTIFICATION("خطای سرور در حین فزودن سند!", false)
                })
        } else {
            NOTIFICATION("سند تراز نمیباشد!", false)
        }
    }

    //fetch lists
    useEffect(update, [])

    return (
        <Context.Provider
            value={{
                update, cats, orgcats, products, units, prices, eccounts, allowSubmitForm, invoices, cashTotal, yearInvoice, setAllowSubmitForm,
                changeParent, addCat, removeCat, addProduct, updateProduct, removeProduct, addUnit, removeUnit, addEccount, deleteEccount, updateEccount,
                addBuyInvoice, addSellInvoice, addDoc, getEccount, getInvoices, getInvoice
            }}>
            {children}
            {
                notification &&
                <Notification type={notificationType} text={notificationText} setShow={() => {
                    setNotification(false)
                }} />
            }

        </Context.Provider>
    )
}


export { ContextProvider, Context }