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
        { field: "student_name", headerName: "Student Name", flex: 1.5 },
        { field: "roll", headerName: "Roll #", flex: 1 },
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
            student_name: "Abantika Bera (STD565896)",
            roll: "1",
            marks: "75",
            grade: "A",
        },
        {
            id: 2,
            student_name: "Abantika Bera (STD565896)",
            roll: "2",
            marks: "75",
            grade: "A+",
        },
        {
            id: 3,
            student_name: "Abantika Bera (STD565896)",
            roll: "3",
            marks: "75",
            grade: "B",
        },
        {
            id: 4,
            student_name: "Abantika Bera (STD565896)",
            roll: "4",
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
                        View/Edit Result
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
                            <Typography fontWeight={"medium"} textAlign={"left"} marginY={2}>Class V A -Mid Term 2024 (English)</Typography>
                        </Box>
                    </Box>

                    <Box style={{ display: "flex", justifyContent: "flex-end", width: '80%' }}>
                        <Box
                            style={{
                                backgroundColor: "#E1EEFB",
                                border: "1px solid #3381A5",
                                borderRadius: "16px",
                                width: 120,
                                height: 28,
                                marginBottom: 12,
                                padding: "4px 14px",
                            }}
                        >
                            <Typography
                                style={{
                                    fontSize: "12px",
                                    fontWeight: "400",
                                    color: "#3381A5",
                                }}
                            >
                                {rows.length} Results found
                            </Typography>
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