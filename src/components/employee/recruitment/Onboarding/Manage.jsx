import { useState } from "react";
import {
    Box,
    Button,
    Divider,
    Typography,
} from "@mui/material";
import Bbox from "../../../UiComponents/Bbox";
import RevealCard from "../../../AnimationComponents/RevealCard";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import EditLetter from './popups/EditLetter'

export default function Manage() {
    const navigate = useNavigate();

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

                <ToastContainer />
                <EditLetter open={editTemplatePopup} close={() => setEditTemplatePopup(false)} />

                <Box display="grid"
                    gridTemplateColumns="repeat(3, 1fr)"
                    gap={2} px={3} py={4}>
                    <Button variant="contained" color="primary" fullWidth onClick={() => navigate('/employee/recruitment/onboarding/OfflineOnboardingFormEdit')}>
                        Offline Onboarding
                    </Button>
                    <Button variant="outlined" color="primary" fullWidth onClick={() => setEditTemplatePopup(true)}>
                        Set Joining Letter Template
                    </Button>

                </Box>
            </Bbox>
        </RevealCard>
    )
}
