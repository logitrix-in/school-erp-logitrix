import {
    Box,
    Button,
    Dialog,
    TextField,
    IconButton,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

const PromotionIncrement = ({ open, close }) => {
    const grades = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'];

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
            <Box>
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
                        Promotion Increment
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

                    <Box component={"form"} sx={{ width: '100%' }}>
                        {grades.map((grade) => (
                            <Box key={grade} display={'flex'} justifyContent={'space-between'} sx={{ width: '100%' }} gap={4} mb={2}>
                                <TextField
                                    label="Grade"
                                    value={grade}
                                    disabled
                                    sx={{ width: '80%' }}
                                />
                                <TextField
                                    label="Promotional Increment % for Upcoming Cycle"
                                    placeholder="Enter Increment %"
                                    sx={{ width: '80%' }}
                                />
                            </Box>
                        ))}
                    </Box>

                    <Box>
                        <Typography fontStyle="italic">Promotion increment can be further modified at the time of promotion approval.</Typography>
                        <Button
                            variant={"contained"}
                            fullWidth
                            sx={{ mt: 4 }}
                            onClick={() => {
                                toast.success("Increment Applied Successfully");
                                close();
                            }}
                        >
                            Apply
                        </Button>
                    </Box>

                </Box>
            </Box>
        </Dialog >
    );
};

export default PromotionIncrement;
