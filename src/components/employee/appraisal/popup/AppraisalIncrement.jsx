import {
    Box,
    Button,
    Dialog,
    InputLabel,
    TextField,
    IconButton,
    Select,
    MenuItem,
    FormControl,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";

const AppraisalIncrement = ({ open, close }) => {

    const columns = [
        { field: 'space', headerName: '', flex: 0.2 },
        { field: 'grade', headerName: 'Grade', flex: 1 },
        {
            field: 'rating1',
            headerName: '1',
            flex: 1,
            renderCell: (params) => (
                <TextField
                    value={params.value}
                    size="small"
                    onChange={(e) => {
                        // Handle change here
                    }}
                    sx={{ width: '50%' }}
                    InputProps={{
                        endAdornment: '%',
                    }}
                />
            ),
        },
        {
            field: 'rating2',
            headerName: '2',
            flex: 1,
            renderCell: (params) => (
                <TextField
                    value={params.value}
                    size="small"
                    onChange={(e) => {
                        // Handle change here
                    }}
                    InputProps={{
                        endAdornment: '%',
                    }}
                    sx={{ width: '50%' }}
                />
            ),
        },
        {
            field: 'rating3',
            headerName: '3',
            flex: 1,
            renderCell: (params) => (
                <TextField
                    value={params.value}
                    size="small"
                    onChange={(e) => {
                        // Handle change here
                    }}
                    InputProps={{
                        endAdornment: '%',
                    }}
                    sx={{ width: '50%' }}
                />
            ),
        },
        {
            field: 'rating4',
            headerName: '4',
            flex: 1,
            renderCell: (params) => (
                <TextField
                    value={params.value}
                    size="small"
                    onChange={(e) => {
                        // Handle change here
                    }}
                    InputProps={{
                        endAdornment: '%',
                    }}
                    sx={{ width: '50%' }}
                />
            ),
        },
        {
            field: 'rating5',
            headerName: '5',
            flex: 1,
            renderCell: (params) => (
                <TextField
                    value={params.value}
                    size="small"
                    onChange={(e) => {
                        // Handle change here
                    }}
                    InputProps={{
                        endAdornment: '%',
                    }}
                    sx={{ width: '50%' }}
                />
            ),
        },
    ];

    const rows = [
        { id: 1, grade: 'A1', rating1: '2', rating2: '4', rating3: '5', rating4: '6', rating5: '8' },
        { id: 2, grade: 'A2', rating1: '2', rating2: '4', rating3: '5', rating4: '6', rating5: '8' },
        { id: 3, grade: 'A3', rating1: '2', rating2: '4', rating3: '5', rating4: '6', rating5: '8' },
        { id: 4, grade: 'B1', rating1: '2', rating2: '4', rating3: '5', rating4: '6', rating5: '8' },
        { id: 5, grade: 'B2', rating1: '2', rating2: '4', rating3: '5', rating4: '6', rating5: '8' },
        { id: 6, grade: 'B3', rating1: '2', rating2: '4', rating3: '5', rating4: '6', rating5: '8' },
        { id: 7, grade: 'B4', rating1: '2', rating2: '4', rating3: '5', rating4: '6', rating5: '8' },
        { id: 8, grade: 'C1', rating1: '2', rating2: '4', rating3: '5', rating4: '6', rating5: '8' },
        { id: 9, grade: 'C2', rating1: '2', rating2: '4', rating3: '5', rating4: '6', rating5: '8' },
        { id: 10, grade: 'C3', rating1: '2', rating2: '4', rating3: '5', rating4: '6', rating5: '8' },
    ];


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
                        Appraisal Increment
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

                <Box display="flex" flexDirection="column" p={2} justifyContent="space-between" width={"75%"} margin="auto" >

                    <Box display={"flex"} alignItems={"center"}>
                        <Typography fontWeight={"medium"}>Revised Compensation Effective From :</Typography>
                        <FormControl sx={{ width: "30%", marginLeft: "10px" }}>
                            <InputLabel>Month</InputLabel>
                            <Select
                                label="Month"
                            // value={appraisalCycle}
                            // onChange={(e) => setAppraisalCycle(e.target.value)}
                            >
                                <MenuItem value={"2021-22"}>2021-22</MenuItem>
                                <MenuItem value={"2023-24"}>2023-24</MenuItem>
                                <MenuItem value={"2024-25"}>2024-25</MenuItem>
                                <MenuItem value={"2025-26"}>2025-26</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Typography fontWeight={"medium"} marginY={2}>Increment Percentage Grid</Typography>


                    <Box sx={{ width: "100%" }}>
                        <DataGrid
                            autoHeight
                            experimentalFeatures={{
                                columnGrouping: true,
                            }}
                            rows={rows}
                            columns={columns}
                            columnGroupingModel={[
                                {
                                    groupId: "ratings",
                                    headerName: "Ratings",
                                    headerAlign: 'center',
                                    children: [
                                        { field: "rating1" },
                                        { field: "rating2" },
                                        { field: "rating3" },
                                        { field: "rating4" },
                                        { field: "rating5" },
                                    ],
                                },
                            ]}
                            disableRowSelectionOnClick
                        />
                    </Box>


                    <Box marginY={4} width={"100%"}>
                        <Button variant="contained" color="primary" fullWidth onClick={() => {
                            toast.success("Updated Successfully");
                            close();
                        }}>Save</Button>
                    </Box>
                </Box>
            </Box>
        </Dialog >
    );
};

export default AppraisalIncrement;
