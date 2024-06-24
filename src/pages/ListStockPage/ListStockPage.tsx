import { Button } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs"
import moment from "moment"
import { useEffect, useState } from "react"
import axiosClient from "~/api/axiosClient"

const stock = [
    {
        p_2024: 23.1,
        p_2025: 51.2,
        price_2024: 28.612,
        price_2025: 35.156,
        code: "MBB"
    },
    {
        p_2024: 22,
        p_2025: 51.1,
        price_2024: 37.879,
        price_2025: 46.922,
        code: "STB"
    },
    {
        p_2024: 11.2,
        p_2025: 29.8,
        price_2024: 27.403,
        price_2025: 31.992,
        code: "TCB"
    },
    {
        p_2024: 25,
        p_2025: 47.7,
        price_2024: 40.451,
        price_2025: 47.776,
        code: "CTG"
    },
    {
        p_2024: 16.2,
        p_2025: 43.3,
        price_2024: 28.596,
        price_2025: 35.260,
        code: "ACB"
    },
    {
        p_2024: 2.1,
        p_2025: 0,
        price_2024: 29,
        price_2025: 0,
        code: "HCM"
    },
    {
        p_2024: 11.4,
        p_2025: 0,
        price_2024: 40,
        price_2025: 0,
        code: "SSI"
    },
    {
        p_2024: 2.2,
        p_2025: 0,
        price_2024: 50,
        price_2025: 0,
        code: "VCI"
    },
    {
        p_2024: -11.3,
        p_2025: 0,
        price_2024: 40,
        price_2025: 0,
        code: "BVS"
    },
    {
        p_2024: 5.8,
        p_2025: 0,
        price_2024: 48,
        price_2025: 0,
        code: "FTS"
    },
    {
        p_2024: -25.3,
        p_2025: 0,
        price_2024: 26,
        price_2025: 0,
        code: "MBS"
    },
    {
        p_2024: -1.5,
        p_2025: 0,
        price_2024: 39,
        price_2025: 0,
        code: "DCM"
    },
    {
        p_2024: 3,
        p_2025: 0,
        price_2024: 39,
        price_2025: 0,
        code: "DPM"
    },
    {
        p_2024: 16.5,
        p_2025: 0,
        price_2024: 114.209,
        price_2025: 0,
        code: "PNJ"
    },
    {
        p_2024: 5.4,
        p_2025: 0,
        price_2024: 68,
        price_2025: 0,
        code: "DGW"
    },
    {
        p_2024: -2.5,
        p_2025: 0,
        price_2024: 62,
        price_2025: 0,
        code: "MWG"
    },
    {
        p_2024: 11.6,
        p_2025: 0,
        price_2024: 25,
        price_2025: 0,
        code: "NT2"
    },
    {
        p_2024: -2,
        p_2025: 0,
        price_2024: 14.800,
        price_2025: 0,
        code: "POW"
    },
    {
        p_2024: 6.5,
        p_2025: 0,
        price_2024: 32,
        price_2025: 0,
        code: "PC1"
    },
    {
        p_2024: 8.6,
        p_2025: 0,
        price_2024: 36,
        price_2025: 0,
        code: "HDG"
    },
    {
        p_2024: 0,
        p_2025: 19.7,
        price_2024: 66,
        price_2025: 79.000,
        code: "REE"
    },
    {
        p_2024: 15.8,
        p_2025: 0,
        price_2024: 33.800,
        price_2025: 0,
        code: "HPG"
    },
    {
        p_2024: -3.3,
        p_2025: 0,
        price_2024: 25,
        price_2025: 0,
        code: "NKG"
    },
    {
        p_2024: -11.5,
        p_2025: 0,
        price_2024: 120,
        price_2025: 0,
        code: "FPT"
    },
    {
        p_2024: -25.6,
        p_2025: 0,
        price_2024: 120,
        price_2025: 0,
        code: "CTR"
    },
    {
        p_2024: -4.4,
        p_2025: 0,
        price_2024: 80,
        price_2025: 0,
        code: "GMD"
    },
    {
        p_2024: -19.9,
        p_2025: 0,
        price_2024: 76,
        price_2025: 0,
        code: "VTP"
    },
    {
        p_2024: -2.3,
        p_2025: 0,
        price_2024: 13,
        price_2025: 0,
        code: "HT1"
    },
    {
        p_2024: 23.5,
        p_2025: 0,
        price_2024: 82,
        price_2025: 0,
        code: "VNM"
    },
    {
        p_2024: 14.7,
        p_2025: 0,
        price_2024: 57,
        price_2025: 0,
        code: "QNS"
    },
    {
        p_2024: 17.2,
        p_2025: 0,
        price_2024: 88,
        price_2025: 0,
        code: "VHC"
    },
    {
        p_2024: 4.6,
        p_2025: 0,
        price_2024: 35.500,
        price_2025: 0,
        code: "ANV"
    },
    {
        p_2024: 11.1,
        p_2025: 0,
        price_2024: 28,
        price_2025: 0,
        code: "PAN"
    },
    {
        p_2024: 46.3,
        p_2025: 0,
        price_2024: 55,
        price_2025: 0,
        code: "VHM"
    },
    {
        p_2024: 2.2,
        p_2025: 0,
        price_2024: 42,
        price_2025: 0,
        code: "NLG"
    },
    {
        p_2024: 4.7,
        p_2025: 0,
        price_2024: 39,
        price_2025: 0,
        code: "KDH"
    },
    {
        p_2024: 64.6,
        p_2025: 0,
        price_2024: 33,
        price_2025: 0,
        code: "VRE"
    },
    {
        p_2024: -1.8,
        p_2025: 0,
        price_2024: 61,
        price_2025: 0,
        code: "IDC"
    },
    {
        p_2024: -2.2,
        p_2025: 0,
        price_2024: 42,
        price_2025: 0,
        code: "SZC"
    },
    {
        p_2024: -4.4,
        p_2025: 0,
        price_2024: 58,
        price_2025: 0,
        code: "PHR"
    },
    {
        p_2024: 7.7,
        p_2025: 0,
        price_2024: 46,
        price_2025: 0,
        code: "DHC"
    },
    {
        p_2024: 15.1,
        p_2025: 0,
        price_2024: 16,
        price_2025: 0,
        code: "ADS"
    },
    {
        p_2024: 4.7,
        p_2025: 0,
        price_2024: 50,
        price_2025: 0,
        code: "MSH"
    },
    {
        p_2024: 0.9,
        p_2025: 0,
        price_2024: 110,
        price_2025: 0,
        code: "BMP"
    },
    {
        p_2024: -21.3,
        p_2025: 0,
        price_2024: 50,
        price_2025: 0,
        code: "NTP"
    },
    {
        p_2024: 6.7,
        p_2025: 0,
        price_2024: 46.200,
        price_2025: 0,
        code: "PVS"
    },
    {
        p_2024: 17.7,
        p_2025: 32.9,
        price_2024: 18.600,
        price_2025: 21.000,
        code: "PVC"
    },
    {
        p_2024: 14.8,
        p_2025: 0,
        price_2024: 90,
        price_2025: 0,
        code: "GAS"
    },
    {
        p_2024: -2.5,
        p_2025: 6.6,
        price_2024: 23.800,
        price_2025: 26.000,
        code: "BSR"
    },
    {
        p_2024: 1.2,
        p_2025: 0,
        price_2024: 42,
        price_2025: 0,
        code: "PLX"
    },
    {
        p_2024: 13.6,
        p_2025: 31.1,
        price_2024: 33.800,
        price_2025: 39.000,
        code: "PVT"
    },
    {
        p_2024: -8.8,
        p_2025: 4.6,
        price_2024: 75,
        price_2025: 86.000,
        code: "VCS"
    },
    {
        p_2024: -0.1,
        p_2025: 14.5,
        price_2024: 75,
        price_2025: 86.000,
        code: "PTB"
    },
    {
        p_2024: -5.6,
        p_2025: 0,
        price_2024: 125,
        price_2025: 0,
        code: "DGC"
    },
    {
        p_2024: 17.9,
        p_2025: 0,
        price_2024: 33,
        price_2025: 0,
        code: "PLC"
    }
]



