import { useEffect, useRef, useState } from "react"
import Modal from "../../../components/modal"
import SearchProducts from "../../../components/modals/search-products"

const Name_Invoice_Input = props => {
    const { r, update, initValue } = props
    const [item, setItem] = useState()
    const [name, setName] = useState()
    const [context, setContext] = useState(false)
    const input = useRef()

    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if (item) {
            input.current.value = item.product_name
        }

    }, [item])
    window.addEventListener("click",()=>{
        setTimeout(() => {
            setContext(false)
        }, 100);
    })
    return (
        <td className="table-cell w-full relative">
            <input className={"border  text-center h-7 w-full cursor-pointer"}
                onKeyDown={ (e)=>e.preventDefault()}
                placeholder={'نام کالا'} ref={input} type="text"
                onClick={() => setShowModal(true)}
                onContextMenu={(e) => {
                    e.preventDefault()
                    if (item)
                        setContext(true)
                }}
            />
            {
                showModal &&
                <Modal close={() => setShowModal(false)} >
                    <SearchProducts close={() => {
                        setShowModal(false)
                    }} update={(val) => {
                        setItem(val)
                        update(val)
                    }} />
                </Modal>

            }
            {
                context &&
                <div className="w-full min-h-20 bg-white rounded shadow absolute top-0 ">
                    <p className="cursor-pointer w-full p-2 text-start text-red-400"
                        onClick={() => {
                            update(false)
                            setContext(false)
                            input.current.value=""
                        }}
                    >حذف</p>
                </div>
            }

        </td>
    )
}

export default Name_Invoice_Input