import { Chart as chartjs, LineElement, PointElement, SubTitle, CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, scales } from "chart.js"
import { useContext, useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import { Context } from "../../../../context/Context";

chartjs.register(LineElement, PointElement, SubTitle, CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, scales);
const Chart_product_prices = props => {
    const { data, id } = props
    const listPrices = useContext(Context).prices
    const [dates, setdates] = useState()
    const [prices, setPrices] = useState()
    useEffect(() => {
        if (data) {
            setdates([...data].map(item => item.createAt))
            setPrices([...data].map(item => item.price))
        }

    }, [data])

    useEffect(() => {
        if (id && listPrices) {
            let filter = [...listPrices].filter(item => item.parent_id == id)
            let dates = filter.map(item => {
                let d = String(item.createAt).split("T")[0]
                d =new Date(d).toLocaleDateString("fa-IR")
                return d
            })
            setTimeout(() => {
                setdates(dates)
                setPrices(filter.map(item => item.price))
            }, 100);
        }
    }, [listPrices])
    return (
        <div className="">
            {
                dates && dates.length <1 &&
                <h1>لیست قیمتی وجود ندارد</h1>
            }
            {
                dates && dates.length > 0 && prices &&
                <Line
                    height={"200px"}
                    data={{
                        labels: dates

                        , datasets: [{
                            data: prices,
                            pointBackgroundColor: "rgb(16, 167, 255)",
                            borderColor: "black",
                            label: "تومان",
                            borderWidth: 1.5,
                            fill: true,
                            backgroundColor: "black",
                            tension: 0.3,
                            pointHoverBorderColor: "gold",
                            pointHoverBorderWidth: 2,
                            pointHoverBackgroundColor: "gold",
                            pointBorderColor: "rgb(16, 167, 255)"
                        }]
                    }}
                />
            }

        </div>


    )
}

export default Chart_product_prices