import Tr from "./tr"

const Table = ({ data }) => {

    const rows = data.map((row, index) => <Tr data={row} />)
    return (
        <table className="w-full h-full max-h-full  text-center overflow-y-scroll scale-99 md:scale-100 text-xs ">
            <tr className="py-2 sticky -top-1 md:top-0 bg-white shadow">
                <th className="py-2 w-1/10">شماره سند</th>
                <th className="py-2 w-1/10">تاریخ</th>
                <th className="py-2">توضیحات</th>
                <th className="py-2">مبلغ</th>
                <th className="py-2">بد / بس</th>
                <th className="py-2">اپراتور</th>
            </tr>
            {rows}
        </table>
    )
}

export default Table