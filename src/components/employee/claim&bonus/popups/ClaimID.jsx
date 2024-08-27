import React from "react";
import {
    Box,
    Button,
    Dialog,
    InputLabel,
    Divider,
    TextField,
    IconButton,
    Tab,
    Tabs,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DataGrid } from "@mui/x-data-grid";
import { useMediaQuery } from "@material-ui/core";
import Bbox from "../../../../components/UiComponents/Bbox";
import RevealCard from "../../../../components/AnimationComponents/RevealCard";
import claimID from "../../../../assets/icons/claimID.png";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

const ClaimID = ({ open, close }) => {

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
            field: "activity_date", headerName: "Activity Date",
            width: isLaptop ? 100 : isLarge ? 140 : isTablet ? 140 : isSmall ? 100 : 120,
        },
        {
            field: "activity_type", headerName: "Activity Type",
            width: isLaptop ? 170
                : isLarge ? 200
                    : isTablet ? 200
                        : isSmall ? 160
                            : 180,
        },
        {
            field: "actioned_by", headerName: "Actioned By",
            width: isLaptop ? 170
                : isLarge ? 200
                    : isTablet ? 200
                        : isSmall ? 160
                            : 180,
        },
        {
            field: "notes", headerName: "Notes/Comments", flex: 1,
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
                        Claim ID
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
                                <img src={claimID} alt="icon" style={{ width: '75px', marginBottom: '10px', zIndex: 2 }} />
                                <Typography fontWeight={"medium"} fontSize={"0.6rem"} color={"#22543D"} bgcolor={"#C6F6D5"} px={1} py={0.5} borderRadius={1} zIndex={2}>Approved</Typography>
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
                                <Box display="flex" justifyContent="center" width="100%" alignItems="center">
                                    <Box display="flex" gap={2} width="48%" justifyContent="center" borderRight="2px solid #E0E0E0">
                                        <Box display="flex" flexDirection="column" justifyContent="space-between">
                                            <Typography mb={2}>Claim ID</Typography>
                                            <Typography mb={2}>Claimed by</Typography>
                                            <Typography mb={2}>Claim Type  </Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="column" justifyContent="space-between">
                                            <Typography fontWeight="medium" ml={1} mb={2}>: CLM090902</Typography>
                                            <Typography fontWeight="medium" ml={1} mb={2}>: Priya Naskar (AGC0909)</Typography>
                                            <Typography fontWeight="medium" ml={1} mb={2}>: Travel Expense</Typography>
                                        </Box>
                                    </Box>
                                    <Box display="flex" gap={2} width="48%" justifyContent="center">
                                        <Box display="flex" flexDirection="column" justifyContent="space-between">
                                            <Typography mb={2}>Claim Amount</Typography>
                                            <Typography mb={2}>Claim Raised On</Typography>
                                            <Typography mb={2}>Supporting Document</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="column" justifyContent="space-between">
                                            <Typography fontWeight="medium" ml={1} mb={2}>: ₹ 2000</Typography>
                                            <Typography fontWeight="medium" ml={1} mb={2}>: 1 Jun 2024</Typography>
                                            <Typography fontWeight="medium" ml={1} mb={2} display="flex" alignItems="center" gap={1}>: <DescriptionOutlinedIcon /></Typography>
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

export default ClaimID;