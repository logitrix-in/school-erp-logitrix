import { Box, Typography, IconButton, Dialog } from "@mui/material";
import {
    Button
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import {
    DataGrid,
} from "@mui/x-data-grid";
import { useState } from "react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EditPopup from './EditPopup'

const DownloadResultPopup = ({ open, close }) => {
    const [editPopup, setEditPopup] = useState(false)

    const columns = [
        { field: "subject", headerName: "Subject", flex: 1 },
        {
            field: "marks", headerName: "Marks", flex: 1,
            renderCell: (params) => (
                <Box display={"flex"} gap={2}>
                    <Typography>{params.value}</Typography>
                    <EditOutlinedIcon fontSize="small" onClick={() => setEditPopup(true)} sx={{ cursor: "pointer" }} />
                </Box>
            )
        },
        {
            field: "grade", headerName: "Grade", flex: 1,
            renderCell: (params) => (
                <Box
                    style={{
                        backgroundColor:
                            params.value === "A+"
                                ? "#BEE3F8"
                                : params.value === "A"
                                    ? "#C6F6D5"
                                    : params.value === "B"
                                        ? "#FEEBCB"
                                        : params.value === "B+"
                                            ? "#FEEBCB"
                                            : params.value === "C"
                                                ? "#FED7D7"
                                                : "transparent",
                        borderRadius: "6px",
                        display: "inline-block",
                        width: "40px",
                        textAlign: "center",
                        paddingLeft:
                            params.value === "Active"
                                ? "11px"
                                : params.value === "Inactive"
                                    ? "7px"
                                    : "0px",
                    }}
                >
                    {params.value}
                </Box>
            ),
        },
    ];

    const rows = [
        {
            id: 1,
            subject: "English",
            marks: "75",
            grade: "A",
        },
        {
            id: 2,
            subject: "English",
            marks: "75",
            grade: "A+",
        },
        {
            id: 3,
            subject: "English",
            marks: "75",
            grade: "B",
        },
        {
            id: 4,
            subject: "English",
            marks: "75",
            grade: "C",
        },
    ]

    return (
        <Dialog
            fullWidth={false}
            PaperProps={{
                sx: {
                    maxHeight: "90%",
                    width: "70%",
                },
            }}
            maxWidth="lg"
            open={open}
            onClose={() => close()}
            disableEnforceFocus={true}
        >


            <Box overflow={"hidden"}>
                <Box
                    p={1}
                    py={1}
                    bgcolor={"primary.main"}
                    color={"white"}
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Box />
                    <Typography fontSize={"1.1rem"} textAlign={"center"}>
                        Result
                    </Typography>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={close}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box display="flex" flexDirection="column" gap={2} p={2} justifyContent="space-between" width={"95%"} margin="auto" alignItems="center">

                    <Box display={'flex'} justifyContent="space-between" sx={{ width: '100%' }}>
                        <Box display={'flex'} gap={2}>
                            <Typography textAlign={"left"} marginY={2}>Exam type :</Typography>
                            <Typography fontWeight={"medium"} textAlign={"left"} marginY={2}>Class I - Mid Term</Typography>
                        </Box>

                        <Box display={'flex'} gap={2}>
                            <Typography textAlign={"left"} marginY={2}>Academic Year :</Typography>
                            <Typography fontWeight={"medium"} textAlign={"left"} marginY={2}>2024-25</Typography>
                        </Box>
                    </Box>

                    <Box display={'flex'} justifyContent="space-between" sx={{ width: '100%' }} bgcolor={"primary.light"} px={2} py={1} borderRadius={2}>
                        <Box display={'flex'} gap={2}>
                            <Typography textAlign={"left"} marginY={2}>Student Name:</Typography>
                            <Typography fontWeight={"medium"} textAlign={"left"} marginY={2}>Priya Naskar (STD569854)</Typography>
                        </Box>

                        <Box display={'flex'} gap={2}>
                            <Typography textAlign={"left"} marginY={2}>Class :</Typography>
                            <Typography fontWeight={"medium"} textAlign={"left"} marginY={2}>V</Typography>
                        </Box>

                        <Box display={'flex'} gap={2}>
                            <Typography textAlign={"left"} marginY={2}>Section :</Typography>
                            <Typography fontWeight={"medium"} textAlign={"left"} marginY={2}>B</Typography>
                        </Box>

                        <Box display={'flex'} gap={2}>
                            <Typography textAlign={"left"} marginY={2}>Roll# :</Typography>
                            <Typography fontWeight={"medium"} textAlign={"left"} marginY={2}>25</Typography>
                        </Box>
                    </Box>

                    <Box width={"80%"} margin={"auto"}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                        />
                    </Box>

                    <Box marginY={2} width={"100%"} display="flex" gap={2}>
                        <Button variant="contained" color="primary" fullWidth onClick={() => {
                            toast.success("Updated Successfully");
                            close();
                        }}>Download Report Card</Button>
                    </Box>

                    <EditPopup open={editPopup} close={() => setEditPopup(false)} />

                </Box>
            </Box>
        </Dialog >
    )
}


export default DownloadResultPopup;