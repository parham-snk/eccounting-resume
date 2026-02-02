const splitNumber = number => {
    let num = String(number), reg;
    if (num.includes("."))
        reg = /\d(?=(\d{3})+\.)/g
    else
        reg = /\d(?=(\d{3})+$)/g

    return num.replace(reg, "$&,")
}

export default splitNumber