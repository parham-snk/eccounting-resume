const ElementI = ({ item, ClickEvent }) => {
    function doSom() {
        ClickEvent(item)
    }
    return (
        <p
            id="cat_parent"
            onClick={doSom}
            className={`hover:bg-gray-300 px-2 cursor-pointer  py-2 border-b border-b-gray-400 ${/^[a-zA-Z]/.test(item.cat_name) ? "text-end" : "text-start"}`}
        >{item.cat_name}</p>
    )
}

export default ElementI