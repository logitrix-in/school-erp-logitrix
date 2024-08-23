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
    Select,
    MenuItem,
    FormControl,
    Typography,
} from "@mui/material";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import CloseIcon from "@mui/icons-material/Close";
import { ToastContainer, toast } from "react-toastify";


const StageClearance = ({ open, close }) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                        Stage Clearance
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

                <Box display="flex" flexDirection="column" px={2} py={4} justifyContent="space-between" width={"75%"} margin="auto" >

                    <FormControl fullWidth>
                        <InputLabel>Department</InputLabel>
                        <Select
                            label="Department"
                        // value={appraisalCycle}
                        // onChange={(e) => setAppraisalCycle(e.target.value)}
                        >
                            <MenuItem value={"2021-22"}>2021-22</MenuItem>
                            <MenuItem value={"2023-24"}>2023-24</MenuItem>
                            <MenuItem value={"2024-25"}>2024-25</MenuItem>
                            <MenuItem value={"2025-26"}>2025-26</MenuItem>
                        </Select>
                    </FormControl>

                    <Typography fontWeight={"medium"} textAlign={"left"} marginY={2}>Move all pending appraisal forms to :</Typography>

                    <FormControl fullWidth>
                        <InputLabel>Stage</InputLabel>
                        <Select
                            label="Stage"
                        // value={appraisalCycle}
                        // onChange={(e) => setAppraisalCycle(e.target.value)}
                        >
                            <MenuItem value={"2021-22"}>2021-22</MenuItem>
                            <MenuItem value={"2023-24"}>2023-24</MenuItem>
                            <MenuItem value={"2024-25"}>2024-25</MenuItem>
                            <MenuItem value={"2025-26"}>2025-26</MenuItem>
                        </Select>
                    </FormControl>

                    <Box marginY={4} width={"100%"}>
                        <Button variant="contained" color="primary" fullWidth onClick={() => {
                            toast.success("Updated Successfully");
                            close();
                        }}>Submit</Button>
                    </Box>
                </Box>
            </Box>
        </Dialog >
    );
};

export default StageClearance;
