import React from "react";
import {
    Box,
    Button,
    Dialog,
    TextField,
    Autocomplete,
    IconButton,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ToastContainer, toast } from "react-toastify";
import Bbox from "../../../UiComponents/Bbox";
import RevealCard from "../../../AnimationComponents/RevealCard";
import IncidentHeaderBanner from "../Banner";
import { DataGrid } from "@mui/x-data-grid";
import { DatePicker } from "@mui/x-date-pickers";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

const ApplyLeave = ({ open, close }) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
            field: "no_of_working_days",
            headerName: "No. of Working Days",
            flex: 1
        },
        {
            field: "leave_duration",
            headerName: "Leave Period",
            flex: 1
        },
        {
            field: "documents", headerName: "Supporting Documents",
            flex: 1,
            renderCell: (params) => (
                <Box
                    style={{
                        marginLeft: "24px",
                    }}
                >
                    <DescriptionOutlinedIcon />
                    {params.value}
                </Box>
            ),
        },
        {
            field: "status",
            headerName: "Approval Status",
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
        <Dialog
            fullWidth={false}
            PaperProps={{
                sx: {
                    maxHeight: "90%",
                    width: "80%",
                },
            }}
            maxWidth=""
            open={open}
            onClose={() => close()}
            disableEnforceFocus={true}
        >
            <Box >
                <Box
                    p={1}
                    py={1}
                    bgcolor={"primary.main"}
                    color={"white"}
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Box />
                    <Typography fontSize={"1.1rem"} textAlign={"center"}>
                        Apply Leave
                    </Typography>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={close}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>


                <Box display="flex" flexDirection="column" gap={2} p={2} justifyContent="space-between" width={"95%"} margin="auto" alignItems="center" my={4} sx={{
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                    background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.6) 20.84%, rgba(229, 243, 251, 0.6) 101.46%)'

                }}>

                    <Box display="flex" justifyContent="center" width="100%" alignItems="flex-start" gap={8}>
                        <Box display="flex" gap={0} width="45%" justifyContent="space-between" >
                            <Box display="flex" flexDirection="column" justifyContent="space-between" >
                                <Typography mb={2}>Employee Name</Typography>
                                <Typography mb={1}>Supervisor</Typography>
                            </Box>
                            <Box display="flex" flexDirection="column" justifyContent="space-between">
                                <Typography fontWeight="medium" ml={1} mb={2}>: Priya Naskar</Typography>
                                <Typography fontWeight="medium" ml={1} mb={1}>: Ratan Basak (AUG5658965)</Typography>
                            </Box>
                        </Box>
                        <Box display="flex" gap={0} width="30%" justifyContent="space-between" alignItems={"flex-start"}>
                            <Box display="flex" flexDirection="column" justifyContent="space-between">
                                <Typography mb={2}>Department</Typography>
                                <Typography mb={1}>Academic Year</Typography>
                            </Box>
                            <Box display="flex" flexDirection="column" justifyContent="space-between">
                                <Typography fontWeight="medium" ml={1} mb={2}>: Science</Typography>
                                <Typography fontWeight="medium" ml={1} mb={1}>: 2024-25</Typography>
                            </Box>
                        </Box>
                        <Box display="flex" gap={0} width="30%" justifyContent="space-evenly" >
                            <Box display="flex" flexDirection="column" justifyContent="space-between" >
                                <Typography mb={2}>Status</Typography>
                            </Box>
                            <Box display="flex" flexDirection="column" justifyContent="space-between">
                                <Typography fontWeight="medium" ml={1} mb={2}>: Active</Typography>
                            </Box>
                        </Box>
                        <Box width="10%" />
                    </Box>
                </Box>


                <RevealCard mx={4}>
                    <Bbox borderRadius={2} overflow={"hidden"} mx={4}>
                        <Box mx={4}>
                            <IncidentHeaderBanner text="List of Applied Leaves" />
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


                        <Box mx={4}>
                            <IncidentHeaderBanner text="Leave Balance" />
                            <Box display="flex" justifyContent="space-evenly" my={2} mb={4} border={"1px solid black"} borderRadius={1} py={1}>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography>Privilege Leave :</Typography>
                                    <Typography fontWeight={'medium'} ml={2}>18</Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography>Casual Leave :</Typography>
                                    <Typography fontWeight={'medium'} ml={2}>18</Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography>Sick Leave :</Typography>
                                    <Typography fontWeight={'medium'} ml={2}>18</Typography>
                                </Box>
                                <Box display="flex" justifyContent="space-between">
                                    <Typography>Optional Holiday :</Typography>
                                    <Typography fontWeight={'medium'} ml={2}>18</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Bbox>
                </RevealCard>


                <Box mx={4} my={4}>
                    <Box sx={{ bgcolor: '#DAF3FE', borderRadius: '4px', textAlign: 'center', padding: '8px' }}>
                        <Typography>Apply for New Leave</Typography>
                    </Box>

                    <Box display={'flex'} gap={4} justifyContent={'space-between'} mt={4}>
                        <Autocomplete
                            options={["Student 1", "Student 2"]}
                            filterSelectedOptions
                            freeSolo={false}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Leave Type"
                                    label="Leave Type"
                                />
                            )}
                            sx={{ width: "30%" }}
                        />

                        <DatePicker
                            label="Leave Period Starting"
                            //   onChange={(e) => setStartDate(e)}
                            // minDate={dayjs()}
                            format="DD MMM YYYY"
                        />
                        <DatePicker
                            label="Leave Period Ending"
                            //   onChange={(e) => setStartDate(e)}
                            // minDate={dayjs()}
                            format="DD MMM YYYY"
                        />
                    </Box>

                    <Box display={'flex'} alignItems={'center'} sx={{ my: '16px' }}>
                        <Typography fontWeight={600}>Supporting Document</Typography>
                        <Button color="primary" variant="contained" sx={{ ml: '16px' }} > Upload</Button>
                    </Box>

                    <TextField
                        id="comments"
                        label="Enter Comments"
                        placeholder="Enter Comments"
                        // value={comments}
                        // onChange={(e) => setComments(e.target.value)}
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                    />

                    <Box display={"flex"} justifyContent={"center"}>
                        <Button
                            variant="contained"
                            style={{
                                width: "360px",
                                marginTop: '40px'
                            }}
                            onClick={() => close()}
                        >
                            Apply
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Dialog >
    );
};

export default ApplyLeave;