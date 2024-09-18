import React, { useState } from "react";
import {
    Box,
    Button,
    Checkbox,
    Radio,
    Divider,
    FormControl,
    InputLabel,
    ListItemIcon,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    Typography,
} from "@mui/material";
import Bbox from "../../UiComponents/Bbox";
import RevealCard from "../../AnimationComponents/RevealCard";
import StageClearance from "./popup/StageClearance";
import AppraisalIncrement from "./popup/AppraisalIncrement";
import AnnualCompensationLetter from "./popup/AnnualCompensationLetter";
import { ToastContainer, toast } from "react-toastify";

export default function Manage() {
    const [stageClearancePopup, setStageClearancePopup] = useState(false);
    const [appraisalIncrementPopup, setAppraisalIncrementPopup] = useState(false);
    const [annualCompensationLetterPopup, setAnnualCompensationLetterPopup] = useState(false);

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

                <StageClearance open={stageClearancePopup} close={() => setStageClearancePopup(false)} />
                <AppraisalIncrement open={appraisalIncrementPopup} close={() => setAppraisalIncrementPopup(false)} />
                <AnnualCompensationLetter open={annualCompensationLetterPopup} close={() => setAnnualCompensationLetterPopup(false)} />

                <Box display="grid"
                    gridTemplateColumns="repeat(3, 1fr)"
                    gap={2} px={3} py={4}>
                    <Button variant="contained" color="primary" fullWidth onClick={() => setStageClearancePopup(true)}>
                        Stage Clearance
                    </Button>
                    <Button variant="contained" color="primary" fullWidth onClick={() => setAppraisalIncrementPopup(true)}>
                        Appraisal Increment
                    </Button>
                    <Button variant="outlined" color="primary" fullWidth onClick={() => setAnnualCompensationLetterPopup(true)}>
                        Annual Compensation Letter
                    </Button>
                </Box>
            </Bbox>
        </RevealCard>
    )
}
