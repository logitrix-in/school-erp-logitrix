import React, { useState } from "react";
import RevealCard from "../../../AnimationComponents/RevealCard";
import Bbox from "../../../UiComponents/Bbox";
import {
    Box,
    Divider,
    Typography,
    FormControl,
    Button,
    Autocomplete,
    TextField,
    Radio,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { ToastContainer } from "react-toastify";
import Confirm from './Confirm'
import Extend from './Extend'
import Reject from './Reject'
import EditLetter from './EditLetter'

function Review() {
    const [confirmPopup, setConfirmPopup] = useState(false);
    const [rejectPopup, setRejectPopup] = useState(false);
    const [extendPopup, setExtendPopup] = useState(false);
    const [editLetterPopup, setEditLetterPopup] = React.useState(false);

    const [selectedRow, setSelectedRow] = useState(null);

    // table 2 columns
    const columns = [
        {
            field: "radioButtons",
            headerName: "",
            renderCell: (params) => (
                <Radio
                    checked={params.row.id === selectedRow}
                    color="primary"
                    sx={{
                        transform: "scale(0.6)",
                    }}
                    inputProps={{ "aria-label": params.row.id }}
                    onChange={() => {
                        setSelectedRow(params.row.id);
                    }}
                />
            ),
        },
        { field: "id", headerName: "Student ID", flex: 1 },
        { field: "name", headerName: "Name", flex: 1 },
        { field: "class", headerName: "Class", flex: 1 },
        { field: "section", headerName: "Section", flex: 1 },
        { field: "roll", headerName: "Roll #", flex: 1 },
        {
            field: "status",
            headerName: "Status",
            flex: 1,
            renderCell: (params) => (
                <Box
                    style={{
                        backgroundColor:
                            params.value === "Promoted"
                                ? "#C6F6D5"
                                : params.value === "Not Promoted"
                                    ? "#FFCCCC"
                                    : "transparent",
                        borderRadius: "6px",
                        display: "inline-block",
                        width:
                            params.value === "Promoted" || params.value === "Not Promoted"
                                ? "100px"
                                : "auto",
                        paddingLeft:
                            params.value === "Promoted"
                                ? "19px"
                                : params.value === "Not Promoted"
                                    ? "7px"
                                    : "0px",
                    }}
                >
                    {params.value}
                </Box>
            ),
        },
    ];

    // table 2 rows
    const rows = [
        {
            id: "AG240001",
            name: "Saunav Ray",
            class: "VI",
            section: "A",
            roll: "19",
            status: "Promoted",
        },
        {
            id: "AG240002",
            name: "Saunav Ray",
            class: "VI",
            section: "A",
            roll: "19",
            status: "Not Promoted",
        },
        {
            id: "AG240003",
            name: "Saunav Ray",
            class: "VI",
            section: "A",
            roll: "19",
            status: "Not Promoted",
        },
    ];

    return (
        <RevealCard>
            <Bbox borderRadius={2} overflow={"hidden"} sx={{ mt: 2 }}>
                <Box
                    bgcolor={"white"}
                    py={1.3}
                    px={3}
                    borderRadius={2}
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Typography fontWeight={"700"} borderRadius={1} fontSize={"1.1rem"}>
                        Review
                    </Typography>
                </Box>

                <Divider />

                <Box
                    display={"flex"}
                    flexDirection="row"
                    alignItems="center"
                    p={2}
                    mt={4}
                    height={50}
                >

                    <FormControl fullWidth style={{ width: "21%", marginRight: "30px" }}>
                        <Autocomplete
                            options={['Pending', 'Approved', 'Rejected', 'All']}
                            multiple
                            filterSelectedOptions
                            freeSolo={false}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Probation Status"
                                    placeholder="Probation Status"
                                />
                            )}
                            sx={{ width: "70%" }}
                        />
                    </FormControl>
                </Box>

                <Box display="flex" justifyContent="flex-end" mt={2} mx={2}>
                    <Button variant="outlined" sx={{ borderRadius: 16 }}>
                        80 results found
                    </Button>
                </Box>

                {/* table */}
                <Box mt={2} mb={5} style={{ height: "100%" }} mx={2}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                    />
                </Box>

                <ToastContainer />

                <Confirm open={confirmPopup} close={() => setConfirmPopup(false)} openEditLetter={() => setEditLetterPopup(true)} />
                <Extend open={extendPopup} close={() => setExtendPopup(false)} />
                <Reject open={rejectPopup} close={() => setRejectPopup(false)} />
                <EditLetter open={editLetterPopup} close={() => setEditLetterPopup(false)} />

                <Box display="flex" justifyContent="flex-end" mt={2} mb={5} mr={2}>
                    <Button
                        color="primary"
                        variant="contained"
                        sx={{ mr: 2 }}
                        onClick={() => setConfirmPopup(true)}
                    >
                        Confirm
                    </Button>

                    <Button
                        variant="outlined"
                        color="primary"
                        sx={{ mr: 2 }}
                        onClick={() => setExtendPopup(true)}
                    >
                        Extend
                    </Button>

                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => setRejectPopup(true)}
                    >
                        Reject
                    </Button>
                </Box>
            </Bbox>
        </RevealCard >
    )
}

export default Review;