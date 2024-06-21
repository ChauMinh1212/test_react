import { Box, Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import { useState } from "react"
import axiosClient from "../../api/axiosClient"
import moment from 'moment'
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DataGrid, GridColDef } from '@mui/x-data-grid';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: '500px',
    overflow: 'scroll',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const HomePage = () => {
    const [data, setData] = useState<any[]>([])
    const [max, setMax] = useState<any>({})
    const [detail, setDetail] = useState<any[]>([])

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        const from = moment(e.target[2].value, 'DD-MM-YYYY').format('YYYY-MM-DD')
        const to = moment(e.target[5].value, 'DD-MM-YYYY').format('YYYY-MM-DD')
        const res = await axiosClient.get(`investment/test?stock=${e.target[0].value}&from=${from}&to=${to}`,)
        setData(res.data.data);
        setMax(res.data.max)
    }

    const handleOnClickDetail = (data: any) => {
        handleOpen()
        setDetail(data)
    }

    const handleCellClick = (e: any) => {
        handleOnClickDetail(e.row.detail)
        
    }

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'MA', width: 130, flex: 0.5},
        { field: 'total', headerName: 'Tổng hiệu suất sinh lời', type: 'number', sortable: true, flex: 1, },
        { field: 'count', headerName: 'Tổng số lượng lệnh', type: 'number', sortable: true, flex: 1, },
        { field: 'max', headerName: 'Hiệu suất sinh lời max', type: 'number', sortable: true, flex: 1, },
        { field: 'min', headerName: 'Hiệu suất sinh lời min', type: 'number', sortable: true, flex: 1, },
        { field: 'avg', headerName: 'Hiệu suất sinh lời trung bình', type: 'number', sortable: true, flex: 1 },
    ];

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TableContainer component={Paper} className="my-[10px]">
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>STT</TableCell>
                                    <TableCell>Ngày mua</TableCell>
                                    <TableCell>Giá mua</TableCell>
                                    <TableCell>Ngày bán</TableCell>
                                    <TableCell>Giá bán</TableCell>
                                    <TableCell>Hiệu suất sinh lời</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {detail.map((item, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="right">{index + 1}</TableCell>
                                        <TableCell component="th" scope="row">
                                            {item.date_buy}
                                        </TableCell>
                                        <TableCell align="right">{(item.price_buy / 1000).toFixed(2)}</TableCell>
                                        <TableCell align="right">{item.date_sell}</TableCell>
                                        <TableCell align="right">{(item.price_sell / 1000).toFixed(2)}</TableCell>
                                        <TableCell align="right">{item.profit.toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Modal>
            <div className="mt-[20px] mx-[30px]">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <TextField id="outlined-basic" label="Mã" variant="outlined" />
                    {/* <TextField
                    id="outlined-number"
                    label="Số năm"
                    type="number"
                /> */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Từ" format="DD-MM-YYYY" />
                        <DatePicker label="Đến" format="DD-MM-YYYY" />
                    </LocalizationProvider>
                    <Button type="submit">Tìm</Button>
                </form>
                <p className="mt-[20px]">Max: </p>
                {max?.name &&
                    <TableContainer component={Paper} className="my-[10px]">
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>MA</TableCell>
                                    <TableCell>Tổng hiệu suất sinh lời</TableCell>
                                    <TableCell>Tổng số lượng lệnh</TableCell>
                                    <TableCell>Hiệu suất sinh lời max</TableCell>
                                    <TableCell>Hiệu suất sinh lời min</TableCell>
                                    <TableCell>Hiệu suất sinh lời trung bình</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow
                                    key={1}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" onClick={() => handleOnClickDetail(max.detail)} className="cursor-pointer">
                                        {max.name}
                                    </TableCell>
                                    <TableCell align="right">{(max.total * 100).toFixed(2)}</TableCell>
                                    <TableCell align="right">{(max.count)}</TableCell>
                                    <TableCell align="right">{(max.max * 100).toFixed(2)}</TableCell>
                                    <TableCell align="right">{(max.min * 100).toFixed(2)}</TableCell>
                                    <TableCell align="right">{max.count == 0 ? 0 : (max.total / max.count * 100).toFixed(2)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
                <p className="mt-[10px]">Kết quả:</p>
                {/* <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>MA</TableCell>
                                <TableCell>Tổng hiệu suất sinh lời</TableCell>
                                <TableCell>Tổng số lượng lệnh</TableCell>
                                <TableCell>Hiệu suất sinh lời max</TableCell>
                                <TableCell>Hiệu suất sinh lời min</TableCell>
                                <TableCell>Hiệu suất sinh lời trung bình</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.length != 0 && data.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" onClick={() => handleOnClickDetail(row.detail)} className="cursor-pointer">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{(row.total * 100).toFixed(2)}</TableCell>
                                    <TableCell align="right">{(row.count)}</TableCell>
                                    <TableCell align="right">{(row.max * 100).toFixed(2)}</TableCell>
                                    <TableCell align="right">{(row.min * 100).toFixed(2)}</TableCell>
                                    <TableCell align="right">{row.count == 0 ? 0 : (row.total / row.count * 100).toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer> */}
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={data.map((item, index) => ({
                            ...item,
                            id: index,
                            total: (item.total * 100).toFixed(2),
                            min: (item.min * 100).toFixed(2),
                            max: (item.max * 100).toFixed(2),
                            avg: item.count == 0 ? 0 :(item.total / item.count * 100).toFixed(2)
                        }))}
                        columns={columns}
                        pageSizeOptions={[5, 10]}
                        onCellClick={handleCellClick}
                    />
                </div>
            </div>
        </>

    )
}

export default HomePage