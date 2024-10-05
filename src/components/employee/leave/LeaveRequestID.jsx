import {
    Box,
    Dialog,
    Divider,
    IconButton,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DataGrid } from "@mui/x-data-grid";
import Bbox from "@/components/UiComponents/Bbox";
import RevealCard from "@/components/AnimationComponents/RevealCard";
import claimID from "@/assets/icons/claimID.png";
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

const LeaveRequestID = ({ open, close }) => {

    const columns = [
        {
            field: "activity_date", headerName: "Activity Date", flex: 1
        },
        {
            field: "activity_type", headerName: "Activity Type", flex: 2
        },
        {
            field: "actioned_by", headerName: "Actioned By", flex: 2
        },
        {
            field: "notes", headerName: "Notes/Comments", flex: 3,
        }];

    const rows = [
        {
            id: 1,
            activity_date: "14 Mar 2023",
            activity_type: "Claim Amount Reimbursed",
            actioned_by: "Rohit Sen (EMP12344)",
            notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
            id: 2,
            activity_date: "12 Mar 2023",
            activity_type: "Claim Request Approved",
            actioned_by: "Rohit Sen (EMP12344)",
            notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
    ];

    return (
        <Dialog
            fullWidth
            PaperProps={{
                sx: {
                    maxHeight: "90%",
                },
            }}
            maxWidth="lg"
            open={open}
            onClose={() => close()}
            disableEnforceFocus={true}
        >
            <Box overflow={"hidden"}>
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
                        Leave Request ID
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

                <RevealCard>
                    <Bbox borderRadius={2} overflow={"hidden"} mx={2} my={4}>
                        <Box position={"relative"}>
                            <Box
                                position={"absolute"}
                                top={0}
                                left={0}
                                width="150px"
                                height="100%"
                                sx={{
                                    backgroundColor: 'primary.main',
                                    clipPath: 'polygon(0 0, 80% 0, 30% 100%, 0 100%)',
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "white",
                                    zIndex: 1,
                                }}
                            >
                            </Box>
                            <Box
                                position={"absolute"}
                                top={0}
                                left={0}
                                width="150px"
                                height="100%"
                                display={"flex"}
                                flexDirection={"column"}
                                alignItems={"center"}
                                justifyContent={"center"}
                            >
                                <img src={claimID} alt="icon" style={{ width: '88px', marginBottom: '10px', zIndex: 2 }} />
                                <Typography fontWeight={"medium"} fontSize={"0.6rem"} color={"#22543D"} bgcolor={"#C6F6D5"} px={1} py={0.5} borderRadius={1} zIndex={2}>Approved</Typography>
                            </Box>

                            <Box
                                position={"absolute"}
                                bottom={0}
                                right={0}
                                padding={2}
                                display={"flex"}
                                flexDirection={"column"}
                                alignItems={"flex-end"}
                            >
                                <Box display={'flex'} justifyContent={'center'}>
                                    <CallOutlinedIcon sx={{ marginRight: '4px' }} /><Typography>9909009099</Typography>
                                </Box>
                                <Box display={'flex'} justifyContent={'center'}>
                                    <EmailOutlinedIcon sx={{ marginRight: '4px' }} /><Typography>alma.lawson@example.com</Typography>
                                </Box>
                            </Box>

                            <Box
                                position={"absolute"}
                                top={0}
                                right={0}
                                padding={2}
                                display={"flex"}
                                flexDirection={"row"}
                                alignItems={"center"}
                                justifyContent={"center"}
                            >
                                <Typography display="flex" alignItems="center">
                                    Supporting Document : <DescriptionOutlinedIcon sx={{ marginLeft: '4px' }} />
                                </Typography>
                            </Box>

                            <Box
                                bgcolor={"white"}
                                py={5}
                                px={3}
                                borderRadius={2}
                                display={"flex"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                ml={10}
                            >
                                <Box display="flex" justifyContent="flex-start" width="100%" alignItems="center">
                                    <Box display="flex" gap={2} width="35%" justifyContent="center" borderRight="2px solid #E0E0E0">
                                        <Box display="flex" flexDirection="column" justifyContent="space-between">
                                            <Typography mb={2}>Leave Type</Typography>
                                            <Typography mb={2}>Applied By</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="column" justifyContent="space-between">
                                            <Typography fontWeight="medium" ml={1} mb={2}>: Sick Leave</Typography>
                                            <Typography fontWeight="medium" ml={1} mb={2}>: Biplab Basak (AG24001)</Typography>
                                        </Box>
                                    </Box>
                                    <Box display="flex" gap={2} width="35%" justifyContent="center" ml={6}>
                                        <Box display="flex" flexDirection="column" justifyContent="space-between">
                                            <Typography mb={2}>Number of Working Days</Typography>
                                            <Typography mb={2}>Leave Period</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="column" justifyContent="space-between">
                                            <Typography fontWeight="medium" ml={1} mb={2}>: 7</Typography>
                                            <Typography fontWeight="medium" ml={1} mb={2}>: 4 Mar 2024 - 10 Mar 2024</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Bbox>
                </RevealCard>


                <RevealCard>
                    <Bbox borderRadius={2} overflow={"hidden"} mx={2} my={4}>
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
                                Activity  Details
                            </Typography>
                        </Box>

                        <Divider />

                        <Box mt={2} mb={5} style={{ height: "100%" }} mx={2}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                pageSizeOptions={[5, 10]}
                            />
                        </Box>
                    </Bbox>
                </RevealCard>
            </Box >
        </Dialog >
    );
}

export default LeaveRequestID;