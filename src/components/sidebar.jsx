import { NavLink } from "react-router"
import { LuWalletMinimal } from "react-icons/lu";
import { AiFillHome, AiOutlineHome } from "react-icons/ai"
import { IoLogoAppleAr } from "react-icons/io5";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
const Sidebar = props => {
    return (
        <div className="
        order-2 md:order-2
        relative   
        w-9/10 md:w-1/5  rounded-2xl md:rounded-sm h-15 md:h-9/10 bottom-0 md:bottom-auto
        bg-white shadow
        flex flex-row md:flex-col justify-center align-middle items-center
        overflow-hidden
        my-2 md:md-0
        ">

            <NavLink to={"/"} className="
            active:bg-gray-400 active:text-white
            flex flex-row justify-center md:justify-start align-middle items-center w-9/10
            md:rounded-sm
            p-3
            hover:bg-gray-200 h-full md:h-auto
            ">
                <IoLogoAppleAr size={30} className="me-5" />
                <h4 className="hidden md:flex">داشبورد</h4>
            </NavLink>

            <NavLink to={"/eccounts"} className="
            active:bg-gray-400 active:text-white
            flex flex-row justify-center md:justify-start align-middle items-center w-9/10
            md:rounded-sm
            p-3
            hover:bg-gray-200 h-full md:h-auto
            ">

                <LuWalletMinimal size={30} className="me-5" />
                <h4 className="hidden md:flex">حسابها</h4>
            </NavLink>
             <NavLink to={"/proggres"} className="
            active:bg-gray-400 active:text-white
            flex flex-row justify-center md:justify-start align-middle items-center w-9/10
            md:rounded-sm
            p-3
            hover:bg-gray-200 h-full md:h-auto
            ">

                <LiaFileInvoiceDollarSolid size={30} className="me-5" />
                <h4 className="hidden md:flex">عملیات ها </h4>
            </NavLink>
        </div>
    )
}

export default Sidebar