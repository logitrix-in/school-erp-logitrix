import {
    Box,
    Button,
    Dialog,
    TextField,
    IconButton,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import ReignsSelect from "../../../UiComponents/ReignsSelect";
import { useState } from "react";

const NewCandidateInvitation = ({ open, close }) => {

    const [selectedJobID, setSelectedJobID] = useState([]);

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
                        New Candidate Invitation
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

                    <TextField placeholder="Enter Name" label="Name of the New Candidate" fullWidth required></TextField>
                    <TextField placeholder="Enter Email ID" label="Email ID of the New Candidate" fullWidth required></TextField>

                    <ReignsSelect
                        multiple
                        label="Job ID"
                        items={[]}
                        defaultValues={[]}
                        onChange={setSelectedJobID}
                        required
                        value={selectedJobID}
                        sx={{
                            width: '100%'
                        }}
                    />

                    <Box display="flex" justifyContent="space-between" width="100%" alignItems="flex-start" gap={4}>
                        <Box display="flex" gap={2} justifyContent="center">
                            <Box display="flex" flexDirection="column" justifyContent="space-between">
                                <Typography mb={2}>Employee Type</Typography>
                                <Typography mb={2}>Department</Typography>
                                <Typography mb={2}>Grade</Typography>
                            </Box>
                            <Box display="flex" flexDirection="column" justifyContent="space-between">
                                <Typography fontWeight="medium" ml={1} mb={2}>: Teaching Staff</Typography>
                                <Typography fontWeight="medium" ml={1} mb={2}>: Physics</Typography>
                                <Typography fontWeight="medium" ml={1} mb={2}>: B2</Typography>
                            </Box>
                        </Box>
                        <Box display="flex" gap={2} justifyContent="center">
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

                    <Typography fontWeight={"medium"} textAlign={"left"} marginY={2} fontStyle={"italic"}>Submission of this form will send the job application link to the candidate</Typography>

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

export default NewCandidateInvitation;
