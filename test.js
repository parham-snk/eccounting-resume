let arr = [
    {
        "invoice_id": 652,
        "custommer_id": 3,
        "create_at": "2026-03-08T15:31:09.000Z",
        "invoice_type": "bes",
        "total_price": 30000000,
        "invoice_discount": 0,
        "custom_date": "2026-03-08T19:01:09.000Z"
    },
    {
        "invoice_id": 660,
        "custommer_id": 3,
        "create_at": "2026-03-08T15:41:42.000Z",
        "invoice_type": "bes",
        "total_price": 90000000,
        "invoice_discount": 0,
        "custom_date": "2026-03-08T19:11:42.000Z"
    },
    {
        "invoice_id": 686,
        "custommer_id": 3,
        "create_at": "2026-03-08T15:48:55.000Z",
        "invoice_type": "bes",
        "total_price": 37500000,
        "invoice_discount": 0,
        "custom_date": "2026-03-08T19:18:55.000Z"
    },
    {
        "invoice_id": 687,
        "custommer_id": 3,
        "create_at": "2026-03-08T15:49:24.000Z",
        "invoice_type": "bes",
        "total_price": 5500000,
        "invoice_discount": 0,
        "custom_date": "2026-03-08T19:19:24.000Z"
    },
    {
        "invoice_id": 692,
        "custommer_id": 3,
        "create_at": "2026-03-08T15:50:58.000Z",
        "invoice_type": "bed",
        "total_price": 2000000,
        "invoice_discount": 0,
        "custom_date": "2026-03-08T19:20:58.000Z"
    },
    {
        "invoice_id": 694,
        "custommer_id": 3,
        "create_at": "2026-03-08T15:53:42.000Z",
        "invoice_type": "bed",
        "total_price": 37500000,
        "invoice_discount": 0,
        "custom_date": "2026-03-08T19:23:42.000Z"
    },
    {
        "invoice_id": 695,
        "custommer_id": 3,
        "create_at": "2026-03-08T15:54:00.000Z",
        "invoice_type": "bes",
        "total_price": 7500000,
        "invoice_discount": 0,
        "custom_date": "2026-03-08T19:24:00.000Z"
    },
    {
        "invoice_id": 696,
        "custommer_id": 3,
        "create_at": "2026-03-08T15:56:49.000Z",
        "invoice_type": "bes",
        "total_price": 112500000,
        "invoice_discount": 0,
        "custom_date": "2026-03-08T19:26:49.000Z"
    }
]

let total = arr.map(num=>num.invoice_type=="bed"?-num.total_price:num.total_price).reduce((t,c)=>{
    return t+c
})
console.log(total)

// console.log(total)