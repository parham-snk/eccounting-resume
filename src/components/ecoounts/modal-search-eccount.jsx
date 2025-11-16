import EccountItem from "./ecount-list-item"

const SearchEccountProvider = props => {
    const list = props.list

    let components = [] || list.map((item, index) => <EccountItem user={item} />)
    return (
        <div className="">
            {
                components.length > 0 &&
                components
            }{
                components.length==0 &&
                <h1>هیچ حسابی پیدا نشد!</h1>
            }
        </div>
    )
}

export default SearchEccountProvider