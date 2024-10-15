import { useState } from "react";
import {
    Box,
    Button,
    Divider,
    Typography,
} from "@mui/material";
import Bbox from "../../../UiComponents/Bbox";
import RevealCard from "../../../AnimationComponents/RevealCard";
import EditLetter from './popups/EditLetter'
import {
    Dialog,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IncidentHeaderBanner from "./Banner";
import { useNavigate } from 'react-router-dom';

export default function Manage() {
    const navigate = useNavigate();

    const [offlineOnboardingPopup, setOfflineOnboardingPopup] = useState(false);
    const [editTemplatePopup, setEditTemplatePopup] = useState(false);

    return (
        <RevealCard>
            <Bbox borderRadius={2} overflow={"hidden"} mt={4}>
                <Box
                    bgcolor={"white"}
                    py={1.3}
                    px={3}
                    borderRadius={2}
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Typography fontWeight={"700"} borderRadius={1} fontSize={"1.1rem"}>
                        Manage
                    </Typography>
                </Box>

                <Divider />

                <Box display="grid"
                    gridTemplateColumns="repeat(3, 1fr)"
                    gap={2} px={3} py={4}>
                    <Button variant="contained" color="primary" fullWidth onClick={() => setOfflineOnboardingPopup(true)}>
                        Offline Onboarding
                    </Button>
                    <Button variant="outlined" color="primary" fullWidth onClick={() => setEditTemplatePopup(true)}>
                        Set Joining Letter Template
                    </Button>

                    <OfflineOnbardingPopup open={offlineOnboardingPopup} close={() => setOfflineOnboardingPopup(false)} />
                    <EditLetter open={editTemplatePopup} close={() => setEditTemplatePopup(false)} />
                </Box>
            </Bbox>
        </RevealCard>
    )
}

const OfflineOnbardingPopup = ({ open, close }) => {
    const navigate = useNavigate();

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
                        Offline Onboarding
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


                    <Box marginY={1} width={"100%"} display="flex" gap={2}>
                        <Button variant="contained" color="primary" fullWidth
                            onClick={() => navigate('/employee/recruitment/onboarding/OfflineOnboardingFormEdit')}
                        >Proceed</Button>
                    </Box>
                </Box>
            </Box>
        </Dialog >
    );
};
