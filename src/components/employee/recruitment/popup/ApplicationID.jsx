import {
    Box,
    Dialog,
    IconButton,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Bbox from "../../../../components/UiComponents/Bbox";
import RevealCard from "../../../../components/AnimationComponents/RevealCard";
import claimID from "../../../../assets/icons/claimID.png";
import ActivityDetails from '../Applications/ActivityDetails'
import ApplicationDetails from '../Applications/ApplicationDetails'
import { useState } from 'react'
import { Icon } from "@iconify/react";

const ApplicationID = ({ open, close }) => {
    const [showSection, setShowSection] = useState('activity');

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
            <Box>
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
                        Application ID Details
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
                                <Box display="flex" justifyContent="flex-start" width="100%" alignItems="center" marginLeft={20}>
                                    <Box display="flex" flexDirection="column" justifyContent="space-between">
                                        <Typography mb={2}>Application ID</Typography>
                                        <Typography mb={2}>Candidate's Name</Typography>
                                        <Typography mb={2}>Application Status</Typography>
                                    </Box>
                                    <Box display="flex" flexDirection="column" justifyContent="space-between">
                                        <Typography fontWeight="medium" ml={1} mb={2}>: EMP3543543443</Typography>
                                        <Typography fontWeight="medium" ml={1} mb={2}>: Ramki Kumar Reddy</Typography>
                                        <Typography fontWeight="medium" ml={1} mb={2}>: Application Submitted</Typography>
                                    </Box>
                                    <Box position={"absolute"} bottom={12} right={12}>
                                        <Box
                                            display={"flex"}
                                            justifyContent={"right"}
                                            alignItems={"center"}
                                            gap={1}
                                        >
                                            <Icon icon="tdesign:call" />
                                            <Typography>9988445533</Typography>
                                        </Box>
                                        <Box
                                            display={"flex"}
                                            justifyContent={"right"}
                                            alignItems={"center"}
                                            gap={1}
                                        >
                                            <Icon icon="octicon:mail-24" />
                                            <Typography>
                                                alma.lawson@example.com
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box position={"absolute"} top={12} right={12}>
                                        <Box
                                            display={"flex"}
                                            justifyContent={"right"}
                                            alignItems={"center"}
                                            gap={1}
                                        >
                                            <Typography>Resume</Typography>
                                            <Icon icon="carbon:document" />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Bbox>
                </RevealCard>

                <Box mx={2} my={4}>
                    <div
                        style={{
                            backgroundColor: "#E5F3FB",
                            display: "flex",
                            padding: "10px",
                            maxWidth: "334px",
                            borderRadius: "10px",
                        }}
                    >
                        <div>
                            <button
                                style={{
                                    backgroundColor: showSection === "application" ? "white" : "transparent",
                                    border: "none",
                                    color: "black",
                                    marginRight: "10px",
                                    cursor: "pointer",
                                    borderRadius: "6px",
                                    padding: "7px 10px 7px 10px",
                                    fontSize: "16px",
                                    fontWeight: 400,
                                }}
                                onClick={() => setShowSection("application")}
                            >
                                Application Details
                            </button>

                            <button
                                style={{
                                    backgroundColor: showSection === "activity" ? "white" : "transparent",
                                    border: "none",
                                    color: "black",
                                    marginRight: "10px",
                                    cursor: "pointer",
                                    borderRadius: "6px",
                                    padding: "7px 10px 7px 10px",
                                    fontSize: "16px",
                                    fontWeight: 400,
                                }}
                                onClick={() => setShowSection("activity")}
                            >
                                Activity Details
                            </button>
                        </div>
                    </div>
                </Box>

                {
                    showSection === 'activity' ? <ActivityDetails rows={rows} columns={columns} /> : <ApplicationDetails />

                }
            </Box >
        </Dialog >
    );
}

export default ApplicationID;