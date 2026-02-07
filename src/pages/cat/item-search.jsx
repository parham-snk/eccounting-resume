const ItemSearch = ({ item,setcatres,setCatParent,setCatParentid }) => {
    return (
        <div
            className={`px-2 hover:bg-gray-400  hover:text-white cursor-pointer py-2 border-b border-b-gray-400 ${/^[a-zA-Z]/.test(item.cat_name) ? "text-end" : "text-start"}`}
            onClick={function () {
                setCatParent(item.cat_name)
                setCatParentid(item.cat_id)
                setcatres("")
            }}>
            {item.cat_name}
        </div>
    )
}

export default ItemSearch