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
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import CloseIcon from "@mui/icons-material/Close";
import { ToastContainer, toast } from "react-toastify";

const Reject = ({ open, close }) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                    bgcolor={"secondary.main"}
                    color={"white"}
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Box />
                    <Typography fontSize={"1.1rem"} textAlign={"center"}>
                        Reject Claim
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
                                <Typography mb={2}>Department</Typography>
                                <Typography mb={2}>Claim Request Type</Typography>
                            </Box>
                            <Box display="flex" flexDirection="column" justifyContent="space-between">
                                <Typography fontWeight="medium" ml={1} mb={2}>: Priya Naskar</Typography>
                                <Typography fontWeight="medium" ml={1} mb={2}>: Physics</Typography>
                                <Typography fontWeight="medium" ml={1} mb={2}>: Travel Expense</Typography>
                            </Box>
                        </Box>
                        <Box display="flex" gap={2} width="48%" justifyContent="center">
                            <Box display="flex" flexDirection="column" justifyContent="space-between">
                                <Typography mb={2}>Employee ID</Typography>
                                <Typography mb={2}>Grade</Typography>
                                <Typography mb={2}>Claim Amount</Typography>
                            </Box>
                            <Box display="flex" flexDirection="column" justifyContent="space-between">
                                <Typography fontWeight="medium" ml={1} mb={2}>: B2</Typography>
                                <Typography fontWeight="medium" ml={1} mb={2}>: AUG202456</Typography>
                                <Typography fontWeight="medium" ml={1} mb={2}>: ₹10,000</Typography>
                            </Box>
                        </Box>
                    </Box>


                    <TextField
                        id="comments"
                        label="Enter Reason for Rejection"
                        placeholder="Enter Reason for Rejection"
                        // value={comments}
                        // onChange={(e) => setComments(e.target.value)}
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}

                    />

                    <Typography fontWeight={"medium"} textAlign={"left"} marginY={2}>Are you sure you want to reject the claim request?</Typography>

                    <Box marginY={2} width={"100%"} display="flex" gap={2}>
                        <Button variant="contained" color="secondary" fullWidth onClick={() => {
                            toast.success("Updated Successfully");
                            close();
                        }}>Yes</Button>
                        <Button variant="outlined" color="secondary" fullWidth onClick={() => {
                            toast.success("Updated Successfully");
                            close();
                        }}>No</Button>
                    </Box>
                </Box>
            </Box >
        </Dialog >
    );
};

export default Reject;