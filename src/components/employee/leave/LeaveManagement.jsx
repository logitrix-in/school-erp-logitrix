import { useState } from "react";
import {
    Box,
    Button,
    Radio,
    Divider,
    Typography,
    FormControl,
    InputLabel,
    Select,
} from "@mui/material";
import Bbox from "../../UiComponents/Bbox";
import RevealCard from "../../AnimationComponents/RevealCard";
import { DataGrid } from "@mui/x-data-grid";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { ToastContainer } from "react-toastify";
import Approve from "./popups/Approve";
import Reject from "./popups/Reject";
import ApplyLeave from "./popups/ApplyLeave";
import LeaveCancellation from "./popups/LeaveCancellation";
import LeaveRequestID from "./LeaveRequestID";
import EmployeePopup from "../EmployeePopup";

export default function Claims() {
    const [selectedRow1, setSelectedRow1] = useState(null);
    const [selectedRow2, setSelectedRow2] = useState(null);

    const [approvePopup, setApprovePopup] = useState(false);
    const [rejectPopup, setRejectPopup] = useState(false);
    const [applyLeavePopup, setApplyLeavePopup] = useState(false);
    const [leaveCancellationPopup, setLeaveCancellation] = useState(false);
    const [leaveRequestID, setLeaveRequestID] = useState(false);
    const [employeeDetailsPopup, setEmployeeDetailsPopup] = useState(false);

    const columns = [
        {
            field: "radioButtons",
            headerName: "",
            flex: 0.2,
            renderCell: (params) => (
                <Radio
                    checked={params.row.id === selectedRow1?.id}
                    color="primary"
                    sx={{
                        transform: "scale(0.6)",
                    }}
                    inputProps={{ "aria-label": params.row }}
                    onChange={() => {
                        setSelectedRow1(params.row);
                    }}
                />
            ),
        },
        {
            field: "id", headerName: "Leave Request ID",
            flex: 1,
            renderCell: (params) => (
                <Typography sx={{ cursor: "pointer", color: "primary.main" }} onClick={() => setLeaveRequestID(true)}>
                    {params.value}
                </Typography>
            ),
        },
        {
            field: "emp_id", headerName: "Employee ID",
            flex: 1, renderCell: (params) => (
                <Typography sx={{ cursor: "pointer", color: "primary.main" }} onClick={() => setEmployeeDetailsPopup(true)}>
                    {params.value}
                </Typography>
            ),
        },
        {
            field: "emp_name", headerName: "Employee Name",
            flex: 1.5,
        },
        {
            field: "leave_type", headerName: "Leave Type",
            flex: 1,
        },
        {
            field: "working_days", headerName: "No of Working Days",
            flex: 1.2,
        },
        {
            field: "leave_period", headerName: "Leave Period", flex: 1.8,
        },
        {
            field: "attachment", headerName: "Attachment",
            flex: 1,
            renderCell: (params) => (
                <Box
                    style={{
                        marginLeft: "24px",
                    }}
                >
                    <DescriptionOutlinedIcon />
                    {params.value}
                </Box>
            ),
        },
    ];

    const rows = [
        {
            id: 'AG240001',
            emp_id: "E001",
            emp_name: "John Doe",
            leave_type: "Sick Leave",
            working_days: 5,
            leave_period: "4-March-2020 - 6-March-2020",
        },
        {
            id: 'AG240002',
            emp_id: "E002",
            emp_name: "Jane Smith",
            leave_type: "Annual Leave",
            working_days: 10,
            leave_period: "4-March-2020 - 6-March-2020",
        },
        {
            id: 'AG240003',
            emp_id: "E003",
            emp_name: "Alice Johnson",
            leave_type: "Maternity Leave",
            working_days: 30,
            leave_period: "4-March-2020 - 6-March-2020",
        },
    ];

    const columns2 = [
        {
            field: "radioButtons",
            headerName: "",
            flex: 0.4,
            renderCell: (params) => (
                <Radio
                    checked={params.row.id === selectedRow2?.id}
                    color="primary"
                    sx={{
                        transform: "scale(0.6)",
                    }}
                    inputProps={{ "aria-label": params.row }}
                    onChange={() => {
                        setSelectedRow2(params.row);
                    }}
                />
            ),
        },
        {
            field: "id", headerName: "Employee ID",
            flex: 1, renderCell: (params) => (
                <Typography sx={{ cursor: "pointer", color: "primary.main" }} onClick={() => setEmployeeDetailsPopup(true)}>
                    {params.value}
                </Typography>
            ),
        },
        {
            field: "emp_name", headerName: "Employee Name",
            flex: 1.5,
        },
        {
            field: "department", headerName: "Department",
            flex: 1,
        },
        {
            field: "grade", headerName: "Grade",
            flex: 1,
        },
        {
            field: "status", headerName: "Status", flex: 1,
        },
        {
            field: "supervisor", headerName: "Supervisor", flex: 1,
        },

    ];

    const rows2 = [
        {
            id: "E001",
            emp_name: "John Doe",
            department: "Science",
            grade: "B2",
            status: "Active",
            supervisor: "Topesh Pattu",
        },
        {
            id: "E002",
            emp_name: "Jane Smith",
            department: "Science",
            grade: "B2",
            status: "Active",
            supervisor: "Topesh Pattu",
        },
        {
            id: "E003",
            emp_name: "Alice Johnson",
            department: "Science",
            grade: "B2",
            status: "Active",
            supervisor: "Topesh Pattu",
        },
    ];

    return (
        <>
            <RevealCard>
                <Bbox borderRadius={2} overflow={"hidden"}>
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
                            Pending Leave Request
                        </Typography>
                    </Box>

                    <Divider />

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

                    <Approve open={approvePopup} close={() => setApprovePopup(false)} />
                    <Reject open={rejectPopup} close={() => setRejectPopup(false)} />

                    <Box display="flex" justifyContent="flex-end" mt={2} mb={5} mr={2}>
                        <Button
                            color="primary"
                            variant="contained"
                            sx={{ mr: 2 }}
                            onClick={() => setApprovePopup(true)}
                            disabled={!selectedRow1}
                        >
                            Approve
                        </Button>

                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{ mr: 2 }}
                            onClick={() => setRejectPopup(true)}
                            disabled={!selectedRow1}
                        >
                            Reject
                        </Button>
                    </Box>
                </Bbox>
            </RevealCard >

            <RevealCard>
                <Bbox borderRadius={2} overflow={"hidden"} mt={2}>
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
                            Apply / Cancel Leave
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

                        <Box display={"flex"} gap={1} sx={{ width: '35%', marginY: '16px' }} >
                            <FormControl fullWidth>
                                <InputLabel>Search by Employee Name or Employee ID</InputLabel>
                                <Select
                                    label="Search by Employee Name or Employee ID"
                                    // value={selectedLibraryCard}
                                    required
                                // onChange={(e) => setSelectedLibraryCard(e.target.value)}
                                >
                                    {/* {
								libraryCardNumbers?.map((type) => (
									<MenuItem key={type} value={type}>{type}</MenuItem>
								))
							} */}
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>

                    <Box mt={2} mb={5} style={{ height: "100%" }} mx={2}>
                        <DataGrid
                            rows={rows2}
                            columns={columns2}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                        />
                    </Box>

                    <Box display="flex" justifyContent="flex-end" mt={2} mb={5} mr={2}>
                        <Button
                            color="primary"
                            variant="contained"
                            sx={{ mr: 2 }}
                            onClick={() => setApplyLeavePopup(true)}
                            disabled={!selectedRow2}
                        >
                            Apply
                        </Button>

                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{ mr: 2 }}
                            onClick={() => setLeaveCancellation(true)}
                            disabled={!selectedRow2}
                        >
                            Cancel Leave
                        </Button>
                    </Box>

                    <ApplyLeave open={applyLeavePopup} close={() => setApplyLeavePopup(false)} />
                    <LeaveCancellation open={leaveCancellationPopup} close={() => setLeaveCancellation(false)} />
                    <LeaveRequestID open={leaveRequestID} close={() => setLeaveRequestID(false)} />
                    <EmployeePopup open={employeeDetailsPopup} close={() => setEmployeeDetailsPopup(false)} />

                </Bbox>
            </RevealCard >
        </>
    )
}