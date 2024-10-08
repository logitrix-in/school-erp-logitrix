import { useState } from "react";
import {
    Box,
    Button,
    Dialog,
    TextField,
    IconButton,
    Typography,
    Select,
    FormControl,
    MenuItem,
    InputLabel
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";


const AddNewDepartment = ({ open, close }) => {
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
                        New Department
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

                <Box display="flex" flexDirection="column" gap={2} p={2} justifyContent="space-between" width={"80%"} margin="auto" alignItems="center">

                    <TextField
                        label="Enter Department Name"
                        fullWidth
                    />

                    <FormControl sx={{ width: "100%" }}>
                        <InputLabel id="claim-request-type">Enter Head of the Department</InputLabel>
                        <Select
                            id="claim-request-type"
                            label="Enter Head of the Department"
                            placeholder="Enter Head of the Department"
                            value={selectedEmployee}
                            onChange={(e) => setSelectedEmployee(e.target.value)}
                            renderValue={(selected) => renderEmployeeContent(selected)}

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

export default AddNewDepartment;