const ListStockPage = () => {
    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const columns: GridColDef[] = [
        { field: 'code', headerName: 'Mã', width: 130, flex: 0.5, align: 'center', headerAlign: 'center' },
        { field: 'closePrice', headerName: 'Giá', type: 'number', sortable: true, flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'price_2024', headerName: 'Giá mục tiêu 2024', type: 'number', sortable: true, flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'p_2024', headerName: 'Tìm năng tăng giá 2024', type: 'number', sortable: true, flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'price_2025', headerName: 'Giá mục tiêu 2024', type: 'number', sortable: true, flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'p_2025', headerName: 'Tìm năng tăng giá 2025', type: 'number', sortable: true, flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'name', headerName: 'MA_max', type: 'string', sortable: false, flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'total', headerName: 'Hiệu suất sinh lời theo MA_max', type: 'number', sortable: true, flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'signal', headerName: 'Tín hiệu', type: 'string', sortable: true, flex: 1, align: 'center', headerAlign: 'center', cellClassName: (params) => params.value == 'Mua' ? 'text-green-500' : (params.value == 'Bán' ? 'text-red-500' : '') },
    ];

    const getData = async (from: string, to: string) => {
        setLoading(true)

        const res = await axiosClient.post('investment/test-all-stock', { stock: stock.map(item => item.code), from, to })

        setData(stock.map((item, index) => {
            const da = res.data.find((detail: any) => detail.code == item.code)
            const closePrice = da.closePrice / 1000
            const p_2024 = item.price_2024 ? ((closePrice - item.price_2024) / item.price_2024 * 100).toFixed(2) : 0
            const p_2025 = item.price_2025 ? ((closePrice - item.price_2025) / item.price_2025 * 100).toFixed(2) : 0
            return {
                ...item,
                id: index,
                ...da,
                closePrice: da.closePrice / 1000,
                signal: da.signal == 0 ? 'Mua' : da.signal == 1 ? 'Bán' : '',
                total: (da.total * 100).toFixed(2),
                p_2024,
                p_2025
            }
        }
        ));
        setLoading(false)
    }

    useEffect(() => {
        (async () => {
            const to = moment().format('YYYY-MM-DD')
            const from = moment(to).subtract(2, 'year').format('YYYY-MM-DD')
            await getData(from, to);
        })();
    }, [])

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const from = moment(e.target[0].value, 'DD-MM-YYYY').format('YYYY-MM-DD');
        const to = moment(e.target[3].value, 'DD-MM-YYYY').format('YYYY-MM-DD');
        getData(from, to)
    }

    return (
        <div className="m-[30px] ">
            <form onSubmit={handleSubmit} className="flex items-center mb-[20px]">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker disabled={loading} label="Từ" format="DD-MM-YYYY" defaultValue={dayjs().subtract(2, 'year')} className="!mr-[10px]" />
                    <DatePicker disabled={loading} label="Đến" format="DD-MM-YYYY" defaultValue={dayjs()} />
                </LocalizationProvider>
                <Button type="submit" className="!ml-[10px]">Tìm</Button>
            </form>

            <div style={{ height: 700, width: '100%' }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSizeOptions={[5, 10]}
                    loading={loading}
                />
            </div>
        </div>
    )
}

export default ListStockPage