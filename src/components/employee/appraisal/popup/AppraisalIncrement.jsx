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


const AppraisalIncrement = ({ open, close }) => {
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
                        Appraisal Increment
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

                <Box display="flex" flexDirection="column" p={2} justifyContent="space-between" width={"75%"} margin="auto" >

                    <Box display={"flex"} alignItems={"center"}>
                        <Typography fontWeight={"medium"}>Revised Compensation Effective From :</Typography>
                        <FormControl sx={{ width: "30%", marginLeft: "10px" }}>
                            <InputLabel>Month</InputLabel>
                            <Select
                                label="Month"
                            // value={appraisalCycle}
                            // onChange={(e) => setAppraisalCycle(e.target.value)}
                            >
                                <MenuItem value={"2021-22"}>2021-22</MenuItem>
                                <MenuItem value={"2023-24"}>2023-24</MenuItem>
                                <MenuItem value={"2024-25"}>2024-25</MenuItem>
                                <MenuItem value={"2025-26"}>2025-26</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Typography fontWeight={"medium"} marginTop={5}>Increment Percentage :</Typography>




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

export default AppraisalIncrement;
