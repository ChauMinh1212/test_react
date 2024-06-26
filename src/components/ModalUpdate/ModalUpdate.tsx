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

const ModalUpdate = ({ open, handleClose, dataModal, data, setData }: any) => {
    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmitEdit = async (e: any) => {
        e.preventDefault()
        setLoading(true)

        const price_2024 = e.target[2]?.value || 0
        const price_2025 = e.target[4]?.value || 0
        try {
            await axiosClient.post('investment/update-beta-watch-list', { code: e.target[0].value, price_2024, price_2025 })
            const thisItem = data.find((item: any) => item.code == e.target[0].value)
            const newP2024 = ((price_2024 - thisItem.closePrice) / thisItem.closePrice * 100).toFixed(2)
            const newP2025 = ((price_2025 - thisItem.closePrice) / thisItem.closePrice * 100).toFixed(2)

            const index = data.findIndex((item: any) => item.code == e.target[0].value)
            const newData = [...data]

            newData[index] = {
                ...thisItem,
                price_2024,
                price_2025,
                p_2024: newP2024,
                p_2025: newP2025
            }

            setData(newData)
            setLoading(false)
            handleClose()
        } catch (e) {
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
                    <LoadingButton variant="contained" type="submit" fullWidth loading={loading}>Chỉnh sửa</LoadingButton>
                </form>
            </Box>
        </Modal>
    )
}

export default ModalUpdate