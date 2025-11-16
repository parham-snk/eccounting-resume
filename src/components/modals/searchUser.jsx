import { Activity, useEffect, useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import Modal from "../modal";
const SearchUserModal = props => {
    const [modal, showModal] = useState()
    const field=useRef()
    useEffect(()=>{
        
    },[])
    return (
        <div className="flex flex-col justify-sub items-center z-10 bg-white w-4/5 md:w-1/4 h-4/5 shadow p-4 rounded">
            <div className="flex flex-row justify-center align-middle items-center">
                <input autoFocus ref={field} type="text" className="border border-gray-400 rounded px-2 py-1" placeholder="یافتن حساب" />
                <div className="w-7 h-7 mx-5 flex justify-center align-middle items-center cursor-pointer bg-gray-100 border border-gray-200" onClick={() => {
                    showModal(true)
                }}>
                    <IoMdAdd size={15} className="" />
                </div>

                {
                    modal &&
                    <Modal component={SearchUserModal} close={() => {
                        showModal(false)
                    }} />}

            </div>
        </div>
    )
}


export default SearchUserModal