import {
    Box,
    Dialog,
    IconButton,
    Typography,
    Switch,
    Button
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DataGrid } from "@mui/x-data-grid";
import Bbox from "../../../UiComponents/Bbox";
import RevealCard from "../../../AnimationComponents/RevealCard";

const InternalReferrals = ({ open, close }) => {

    const columns = [
        { field: 'id', headerName: 'Job ID', flex: 1 },
        { field: 'employeeType', headerName: 'Employee Type', flex: 1 },
        { field: 'department', headerName: 'Department', flex: 1 },
        { field: 'grade', headerName: 'Grade', flex: 1 },
        { field: 'roleSpecialization', headerName: 'Role/Specialization', flex: 1 },
        { field: 'classScope', headerName: 'Class Scope', flex: 1 },
        { field: 'openPositions', headerName: 'Open Position(s)', type: 'number', flex: 1 },
        {
            field: 'referralEnablement',
            headerName: 'Referral Enablement Status',
            flex: 1,
            renderCell: (params) => (
                <Switch checked={params.value} />
            ),
        },
    ];

    const rows = [
        {
            id: 'EMP3543543443',
            employeeType: 'Teaching Staff',
            department: 'Science',
            grade: 'B2',
            roleSpecialization: 'House coordinator',
            classScope: 'High School',
            openPositions: 9,
            referralEnablement: true,
        },
        {
            id: 'EMP3543543443',
            employeeType: 'Teaching Staff',
            department: 'Science',
            grade: 'B2',
            roleSpecialization: 'House coordinator',
            classScope: 'High School',
            openPositions: 9,
            referralEnablement: false,
        },
        {
            id: 'EMP3543543443',
            employeeType: 'Teaching Staff',
            department: 'Science',
            grade: 'B2',
            roleSpecialization: 'House coordinator',
            classScope: 'High School',
            openPositions: 9,
            referralEnablement: false,
        },
    ];

    return (
        <Dialog
            fullWidth={false}
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
                        Internal Referrals
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
                    <Bbox
                        my={3}
                        mx={4}
                        pt={2}
                        pb={4}
                        width='100%'
                        borderRadius={2}
                    >
                        <Box display="flex" flexDirection="column" gap={2} p={0} justifyContent="space-between" width={"90%"} margin="auto" >

                            <Box display="flex" justifyContent="flex-end" mt={2}>
                                <Button variant="outlined" sx={{ borderRadius: 16 }}>
                                    80 results found
                                </Button>
                            </Box>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                disableRowSelectionOnClick
                            />

                        </Box>
                    </Bbox>
                </RevealCard>
            </Box>
        </Dialog >
    );
};

export default InternalReferrals;
