import React from "react";
import {
    Box,
    Button,
    Dialog,
    InputLabel,
    Divider,
    TextField,
    IconButton,
    Tab,
    Tabs,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DataGrid } from "@mui/x-data-grid";
import { useMediaQuery } from "@material-ui/core";
import Bbox from "../../../components/UiComponents/Bbox";
import RevealCard from "../../../components/AnimationComponents/RevealCard";
import photo from "../../../assets/icons/photo.png";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ListOfStudents = ({ open, close }) => {

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
                        List of Students
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
                                <img src={photo} alt="icon" style={{ width: '60px', marginBottom: '10px', margin: '8px', borderRadius: '8px', zIndex: 2 }} />
                            </Box>

                            <Box
                                bgcolor={"white"}
                                py={3}
                                px={3}
                                borderRadius={2}
                                display={"flex"}
                                justifyContent={"space-between"}
                                alignItems={"center"}
                                position={"relative"}
                            >
                                <button
                                    style={{
                                        backgroundColor: "#fff",
                                        border: "none",
                                        cursor: "pointer",
                                        position: "absolute",
                                        top: "10px",
                                        right: "10px",
                                    }}
                                >
                                    <MoreVertIcon />
                                </button>
                                <Box display="flex" width="50%" alignItems="center" justifyContent="space-around" marginLeft={12}>
                                    <Box display={'flex'}>
                                        <Typography>Student Name</Typography>
                                        <Typography fontWeight={"medium"}>: Rohit Sen</Typography>
                                    </Box>
                                    <Box display={'flex'}><Typography >Student ID</Typography>
                                        <Typography fontWeight={"medium"}>: STU2201</Typography></Box>
                                    <Box display={'flex'}><Typography >Class</Typography>
                                        <Typography fontWeight={"medium"}>: V</Typography></Box>
                                    <Box display={'flex'}><Typography >Roll #</Typography>
                                        <Typography fontWeight={"medium"}>: 22</Typography></Box>
                                </Box>
                                <Box
                                    width={"20%"}
                                    display={"flex"}
                                    alignItems={"center"}
                                    mr={4}
                                >
                                    <Box
                                        textAlign={"center"}
                                    >
                                        <Typography bgcolor={"#C6F6D5"} fontSize={"0.7rem"} px={1} py={0.6}
                                            borderRadius={1}
                                        >Active</Typography>
                                    </Box>
                                    <Box
                                        borderRadius={1}
                                        p={1}
                                        bgcolor={"#2F7DA1"}
                                        color={"white"}
                                        textAlign={"center"}
                                        display={"flex"}
                                        marginLeft={2}
                                    >
                                        <Typography fontSize={"1rem"}>Due</Typography>
                                        <Typography marginLeft={4} fontSize={"1rem"} fontWeight={600}>₹ 9900</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Bbox>
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
                                <img src={photo} alt="icon" style={{ width: '60px', marginBottom: '10px', margin: '8px', borderRadius: '8px', zIndex: 2 }} />
                            </Box>

                            <Box
                                bgcolor={"white"}
                                py={3}
                                px={3}
                                borderRadius={2}
                                display={"flex"}
                                justifyContent={"space-between"}
                                alignItems={"center"}
                                position={"relative"}
                            >
                                <button
                                    style={{
                                        backgroundColor: "#fff",
                                        border: "none",
                                        cursor: "pointer",
                                        position: "absolute",
                                        top: "10px",
                                        right: "10px",
                                    }}
                                >
                                    <MoreVertIcon />
                                </button>
                                <Box display="flex" width="50%" alignItems="center" justifyContent="space-around" marginLeft={12}>
                                    <Box display={'flex'}>
                                        <Typography>Student Name</Typography>
                                        <Typography fontWeight={"medium"}>: Rohit Sen</Typography>
                                    </Box>
                                    <Box display={'flex'}><Typography >Student ID</Typography>
                                        <Typography fontWeight={"medium"}>: STU2201</Typography></Box>
                                    <Box display={'flex'}><Typography >Class</Typography>
                                        <Typography fontWeight={"medium"}>: V</Typography></Box>
                                    <Box display={'flex'}><Typography >Roll #</Typography>
                                        <Typography fontWeight={"medium"}>: 22</Typography></Box>
                                </Box>
                                <Box
                                    width={"20%"}
                                    display={"flex"}
                                    alignItems={"center"}
                                    mr={4}
                                >
                                    <Box
                                        textAlign={"center"}
                                    >
                                        <Typography bgcolor={"#C6F6D5"} fontSize={"0.7rem"} px={1} py={0.6}
                                            borderRadius={1}
                                        >Active</Typography>
                                    </Box>
                                    <Box
                                        borderRadius={1}
                                        p={1}
                                        bgcolor={"#2F7DA1"}
                                        color={"white"}
                                        textAlign={"center"}
                                        display={"flex"}
                                        marginLeft={2}
                                    >
                                        <Typography fontSize={"1rem"}>No Due</Typography>
                                        <Typography marginLeft={4} fontSize={"1rem"} fontWeight={600}>₹ 9900</Typography>
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

export default ListOfStudents;