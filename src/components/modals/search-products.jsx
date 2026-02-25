import { IoMdAdd } from "react-icons/io"
import Modal from "../modal"
import { useContext, useEffect, useRef, useState } from "react"
import ProductModifier from "../../pages/product/product_modifier"
import { Context } from "../../context/Context"

const SearchProducts = props => {
    const { update,close } = props
    const { products } = useContext(Context)
    const [name, setName] = useState()
    const [modal, showModal] = useState()
    const [list, setList] = useState()
    const field = useRef()

    useEffect(() => {
        if (products) {
            function P(item, index) {
                return <p
                    className="w-full cursor-pointer hover:bg-gray-300 dark:hover:text-black dark:bg-zinc-700 p-3 flex flex-row justify-between items-center align-middle border-b last:border-b-0"
                    key={index}
                    onClick={() => {
                        update(item)
                        close()
                        
                    }}
                >
                    {item.product_name}
                </p>
            }
            if (!name || name == "") {
                let items = [...products].slice(0, 7).map((item, index) => P(item, index))
                return setList(items)
            }
            let filter = [...products].filter(item => String(item.product_name).includes(name))
            let items = filter.map((item, index) => P(item, index))
            setList(items)
        }

    }, [products, name])
    return (
        <div className="flex flex-col justify-sub items-center z-10 bg-white dark:bg-zinc-700 w-4/5 md:w-1/4 h-4/5 shadow p-4 rounded">
            <div className="flex flex-row justify-center align-middle items-center">
                <input autoComplete="off" onChange={e => setName(e.target.value)} autoFocus ref={field} type="text"
                    className="border border-gray-400 rounded px-2 py-1" placeholder="یافتن محصول" />
                <div className="w-7 h-7 mx-5 flex justify-center align-middle items-center cursor-pointer bg-gray-100 dark:text-white dark:bg-zinc-700 border border-gray-200"
                    onClick={() => {
                        showModal(true)
                    }}>
                    <IoMdAdd size={15} className="" />
                </div>

                {
                    modal &&
                    <Modal close={() => {
                        showModal(false)
                    }} >
                        <ProductModifier />
                    </Modal>
                }

            </div>
            <div className="flex flex-col justify-start align-top items-baseline w-full pt-4">
                {
                    list &&
                    list
                }
            </div>
        </div>
    )
}

export default SearchProducts