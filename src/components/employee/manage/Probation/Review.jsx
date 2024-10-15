import React, { useState } from "react";
import RevealCard from "../../../AnimationComponents/RevealCard";
import Bbox from "../../../UiComponents/Bbox";
import {
    Box,
    Divider,
    Typography,
    FormControl,
    Button,
    MenuItem,
    InputLabel,
    Select,
    Radio,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { ToastContainer } from "react-toastify";
import Confirm from './Confirm'
import Extend from './Extend'
import Reject from './Reject'
import EditLetter from './EditLetter'
import EmployeePopup from '../../EmployeePopup'

function Review() {
    const [probationStatus, setProbationStatus] = useState(['Pending', 'Approved', 'Rejected', 'All']);
    const [selectedProbationStatus, setSelectedProbationStatus] = useState('');

    const [employeePopup, setEmployeePopup] = useState(false);

    const [confirmPopup, setConfirmPopup] = useState(false);
    const [rejectPopup, setRejectPopup] = useState(false);
    const [extendPopup, setExtendPopup] = useState(false);
    const [editLetterPopup, setEditLetterPopup] = useState(false);

    const [selectedRow, setSelectedRow] = useState(null);
    const columns = [
        {
            field: "radioButtons",
            headerName: "",
            width: 50,
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
        {
            field: "employeeId", headerName: "Employee ID", width: 120,
            renderCell: (params) => (
                <Typography
                    component="span"
                    sx={{ color: "primary.main", cursor: "pointer" }}
                    onClick={() => setEmployeePopup(true)}
                >
                    {params.value}
                </Typography>
            ),
        },
        { field: "employeeName", headerName: "Employee Name", width: 150 },
        { field: "employeeType", headerName: "Employee Type", width: 150 },
        { field: "department", headerName: "Department", width: 120 },
        { field: "grade", headerName: "Grade", width: 100 },
        {
            field: "employeeStatus",
            headerName: "Employee Status",
            width: 120,
            renderCell: (params) => (
                <Box
                    style={{
                        backgroundColor:
                            params.value === "Active"
                                ? "#C6F6D5"
                                : params.value === "Inactive"
                                    ? "#FFCCCC"
                                    : "transparent",
                        borderRadius: "6px",
                        display: "inline-block",
                        width:
                            params.value === "Active" || params.value === "Inactive"
                                ? "60px"
                                : "auto",
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
        { field: "probationEndDate", headerName: "Probation End Date", width: 150, },
        { field: "supervisorName", headerName: "Supervisor Name", width: 150 },
        {
            field: "supervisorRecommendation",
            headerName: "Supervisor Recommendation",
            width: 120,
            renderCell: (params) => (
                <Box
                    style={{
                        backgroundColor: "#BEE3F8",
                        borderRadius: "6px",
                        display: "inline-block",
                        width: "88px",
                        paddingLeft: "11px"
                    }}
                >
                    {params.value}
                </Box>
            ),
        },
        {
            field: "probationStatus",
            headerName: "Probation Status",
            width: 120,
            renderCell: (params) => (
                <Box
                    style={{
                        backgroundColor: "#FFEDD5",
                        borderRadius: "6px",
                        display: "inline-block",
                        width: "72px",
                        paddingLeft: "11px"
                    }}
                >
                    {params.value}
                </Box>
            ),
        },
        {
            field: "probationConfirmationDate",
            headerName: "Probation Confirmation Date",
            width: 150
        },
    ];

    const rows = [
        {
            id: 1,
            employeeId: "EMP354443",
            employeeName: "Debarati Ghosh",
            employeeType: "Teaching Staff",
            department: "Chemistry",
            grade: "B2",
            employeeStatus: "Active",
            probationEndDate: "12 Jul 2024",
            supervisorName: "Ratan Basak",
            supervisorRecommendation: "Confirmed",
            probationStatus: "Pending",
            probationConfirmationDate: "N/A"
        },
        {
            id: 2,
            employeeId: "EMP354443",
            employeeName: "Debarati Ghosh",
            employeeType: "Teaching Staff",
            department: "Chemistry",
            grade: "B2",
            employeeStatus: "Active",
            probationEndDate: "12 Jul 2024",
            supervisorName: "Ratan Basak",
            supervisorRecommendation: "Confirmed",
            probationStatus: "Pending",
            probationConfirmationDate: "N/A"
        },
        {
            id: 3,
            employeeId: "EMP354443",
            employeeName: "Debarati Ghosh",
            employeeType: "Teaching Staff",
            department: "Chemistry",
            grade: "B2",
            employeeStatus: "Active",
            probationEndDate: "12 Jul 2024",
            supervisorName: "Ratan Basak",
            supervisorRecommendation: "Confirmed",
            probationStatus: "Pending",
            probationConfirmationDate: "N/A"
        }
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

                    <FormControl sx={{ width: "30%" }}>
                        <InputLabel>Probation Status</InputLabel>
                        <Select
                            label="Probation Status"
                            onChange={(e) =>
                                setSelectedProbationStatus(e.target.value)
                            }
                            value={selectedProbationStatus}
                        >
                            {probationStatus.map((status) => (
                                <MenuItem key={status} value={status}>
                                    {status}
                                </MenuItem>
                            ))}
                        </Select>
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

                <Confirm open={confirmPopup} close={() => setConfirmPopup(false)} openEditLetter={() => setEditLetterPopup(true)} />
                <Extend open={extendPopup} close={() => setExtendPopup(false)} />
                <Reject open={rejectPopup} close={() => setRejectPopup(false)} />

                <EditLetter open={editLetterPopup} close={() => setEditLetterPopup(false)} />

                <EmployeePopup open={employeePopup} close={() => setEmployeePopup(false)} />

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