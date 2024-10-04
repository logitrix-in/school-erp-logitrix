import React from "react";
import {
    Box,
    Button,
    Dialog,
    TextField,
    IconButton,
    Typography,
    Autocomplete
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from 'react-toastify'

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
            <Box>
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
                        Assign Teacher
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

                    <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} gap={2} sx={{ width: '100%', mt: 2 }} >

                        <Autocomplete
                            options={['stud 1', 'stud 2', 'stud 3', 'stud 4']}
                            filterSelectedOptions
                            freeSolo={false}
                            fullWidth
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Subject"
                                    placeholder="Subject"
                                    size="small"
                                    variant="outlined"
                                />
                            )}
                        />

                        <Autocomplete
                            options={['stud 1', 'stud 2', 'stud 3', 'stud 4']}
                            filterSelectedOptions
                            freeSolo={false}
                            fullWidth
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Assign Teacher"
                                    placeholder="Assign Teacher"
                                    size="small"
                                    variant="outlined"
                                />
                            )}
                        />

                        <Autocomplete
                            options={['stud 1', 'stud 2', 'stud 3', 'stud 4']}
                            filterSelectedOptions
                            freeSolo={false}
                            fullWidth
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Periods per Week"
                                    placeholder="Periods per Week"
                                    size="small"
                                    variant="outlined"
                                />
                            )}
                        />
                    </Box>

                    <Box marginY={4} width={"100%"} display="flex" gap={2}>
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

export default Approve;
