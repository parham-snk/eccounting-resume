import { FaFileInvoiceDollar } from "react-icons/fa6";
import { FaFileInvoice } from "react-icons/fa6";
 import { TbInvoice } from "react-icons/tb";
import { Link } from "react-router";


export default function Proggress() {
    return (
        <div className="bg-white w-full h-full shadow rounded flex flex-col md:flex-row justify-around align-middle items-center p-10 md:p-0 ">
            <Link to={"/proggres/buyInvoice"}>
                <div className="my-1 md:my-0 w-40 md:w-50 h-40 md:h-50 shadow rounded flex flex-col justify-center items-center hover:bg-gray-600 hover:text-white bg-white">
                    <FaFileInvoiceDollar size={60} />
                    <p className="my-5">فاکتور خرید</p>
                </div>
            </Link>
            <Link>
                <div className="my-1 md:my-0 w-40 md:w-50 h-40 md:h-50 shadow rounded flex flex-col justify-center items-center hover:bg-gray-600 hover:text-white bg-white">
                    <FaFileInvoice size={60} />
                    <p className="my-5">فاکتور فروش</p>
                </div>
            </Link>
            <Link>
                <div className="my-1 md:my-0 w-40 md:w-50 h-40 md:h-50 shadow rounded flex flex-col justify-center items-center hover:bg-gray-600 hover:text-white bg-white">
                    <TbInvoice size={60} />
                    <p className="my-5">سند</p>
                </div>
            </Link>
        </div>
    )
}