import React from "react";
import {
    Box,
    Button,
    Dialog,
    IconButton,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Confirm = ({ open, close, openEditLetter }) => {

    return (
        <Dialog
            fullWidth={false}
            PaperProps={{
                sx: {
                    maxHeight: "90%",
                    width: "50%",
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
                        Confirmation
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

                <Box display="flex" flexDirection="column" gap={2} p={2} justifyContent="space-between" width={"95%"} margin="auto" alignItems="center">
                    <Box display="flex" justifyContent="center" width="100%" alignItems="center">
                        <Box display="flex" gap={2} width="48%" justifyContent="center">
                            <Box display="flex" flexDirection="column" justifyContent="space-between">
                                <Typography mb={2}>Employee Name</Typography>
                                <Typography mb={2}>Employee Type</Typography>
                                <Typography mb={2}>Department</Typography>
                                <Typography mb={2}>Grade</Typography>
                            </Box>
                            <Box display="flex" flexDirection="column" justifyContent="space-between">
                                <Typography fontWeight="medium" ml={1} mb={2}>: Priya Naskar</Typography>
                                <Typography fontWeight="medium" ml={1} mb={2}>: Teaching Staff</Typography>
                                <Typography fontWeight="medium" ml={1} mb={2}>: Physics</Typography>
                                <Typography fontWeight="medium" ml={1} mb={2}>: B2</Typography>
                            </Box>
                        </Box>
                        <Box display="flex" gap={2} width="48%" justifyContent="center">
                            <Box display="flex" flexDirection="column" justifyContent="space-between">
                                <Typography mb={2}>Employee ID</Typography>
                                <Typography mb={2}>Role</Typography>
                                <Typography mb={2}>Class Scope</Typography>
                                <Typography mb={2}>Current Probation Period</Typography>
                            </Box>
                            <Box display="flex" flexDirection="column" justifyContent="space-between">
                                <Typography fontWeight="medium" ml={1} mb={2}>: AUG202456</Typography>
                                <Typography fontWeight="medium" ml={1} mb={2}>: Laboratory Assistant</Typography>
                                <Typography fontWeight="medium" ml={1} mb={2}>: High School</Typography>
                                <Typography fontWeight="medium" ml={1} mb={2}>: 4 Jul 2023 - 4 Sep 2023</Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Typography fontWeight={"medium"} textAlign={"left"} marginY={2}>Are you sure you want to confirm successful completion of probation period?</Typography>

                    <Box marginY={2} width={"100%"} display="flex" gap={2}>
                        <Button variant="contained" color="primary" fullWidth onClick={() => {
                            openEditLetter()
                            close();
                        }}>Yes</Button>
                        <Button variant="outlined" color="primary" fullWidth onClick={() => {
                            close();
                        }}>No</Button>
                    </Box>
                </Box>
            </Box>
        </Dialog >
    );
};

export default Confirm;
