import {
    Box,
    Button,
    Dialog,
    IconButton,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

const Publish = ({ open, close }) => {

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
                        Publish
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

                <Box display="flex" flexDirection="column" gap={2} p={2} justifyContent="space-between" width={"90%"} margin="auto" alignItems="center">

                    <Typography fontStyle={'italic'}>Once Results are published, students and parents can view the results in their respective accounts. They can download the e-report card from the account itself.</Typography>

                    <Typography fontWeight={"medium"} textAlign={"left"} marginY={1}>Are you sure you want to publish?</Typography>

                    <Box marginY={1} width={"100%"} display="flex" gap={2}>
                        <Button variant="contained" color="primary" fullWidth onClick={() => {
                            toast.success("Card Issued Successfully");
                            close();
                        }}>Yes</Button>
                        <Button variant="outlined" color="primary" fullWidth onClick={() => {
                            close();
                        }}>No</Button>
                    </Box>


                </Box>
            </Box>
        </Dialog >
    );
};

export default Publish;
