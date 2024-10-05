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
import useEmployees from "@/hooks/useEmployees";

const RuleEdit = ({ open, close, setSelected }) => {
    const { employeeCreditCycle } = useEmployees();

    const [selectedCreditCycle, setSelectedCreditCycle] = useState('');

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
                        Edit
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

                    <Box display={'flex'} justifyContent={'flex-start'} alignItems={'flex-start'} textAlign={'left'} >
                        <Typography marginY={1}>Type of Leave:</Typography>
                        <Typography fontWeight={"medium"} marginY={1} marginLeft={1}>Privilege Leave </Typography>
                    </Box>

                    <Box display={'flex'} justifyContent={'space-between'} sx={{ width: '100%' }} gap={4}>
                        <TextField label="Leave Allocation" fullWidth />

                        <FormControl fullWidth>
                            <InputLabel>Credit Cycle</InputLabel>
                            <Select
                                label="Credit Cycle"
                                onChange={(e) =>
                                    setSelectedCreditCycle(e.target.value)
                                }
                                value={selectedCreditCycle}
                            >
                                {employeeCreditCycle.map((credit) => (
                                    <MenuItem key={credit} value={credit}>
                                        {credit}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    <Box display={'flex'} justifyContent={'space-between'} sx={{ width: '100%' }} gap={4}>
                        <TextField label="Yearly Carry Forward Limit" fullWidth />

                        <TextField label="Start-of Year Leave Cap" fullWidth />
                    </Box>

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

export default RuleEdit;
