import { Activity, useContext, useEffect, useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import Modal from "../modal";
import { Context } from "../../context/Context";
import Eccount_Modifier from "../../pages/eccounts/eccount_modifire";
const SearchUserModal = props => {
    const { setEccount } = props
    const { eccounts } = useContext(Context)
    const field = useRef()
    const [list, setList] = useState()
    const [name, setName] = useState()
    const [modal, showModal] = useState()

    function P(item, index) {
        return <p
            className="p-2 w-full cursor-pointer hover:bg-gray-200 dark:bg-zinc-700 dark:hover:bg-gray-400 dark:hover:text-black"
            key={index}
            onClick={() => {
                setEccount(item)
                props.close()
            }}
        >
            {item.eccount_name}
        </p>
    }
    useEffect(() => {
        if (eccounts) {
            let items = [...eccounts].map((item, index) => P(item, index))

            if (name) {
                let filter = [...eccounts].filter(item => String(item.eccount_name).includes(name))
                items = filter.map((item, index) => P(item, index))

            }
            setList(items)
        }
    }, [eccounts, name])
    return (
        <div className="flex flex-col justify-sub items-center z-10 bg-white dark:bg-zinc-700 w-4/5 md:w-1/4 h-4/5 shadow p-4 rounded">
            <div className="flex flex-row justify-center align-middle items-center">
                <input autoComplete="off" autoFocus ref={field} type="text" className="border border-gray-400 rounded px-2 py-1" placeholder="یافتن حساب"

                    onChange={e => setName(e.target.value)}
                />
                <div className="w-7 h-7 mx-5 flex justify-center align-middle items-center cursor-pointer bg-gray-100 border border-gray-200 dark:bg-zinc-700" onClick={() => {
                    showModal(true)
                }}>
                    <IoMdAdd size={15} className="" />
                </div>


                {
                    modal &&
                    <Modal close={() => {
                        showModal(false)
                    }} >
                        <Eccount_Modifier >

                        </Eccount_Modifier>
                    </Modal>}

            </div>
            <div className="flex flex-col justify-start align-top items-baseline w-full h-full pt-5">
                {
                    list &&
                    list
                }
            </div>
        </div>
    )
}


export default SearchUserModal