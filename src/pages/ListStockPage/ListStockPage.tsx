import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import axiosClient from "~/api/axiosClient"

const stock = [
    {
        p_2024: 23.1,
        p_2025: 51.2,
        code: "MBB"
    },
    {
        p_2024: 22,
        p_2025: 51.1,
        code: "STB"
    },
    {
        p_2024: 11.2,
        p_2025: 29.8,
        code: "TCB"
    },
    {
        p_2024: 25,
        p_2025: 47.7,
        code: "CTG"
    },
    {
        p_2024: 16.2,
        p_2025: 43.3,
        code: "ACB"
    },
    {
        p_2024: 2.1,
        p_2025: 0,
        code: "HCM"
    },
    {
        p_2024: 11.4,
        p_2025: 0,
        code: "SSI"
    },
    {
        p_2024: 2.2,
        p_2025: 0,
        code: "VCI"
    },
    {
        p_2024: -11.3,
        p_2025: 0,
        code: "BVS"
    },
    {
        p_2024: 5.8,
        p_2025: 0,
        code: "FTS"
    },
    {
        p_2024: -25.3,
        p_2025: 0,
        code: "MBS"
    },
    {
        p_2024: -1.5,
        p_2025: 0,
        code: "DCM"
    },
    {
        p_2024: 3,
        p_2025: 0,
        code: "DPM"
    },
    {
        p_2024: 16.5,
        p_2025: 0,
        code: "PNJ"
    },
    {
        p_2024: 5.4,
        p_2025: 0,
        code: "DGW"
    },
    {
        p_2024: -2.5,
        p_2025: 0,
        code: "MWG"
    },
    {
        p_2024: 11.6,
        p_2025: 0,
        code: "NT2"
    },
    {
        p_2024: -2,
        p_2025: 0,
        code: "POW"
    },
    {
        p_2024: 6.5,
        p_2025: 0,
        code: "PC1"
    },
    {
        p_2024: 8.6,
        p_2025: 0,
        code: "HDG"
    },
    {
        p_2024: 0,
        p_2025: 19.7,
        code: "REE"
    },
    {
        p_2024: 15.8,
        p_2025: 0,
        code: "HPG"
    },
    {
        p_2024: -3.3,
        p_2025: 0,
        code: "NKG"
    },
    {
        p_2024: -11.5,
        p_2025: 0,
        code: "FPT"
    },
    {
        p_2024: -25.6,
        p_2025: 0,
        code: "CTR"
    },
    {
        p_2024: -4.4,
        p_2025: 0,
        code: "GMD"
    },
    {
        p_2024: -19.9,
        p_2025: 0,
        code: "VTP"
    },
    {
        p_2024: -2.3,
        p_2025: 0,
        code: "HT1"
    },
    {
        p_2024: 23.5,
        p_2025: 0,
        code: "VNM"
    },
    {
        p_2024: 14.7,
        p_2025: 0,
        code: "QNS"
    },
    {
        p_2024: 17.2,
        p_2025: 0,
        code: "VHC"
    },
    {
        p_2024: 4.6,
        p_2025: 0,
        code: "ANV"
    },
    {
        p_2024: 11.1,
        p_2025: 0,
        code: "PAN"
    },
    {
        p_2024: 46.3,
        p_2025: 0,
        code: "VHM"
    },
    {
        p_2024: 2.2,
        p_2025: 0,
        code: "NLG"
    },
    {
        p_2024: 4.7,
        p_2025: 0,
        code: "KDH"
    },
    {
        p_2024: 64.6,
        p_2025: 0,
        code: "VRE"
    },
    {
        p_2024: -1.8,
        p_2025: 0,
        code: "IDC"
    },
    {
        p_2024: -2.2,
        p_2025: 0,
        code: "SZC"
    },
    {
        p_2024: -4.4,
        p_2025: 0,
        code: "PHR"
    },
    {
        p_2024: 7.7,
        p_2025: 0,
        code: "DHC"
    },
    {
        p_2024: 15.1,
        p_2025: 0,
        code: "ADS"
    },
    {
        p_2024: 4.7,
        p_2025: 0,
        code: "MSH"
    },
    {
        p_2024: 0.9,
        p_2025: 0,
        code: "BMP"
    },
    {
        p_2024: -21.3,
        p_2025: 0,
        code: "NTP"
    },
    {
        p_2024: 6.7,
        p_2025: 0,
        code: "PVS"
    },
    {
        p_2024: 17.7,
        p_2025: 32.9,
        code: "PVC"
    },
    {
        p_2024: 14.8,
        p_2025: 0,
        code: "GAS"
    },
    {
        p_2024: -2.5,
        p_2025: 6.6,
        code: "BSR"
    },
    {
        p_2024: 1.2,
        p_2025: 0,
        code: "PLX"
    },
    {
        p_2024: 13.6,
        p_2025: 31.1,
        code: "PVT"
    },
    {
        p_2024: -8.8,
        p_2025: 4.6,
        code: "VCS"
    },
    {
        p_2024: -0.1,
        p_2025: 14.5,
        code: "PTB"
    },
    {
        p_2024: -5.6,
        p_2025: 0,
        code: "DGC"
    },
    {
        p_2024: 17.9,
        p_2025: 0,
        code: "PLC"
    }
]



const ListStockPage = () => {
    const [data, setData] = useState<any[]>([])

    const columns: GridColDef[] = [
        { field: 'code', headerName: 'Mã', width: 130, flex: 0.5 },
        { field: 'name', headerName: 'MA_max', type: 'string', sortable: false, flex: 1, },
        { field: 'p_2024', headerName: 'Tổng số lượng lệnh', type: 'number', sortable: true, flex: 1, },
        { field: 'max', headerName: 'Hiệu suất sinh lời max', type: 'number', sortable: true, flex: 1, },
        { field: 'min', headerName: 'Hiệu suất sinh lời min', type: 'number', sortable: true, flex: 1, },
        { field: 'avg', headerName: 'Hiệu suất sinh lời trung bình', type: 'number', sortable: true, flex: 1 },
    ];

    const getData = async () => {
        const res = await axiosClient.post('investment/test-all-stock', { stock: stock.map(item => item.code), from: '2023-06-21', to: '2024-06-21' })
        setData(stock.map((item, index) => ({
            ...item,
            id: index,
            name: res.data.data[index].name,
        })));

    }

    useEffect(() => {
        (async () => {
            try {
                // await async "fetchBooks()" function
                await getData();

            } catch (err) {
                console.log('Error occured when fetching books');
            }
        })();
    }, [])
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={data.map((item, index) => ({
                    ...item,
                    id: index,
                    total: (item.total * 100).toFixed(2),
                    min: (item.min * 100).toFixed(2),
                    max: (item.max * 100).toFixed(2),
                    avg: item.count == 0 ? 0 : (item.total / item.count * 100).toFixed(2)
                }))}
                columns={columns}
                pageSizeOptions={[5, 10]}
            // onCellClick={handleCellClick}
            />
        </div>
    )
}

export default ListStockPage