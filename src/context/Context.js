import { createContext, useEffect, useMemo, useState } from "react";
import axios from 'axios'




const Context = createContext({ cats: [] })

const ContextProvider = ({ children }) => {
    const [orgcats, setorgcats] = useState([])
    const [cats, setCats] = useState([])

    const [uploadCat, setUploadCat] = useState()
    //fetch categories list
    function fetchList() {
        fetch("http://localhost:8080/cat").then(data => data.json()).then(data => {
            let arr = [...data]
            setorgcats([...data])
            function getChild(parrentId) {
                let childs = [...arr].filter(item => item.parent_id == parrentId)
                arr = arr.filter(item => item.parent_Id != parrentId)
                setCats([...arr])
                childs = childs.map(item => new Cat(item))
                return childs
            }
            function Cat(cat) {
                this.cat = cat
                this.children = getChild(cat.cat_id)
            }

            if (arr.length > 0) {
                let startArr = arr.filter(item => item.parent_id == 100)

                startArr = startArr.map(item => new Cat(item))
                console.log('got!')
                setCats(startArr)
            }
            else {
                setCats(data)
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    useEffect(fetchList, [])

    useEffect(() => {
        if (uploadCat) {
            const { cat_name, parent_id } = uploadCat
            if ((cat_name && parent_id) || (cat_name && parent_id == null)) {
                axios.post("http://localhost:8080/cat", { cat_name, parent_id })
                    .then(data => data.data)
                    .then(data => data.ok ? fetchList() : alert('failed'))
                    .catch(err => console.log(`err : ${err}`))
            }

        }
    }, [uploadCat])

    function removeCat(cat) {
        const { cat_id, childstoo } = cat
        axios.delete(`http://localhost:8080/cat/${cat_id}`).then(console.log).then(fetchList)
    }

    function changeParent({cat_id,parent_id}){
    axios.post("http://localhost:8080/cat/update",{cat_id,parent_id}).then(fetchList)
    }
    return (
        <Context.Provider value={{ cats, orgcats,changeParent, setUploadCat, removeCat }}>
            {children}
        </Context.Provider>
    )
}


export { ContextProvider, Context }