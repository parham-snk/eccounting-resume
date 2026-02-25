import { useContext, useEffect, useRef, useState } from "react"
import { Context } from "../../context/Context"
import splitNumber from "../../components/util/split-numbers"

const Eccount_Modifier = props => {
    const { eccount } = props
    const { eccounts, addEccount, updateEccount } = useContext(Context)
    const [name, setName] = useState()
    const [eccount_value, set_eccount_value] = useState(null)
    const [eccount_type, set_eccount_type] = useState(null)


    const name_input = useRef()


    function addeccount() {
        if (name) {
            addEccount(name, eccount_value, eccount_type)
        }
    }
    function check_Unique_name(name) {
        if (eccounts) {
            let filter = [...eccounts].filter(item => item.eccount_name == name)
            if (filter.length > 0) {
                alert("نام تکراری است")
                return false
            }
            return true
        }
    }

    useEffect(() => {
        if (eccount) {
            name_input.current.value = eccount.eccount_name
            setName(eccount.eccount_name)
        }
    }, [props])
    return <div className="w-1/3 mx-4 h-full bg-white dark:text-white dark:bg-zinc-700 rounded shadow-xl p-2 flex flex-col justify-start align-middle z-10">
        <div className="flex flex-col my-3">
            <label htmlFor="">نام حساب :</label>
            <input type="text"
                ref={name_input}
                className="bg-white rounded p-2 shadow w-full dark:text-black"
                onChange={e => {
                    let reg = /^\d+/
                    if (reg.test(e.target.value) == false) {
                        setName(String(e.target.value).trim())
                    } else {
                        alert("نام نباید با اعداد شروع شود")
                        e.target.value = ""
                    }

                }}
                onBlur={(e) => {
                    if (!eccount)
                        if (check_Unique_name(e.target.value) == false) {
                            e.target.value = ""
                        }
                }}
                placeholder="نام حساب"
            />
        </div>
        {
            //سند افتتاحیه
            !props.eccount &&
            <div className="flex flex-col my-3">
                <label htmlFor="">سند افتتاحیه :</label>
                <input type="text"
                    className="bg-white rounded p-2 shadow w-full dark:text-black"
                    onKeyDown={e => {
                        if (e.key == "Backspace" || /\d/.test(e.key)) {

                        } else {
                            e.preventDefault()
                        }
                    }}
                    onChange={e => {
                        let val = String(e.target.value).split(",").join("")
                        set_eccount_value(val)
                        val = splitNumber(val)
                        e.target.value = val
                    }}
                />
            </div>
        }
        {
            !props.eccount &&
            <div className="flex flex-col my-3">
                <label htmlFor="" className="py-2"> به عنوان :</label>

                <div className="flex flex-row items-center align-middle">
                    <input className="mx-1 cursor-pointer" type="radio" name="eccount_type" id="bed" value={"bed"} onClick={() => {
                        set_eccount_type("bed")
                    }}></input>
                    <label htmlFor="#bed">بدهکار</label>
                </div>
                <div className="flex flex-row items-center align-middle">
                    <input className="mx-1 cursor-pointer" type="radio" name="eccount_type" value={"bes"} onClick={() => {
                        set_eccount_type("bes")
                    }}></input>
                    <label htmlFor="بدهکار">بستانکار  </label>
                </div>
            </div>
        }
        {
            !props.eccount &&
            <div className="w-full ">
                <input className="w-full bg-blue-400 text-white p-2 rounded cursor-pointer bottom-0" type="button" value={"افزودن حساب"} onClick={addeccount} />
            </div>
        }



        {
            eccount &&
            <div className="flex flex-col justify-start align-middle w-full ">
                <p>وضعیت حساب : <p>{eccount.eccount_total ? eccount.eccount_total : "بدون تراکنش"}</p></p>
                <input type="button" className={`${eccount.eccount_name != name ? "bg-blue-400 text-white cursor-pointer" : "border border-blue-400 text-blue-400 cursor-default"}  rounded w-full p-2  my-10`} disabled={eccount.eccount_name == name ? true : false}
                    onClick={() => {

                        updateEccount({...eccount,eccount_name:name})
                    }} value={"به روز رسانی "} />
            </div>
        }
    </div>
}

export default Eccount_Modifier