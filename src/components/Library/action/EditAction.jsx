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
import {
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Grid,
    Avatar,
    DialogTitle,
    DialogContent,
} from "@mui/material";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import CloseIcon from "@mui/icons-material/Close";
import { ToastContainer, toast } from "react-toastify";
import { DatePicker } from "@mui/x-date-pickers";
import ReignsSelect from "../../UiComponents/ReignsSelect";

const EditAction = ({ open, close }) => {
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
                        Edit Action
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
                    <Box sx={{ paddingTop: "30px" }}>
                        <Typography
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                fontWeight: "600",
                                paddingBottom: "10px",
                            }}
                        >
                            Suspension Period
                        </Typography>
                        <Box display={"flex"} gap={2} mt={2} >
                            <Box sx={{ width: '50%', display: 'flex', gap: 2 }}>
                                <DatePicker
                                    label="Start Date"
                                    format="DD MMM YYYY"
                                //   onChange={(e) => setStartDate(e)}
                                />
                                <DatePicker
                                    label="End Date"
                                    format="DD MMM YYYY"
                                //   minDate={startDate}
                                //   onChange={(e) => setEndDate(e)}
                                />
                            </Box>
                            <Box sx={{ width: '50%' }}>
                                <ReignsSelect
                                    //   items={suspend}
                                    multiple
                                    label="Suspend"
                                />
                            </Box>
                        </Box>

                        <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
                            <Box sx={{ width: '50%' }}>
                                <DatePicker label="Penalty Due Date" />
                            </Box>
                            <Box sx={{ width: '50%' }}>
                                <TextField
                                    id="comments"
                                    label="Claim Amount"
                                    type="text"
                                    placeholder="Enter Claim Amount in ₹"
                                    // value={amount}
                                    // onChange={handleAmountChange}
                                    variant="outlined"
                                    fullWidth
                                    inputProps={{
                                        inputMode: 'numeric',
                                        pattern: '[0-9]*'
                                    }}
                                />
                            </Box>
                        </Box>

                        <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                                row
                            >
                                <FormControlLabel
                                    value="deduct"
                                    control={<Radio />}
                                    label="Deduct from caution money"
                                />
                                <FormControlLabel
                                    value="adjust"
                                    control={<Radio />}
                                    label="Adjust from next payment"
                                />
                                <FormControlLabel
                                    value="online"
                                    control={<Radio />}
                                    label="Online / Offline payment"
                                />
                            </RadioGroup>
                        </Box>

                        <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
                            <TextField
                                label="Add incident summary(upto 200 characters)"
                                multiline
                                fullWidth
                                rows={4}
                                variant="outlined"
                            />
                        </Box>
                    </Box>

                    <Typography fontWeight={"medium"} textAlign={"left"} marginY={2}>Are you sure you want to edit the details?</Typography>

                    <Box marginY={2} width={"100%"} display="flex" gap={2}>
                        <Button variant="contained" color="primary" fullWidth onClick={() => {
                            toast.success("Edited Successfully");
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

export default EditAction;
