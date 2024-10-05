import React from "react";
import {
    Box,
    Button,
    Dialog,
    IconButton,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { AlertTriangle } from 'lucide-react';

const DeleteDepartment = ({ open, close }) => {

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
                        Modify Department
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

                    <Box sx={{ border: '1px solid gray', borderRadius: '100%', padding: '12px' }}>
                        <AlertTriangle size={80} color="#c4673b" />
                    </Box>

                    <Box display={'flex'} justifyContent={'space-between'} sx={{ width: '100%', mt: 2 }}>
                        <Typography>Department Name: Chemistry</Typography>
                        <Typography>Head of Department: Chetan Bhagat</Typography>
                    </Box>

                    <Typography
                        sx={{
                            fontWeight: "400",
                            fontSize: "16px",
                            my: '16px'
                        }}
                    >
                        The department would be deleted permanently. All employees under this department will be assigned to the unallocated pool
                    </Typography>

                    <Typography
                        sx={{
                            fontWeight: "500",
                            fontSize: "16px",
                        }}
                    >
                        Are you sure you want to delete the department permanently?
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "20px",
                            gap: 4
                        }}
                    >
                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{ width: "200px" }}
                            onClick={() => { close(); toast.success("Penalty added successfully") }}
                        >
                            Yes
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            sx={{ width: "200px" }}
                            onClick={() => close()}
                        >
                            No
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Dialog >
    );
};

export default DeleteDepartment;
