import { useState } from 'react';
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
import ReignsSelect from '@/components/UiComponents/ReignsSelect'
import { useNavigate } from 'react-router-dom';

const Approve = ({ open, close }) => {
    const navigate = useNavigate();

    const [selectedDocuments, setSelectedDocuments] = useState([])
    const [comments, setComments] = useState('')

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
                        Re-submission
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

                    <Box display="flex" flexDirection="column" gap={2} p={2} justifyContent="space-between" width={"75%"} margin="auto" alignItems="center">

                        <Typography sx={{ fontWeight: '600' }}>Select the documents those require re-submission</Typography>

                        <ReignsSelect
                            multiple
                            items={["Document 1", "Document 2", "Document 3"]}
                            defaultValues={["Document 1", "Document 2", "Document 3"]}
                            onChange={setSelectedDocuments}
                            value={selectedDocuments}
                            label="Select Documents"
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            id="comments"
                            label="Enter Reason / Comments"
                            placeholder="Enter Reason / Comments"
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                        />
                    </Box>

                    <Box marginY={2} width={"100%"} display="flex" gap={2}>
                        <Button variant="contained" color="primary" fullWidth onClick={() => {
                            toast.success("Updated Successfully");
                            navigate('/employee/recruitment/onboarding/');
                            close();
                        }}>Resend Onboarding Form</Button>
                    </Box>
                </Box>
            </Box>
        </Dialog >
    );
};

export default Approve;
