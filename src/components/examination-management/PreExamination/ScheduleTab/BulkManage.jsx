import { Box, Divider, Typography } from "@mui/material";
import { useState } from "react";
import Bbox from "@/components/UiComponents/Bbox";
import {
    Button
} from "@mui/material";

const UpcomingExaminationSchedule = () => {

    const [uploadPopup, setUploadPopup] = useState(false);

    return (
        <Bbox borderRadius={2} overflow={"hidden"} my={4}>
            <Box bgcolor={"white"} py={1.3} px={2} borderRadius={2}>
                <Typography fontWeight={"700"} fontSize={"1.1rem"}>
                    Bulk Manage
                </Typography>
            </Box>

            <Divider />
            <Box
                p={2}
            >
                <Box display="flex" flexDirection={'row'} justifyContent={'space-between'}
                    gap={2} px={24} py={4}>
                    <Button variant="contained" color="primary" fullWidth>
                        Download Template
                    </Button>
                    <Button variant="outlined" color="primary" fullWidth onClick={() => setUploadPopup(true)}>
                        Upload
                    </Button>
                </Box>

            </Box >
        </Bbox >
    );
};

export default UpcomingExaminationSchedule;
