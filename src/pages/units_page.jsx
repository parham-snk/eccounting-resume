import { useContext, useEffect, useState } from "react"
import { Context } from "../context/Context"
import UnitModifier from "./unit/Unit_modifier"
import UnitList from "./unit/unit_list"

const UnitsPage = props => {
    useEffect(() => {
        document.title = "اصلاح واحد ها "
    }, [])
    return <div className="">
        <UnitModifier />
        <UnitList />
    </div>
}


export default UnitsPage