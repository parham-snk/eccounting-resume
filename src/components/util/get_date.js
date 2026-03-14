function get_Date(date) {
    let [m,d,y] = new Date(date).toLocaleString().split(",")[0].split("/")
    return String(`${y}/${m}/${d}`)
}

export default get_Date