import { Delete, Edit } from "@mui/icons-material"
import { Box, Button, IconButton, Modal, TextField } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs"
import moment from "moment"
import { useEffect, useState } from "react"
import axiosClient from "~/api/axiosClient"

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

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
    const [fromTo, setFromTo] = useState([moment().format('YYYY-MM-DD'), moment().subtract(2, 'year').format('YYYY-MM-DD')])
    const [dataModalDetail, setDataModalDetail] = useState<any>(null)

    const handleEditClick = (row: any) => {
        handleOpen()
        setDataModal(row)
    }



    const columns: GridColDef[] = [
        { field: 'code', headerName: 'Mã', width: 60, align: 'center', headerAlign: 'center', cellClassName: (params) => 'cursor-pointer'},
        { field: 'closePrice', headerName: 'Giá', width: 80, type: 'number', sortable: true, align: 'center', headerAlign: 'center' },
        { field: 'price_2024', headerName: 'Giá mục tiêu 2024', type: 'number', sortable: true, flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'p_2024', headerName: 'Tiềm năng tăng giá 2024 (%)', type: 'number', sortable: true, flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'price_2025', headerName: 'Giá mục tiêu 2025', type: 'number', sortable: true, flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'p_2025', headerName: 'Tiềm năng tăng giá 2025 (%)', type: 'number', sortable: true, flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'name', headerName: 'MA_max', type: 'string', sortable: false, width: 80, align: 'center', headerAlign: 'center' },
        { field: 'ma', headerName: 'Giá trị MA_max', type: 'string', sortable: false, flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'total', headerName: 'Hiệu suất sinh lời theo MA_max (%)', type: 'number', sortable: true, flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'signal', headerName: 'Tín hiệu', type: 'string', sortable: true, width: 90, align: 'center', headerAlign: 'center', cellClassName: (params) => params.value == 'Mua' ? 'text-green-500' : (params.value == 'Bán' ? 'text-red-500' : (params.value == 'Hold mua' ? 'text-green-300' : 'text-red-300')) },
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
            const closePrice = item.closePrice / 1000
            const p_2024 = item.price_2024 ? ((item.price_2024 - closePrice) / closePrice * 100).toFixed(2) : 0
            const p_2025 = item.price_2025 ? ((item.price_2025 - closePrice) / closePrice * 100).toFixed(2) : 0

            return {
                ...item,
                id: index,
                closePrice,
                signal: item.signal == 0 ? 'Mua' : item.signal == 1 ? 'Bán' : item.signal == 2 ? 'Hold mua' : 'Hold bán',
                total: (item.total * 100).toFixed(2),
                p_2024,
                p_2025,
                ma: (item.ma / 1000).toFixed(2),
            }
        }
        ));
        setLoading(false)
    }

    useEffect(() => {
        (async () => {
            const to = fromTo[0]
            const from = fromTo[1]
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

    const handleSubmitEdit = async (e: any) => {
        e.preventDefault()
        const price_2024 = e.target[2]?.value || 0
        const price_2025 = e.target[4]?.value || 0
        try {
            await axiosClient.post('investment/update-beta-watch-list', { code: e.target[0].value, price_2024, price_2025 })
            const thisItem = data.find(item => item.code == e.target[0].value)
            const newP2024 = ((price_2024 - thisItem.closePrice) / thisItem.closePrice * 100).toFixed(2)
            const newP2025 = ((price_2025 - thisItem.closePrice) / thisItem.closePrice * 100).toFixed(2)

            const index = data.findIndex(item => item.code == e.target[0].value)
            const newData = [...data]

            newData[index] = {
                ...thisItem,
                price_2024,
                price_2025,
                p_2024: newP2024,
                p_2025: newP2025
            }

            setData(newData)
            handleClose()
        } catch (e) {
            console.log(e);
        }

    }

    const handleDeleteClick = (row: any) => {
        setDataModal(row)
        setOpenModalDelete(true)
    }

    const handleDelete = async () => {
        try {
            await axiosClient.post('investment/delete-beta-watch-list', { code: dataModal.code })
            const newData = [...data].filter(item => item.code != dataModal.code)
            setData(newData)

            handleCloseModalDelete()
        } catch (e) {
            console.log(e);
        }
    }

    const handleClickCreate = () => {
        setOpenModalCreate(true)
    }

    const handleDetailClick = (row: any) => {
        if(row.field == 'code'){
            const item = data.find(item => item.code == row.row.code);
            setDataModalDetail(item)
            setOpenModalDetail(true)
        }
    }

    const handleSubmitCreate = async (e: any) => {
        e.preventDefault()
        const code = e.target[0].value
        const price_2024 = e.target[2].value
        const price_2025 = e.target[4].value
        try {
            const res = await axiosClient.post('investment/create-beta-watch-list', { code, price_2024, price_2025, from: fromTo[0], to: fromTo[1] })

            const closePrice = res.data.max.closePrice / 1000
            const newP2024 = ((price_2024 - closePrice) / closePrice * 100).toFixed(2)
            const newP2025 = ((price_2025 - closePrice) / closePrice * 100).toFixed(2)

            const newData = [...data, {
                code, price_2024, price_2025,
                closePrice,
                p_2024: newP2024,
                p_2025: newP2025,
                ma: res.data.max.ma,
                total: res.data.max.total,
                id: Math.random()
            }]
            setData(newData)
            handleCloseModalCreate()
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            {/* Modal update */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={handleSubmitEdit}>
                        <TextField defaultValue={dataModal?.code} disabled label="Mã" fullWidth className="!mb-[20px]" />
                        <TextField defaultValue={dataModal?.price_2024} label="Giá mục tiêu 2024" fullWidth className="!mb-[20px]" />
                        <TextField defaultValue={dataModal?.price_2025} label="Giá mục tiêu 2025" fullWidth className="!mb-[20px]" />
                        <Button variant="contained" type="submit" fullWidth>Chỉnh sửa</Button>
                    </form>
                </Box>
            </Modal>
            {/* Modal xoá */}
            <Modal
                open={openModalDelete}
                onClose={handleCloseModalDelete}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <p className="text-center mb-[30px]">Bạn có chắc chắn muốn xoá mã {dataModal?.code || ''}?</p>
                    <div className="flex justify-end">
                        <Button onClick={handleDelete} color="error">Xoá</Button>
                        <Button onClick={handleCloseModalDelete}>Huỷ</Button>
                    </div>
                </Box>
            </Modal>
            {/* Modal thêm */}
            <Modal
                open={openModalCreate}
                onClose={handleCloseModalCreate}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={handleSubmitCreate}>
                        <TextField label="Mã" fullWidth className="!mb-[20px]" />
                        <TextField label="Giá mục tiêu 2024" fullWidth className="!mb-[20px]" />
                        <TextField label="Giá mục tiêu 2025" fullWidth className="!mb-[20px]" />
                        <Button variant="contained" type="submit" fullWidth>Thêm mã</Button>
                    </form>
                </Box>
            </Modal>
            {/* Modal detail cell */}
            <Modal
                open={openModalDetail}
                onClose={handleCloseModalDetail}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{...style, width: 500}}>
                    <div className="flex justify-between">
                        <div>
                            <p className="mb-[20px]">Mã</p>
                            <p className="mb-[20px]">Giá</p>
                            <p className="mb-[20px]">Giá mục tiêu 2024</p>
                            <p className="mb-[20px]">{`Tiềm năng tăng giá 2024 (%)`}</p>
                            <p className="mb-[20px]">Giá mục tiêu 2025</p>
                            <p className="mb-[20px]">{`Tiềm năng tăng giá 2025 (%)`}</p>
                            <p className="mb-[20px]">MA_max</p>
                            <p className="mb-[20px]">Giá trị MA_max</p>
                            <p className="mb-[20px]">{`Hiệu suất sinh lời theo MA_max (%)`}</p>
                            <p className="mb-[20px]">Tín hiệu</p>
                        </div>
                        <div>
                            <p className="mb-[20px] text-blue-600">: {dataModalDetail?.code || ''}</p>
                            <p className="mb-[20px] text-blue-600">: {dataModalDetail?.closePrice || 0}</p>
                            <p className="mb-[20px] text-blue-600">: {dataModalDetail?.price_2024 || 0}</p>
                            <p className="mb-[20px] text-blue-600">: {dataModalDetail?.p_2024 || 0}</p>
                            <p className="mb-[20px] text-blue-600">: {dataModalDetail?.price_2025 || 0}</p>
                            <p className="mb-[20px] text-blue-600">: {dataModalDetail?.p_2025 || 0}</p>
                            <p className="mb-[20px] text-blue-600">: {dataModalDetail?.name || ''}</p>
                            <p className="mb-[20px] text-blue-600">: {dataModalDetail?.ma || 0}</p>
                            <p className="mb-[20px] text-blue-600">: {dataModalDetail?.total || 0}</p>
                            <p className={`${dataModalDetail?.signal == 'Mua' ? 'text-green-500': dataModalDetail?.signal == 'Bán' ? 'text-red-500' : dataModalDetail?.signal == 'Hold mua' ? 'text-green-300': 'text-red-300'}`}>: {dataModalDetail?.signal || ''}</p>
                            </div>
                    </div>
                </Box>
            </Modal>
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
