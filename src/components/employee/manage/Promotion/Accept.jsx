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
import useEmployees from '@/hooks/useEmployees'
import { useState } from 'react'

const Accept = ({ open, close }) => {
    const { employeeGrade } = useEmployees()

    const [selectedGrade, setSelectedGrade] = useState('');

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
                        Approval
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

                    <Typography textAlign={"left"} color={'primary.main'} fontWeight={'600'} fontSize={20}>Increment recommendation: 5%</Typography>
                    <Typography>Inaccurate promotion increment might lead to adverse financial impact on the business. Please ensure that the increment percentage is duly validated before submitting.</Typography>

                    <TextField label="Increment in Percentage" fullWidth />

                    <FormControl sx={{ width: "100%" }}>
                        <InputLabel>Select Grade</InputLabel>
                        <Select
                            label="Select Grade"
                            onChange={(e) =>
                                setSelectedGrade(e.target.value)
                            }
                            value={selectedGrade}
                        >
                            {employeeGrade.map((year) => (
                                <MenuItem key={year} value={year}>
                                    {year}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>


                    <Typography fontWeight={"medium"} textAlign={"left"} marginY={1} fontStyle={"italic"}>To complete the promotion process, ensure that the promotion letter is issued through Letter Issuance section</Typography>

                    <Box marginY={1} width={"100%"} display="flex" gap={2}>
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

export default Accept;
