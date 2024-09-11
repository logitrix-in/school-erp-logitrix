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
    Autocomplete
} from "@mui/material";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import CloseIcon from "@mui/icons-material/Close";
import { ToastContainer, toast } from "react-toastify";


const LocationTransfer = ({ open, close }) => {
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
                        Location Transfer
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
                    <Box display="flex" justifyContent="center" width="100%" alignItems="center" mt={2}>
                        <Box display="flex" gap={2} width="48%" justifyContent="center">
                            <Box display="flex" flexDirection="column" justifyContent="space-between">
                                <Typography mb={2}>Employee Name</Typography>
                                <Typography mb={2}>Department</Typography>
                                <Typography mb={2}>Role</Typography>
                            </Box>
                            <Box display="flex" flexDirection="column" justifyContent="space-between">
                                <Typography fontWeight="medium" ml={1} mb={2}>: Priya Naskar</Typography>
                                <Typography fontWeight="medium" ml={1} mb={2}>: Physics</Typography>
                                <Typography fontWeight="medium" ml={1} mb={2}>: Laboratory Assistant</Typography>
                            </Box>
                        </Box>
                        <Box display="flex" gap={2} width="48%" justifyContent="center">
                            <Box display="flex" flexDirection="column" justifyContent="space-between">
                                <Typography mb={2}>Current Supervisor</Typography>
                                <Typography mb={2}>Grade</Typography>
                                <Typography mb={2}>Class Scope</Typography>
                            </Box>
                            <Box display="flex" flexDirection="column" justifyContent="space-between">
                                <Typography fontWeight="medium" ml={1} mb={2}>: Somesh Patel</Typography>
                                <Typography fontWeight="medium" ml={1} mb={2}>: B2</Typography>
                                <Typography fontWeight="medium" ml={1} mb={2}>: High School</Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Autocomplete
                        options={["Student 1", "Student 2"]}
                        filterSelectedOptions
                        freeSolo={false}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Select New Location"
                                label="Select New Location"
                            />
                        )}
                        sx={{ width: "90%" }}
                    />

                    <Box marginY={2} width={"100%"} display="flex" gap={2}>
                        <Button variant="contained" color="primary" fullWidth onClick={() => {
                            toast.success("Updated Successfully");
                            close();
                        }}>Apply</Button>
                    </Box>
                </Box>
            </Box>
        </Dialog >
    );
};

export default LocationTransfer;
