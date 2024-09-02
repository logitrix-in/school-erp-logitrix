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
    Select,
    MenuItem,
    FormControl,
    Typography,
} from "@mui/material";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import CloseIcon from "@mui/icons-material/Close";
import { ToastContainer, toast } from "react-toastify";
import Navigator from "../Navigator";
import { IssueLetter } from './IssueLetter'
import { SetTemplate } from './SetTemplate'

const AnnualCompensationLetter = ({ open, close }) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [active, setActive] = useState(0);

    const navs = [
        {
            name: "Issue Letter",
        },
        {
            name: "Set Template",
        }
    ];


    return (
        <Dialog
            fullWidth
            PaperProps={{
                sx: {
                    maxHeight: "100%",
                },
            }}
            maxWidth={active === 0 ? "md" : active === 1 ? "lg" : "md"}
            open={open}
            onClose={() => close()}
            disableEnforceFocus={true}
        >
            <Box sx={{
                overflowY: "auto",
                '&::-webkit-scrollbar': {
                    display: 'none',
                },
                scrollbarWidth: 'none',
                '-ms-overflow-style': 'none',
            }}
                border={"1px solid"}>
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
                        Annual Compensation Letter
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

                <Box display="flex" flexDirection="column" p={2} justifyContent="space-between" width={"100%"} margin="auto"
                >
                    <Box top={0} left={2}>
                        <Navigator navs={navs} onChange={setActive} />
                    </Box>
                </Box>

                <Box display="flex" flexDirection="column" p={2} justifyContent="space-between" width={"75%"} margin="auto">
                    <Box mb={2} />
                    {active == 0 && <IssueLetter close={close} />}
                    {active == 1 && <SetTemplate close={close} />}

                </Box>

            </Box>
        </Dialog >
    );
};

export default AnnualCompensationLetter;
