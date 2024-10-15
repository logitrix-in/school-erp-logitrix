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
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { DataGrid } from "@mui/x-data-grid";
import SelectPopup from "./popups/Select";
import OnHold from "./popups/OnHold";
import Reject from "./popups/Reject";
import { useState } from "react";
import ReignsSelect from "../../../UiComponents/ReignsSelect";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import useClasses from '@/hooks/useClasses'
import useEmployees from '@/hooks/useEmployees'
import ApplicationID from "../popup/ApplicationID";

const StudentAccount = () => {
    const navigate = useNavigate();
    const { acYear, curYear } = useClasses();
    const [academicYear, setAcademicYear] = useState(curYear);

    const { employeeManagementDepartment, employeeTeachingDepartment, employeeSupportStaffDepartment, employeeType } = useEmployees();

    const [status, setStatus] = useState(["Selected", "Pending", "Rejected"]);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedJobID, setSelectedJobID] = useState('');
    const [employeeDepartment, setEmployeeDepartment] = useState([...employeeManagementDepartment, ...employeeTeachingDepartment, ...employeeSupportStaffDepartment]);
    const [candidateName, setCandidateName] = useState('');

    const [applicationIDPopup, setApplicationIDPopup] = useState(false);

    const [selectedRow, setSelectedRow] = useState(null);
    const [selectPopup, setSelectPopup] = useState(false);
    const [onHoldPopup, setOnHoldPopup] = useState(false);
    const [rejectPopup, setRejectPopup] = useState(false);

    const columns = [
        {
            field: "radioButtons",
            headerName: "",
            width: 60,
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
            field: "id", headerName: "Application ID", width: 120,
            renderCell: (params) => (
                <Typography sx={{ cursor: "pointer", color: "primary.main" }} onClick={() => setApplicationIDPopup(true)}>
                    {params.value}
                </Typography>
            ),
        },
        { field: "candidate_name", headerName: "Candidate Name", width: 140 },
        {
            field: "selection_status", headerName: "Selection Status", width: 120,
            renderCell: (params) => (
                <Box
                    style={{
                        textAlign: "center",
                        backgroundColor:
                            params.value === "Selected"
                                ? "#C6F6D5"
                                : params.value === "Pending"
                                    ? "#FFCCCC"
                                    : "transparent",
                        borderRadius: "6px",
                        width:
                            params.value === "Selected" || params.value === "Pending"
                                ? "80px"
                                : "auto",
                        paddingLeft:
                            params.value === "Selected"
                                ? "4px"
                                : params.value === "Pending"
                                    ? "4px"
                                    : "0px",
                    }}
                >
                    {params.value}
                </Box>
            ),
        },
        {
            field: "job_id", headerName: "Job ID", width: 100,
            renderCell: (params) => (
                <Typography sx={{ cursor: "pointer", color: "primary.main" }} onClick={() => setApplicationIDPopup(true)}>
                    {params.value}
                </Typography>
            ),
        },
        { field: "employee_type", headerName: "Employee Type", width: 120, },
        { field: "department", headerName: "Department", width: 120, },
        { field: "grade", headerName: "Grade", width: 80 },
        { field: "expected_ctc", headerName: "Expected CTC", width: 120, },
        { field: "expected_date_of_joining", headerName: "Expected Date of Joining", width: 150, },
        { field: "reason_for_selection", headerName: "Reason for Selection/Not Selection", width: 150, }
    ];

    const rows = [
        {
            id: "APP002434",
            candidate_name: "Deepash Ghosh",
            selection_status: "Selected",
            job_id: "DPIN2475",
            employee_type: "Teaching Staff",
            department: "Science",
            grade: "B1",
            expected_ctc: "₹ 300000",
            expected_date_of_joining: "20 Mar 2024",
            reason_for_selection: "Lorem Ipsum"
        },
        {
            id: "APP002435",
            candidate_name: "Deepash Ghosh",
            selection_status: "Pending",
            job_id: "DPIN2475",
            employee_type: "Teaching Staff",
            department: "Science",
            grade: "B2",
            expected_ctc: "₹ 300000",
            expected_date_of_joining: "20 Mar 2024",
            reason_for_selection: "Lorem Ipsum"
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
                            backgroundColor: "white",
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
                            Select Employees
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
                                label="Selection Status"
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
                                onClick={() => { setSelectPopup(true) }}
                            >
                                Select
                            </Button>

                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => { setOnHoldPopup(true) }}
                            >
                                On Hold
                            </Button>

                            <Button
                                color="secondary"
                                variant="contained"
                                onClick={() => { setRejectPopup(true) }}
                            >
                                Reject
                            </Button>
                        </Box>

                        <SelectPopup open={selectPopup} close={() => setSelectPopup(false)} />
                        <OnHold open={onHoldPopup} close={() => setOnHoldPopup(false)} />
                        <Reject open={rejectPopup} close={() => setRejectPopup(false)} />
                        <ApplicationID open={applicationIDPopup} close={() => setApplicationIDPopup(false)} />

                    </Box>
                </Bbox>
            </RevealCard>
        </>
    );
};

export default <StudentAccount />;
