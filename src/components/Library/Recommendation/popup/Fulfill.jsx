import React, { useState } from "react";
import {
    Box,
    Button,
    Dialog,
    InputLabel,
    Divider,
    TextField,
    IconButton,
    Tab,
    Tabs,
    Typography,
} from "@mui/material";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import CloseIcon from "@mui/icons-material/Close";
import { ToastContainer, toast } from "react-toastify";
import api from "../../../../config/api";

const Fulfill = ({ open, close, handleGetDetails, selectedRow, bookDetails }) => {
    const [mediaId, setMediaId] = useState('');
    const [mediaName, setMediaName] = useState('');
    const [author, setAuthor] = useState('');
    const [publications, setPublications] = useState('');
    const [edition, setEdition] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await api.post(`/library/recommendation/`, {
                "request_id": selectedRow,
                "status": "Fulfill",
            });

            console.log(response);

            if (response.status === 200) {
                toast.success("Updated Successfully");
                handleGetDetails();
                close();
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
                        Fulfillment Details
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
                        label="Media ID"
                        fullWidth
                        value={mediaId}
                        required
                        onChange={(e) => setMediaId(e.target.value)}
                    />
                    <TextField
                        label="Media Name"
                        fullWidth
                        required
                        value={mediaName}
                        onChange={(e) => setMediaName(e.target.value)}
                    />
                    <TextField
                        label="Author"
                        fullWidth
                        required
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                    <TextField
                        label="Publications"
                        fullWidth
                        required
                        value={publications}
                        onChange={(e) => setPublications(e.target.value)}
                    />
                    <TextField
                        label="Edition"
                        fullWidth
                        value={edition}
                        onChange={(e) => setEdition(e.target.value)}
                    />

                    <Button variant="contained" color="primary" fullWidth onClick={() => {
                        handleSubmit();
                    }}
                        sx={{ my: 2 }}>Submit</Button>
                </Box>
            </Box>
        </Dialog >
    );
};

export default Fulfill;
