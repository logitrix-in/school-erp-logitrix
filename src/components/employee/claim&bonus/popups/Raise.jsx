import React from "react";
import {
    Box,
    Button,
    Dialog,
    InputLabel,
    TextField,
    IconButton,
    Typography,
    Select,
    FormControl,
    Autocomplete,
    MenuItem
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ToastContainer, toast } from "react-toastify";

const Raise = ({ open, close }) => {
    const [value, setValue] = React.useState(0);
    const [file, setFile] = React.useState("");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const names = ["Amartya Ghosh (EMP1234)", "Rajesh Kumar (EMP1235)", "Shubham Sharma (EMP1236)", "Rajesh Kumar (EMP1235)", "Shubham Sharma (EMP1236)"];

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
                        Raise New Request
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
                    <Box display="flex" justifyContent="space-between" width="100%" alignItems="center">

                        <FormControl sx={{ width: "48%" }}>
                            <InputLabel id="claim-request-type">Claim Request Type</InputLabel>
                            <Select
                                labelId="claim-request-type"
                                id="claim-request-type"
                                label="Claim Request Type"
                                placeholder="Enter Claim Request Type"
                            // value={'age'}
                            // onChange={handleChange}
                            >
                                <MenuItem value={"internet"}>Internet reimbursement</MenuItem>
                                <MenuItem value={"travel"}>Travel Expenses</MenuItem>
                            </Select>
                        </FormControl>

                        <Autocomplete
                            options={names}
                            filterSelectedOptions
                            freeSolo={false}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Employee Name"
                                    placeholder="Select Employee(s)"
                                />
                            )}
                            sx={{ width: "48%" }}
                        />
                    </Box>

                    <Box display="flex" justifyContent="space-between" width="100%" alignItems="center">
                        <TextField
                            id="comments"
                            label="Claim Amount"
                            placeholder="Enter Claim Amount in ₹"
                            // value={comments}
                            // onChange={(e) => setComments(e.target.value)}
                            variant="outlined"
                            fullWidth
                            sx={{ width: "48%" }}
                        />

                        <Box sx={{ width: "48%" }}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography>Supporting Document</Typography>

                                <input
                                    type="file"
                                    id="claim-doc"
                                    style={{ display: 'none' }}
                                // onChange={handleFileChange}
                                />

                                <InputLabel htmlFor="claim-doc" sx={{ marginLeft: "12px" }}>
                                    <Button variant="contained" color="primary" component="span" sx={{ padding: "6px 32px" }}>Upload</Button>
                                </InputLabel>
                            </Box>

                            <Typography sx={{ fontSize: "small", display: file ? "block" : "none" }}>Uploaded File</Typography>
                        </Box>
                    </Box>

                    <TextField
                        id="comments"
                        label="Notes/Comments"
                        placeholder="Use this field to record any additional information which could be considered for the subsequent steps."
                        // value={comments}
                        // onChange={(e) => setComments(e.target.value)}
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}

                    />

                    <Box marginY={4} width={"100%"}>
                        <Button variant="contained" color="primary" fullWidth onClick={() => {
                            toast.success("Updated Successfully");
                            close();
                        }}>Submit</Button>
                    </Box>
                </Box>
            </Box >
        </Dialog >
    );
};

export default Raise;