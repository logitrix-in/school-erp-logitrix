import React from "react";
import {
    Box,
    Button,
    Dialog,
    TextField,
    IconButton,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ToastContainer, toast } from "react-toastify";
import { DatePicker } from "@mui/x-date-pickers";
import ReactFlipCard from "reactjs-flip-card";
import EmpCardFront from "@/assets/cards/emp/front.png";
import EmpCardBack from "@/assets/cards/emp/back.png";

const Preview = ({ open, close }) => {

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
                        Issue
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

                    <Typography fontWeight={'600'}>Are you sure you want to issue admit card for the selected students?</Typography>

                    <Box>
                        <ReactFlipCard
                            flipTrigger="onClick"
                            flipCardStyle={{
                                boxShadow: "0 0 15px -3px #00000068",
                            }}
                            containerStyle={{
                                height: "24rem",
                                width: "15.2rem",
                            }}
                            frontComponent={
                                <img
                                    src={EmpCardFront}
                                    alt="selected-img"
                                />
                            }
                            backComponent={
                                <img
                                    src={EmpCardBack}
                                    alt="selected-img"
                                />
                            }
                        />
                    </Box>


                    <Typography fontWeight={"medium"} textAlign={"left"} marginY={1}>Are you sure you want to issue the library card?</Typography>

                    <Box marginY={1} width={"100%"} display="flex" gap={2}>
                        <Button variant="contained" color="primary" fullWidth onClick={() => {
                            toast.success("Card Issued Successfully");
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

export default Preview;
