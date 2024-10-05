import { useState } from "react";
import {
    Box,
    Button,
    Dialog,
    IconButton,
    Radio,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import IncidentHeaderBanner from "../Banner";
import { DataGrid } from "@mui/x-data-grid";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

const LeaveCancellation = ({ open, close }) => {
    const [selectedRow, setSelectedRow] = useState(null);

    const columns = [{
        field: "radioButtons",
        headerName: "",
        flex: 0.2,
        renderCell: (params) => (
            <Radio
                checked={params.row.id === selectedRow?.id}
                color="primary"
                sx={{
                    transform: "scale(0.6)",
                }}
                inputProps={{ "aria-label": params.row.id }}
                onChange={() => {
                    setSelectedRow(params.row);
                }}
            />
        ),
    },
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
                        params.value === "Approved"
                            ? "#C6F6D5"
                            : params.value === "Pending"
                                ? "#FEEBCB"
                                : params.value === "Rejected"
                                    ? "#FFCCCC"
                                    : "transparent",
                    borderRadius: "6px",
                    display: "inline-block",
                    width:
                        params.value === "Approved" || params.value === "Pending" || params.value === "Rejected"
                            ? "80px"
                            : "auto",
                    paddingLeft: "11px",
                    paddingRight: "11px",
                    textAlign: "center",
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
            status: "Approved",
            approver_details: "John Doe",
        },
        {
            id: "LR002",
            leave_type: "Annual Leave",
            leave_duration: "4 Mar 2024 - 10 Mar 2024",
            no_of_working_days: 10,
            status: "Pending",
            approver_details: "Jane Smith",
        },
        {
            id: "LR003",
            leave_type: "Maternity Leave",
            leave_duration: "4 Mar 2024 - 10 Mar 2024",
            no_of_working_days: 30,
            status: "Rejected",
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
            maxWidth="lg"
            open={open}
            onClose={() => close()}
            disableEnforceFocus={true}
        >
            <Box>
                <Box
                    p={1}
                    py={1}
                    bgcolor={"secondary.main"}
                    color={"white"}
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Box />
                    <Typography fontSize={"1.1rem"} textAlign={"center"}>
                        Leave Cancellation
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
                                <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                    <Typography fontWeight="medium">:</Typography>
                                    <Typography fontWeight="medium" ml={1} bgcolor={'#C6F6D5'} paddingX={'8px'} borderRadius={'6px'} fontSize={'0.8rem'}>Active</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box width="10%" />
                    </Box>
                </Box>

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

                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                    <Typography fontWeight={600} my={2} mt={4} fontSize={"1rem"} textAlign={'center'}>
                        Are you sure you want to cancel selected leave request(s) for the employee ?
                    </Typography>
                    <Box gap={4} display={'flex'} my={4}>
                        <Button color="secondary" variant="contained" sx={{ width: "10rem" }}
                            onClick={() => { toast.success('Cancelled successfully'); close() }}
                        >
                            Yes
                        </Button>
                        <Button
                            color="secondary"
                            variant="outlined"
                            sx={{ width: "10rem" }}
                            onClick={close}
                        >
                            No
                        </Button>
                    </Box>
                </Box >
            </Box >
        </Dialog >
    );
};

export default LeaveCancellation;