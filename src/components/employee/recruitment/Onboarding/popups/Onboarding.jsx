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
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Manage from "./Manage";
import Reject from './popups/Reject'
import Initiate from './popups/Initiate'

const StudentAccount = () => {
    const navigate = useNavigate();
    const [selectedRow, setSelectedRow] = useState(null);
    const [rejectPopup, setRejectPopup] = useState(false);
    const [initiatePopup, setInitiatePopup] = useState(false);

    const columns = [
        {
            field: "radioButtons",
            headerName: "",
            flex: 0.6,
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
        { field: 'applicationId', headerName: 'Application ID', flex: 1 },
        { field: 'candidateName', headerName: 'Candidate Name', flex: 1 },
        { field: 'onboardingStatus', headerName: 'Onboarding Status', flex: 1.4 },
        { field: 'jobId', headerName: 'Job ID', flex: 0.8 },
        { field: 'department', headerName: 'Department', flex: 1 },
        { field: 'grade', headerName: 'Grade', flex: 0.8 },
        { field: 'offeredCTC', headerName: 'Offered CTC/Contract Payment', flex: 1.8 },
        { field: 'expectedJoiningDate', headerName: 'Expected Date of Joining', flex: 1.6 }
    ];

    const rows = [
        {
            id: 1,
            applicationId: 'EMP35443443',
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
            applicationId: 'EMP35443442',
            candidateName: 'Debarati Ghosh',
            onboardingStatus: 'Pending with Employee',
            jobId: 'CHN2401',
            department: 'History',
            grade: 'B2',
            offeredCTC: '₹ 25,000.00',
            expectedJoiningDate: '25 Mar 2024'
        }
    ];

    const [applicationIDPopup, setApplicationIDPopup] = useState(false);


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
                            Onboarding
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
                                        placeholder="Onboarding Status"
                                        label="Onboarding Status"
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

                </Bbox>
            </RevealCard >

            <Manage />
        </>
    );
};

export default <StudentAccount />;
