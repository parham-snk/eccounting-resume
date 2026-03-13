import { useContext, useEffect, useState } from "react"
import DOC_TABLE from "./docs/docs_table"
import { Context } from "../context/Context"

const DOCS_PAGE = props => {

    const {addDoc}=useContext(Context)
    const [form, setForm] = useState()
    const [date, setDate] = useState("----/--/--")

    useEffect(() => {
        document.title = "سند"
    }, [])


    return (
        <div className="
        bg-white dark:bg-zinc-700 text-black dark:text-white
        w-full h-full 
        flex flex-col justify-start align-middle items-start
        ">
            <div className="w-full justify-center flex py-2 pt-3 "><p className="bg-gray-500 rounded p-2 text-white text-sm ">
                سند حسابداری</p></div>
            <table className="flex flex-row  justify- align-middle items-center w-1/4 right-0 md:w-full py-2 dark:text-white">
                <thead className="flex flex-col items-center mx-2">
                    <th className="my-1 p-1 text-xs bg-gray-500 w-full rounded text-white">تاریخ</th>

                </thead>
                <tbody className="flex flex-col">
                    {
                        //تاریخ
                    }
                    <td>
                        <input dir="ltr" autoComplete="off" placeholder={date} type="text" value={date}
                            onKeyDown={(e) => {
                                let key = e.key
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
                </tbody>

            </table>

            <div className="p-2 w-full">
                <DOC_TABLE form={form} update={val => {
                    setForm({ ...form, ...val })
                }}

                    submit={(total => {
                        if (form && String(date).includes("-")==false) {
                            addDoc({total,form,date})
                        }
                    })}
                />
            </div>
        </div>
    )
}

export default DOCS_PAGE