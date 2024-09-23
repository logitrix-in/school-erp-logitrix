import { useState } from "react";
import {
    Box,
    Button,
    Radio,
    Divider,
    Typography,
    FormControl,
    InputLabel,
    MenuItem,
    TextField,
    Autocomplete,
    Select,
} from "@mui/material";
import Bbox from "../../UiComponents/Bbox";
import RevealCard from "../../AnimationComponents/RevealCard";
import { DataGrid } from "@mui/x-data-grid";
import { useMediaQuery } from "@material-ui/core";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { ToastContainer } from "react-toastify";
import Approve from "./popups/Approve";
import Reject from "./popups/Reject";
import ApplyLeave from "./popups/ApplyLeave";
import LeaveCancellation from "./popups/LeaveCancellation";
import ClaimID from "./popups/ClaimID";
import { useNavigate } from "react-router-dom";

export default function Claims() {

    const curYear = new Date().getFullYear();
    const academicYear = `${curYear}-${(curYear + 1).toString().slice(2, 4)}`;
    const [acYear, setAcYear] = useState(academicYear);
    const [type, setType] = useState("pending");
    const [selectedRow, setSelectedRow] = useState(null);
    const [isEditButtonActive, setIsEditButtonActive] = useState(null);

    // breakpoints
    const isSmall = useMediaQuery("(max-width: 1364px)");
    const isTablet = useMediaQuery("(min-width: 1365px) and (max-width: 1535px)");
    const isLaptop = useMediaQuery("(min-width: 1536px) and (max-width: 1706px)");
    const isDesktop = useMediaQuery(
        "(min-width: 1707px) and (max-width: 1919px)"
    );
    const isLarge = useMediaQuery("(min-width: 1920px)");
    const isXlarge = useMediaQuery("(min-width: 2560px)");

    const [approvePopup, setApprovePopup] = useState(false);
    const [rejectPopup, setRejectPopup] = useState(false);
    const [applyLeavePopup, setApplyLeavePopup] = useState(false);
    const [leaveCancellationPopup, setLeaveCancellation] = useState(false);
    const [downloadPopup, setDownloadPopup] = useState(false);
    const [raisePopup, setRaisePopup] = useState(false);
    const [claimIDPopup, setClaimIDPopup] = useState(false);
    const [tab, setTab] = useState("claims");
    const navigate = useNavigate();

    // table columns
    const columns = [
        {
            field: "radioButtons",
            headerName: "",
            width: isLaptop ? 50 : isSmall ? 40 : isTablet ? 50 : 70,
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
                        setIsEditButtonActive(params.row.id);
                    }}
                />
            ),
        },
        {
            field: "id", headerName: "Leave Request ID",
            flex: 1,
            renderCell: (params) => (
                <Typography sx={{ cursor: "pointer", color: "primary.main" }} onClick={() => setClaimIDPopup(true)}>
                    {params.value}
                </Typography>
            ),
        },
        {
            field: "emp_id", headerName: "Employee ID",
            flex: 1, renderCell: (params) => (
                <Typography sx={{ cursor: "pointer", color: "primary.main" }} onClick={() => setClaimIDPopup(true)}>
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
            flex: 1.5,
        },
        {
            field: "leave_period", headerName: "Leave Period", flex: 2,
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

    // table rows
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
            id: 'AG240001',
            emp_id: "E002",
            emp_name: "Jane Smith",
            leave_type: "Annual Leave",
            working_days: 10,
            leave_period: "4-March-2020 - 6-March-2020",
        },
        {
            id: 'AG240001',
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
            width: isLaptop ? 50 : isSmall ? 40 : isTablet ? 50 : 70,
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
                        setIsEditButtonActive(params.row.id);
                    }}
                />
            ),
        },
        {
            field: "id", headerName: "Employee ID",
            flex: 1, renderCell: (params) => (
                <Typography sx={{ cursor: "pointer", color: "primary.main" }} onClick={() => setClaimIDPopup(true)}>
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

    // table rows
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

                    <ToastContainer />

                    <Approve open={approvePopup} close={() => setApprovePopup(false)} />
                    <Reject open={rejectPopup} close={() => setRejectPopup(false)} />
                    <ClaimID open={claimIDPopup} close={() => setClaimIDPopup(false)} />

                    <Box display="flex" justifyContent="flex-end" mt={2} mb={5} mr={2}>
                        <Button
                            color="primary"
                            variant="contained"
                            sx={{ mr: 2 }}
                            onClick={() => setApprovePopup(true)}
                        >
                            Approve
                        </Button>

                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{ mr: 2 }}
                            onClick={() => setRejectPopup(true)}
                        >
                            Reject
                        </Button>
                    </Box>
                </Bbox>
            </RevealCard >

            <Box my={4} />
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
                        <Autocomplete
                            options={["Student 1", "Student 2"]}
                            filterSelectedOptions
                            freeSolo={false}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Search by Employee name or Employee ID"
                                    label="Search by Employee name or Employee ID"
                                />
                            )}
                            sx={{ width: "30%" }}
                        />
                    </Box>

                    {/* table */}
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

                    <ToastContainer />

                    <ApplyLeave open={applyLeavePopup} close={() => setApplyLeavePopup(false)} />
                    <LeaveCancellation open={leaveCancellationPopup} close={() => setLeaveCancellation(false)} />
                    {/* <ClaimID open={claimIDPopup} close={() => setClaimIDPopup(false)} /> */}

                    <Box display="flex" justifyContent="flex-end" mt={2} mb={5} mr={2}>
                        <Button
                            color="primary"
                            variant="contained"
                            sx={{ mr: 2 }}
                            onClick={() => setApplyLeavePopup(true)}
                        >
                            Apply
                        </Button>

                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{ mr: 2 }}
                            onClick={() => setLeaveCancellation(true)}
                        >
                            Cancel Leave
                        </Button>
                    </Box>
                </Bbox>
            </RevealCard >
        </>
    )
}