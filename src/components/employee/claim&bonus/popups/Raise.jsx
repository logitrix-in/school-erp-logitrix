import { useState } from "react";
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
    MenuItem
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useEmployees from "../../../../hooks/useEmployees";
import { toast } from 'react-toastify'

const Raise = ({ open, close }) => {
    const { employeeClaimRequestType } = useEmployees();
    const [file, setFile] = useState("");
    const [amount, setAmount] = useState('')
    const [selectedRequestType, setSelectedRequestType] = useState('');
    const [customRequestType, setCustomRequestType] = useState('');
    const [comments, setComments] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState('');

    const names = [
        "Arindam Das (AUG202365) Teaching Staff (Physics)",
        "Arindam Dey (AUG205665) Support Staff (Accounts)",
        "Arinesh Ghosh (AUG200165) Teaching Staff (Geography)",
        "Arinika Ghosh (AUG200065) Teaching Staff (History)"
    ];

    function handleAmountChange(e) {
        const inputValue = e.target.value;
        const numericValue = inputValue.replace(/[^0-9]/g, '');

        if (numericValue === '') {
            setAmount('');
        } else {
            setAmount(`₹ ${parseInt(numericValue).toLocaleString('en-IN')}`);
        }
    }

    const renderEmployeeContent = (item) => {
        const match = item.match(/(.*\s*\(AUG\d+\))\s*(.*)/);

        if (match) {
            const [_, nameWithId, role] = match;
            return (
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center'
                }}>
                    <span>
                        {nameWithId}
                    </span>
                    <span style={{
                        backgroundColor: '#e0e0e0',
                        padding: '2px 6px',
                        borderRadius: '16px',
                        fontSize: '0.9em'
                    }}>
                        {role}
                    </span>
                </div>
            );
        }
        return item;
    };


    const renderMenuItem = (item) => {
        return (
            <MenuItem
                value={item}
                key={item}
                sx={{
                    width: '100%',
                    '& .MuiTouchRipple-root': {
                        width: '100%'
                    }
                }}
            >
                {renderEmployeeContent(item)}
            </MenuItem>
        );
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
                                value={selectedRequestType}
                                onChange={(e) => setSelectedRequestType(e.target.value)}
                            >
                                {employeeClaimRequestType.map((type) => (
                                    <MenuItem value={type} key={type}>{type}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl sx={{ width: "48%" }}>
                            <InputLabel id="claim-request-type">Claim Request Type</InputLabel>
                            <Select
                                id="claim-request-type"
                                label="Select Employee(s)"
                                placeholder="Select Employee(s)"
                                value={selectedEmployee}
                                onChange={(e) => setSelectedEmployee(e.target.value)}
                                renderValue={(selected) => renderEmployeeContent(selected)}

                            >
                                {names.map((item) => renderMenuItem(item))}
                            </Select>
                        </FormControl>
                    </Box>

                    {
                        selectedRequestType === 'Others' && (
                            <TextField
                                label="Enter Custom Request Type"
                                placeholder="Enter Custom Request Type"
                                value={customRequestType}
                                onChange={(e) => setCustomRequestType(e.target.value)}
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={2}
                            />
                        )}

                    <Box display="flex" justifyContent="space-between" width="100%" alignItems="center">
                        <TextField
                            id="comments"
                            label="Claim Amount"
                            type="text"
                            placeholder="Enter Claim Amount in ₹"
                            value={amount}
                            onChange={handleAmountChange}
                            variant="outlined"
                            fullWidth
                            sx={{ width: "48%" }}
                            inputProps={{
                                inputMode: 'numeric',
                                pattern: '[0-9]*'
                            }}
                        />

                        <Box sx={{ width: "48%" }}>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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
                        label="Enter Notes/Comments"
                        placeholder="Enter Notes/Comments"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                    />

                    <Box marginY={4} width={"100%"}>
                        <Button variant="contained" color="primary" fullWidth onClick={() => {
                            toast.success("Request ID 258 Raised Successfully");
                            close();
                        }}>Submit</Button>
                    </Box>
                </Box>
            </Box >
        </Dialog >
    );
};

export default Raise;