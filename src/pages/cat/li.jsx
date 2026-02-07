import { useContext, useEffect, useState } from "react"
import Ul from "./ul"
import $ from "jquery"
import { FaWindowClose } from "react-icons/fa";
import { Context } from "../../context/Context";
const Li = props => {
    const { cat, children } = props?.item
    const { removeCat, changeParent } = useContext(Context)
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
        <li id={`li-${cat.cat_id}`} onDragOver={ev => console.log(ev)}>
            <p className={`flex flex-row justify-between items-center`} draggable="true" onDragOver={e => e.preventDefault()} onDragStart={(ev) => {
                ev.dataTransfer.setData("li", `li-${cat.cat_id}`)
            }} onDrop={ev => {
                ev.preventDefault()
                let id = ev.dataTransfer.getData("li").split("-")[1]
                if (id != cat.cat_id) {
                    changeParent({ cat_id: id, parent_id: cat.cat_id })
                }
                // ev.target.appendChild(document.getElementById(id).parentElement)
            }}>
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