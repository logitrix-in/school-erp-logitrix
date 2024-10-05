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

const Approve = ({ open, close }) => {

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
                        Approve Leave
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
                    <Box display="flex" justifyContent="flex-start" width="100%" alignItems="flex-start" >
                        <Box display="flex" gap={0} width="70%" justifyContent="space-between" >
                            <Box display="flex" flexDirection="column" justifyContent="space-between" >
                                <Typography mb={2}>Employee Name</Typography>
                                <Typography mb={2}>Department</Typography>
                                <Typography mb={2}>Status</Typography>
                                <Typography mb={2}>Supervisor</Typography>
                                <Typography mb={2}>Academic Year</Typography>
                                <Typography mb={2}>Overlapping Leave Summary</Typography>
                            </Box>
                            <Box display="flex" flexDirection="column" justifyContent="space-between">
                                <Typography fontWeight="medium" ml={1} mb={2}>: Priya Naskar</Typography>
                                <Typography fontWeight="medium" ml={1} mb={2}>: Physics</Typography>
                                <Box display={'flex'} alignItems={'center'} ml={1} mb={2}>
                                    <Typography fontWeight="medium">:</Typography>
                                    <Typography fontWeight="medium" ml={1} bgcolor={'#C6F6D5'} paddingX={'8px'} borderRadius={'6px'} fontSize={'0.8rem'}>Active</Typography>
                                </Box>
                                <Typography fontWeight="medium" ml={1} mb={2}>: Ratan Basak (AUG245698)</Typography>
                                <Typography fontWeight="medium" ml={1} mb={2}>: 2024-25</Typography>
                                <Typography fontWeight="medium" ml={1} mb={2}>: Science Department</Typography>
                            </Box>
                            <Box />
                        </Box>
                    </Box>

                    <Box sx={{ width: '100%' }} >
                        <Box display={'flex'} flexDirection={'column'} sx={{ width: '100%' }} justifyContent="flex-end" alignItems="flex-end">
                            <Box display={'flex'} alignItems={'center'}>
                                <Typography mb={2}>Priya Naskar (AG240001)</Typography>
                                <Typography
                                    fontWeight="medium"
                                    ml={1}
                                    mb={2}
                                    bgcolor={'#C6F6D5'}
                                    paddingX={'8px'}
                                    paddingY={'4px'}
                                    borderRadius={'20px'}
                                    fontSize={'0.9rem'}
                                >
                                    Sick Leave (4 Jul 2023 - 10 Jul 2023)
                                </Typography>
                            </Box>
                            <Box display={'flex'}>
                                <Typography mb={2}>Rahul Mondal (AG252401)</Typography>
                                <Typography
                                    fontWeight="medium"
                                    ml={1}
                                    mb={2}
                                    bgcolor={'#C6F6D5'}
                                    paddingX={'8px'}
                                    paddingY={'4px'}
                                    borderRadius={'20px'}
                                    fontSize={'0.9rem'}
                                >
                                    Privilege Leave (4 Jul 2023 - 10 Jul 2023)
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Typography fontWeight={"medium"} textAlign={"left"} marginY={2}>Are you sure you want to approve leave for selected Employee?</Typography>

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
        </Dialog >
    );
};

export default Approve;
