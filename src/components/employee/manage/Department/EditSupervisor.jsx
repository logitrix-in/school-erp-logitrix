import {
    Box,
    Button,
    Dialog,
    IconButton,
    Typography,
    Select,
    FormControl,
    MenuItem,
    InputLabel
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { useState } from 'react'


const EditSupervisor = ({ open, close }) => {

    const [selectedEmployee, setSelectedEmployee] = useState('');

    const names = [
        "Arindam Das (AUG202365) Teaching Staff (Physics)",
        "Arindam Dey (AUG205665) Support Staff (Accounts)",
        "Arinesh Ghosh (AUG200165) Teaching Staff (Geography)",
        "Arinika Ghosh (AUG200065) Teaching Staff (History)"
    ];

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
                        Edit Supervisor
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

                    <FormControl sx={{ width: "90%" }}>
                        <InputLabel id="claim-request-type">New Supervisor</InputLabel>
                        <Select
                            id="claim-request-type"
                            label="Enter Employee Name or ID"
                            placeholder="New Supervisor"
                            value={selectedEmployee}
                            onChange={(e) => setSelectedEmployee(e.target.value)}
                            renderValue={(selected) => renderEmployeeContent(selected)}
                            sx={{ width: '100%' }}
                        >
                            {names.map((item) => renderMenuItem(item))}
                        </Select>
                    </FormControl>

                    <Box marginY={2} width={"100%"} display="flex" gap={2}>
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

export default EditSupervisor;
