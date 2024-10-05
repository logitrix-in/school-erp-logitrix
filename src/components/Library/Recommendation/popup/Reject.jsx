import { useState } from "react";
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
import api from "../../../../config/api";

const Reject = ({ open, close, handleGetDetails, selectedRow }) => {
    const [comments, setComments] = useState('');

    const handleSubmit = async () => {
        try {

            const response = await api.post(`/library/recommendation/`, {
                "request_id": selectedRow,
                "status": "Reject",
                comments
            });

            console.log(response);

            if (response.status === 200) {
                toast.success("Updated Successfully");
                handleGetDetails(); // Call function to refresh data if needed
                close(); // Close the dialog
            }
        } catch (err) {
            console.log(err);
            toast.error("Error Occured!");
        }
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
                    bgcolor={"secondary.main"}
                    color={"white"}
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Box />
                    <Typography fontSize={"1.1rem"} textAlign={"center"}>
                        Rejection Details
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


                    <TextField
                        id="comments"
                        label="Comments"
                        placeholder="Enter reason for request rejection along with additional details as deemed  appropriate. This comment will also be visible to the requestor. (Max 160 characters)"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                    />

                    <Typography fontWeight={"medium"} textAlign={"left"} marginY={1}>Are you sure you want to reject?</Typography>

                    <Box marginY={1} width={"100%"} display="flex" gap={2}>
                        <Button variant="contained" color="secondary" fullWidth onClick={() => {
                            handleSubmit()
                        }}>Yes</Button>
                        <Button variant="outlined" color="secondary" fullWidth onClick={() => {
                            close();
                        }}>No</Button>
                    </Box>
                </Box>
            </Box>
        </Dialog >
    );
};

export default Reject;
