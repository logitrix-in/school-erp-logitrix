import { useNavigate } from "react-router-dom";
import RevealCard from "../../../AnimationComponents/RevealCard";
import Bbox from "../../../UiComponents/Bbox";
import {
    Box,
    Button,
    Divider,
    Typography,
    Autocomplete,
    TextField,
    Radio,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Manage from "./Manage";
import Reject from './popups/Reject'
import Initiate from './popups/Initiate'
import ReleaseJoiningLetter from './popups/ReleaseJoiningLetter'
import ReignsSelect from '@/components/UiComponents/ReignsSelect'
import useEmployees from '@/hooks/useEmployees'
import useClasses from '@/hooks/useClasses'
import ApplicationID from "../popup/ApplicationID";

const StudentAccount = () => {
    const navigate = useNavigate();

    const { acYear, curYear } = useClasses();
    const [academicYear, setAcademicYear] = useState(curYear);

    const { employeeManagementDepartment, employeeTeachingDepartment, employeeSupportStaffDepartment } = useEmployees();

    const [status, setStatus] = useState(["Selected", "Pending", "Rejected"]);

    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedJobID, setSelectedJobID] = useState('');
    const [employeeDepartment, setEmployeeDepartment] = useState([...employeeManagementDepartment, ...employeeTeachingDepartment, ...employeeSupportStaffDepartment]);

    const [candidateName, setCandidateName] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);
    const [rejectPopup, setRejectPopup] = useState(false);
    const [initiatePopup, setInitiatePopup] = useState(false);
    const [releaseJoiningLetter, setReleaseJoiningLetter] = useState(false);
    const [applicationIDPopup, setApplicationIDPopup] = useState(false);

    const columns = [
        {
            field: "radioButtons",
            headerName: "",
            flex: 0.5,
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
            field: 'applicationId', headerName: 'Application ID', flex: 1,
            renderCell: (params) => (
                <Typography sx={{ cursor: "pointer", color: "primary.main" }} onClick={() => setApplicationIDPopup(true)}>
                    {params.value}
                </Typography>
            ),
        },
        { field: 'candidateName', headerName: 'Candidate Name', flex: 1.5 },
        {
            field: 'onboardingStatus', headerName: 'Onboarding Status', flex: 1.4,
            renderCell: (params) => (
                <Box
                    style={{
                        backgroundColor:
                            params.value === "Not Initiated"
                                ? "#FEEBCB"
                                : params.value === "Pending with Employee"
                                    ? "#BEE3F8"
                                    : "transparent",
                        color:
                            params.value === "Not Initiated"
                                ? "#7B341E"
                                : params.value === "Pending with Employee"
                                    ? "#2A4365"
                                    : "transparent",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: "500",
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
            field: 'jobId', headerName: 'Job ID', flex: 0.8,
            renderCell: (params) => (
                <Typography sx={{ cursor: "pointer", color: "primary.main" }} onClick={() => setApplicationIDPopup(true)}>
                    {params.value}
                </Typography>
            ),
        },
        { field: 'department', headerName: 'Department', flex: 1 },
        { field: 'grade', headerName: 'Grade', flex: 0.7 },
        {
            field: 'offeredCTC', headerName: 'Offered CTC/\nContract Payment', flex: 1.4,
            renderHeader: (params) => <MultilineHeader colDef={params.colDef} />
        },
        { field: 'expectedJoiningDate', headerName: 'Expected Date of Joining', flex: 1.6 }
    ];

    const MultilineHeader = ({ colDef }) => {
        return (
            <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.4', fontWeight: '600' }}>
                {colDef.headerName}
            </div>
        );
    };

    const rows = [
        {
            id: 1,
            applicationId: 'EMP354434',
            candidateName: 'Debarati Ghosh',
            onboardingStatus: 'Not Initiated',
            jobId: 'CHN2401',
            department: 'Science',
            grade: 'B2',
            offeredCTC: '₹ 25,000.00',
            expectedJoiningDate: '25 Mar 2024'
        },
        {
            id: 2,
            applicationId: 'EMP354435',
            candidateName: 'Debarati Ghosh',
            onboardingStatus: 'Pending with Employee',
            jobId: 'CHN2401',
            department: 'History',
            grade: 'B2',
            offeredCTC: '₹ 25,000.00',
            expectedJoiningDate: '25 Mar 2024'
        }
    ];

    return (
        <>
            <div
                style={{
                    backgroundColor: "#E5F3FB",
                    display: "flex",
                    padding: "10px",
                    maxWidth: "670px",
                    borderRadius: "10px",
                }}
            >
                <div>
                    <button
                        style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "black",
                            marginRight: "10px",
                            cursor: "pointer",
                            borderRadius: "6px",
                            padding: "7px 10px 7px 10px",
                            fontSize: "16px",
                            fontWeight: 400,
                        }}
                        onClick={() => navigate("/employee/recruitment/")}
                    >
                        Open Position(s)
                    </button>

                    <button
                        style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "black",
                            marginRight: "10px",
                            cursor: "pointer",
                            borderRadius: "6px",
                            padding: "7px 10px 7px 10px",
                            fontSize: "16px",
                            fontWeight: 400,
                        }}
                        onClick={() => navigate("/employee/recruitment/applications/")}
                    >
                        Applications
                    </button>

                    <button
                        style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "black",
                            marginRight: "10px",
                            cursor: "pointer",
                            borderRadius: "6px",
                            padding: "7px 10px 7px 10px",
                            fontSize: "16px",
                            fontWeight: 400,
                        }}
                        onClick={() => navigate("/employee/recruitment/screening/")}
                    >
                        Screening
                    </button>

                    <button
                        style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "black",
                            cursor: "pointer",
                            borderRadius: "6px",
                            padding: "7px 10px 7px 10px",
                            fontSize: "16px",
                            fontWeight: 400,
                        }}
                        onClick={() => navigate("/employee/recruitment/selection/")}
                    >
                        Selection
                    </button>

                    <button
                        style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "black",
                            cursor: "pointer",
                            borderRadius: "6px",
                            padding: "7px 10px 7px 10px",
                            fontSize: "16px",
                            fontWeight: 400,
                        }}
                        onClick={() => navigate("/employee/recruitment/offer/")}
                    >
                        Offer
                    </button>

                    <button
                        style={{
                            backgroundColor: "white",
                            border: "none",
                            color: "black",
                            marginRight: "10px",
                            cursor: "pointer",
                            borderRadius: "6px",
                            padding: "7px 10px 7px 10px",
                            fontSize: "16px",
                            fontWeight: 400,
                        }}
                        onClick={() => navigate("/employee/recruitment/onboarding/")}
                    >
                        Onboarding
                    </button>
                </div>
            </div>

            <RevealCard>
                <Bbox
                    mt={3}
                    width="100%"
                    height="100%"
                    borderRadius={2}
                    overflow="hidden"
                >
                    <Box
                        bgcolor="white"
                        py={1.3}
                        px={3}
                        borderRadius={2}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography fontWeight={700} fontSize="1.1rem">
                            Onboarding
                        </Typography>
                    </Box>

                    <Divider />

                    <Box>
                        <Box
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                            p={2}
                            mt={4}
                            height={50}
                            gap={4}
                        >
                            <FormControl sx={{ width: "30%" }}>
                                <InputLabel>Academic Year</InputLabel>
                                <Select
                                    label="Academic Year"
                                    onChange={(e) =>
                                        setAcademicYear(e.target.value)
                                    }
                                    value={academicYear}
                                >
                                    {acYear.map((year) => (
                                        <MenuItem key={year} value={year}>
                                            {year}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <ReignsSelect
                                multiple
                                label="Job ID"
                                items={[]}
                                defaultValues={[]}
                                onChange={setSelectedJobID}
                                value={selectedJobID}
                                sx={{
                                    width: '20%'
                                }}
                            />

                            <ReignsSelect
                                multiple
                                label="Department"
                                items={employeeDepartment}
                                defaultValues={employeeDepartment}
                                onChange={setSelectedDepartment}
                                value={selectedDepartment}
                                sx={{
                                    width: '20%'
                                }}
                            />

                            <ReignsSelect
                                multiple
                                label="Onboarding Status"
                                items={status}
                                defaultValues={status}
                                onChange={setSelectedStatus}
                                value={selectedStatus}
                                sx={{
                                    width: '20%'
                                }}
                            />
                            <Button variant="contained">Submit</Button>
                        </Box>

                        {/* total number of results found */}
                        <Box p={2} mt={1} display="flex" justifyContent="space-between" alignItems={'flex-end'}>
                            <FormControl sx={{ width: "30%" }}>
                                <InputLabel>Search by Candidate Name or Application ID</InputLabel>
                                <Select
                                    label="Search by Candidate Name or Application ID"
                                    onChange={(e) =>
                                        setCandidateName(e.target.value)
                                    }
                                    value={candidateName}
                                >
                                    {[].map((year) => (
                                        <MenuItem key={year} value={year}>
                                            {year}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Box
                                style={{
                                    backgroundColor: "#E1EEFB",
                                    border: "1px solid #3381A5",
                                    borderRadius: "16px",
                                    width: 102,
                                    height: 22,
                                    padding: "3.5px 12px",
                                }}
                            >
                                <Typography
                                    style={{
                                        fontSize: "10px",
                                        fontWeight: "400",
                                        color: "#3381A5",
                                    }}
                                >
                                    {rows.length} Results found
                                </Typography>
                            </Box>
                        </Box>

                        <Box m={2} height={"100%"}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                pageSizeOptions={[5, 10]}
                                disableRowSelectionOnClick
                            />
                        </Box>

                        <Box
                            display="flex"
                            justifyContent="flex-end"
                            marginBottom={5}
                            marginRight={2}
                            gap={2}
                        >

                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => { setReleaseJoiningLetter(true) }}
                            >
                                Release Joining Letter
                            </Button>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => { navigate("/employee/recruitment/onboarding/OfflineOnboardingFormView") }}
                            >
                                Proceed to Document Verification
                            </Button>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => { navigate("/employee/recruitment/onboarding/OfflineOnboardingFormView") }}
                            >
                                Review Onboarding Form
                            </Button>

                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => { setInitiatePopup(true) }}
                            >
                                Initiate
                            </Button>

                            <Button
                                color="secondary"
                                variant="contained"
                                onClick={() => { setRejectPopup(true) }}
                            >
                                Reject
                            </Button>
                        </Box>
                    </Box>

                    <Reject open={rejectPopup} close={() => setRejectPopup(false)} />
                    <Initiate open={initiatePopup} close={() => setInitiatePopup(false)} />
                    <ReleaseJoiningLetter open={releaseJoiningLetter} close={() => setReleaseJoiningLetter(false)} />

                    <ApplicationID open={applicationIDPopup} close={() => setApplicationIDPopup(false)} />

                </Bbox>
            </RevealCard >

            <Manage />
        </>
    );
};

export default <StudentAccount />;
