import { useState } from "react";
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
} from "@mui/material";
import Bbox from "../../UiComponents/Bbox";
import ReignsSelect from "../../UiComponents/ReignsSelect";
import RevealCard from "../../AnimationComponents/RevealCard";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import IncidentHeaderBanner from "./Banner";
import { DataGrid } from "@mui/x-data-grid";
import useEmployees from '@/hooks/useEmployees';
import LeaveRequestID from "./LeaveRequestID";
import EmployeePopup from '../EmployeePopup';

export default function Record() {

    const { employeeManagementDepartment, employeeTeachingDepartment, employeeSupportStaffDepartment } = useEmployees();

    const [employeeDepartment, setEmployeeDepartment] = useState([...employeeManagementDepartment, ...employeeTeachingDepartment, ...employeeSupportStaffDepartment]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [leaveRequestPopup, setLeaveRequestPopup] = useState(false);

    const [employeeIDPopup, setEmployeeIDPopup] = useState(false);

    const columns = [
        { field: "space", headerName: "", flex: 0.2 },
        {
            field: "id",
            headerName: "Leave Request ID",
            flex: 0.6,
            renderCell: (params) => (
                <Typography sx={{ cursor: "pointer", color: "primary.main" }} onClick={() => setLeaveRequestPopup(true)}>
                    {params.value}
                </Typography>
            ),
        },
        {
            field: "leave_type",
            headerName: "Leave Type",
            flex: 1
        },
        {
            field: "leave_duration",
            headerName: "Leave Duration",
            flex: 0.8
        },
        {
            field: "no_of_working_days",
            headerName: "No. of Working\n Days",
            renderHeader: (params) => <MultilineHeader colDef={params.colDef} />,
            flex: 0.5
        },
        {
            field: "status",
            headerName: "Status",
            flex: 0.4,
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
        {
            field: "approver_details",
            headerName: "Approver Details ",
            flex: 1,
            renderCell: (params) => (
                <Box display={'flex'}>
                    <Typography>
                    </Typography>
                    {params.value.name}
                    <Typography sx={{ cursor: "pointer", color: "primary.main" }} onClick={() => setEmployeeIDPopup(true)}>
                        ({params.value.id})
                    </Typography>
                </Box>

            ),
        },
    ];

    const MultilineHeader = ({ colDef }) => {
        return (
            <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.4', fontWeight: '600' }}>
                {colDef.headerName}
            </div>
        );
    };

    const rows = [
        {
            id: "LR001",
            leave_type: "Sick Leave",
            leave_duration: "4 Mar 2024 - 10 Mar 2024",
            no_of_working_days: 3,
            status: "Active",
            approver_details: {
                name: "John Doe",
                id: "AUG123456",
            },
        },
        {
            id: "LR002",
            leave_type: "Annual Leave",
            leave_duration: "4 Mar 2024 - 10 Mar 2024",
            no_of_working_days: 10,
            status: "Inactive",
            approver_details: {
                name: "Alice Johnson",
                id: "AUG123457",
            }
        },
        {
            id: "LR003",
            leave_type: "Maternity Leave",
            leave_duration: "4 Mar 2024 - 10 Mar 2024",
            no_of_working_days: 30,
            status: "Active",
            approver_details: {
                name: "Jane Smith",
                id: "AUG123458",
            },
        },
    ];

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
                            Individual Leave Details
                        </Typography>
                    </Box>

                    <Divider />


                    <Box px={2}>
                        <Box display={"flex"} my={2} gap={1} sx={{ width: '35%', marginY: '16px' }} >
                            <FormControl fullWidth>
                                <InputLabel>Search by Employee Name or Employee ID</InputLabel>
                                <Select
                                    label="Search by Employee Name or Employee ID"
                                    // value={selectedLibraryCard}
                                    required
                                // onChange={(e) => setSelectedLibraryCard(e.target.value)}
                                >
                                    {/* {
								libraryCardNumbers?.map((type) => (
									<MenuItem key={type} value={type}>{type}</MenuItem>
								))
							} */}
                                </Select>
                            </FormControl>
                        </Box>

                        <Box display="flex" flexDirection="column" gap={2} p={2} justifyContent="space-between" width={"100%"} margin="auto" alignItems="center" mt={4} mb={2} sx={{
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            borderRadius: '8px',
                            background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.6) 20.84%, rgba(229, 243, 251, 0.6) 101.46%)'

                        }}>

                            <Box display="flex" justifyContent="center" width="100%" alignItems="flex-start" gap={10}>
                                <Box display="flex" gap={0} width="30%" justifyContent="space-between" >
                                    <Box display="flex" flexDirection="column" justifyContent="space-between" >
                                        <Typography mb={2}>Employee ID</Typography>
                                        <Typography mb={2}>Employee Name</Typography>
                                        <Typography mb={1}>Grade</Typography>
                                    </Box>
                                    <Box display="flex" flexDirection="column" justifyContent="space-between">
                                        <Typography fontWeight="medium" ml={1} mb={2}>: EMP1234</Typography>
                                        <Typography fontWeight="medium" ml={1} mb={2}>: Priya Naskar</Typography>
                                        <Typography fontWeight="medium" ml={1} mb={1}>: B2</Typography>
                                    </Box>
                                </Box>
                                <Box display="flex" gap={0} width="30%" justifyContent="space-between" alignItems={"flex-start"}>
                                    <Box display="flex" flexDirection="column" justifyContent="space-between">
                                        <Typography mb={2}>Employee Type</Typography>
                                        <Typography mb={2}>Status</Typography>
                                        <Typography mb={2}>Department</Typography>
                                    </Box>
                                    <Box display="flex" flexDirection="column" justifyContent="space-between">
                                        <Typography fontWeight="medium" ml={1} mb={2}>: Teaching Staff</Typography>

                                        <Box display={'flex'} justifyContent={'start'} alignItems={'center'} ml={1} mb={2}>
                                            <Typography fontWeight="medium">:</Typography>
                                            <Typography fontWeight="medium" ml={1} bgcolor={'#C6F6D5'} paddingX={'8px'} borderRadius={'6px'} fontSize={'0.8rem'}>Active</Typography>
                                        </Box>
                                    </Box>
                                    <Typography fontWeight="medium" ml={1} mb={2}>: Physics</Typography>
                                </Box>
                                <Box display="flex" gap={0} width="30%" justifyContent="space-between" >
                                    <Box display="flex" flexDirection="column" justifyContent="space-between" >
                                        <Typography mb={1}>Supervisor</Typography>
                                    </Box>
                                    <Box display="flex" flexDirection="column" justifyContent="space-between">
                                        <Typography fontWeight="medium" ml={1} mb={1}>: Ratan Basak (AUG5658965)</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>


                        <Box>
                            <IncidentHeaderBanner text="Leave Balance" />
                            <Box display="flex" justifyContent="space-between" my={2}>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography>Privilege Leave :</Typography>
                                    <Typography fontWeight={'600'}>18</Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography>Casual Leave :</Typography>
                                    <Typography fontWeight={'600'}>18</Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography>Sick Leave :</Typography>
                                    <Typography fontWeight={'600'}>18</Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography>Optional Holiday :</Typography>
                                    <Typography fontWeight={'600'}>18</Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Box>
                            <IncidentHeaderBanner text={"Leave History"} />
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
                    </Box >
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

                    <Box px={2}>

                        <ReignsSelect
                            multiple
                            items={employeeDepartment}
                            defaultValues={employeeDepartment}
                            onChange={setSelectedDepartment}
                            value={selectedDepartment}
                            label="Department"
                            sx={{ mb: 2, mt: 2, width: '40%' }}
                        />

                        <Box>
                            <Typography mb={1}>Leave Duration</Typography>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Box display="flex" gap={2}
                                    sx={{ width: '40%' }}
                                >
                                    <DatePicker
                                        label="Start Date"
                                        onChange={(newValue) => setStartDate(newValue)}
                                        value={startDate}
                                        format="DD MMM YYYY"
                                        slotProps={{ textField: { fullWidth: true } }}
                                    />
                                    <DatePicker
                                        label="End Date"
                                        minDate={startDate}
                                        value={endDate}
                                        onChange={(newValue) => setEndDate(newValue)}
                                        format="DD MMM YYYY"
                                        slotProps={{ textField: { fullWidth: true } }}
                                    />
                                </Box>
                            </LocalizationProvider>
                        </Box>

                        <Box display="flex" justifyContent="center" mt={8} mb={5} mr={2}>
                            <Button
                                color="primary"
                                variant="contained"
                                sx={{ mr: 2 }}
                                onClick={() => toast.success("Report Downloaded")}
                            >
                                Download
                            </Button>
                        </Box>
                    </Box>
                </Bbox>
            </RevealCard >

            <LeaveRequestID open={leaveRequestPopup} close={() => { setLeaveRequestPopup(false) }} />
            <EmployeePopup open={employeeIDPopup} close={() => setEmployeeIDPopup(false)} />
        </>
    )
}