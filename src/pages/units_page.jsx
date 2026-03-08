import { useContext, useEffect, useState } from "react"
import { Context } from "../context/Context"
import UnitModifier from "./unit/Unit_modifier"
import UnitList from "./unit/unit_list"

const UnitsPage = props => {
    useEffect(() => {
        document.title = "اصلاح واحد ها "
    }, [])
    return <div className="text-white ">
        <div className="dark:text-black">
            <UnitModifier />
        </div>
        <UnitList />
    </div>
}


export default UnitsPage