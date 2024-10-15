import {
    Box,
    Button,
    Dialog,
    InputLabel,
    IconButton,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { useState } from "react";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

const Preview = ({ open, close }) => {
    const [docUploaded, setDocUploaded] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setDocUploaded(file.name);
            // You can add additional logic here, such as file validation or starting the upload process
        }
    };

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
                        Issue
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

                <Box display="flex" flexDirection="column" gap={2} p={2} justifyContent="space-between" width={"90%"} margin="auto">

                    <Typography fontWeight={'600'}>Class I - Mid Term 2024-25</Typography>

                    <Box display={'flex'} alignItems={'center'} gap={2}>
                        <Typography>Syllabus:</Typography>
                        {
                            docUploaded ? <Box display={'flex'} alignItems={'center'} gap={2}>
                                <DescriptionOutlinedIcon />
                                <CloseIcon onClick={() => setDocUploaded('')} style={{ cursor: 'pointer' }} />
                            </Box> : <>
                                <input type="file" name="leave-upload" style={{ display: "none" }} id="leave-upload" onChange={handleFileChange} />
                                <InputLabel htmlFor="leave-upload">
                                    <Button color="primary" variant="outlined" component="span" sx={{ ml: '16px' }}>
                                        Upload Syllabus
                                    </Button>
                                </InputLabel>
                            </>
                        }

                    </Box>

                    <Box display="flex" flexDirection="column" gap={2} p={2} justifyContent="space-between" width={"100%"} margin="auto" alignItems="center">
                        <Typography fontWeight={"medium"} textAlign={"left"} marginY={1}>Are you sure you want to overwrite the  existing syllabus?</Typography>

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
            </Box>
        </Dialog >
    );
};

export default Preview;
