import { useState } from "react";
import RevealCard from "../../../AnimationComponents/RevealCard";
import Bbox from "../../../UiComponents/Bbox";
import {
    Box,
    Divider,
    Typography,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import IncidentHeaderBanner from "./Banner";
import EditLetter from "./EditLetter";
import EditReleaseDate from "./EditReleaseDate";
import SetReleaseDate from "./SetReleaseDate";
import useEmployees from '@/hooks/useEmployees'
import EmployeePopup from '../../EmployeePopup'
import ReignsSelect from "../../../UiComponents/ReignsSelect";
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';

const PromotionLetterIssuance = () => {
    const { employeeGrade } = useEmployees();

    const navigate = useNavigate();

    const [selectedGrade, setSelectedGrade] = useState('');
    const [selectedPromotionCycle, setSelectedPromotionCycle] = useState("");
    const promotionCycle = ["June", "September", "December", "March"];

    const [setReleaseDatePopup, setSetReleaseDatePopup] = useState(false);
    const [editReleaseDatePopup, setEditReleaseDatePopup] = useState(false);
    const [setTemplatePopup, setSetTemplatePopup] = useState(false);
    const [employeePopup, setEmployeePopup] = useState(false);

    const columns = [
        {
            field: "id", headerName: "Employee ID", flex: 1,
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
        { field: "name", headerName: "Name", flex: 1.5 },
        {
            field: "emp_status", headerName: "Employee Status", flex: 1.5,
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
        { field: "department", headerName: "Department", flex: 1.5 },
        { field: "promotion_eligibility", headerName: "Promotion Eligibility", flex: 2 },
        { field: "curr_grade", headerName: "Current Grade", flex: 1.5 },
        {
            field: "approved_for_upcoming_cycle", headerName: "Approved for Upcoming Cycle", flex: 2.5,
            renderCell: (params) => (
                <Box display={"flex"} justifyContent={"space-between"} alignItems={'center'}>
                    <Box
                        mr={2}
                        style={{
                            backgroundColor: "#30B0C7",
                            color: "#fff",
                            borderRadius: "6px",
                            display: "inline-block",
                            width:
                                params.value === "Yes" || params.value === "No"
                                    ? "44px"
                                    : "auto",
                            paddingLeft:
                                params.value === "Yes"
                                    ? "11px"
                                    : params.value === "No"
                                        ? "7px"
                                        : "0px",
                        }}
                    >
                        {params.value}
                    </Box>

                    <Box display={"flex"} justifyContent={"space-between"} alignItems={'center'}>
                        <ShowChartOutlinedIcon color="success" />
                        <Typography color={'#34C759'}>5%</Typography>
                    </Box>
                </Box>
            ),
        },
    ];

    const rows = [
        {
            id: "AG240001",
            name: "Saunav Ray",
            emp_status: "Active",
            department: "Science",
            promotion_eligibility: "Eligible",
            curr_grade: "B2",
            approved_for_upcoming_cycle: "Yes",
        },
        {
            id: "AG240002",
            name: "Saunav Ray",
            emp_status: "Active",
            department: "Science",
            promotion_eligibility: "Eligible",
            curr_grade: "B2",
            approved_for_upcoming_cycle: "Yes",
        },
        {
            id: "AG240003",
            name: "Saunav Ray",
            emp_status: "Active",
            department: "Science",
            promotion_eligibility: "Eligible",
            curr_grade: "B2",
            approved_for_upcoming_cycle: "Yes",
        }
    ];

    // table 2 columns
    const columns2 = [
        { field: "space", headerName: "", flex: 0.2 },
        { field: "grade", headerName: "Grade", flex: 0.5 },
        { field: "letter_release_date", headerName: "Letter Release Date", flex: 0.5 },
    ];

    // table 2 rows
    const rows2 = [
        { id: 1, grade: "A", letter_release_date: "3 Jul 2023" },
        { id: 2, grade: "B", letter_release_date: "3 Jul 2023" },
        { id: 3, grade: "C", letter_release_date: "3 Jul 2023" },
    ];


    return (
        <RevealCard>
            <div
                style={{
                    backgroundColor: "#E5F3FB",
                    display: "flex",
                    padding: "10px",
                    maxWidth: "730px",
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
                        onClick={() => navigate("/employee/manage/")}
                    >
                        Edit Information
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
                        onClick={() => navigate("/employee/manage/employee-account/")}
                    >
                        Employee Account
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
                        onClick={() => navigate("/employee/manage/id-card-pass/")}
                    >
                        ID Card
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
                        onClick={() => navigate("/employee/manage/department/")}
                    >
                        Department
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
                        onClick={() => navigate("/employee/manage/promotion/")}
                    >
                        Promotion
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
                        onClick={() => navigate("/employee/manage/probation")}
                    >
                        Probation
                    </button>
                </div>
            </div>

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
                            Promotion Letter Issuance
                        </Typography>
                    </Box>
                    <Divider />
                    <ToastContainer />

                    <Box px={2}>
                        <IncidentHeaderBanner text="Manual Issuance" />

                        <RevealCard>
                            <Bbox borderRadius={2} overflow={"hidden"} my={2}>
                                <ToastContainer />

                                <Box ml={3} mt={3} display={'flex'} alignItems={'center'} gap={4}>

                                    <ReignsSelect
                                        multiple
                                        items={employeeGrade}
                                        defaultValues={employeeGrade}
                                        onChange={setSelectedGrade}
                                        value={selectedGrade}
                                        label="Grade"
                                        sx={{ width: "20%" }}
                                    />

                                    <FormControl sx={{ width: "20%" }}>
                                        <InputLabel>Promotion Cycle</InputLabel>
                                        <Select
                                            label="Promotion Cycle"
                                            onChange={(e) =>
                                                setSelectedPromotionCycle(e.target.value)
                                            }
                                            value={selectedPromotionCycle}
                                        >
                                            {promotionCycle.map((month) => (
                                                <MenuItem key={month} value={month}>
                                                    {month}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <Button
                                        variant="contained"
                                    >
                                        Submit
                                    </Button>
                                </Box>

                                <Box m={2} mt={4} height="100%">
                                    <Typography my={2}>List of employees approved for promotion for upcoming cycle</Typography>
                                    <DataGrid
                                        rows={rows}
                                        columns={columns}
                                        initialState={{
                                            pagination: {
                                                paginationModel: { page: 0, pageSize: 5 },
                                            },
                                        }}
                                        pageSizeOptions={[5, 10, 20, 50]}
                                        checkboxSelection
                                    />
                                </Box>

                                {/* Buttons */}
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
                                        onClick={() => { toast.success("Promotion Letter Issued Successfully") }}
                                    >
                                        Issue Letter
                                    </Button>
                                </Box>
                            </Bbox>
                        </RevealCard >

                        <IncidentHeaderBanner text="Auto Issuance" />

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
                                        Auto Issue
                                    </Typography>
                                </Box>
                                <Divider />
                                <ToastContainer />

                                <Box p={2} sx={{ width: '100%', margin: 'auto' }}>
                                    <Box display={'flex'} alignItems={'center'}>
                                        <Typography>Pending grades where release date is yet to be set for upcoming cycle :</Typography>
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            sx={{ ml: 2 }}
                                            onClick={() => setSetReleaseDatePopup(true)}
                                        >Set Release Date</Button>
                                    </Box>

                                    <Box mt={2} mb={5} style={{ height: "100%" }} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} mx={'auto'}>
                                        <DataGrid
                                            rows={rows2}
                                            columns={columns2}
                                            initialState={{
                                                pagination: {
                                                    paginationModel: { page: 0, pageSize: 5 },
                                                },
                                            }}
                                            sx={{ width: "50%" }}
                                            pageSizeOptions={[10]}
                                        />

                                        <Box display="flex" justifyContent="flex-end" mt={2} mb={5} mr={2}>
                                            <Button
                                                color="secondary"
                                                variant="contained"
                                                onClick={() => setEditReleaseDatePopup(true)}
                                            >
                                                Edit
                                            </Button>
                                        </Box>


                                        <SetReleaseDate open={setReleaseDatePopup} close={() => setSetReleaseDatePopup(false)} />
                                        <EditReleaseDate open={editReleaseDatePopup} close={() => setEditReleaseDatePopup(false)} />

                                    </Box>
                                </Box>

                            </Bbox>
                        </RevealCard >


                        <IncidentHeaderBanner text="Promotion Letter Template" />

                        <RevealCard>
                            <Bbox borderRadius={2} overflow={"hidden"} my={1}>
                                <Divider />
                                <ToastContainer />

                                <Box display="flex" justifyContent="flex-start" mt={2} mb={2} mx={2}>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        sx={{ mr: 2 }}
                                        onClick={() => setSetTemplatePopup(true)}
                                    >
                                        Set Template
                                    </Button>
                                </Box>

                                <EditLetter open={setTemplatePopup} close={() => setSetTemplatePopup(false)} />
                            </Bbox>
                        </RevealCard>
                    </Box>
                </Bbox>
            </RevealCard >

            <EmployeePopup open={employeePopup} close={() => setEmployeePopup(false)} />

        </RevealCard>
    );
};

export default <PromotionLetterIssuance />;
