import { useContext, useEffect, useState } from "react"
import { Context } from "../../context/Context"
import { useNavigate, useNavigation } from "react-router"

const LOGINPAGE = (props) => {
    const { Login } = useContext(Context)
    const [name, setName] = useState()
    const [password, setPassword] = useState()

    const router = useNavigate()

    return (
        <div className="
        relative
        w-full h-dvh
        bg-white text-black dark:bg-zinc-900 dark:text-white
        flex flex-col justify-center align-middle items-center
        ">
            <div className="
            p-2 rounded
            flex flex-col justify-center items-center
            bg-white shadow-xl dark:bg-zinc-700
            min-w-xl w-1/6 min-h-fit
            ">
                <div className="text-2xl">صفحه ورود</div>
                <div className="flex flex-col justify-start items-start w-full py-5 px-20 ">
                    <label htmlFor="name">
                        نام کاربری :
                    </label>
                    <input type="text" className="
                    border border-black dark:border-white rounded p-2 my-2
                    w-full
                    "
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="flex flex-col justify-start items-start w-full py-5 px-20 ">
                    <label htmlFor="name">
                        گذرواژه :
                    </label>
                    <input type="password" className="
                    border border-black dark:border-white rounded p-2 my-2
                    w-full
                    "
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="w-full px-20 pb-10">
                    <button
                        className="
                        cursor-pointer
                    w-full p-2 rounded
                    bg-blue-500
                    "

                        onClick={() => {
                            name && password &&
                                Login(name, password).then(res => {
                                    if (res)
                                        router("/")
                                })
                        }}
                    >
                        وارد
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LOGINPAGE