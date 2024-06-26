import { Box, Modal } from "@mui/material";

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

const ModalDetail = ({ openModalDetail, handleCloseModalDetail, dataModalDetail }: any) => {
    return (
        <Modal
            open={openModalDetail}
            onClose={handleCloseModalDetail}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{ ...style, width: 500 }}>
                <div className="flex justify-between border-[3px] p-[10px] border-dashed border-yellow-300">
                    <div>
                        <p className="mb-[20px] font-bold">Mã</p>
                        <p className="mb-[20px] font-semibold">Giá</p>
                        <p className="mb-[20px] font-semibold">Giá mục tiêu 2024</p>
                        <p className="mb-[20px] font-semibold">{`Tiềm năng tăng giá 2024 (%)`}</p>
                        <p className="mb-[20px] font-semibold">Giá mục tiêu 2025</p>
                        <p className="mb-[20px] font-semibold">{`Tiềm năng tăng giá 2025 (%)`}</p>
                        <p className="mb-[20px] font-semibold">MA_max</p>
                        <p className="mb-[20px] font-semibold">Giá trị MA_max</p>
                        <p className="mb-[20px] font-semibold">{`Hiệu suất sinh lời theo MA_max (%)`}</p>
                        <p className="mb-[20px] font-semibold">Tín hiệu</p>
                    </div>
                    <div>
                        <p className="mb-[20px]">:</p>
                        <p className="mb-[20px]">:</p>
                        <p className="mb-[20px]">:</p>
                        <p className="mb-[20px]">:</p>
                        <p className="mb-[20px]">:</p>
                        <p className="mb-[20px]">:</p>
                        <p className="mb-[20px]">:</p>
                        <p className="mb-[20px]">:</p>
                        <p className="mb-[20px]">:</p>
                        <p className="mb-[20px]">:</p>
                    </div>
                    <div className="text-right">
                        <p className="mb-[20px] text-blue-600 font-semibold">{dataModalDetail?.code || ''}</p>
                        <p className="mb-[20px] text-blue-600">{dataModalDetail?.closePrice || 0}</p>
                        <p className="mb-[20px] text-blue-600">{dataModalDetail?.price_2024 || 0}</p>
                        <p className="mb-[20px] text-blue-600">{dataModalDetail?.p_2024 || 0}</p>
                        <p className="mb-[20px] text-blue-600">{dataModalDetail?.price_2025 || 0}</p>
                        <p className="mb-[20px] text-blue-600">{dataModalDetail?.p_2025 || 0}</p>
                        <p className="mb-[20px] text-blue-600">{dataModalDetail?.name || ''}</p>
                        <p className="mb-[20px] text-blue-600">{dataModalDetail?.ma || 0}</p>
                        <p className="mb-[20px] text-blue-600">{dataModalDetail?.total || 0}</p>
                        <p className={`${dataModalDetail?.signal == 'Mua' ? 'text-green-500' : dataModalDetail?.signal == 'Bán' ? 'text-red-500' : dataModalDetail?.signal == 'Hold mua' ? 'text-green-300' : 'text-red-300'}`}>{dataModalDetail?.signal || ''}</p>
                    </div>
                </div>
            </Box>
        </Modal>
    )
}

export default ModalDetail