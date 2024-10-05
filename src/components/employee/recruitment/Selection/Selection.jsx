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
import Select from "./popups/Select";
import OnHold from "./popups/OnHold";
import Reject from "./popups/Reject";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

const StudentAccount = () => {
    const navigate = useNavigate();
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectPopup, setSelectPopup] = useState(false);
    const [onHoldPopup, setOnHoldPopup] = useState(false);
    const [rejectPopup, setRejectPopup] = useState(false);

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
        { field: "id", headerName: "Application ID", flex: 0.8 },
        { field: "candidate_name", headerName: "Candidate Name", flex: 1 },
        {
            field: "selection_status", headerName: "Selection Status", flex: 0.8,
            renderCell: (params) => (
                <Box
                    style={{
                        backgroundColor:
                            params.value === "Selected"
                                ? "#C6F6D5"
                                : params.value === "On Hold"
                                    ? "#FFCCCC"
                                    : "transparent",
                        borderRadius: "6px",
                        display: "inline-block",
                        width:
                            params.value === "Selected" || params.value === "On Hold"
                                ? "60px"
                                : "auto",
                        paddingLeft:
                            params.value === "Selected"
                                ? "11px"
                                : params.value === "On Hold"
                                    ? "7px"
                                    : "0px",
                    }}
                >
                    {params.value}
                </Box>
            ),
        },
        { field: "job_id", headerName: "Job ID", flex: 0.8 },
        { field: "employee_type", headerName: "Employee Type", flex: 1 },
        { field: "department", headerName: "Department", flex: 1 },
        { field: "grade", headerName: "Grade", flex: 0.5 },
        { field: "expected_ctc", headerName: "Expected CTC", flex: 0.8 },
        { field: "expected_date_of_joining", headerName: "Expected Date of Joining", flex: 1 },
        { field: "reason_for_selection", headerName: "Reason for Selection/Not Selection", flex: 1.2 }
    ];

    const rows = [
        {
            id: "APP0024342443",
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
            id: "APP0024342442",
            candidate_name: "Deepash Ghosh",
            selection_status: "On Hold",
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
            {/* top navigation buttons */}
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
                    {/* top bulk text */}
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
                            Bulk
                        </Typography>
                    </Box>

                    {/* divider */}
                    <Divider />

                    <Box>
                        {/* dropdowns and search button section */}
                        <Box
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                            p={2}
                            mt={4}
                            height={50}
                            gap={4}
                        >

                            <Autocomplete
                                options={["Student 1", "Student 2"]}
                                filterSelectedOptions
                                freeSolo={false}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder="Academic Year"
                                        label="Academic Year"
                                    />
                                )}
                                sx={{ width: "20%" }}
                            />

                            <Autocomplete
                                options={["Student 1", "Student 2"]}
                                filterSelectedOptions
                                freeSolo={false}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder="Job ID"
                                        label="Job ID"
                                    />
                                )}
                                sx={{ width: "20%" }}
                            />

                            <Autocomplete
                                options={["Student 1", "Student 2"]}
                                filterSelectedOptions
                                freeSolo={false}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder="Department"
                                        label="Department"
                                    />
                                )}
                                sx={{ width: "20%" }}
                            />

                            <Autocomplete
                                options={["Student 1", "Student 2"]}
                                filterSelectedOptions
                                freeSolo={false}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder="Selection Status"
                                        label="Selection Status"
                                    />
                                )}
                                sx={{ width: "20%" }}
                            />
                            <Button variant="contained">Submit</Button>
                        </Box>



                        {/* total number of results found */}
                        <Box p={2} mt={1} display="flex" justifyContent="space-between" alignItems={'flex-end'}>
                            <Autocomplete
                                options={['stud 1', 'stud 2', 'stud 3', 'stud 4']}
                                filterSelectedOptions
                                freeSolo={false}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Search by Candidate Name or Application ID"
                                        placeholder="Search by Student ID / Student Name"
                                        variant="outlined"
                                    />
                                )}
                                sx={{ width: "35%" }}
                            />

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

                        <ToastContainer />
                        <Select open={selectPopup} close={() => setSelectPopup(false)} />
                        <OnHold open={onHoldPopup} close={() => setOnHoldPopup(false)} />
                        <Reject open={rejectPopup} close={() => setRejectPopup(false)} />

                    </Box>
                </Bbox>
            </RevealCard>
        </>
    );
};

export default <StudentAccount />;
