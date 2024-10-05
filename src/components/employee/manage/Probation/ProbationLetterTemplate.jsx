import { useState } from "react";
import RevealCard from "../../../AnimationComponents/RevealCard";
import Bbox from "../../../UiComponents/Bbox";
import {
    Box,
    Divider,
    Typography,
    Button,
} from "@mui/material";
import { ToastContainer } from "react-toastify";
import EditLetter from "./EditLetter";

function ProbationLetterTemplate() {
    const [editLetterPopup, setEditLetterPopup] = useState(false);

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
                        Probation Letter Template
                    </Typography>
                </Box>

                <Divider />

                <ToastContainer />
                <EditLetter open={editLetterPopup} close={() => setEditLetterPopup(false)} />

                <Box display="flex" justifyContent="center" mt={2} mb={5} mr={2}>
                    <Button
                        color="primary"
                        variant="contained"
                        sx={{ mr: 2 }}
                        onClick={() => setEditLetterPopup(true)}
                    >
                        Set Template
                    </Button>
                </Box>
            </Bbox>
        </RevealCard >
    )
}

export default ProbationLetterTemplate;