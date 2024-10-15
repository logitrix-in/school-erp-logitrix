import { useNavigate } from "react-router-dom";
import RevealCard from "../../../AnimationComponents/RevealCard";
import Bbox from "../../../UiComponents/Bbox";
import {
    Box,
    Button,
    Divider,
    Typography,
    Radio,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { DataGrid } from "@mui/x-data-grid";
import Shortlist from "../popup/Shortlist";
import Reject from "../popup/Reject";
import Notify from "./Notify";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import EditLetter from '../popup/EditLetter';
import useEmployees from '@/hooks/useEmployees';
import useClasses from '@/hooks/useClasses';
import ReignsSelect from "../../../UiComponents/ReignsSelect";
import { useEffect } from "react";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";
import ApplicationID from "../popup/ApplicationID";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

const StudentAccount = () => {
    const navigate = useNavigate();

    const { acYear, curYear } = useClasses();
    const [academicYear, setAcademicYear] = useState(curYear);

    const { employeeManagementDepartment, employeeTeachingDepartment, employeeSupportStaffDepartment, employeeType } = useEmployees();

    const [selectedType, setSelectedType] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedJobID, setSelectedJobID] = useState('');
    const [candidateName, setCandidateName] = useState('');
    const [employeeDepartment, setEmployeeDepartment] = useState([...employeeManagementDepartment, ...employeeTeachingDepartment, ...employeeSupportStaffDepartment]);

    const [applicationIDPopup, setApplicationIDPopup] = useState(false);

    useEffect(() => {
        console.log(selectedType);
        let departments = [];

        if (selectedType === '') {
            return;
        }

        selectedType.forEach(type => {
            switch (type) {
                case 'Management':
                    departments = [...departments, ...employeeManagementDepartment];
                    break;
                case 'Teaching Staff':
                    departments = [...departments, ...employeeTeachingDepartment];
                    break;
                case 'Support Staff':
                    departments = [...departments, ...employeeSupportStaffDepartment];
                    break;
                default:
                    break;
            }
        });

        setEmployeeDepartment(departments);
    }, [selectedType]);


    const [selectedRow, setSelectedRow] = useState(null);

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
            field: "id", headerName: "Application ID", flex: 1,
            renderCell: (params) => (
                <Typography sx={{ cursor: "pointer", color: "primary.main" }} onClick={() => setApplicationIDPopup(true)}>
                    {params.value}
                </Typography>
            ),
        },
        { field: "candidate_name", headerName: "Candidate Name", flex: 1.2 },
        {
            field: "screening_status", headerName: "Screening Status", flex: 1.2,
            renderCell: (params) => (
                <Box
                    style={{
                        backgroundColor:
                            params.value === "Shortlisted"
                                ? "#C6F6D5"
                                : params.value === "Pending"
                                    ? "#FEEBCB"
                                    : params.value === "Rejected"
                                        ? "#FFCCCC"
                                        : "transparent",
                        borderRadius: "6px",
                        display: "inline-block",
                        paddingLeft:
                            params.value === "Shortlisted"
                                ? "10px"
                                : params.value === "Pending"
                                    ? "7px"
                                    : params.value === "Rejected"
                                        ? "7px"
                                        : "0px",
                        paddingRight:
                            params.value === "Shortlisted"
                                ? "10px"
                                : params.value === "Pending"
                                    ? "7px"
                                    : params.value === "Rejected"
                                        ? "7px"
                                        : "0px",
                    }}
                >
                    {params.value}
                </Box>
            ),
        },
        {
            field: "job_id", headerName: "Job ID", flex: 0.8,
            renderCell: (params) => (
                <Typography sx={{ cursor: "pointer", color: "primary.main" }} onClick={() => setApplicationIDPopup(true)}>
                    {params.value}
                </Typography>
            ),
        },
        { field: "emp_type", headerName: "Employee Type", flex: 1 },
        { field: "department", headerName: "Department", flex: 1 },
        { field: "grade", headerName: "Grade", flex: 0.6 },
        { field: "application_date", headerName: "Application Date", flex: 1 },
        {
            field: "fitment_index", headerName: "Fitment Index", flex: 1,
            renderCell: (params) => (
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{
                        width: '100px',
                        height: '10px',
                        bgcolor: '#eee',
                        borderRadius: '5px',
                        overflow: 'hidden'
                    }}>
                        <Box
                            sx={{
                                width: `${params.value}%`,
                                height: '100%',
                                bgcolor: getColor(params.value),
                                transition: 'width 0.3s ease, background-color 0.3s ease'
                            }}
                        />
                    </Box>
                    <Typography variant="body2">
                        {params.value}%
                    </Typography>
                </Box>
            ),
        },
        {
            field: "resume", headerName: "Resume", flex: 0.8,
            renderCell: (params) => (
                <Box>
                    <DescriptionOutlinedIcon />
                </Box>
            ),
        },
    ];

    // Determine color based on value
    const getColor = (percentage) => {
        if (percentage >= 75) return '#4CAF50'; // Green
        if (percentage >= 30) return '#FFC107'; // Yellow
        return '#F44336'; // Red
    };

    const rows = [
        {
            id: "EMP354354",
            candidate_name: "Debarati Ghosh",
            screening_status: "Shortlisted",
            job_id: "CHN2401",
            emp_type: "Teaching Staff",
            department: "Science",
            grade: "B2",
            application_date: "30 Mar 2023",
            fitment_index: 75,
            resume: "View"
        },
        {
            id: "EMP354355",
            candidate_name: "Alok Das",
            screening_status: "Pending",
            job_id: "CHN2401",
            emp_type: "Teaching Staff",
            department: "Science",
            grade: "B2",
            application_date: "30 Mar 2023",
            fitment_index: 50,
            resume: "View"
        }
    ];

    const [shortlistPopup, setShortlistPopup] = useState(false);
    const [rejectPopup, setRejectPopup] = useState(false);
    const [editLetterPopup, setEditLetterPopup] = useState(false);
    const [notificationPopup, setNotificationPopup] = useState(false);

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
                            Manage Screening
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
                                    width: '30%'
                                }}
                            />

                            <ReignsSelect
                                multiple
                                label="Employee Type"
                                items={employeeType}
                                defaultValues={employeeType}
                                onChange={setSelectedType}
                                value={selectedType}
                                sx={{
                                    width: '30%'
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
                                    width: '30%'
                                }}
                            />

                            <Button variant="contained">Submit</Button>
                        </Box>

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


                        {/* table */}
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
                                columnGroupingModel={[
                                    {
                                        groupId: "applied_for",
                                        headerName: "Applied For",
                                        headerAlign: 'center',
                                        children: [
                                            { field: "job_id" },
                                            { field: "emp_type" },
                                            { field: "department" },
                                            { field: "grade" },
                                        ],
                                    },
                                ]}
                                disableRowSelectionOnClick
                            />
                        </Box>

                        <Box display="flex" justifyContent="flex-end" mt={2} mb={5} mr={2}>
                            <Button
                                color="primary"
                                variant="contained"
                                sx={{ mr: 2 }}
                                onClick={() => setShortlistPopup(true)}
                            >
                                Shortlist
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

                        <ToastContainer />

                        <Shortlist open={shortlistPopup} close={() => setShortlistPopup(false)} />
                        <Reject open={rejectPopup} close={() => setRejectPopup(false)} />
                    </Box>
                </Bbox>
            </RevealCard>

            <RevealCard>
                <Bbox borderRadius={2} overflow={"hidden"} my={2}>
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
                            Manage
                        </Typography>
                    </Box>
                    <Divider />
                    <ToastContainer />

                    <Box gap={2} px={3} py={4} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                        <Typography>Shortlisting process is internal to the system. Please ensure that all the shortlisted candidates are duly notified well before their next round of review/assessment.</Typography>

                        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={4} sx={{ width: '80%' }}>
                            <Button variant="contained" color="primary" fullWidth onClick={() => setNotificationPopup(true)}>
                                Notify
                            </Button>
                            <Button
                                fullWidth
                                color="primary"
                                variant="outlined"
                                onClick={() => setEditLetterPopup(true)}
                            >
                                Set Template
                            </Button>
                        </Box>
                    </Box>

                    <EditLetter open={editLetterPopup} close={() => setEditLetterPopup(false)} />
                    {/* <Notify open={notificationPopup} close={() => setNotificationPopup(false)} /> */}
                    <ApplicationID open={applicationIDPopup} close={() => setApplicationIDPopup(false)} />

                </Bbox>
            </RevealCard>
        </>
    );
};

export default <StudentAccount />;
