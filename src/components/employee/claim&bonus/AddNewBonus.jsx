import React from "react";
import {
    Box,
    Button,
    Dialog,
    InputLabel,
    Select,
    MenuItem,
    Divider,
    TextField,
    FormControl,
    IconButton,
    Tab,
    Tabs,
    Typography,
} from "@mui/material";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import CloseIcon from "@mui/icons-material/Close";
import { ToastContainer, toast } from "react-toastify";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

const AddNewBonus = ({ open, close }) => {
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
                    width: "60%",
                },
            }}
            maxWidth="lg"
            open={open}
            onClose={() => close()}
            disableEnforceFocus={true}
        >
            <Box
                sx={{
                    overflowY: "auto",
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                    scrollbarWidth: 'none',
                    '-ms-overflow-style': 'none',
                }}
            >
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
                        Add New Bonus
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

                <Box display="flex" flexDirection="column" gap={2} p={2} justifyContent="space-between" width={"95%"} margin="auto">
                    <Box display="flex" flexDirection="row" gap={2}>
                        <TextField placeholder="Bonus Head Name" />

                        <FormControl sx={{ width: "30%" }}>
                            <InputLabel id="payroll-months">Payroll Month(s)</InputLabel>

                            <Select placeholder="Payroll Month(s)" id="payroll-months" label="Payroll Month(s)" >
                                <MenuItem value="aug-2024">Aug, 2024</MenuItem>
                                <MenuItem value="sep-2024">Sep, 2024</MenuItem>
                                <MenuItem value="oct-2024">Oct, 2024</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Typography textAlign={"left"} marginY={1}>Bonus Amount - Grade wise Distribution</Typography>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
                            <FormControl sx={{ width: "50%" }}>
                                <InputLabel id="grade">Grade</InputLabel>

                                <Select placeholder="Select Grade" id="grade" label="Select Grade" >
                                    <MenuItem value="1">1</MenuItem>
                                    <MenuItem value="2">2</MenuItem>
                                    <MenuItem value="3">3</MenuItem>
                                </Select>
                            </FormControl>

                            <Box width="50%">
                                <TextField placeholder="Enter Amount" label="Amount" fullWidth />
                            </Box>
                            <DeleteOutlineOutlinedIcon color="error" cursor="pointer" />
                        </Box>
                        <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
                            <FormControl sx={{ width: "50%" }}>
                                <InputLabel id="grade">Grade</InputLabel>

                                <Select placeholder="Select Grade" id="grade" label="Select Grade" >
                                    <MenuItem value="1">1</MenuItem>
                                    <MenuItem value="2">2</MenuItem>
                                    <MenuItem value="3">3</MenuItem>
                                </Select>
                            </FormControl>

                            <Box width="50%">
                                <TextField placeholder="Enter Amount" label="Amount" fullWidth />
                            </Box>
                            <DeleteOutlineOutlinedIcon color="error" cursor="pointer" />
                        </Box>
                        <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
                            <FormControl sx={{ width: "50%" }}>
                                <InputLabel id="grade">Grade</InputLabel>

                                <Select placeholder="Select Grade" id="grade" label="Select Grade" >
                                    <MenuItem value="1">1</MenuItem>
                                    <MenuItem value="2">2</MenuItem>
                                    <MenuItem value="3">3</MenuItem>
                                </Select>
                            </FormControl>

                            <Box width="50%">
                                <TextField placeholder="Enter Amount" label="Amount" fullWidth />
                            </Box>
                            <DeleteOutlineOutlinedIcon color="error" cursor="pointer" />

                        </Box>
                        <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
                            <FormControl sx={{ width: "50%" }}>
                                <InputLabel id="grade">Grade</InputLabel>

                                <Select placeholder="Select Grade" id="grade" label="Select Grade" >
                                    <MenuItem value="1">1</MenuItem>
                                    <MenuItem value="2">2</MenuItem>
                                    <MenuItem value="3">3</MenuItem>
                                </Select>
                            </FormControl>

                            <Box width="50%">
                                <TextField placeholder="Enter Amount" label="Amount" fullWidth />
                            </Box>
                            <DeleteOutlineOutlinedIcon color="error" cursor="pointer" />
                        </Box>
                    </Box>

                    <Box marginY={1}>
                        <Button variant="contained" color="primary" width="auto"><AddCircleOutlineOutlinedIcon sx={{ mr: 1 }} />Add New</Button>
                    </Box>

                    <FormControl sx={{ width: "30%" }}>
                        <InputLabel id="tds-applicable">TDS Applicable</InputLabel>

                        <Select placeholder="TDS Applicable" id="tds-applicable" label="TDS Applicable" >
                            <MenuItem value="yes">Yes</MenuItem>
                            <MenuItem value="no">No</MenuItem>
                        </Select>
                    </FormControl>

                    <Typography textAlign={"left"} marginY={1}>Eligibility Criteria</Typography>
                    <Box display="flex" flexDirection="row" justifyContent={"space-between"} gap={2} fullWidth >
                        <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
                            <InputLabel>Employee Status :</InputLabel>
                            <Select value={"active"}>
                                <MenuItem value="active">Active</MenuItem>
                                <MenuItem value="inactive">Inactive</MenuItem>
                            </Select>
                        </Box>
                        <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
                            <InputLabel>Leave Without Pay :</InputLabel>
                            <Select value={"yes"}>
                                <MenuItem value="yes">Yes</MenuItem>
                                <MenuItem value="no">No</MenuItem>
                            </Select>
                        </Box>
                        <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
                            <InputLabel>Open Incident(s) :</InputLabel>
                            <Select value={"yes"}>
                                <MenuItem value="yes">Yes</MenuItem>
                                <MenuItem value="no">No</MenuItem>
                            </Select>
                        </Box>
                        <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
                            <InputLabel>Appraisal Rating :</InputLabel>
                            <Select value={"1"}>
                                <MenuItem value="1">1</MenuItem>
                                <MenuItem value="2">2</MenuItem>
                                <MenuItem value="3">3</MenuItem>
                            </Select>
                        </Box>
                    </Box>


                    <Box marginY={4} width={"80%"} marginX={"auto"}>
                        <Button variant="contained" color="primary" fullWidth onClick={() => {
                            toast.success("Updated Successfully");
                            close();
                        }}>Save</Button>
                    </Box>
                </Box>
            </Box>
        </Dialog >
    );
};

export default AddNewBonus;
