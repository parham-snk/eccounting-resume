import { useLocation, useNavigate } from "react-router"

export default function P404(){
    const loc = useNavigate()
    
    return(
        <div className="bg-white w-full h-full shadow rounded flex flex-col justify-center align-middle items-center">
            <p className="text-2xl">صفحه پیدا نشد!</p>
            <button onClick={()=>{
                loc(-1)
            }} className="bg-blue-400 text-white rounded px-3 py-2 mt-10 cursor-pointer">بازگشت به صفحه قبل</button>
        </div>
    )
}