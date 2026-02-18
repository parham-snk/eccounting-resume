let users = [
    { name: "zahra" },
    { name: "parham" },
    { name: "asghar" },
    { name: "ali" },
]

let orderer = users.sort((a, b) => {
    console.log(a, b)
    console.log(a.name.localeCompare(b.name))
    console.log("=================")
    return a.name.localeCompare(b.name)
})

console.log(orderer)

