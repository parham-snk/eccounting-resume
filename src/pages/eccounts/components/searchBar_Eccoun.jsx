import { useState } from "react"

const SearchBar_eccount = props => {
    return <div className="w-full h-fit p-3 flex flex-row justify-start align-middle items-center border-b border-b-gray-300">
        <label htmlFor="name">نام حساب</label>
        <input
            autoComplete="off"
            className=" border rounded p-1 mx-2"
            type="text" name="name"
            onChange={e => {
                props.setName(e.target.value)
            }}
        />
    </div>
}

export default SearchBar_eccount