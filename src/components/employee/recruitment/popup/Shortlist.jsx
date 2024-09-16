import { useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    TextField,
    IconButton,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast, ToastContainer } from "react-toastify";


const Approve = ({ open, close }) => {
    const [comments, setComments] = useState('')

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
                        Shortlist - Confirmation
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
                    <TextField
                        id="comments"
                        label="Enter Reason / Comments"
                        placeholder="Enter Reason / Comments"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                    />

                    <Typography fontWeight={"medium"} textAlign={"left"} marginY={2}>Are you sure you want to shortlist selected candidate(s)?</Typography>

                    <Box marginY={2} width={"100%"} display="flex" gap={2}>
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
