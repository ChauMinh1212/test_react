import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import { useState } from "react"
import axiosClient from "../../api/axiosClient"
import moment from 'moment'
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const HomePage = () => {
    const [data, setData] = useState<any[]>([])
    const [max, setMax] = useState<any>({})

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        console.log(e);
        
        const from = moment(e.target[2].value, 'DD-MM-YYYY').format('YYYY-MM-DD')
        const to = moment(e.target[5].value, 'DD-MM-YYYY').format('YYYY-MM-DD')
        const res = await axiosClient.get(`investment/test?stock=${e.target[0].value}&from=${from}&to=${to}`,)
        setData(res.data.data);
        setMax(res.data.max)
        
    }

    return (
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
                    <DatePicker label="Đến" format="DD-MM-YYYY"/>
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
                            <TableCell component="th" scope="row">
                                {max.name}
                            </TableCell>
                            <TableCell align="right">{(max.total * 100).toFixed(2)}</TableCell>
                            <TableCell align="right">{(max.count)}</TableCell>
                            <TableCell align="right">{(max.max * 100).toFixed(2)}</TableCell>
                            <TableCell align="right">{(max.min * 100).toFixed(2)}</TableCell>
                            <TableCell align="right">{max.count == 0 ? 0 :(max.total / max.count * 100).toFixed(2)}</TableCell>
                        </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
            }
            <p className="mt-[10px]">Kết quả:</p>
            <TableContainer component={Paper}>
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
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{(row.total * 100).toFixed(2)}</TableCell>
                                <TableCell align="right">{(row.count)}</TableCell>
                                <TableCell align="right">{(row.max * 100).toFixed(2)}</TableCell>
                                <TableCell align="right">{(row.min * 100).toFixed(2)}</TableCell>
                                <TableCell align="right">{row.count == 0 ? 0 :(row.total / row.count * 100).toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    )
}

export default HomePage