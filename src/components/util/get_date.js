function get_Date(date) {
    let d= String(date).split("T")[0].split("-").join("/")

    return d
}

export default get_Date