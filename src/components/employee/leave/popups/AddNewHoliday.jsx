import React from "react";
import {
    Box,
    Button,
    Dialog,
    InputLabel,
    Divider,
    TextField,
    IconButton,
    Autocomplete,
    Tab,
    Tabs,
    Typography,
} from "@mui/material";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import CloseIcon from "@mui/icons-material/Close";
import { ToastContainer, toast } from "react-toastify";
import { DatePicker } from "@mui/x-date-pickers";

const AddNewHoliday = ({ open, close, setSelected }) => {
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
                        Add New Holiday
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

                <Box display="flex" flexDirection="column" gap={2} p={2} justifyContent="space-between" width={"90%"} margin="auto" alignItems="center">


                    <Typography fontWeight={"medium"} textAlign={"left"} marginY={1}>Academic Year: 2024-25</Typography>

                    <Box display={'flex'} justifyContent={'space-between'}>
                        <TextField label="Enter Holiday Name" />
                        <Autocomplete
                            options={["Student 1", "Student 2"]}
                            filterSelectedOptions
                            freeSolo={false}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Library Card #"
                                    label="Search by Library Card #"
                                />
                            )}
                            sx={{ width: "30%" }}
                        /></Box>

                    <Box>
                        <DatePicker
                            label="Start Date"
                            // onChange={(e) => setStartDate(e)}
                            // minDate={dayjs()}
                            format="DD MMM YYYY"
                        />
                    </Box>

                    <Box marginY={1} width={"100%"} display="flex" gap={2}>
                        <Button variant="contained" color="primary" fullWidth onClick={() => {
                            toast.success("Updated Successfully");
                            setSelected("Accepted");
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

export default AddNewHoliday;
