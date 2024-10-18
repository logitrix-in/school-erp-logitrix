import {
    Box,
    Dialog,
    Divider,
    IconButton,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Bbox from "../UiComponents/Bbox";
import RevealCard from "../AnimationComponents/RevealCard";
import claimID from "../../assets/icons/claimID.png";
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import IncidentHeaderBanner from './Banner'

const EmployeePopup = ({ open, close }) => {

    return (
        <Dialog
            fullWidth
            PaperProps={{
                sx: {
                    maxHeight: "100%",
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
                        Employee Details
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

                <RevealCard>
                    <Bbox borderRadius={2} overflow={"hidden"} mx={2} my={4}>
                        <Box position={"relative"}>
                            <Box
                                position={"absolute"}
                                top={0}
                                left={0}
                                width="150px"
                                height="100%"
                                sx={{
                                    backgroundColor: 'primary.main',
                                    clipPath: 'polygon(0 0, 80% 0, 30% 100%, 0 100%)',
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "white",
                                    zIndex: 1,
                                }}
                            >
                            </Box>
                            <Box
                                position={"absolute"}
                                top={0}
                                left={0}
                                width="150px"
                                height="100%"
                                display={"flex"}
                                flexDirection={"column"}
                                alignItems={"center"}
                                justifyContent={"center"}
                            >
                                <img src={claimID} alt="icon" style={{ width: '100px', marginBottom: '10px', zIndex: 2 }} />
                                <Typography fontWeight={"medium"} fontSize={"0.6rem"} color={"#22543D"} bgcolor={"#C6F6D5"} px={1} py={0.5} borderRadius={1} zIndex={2}>Active</Typography>
                            </Box>

                            <Box
                                position={"absolute"}
                                bottom={0}
                                right={0}
                                padding={2}
                                display={"flex"}
                                flexDirection={"column"}
                                alignItems={"flex-end"}
                            // justifyContent={"center"}
                            // width="150px"
                            // height="100%"
                            >
                                <Box display={'flex'} justifyContent={'center'}>
                                    <CallOutlinedIcon sx={{ marginRight: '4px' }} /><Typography>9909009099</Typography>
                                </Box>
                                <Box display={'flex'} justifyContent={'center'}>
                                    <EmailOutlinedIcon sx={{ marginRight: '4px' }} /><Typography>alma.lawson@example.com</Typography>
                                </Box>
                            </Box>

                            <Box
                                bgcolor={"white"}
                                py={5}
                                px={3}
                                borderRadius={2}
                                display={"flex"}
                                justifyContent={"space-between"}
                                alignItems={"center"}
                                marginLeft={"100px"}
                            >
                                <Box display="flex" justifyContent="center" width="100%" alignItems="center">
                                    <Box display="flex" gap={2} width="25%" justifyContent="center" borderRight="2px solid #E0E0E0">
                                        <Box display="flex" flexDirection="column" justifyContent="space-between">
                                            <Typography mb={2}>Employee Name</Typography>
                                            <Typography mb={2}>Employee ID</Typography>
                                            <Typography mb={2}>Supervisor</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="column" justifyContent="space-between">
                                            <Typography fontWeight="medium" ml={1} mb={2}>: Jay Shaw</Typography>
                                            <Typography fontWeight="medium" ml={1} mb={2}>: 123</Typography>
                                            <Typography fontWeight="medium" ml={1} mb={2}>: Fatima</Typography>
                                        </Box>
                                    </Box>
                                    <Box display="flex" gap={2} width="25%" justifyContent="center" borderRight="2px solid #E0E0E0">
                                        <Box display="flex" flexDirection="column" justifyContent="space-between">
                                            <Typography mb={2}>Employee Type</Typography>
                                            <Typography mb={2}>Department</Typography>
                                            <Typography mb={2}>Class Teacher</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="column" justifyContent="space-between">
                                            <Typography fontWeight="medium" ml={1} mb={2}>: Teaching Staff</Typography>
                                            <Typography fontWeight="medium" ml={1} mb={2}>: Physics</Typography>
                                            <Typography fontWeight="medium" ml={1} mb={2}>: V A</Typography>
                                        </Box>
                                    </Box>
                                    <Box display="flex" gap={2} width="50%" justifyContent="start" paddingLeft={3}>
                                        <Box display="flex" flexDirection="column" justifyContent="space-between">
                                            <Typography mb={2}>Role</Typography>
                                            <Typography mb={2}>Class Scope</Typography>
                                            <Typography mb={2}>Date Of Joining</Typography>
                                        </Box>
                                        <Box display="flex" flexDirection="column" justifyContent="space-between">
                                            <Box display={'flex'} flexDirection="row" gap={1} ml={1} mb={2}><Typography fontWeight="medium">:</Typography>
                                                {Array.from({ length: 4 }).map((_, index) => (
                                                    <Typography
                                                        key={index}
                                                        fontWeight={"medium"}
                                                        fontSize={"0.7rem"}
                                                        color={"#22543D"}
                                                        bgcolor={"#C6F6D5"}
                                                        px={1}
                                                        py={0.5}
                                                        borderRadius={1}
                                                        zIndex={2}
                                                    >
                                                        Active
                                                    </Typography>
                                                ))}
                                            </Box>

                                            <Typography fontWeight="medium" ml={1} mb={2}>: High School</Typography>
                                            <Typography fontWeight="medium" ml={1} mb={2}>: 14 Jul 2020</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Bbox>
                </RevealCard>


                <RevealCard>
                    <Bbox borderRadius={2} overflow={"hidden"} mx={2} my={4}>
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
                                Profile
                            </Typography>
                        </Box>

                        <Divider />

                        <Box display="flex" flexDirection={"column"} width="100%" mb={2} mx={4}>
                            <IncidentHeaderBanner text="Personal Details" />
                            <Box display="flex" justifyContent="start" width="100%" alignItems="center" mt={4}>
                                <Box display="flex" gap={4} justifyContent="start" mr={10}>
                                    <Box display="flex" flexDirection="column" justifyContent="space-between">
                                        <Typography mb={2}>Nationality</Typography>
                                        <Typography mb={2}>Gender</Typography>
                                        <Typography mb={2}>Blood Group</Typography>
                                    </Box>
                                    <Box display="flex" flexDirection="column" justifyContent="space-between">
                                        <Typography fontWeight="medium" ml={1} mb={2}>: Indian</Typography>
                                        <Typography fontWeight="medium" ml={1} mb={2}>: Male</Typography>
                                        <Typography fontWeight="medium" ml={1} mb={2}>: A+</Typography>
                                    </Box>
                                </Box>
                                <Box display="flex" gap={4} justifyContent="start">
                                    <Box display="flex" flexDirection="column" justifyContent="space-between">
                                        <Typography mb={2}>Emergency Contact Number</Typography>
                                        <Typography mb={2}>Emergency Contact Name</Typography>
                                        <Typography mb={2}>Relationship</Typography>
                                    </Box>
                                    <Box display="flex" flexDirection="column" justifyContent="space-between">
                                        <Typography fontWeight="medium" ml={1} mb={2}>: 1234567890</Typography>
                                        <Typography fontWeight="medium" ml={1} mb={2}>: Gita Goswami</Typography>
                                        <Typography fontWeight="medium" ml={1} mb={2}>: Aunt</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Bbox>
                </RevealCard>
            </Box >
        </Dialog >
    );
}

export default EmployeePopup;