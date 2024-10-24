import CloseIcon from "@mui/icons-material/Close";
import IncidentHeaderBanner from "../Banner";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from 'react';
import { TextField, Select, MenuItem, InputLabel, FormControl, Button, IconButton, Box, Typography, Dialog } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const ReleaseOfferLetter = ({ open, close, setSetTemplatePopup }) => {

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [expectedDateOfJoining, setExpectedDateOfJoining] = useState(null);
    const [paymentFrequency, setPaymentFrequency] = useState('');
    const [periodicPayment, setPeriodicPayment] = useState('');
    const [emailList, setEmailList] = useState(['']);
    const [nextStep, setNextStep] = useState(false);
    const [joiningLocation, setJoiningLocation] = useState('');

    const handleAddEmail = () => {
        setEmailList([...emailList, '']);
    };

    const handleRemoveEmail = (index) => {
        const newList = emailList.filter((_, i) => i !== index);
        setEmailList(newList);
    };

    const handleEmailChange = (index, value) => {
        const newList = [...emailList];
        newList[index] = value;
        setEmailList(newList);
    };

    return (
        <Dialog
            fullWidth={false}
            PaperProps={{
                sx: {
                    height: "100%",
                    width: "60%",
                },
            }}
            maxWidth="lg"
            open={open}
            onClose={() => close()}
            disableEnforceFocus={true}
        >
            <Box>
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
                        Offer Letter Details
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

                <Box display="flex" flexDirection="column" gap={2} p={2} justifyContent="center" width={"90%"} margin="auto" alignItems="flex-start">

                    <Box display="flex" justifyContent="center" width="100%" alignItems="flex-start" >
                        <Box display="flex" gap={0} width="50%" justifyContent="space-between" >
                            <Box display="flex" flexDirection="column" justifyContent="space-between" >
                                <Typography mb={2}>Candidate's Name</Typography>
                            </Box>
                            <Box display="flex" flexDirection="column" justifyContent="space-between">
                                <Typography fontWeight="medium" ml={1} mb={2}>: Robin Mandal</Typography>
                            </Box>
                            <Box />
                        </Box>
                        <Box display="flex" gap={0} width="50%" justifyContent="space-between" alignItems={"flex-start"}>
                            <Box display="flex" flexDirection="column" justifyContent="space-between">
                                <Typography mb={2}>Application ID</Typography>
                            </Box>
                            <Box display="flex" flexDirection="column" justifyContent="space-between">
                                <Typography fontWeight="medium" ml={1} mb={2}>: AUG256574</Typography>
                            </Box>
                        </Box>
                    </Box>

                    <IncidentHeaderBanner text="Applied For" style={{ marginTop: '-16px' }} />

                    <Box display="flex" justifyContent="center" width="100%" alignItems="flex-start" >
                        <Box display="flex" gap={0} width="50%" justifyContent="space-between" >
                            <Box display="flex" flexDirection="column" justifyContent="space-between" >
                                <Typography mb={2}>Employee ID</Typography>
                                <Typography mb={2}>Employee Type</Typography>
                                <Typography mb={2}>Department</Typography>
                            </Box>
                            <Box display="flex" flexDirection="column" justifyContent="space-between">
                                <Typography fontWeight="medium" ml={1} mb={2}>: EMP1234</Typography>
                                <Typography fontWeight="medium" ml={1} mb={2}>: Teaching Staff</Typography>
                                <Typography fontWeight="medium" ml={1} mb={2}>: Physics</Typography>
                            </Box>
                            <Box />
                        </Box>
                        <Box display="flex" gap={0} width="50%" justifyContent="space-between" alignItems={"flex-start"}>
                            <Box display="flex" flexDirection="column" justifyContent="space-between">
                                <Typography mb={2}>Grade</Typography>
                                <Typography mb={2}>Role</Typography>
                                <Typography mb={2}>Class Scope</Typography>
                            </Box>
                            <Box display="flex" flexDirection="column" justifyContent="space-between">
                                <Typography fontWeight="medium" ml={1} mb={2}>: B2</Typography>
                                <Typography fontWeight="medium" ml={1} mb={2}>: Laboratory Assistant</Typography>
                                <Typography fontWeight="medium" ml={1} mb={2}>: High School</Typography>
                            </Box>
                        </Box>
                    </Box>

                    {nextStep === false ?
                        <Box sx={{ width: '100%' }}>

                            <Box>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Box display="flex" gap={2}>
                                        <DatePicker
                                            label="Contract Period Starts"
                                            onChange={(newValue) => setStartDate(newValue)}
                                            value={startDate}
                                            format="DD MMM YYYY"
                                            slotProps={{ textField: { fullWidth: true } }}
                                        />
                                        <DatePicker
                                            label="Contract Period Ends"
                                            minDate={startDate}
                                            value={endDate}
                                            onChange={(newValue) => setEndDate(newValue)}
                                            format="DD MMM YYYY"
                                            slotProps={{ textField: { fullWidth: true } }}
                                        />
                                    </Box>
                                </LocalizationProvider>
                            </Box>

                            <FormControl fullWidth margin="normal">
                                <InputLabel>Payment Frequency</InputLabel>
                                <Select
                                    value={paymentFrequency}
                                    onChange={(e) => setPaymentFrequency(e.target.value)}
                                    label="Payment Frequency"
                                >
                                    <MenuItem value="Every 15 Days">Every 15 Days</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField
                                fullWidth
                                margin="normal"
                                label="Periodic Payment Amount"
                                value={periodicPayment}
                                onChange={(e) => setPeriodicPayment(e.target.value)}
                                InputProps={{
                                    startAdornment: <Typography variant="body1">₹</Typography>,
                                }}
                            />

                            <FormControl fullWidth margin="normal">
                                <InputLabel>Joining Location</InputLabel>
                                <Select
                                    value={joiningLocation}
                                    onChange={(e) => setJoiningLocation(e.target.value)}
                                    label="Joining Location"
                                >
                                    <MenuItem value="Select">Select</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        :
                        <Box sx={{ width: '100%' }}>

                            <TextField
                                fullWidth
                                margin="normal"
                                label="Offered CTC"
                                value={periodicPayment}
                                onChange={(e) => setPeriodicPayment(e.target.value)}
                                InputProps={{
                                    startAdornment: <Typography variant="body1">₹</Typography>,
                                }}
                            />

                            <Box>
                                <DatePicker
                                    label="Expected Date of Joining"
                                    value={expectedDateOfJoining}
                                    sx={{ width: '100%' }}
                                    onChange={(newValue) => setExpectedDateOfJoining(newValue)}
                                    renderInput={(params) => <TextField {...params} margin="normal" />}
                                />
                            </Box>

                            <FormControl fullWidth margin="normal">
                                <InputLabel>Joining Location</InputLabel>
                                <Select
                                    value={paymentFrequency}
                                    onChange={(e) => setPaymentFrequency(e.target.value)}
                                    label="Joining Location"
                                >
                                    <MenuItem value="Every 15 Days">Every 15 Days</MenuItem>
                                    {/* Add other options as needed */}
                                </Select>
                            </FormControl>

                            <Box gap={2} display={'flex'}>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Joining Bonus"
                                    value={periodicPayment}
                                    onChange={(e) => setPeriodicPayment(e.target.value)}
                                    InputProps={{
                                        startAdornment: <Typography variant="body1">₹</Typography>,
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Claw-back Period"
                                    value={periodicPayment}
                                    onChange={(e) => setPeriodicPayment(e.target.value)}
                                    InputProps={{
                                        startAdornment: <Typography variant="body1"></Typography>,
                                    }}
                                />
                            </Box>
                        </Box>
                    }

                    <Box sx={{ width: '100%' }}>
                        <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>BCC Email List</Typography>
                        {emailList.map((email, index) => (
                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    value={email}
                                    onChange={(e) => handleEmailChange(index, e.target.value)}
                                    placeholder="E.g. john@example.com"
                                />
                                <IconButton onClick={() => handleRemoveEmail(index)} size="small">
                                    <DeleteOutlineOutlinedIcon color="error" sx={{ cursor: 'pointer' }} />
                                </IconButton>
                            </Box>
                        ))}
                        <Button
                            startIcon={<AddIcon />}
                            onClick={handleAddEmail}
                            variant="text"
                            sx={{ mt: 1 }}
                        >
                            Add New
                        </Button>
                    </Box>

                    {
                        nextStep === false ?
                            <Box marginY={1} width={"100%"} display="flex" gap={2}>
                                <Button variant="contained" color="primary" fullWidth onClick={() => {
                                    setNextStep(true);
                                }}>Save & Next</Button>
                                <Button variant="outlined" color="primary" fullWidth onClick={() => {
                                    close();
                                    setNextStep(false);
                                }}>Cancel</Button>
                            </Box> :
                            <Box marginY={1} width={"100%"} display="flex" gap={2}>
                                <Button variant="contained" color="primary" fullWidth onClick={() => {
                                    console.log('hey!')
                                    setSetTemplatePopup(true);
                                    close();
                                }}>Save & Next</Button>
                                <Button variant="outlined" color="primary" fullWidth onClick={() => {
                                    close();
                                    setNextStep(false);
                                }}>Cancel</Button>
                            </Box>
                    }

                </Box>
            </Box>
        </Dialog >
    );
};

export default ReleaseOfferLetter;
