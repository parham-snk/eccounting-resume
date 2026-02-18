import { FaFileInvoiceDollar } from "react-icons/fa6";
import { FaFileInvoice } from "react-icons/fa6";
import { FaThList } from "react-icons/fa";
import { TbInvoice } from "react-icons/tb";
import { Link } from "react-router";
import { AiFillProduct } from "react-icons/ai";
import { PiUniteSquare } from "react-icons/pi";
import { useEffect } from "react";
import { GrDocumentStore } from "react-icons/gr";
export default function Proggress() {
    useEffect(() => {
        document.title = "صفحه فعالیت ها "
    }, [])
    return (
        <div className="bg-white w-full h-full shadow rounded flex flex-col flex-wrap md:flex-row justify-around align-middle items-center p-10 md:p-0 overflow-y-scroll">
            <div className="flex flex-col justify-center align-baseline w-full p-3">
                <h1 className="text-xl p-5">اسناد</h1>
                <div className="flex flex-row justify-start align-middle flex-wrap">
                    <Link to={"/proggres/buyInvoice"} className="m-3">
                        <div className="my-1 md:my-0 w-40 md:w-50 h-40 md:h-50 shadow rounded flex flex-col justify-center items-center hover:bg-gray-600 hover:text-white bg-white">
                            <FaFileInvoiceDollar size={60} />
                            <p className="my-5">فاکتور خرید</p>
                        </div>
                    </Link>
                    <Link to={"/proggres/sellInvoice"} className="m-3">
                        <div className="my-1 md:my-0 w-40 md:w-50 h-40 md:h-50 shadow rounded flex flex-col justify-center items-center hover:bg-gray-600 hover:text-white bg-white">
                            <FaFileInvoice size={60} />
                            <p className="my-5">فاکتور فروش</p>
                        </div>
                    </Link>
                    <Link className="m-3">
                        <div className="my-1 md:my-0 w-40 md:w-50 h-40 md:h-50 shadow rounded flex flex-col justify-center items-center hover:bg-gray-600 hover:text-white bg-white">
                            <TbInvoice size={60} />
                            <p className="my-5">سند</p>
                        </div>
                    </Link>
                </div>

            </div>
            <div className="flex flex-col justify-center align-baseline w-full p-3">
                <h1 className="text-xl p-5">تعاریف</h1>
                <div className="flex flex-row justify-start align-middle flex-wrap">
                    <Link to={"/proggres/eccounts"} className="m-3">
                        <div className="my-1 md:my-0 w-40 md:w-50 h-40 md:h-50 shadow rounded flex flex-col justify-center items-center hover:bg-gray-600 hover:text-white bg-white">
                            <GrDocumentStore size={60} />
                            <p className="my-5">حسابها</p>
                        </div>
                    </Link>
                    <Link to={"/proggres/cats"} className="m-3">
                        <div className="my-1 md:my-0 w-40 md:w-50 h-40 md:h-50 shadow rounded flex flex-col justify-center items-center hover:bg-gray-600 hover:text-white bg-white">
                            <FaThList size={60} />
                            <p className="my-5">دسته بندی ها </p>
                        </div>
                    </Link>
                    <Link to={"/proggres/products"} className="m-3">
                        <div className="my-1 md:my-0 w-40 md:w-50 h-40 md:h-50 shadow rounded flex flex-col justify-center items-center hover:bg-gray-600 hover:text-white bg-white">
                            <AiFillProduct size={60} />
                            <p className="my-5">کالاها</p>
                        </div>
                    </Link>
                    <Link to={"/proggres/units"} className="m-3">
                        <div className="my-1 md:my-0 w-40 md:w-50 h-40 md:h-50 shadow rounded flex flex-col justify-center items-center hover:bg-gray-600 hover:text-white bg-white">
                            <PiUniteSquare size={60} />
                            <p className="my-5">واحدها</p>
                        </div>
                    </Link>
                </div>

            </div>


        </div>
    )
}