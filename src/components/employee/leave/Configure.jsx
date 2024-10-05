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
    IconButton,
    Menu
} from "@mui/material";
import Bbox from "../../UiComponents/Bbox";
import RevealCard from "../../AnimationComponents/RevealCard";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from 'react'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AddNewHoliday from './popups/AddNewHoliday';
import EditHoliday from './popups/EditHoliday';
import RuleEdit from './popups/RuleEdit';
import useClasses from "@/hooks/useClasses";
import useEmployees from "@/hooks/useEmployees";
import { MoreVert as MoreVertIcon } from '@mui/icons-material';

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

export default function Configure() {
    const { curYear, acYear } = useClasses();
    const [academicYear, setAcademicYear] = useState(curYear);

    const { employeeCategories } = useEmployees();
    const [selectedCategory, setSelectedCategory] = useState('');

    const [addNewHolidayPopup, setAddNewHolidayPopup] = useState(false);
    const [editHolidayPopup, setEditHolidayPopup] = useState(false);
    const [ruleEdit, setRuleEdit] = useState(false);

    const columns = [
        { field: "space", headerName: "", flex: 0.2 },
        {
            field: "date",
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
            field: "actions",
            headerName: "Actions",
            flex: 0.5,
            renderCell: (params) => (
                <ActionCell params={params} onEdit={handleEdit} onDelete={handleDelete} />
            ),
        },
    ];

    const [rows, setRows] = useState([
        { id: 1, date: "4 Mar 2024", day: "Tuesday", occasion: "Birthday", type: "Personal" },
        { id: 2, date: "4 Mar 2024", day: "Wednesday", occasion: "Christmas", type: "Holiday" },
        { id: 3, date: "4 Mar 2024", day: "Thursday", occasion: "New Year's Day", type: "Holiday" },
    ]);

    const columns2 = [
        { field: "space", headerName: "", flex: 0.2 },
        {
            field: "leave_allocation",
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
            field: "actions",
            headerName: "Actions",
            flex: 0.5,
            renderCell: (params) => (
                <ActionCell params={params} onEdit={handleEdit2} onDelete={handleDelete2} />
            ),
        },
    ];

    const [rows2, setRows2] = useState([
        { id: 1, leave_allocation: "Annual Leave", credit_cycle: "Yearly", yearly_carry_forward_limit: 10, leave_cap: 20 },
        { id: 2, leave_allocation: "Sick Leave", credit_cycle: "Monthly", yearly_carry_forward_limit: 5, leave_cap: 15 },
        { id: 3, leave_allocation: "Maternity Leave", credit_cycle: "One-time", yearly_carry_forward_limit: 0, leave_cap: 90 },
    ]);

    const handleEdit = (id) => {
        console.log(`Edit row with id: ${id}`);
        setEditHolidayPopup(true);
    };

    const handleDelete = (id) => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    };

    const handleEdit2 = (id) => {
        console.log(`Edit row with id: ${id}`);
        setRuleEdit(true);
    };

    const handleDelete2 = (id) => {
        setRows2((prevRows) => prevRows.filter((row) => row.id !== id));
    };

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


                        <FormControl sx={{ width: "15%" }}>
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
                            onClick={() => setAddNewHolidayPopup(true)}
                        >
                            Download
                        </Button>
                    </Box>
                </Bbox>
            </RevealCard >

            <RevealCard>
                <Bbox borderRadius={2} overflow={"hidden"} mt={2}>
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


                    <Box mx={2} my={2}>
                        <FormControl sx={{ width: "30%" }} >
                            <InputLabel>Category</InputLabel>
                            <Select
                                label="Category"
                                onChange={(e) =>
                                    setSelectedCategory(e.target.value)
                                }
                                value={selectedCategory}
                            >
                                {employeeCategories.map((category) => (
                                    <MenuItem key={category} value={category}>
                                        {category}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>


                        <Box my={2}>
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
                    </Box>

                    <AddNewHoliday open={addNewHolidayPopup} close={() => setAddNewHolidayPopup(false)} />
                    <EditHoliday open={editHolidayPopup} close={() => setEditHolidayPopup(false)} />
                    <RuleEdit open={ruleEdit} close={() => setRuleEdit(false)} />
                </Bbox>
            </RevealCard >
        </>
    )
}