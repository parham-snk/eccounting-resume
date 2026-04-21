import Invoice_table_modal from "./invoices/components/invoice_modal/invoice_table_modal"

const Print_Page = props => {
    return (
        <div className="bg-white w-full h-full fixed flex flex-row justify-center align-middle items-center right-0 top-0 z-50 p-20">
            <Invoice_table_modal data={"items"} total_price={"invoice.total_price"} print={true} />
        </div>

    )
}

export default Print_Page