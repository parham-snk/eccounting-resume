// let date="qweqwe 1404 qwe"
// // console.log(Date(date))

// // console.log(new Date().getDate())
// let [number]=/\d+/.exec("فاکتور فروش 742")
// console.log(number)

// let num = "  123123.12 3wqeqwe"
// console.log(parseFloat(num))


let arr = [
    {
        "invoice_id": 8592,
        "custommer_id": 21,
        "doc_id": 76,
        "create_at": "2026-03-24T05:02:19.000Z",
        "invoice_type": "bed",
        "total_price": 1200000,
        "invoice_discount": 0,
        "custom_date": "1404-12-31T20:34:16.000Z",
        "eccount_id": 21,
        "eccount_name": "پرهام سنجانکی",
        "eccount_total": 78760000,
        "eccount_last_status_total": 0,
        "join_at": "2026-03-13T16:34:23.000Z"
    },
    {
        "invoice_id": 8593,
        "custommer_id": 26,
        "doc_id": 78,
        "create_at": "2026-03-24T05:07:39.000Z",
        "invoice_type": "bes",
        "total_price": 1500000,
        "invoice_discount": 0,
        "custom_date": "1405-01-05T20:34:16.000Z",
        "eccount_id": 26,
        "eccount_name": "رضا رضایی",
        "eccount_total": -7000000,
        "eccount_last_status_total": 0,
        "join_at": "2026-03-16T16:41:14.000Z"
    },
    {
        "invoice_id": 8594,
        "custommer_id": 21,
        "doc_id": 80,
        "create_at": "2026-03-24T05:14:50.000Z",
        "invoice_type": "bed",
        "total_price": 1200000,
        "invoice_discount": 0,
        "custom_date": "1405-01-09T20:34:16.000Z",
        "eccount_id": 21,
        "eccount_name": "پرهام سنجانکی",
        "eccount_total": 78760000,
        "eccount_last_status_total": 0,
        "join_at": "2026-03-13T16:34:23.000Z"
    },
    {
        "invoice_id": 8595,
        "custommer_id": 26,
        "doc_id": 81,
        "create_at": "2026-03-25T08:39:22.000Z",
        "invoice_type": "bes",
        "total_price": 12250000,
        "invoice_discount": 0,
        "custom_date": "1405-01-09T20:34:16.000Z",
        "eccount_id": 26,
        "eccount_name": "رضا رضایی",
        "eccount_total": -7000000,
        "eccount_last_status_total": 0,
        "join_at": "2026-03-16T16:41:14.000Z"
    },
    {
        "invoice_id": 8596,
        "custommer_id": 21,
        "doc_id": 84,
        "create_at": "2026-03-25T08:49:25.000Z",
        "invoice_type": "bed",
        "total_price": 8800000,
        "invoice_discount": 0,
        "custom_date": "1405-01-14T20:34:16.000Z",
        "eccount_id": 21,
        "eccount_name": "پرهام سنجانکی",
        "eccount_total": 78760000,
        "eccount_last_status_total": 0,
        "join_at": "2026-03-13T16:34:23.000Z"
    },
    {
        "invoice_id": 8597,
        "custommer_id": 26,
        "doc_id": 86,
        "create_at": "2026-03-25T08:54:50.000Z",
        "invoice_type": "bes",
        "total_price": 8300000,
        "invoice_discount": 0,
        "custom_date": "1405-01-16T20:34:16.000Z",
        "eccount_id": 26,
        "eccount_name": "رضا رضایی",
        "eccount_total": -7000000,
        "eccount_last_status_total": 0,
        "join_at": "2026-03-16T16:41:14.000Z"
    },
    {
        "invoice_id": 8598,
        "custommer_id": 21,
        "doc_id": 89,
        "create_at": "2026-03-31T10:34:14.000Z",
        "invoice_type": "bed",
        "total_price": 14600000,
        "invoice_discount": 0,
        "custom_date": "1405-01-16T20:34:16.000Z",
        "eccount_id": 21,
        "eccount_name": "پرهام سنجانکی",
        "eccount_total": 78760000,
        "eccount_last_status_total": 0,
        "join_at": "2026-03-13T16:34:23.000Z"
    },
    {
        "invoice_id": 8599,
        "custommer_id": 26,
        "doc_id": 90,
        "create_at": "2026-03-31T10:35:39.000Z",
        "invoice_type": "bes",
        "total_price": 20000000,
        "invoice_discount": 0,
        "custom_date": "1405-01-17T20:34:16.000Z",
        "eccount_id": 26,
        "eccount_name": "رضا رضایی",
        "eccount_total": -7000000,
        "eccount_last_status_total": 0,
        "join_at": "2026-03-16T16:41:14.000Z"
    }
]

let bed = [], bes = []

function getSplitedDate(date) {
    let [y, m, d] = String(date).split("T")[0].split("-")
    return { y, m, d }
}
arr = arr.reverse()


let year = getSplitedDate(arr[0].custom_date).y
arr = arr.filter(item => getSplitedDate(item.custom_date).y == year)

for (let i = 1; i <= 12; i++) {
    let list = arr.filter(item => getSplitedDate(item.custom_date).m == i)
    let bedList = list.filter(item => item.invoice_type == "bed")
    let besList = list.filter(item => item.invoice_type == "bes")
    bed.push(bedList.length) 
    bes.push(besList.length)
}
console.log(arr.length,bed,bes)
