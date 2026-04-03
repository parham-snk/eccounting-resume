import { IoTrendingDown, IoTrendingDownSharp, IoTrendingUpSharp } from "react-icons/io5";

import { Chart as chartjs, LineElement, PointElement, SubTitle, CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, scales, } from "chart.js"
import { Chart, Line } from "react-chartjs-2"
import { Link } from "react-router";
import Select from "../components/dashboard/select";
import { Activity, useContext, useEffect, useState } from "react";
import Table from "../components/dashboard/table";
import { Context } from "../context/Context";
import Modal from "../components/modal";
import Invoice_item_modal from "./invoices/invoice_item_modal";
import splitNumber from "../components/util/split-numbers";



chartjs.register(LineElement, PointElement, SubTitle, CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, scales);

const Dashboard = props => {
    let { invoices, cashTotal } = useContext(Context)
    const [cash, setCash] = useState()

    const [invoiceList, setInvoiceList] = useState()
    const [searchBar, setSearchBar] = useState()

    const [showModal, setShowModal] = useState()
    const [invoiceItem, setInvoiceItem] = useState()


    const [bed, setBed] = useState([])
    const [bes, setBes] = useState([])
    //set bed & bes
    useEffect(() => {
        if (invoices) {
            function getSplitedDate(date) {
                let [y, m, d] = String(date).split("T")[0].split("-")
                return { y, m, d }
            }
            let list = invoices

            let year = getSplitedDate(list[[...list].length - 1].custom_date).y
            list = list.filter(item => getSplitedDate(item.custom_date).y == year)
            let bedd = [], bess = []
            async function getTotal() {
                for (let i = 1; i <= 12; i++) {
                    i = i < 10 ? Number(`0${i}`) : i
                    let list2 = list.filter(item => getSplitedDate(item.custom_date).m == i)
                    let bedList = list2.filter(item => item.invoice_type == "bed").map(item => item.total_price)
                    let besList = list2.filter(item => item.invoice_type == "bes").map(item => item.total_price)


                    let bed_sum = 0, bes_sum = 0

                    if (bedList.length > 0) {
                        bed_sum = [...bedList].reduce((t, c) => {
                            return t + c
                        })
                    }
                    if (besList.length > 0) {
                        bes_sum = [...besList].reduce((t, c) => {
                            return t + c
                        })
                    }


                    if (bedList.length > 0) {
                        bedd.push(bed_sum)
                    }
                    if (besList.length > 0) {
                        bess.push(bes_sum)
                    }



                }
            }

            getTotal().then(() => {
                setBed(bedd)
                setBes(bess)
            })


        }
    }, [invoices])

    useEffect(() => {
        setInvoiceList(invoices)
        if (cashTotal)
            setCash(cashTotal)
    }, [invoices, cashTotal])

    useEffect(() => {
        if (searchBar == " ") {
            setInvoiceList(invoices)
        } else {
            if (invoices) {
                let suggestion;
                //search by eccount
                suggestion = [...invoices].filter(item => String(item.eccount_name).includes(searchBar))
                if (suggestion.length > 0) {
                    return setInvoiceList(suggestion)
                }
                //search by description
                else if (String(searchBar).includes("فروش")) {
                    console.log(invoiceList)
                    suggestion = [...invoices].filter(item => item.invoice_type == "bes")
                    setInvoiceList(suggestion)
                }
                else if (String(searchBar).trim().includes("خرید")) {
                    suggestion = [...invoices].filter(item => item.invoice_type == "bed")
                    return setInvoiceList(suggestion)
                } else {
                    if (searchBar)
                        setInvoiceList([])
                }
            }


        }
    }, [searchBar])
    const [load, setLoad] = useState(false)
    useEffect(() => {
        document.title = "داشبورد"
    }, [])
    return (
        <div className="
        w-full h-full
        flex flex-col justify-start align-middle items-center
        pt-2 md:p-0
        gap-2
        ">
            <div className="
            w-full h-fit md:h-4/5 
            flex flex-col md:flex-row justify-center align-sub items-start 
            gap-4
            ">
                <div className="
                chart
                w-full  md:w-4/5 h-full md:h-full rounded-sm shadow
                bg-white
                p-2
                order-2 md:order1
                ">
                    <p className="ps-4 text-gray-500 w-full  py-3 text-center">آمارخرید و فروش</p>
                    {
                        bed && bes &&
                        <Line
                            height={"100%"}
                            data={{
                                labels: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آباد", "آذر", "دی", "بهمن", "اسفند"],

                                datasets: [{
                                    data: bed,
                                    pointBackgroundColor: "red",
                                    borderColor: "black",
                                    label: "خرید (تومان) :",
                                    borderWidth: 1.5,
                                    fill: true,
                                    backgroundColor: "black",
                                    tension: 0.3,
                                    pointHoverBorderColor: "gold",
                                    pointHoverBorderWidth: 2,
                                    pointHoverBackgroundColor: "gold",
                                    pointBorderColor: "red",
                                    tooltip:true
                                },
                                {
                                    data: bes,
                                    pointBackgroundColor: "blue",
                                    borderColor: "black",
                                    label: "فروش (تومان) :",
                                    borderWidth: 1.5,
                                    fill: true,
                                    backgroundColor: "black",
                                    tension: 0.3,
                                    pointHoverBorderColor: "gold",
                                    pointHoverBorderWidth: 2,
                                    pointHoverBackgroundColor: "gold",
                                    pointBorderColor: "blue"
                                }
                                ]
                            }}
                        />
                    }

                </div>

                {
                    //left section
                }
                <div className="
                w-full md:w-2/5 h-fit md:h-full bg-white
                flex flex-col align-sub items-start
                p-5
                rounded-sm shadow
                order-1 md:order-2
                dark:bg-zinc-700 dark:text-white
                ">
                    <p className="border-b w-full  pb-5 font-black">موجودی</p>
                    <div className="w-full h-1/3 flex flex-row justify-center align-middle items-center
                    
                    ">
                        <p className="text-2xl font-bold">{cashTotal ? splitNumber(cash) : 0}</p><sub className="mb-10 ms-5 text-lg">تومان</sub>

                    </div>

                    <div className="flex flex-row justify-center align-middle w-full gap-2">
                        <div className="py-2 w-1/2 flex flex-col justify-center items-center  align-middle bg-blue-50 dark:bg-blue-900 dark:rounded">
                            <IoTrendingUpSharp size={30} className="text-blue-500 dark:text-blue-300" />
                            <p className="bg-blue-200  text-blue-400 dark:bg-blue-600 dark:text-blue-200 dark:rounded px-10 py-3 my-2 rounded">400</p>
                            <p className="text-blue-500 dark:text-blue-300">طلب ها</p>
                        </div>
                        <div className="py-2 w-1/2 flex flex-col justify-center align-middle items-center bg-red-50 dark:bg-red-900 dark:rounded ">
                            <IoTrendingDownSharp size={30} className="text-red-500 dark:text-red-300" />
                            <p className="bg-red-200 text-red-400 px-10 py-3 my-2 rounded dark:bg-red-600 dark:text-red-200">400</p>
                            <p className="text-red-500 dark:text-red-300">بدهی ها</p>
                        </div>

                    </div>

                    <Link className="my-5 mx-5 border border-gray-400 text-gray-400 shadow rounded w-4/5 p-2 start-0 scale-90 text-sm text-center
                hover:bg-gray-400 hover:text-white 
                " to={"/billing?id=22"}>مشاهده حساب</Link>
                </div>
            </div>
            {
                //buttom section
            }
            <div className="flex flex-col justify-between align-sub items-start w-full min-h-1/2 max-h-1/2 bg-white dark:bg-zinc-700 dark:text-white shadow rounded-md py-4 px-7 relative">
                <div className="flex flex-col justify-start md:flex-row md:justify-between align-middle md:items-center w-full text-sm border-b pb-5 md:border-b-0 md:pb-0">

                    <p className="w-fit start-0 text-start text-nowrap order-1">فعالیت های اخیر</p>
                    <input
                        onChange={e => setSearchBar(e.target.value)}
                        type="text" className="bg-gray-200 my-4 md:my-0 mx-10 py-2 ps-5 md:w-100 text-right outline-0 rounded order-4 dark:text-black" placeholder="جستجو" />

                    <div className=" flex flex-row align-middle items-center mx-10 order-4">
                        {/* <p className="text-xs text-nowrap">هفته اخیر</p> */}
                        {/* <Select changeData={(sign) => {
                            // setLoad(true)
                            // if (sign) {
                            //     setLoad(false)
                            //     return setData(invoices)
                            // }
                            // let date = Date.now()
                            // let now = new Date(date)
                            // let [ny, nm, nd] = [now.getFullYear(), now.getMonth(), now.getDate()]
                            // nm++
                            // let rows = data.filter(row => {
                            //     let target = new Date(row.date).getTime()
                            //     let dayValue = (60 * 60 * 60 * 24) * 7
                            //     let avr = (now - dayValue)
                            //     if (avr < Number(target)) {
                            //         return row
                            //     }
                            // })
                            // setData(rows)
                            // setLoad(false)



                        }} /> */}
                        {/* <p className="text-xs text-gray-500 dark:text-gray-300">({invoices ? invoices?.length : 0} مورد)</p> */}
                    </div>

                    <Link to={"/invoices"} className="decoration-1 text-nowrap text-xs md:text-sm  md:mx-10 py-1 md:bg-none order-2 md:order-4
                    absolute md:relative top-3 md:top-0 end-5 md:end-0
                    ">مشاهده همه</Link>


                </div>
                {
                    invoiceList?.length >= 1 &&
                    <div className="h-full w-full mt-7 relative overflow-y-scroll pb-10">
                        <Table setInvoiceItem={val => {
                            setInvoiceItem(val)
                            setShowModal(true)
                        }} data={[...invoiceList].reverse()} />
                    </div>
                }



                {
                    invoiceList?.length < 1 &&
                    <div className="w-full h-full flex justify-center align-middle items-center">
                        <h1>ردیفی موجود نیست</h1>
                    </div>
                }


            </div>
            {
                showModal &&
                <Modal close={() => setShowModal(false)}>
                    <Invoice_item_modal data={invoiceItem} />
                </Modal>
            }

        </div >
    )
}

export default Dashboard