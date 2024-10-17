import { Box, Divider, Typography, IconButton, Dialog } from "@mui/material";
import { useState } from "react";
import Bbox from "@/components/UiComponents/Bbox";
import {
    Button
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

const Publish = () => {

    const [publishPopup, setPublishPopup] = useState(false);

    return (
        <Bbox borderRadius={2} overflow={"hidden"} my={4}>
            <Box bgcolor={"white"} py={1.3} px={2} borderRadius={2}>
                <Typography fontWeight={"700"} fontSize={"1.1rem"}>
                    Publish
                </Typography>
            </Box>

            <Divider />
            <Box
                p={2}
            >
                <Typography fontSize={'12px'}>Examination timetables for classes V, VI and VII are ready to be published.  Timetable will be visible to respective students, teachers and guardians once published.  Please cross-check and ensure all details are correct.</Typography>
                <Box display="flex" flexDirection={'row'} justifyContent={'space-between'}
                    gap={2} px={24} py={4}>
                    <Button variant="contained" color="primary" fullWidth onClick={() => setPublishPopup(true)}>
                        Publish Now
                    </Button>
                    <Button variant="outlined" color="primary" fullWidth>
                        Download
                    </Button>
                </Box>

                <PublishNowPopup open={publishPopup} close={() => setPublishPopup(false)} />
            </Box >
        </Bbox >
    );
};

export default Publish;

const PublishNowPopup = ({ open, close }) => {
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
                        Confirmation
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
                <Box display="flex" flexDirection="column" gap={2} p={2} justifyContent="space-between" width={"95%"} margin="auto" alignItems="center">


                    <Typography fontWeight={"medium"} textAlign={"left"} marginY={2}>Are you sure you want to publish the Examsimation Schedule?</Typography>

                    <Box marginY={2} width={"100%"} display="flex" gap={2}>
                        <Button variant="contained" color="primary" fullWidth onClick={() => {
                            toast.success("Updated Successfully");
                            close();
                        }}>Yes</Button>
                        <Button variant="outlined" color="primary" fullWidth onClick={() => {
                            close();
                        }}>No</Button>
                    </Box>
                </Box>

            </Box>


        </Dialog>
    )
}
