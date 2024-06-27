import { Delete, Edit } from "@mui/icons-material"
import { Button, IconButton } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { useEffect, useRef, useState } from "react"
import { io } from "socket.io-client"
import axiosClient from "~/api/axiosClient"
import ModalCreate from "~/components/ModalCreate/ModalCreate"
import ModalDelete from "~/components/ModalDelete/ModalDelete"
import ModalDetail from "~/components/ModalDetail/ModalDetail"
import ModalUpdate from "~/components/ModalUpdate/ModalUpdate"

const BetaPage = () => {
    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [dataLoaded, setDataLoaded] = useState(false)
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
    const [dataModalDetail, setDataModalDetail] = useState<any>(null)
    const socketRef = useRef<any>()

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

    const getData = async () => {
        setLoading(true)
        const res = await axiosClient.get(`investment/beta-watch-list`)

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
                price_2024: parseFloat(item.price_2024.toFixed(2)),
                price_2025: parseFloat(item.price_2025.toFixed(2)),
                p_2024,
                p_2025,
                ma: parseFloat((item.ma / 1000).toFixed(2)),
            }
        }
        ));
        setLoading(false)
        setDataLoaded(true)
    }

    useEffect(() => {

        (async () => {
            await getData();
        })();
    }, [])

    useEffect(() => {
        if (dataLoaded) {
            socketRef.current = io(import.meta.env.VITE_REACT_APP_SOCKET_URL);

            socketRef.current.on('connect', () => {
                console.log('Connected to socket server');
            })

            socketRef.current.on('listen-ma-co-phieu', (res: any) => {
                // const index = data.findIndex(item => item.code == res[0].code)
                // const item = data[index]

                // const closePrice = parseFloat(item.closePrice.toFixed(2))
                // const newClosePrice = parseFloat((res[0].closePrice / 1000).toFixed(2))

                // if (closePrice != newClosePrice) {
                //     console.log(item.code);
                //     console.log(closePrice);
                //     console.log(newClosePrice);
                //     console.log('-----------------------');


                //     const newItem = {
                //         ...item,
                //         closePrice: newClosePrice,
                //         ma: parseFloat((res[0].ma / 1000).toFixed(2)),
                //         signal: res[0].signal == 0 ? 'MUA' : res[0].signal == 1 ? 'BÁN' : res[0].signal == 2 ? 'Hold mua' : 'Hold bán'
                //     }
                //     const newData = [...data]
                //     newData[index] = newItem
                //     setData(newData);
                // }

                setData(prevData => {
                    const index = prevData.findIndex(item => item.code == res[0].code);
            
                    if (index === -1) {
                      console.error("Không tìm thấy mục với code:", res[0].code);
                      return prevData;
                    }
            
                    const item = prevData[index];
                    const closePrice = parseFloat(item.closePrice.toFixed(2));
                    const newClosePrice = parseFloat((res[0].closePrice / 1000).toFixed(2));
            
                    if (closePrice !== newClosePrice) {
            
                      const newItem = {
                        ...item,
                        closePrice: newClosePrice,
                        ma: parseFloat((res[0].ma / 1000).toFixed(2)),
                        signal: res[0].signal == 0 ? 'MUA' : res[0].signal == 1 ? 'BÁN' : res[0].signal == 2 ? 'Hold mua' : 'Hold bán'
                      };
            
                      const newData = [...prevData];
                      newData[index] = newItem;
            
                      return newData;
                    }
            
                    return prevData;
                  });


            });

            return () => {
                socketRef.current.disconnect();
            };
        }
    }, [dataLoaded]);

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
            {/* Modal update */}
            <ModalUpdate open={open} handleClose={handleClose} dataModal={dataModal} data={data} setData={setData} isBetaPage={true} />
            {/* Modal xoá */}
            <ModalDelete openModalDelete={openModalDelete} handleCloseModalDelete={handleCloseModalDelete} dataModal={dataModal} setData={setData} data={data} />
            {/* Modal thêm */}
            <ModalCreate openModalCreate={openModalCreate} handleCloseModalCreate={handleCloseModalCreate} setData={setData} data={data} isBetaPage={true} />
            {/* Modal detail cell */}
            <ModalDetail openModalDetail={openModalDetail} handleCloseModalDetail={handleCloseModalDetail} dataModalDetail={dataModalDetail} />

            <div className="m-[30px] ">
                <div className="flex justify-end content-center mb-[20px]">
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

export default BetaPage
