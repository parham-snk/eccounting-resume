import { useContext, useEffect, useState } from "react"
import Ul from "./ul"
import $ from "jquery"
import { FaWindowClose } from "react-icons/fa";
import { Context } from "../../context/Context";
const Li = props => {
    const { cat, children } = props?.item
    const { removeCat } = useContext(Context)
    const [ul, setUl] = useState()
    useEffect(() => {
        $(document).ready(function () {
            // setTimeout(() => {
            //     $(`#${cat.cat_id}`).parent("p").nextAll("ul").slideUp(0)
            // }, 10);
            document.getElementById(`${cat.cat_id}`).addEventListener("click", function (e) {
                $(`#${cat.cat_id}`).parent("p").nextAll("ul").slideToggle(0)
            }, false)


        })
        let elements = children.map((item, index) => <Ul key={item.cat_name} childs={item} />)
        setUl(elements)
    }, [])
    return (
        <li   >
            <p className={`flex flex-row justify-between items-center`}>
                <p id={cat.cat_id} className={`${[...children].length > 0 ? "cursor-pointer" : null}`}>
                    {[...children].length > 0 ? <span className="text-xs">+</span> : null}
                    {cat?.cat_name}
                </p>
                <div className="cursor-pointer" onClick={() => {
                    removeCat({ cat_id: cat?.cat_id })
                }}>
                    <FaWindowClose />
                </div>
            </p>
            {ul && ul}
        </li>
    )
}

export default Li