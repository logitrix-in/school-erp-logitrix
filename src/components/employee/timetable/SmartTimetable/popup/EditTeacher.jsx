import {
    Box,
    Button,
    Dialog,
    TextField,
    IconButton,
    Typography,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from 'react-toastify'
import { useState } from 'react'
import useClasses from '@/hooks/useClasses'

const EditTeacher = ({ open, close }) => {
    const { subjects } = useClasses();
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [periodsPerWeek, setPeriodsPerWeek] = useState('');

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
                    width: "70%",
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
                        Edit Mapping
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

                    <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} gap={2} sx={{ width: '100%', mt: 2 }} >

                        <FormControl sx={{ width: "30%" }}>
                            <InputLabel>Subject</InputLabel>
                            <Select
                                label="Subject"
                                onChange={(e) =>
                                    setSelectedSubject(e.target.value)
                                }
                                value={selectedSubject}
                            >
                                {subjects.map((year) => (
                                    <MenuItem key={year} value={year}>
                                        {year}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl sx={{ width: "48%" }}>
                            <InputLabel id="claim-request-type">Assign Teacher</InputLabel>
                            <Select
                                id="claim-request-type"
                                label="Assign Teacher"
                                placeholder="Assign Teacher"
                                value={selectedEmployee}
                                onChange={(e) => setSelectedEmployee(e.target.value)}
                                renderValue={(selected) => renderEmployeeContent(selected)}

                            >
                                {names.map((item) => renderMenuItem(item))}
                            </Select>
                        </FormControl>

                        <TextField
                            label="Periods per Week"
                            placeholder="Periods per Week"
                            value={periodsPerWeek}
                            onChange={(e) => setPeriodsPerWeek(e.target.value)}
                        />
                    </Box>

                    <Box marginY={4} width={"100%"} display="flex" gap={2}>
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

export default EditTeacher;
