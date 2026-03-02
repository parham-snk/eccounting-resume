let date = '1404/12/10'
let D = Date(date)
let d = new Date(date)
// console.log(d.toLocaleDateString("en"))
console.log(new Date(D).getTime())

let obj = {
    "1": {
        "r": 1,
        "product_id": 46,
        "qty": 2,
        "price": 1500000,
        "off": 0,
        "totalPrice": 3000000
    },
    "2": {
        "r": 2,
        "product_id": 46,
        "qty": 2,
        "price": 1500000,
        "off": 0,
        "totalPrice": 3000000
    }
}


// console.log(Object.values(obj))