import {
    Box,
    Button,
    Dialog,
    TextField,
    IconButton,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DatePicker } from "@mui/x-date-pickers";
import { toast } from 'react-toastify'
import { useState } from 'react'
import api from "../../../../config/api";
import dayjs from 'dayjs';

const Accept = ({ open, close, handleGetDetails, selectedRow }) => {
    const [comments, setComments] = useState('');
    const [eta, setEta] = useState(null);

    const handleSubmit = async () => {
        try {
            console.log(eta);

            const formattedEta = eta ? dayjs(eta).format('YYYY-MM-DD') : null;

            const response = await api.post(`/library/recommendation/`, {
                "request_id": selectedRow,
                "status": "Accept",
                estimated_time_of_arrival: formattedEta,
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
                    bgcolor={"primary.main"}
                    color={"white"}
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Box />
                    <Typography fontSize={"1.1rem"} textAlign={"center"}>
                        Acceptance Details
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

                    <Box width="100%">
                        <DatePicker
                            label="Estimated Time of Arrival"
                            value={eta}
                            onChange={(newValue) => setEta(newValue)}
                            format="YYYY-MM-DD"
                            sx={{ width: '100%' }}
                        />
                    </Box>

                    <TextField
                        id="comments"
                        label="Comments"
                        placeholder="Enter reason for request acceptance along with additional details as deemed  appropriate. This comment will also be visible to the requestor. (Max 160 characters)"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                    />

                    <Typography fontWeight={"medium"} textAlign={"left"} marginY={1}>Are you sure you want to accept?</Typography>

                    <Box marginY={1} width={"100%"} display="flex" gap={2}>
                        <Button variant="contained" color="primary" fullWidth onClick={() => {
                            handleSubmit();
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

export default Accept;
