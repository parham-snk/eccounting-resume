import { useEffect, useState } from "react"
import Ul from "./ul"
import $ from "jquery"

const Li = props => {
    const { cat, children } = props?.item
    const [ul, setUl] = useState()
    useEffect(() => {
        $(document).ready(function () {
            
            document.getElementById(`${cat.cat_id}`).addEventListener("click", function (e) {
                $(`#${cat.cat_id}`).nextAll("ul").slideToggle(0)
            },false)


        })
        let elements = children.map((item, index) => <Ul key={item.cat_name} childs={item} />)
        setUl(elements)
    }, [])
    return (
        <li   >
            <p id={cat.cat_id} className={[...children].length>0?"cursor-pointer":null}>{[...children].length>0?<span className="text-xs">+</span>:null}{cat?.cat_name}</p>
            {ul && ul}</li>
    )
}

export default Li