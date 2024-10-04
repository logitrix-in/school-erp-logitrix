import { useState } from "react";
import {
    Box,
    Button,
    Radio,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";
import Bbox from "../../UiComponents/Bbox";
import RevealCard from "../../AnimationComponents/RevealCard";
import { DataGrid } from "@mui/x-data-grid";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { ToastContainer } from "react-toastify";
import Approve from "./popups/Approve";
import Reject from "./popups/Reject";
import Raise from "./popups/Raise";
import ClaimID from "./popups/ClaimID";
import ReignsSelect from "../../UiComponents/ReignsSelect";
import useClasses from "../../../hooks/useClasses";
import EmployeePopup from '../EmployeePopup'

export default function Claims() {
    const { acYear, curYear } = useClasses();
    const [academicYear, setAcademicYear] = useState(curYear);
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedClaimStatus, setSelectedClaimStatus] = useState(["Pending"]);

    const [approvePopup, setApprovePopup] = useState(false);
    const [rejectPopup, setRejectPopup] = useState(false);
    const [raisePopup, setRaisePopup] = useState(false);
    const [claimIDPopup, setClaimIDPopup] = useState(false);
    const [employeePopup, setEmployeePopup] = useState(false);

    const columns = [
        {
            field: "radioButtons",
            headerName: "",
            flex: 0.5,
            renderCell: (params) => (
                <Radio
                    checked={selectedRow?.id === params.row.id}
                    color="primary"
                    sx={{
                        transform: "scale(0.6)",
                    }}
                    inputProps={{ "aria-label": params.row.id }}
                    onChange={() => {
                        setSelectedRow(params.row);  // Store the entire row object
                        console.log('Selected Row Data:', params.row);
                    }}
                />
            ),
        },
        {
            field: "id", headerName: "Claim ID",
            flex: 1,
            renderCell: (params) => (
                <Typography sx={{ cursor: "pointer", color: "primary.main" }} onClick={() => setClaimIDPopup(true)}>
                    {params.value}
                </Typography>
            ),
        },
        {
            field: "claim_type", headerName: "Claim Request Type",
            flex: 2,
        },
        {
            field: "employee_name", headerName: "Employee Name",
            flex: 2,
            renderCell: (params) => (
                <Typography>
                    {params.value.name}{' '}
                    <Typography
                        component="span"
                        sx={{ color: "primary.main", cursor: "pointer" }}
                        onClick={() => setEmployeePopup(true)}
                    >
                        ({params.value.id})
                    </Typography>
                </Typography>
            ),
        },
        {
            field: "claim_raised_on", headerName: "Claim Raised on",
            flex: 1,
        },
        {
            field: "claim_amount", headerName: "Claim Amount",
            flex: 1,
        },
        {
            field: "claim_status", headerName: "Claim Status", flex: 1, renderCell: (params) => (
                <Box
                    style={{
                        backgroundColor:
                            params.value === "Approved"
                                ? "#C6F6D5"
                                : params.value === "Rejected"
                                    ? "#FED7D7"
                                    : params.value === "Pending"
                                        ? "#FEEBCB"
                                        : "transparent",
                        color:
                            params.value === "Approved"
                                ? "#22543D"
                                : params.value === "Rejected"
                                    ? "#822727"
                                    : params.value === "Pending"
                                        ? "#822727"
                                        : "transparent",
                        borderRadius: "6px",
                        display: "inline-block",

                        paddingLeft: "7px",
                        paddingRight: "7px",
                        paddingTop: "2px",
                        paddingBottom: "2px",
                    }}
                >
                    {params.value}
                </Box>
            ),
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
            id: "CLA76890",
            claim_type: "Internet reimbursement",
            employee_name: {
                name: "Bishakha Das",
                id: "CBH9890"
            },
            claim_raised_on: "4 Jul 2024",
            claim_amount: "₹ 2500",
            claim_status: "Approved",
            attachment: true,
        },
        {
            id: "CLA76891",
            claim_type: "Travel Expenses",
            employee_name: {
                name: "Maya Day",
                id: "CBH9890"
            },
            claim_raised_on: "4 Jul 2024",
            claim_amount: "₹ 2500",
            claim_status: "Rejected",
            attachment: true,
        },
        {
            id: "CLA76892",
            claim_type: "Travel Expenses",
            employee_name: {
                name: "Maya Devi",
                id: "CBH9890"
            },
            claim_raised_on: "4 Jul 2024",
            claim_amount: "₹ 2500",
            claim_status: "Pending",
            attachment: true,
        },
        {
            id: "CLA76893",
            claim_type: "Internet reimbursement",
            employee_name: {
                name: "Rajesh Kumar",
                id: "CBH9890"
            },
            claim_raised_on: "4 Jul 2024",
            claim_amount: "₹ 2500",
            claim_status: "Approved",
            attachment: true,
        }
    ];

    return (
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
                        Claims Requests
                    </Typography>
                </Box>

                <Divider />

                <Box>
                    <Box
                        display={"flex"}
                        flexDirection="row"
                        alignItems="center"
                        p={2}
                        mt={4}
                        height={50}
                    >

                        <FormControl sx={{ width: "25%" }}>
                            <InputLabel>Academic Year</InputLabel>
                            <Select
                                label="Academic Year"
                                onChange={(e) =>
                                    setAcademicYear(e.target.value)
                                }
                                value={academicYear}
                                sx={{ marginRight: '16px' }}
                            >
                                {acYear.map((year) => (
                                    <MenuItem key={year} value={year}>
                                        {year}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <ReignsSelect
                            items={['Pending', 'Approved', 'Rejected', 'All']}
                            multiple
                            label="Claim Status"
                            defaultValues={['Pending']}
                            value={selectedClaimStatus}
                            onChange={setSelectedClaimStatus}
                            sx={{ width: "25%" }}
                        />

                        {/* Spacer */}
                        <Box flex={1} />

                        {/* search button */}
                        <Button variant="outlined" color="primary" onClick={() => setRaisePopup(true)}>Raise New Request</Button>
                    </Box>
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

                <Approve open={approvePopup} close={() => setApprovePopup(false)} />
                <Reject open={rejectPopup} close={() => setRejectPopup(false)} />
                <Raise open={raisePopup} close={() => setRaisePopup(false)} />
                <ClaimID open={claimIDPopup} close={() => setClaimIDPopup(false)} />
                <EmployeePopup open={employeePopup} close={() => setEmployeePopup(false)} />

                <Box display="flex" justifyContent="flex-end" mt={2} mb={5} mr={2}>
                    <Button
                        color="primary"
                        variant="contained"
                        sx={{ mr: 2 }}
                        onClick={() => setApprovePopup(true)}
                        disabled={selectedRow?.claim_status !== 'Pending'}
                    >
                        Approve
                    </Button>

                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{ mr: 2 }}
                        onClick={() => setRejectPopup(true)}
                        disabled={selectedRow?.claim_status !== 'Pending'}
                    >
                        Reject
                    </Button>

                    <Button
                        variant="outlined"
                        color="primary"
                    >
                        Download List
                    </Button>

                </Box>
            </Bbox>
        </RevealCard >
    )
}