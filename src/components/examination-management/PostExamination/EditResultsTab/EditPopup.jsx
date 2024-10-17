import { Box, Typography, IconButton, Dialog, TextField } from "@mui/material";
import { useState } from "react";
import {
    Button
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

const EditPopup = ({ open, close }) => {
    const [marks, setMarks] = useState('');

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
                        Edit Marks
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
            </Box>

            <Box display="flex" flexDirection="column" gap={2} p={2} justifyContent="space-between" width={"90%"} margin="auto" alignItems="center">
                <Box display="flex" width="100%" >
                    <Box display="flex" gap={2} width="50%" justifyContent="center">
                        <Box display="flex" flexDirection="column" justifyContent="space-between">
                            <Typography mb={2}>Student Name</Typography>
                            <Typography mb={2}>Roll #</Typography>
                        </Box>
                        <Box display="flex" flexDirection="column" justifyContent="space-between">
                            <Typography fontWeight="medium" ml={1} mb={2}>: Priya Naskar (STD569854)</Typography>
                            <Typography fontWeight="medium" ml={1} mb={2}>: 1</Typography>
                        </Box>
                    </Box>
                </Box>

                <TextField
                    fullWidth
                    label="Marks"
                    placeholder="Marks"
                    value={marks}
                    onChange={(e) => setMarks(e.target.value)}
                />

                <Box marginY={2} width={"100%"} display="flex" gap={2}>
                    <Button variant="contained" color="primary" fullWidth onClick={() => {
                        toast.success("Updated Successfully");
                        close();
                    }}>Submit</Button>
                </Box>
            </Box>


        </Dialog >
    )
}
export default EditPopup;