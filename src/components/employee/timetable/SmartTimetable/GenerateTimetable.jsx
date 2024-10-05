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
import PublishSmartTimeTablePopup from './popup/PublishSmartTimetablePopup'
import GenerateSmartTimeTablePopup from './popup/GenerateSmartTimetablePopup'

export default function GenerateTimetable() {
    const navigate = useNavigate();
    const [generateSmartTimeTable, setGenerateSmartTimeTable] = useState(false);
    const [publishSmartTimeTable, setPublishSmartTimeTable] = useState(false);

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
                        Generate / Publish Timetable
                    </Typography>
                </Box>

                <Divider />

                <ToastContainer />
                <GenerateSmartTimeTablePopup open={generateSmartTimeTable} close={() => setGenerateSmartTimeTable(false)} />
                <PublishSmartTimeTablePopup open={publishSmartTimeTable} close={() => setPublishSmartTimeTable(false)} />

                <Box display="grid"
                    gridTemplateColumns="repeat(3, 1fr)"
                    gap={2} px={3} py={4}>
                    <Button variant="contained" color="primary" fullWidth onClick={() => setGenerateSmartTimeTable(true)}>
                        Generate Smart Timetable
                    </Button>
                    <Button variant="outlined" color="primary" fullWidth onClick={() => setPublishSmartTimeTable(true)}>
                        Publish Smart Timetable
                    </Button>
                </Box>
            </Bbox>
        </RevealCard>
    )
}
