import { toast } from "react-toastify";
import {
    Box,
    Button,
    Divider,
    Typography,
    Autocomplete,
    TextField,
} from "@mui/material";
import Bbox from "../../UiComponents/Bbox";
import RevealCard from "../../AnimationComponents/RevealCard";
import { DatePicker } from "@mui/x-date-pickers";
import IncidentHeaderBanner from "./Banner";
import { DataGrid } from "@mui/x-data-grid";

export default function Record() {

    const columns = [
        {
            field: "id",
            headerName: "Leave Request ID",
            flex: 1
        },
        {
            field: "leave_type",
            headerName: "Leave Type",
            flex: 1
        },
        {
            field: "leave_duration",
            headerName: "Leave Duration",
            flex: 1
        },
        {
            field: "no_of_working_days",
            headerName: "No. of Working Days",
            flex: 1
        },
        {
            field: "status",
            headerName: "Status",
            flex: 1,
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
            flex: 1
        },
    ];

    const rows = [
        {
            id: "LR001",
            leave_type: "Sick Leave",
            leave_duration: "4 Mar 2024 - 10 Mar 2024",
            no_of_working_days: 3,
            status: "Active",
            approver_details: "John Doe",
        },
        {
            id: "LR002",
            leave_type: "Annual Leave",
            leave_duration: "4 Mar 2024 - 10 Mar 2024",
            no_of_working_days: 10,
            status: "Inactive",
            approver_details: "Jane Smith",
        },
        {
            id: "LR003",
            leave_type: "Maternity Leave",
            leave_duration: "4 Mar 2024 - 10 Mar 2024",
            no_of_working_days: 30,
            status: "Active",
            approver_details: "Alice Johnson",
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

                    <Box display="flex" flexDirection="column" gap={2} p={2} justifyContent="space-between" width={"95%"} margin="auto" alignItems="center" my={4} sx={{
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        borderRadius: '8px',
                        background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.6) 20.84%, rgba(229, 243, 251, 0.6) 101.46%)'

                    }}>

                        <Box display="flex" justifyContent="center" width="100%" alignItems="flex-start" gap={10}>
                            <Box display="flex" gap={0} width="50%" justifyContent="space-between" >
                                <Box display="flex" flexDirection="column" justifyContent="space-between" >
                                    <Typography mb={2}>Employee Name</Typography>
                                    <Typography mb={1}>Grade</Typography>
                                </Box>
                                <Box display="flex" flexDirection="column" justifyContent="space-between">
                                    <Typography fontWeight="medium" ml={1} mb={2}>: Priya Naskar</Typography>
                                    <Typography fontWeight="medium" ml={1} mb={1}>: B2</Typography>
                                </Box>
                            </Box>
                            <Box display="flex" gap={0} width="50%" justifyContent="space-between" alignItems={"flex-start"}>
                                <Box display="flex" flexDirection="column" justifyContent="space-between">
                                    <Typography mb={2}>Employee Type</Typography>
                                    <Typography mb={1}>Status</Typography>
                                </Box>
                                <Box display="flex" flexDirection="column" justifyContent="space-between">
                                    <Typography fontWeight="medium" ml={1} mb={2}>: Teaching Staff</Typography>
                                    <Typography fontWeight="medium" ml={1} mb={1}>: Active</Typography>
                                </Box>
                            </Box>
                            <Box display="flex" gap={0} width="50%" justifyContent="space-between" >
                                <Box display="flex" flexDirection="column" justifyContent="space-between" >
                                    <Typography mb={2}>Department</Typography>
                                    <Typography mb={1}>Supervisor</Typography>
                                </Box>
                                <Box display="flex" flexDirection="column" justifyContent="space-between">
                                    <Typography fontWeight="medium" ml={1} mb={2}>: Physics</Typography>
                                    <Typography fontWeight="medium" ml={1} mb={1}>: Ratan Basak (AUG5658965)</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>


                    <Box mx={4}>
                        <IncidentHeaderBanner text="Leave Balance" />
                        <Box display="flex" justifyContent="space-between" my={1}>
                            <Box display="flex" justifyContent="space-between">
                                <Typography>Privilege Leave :</Typography>
                                <Typography>18</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between">
                                <Typography>Privilege Leave :</Typography>
                                <Typography>18</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between">
                                <Typography>Privilege Leave :</Typography>
                                <Typography>18</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between">
                                <Typography>Privilege Leave :</Typography>
                                <Typography>18</Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box mx={4} my={4}>
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

                    <Box mx={2}>
                        <Typography mb={1}>Leave Duration</Typography>

                        <Box display={"flex"} gap={2}>
                            <DatePicker
                                label="Start Date"
                                // onChange={(e) => setStartDate(e)}
                                // minDate={dayjs()}
                                format="DD MMM YYYY"
                            />
                            <DatePicker
                                format="DD MMM YYYY"
                                label="End Date"
                            // minDate={startDate}
                            // onChange={(e) => setEndDate(e)}
                            />
                        </Box>
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
                </Bbox>
            </RevealCard >
        </>
    )
}