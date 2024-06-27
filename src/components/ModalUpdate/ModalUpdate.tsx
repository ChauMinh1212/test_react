import { LoadingButton } from "@mui/lab"
import { Box, Modal, TextField } from "@mui/material"
import { useState } from "react"
import axiosClient from "~/api/axiosClient";

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

const ModalUpdate = ({ open, handleClose, dataModal, data, setData, isBetaPage }: any) => {
    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmitEdit = async (e: any) => {
        e.preventDefault()
        setLoading(true)

        const price_2024 = e.target[2]?.value || 0
        const price_2025 = e.target[4]?.value || 0
        try {
            const res = await axiosClient.post('investment/update-beta-watch-list', {
                code: e.target[0].value,
                price_2024,
                price_2025,
                ...(isBetaPage && {
                    ma: e.target[6]?.value || 0,
                    is_beta_page: 1
                })
            })
            setData((prev: any) => {
                const thisItem = prev.find((item: any) => item.code == e.target[0].value)
                const newP2024 = parseFloat(((price_2024 - thisItem.closePrice) / thisItem.closePrice * 100).toFixed(2))
                const newP2025 = parseFloat(((price_2025 - thisItem.closePrice) / thisItem.closePrice * 100).toFixed(2))

                const index = prev.findIndex((item: any) => item.code == e.target[0].value)
                const newData = [...prev]

                newData[index] = {
                    ...thisItem,
                    price_2024: parseFloat(parseFloat(price_2024).toFixed(2)),
                    price_2025: parseFloat(parseFloat(price_2025).toFixed(2)),
                    p_2024: newP2024,
                    p_2025: newP2025,
                    ...(isBetaPage && {
                        name: `MA_${e.target[6]?.value}`,
                        ma: parseFloat((res.data[0].ma / 1000).toFixed(2)),
                        total: parseFloat((res.data[0].total * 100).toFixed(2)),
                        signal: res.data[0].signal == 0 ? 'MUA' : res.data[0].signal == 1 ? 'BÁN' : res.data[0].signal == 2 ? 'Hold mua' : 'Hold bán'
                    })
                }
                return newData
            })
            // const thisItem = data.find((item: any) => item.code == e.target[0].value)
            // const newP2024 = parseFloat(((price_2024 - thisItem.closePrice) / thisItem.closePrice * 100).toFixed(2))
            // const newP2025 = parseFloat(((price_2025 - thisItem.closePrice) / thisItem.closePrice * 100).toFixed(2))

            // const index = data.findIndex((item: any) => item.code == e.target[0].value)
            // const newData = [...data]

            // newData[index] = {
            //     ...thisItem,
            //     price_2024: parseFloat(parseFloat(price_2024).toFixed(2)),
            //     price_2025: parseFloat(parseFloat(price_2025).toFixed(2)),
            //     p_2024: newP2024,
            //     p_2025: newP2025,
            //     ...(isBetaPage && {
            //         name: `MA_${e.target[6]?.value}`,
            //         ma: parseFloat((res.data[0].ma / 1000).toFixed(2)),
            //         total: parseFloat((res.data[0].total * 100).toFixed(2)),
            //         signal: res.data[0].signal == 0 ? 'MUA' : res.data[0].signal == 1 ? 'BÁN' : res.data[0].signal == 2 ? 'Hold mua' : 'Hold bán'
            //     })
            // }
            // setData(newData)
            setLoading(false)
            handleClose()
        } catch (e) {
            setLoading(false)
            handleClose()
            console.log(e);
        }
    }

    return (
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
                    {isBetaPage &&
                        <TextField defaultValue={dataModal?.name.slice(3)} label="MA" fullWidth className="!mb-[20px]" />
                    }
                    <LoadingButton variant="contained" type="submit" fullWidth loading={loading}>Chỉnh sửa</LoadingButton>
                </form>
            </Box>
        </Modal>
    )
}

export default ModalUpdate