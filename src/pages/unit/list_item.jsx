import { useEffect, useRef, useState } from "react"
import $ from "jquery"

const UnitListItem = props => {
    const { item } = props

    return (
        <div className="">
            <p
                onContextMenu={(e) => {
                    e.preventDefault()
                    const { clientX, clientY } = e
                    props.setShowContext(true)
                    props.setItem()
                    props.setCoordinates({ x: clientX, y: clientY })
                }}
            >{item.name}</p>


        </div>
    )
}

export default UnitListItem