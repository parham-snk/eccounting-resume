import { Activity, useEffect, useRef, useState } from "react"
import Modal from "../components/modal"
import SearchUserModal from "../components/modals/searchUser"
import Table from "./table-invoice/table"

const InvoiceBuy = props => {
    const [date, setDate] = useState("----/--/--")
    const [modal, showModal] = useState(false)
    const eccountRef = useRef()
    const [eccount, setEccount] = useState()
    useEffect(() => {
        document.title = "فاکتور خرید"
    }, [])
    useEffect(() => {
        if (eccount) {
            eccountRef.current.value = eccount.eccount_name
        } else {
            eccountRef.current.value = ""
        }

    }, [eccount])
    return (
        <div className="bg-white dark:bg-zinc-700 w-full h-full shadow rounded flex flex-col  md:justify-start align-middle items-start p-3 md:p-0 ">
            <div className="w-full justify-center flex py-2 pt-3 "><p className="bg-gray-500 rounded p-2 text-white text-sm ">
                فاکتور خرید</p></div>
            <table className="flex flex-row  justify- align-middle items-center w-1/4 right-0 md:w-full py-2 dark:text-white">
                <thead className="flex flex-col items-center mx-2">
                    <th className="my-1 p-1 text-xs bg-gray-500 w-full rounded text-white text-nowrap">شماره فاکتور</th>
                    <th className="my-1 p-1 text-xs bg-gray-500 w-full rounded text-white">تاریخ</th>
                    <th className="my-1 p-1 text-xs bg-gray-500 w-full rounded text-white">خریدار</th>
                </thead>
                <tbody className="flex flex-col">
                    {
                        //شماره فاکتور
                    }
                    <td><input type="text" className="border border-gray-400 rounded p-1 my-1 text text-center" autoComplete="off"/></td>
                    {
                        //تاریخ
                    }
                    <td><input dir="ltr" autoComplete="off" placeholder={date} type="text" value={date} onKeyDown={(e) => {
                        let key = e.key
                        // console.log(key)
                        if (/\d/.test(key)) {
                            setDate(date.replace("-", key))
                        } else if (key == "Backspace") {
                            function getDate(numbers) {
                                return `${numbers[0]}${numbers[1]}${numbers[2]}${numbers[3]}/${numbers[4]}${numbers[5]}/${numbers[6]}${numbers[7]}`
                            }
                            e.preventDefault()
                            let numbers = new String(date).split("/").join("")
                            if (numbers.indexOf("-") >= 0) {
                                numbers = numbers.replace(/\d(?=\-+)/, "-") + "-"
                                return setDate(getDate(numbers))
                            }
                            numbers = numbers.slice(0, (numbers.length) - 1) + '-'
                            setDate(getDate(numbers))

                        }
                    }}
                        onBlur={(e) => {
                            if (e.target.value != "----/--/--") {
                                let reg = /^14\d{2}\/(0?[1-9]|1[0-2])\/(0?[1-9]|[12]\d|3[01])$/
                                if (reg.test(e.target.value) == false) {
                                    alert("تاریخ اشتباه می باشد!")
                                    setDate("----/--/--")
                                    e.target.focus()
                                }
                            }


                        }}
                        className="border border-gray-400 rounded p-1 my-1 text text-center" />

                        {/* <button title="امروز" className="p-1 rounded mx-2 border border-gray-400" onClick={() => {
                            let D = new Date(Date.now()).toLocaleDateString("fa-IR")
                            console.log(new Date(D).toLocaleDateString("en"))
                            setDate(D)
                        }}>📅</button> */}
                    </td>
                    {
                        //خریدار
                    }
                    <td className="relative">
                        <input ref={eccountRef} autoComplete="off" type="text" className="border cursor-pointer border-gray-400 rounded p-1 my-1 text text-center select-none" onFocus={() => {
                            if (!modal) {
                                showModal(true)
                            }
                        }} />
                        {
                            modal &&
                            <Modal close={() => {
                                showModal(false)
                            }} >
                                <SearchUserModal close={() => showModal(false)} setEccount={eccount => {
                                    setEccount(eccount)
                                }} />
                            </Modal>
                        }

                    </td>

                </tbody>
            </table>
            <Table limit={false}></Table>
        </div >
    )
}

export default InvoiceBuy