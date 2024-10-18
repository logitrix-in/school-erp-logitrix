import {
    Box,
    Button,
    Dialog,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    FormControl,
    IconButton,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ReignsSelect from "../../UiComponents/ReignsSelect";
import { useState } from "react";
import useEmployees from "../../../hooks/useEmployees";
import { toast } from 'react-toastify';

const AddNewBonus = ({ open, close }) => {
    const [selectedPayrollMonth, setSelectedPayrollMonth] = useState([]);
    const [tdsApplicable, setTdsApplicable] = useState("");
    const [selectedStatus, setSelectedStatus] = useState([]);
    const [leaveWithoutPay, setLeaveWithoutPay] = useState([]);
    const [openIncidents, setOpenIncidents] = useState([]);
    const [appriasalRating, setAppraisalRating] = useState([]);

    const { employeeStatus, employeeGrade } = useEmployees();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const [rows, setRows] = useState([
        { id: 1, grade: '', amount: '' },
    ]);

    const handleGradeChange = (id, value) => {
        setRows(rows.map(row =>
            row.id === id ? { ...row, grade: value } : row
        ));
    };

    const handleAmountChange = (id, value) => {
        setRows(rows.map(row =>
            row.id === id ? { ...row, amount: value } : row
        ));
    };

    const addNewRow = () => {
        const newId = Math.max(...rows.map(r => r.id)) + 1;
        setRows([...rows, { id: newId, grade: '', amount: '' }]);
    };

    const deleteRow = (id) => {
        setRows(rows.filter(row => row.id !== id));
    };

    return (
        <Dialog
            fullWidth={false}
            PaperProps={{
                sx: {
                    maxHeight: "90%",
                    width: "60%",
                },
            }}
            maxWidth="lg"
            open={open}
            onClose={() => close()}
            disableEnforceFocus={true}
        >
            <Box
                sx={{
                    overflowY: "auto",
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                    scrollbarWidth: 'none',
                    '-ms-overflow-style': 'none',
                }}
            >
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
                        Edit Bonus
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

                <Box display="flex" flexDirection="column" gap={2} p={2} justifyContent="space-between" width={"95%"} margin="auto">
                    <Box display="flex" flexDirection="row" gap={2}>
                        <TextField placeholder="Bonus Head Name" />

                        <ReignsSelect
                            items={months}
                            multiple
                            label="Payroll Month(s)"
                            defaultValues={months}
                            value={selectedPayrollMonth}
                            onChange={setSelectedPayrollMonth}
                            sx={{ width: "30%" }}
                        />
                    </Box>

                    <Typography textAlign={"left"} marginY={1}>Bonus Amount - Grade wise Distribution</Typography>
                    <Box display="flex" flexDirection="column" gap={2}>
                        {rows.map((row) => (
                            <Box key={row.id} display="flex" flexDirection="row" alignItems="center" gap={2}>
                                <FormControl sx={{ width: "50%" }}>
                                    <InputLabel id={`grade-label-${row.id}`}>Grade</InputLabel>
                                    <Select
                                        labelId={`grade-label-${row.id}`}
                                        id={`grade-${row.id}`}
                                        value={row.grade}
                                        label="Select Grade"
                                        onChange={(e) => handleGradeChange(row.id, e.target.value)}
                                    >
                                    {
                                        employeeGrade.map(item => 
                                            <MenuItem key={item} value={item}>{item}</MenuItem>
                                        )
                                    }
                                    </Select>
                                </FormControl>
                                <Box width="50%">
                                    <TextField
                                        id={`amount-${row.id}`}
                                        label="Amount"
                                        type="number"
                                        placeholder="Enter Amount in ₹"
                                        value={row.amount}
                                        onChange={(e) => handleAmountChange(row.id, e.target.value)}
                                        variant="outlined"
                                        fullWidth
                                        inputProps={{
                                            inputMode: 'numeric',
                                            pattern: '[0-9]*'
                                        }}
                                    />
                                </Box>
                                <DeleteOutlineOutlinedIcon
                                    color="error"
                                    sx={{ cursor: "pointer" }}
                                    onClick={() => deleteRow(row.id)}
                                />
                            </Box>
                        ))}
                    </Box>
                    <Box marginY={1}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={addNewRow}
                        >
                            <AddCircleOutlineOutlinedIcon sx={{ mr: 1 }} />
                            Add New
                        </Button>
                    </Box>

                    <FormControl sx={{ width: "30%" }}>
                        <InputLabel id="tds-applicable">TDS Applicable</InputLabel>

                        <Select placeholder="TDS Applicable" id="tds-applicable" label="TDS Applicable" value={tdsApplicable}
                            onChange={(e) => setTdsApplicable(e.target.value)}>
                            <MenuItem value="yes">Yes</MenuItem>
                            <MenuItem value="no">No</MenuItem>
                        </Select>
                    </FormControl>

                    <Typography textAlign={"left"} marginY={1}>Eligibility Criteria</Typography>

                    <Box display="flex" flexDirection="row" justifyContent={"space-between"} gap={5} fullWidth >
                        <Box display="flex" flexDirection="row" alignItems="center" gap={1} sx={{ width: '100%' }}>
                            <InputLabel sx={{ width: '50%' }}>Employee Status :</InputLabel>
                            <ReignsSelect
                                items={employeeStatus}
                                multiple
                                label="Employee Status"
                                defaultValues={employeeStatus}
                                onChange={setSelectedStatus}
                                value={selectedStatus}
                            />
                        </Box>

                        <Box display="flex" flexDirection="row" alignItems="center" gap={1} sx={{ width: '100%' }}>
                            <InputLabel sx={{ width: '50%' }}>Leave Without Pay :</InputLabel>
                            <ReignsSelect
                                items={["Yes", "No"]}
                                multiple
                                label="Leave Without Pay"
                                defaultValues={["Yes", "No"]}
                                onChange={setLeaveWithoutPay}
                                value={leaveWithoutPay}
                            />
                        </Box>

                    </Box>
                    <Box display="flex" flexDirection="row" justifyContent={"space-between"} gap={5} fullWidth >
                        <Box display="flex" flexDirection="row" alignItems="center" gap={1} sx={{ width: '100%' }}>
                            <InputLabel sx={{ width: '50%' }}>Open Incident(s) :</InputLabel>
                            <ReignsSelect
                                items={["Yes", "No"]}
                                multiple
                                label="Open Incident(s)"
                                defaultValues={["Yes", "No"]}
                                onChange={setOpenIncidents}
                                value={openIncidents}
                            />
                        </Box>
                        <Box display="flex" flexDirection="row" alignItems="center" gap={1} sx={{ width: '100%' }}>
                            <InputLabel sx={{ width: '50%' }}>Appraisal Rating :</InputLabel>
                            <ReignsSelect
                                items={["1", "2", "3", "4", "5"]}
                                multiple
                                label="Appraisal Rating"
                                defaultValues={["1", "2", "3", "4", "5"]}
                                onChange={setAppraisalRating}
                                value={appriasalRating}
                            />
                        </Box>
                    </Box>


                    <Box marginY={4} width={"80%"} marginX={"auto"}>
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

export default AddNewBonus;
