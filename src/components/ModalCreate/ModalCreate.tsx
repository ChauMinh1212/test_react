import { LoadingButton } from "@mui/lab";
import { Box, Modal, TextField } from "@mui/material"
import { useState } from "react";
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

const ModalCreate = ({ openModalCreate, handleCloseModalCreate, setData, data, isBetaPage, fromTo }: any) => {
    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmitCreate = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        const code = e.target[0].value
        const price_2024 = e.target[2].value
        const price_2025 = e.target[4].value
        try {
            const res = await axiosClient.post('investment/create-beta-watch-list', {
                code,
                price_2024,
                price_2025,
                ...(!isBetaPage && {
                    from: fromTo[0],
                    to: fromTo[1]
                }),
                ...(isBetaPage && {
                    ma: e.target[6]?.value || 0,
                    is_beta_page: 1
                })
            })

            const resFormat = !isBetaPage ? res.data.max : res.data[0]

            const closePrice = parseFloat((resFormat.closePrice / 1000).toFixed(2))
            const newP2024 = parseFloat(((price_2024 - closePrice) / closePrice * 100).toFixed(2))
            const newP2025 = parseFloat(((price_2025 - closePrice) / closePrice * 100).toFixed(2))

            const newData = [...data, {
                code, price_2024, price_2025,
                closePrice,
                p_2024: newP2024,
                p_2025: newP2025,
                ma: parseFloat((resFormat.ma / 1000).toFixed(2)),
                total: parseFloat((resFormat.total * 100).toFixed(2)),
                id: Math.random(),
                name: resFormat.name,
                signal: resFormat.signal == 0 ? 'MUA' : resFormat.signal == 1 ? 'BÁN' : resFormat.signal == 2 ? 'Hold mua' : 'Hold bán',
            }]
            setData(newData)
            handleCloseModalCreate()
            setLoading(false)
        } catch (error) {
            handleCloseModalCreate()
            setLoading(false)
            console.log(error);
        }

    }
    return (
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
                    {isBetaPage &&
                        <TextField label="MA" fullWidth className="!mb-[20px]" />
                    }
                    <LoadingButton variant="contained" type="submit" fullWidth loading={loading}>Thêm mã</LoadingButton>
                </form>
            </Box>
        </Modal>
    )
}

export default ModalCreate