import { useState } from "react";
import RevealCard from "../../../AnimationComponents/RevealCard";
import Bbox from "../../../UiComponents/Bbox";
import {
    Box,
    Divider,
    Typography,
    Button,
} from "@mui/material";
import EditLetter from "./popups/EditLetter";

function OfferLetterTemplate() {
    const [setTemplatePopup, setSetTemplatePopup] = useState(false);

    return (
        <RevealCard>
            <Bbox borderRadius={2} overflow={"hidden"} sx={{ mt: 2 }}>
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
                        Offer Letter Template
                    </Typography>
                </Box>

                <Divider />

                <EditLetter open={setTemplatePopup} close={() => setSetTemplatePopup(false)} />

                <Box display="flex" justifyContent="start" my={2} ml={2}>
                    <Button
                        color="primary"
                        variant="contained"
                        sx={{ mr: 2 }}
                        onClick={() => setSetTemplatePopup(true)}
                    >
                        Set Template
                    </Button>
                </Box>
            </Bbox>
        </RevealCard >
    )
}

export default OfferLetterTemplate;