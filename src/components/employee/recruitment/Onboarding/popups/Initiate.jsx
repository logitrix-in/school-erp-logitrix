import {
    Box,
    Button,
    Dialog,
    IconButton,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import IncidentHeaderBanner from "../Banner";

const Approve = ({ open, close }) => {

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
                        Initiate - Confirmation
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

                    <IncidentHeaderBanner text="Applied For" style={{ marginTop: "-16px" }} />

                    <Box display="flex" justifyContent="center" width="100%" alignItems="flex-start" >
                        <Box display="flex" gap={0} width="50%" justifyContent="space-between" >
                            <Box display="flex" flexDirection="column" justifyContent="space-between" >
                                <Typography mb={2}>Employee Type</Typography>
                                <Typography mb={2}>Department</Typography>
                                <Typography mb={2}>Grade</Typography>
                            </Box>
                            <Box display="flex" flexDirection="column" justifyContent="space-between">
                                <Typography fontWeight="medium" ml={1} mb={2}>: Teaching Staff</Typography>
                                <Typography fontWeight="medium" ml={1} mb={2}>: Physics</Typography>
                                <Typography fontWeight="medium" ml={1} mb={2}>: B2</Typography>
                            </Box>
                            <Box />
                        </Box>
                        <Box display="flex" gap={0} width="50%" justifyContent="space-between" alignItems={"flex-start"}>
                            <Box display="flex" flexDirection="column" justifyContent="space-between">
                                <Typography mb={2}>Role</Typography>
                                <Typography mb={2}>Class Scope</Typography>
                            </Box>
                            <Box display="flex" flexDirection="column" justifyContent="space-between">
                                <Typography fontWeight="medium" ml={1} mb={2}>: Laboratory Assistant</Typography>
                                <Typography fontWeight="medium" ml={1} mb={2}>: High School</Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }} >
                        <Typography fontWeight={"medium"} marginY={1}>Are you sure you want to send onboarding form to the selected candidate?</Typography>
                    </Box>

                    <Box marginY={1} width={"100%"} display="flex" gap={2}>
                        <Button variant="contained" color="primary" fullWidth onClick={() => {
                            toast.success("Updated Successfully");
                            close();
                        }}>Yes</Button>
                        <Button variant="outlined" color="primary" fullWidth onClick={() => {
                            close();
                        }}>No</Button>
                    </Box>
                </Box>
            </Box>
        </Dialog >
    );
};

export default Approve;
