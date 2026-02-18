import { useContext } from "react"
import { MdOutlineRefresh } from "react-icons/md"
import { Context } from "../../context/Context"

const RefreshBTN = props => {
    const { update } = useContext(Context)
    return <div className="fixed top-5 left-5 w-fit h-fit bg-white rounded shadow flex flex-row justify-center align-middle p-2 z-50">
        <div className="cursor-pointer"
            onClick={() => {
                if (update)
                    update()
            }}
        ><MdOutlineRefresh className="text-2xl" /></div>
    </div>
}

export default RefreshBTN