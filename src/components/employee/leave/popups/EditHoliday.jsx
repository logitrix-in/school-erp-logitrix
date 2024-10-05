import { useState } from "react";
import {
    Box,
    Button,
    Dialog,
    TextField,
    IconButton,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { DatePicker } from "@mui/x-date-pickers";
import useEmployees from "@/hooks/useEmployees";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const EditHoliday = ({ open, close, setSelected }) => {
    const { employeeLeaveTypes } = useEmployees();

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedHolidayType, setSelectedHolidayType] = useState('');

    return (
        <Dialog
            fullWidth={false}
            PaperProps={{
                sx: {
                    height: "50%",
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
                        Edit Holiday
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

                    <Box display={'flex'} justifyContent={'space-between'} sx={{ width: '100%' }} gap={4} mt={4}>
                        <TextField label="Enter Holiday Name" fullWidth />

                        <FormControl fullWidth>
                            <InputLabel>Holiday Type</InputLabel>
                            <Select
                                label="Holiday Type"
                                onChange={(e) =>
                                    setSelectedHolidayType(e.target.value)
                                }
                                value={selectedHolidayType}
                            >
                                {employeeLeaveTypes.map((year) => (
                                    <MenuItem key={year} value={year}>
                                        {year}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>


                    <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ width: '100%' }}>
                        <Box display="flex" sx={{ width: '100%' }} gap={4}>
                            <DatePicker
                                label="Start Date"
                                onChange={(newValue) => setStartDate(newValue)}
                                value={startDate}
                                format="DD MMM YYYY"
                                slotProps={{ textField: { fullWidth: true } }}
                            />
                            <DatePicker
                                label="End Date"
                                minDate={startDate}
                                value={endDate}
                                onChange={(newValue) => setEndDate(newValue)}
                                format="DD MMM YYYY"
                                slotProps={{ textField: { fullWidth: true } }}
                            />
                        </Box>
                    </LocalizationProvider>

                    <Box marginY={1} width={"100%"} display="flex" gap={2}>
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

export default EditHoliday;
