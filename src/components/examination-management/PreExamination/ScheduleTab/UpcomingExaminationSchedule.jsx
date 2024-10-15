import { Box, Divider, Typography } from "@mui/material";
import { useState } from "react";
import Bbox from "@/components/UiComponents/Bbox";
import useClasses from "@/hooks/useClasses";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
    Menu,
    Button
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import EmployeePopup from "@/components/employee/EmployeePopup";

const ActionCell = ({ params, onEdit, onDelete }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        onEdit(params.id);
        handleClose();
    };

    const handleDelete = () => {
        onDelete(params.id);
        handleClose();
    };

    return (
        <>
            <IconButton onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
        </>
    );
};

const UpcomingExaminationSchedule = () => {
    const { classes, acYear, curYear } = useClasses();
    const [academicYear, setAcademicYear] = useState(curYear);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedExam, setSelectedExam] = useState('');

    const [addPopup, setAddPopup] = useState(false);
    const [editPopup, setEditPopup] = useState(false);
    const [postponePopup, setPostponePopup] = useState(false);
    const [employeePopup, setEmployeePopup] = useState(false);

    const exams = ['Mid Term', 'Final Term', 'Unit Test 1', 'Unit Test 2'];

    const columns = [
        {
            field: "date", headerName: "Date", flex: 0.7,
        },
        { field: "subject", headerName: "Subject", flex: 0.9 },
        {
            field: "time_slot", headerName: "Time Slot", flex: 0.9,
        },
        {
            field: "invigilator", headerName: "Invigilator", flex: 1.5,
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
        { field: "sectionA", headerName: "Section A", flex: 1 },
        { field: "sectionB", headerName: "Section B", flex: 1 },
        { field: "sectionC", headerName: "Section C", flex: 1 },
        {
            field: "actions",
            headerName: "Actions",
            flex: 0.5,
            renderCell: (params) => (
                <ActionCell params={params} onEdit={handleEdit} onDelete={handleDelete} />
            ),
        },
    ];

    const [rows, setRows] = useState([
        { id: 1, date: "4 Mar 2024", subject: "Mathematics", time_slot: "10.00am-12.00pm", invigilator: "Rupak Roy (AUD236547)", sectionA: "Kolkata", sectionB: "Kolkata", sectionC: "Kolkata" },
        { id: 2, date: "5 Mar 2024", subject: "Physics", time_slot: "10.00am-12.00pm", invigilator: "Rupak Roy (AUD236547)", sectionA: "Kolkata", sectionB: "Kolkata", sectionC: "Kolkata" },
        { id: 3, date: "6 Mar 2024", subject: "Chemistry", time_slot: "10.00am-12.00pm", invigilator: "Rupak Roy (AUD236547)", sectionA: "Kolkata", sectionB: "Kolkata", sectionC: "Kolkata" },
    ]);

    const handleEdit = (id) => {
        console.log(`Edit row with id: ${id}`);
        setEditPopup(true);
    };

    const handleDelete = (id) => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    };

    return (
        <Bbox borderRadius={2} overflow={"hidden"}>
            <Box bgcolor={"white"} py={1.3} px={2} borderRadius={2} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography fontWeight={"700"} fontSize={"1.1rem"}>
                    Upcoming Examination Schedule
                </Typography>

                <FormControl sx={{ width: "20%" }}>
                    <InputLabel>Academic Year</InputLabel>
                    <Select
                        label="Academic Year"
                        onChange={(e) =>
                            setAcademicYear(e.target.value)
                        }
                        value={academicYear}
                        size="small"
                    >
                        {acYear.map((year) => (
                            <MenuItem key={year} value={year}>
                                {year}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <Divider />
            <Box
                p={2}
            >
                <Typography>Upcoming Examination Schedule for all classes</Typography>
                <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="flex-start"
                    justifyContent="flex-start"
                    py={2}
                    mt={2}
                    gap={4}
                    sx={{ width: "100%" }}
                >

                    <FormControl sx={{ width: "30%" }}>
                        <InputLabel>Examination Name</InputLabel>
                        <Select
                            label="Examination Name"
                            onChange={(e) =>
                                setSelectedExam(e.target.value)
                            }
                            value={selectedExam}
                        >
                            {exams.map((exam) => (
                                <MenuItem key={exam} value={exam}>
                                    {exam}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl sx={{ width: "30%" }}>
                        <InputLabel>Select Class</InputLabel>
                        <Select
                            label="Select Class"
                            onChange={(e) =>
                                setSelectedClass(e.target.value)
                            }
                            value={selectedClass}
                        >
                            {classes.map(cls => (
                                <MenuItem key={cls} value={cls}>
                                    {cls}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Typography fontWeight={'600'}>Class I - Mid Term 2024-25</Typography>
                <Typography mt={2}>Unpublished: ⚠️</Typography>

                <Box style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Box
                        my={2}
                        style={{
                            backgroundColor: "#E1EEFB",
                            border: "1px solid #3381A5",
                            borderRadius: "16px",
                            width: 120,
                            height: 25,
                            padding: "4px 14px",
                        }}
                    >
                        <Typography
                            style={{
                                fontSize: "12px",
                                fontWeight: "400",
                                color: "#3381A5",
                            }}
                        >
                            {rows.length} Results Found
                        </Typography>
                    </Box>
                </Box>

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
                            groupId: 'venue',
                            headerName: 'Venue',
                            headerAlign: 'center',
                            children: [
                                { field: 'sectionA' },
                                { field: 'sectionB' },
                                { field: 'sectionC' },
                            ],
                        },
                    ]}
                    experimentalFeatures={{
                        columnGrouping: true
                    }}
                />

                <Box
                    display="flex"
                    justifyContent="flex-end"
                    marginY={2}
                    gap={2}
                >
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => { setAddPopup(true) }}
                    >
                        Add
                    </Button>

                    <Button
                        color="primary"
                        variant="outlined"
                        onClick={() => { setPostponePopup(true) }}
                    >
                        Postpone
                    </Button>
                </Box>

                <EmployeePopup open={employeePopup} close={() => setEmployeePopup(false)} />
            </Box >
        </Bbox >
    );
};

export default UpcomingExaminationSchedule;
