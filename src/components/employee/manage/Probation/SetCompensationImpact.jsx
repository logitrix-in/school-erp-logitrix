import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    InputLabel,
    Select,
    MenuItem,
    FormControl,
    Typography,
    Dialog,
    IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import useEmployees from "@/hooks/useEmployees";

const SetCompensationImpact = ({ open, close }) => {
    const { employeeGrade } = useEmployees();

    const [rows, setRows] = useState([
        { id: 1, grade: 10, increment: '' },
    ]);

    const handleAddRow = () => {
        const newRow = {
            id: Math.max(...rows.map(row => row.id), 0) + 1,
            grade: 10,
            increment: '',
        };
        setRows([...rows, newRow]);
    };

    const handleDeleteRow = (id) => {
        setRows(rows.filter(row => row.id !== id));
    };

    const handleChange = (id, field, value) => {
        setRows(rows.map(row =>
            row.id === id ? { ...row, [field]: value } : row
        ));
    };

    const handleSubmit = () => {
        console.log('Submitted data:', rows);
        close();
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
                        Edit Compensation Impact
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
            </Box>

            <Box p={2} sx={{ width: '80%', margin: 'auto' }}>
                <Box>
                    <Typography sx={{ fontWeight: 600 }}>Impact</Typography>
                    <Typography>Upon successful completion of the probation period following increments will  applicable for the employees according to their respective grades</Typography>
                </Box>

                <Box mt={6}>
                    {rows.map((row) => (
                        <Box key={row.id} display="flex" alignItems="center" gap={4} mt={4}>

                            <FormControl sx={{ width: "100%" }}>
                                <InputLabel>Grade</InputLabel>
                                <InputLabel id={`grade-label-${row.id}`}>Grade</InputLabel>
                                <Select
                                    label="Grade"
                                    value={row.grade}
                                    onChange={(e) => handleChange(row.id, 'grade', e.target.value)}
                                >
                                    {employeeGrade.map((grade) => (
                                        <MenuItem key={grade} value={grade}>
                                            {grade}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <TextField
                                label="Enter Increment %"
                                placeholder="Enter Increment %"
                                sx={{ width: '100%' }}
                                value={row.increment}
                                onChange={(e) => handleChange(row.id, 'increment', e.target.value)}
                            />
                            <DeleteOutlinedIcon color="error" onClick={() => handleDeleteRow(row.id)} sx={{ cursor: 'pointer' }} />
                        </Box>
                    ))}

                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                        onClick={handleAddRow}
                    >
                        <AddCircleOutlineOutlinedIcon sx={{ mr: 1 }} />
                        Add New
                    </Button>

                    <Box display="flex" justifyContent="center" marginTop="40px" width="100%">
                        <Button variant="contained" fullWidth onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Dialog>
    );
}

export default SetCompensationImpact;