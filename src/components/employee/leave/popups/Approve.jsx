import React from "react";
import {
    Box,
    Button,
    Dialog,
    TextField,
    IconButton,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ToastContainer, toast } from "react-toastify";


const Approve = ({ open, close }) => {
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
                    bgcolor={"primary.main"}
                    color={"white"}
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Box />
                    <Typography fontSize={"1.1rem"} textAlign={"center"}>
                        Approve Leave
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
                    <Box display="flex" justifyContent="center" width="100%" alignItems="flex-start" >
                        <Box display="flex" gap={0} width="50%" justifyContent="space-between" >
                            <Box display="flex" flexDirection="column" justifyContent="space-between" >
                                <Typography mb={2}>Employee Name</Typography>
                                <Typography mb={2}>Department</Typography>
                                <Typography mb={2}>Status</Typography>
                            </Box>
                            <Box display="flex" flexDirection="column" justifyContent="space-between">
                                <Typography fontWeight="medium" ml={1} mb={2}>: Priya Naskar</Typography>
                                <Typography fontWeight="medium" ml={1} mb={2}>: Physics</Typography>
                                <Typography fontWeight="medium" ml={1} mb={2}>: Active</Typography>
                            </Box>
                            <Box />
                        </Box>
                        <Box display="flex" gap={0} width="50%" justifyContent="space-between" alignItems={"flex-start"}>
                            <Box display="flex" flexDirection="column" justifyContent="space-between">
                                <Typography mb={2}>Supervisor</Typography>
                                <Typography mb={2}>Academic Year</Typography>
                            </Box>
                            <Box display="flex" flexDirection="column" justifyContent="space-between">
                                <Typography fontWeight="medium" ml={1} mb={2}>: Ratan Basak (AUG245698)</Typography>
                                <Typography fontWeight="medium" ml={1} mb={2}>: 2024-25</Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box border={"1px solid red"} sx={{ width: '100%' }}>
                        <Box display={'flex'} justifyContent={'flex-start'}>
                            <Typography mb={2}>Overlapping Leave Summary</Typography>
                            <Typography fontWeight="medium" ml={1} mb={2}>: Science Department</Typography>
                        </Box>
                        <Box display={'flex'} flexDirection={'column'} sx={{ width: '75%' }}>
                            <Box display={'flex'} border={'1px solid red'}>
                                <Typography mb={2}>Priya Naskar (AG240001)</Typography>
                                <Typography fontWeight="medium" ml={1} mb={2}>: Sick Leave (4 Jul 2023 - 10 Jul 2023)</Typography>
                            </Box>
                            <Box display={'flex'} border={'1px solid red'}>
                                <Typography mb={2}>Rahul Mondal (AG252401)</Typography>
                                <Typography fontWeight="medium" ml={1} mb={2}>: Privilege Leave (4 Jul 2023 - 10 Jul 2023)</Typography>
                            </Box>
                        </Box>
                    </Box>

                    <TextField
                        id="comments"
                        label="Enter Reason / Comments"
                        placeholder="Enter Reason / Comments"
                        // value={comments}
                        // onChange={(e) => setComments(e.target.value)}
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                    />

                    <Typography fontWeight={"medium"} textAlign={"left"} marginY={2}>Are you sure you want to approve leave for selected Employee?</Typography>

                    <Box marginY={2} width={"100%"} display="flex" gap={2}>
                        <Button variant="contained" color="primary" fullWidth onClick={() => {
                            toast.success("Updated Successfully");
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

export default Approve;
