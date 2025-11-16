import { Activity, useRef, useState } from "react"
import Modal from "../components/modal"
import SearchUserModal from "../components/modals/searchUser"

const InvoiceBuy = props => {
    const [date, setDate] = useState()
    const [modal, showModal] = useState(false)
    return (
        <div className="bg-white w-full h-full shadow rounded flex flex-col  md:justify-start align-middle items-start p-3 md:p-0 ">
            <table className="flex flex-row  justify- align-middle items-center w-1/4 right-0 md:w-full p-4">

                <tr className="flex flex-col items-center mx-2">
                    <th className="my-1 p-1 text-xs bg-gray-500 w-full rounded text-white text-nowrap">شماره فاکتور</th>
                    <th className="my-1 p-1 text-xs bg-gray-500 w-full rounded text-white">تاریخ</th>
                    <th className="my-1 p-1 text-xs bg-gray-500 w-full rounded text-white">خریدار</th>
                </tr>
                <tr className="flex flex-col">
                    <td><input type="text" className="border border-gray-400 rounded p-1 my-1 text text-center" /></td>
                    <td><input type="text" value={date} onChange={(e) => {
                        setDate(e.target.value)
                    }}
                        onBlur={(e) => {
                            if (e.target.value != "") {
                                let reg = /^14\d{2}\/(0?[1-9]|1[0-2])\/(0?[1-9]|[12]\d|3[01])$/
                                if (!reg.test(date)) {
                                    setDate("")
                                    alert("فرمت تاریخ اشتباه است")
                                    e.target.focus()
                                }
                            }

                        }}
                        className="border border-gray-400 rounded p-1 my-1 text text-center" /></td>
                    <td className="relative">
                        <input type="text" className="border border-gray-400 rounded p-1 my-1 text text-center select-none" onClick={() => {
                            if (!modal) {
                                showModal(true)
                            }
                        }} />
                        {
                            modal &&
                            <Modal component={SearchUserModal} close={() => {
                                showModal(false)
                            }} />
                        }

                </td>

            </tr>
        </table>
        </div >
    )
}

export default InvoiceBuy