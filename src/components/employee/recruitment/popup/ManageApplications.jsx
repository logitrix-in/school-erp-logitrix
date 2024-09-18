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
import NewCandidateInvitation from './popup/NewCandidateInvitation';
import InternalReferrals from './popup/InternalReferrals';

export default function ManageApplications() {
    const [offlineApplicationPopup, setOfflineApplicationPopup] = useState(false);
    const [inviteNewCandidatePopup, setInviteNewCandidatePopup] = useState(false);
    const [internalReferralPopup, setInternalReferralPopup] = useState(false);

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

                <Box display="grid"
                    gridTemplateColumns="repeat(3, 1fr)"
                    gap={2} px={3} py={4}>
                    <Button variant="contained" color="primary" fullWidth onClick={() => setOfflineApplicationPopup(true)}>
                        Offline Application
                    </Button>
                    <Button variant="contained" color="primary" fullWidth onClick={() => setInviteNewCandidatePopup(true)}>
                        Invite New Candidate
                    </Button>
                    <Button variant="outlined" color="primary" fullWidth onClick={() => setInternalReferralPopup(true)}>
                        Internal Referrals
                    </Button>
                </Box>
            </Bbox>
        </RevealCard>
    )
}
