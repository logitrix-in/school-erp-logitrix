import {
    Box,
    Button,
    Dialog,
    InputLabel,
    IconButton,
    Select,
    MenuItem,
    FormControl,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { useState } from "react";
import useEmployees from "@/hooks/useEmployees";
import ReignsSelect from "@/components/UiComponents/ReignsSelect";


const StageClearance = ({ open, close }) => {
    const { employeeManagementDepartment, employeeTeachingDepartment, employeeSupportStaffDepartment, employeeStages } = useEmployees();
    const [employeeDepartment, setEmployeeDepartment] = useState([...employeeManagementDepartment, ...employeeTeachingDepartment, ...employeeSupportStaffDepartment]);
    const [selectedDepartment, setSelectedDepartment] = useState(employeeDepartment);
    const [selectedStage, setSelectedStage] = useState(employeeStages);

    return (
        <Dialog
            fullWidth
            PaperProps={{
                sx: {
                    maxHeight: "100%",
                },
            }}
            maxWidth="md"
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
                        Stage Clearance
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

                <Box display="flex" flexDirection="column" px={2} py={4} justifyContent="space-between" width={"75%"} margin="auto" >

                    <ReignsSelect
                        multiple
                        items={employeeDepartment}
                        defaultValues={employeeDepartment}
                        onChange={setSelectedDepartment}
                        value={selectedDepartment}
                        label="Department"
                        sx={{ mb: 2 }}
                    />
                    <Typography fontWeight={"medium"} textAlign={"left"} marginY={2}>Move all pending appraisal forms to :</Typography>


                    <FormControl sx={{ width: "100%" }}>
                        <InputLabel>Stage</InputLabel>
                        <Select
                            label="Stage"
                            onChange={(e) =>
                                setSelectedStage(e.target.value)
                            }
                            value={selectedStage}
                            sx={{ marginRight: '16px' }}
                        >
                            {employeeStages.map((stage) => (
                                <MenuItem key={stage} value={stage}>
                                    {stage}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Box marginY={4} width={"100%"}>
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

export default StageClearance;
