import { LoadingButton } from "@mui/lab";
import { Box, Button, Modal } from "@mui/material"
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

const ModalDelete = ({ openModalDelete, handleCloseModalDelete, dataModal, setData }: any) => {
    const [loading, setLoading] = useState<boolean>(false)
    const handleDelete = async () => {
        try {
            setLoading(true)
            await axiosClient.post('investment/delete-beta-watch-list', { code: dataModal.code })
            setData((prev: any) => {
                const newData = [...prev].filter(item => item.code != dataModal.code)
                return newData
            })
            // const newData = [...data].filter(item => item.code != dataModal.code)
            // setData(newData)

            handleCloseModalDelete()
            setLoading(false)
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <Modal
            open={openModalDelete}
            onClose={handleCloseModalDelete}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <p className="text-center mb-[30px]">Bạn có chắc chắn muốn xoá mã {dataModal?.code || ''}?</p>
                <div className="flex justify-end">
                    <LoadingButton onClick={handleDelete} color="error" loading={loading}>Xoá</LoadingButton>
                    <Button onClick={handleCloseModalDelete}>Huỷ</Button>
                </div>
            </Box>
        </Modal>
    )
}

export default ModalDelete