import { toast } from "react-toastify";
import {
    Box,
    Button,
    Divider,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Autocomplete,
    TextField,
} from "@mui/material";
import Bbox from "../../UiComponents/Bbox";
import RevealCard from "../../AnimationComponents/RevealCard";
import { DatePicker } from "@mui/x-date-pickers";
import IncidentHeaderBanner from "./Banner";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from 'react'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddNewHoliday from './popups/AddNewHoliday';
import Edit from './popups/Edit';

export default function Configure() {
    const [addNewHolidayPopup, setAddNewHolidayPopup] = useState(false);
    const [editHolidayPopup, setEditHolidayPopup] = useState(false);
    const [editPopup, setEditPopup] = useState(false);

    const columns = [
        { field: "space", headerName: "", flex: 0.2 },

        {
            field: "id",
            headerName: "Date",
            flex: 1
        },
        {
            field: "day",
            headerName: "Day",
            flex: 1
        },
        {
            field: "occasion",
            headerName: "Occasion",
            flex: 1
        },
        {
            field: "type",
            headerName: "Type",
            flex: 1
        },
        {
            field: "options",
            headerName: "",
            flex: 0.4,
            renderCell: () => <Box>< MoreVertIcon /></Box>
        }
    ];

    const rows = [
        { id: "4 Mar 2024", day: "Tuesday", occasion: "Birthday", type: "Personal" },
        { id: "4 Mar 2024", day: "Wednesday", occasion: "Christmas", type: "Holiday" },
        { id: "4 Mar 2024", day: "Thursday", occasion: "New Year's Day", type: "Holiday" },
    ];



    const columns2 = [
        { field: "space", headerName: "", flex: 0.2 },
        {
            field: "id",
            headerName: "Leave Allocation",
            flex: 1
        },
        {
            field: "credit_cycle",
            headerName: "Credit Cycle",
            flex: 1
        },
        {
            field: "yearly_carry_forward_limit",
            headerName: "Yearly Carry Forward Limit",
            flex: 1
        },
        {
            field: "leave_cap",
            headerName: "Start-of-year Leave Cap",
            flex: 1
        },
        {
            field: "options",
            headerName: "",
            flex: 0.4,
            renderCell: () => <Box>< MoreVertIcon /></Box>
        }
    ];

    const rows2 = [
        { id: "Annual Leave", credit_cycle: "Yearly", yearly_carry_forward_limit: 10, leave_cap: 20 },
        { id: "Sick Leave", credit_cycle: "Monthly", yearly_carry_forward_limit: 5, leave_cap: 15 },
        { id: "Maternity Leave", credit_cycle: "One-time", yearly_carry_forward_limit: 0, leave_cap: 90 },
    ];

    const curYear = new Date().getFullYear();
    const academicYear = `${curYear}-${(curYear + 1).toString().slice(2, 4)}`;
    const [acYear, setAcYear] = useState(academicYear);

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
                            Set Holiday List
                        </Typography>


                        <FormControl>
                            <InputLabel>Academic Year</InputLabel>
                            <Select
                                label="Academic Year"
                                value={acYear}
                                onChange={(e) => setAcYear(e.target.value)}
                            >
                                <MenuItem value={"2021-22"}>2021-22</MenuItem>
                                <MenuItem value={"2023-24"}>2023-24</MenuItem>
                                <MenuItem value={"2024-25"}>2024-25</MenuItem>
                                <MenuItem value={"2025-26"}>2025-26</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Divider />

                    <Box mx={4} my={4}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                            sx={{ mt: 2 }}
                        />
                    </Box>

                    <Box marginY={4} mx={4} display={'flex'} justifyContent={'space-between'}>
                        <Button variant="contained" color="primary" width="auto" onClick={() => setAddNewHolidayPopup(true)}><AddCircleOutlineOutlinedIcon sx={{ mr: 1 }} />Add New</Button>
                        <Button
                            color="primary"
                            variant="outlined"
                            onClick={() => setEditPopup(true)}
                        >
                            Download
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
                            Leave Report
                        </Typography>
                    </Box>

                    <Divider />

                    {/* table */}
                    <Box mt={2} mb={5} style={{ height: "100%" }} mx={2}>
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


                    <Box mx={4} my={4}>
                        <DataGrid
                            rows={rows2}
                            columns={columns2}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                            sx={{ mt: 2 }}
                        />
                    </Box>

                    <AddNewHoliday open={addNewHolidayPopup} close={() => setAddNewHolidayPopup(false)} />
                    {/* <AddNewHoliday open={editHolidayPopup} close={() => setEditHolidayPopup(false)} /> */}
                    <AddNewHoliday open={editPopup} close={() => setEditPopup(false)} />
                </Bbox>
            </RevealCard >
        </>
    )
}