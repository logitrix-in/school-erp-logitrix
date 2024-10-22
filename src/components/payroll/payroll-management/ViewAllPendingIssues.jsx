import {
    Box,
    Dialog,
    IconButton,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AlertTriangle } from 'lucide-react';

const DeleteDepartment = ({ open, close }) => {

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
                    bgcolor={"secondary.main"}
                    color={"white"}
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Box />
                    <Typography fontSize={"1.1rem"} textAlign={"center"}>
                    View All Pending Issues
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

                <Box display="flex" flexDirection="column" gap={2} px={2} py={4} justifyContent="space-between" width={"80%"} margin="auto" alignItems="center">

                    <Box sx={{ border: '1px solid gray', borderRadius: '100%', padding: '12px' }}>
                        <AlertTriangle size={60} color="#c4673b" />
                    </Box>

                    <Box display={'flex'} flexDirection={'column'}>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <li style={{ color: 'black' }}>
                <Typography sx={{ color: '#19469F', textDecoration: 'underline', mb: 0.4, cursor: 'pointer' }}>
                    5 Employees with No/incorrect Bank details.
                </Typography>
            </li>
            <li style={{ color: 'black' }}>
                <Typography sx={{ color: '#19469F', textDecoration: 'underline', mb: 0.4, cursor: 'pointer' }}>
                    11 pending reimbursement requests.
                </Typography>
            </li>
            <li style={{ color: 'black' }}>
                <Typography sx={{ color: '#19469F', textDecoration: 'underline', mb: 0.4, cursor: 'pointer' }}>
                    3 Employees with No/incorrect PAN Card.
                </Typography>
            </li>
            <li style={{ color: 'black' }}>
                <Typography sx={{ color: '#19469F', textDecoration: 'underline', mb: 0.4, cursor: 'pointer' }}>
                    Professional Tax not set for West Bengal.
                </Typography>
            </li>
        </ul>
    </Box>
                </Box>
            </Box>
        </Dialog >
    );
};

export default DeleteDepartment;
