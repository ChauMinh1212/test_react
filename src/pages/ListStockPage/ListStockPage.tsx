import { Delete, Edit } from "@mui/icons-material"
import { Button, IconButton } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs"
import moment from "moment"
import { useEffect, useState } from "react"
import axiosClient from "~/api/axiosClient"
import ModalCreate from "~/components/ModalCreate/ModalCreate"
import ModalDelete from "~/components/ModalDelete/ModalDelete"
import ModalDetail from "~/components/ModalDetail/ModalDetail"
import ModalUpdate from "~/components/ModalUpdate/ModalUpdate"

const ListStockPage = () => {
    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalDetail, setOpenModalDetail] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleCloseModalDelete = () => setOpenModalDelete(false);
    const handleCloseModalCreate = () => setOpenModalCreate(false);
    const handleCloseModalDetail = () => setOpenModalDetail(false);
    const [dataModal, setDataModal] = useState<any>(null)
    const [fromTo, setFromTo] = useState([moment().subtract(2, 'year').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')])
    const [dataModalDetail, setDataModalDetail] = useState<any>(null)

    const handleEditClick = (row: any) => {
        handleOpen()
        setDataModal(row)
    }

    const columns: GridColDef[] = [
        { field: 'code', headerName: 'Mã', width: 60, align: 'center', headerAlign: 'center', cellClassName: 'cursor-pointer' },
        { field: 'closePrice', headerName: 'Giá', width: 80, type: 'number', sortable: true, align: 'center', headerAlign: 'center' },
        { field: 'price_2024', headerName: 'Giá mục tiêu 2024', type: 'number', sortable: true, flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'p_2024', headerName: 'Tiềm năng tăng giá 2024 (%)', type: 'number', sortable: true, flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'price_2025', headerName: 'Giá mục tiêu 2025', type: 'number', sortable: true, flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'p_2025', headerName: 'Tiềm năng tăng giá 2025 (%)', type: 'number', sortable: true, flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'name', headerName: 'MA_max', type: 'string', sortable: false, width: 80, align: 'center', headerAlign: 'center' },
        { field: 'ma', headerName: 'Giá trị MA_max', type: 'string', sortable: false, flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'total', headerName: 'Hiệu suất sinh lời theo MA_max (%)', type: 'number', sortable: true, flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'signal', headerName: 'Tín hiệu', type: 'string', sortable: true, width: 90, align: 'center', headerAlign: 'center', cellClassName: (params) => params.value == 'MUA' ? 'text-green-500' : (params.value == 'BÁN' ? 'text-red-500' : (params.value == 'Hold mua' ? 'text-green-300' : 'text-red-300')) },
        {
            field: 'actions',
            headerName: '',
            renderCell: (params) => (
                <div>
                    <IconButton color="primary" className="z-20 " aria-label="Edit" onClick={() => handleEditClick(params.row)}>
                        <Edit />
                    </IconButton>
                    <IconButton color="secondary" className="z-20" aria-label="Delete" onClick={() => handleDeleteClick(params.row)}>
                        <Delete />
                    </IconButton>
                </div>
            ),
            width: 100
        }
    ];

    const getData = async (from: string, to: string) => {
        setLoading(true)

        const res = await axiosClient.get(`investment/beta-watch-list?from=${from}&to=${to}`)

        setData(res.data.map((item: any, index: number) => {
            const closePrice = parseFloat((item.closePrice / 1000).toFixed(2))
            const p_2024 = item.price_2024 ? parseFloat(((item.price_2024 - closePrice) / closePrice * 100).toFixed(2)) : 0
            const p_2025 = item.price_2025 ? parseFloat(((item.price_2025 - closePrice) / closePrice * 100).toFixed(2)) : 0

            return {
                ...item,
                id: index,
                closePrice,
                signal: item.signal == 0 ? 'MUA' : item.signal == 1 ? 'BÁN' : item.signal == 2 ? 'Hold mua' : 'Hold bán',
                total: parseFloat((item.total * 100).toFixed(2)),
                price_2024: parseFloat((item.price_2024).toFixed(2)),
                price_2025: parseFloat((item.price_2025).toFixed(2)),
                p_2024,
                p_2025,
                ma: parseFloat((item.ma / 1000).toFixed(2)),
            }
        }
        ));
        setLoading(false)
    }

    useEffect(() => {
        (async () => {
            const from = fromTo[0]
            const to = fromTo[1]
            await getData(from, to);
        })();
    }, [])

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const from = moment(e.target[0].value, 'DD-MM-YYYY').format('YYYY-MM-DD');
        const to = moment(e.target[3].value, 'DD-MM-YYYY').format('YYYY-MM-DD');
        setFromTo([from, to])
        getData(from, to)
    }

    const handleDeleteClick = (row: any) => {
        setDataModal(row)
        setOpenModalDelete(true)
    }

    const handleClickCreate = () => {
        setOpenModalCreate(true)
    }

    const handleDetailClick = (row: any) => {
        if (row.field == 'code') {
            const item = data.find(item => item.code == row.row.code);
            setDataModalDetail(item)
            setOpenModalDetail(true)
        }
    }

    return (
        <>
            {/* Modal cập nhật */}
            <ModalUpdate open={open} handleClose={handleClose} dataModal={dataModal} data={data} setData={setData} />
            {/* Modal xoá */}
            <ModalDelete openModalDelete={openModalDelete} handleCloseModalDelete={handleCloseModalDelete} dataModal={dataModal} setData={setData} data={data} />
            {/* Modal thêm */}
            <ModalCreate openModalCreate={openModalCreate} handleCloseModalCreate={handleCloseModalCreate} fromTo={fromTo} setData={setData} data={data} />
            {/* Modal detail cell */}
            <ModalDetail openModalDetail={openModalDetail} handleCloseModalDetail={handleCloseModalDetail} dataModalDetail={dataModalDetail} />

            <div className="m-[30px] ">
                <div className="flex justify-between content-center">
                    <form onSubmit={handleSubmit} className="flex items-center mb-[20px]">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker disabled={loading} label="Từ" format="DD-MM-YYYY" defaultValue={dayjs().subtract(2, 'year')} className="!mr-[10px]" />
                            <DatePicker disabled={loading} label="Đến" format="DD-MM-YYYY" defaultValue={dayjs()} />
                        </LocalizationProvider>
                        <Button type="submit" className="!ml-[10px]">Tìm</Button>
                    </form>
                    <div>
                        <Button onClick={handleClickCreate}>Thêm mã</Button>
                    </div>
                </div>

                <div style={{ height: 700, width: '100%' }}>
                    <DataGrid
                        rows={data}
                        columns={columns}
                        pageSizeOptions={[5, 10]}
                        loading={loading}
                        onCellClick={handleDetailClick}
                        disableRowSelectionOnClick
                        disableColumnSelector
                    />
                </div>
            </div>
        </>

    )
}

export default ListStockPage
