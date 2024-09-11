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
import { toast } from "react-toastify";


const AddNewDepartment = ({ open, close }) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
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
                        New Department
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

                    <TextField
                        label="Enter Department Name"
                        fullWidth
                    />

                    <Autocomplete
                        options={["Student 1", "Student 2"]}
                        filterSelectedOptions
                        freeSolo={false}
                        fullWidth
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Enter Head of the Department"
                                label="Enter Head of the Department"
                            />
                        )}
                    />

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

export default AddNewDepartment;
