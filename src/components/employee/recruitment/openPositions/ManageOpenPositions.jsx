import RevealCard from "../../../AnimationComponents/RevealCard";
import Bbox from "../../../UiComponents/Bbox";
import {
    Box,
    Button,
    Divider,
    Typography,
    IconButton,
    Menu,
    MenuItem
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { DataGrid } from "@mui/x-data-grid";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import NewJobRequirement from "../popup/NewJobRequirement";
import EditJobRequirement from "../popup/EditJobRequirement";
import ApplicationID from "../popup/ApplicationID";
import { useState, useEffect } from "react";
import useEmployees from '@/hooks/useEmployees';
import ReignsSelect from "@/components/UiComponents/ReignsSelect";
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

function ManageOpenPositions() {
    const { employeeType, employeeManagementDepartment, employeeTeachingDepartment, employeeSupportStaffDepartment, employeeGrade } = useEmployees();

    const [selectedEmployeeType, setSelectedEmployeeType] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedGrade, setSelectedGrade] = useState('');
    const [employeeDepartment, setEmployeeDepartment] = useState([...employeeManagementDepartment, ...employeeTeachingDepartment, ...employeeSupportStaffDepartment]);

    const [rows, setRows] = useState([
        {
            id: 1,
            emp_type: "Full-Time",
            department: "Engineering",
            grade: "A",
            role: "Software Engineer",
            class_scope: "Global",
            open_positions: 5,
            comments: "Urgent hiring",
        },
        {
            id: 2,
            emp_type: "Part-Time",
            department: "Marketing",
            grade: "B",
            role: "Marketing Specialist",
            class_scope: "Local",
            open_positions: 2,
            comments: "New project",
        },
        {
            id: 3,
            emp_type: "Contract",
            department: "HR",
            grade: "C",
            role: "HR Manager",
            class_scope: "Regional",
            open_positions: 1,
            comments: "Replacement",
        }
    ]);

    const [newJobPopup, setNewJobPopup] = useState(false);
    const [editJobPopup, setEditJobPopup] = useState(false);
    const [jobIdPopup, setJobIdPopup] = useState(false);

    useEffect(() => {
        console.log(selectedEmployeeType);
        let departments = [];

        if (selectedEmployeeType === '') {
            return;
        }

        selectedEmployeeType.forEach(type => {
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
    }, [selectedEmployeeType]);

    const columns = [
        {
            field: "id", headerName: "Job ID", flex: 0.8,
            renderCell: (params) => (
                <Typography
                    component="span"
                    sx={{ color: "primary.main", cursor: "pointer" }}
                    onClick={() => setJobIdPopup(true)}
                >
                    {params.id}
                </Typography>
            ),
        },
        { field: "emp_type", headerName: "Employee Type", flex: 1 },
        { field: "department", headerName: "Department", flex: 1 },
        { field: "grade", headerName: "Grade", flex: 1 },
        { field: "role", headerName: "Role", flex: 1 },
        { field: "class_scope", headerName: "Class Scope", flex: 1 },
        { field: "open_positions", headerName: "Open Positions", flex: 0.8 },
        { field: "comments", headerName: "Comments", flex: 1 },
        {
            field: "actions",
            headerName: "Actions",
            flex: 0.5,
            renderCell: (params) => (
                <ActionCell params={params} onEdit={handleEdit} onDelete={handleDelete} />
            ),
        },
    ];

    const handleEdit = (id) => {
        console.log(`Edit row with id: ${id}`);
        setEditJobPopup(true);
    };

    const handleDelete = (id) => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    };
    return (
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
                        Manage Open Position(s)
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
                        <ReignsSelect
                            items={employeeType}
                            multiple
                            label="Employee Type"
                            defaultValues={employeeType}
                            onChange={setSelectedEmployeeType}
                            value={selectedEmployeeType}
                            sx={{
                                width: '20%'
                            }}
                        />
                        <ReignsSelect
                            items={employeeDepartment}
                            multiple
                            defaultValues={employeeDepartment}
                            onChange={setSelectedDepartment}
                            value={selectedDepartment}
                            label="Department"
                            sx={{
                                width: '20%'
                            }}
                        />
                        <ReignsSelect
                            items={employeeGrade}
                            multiple
                            label="Grade"
                            defaultValues={employeeGrade}
                            onChange={setSelectedGrade}
                            value={selectedGrade}
                            sx={{
                                width: '20%'
                            }}
                        />
                        <Button variant="contained">Submit</Button>
                    </Box>

                    {/* total number of results found */}
                    <Box pr={2} mt={1} display="flex" justifyContent="flex-end">
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
                                    groupId: "req_details",
                                    headerName: "Requirement Details",
                                    headerAlign: 'center',
                                    children: [
                                        { field: "emp_type" },
                                        { field: "department" },
                                        { field: "grade" },
                                        { field: "role" },
                                        { field: "class_scope" },
                                        { field: "open_positions" },
                                        { field: "comments" },
                                    ],
                                },
                            ]}
                            disableRowSelectionOnClick
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                            onClick={() => setNewJobPopup(true)}
                        >
                            <AddCircleOutlineOutlinedIcon sx={{ mr: 1 }} />
                            Add New
                        </Button>
                    </Box>

                    <NewJobRequirement open={newJobPopup} close={() => setNewJobPopup(false)} />
                    <EditJobRequirement open={editJobPopup} close={() => setEditJobPopup(false)} />
                    <ApplicationID open={jobIdPopup} close={() => setJobIdPopup(false)} />

                </Box>
            </Bbox>
        </RevealCard>
    );
}

export default ManageOpenPositions;