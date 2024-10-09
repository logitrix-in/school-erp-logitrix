import {
    Box,
    Button,
    Dialog,
    IconButton,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";

const Extend = ({ open, close }) => {
    const [showDate, setShowDate] = useState(false);

    return (
        <Dialog
            fullWidth={false}
            PaperProps={{
                sx: {
                    maxHeight: "90%",
                    width: "60%",
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
                        Extend Probation
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

                    {
                        !showDate ?
                            <Typography fontWeight={"medium"} textAlign={"left"} marginY={2}>Are you sure you want to revise probation period?</Typography> :
                            <DatePicker
                                sx={{ width: "80%" }}
                                label="Revised End Date of Probation"
                                format="DD MMM YYYY"
                            />
                    }

                    {
                        !showDate ?
                            <Box marginY={2} width={"80%"} display="flex" gap={2}>
                                <Button variant="contained" color="primary" fullWidth onClick={() => {
                                    setShowDate(true);
                                }}>Yes</Button>
                                <Button variant="outlined" color="primary" fullWidth onClick={() => {
                                    close();
                                }}>No</Button>
                            </Box>
                            :
                            <Box marginY={2} width={"80%"} display="flex" gap={2}>
                                <Button variant="contained" color="primary" fullWidth onClick={() => {
                                    toast.success("Probation period extended successfully");
                                    close();
                                    setShowDate(false);
                                }}>Submit</Button>
                            </Box>
                    }
                </Box>
            </Box>

        </Dialog >
    );
};

export default Extend;
