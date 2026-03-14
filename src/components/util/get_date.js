function get_Date(date){
    return String(new Date(date).toLocaleString("fa-IR")).split(',')[0]
}

export default get_Date