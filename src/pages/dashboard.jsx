import { IoTrendingDown, IoTrendingDownSharp, IoTrendingUpSharp } from "react-icons/io5";

import { Chart as chartjs, LineElement, PointElement, SubTitle, CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, scales } from "chart.js"
import { Chart, Line } from "react-chartjs-2"
import { Link } from "react-router";
import Select from "../components/dashboard/select";
import { Activity, useEffect, useState } from "react";
import Table from "../components/dashboard/table";



chartjs.register(LineElement, PointElement, SubTitle, CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, scales);

const Dashboard = props => {

    const fakeData = [, { id: 11, date: "2025/11/20", desc: "فاکتور فروش 427", price: "2,445,540,000", type: 0 }, { id: 11, date: "2025/11/20", desc: "فاکتور فروش 427", price: "2,445,540,000", type: 0 }, { id: 11, date: "2025/11/20", desc: "فاکتور فروش 427", price: "2,445,540,000", type: 0 }, { id: 11, date: "2025/11/20", desc: "فاکتور فروش 427", price: "2,445,540,000", type: 0 }, , , { id: 12, date: "2022/10/23", desc: "فاکتور فروش 427", price: "2,445,540,000", type: 0 }, { id: 13, date: "2022/10/23", desc: "فاکتور فروش 427", price: "2,445,540,000", type: 0 }]
    const [data, setData] = useState(fakeData)

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
                    <p className="ps-4 text-gray-500 w-full  py-3 text-center">آمار فروش</p>
                    <Line
                        height={"100%"}
                        data={{
                            labels: ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آباد", "آذر", "دی", "بهمن", "اسفند"]

                            , datasets: [{
                                data: [255, 365, 450, 520, 670, 750, 890, 978, 1100, 1200, 1330],
                                pointBackgroundColor: "rgb(16, 167, 255)",
                                borderColor: "black",
                                label: "موجودی ب میلیون تومان",
                                borderWidth: 1.5,
                                fill: true,
                                backgroundColor: "black",
                                tension: 0.3,
                                pointHoverBorderColor: "gold",
                                pointHoverBorderWidth: 2,
                                pointHoverBackgroundColor: "gold",
                                pointBorderColor: "rgb(16, 167, 255)"
                            }]
                        }}
                    />
                </div>
                <div className="
                w-full md:w-2/5 h-fit md:h-full bg-white
                flex flex-col align-sub items-start
                p-5
                rounded-sm shadow
                order-1 md:order-2
                ">
                    <p className="border-b w-full  pb-5 font-black">موجودی</p>
                    <div className="w-full h-1/3 flex flex-row justify-center align-middle items-center
                    
                    ">
                        <p className="text-2xl font-bold">1,365,560,000 </p><sub className="mb-10 ms-5 text-lg">ریال</sub>

                    </div>

                    <div className="flex flex-row justify-center align-middle w-full gap-2">
                        <div className="py-2 w-1/2 flex flex-col justify-center items-center  align-middle bg-blue-50">
                            <IoTrendingUpSharp size={30} className="text-blue-500" />
                            <p className="bg-blue-200 text-blue-400 px-10 py-3 my-2 rounded">400</p>
                            <p className="text-blue-500">طلب ها</p>
                        </div>
                        <div className="py-2 w-1/2 flex flex-col justify-center align-middle items-center bg-red-50">
                            <IoTrendingDownSharp size={30} className="text-red-500" />
                            <p className="bg-red-200 text-red-400 px-10 py-3 my-2 rounded">400</p>
                            <p className="text-red-500">بدهی ها</p>
                        </div>

                    </div>
                    <Link className="my-5 mx-5 border border-gray-400 text-gray-400 shadow rounded w-4/5 p-2 start-0 scale-90 text-sm text-center
                hover:bg-gray-400 hover:text-white 
                " to={"/bill"}>مشاهده حساب</Link>
                </div>
            </div>

            <div className="flex flex-col justify-between align-sub items-start w-full min-h-1/2 max-h-1/2 bg-white shadow rounded-md py-4 px-7 relative">
                <div className="flex flex-col justify-start md:flex-row md:justify-between align-middle md:items-center w-full text-sm border-b pb-5 md:border-b-0 md:pb-0">

                    <p className="w-fit start-0 text-start text-nowrap order-1">فعالیت های اخیر</p>
                    <input type="text" className="bg-gray-200 my-4 md:my-0 mx-10 py-2 ps-5 md:w-100 text-right outline-0 rounded order-4" placeholder="جستجو" />

                    <div className=" flex flex-row align-middle items-center mx-10 order-4">
                        <p className="text-xs text-nowrap">هفته اخیر</p>
                        <Select changeData={(sign) => {
                            setLoad(true)
                            if (sign) {
                                setLoad(false)
                                return setData(fakeData)
                            }
                            console.log(false)
                            let date = Date.now()
                            let now = new Date(date)
                            let [ny, nm, nd] = [now.getFullYear(), now.getMonth(), now.getDate()]
                            nm++
                            let rows = data.filter(row => {
                                let target = new Date(row.date).getTime()
                                let dayValue = (60 * 60 * 60 * 24) * 7
                                let avr = (now - dayValue)
                                if (avr < Number(target)) {
                                    return row
                                }
                            })
                            setData(rows)
                            setLoad(false)



                        }} />
                        <p className="text-xs text-gray-500">({data.length} مورد)</p>
                    </div>
                    <Link to={"/lasts"} className="decoration-1 text-nowrap text-xs md:text-sm  md:mx-10 py-1 md:bg-none order-2 md:order-4
                    absolute md:relative top-3 md:top-0 end-5 md:end-0
                    ">مشاهده همه</Link>

                </div>
                <div className="h-full w-full mt-7 relative overflow-y-scroll pb-10">
                    <Activity mode={load ? "visible" : "hidden"} >
                        <div id="loading" className="w-full h-full backdrop-blur-2xl absolute top-0 left-0 flex justify-center items-center">
                            <h1>در حال جست و جو ...</h1>
                        </div>
                    </Activity>
                    {
                        data.length > 1 &&
                        <Table data={data} />
                    }
                    {
                        data.length < 1 &&
                        <div className="w-full h-100 flex justify-center align-middle">
                            <h1>ردیفی موجود نیست</h1>
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default Dashboard