import React from "react";
import {
    Box,
    Dialog,
    Divider,
    IconButton,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DataGrid } from "@mui/x-data-grid";
import { useMediaQuery } from "@material-ui/core";
import Bbox from "../../../UiComponents/Bbox";
import RevealCard from "../../../AnimationComponents/RevealCard";
import photo from "../../../../assets/icons/photo.png";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

const RequestDetails = ({ open, close }) => {

    // breakpoints
    const isSmall = useMediaQuery("(max-width: 1364px)");
    const isTablet = useMediaQuery("(min-width: 1365px) and (max-width: 1535px)");
    const isLaptop = useMediaQuery("(min-width: 1536px) and (max-width: 1706px)");
    const isDesktop = useMediaQuery(
        "(min-width: 1707px) and (max-width: 1919px)"
    );
    const isLarge = useMediaQuery("(min-width: 1920px)");
    const isXlarge = useMediaQuery("(min-width: 2560px)");

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
            field: "notes", headerName: "Librarian's Comment", flex: 3,
        }];

    // table rows
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
        {
            id: 3,
            activity_date: "10 Mar 2023",
            activity_type: "Claim Request Raised",
            actioned_by: "Amartya Ghosh (EMP789)",
            notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        }
    ];

    return (
        <Dialog
            fullWidth
            PaperProps={{
                sx: {
                    maxHeight: "100%",
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
                        Requests Details
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
                                <img src={photo} alt="icon" style={{ width: '100px', marginBottom: '10px', zIndex: 2, borderRadius: '12px' }} />
                                <Typography fontWeight={"medium"} fontSize={"0.8rem"} color={"#22543D"} bgcolor={"#C6F6D5"} px={1} py={0.5} borderRadius={1} zIndex={2}>Active</Typography>
                            </Box>

                            <Box
                                position={"absolute"}
                                bottom={0}
                                right={0}
                                padding={1}
                                display={"flex"}
                                flexDirection={"column"}
                                alignItems={"flex-end"}
                            // justifyContent={"center"}
                            // width="150px"
                            // height="100%"
                            >
                                <Box display={'flex'} justifyContent={'center'}>
                                    <CallOutlinedIcon sx={{ marginRight: '4px' }} /><Typography>9909009099</Typography>
                                </Box>
                                <Box display={'flex'} justifyContent={'center'}>
                                    <EmailOutlinedIcon sx={{ marginRight: '4px' }} /><Typography>alma.lawson@example.com</Typography>
                                </Box>
                            </Box>

                            <Box
                                bgcolor={"white"}
                                py={5}
                                px={3}
                                borderRadius={2}
                                display={"flex"}
                                justifyContent={"space-between"}
                                alignItems={"center"}
                            >
                                <Box display="flex" justifyContent="center" width="100%" >
                                    <Box display="flex" gap={2} width="30%" justifyContent="center" borderRight="2px solid #E0E0E0">
                                        <Box display="flex" flexDirection="column" justifyContent="space-between">
                                            <Typography mb={2}>Employee Name</Typography>
                                            <Typography mb={2}>Library Card #</Typography>
                                            <Typography mb={2}>Employee ID</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="column" justifyContent="space-between">
                                            <Typography fontWeight="medium" ml={1} mb={2}>: Jay Shaw</Typography>
                                            <Typography fontWeight="medium" ml={1} mb={2}>: AG240001</Typography>
                                            <Typography fontWeight="medium" ml={1} mb={2}>: EMP2201</Typography>
                                        </Box>
                                    </Box>
                                    <Box display="flex" gap={2} width="30%" justifyContent="center" borderRight="2px solid #E0E0E0">
                                        <Box display="flex" flexDirection="column" justifyContent="space-between" >
                                            <Typography mb={2}>Employee Type</Typography>
                                            <Typography mb={2}>Department</Typography>
                                            <Typography mb={2}>Current Borrowing</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="column" justifyContent="space-between">
                                            <Typography fontWeight="medium" ml={1} mb={2}>: Teaching Staff</Typography>
                                            <Typography fontWeight="medium" ml={1} mb={2}>: Biology</Typography>
                                            <Typography fontWeight="medium" ml={1} mb={2} display="flex" alignItems="center" gap={1}>: Biology Book</Typography>
                                        </Box>
                                    </Box>
                                    <Box display="flex" gap={2} width="30%" justifyContent="center" alignItems="flex-start" >
                                        <Box display="flex" flexDirection="column" justifyContent="space-between">
                                            <Typography mb={2}>Penalty due as on date</Typography>
                                            <Typography mb={2}>Open Incidents</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="column" justifyContent="space-between">
                                            <Typography fontWeight="medium" ml={1} mb={2}>: ₹ 2344</Typography>
                                            <Typography fontWeight="medium" ml={1} mb={2} display="flex" alignItems="center" gap={1}>:  <span style={{ backgroundColor: '#E8DEF8', padding: '4px 8px', borderRadius: '8px' }}>#112334</span></Typography>
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

export default RequestDetails;