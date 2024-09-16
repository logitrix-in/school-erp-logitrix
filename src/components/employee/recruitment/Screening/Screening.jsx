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
import Shortlist from "../popup/Shortlist";
import Reject from "../popup/Reject";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import EditLetter from '../popup/EditLetter';

const StudentAccount = () => {
    const navigate = useNavigate();
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
        { field: "id", headerName: "Application ID", flex: 1 },
        { field: "candidate_name", headerName: "Candidate Name", flex: 1 },
        {
            field: "screening_status", headerName: "Screening Status", flex: 1,
            renderCell: (params) => (
                <Box
                    style={{
                        backgroundColor:
                            params.value === "Shortlisted"
                                ? "#C6F6D5"
                                : params.value === "Rejected"
                                    ? "#FFCCCC"
                                    : "transparent",
                        borderRadius: "6px",
                        display: "inline-block",
                        paddingLeft:
                            params.value === "Shortlisted"
                                ? "10px"
                                : params.value === "Rejected"
                                    ? "7px"
                                    : "0px",
                        paddingRight:
                            params.value === "Shortlisted"
                                ? "10px"
                                : params.value === "Rejected"
                                    ? "7px"
                                    : "0px",
                    }}
                >
                    {params.value}
                </Box>
            ),
        },
        { field: "job_id", headerName: "Job ID", flex: 0.8 },
        { field: "emp_type", headerName: "Employee Type", flex: 1 },
        { field: "department", headerName: "Department", flex: 1 },
        { field: "grade", headerName: "Grade", flex: 0.8 },
        { field: "application_date", headerName: "Application Date", flex: 1 },
        { field: "fitment_index", headerName: "Fitment Index", flex: 1 },
        { field: "resume", headerName: "Resume", flex: 0.8 },
    ];

    const rows = [
        {
            id: "EMP3543543443",
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
            id: "EMP3543543443",
            candidate_name: "Alok Das",
            screening_status: "Shortlisted",
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
                            Manage Screening
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
                                        placeholder="Employee Type"
                                        label="Employee Type"
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
                    <EditLetter open={notificationPopup} close={() => setNotificationPopup(false)} />

                </Bbox>
            </RevealCard>
        </>
    );
};

export default <StudentAccount />;
