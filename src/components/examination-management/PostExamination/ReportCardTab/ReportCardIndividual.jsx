import { Box, Divider, Typography } from "@mui/material";
import { useState } from "react";
import Bbox from "@/components/UiComponents/Bbox";
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Radio
} from "@mui/material";
import {
    DataGrid,
} from "@mui/x-data-grid";
import DownloadResultPopup from './DownloadResultPopup';

const UpcomingExaminationSchedule = () => {

    const [downloadPopup, setDownloadPopup] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);

    const names = [
        "Arindam Das (AUG202365) V A (25)",
        "Arindam Dey (AUG205665) V A (25)",
        "Arinesh Ghosh (AUG200165) V A (25)",
        "Arinika Ghosh (AUG200065) V A (25)"
    ];

    const renderStudentContent = (item) => {
        const match = item.match(/(.*\s*\(AUG\d+\))\s*(.*)/);

        if (match) {
            const [_, nameWithId, role] = match;
            return (
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center'
                }}>
                    <span>
                        {nameWithId}
                    </span>
                    <span style={{
                        backgroundColor: '#e0e0e0',
                        padding: '2px 6px',
                        borderRadius: '16px',
                        fontSize: '0.9em'
                    }}>
                        {role}
                    </span>
                </div>
            );
        }
        return item;
    };

    const renderMenuItem = (item) => {
        return (
            <MenuItem
                value={item}
                key={item}
                sx={{
                    width: '100%',
                    '& .MuiTouchRipple-root': {
                        width: '100%'
                    }
                }}
            >
                {renderStudentContent(item)}
            </MenuItem>
        );
    };

    const columns = [
        {
            field: "radioButtons",
            headerName: "",
            flex: 0.4,
            renderCell: (params) => (
                <Radio
                    checked={params.row.id === selectedRow?.id}
                    color="primary"
                    sx={{
                        transform: "scale(0.6)",
                    }}
                    inputProps={{ "aria-label": params.row }}
                    onChange={() => {
                        setSelectedRow(params.row);
                    }}
                />
            ),
        },
        { field: "examination_type", headerName: "Examination Type", flex: 1 },
        {
            field: "percentage_secured", headerName: "Percentage Secured", flex: 1,
        },
    ];

    const rows = [
        {
            id: 1,
            examination_type: "First Term",
            percentage_secured: "95",
        },
        {
            id: 2,
            examination_type: "Mid Term",
            percentage_secured: "80",
        },
        {
            id: 3,
            examination_type: "Final Term",
            percentage_secured: "90",
        },
    ]

    return (
        <Bbox borderRadius={2} overflow={"hidden"} my={4}>
            <Box bgcolor={"white"} py={1.3} px={2} borderRadius={2}>
                <Typography fontWeight={"700"} fontSize={"1.1rem"}>
                    Report Card - Individual
                </Typography>
            </Box>

            <Divider />
            <Box p={2}>

                <Box display={"flex"} gap={1} sx={{ width: '70%', marginY: '16px' }} >
                    <FormControl sx={{ width: "48%" }}>
                        <InputLabel id="claim-request-type">Select Student(s)</InputLabel>
                        <Select
                            id="claim-request-type"
                            label="Select Student(s)"
                            placeholder="Select Student(s)"
                            value={selectedStudent}
                            onChange={(e) => setSelectedStudent(e.target.value)}
                            renderValue={(selected) => renderStudentContent(selected)}

                        >
                            {names.map((item) => renderMenuItem(item))}
                        </Select>
                    </FormControl>
                </Box>

                <Box display={'flex'} justifyContent="space-between" sx={{ width: '100%' }} bgcolor={"primary.light"} px={12} py={1} borderRadius={2}>
                    <Box display={'flex'} gap={2}>
                        <Typography textAlign={"left"} marginY={2}>Student Name :</Typography>
                        <Typography fontWeight={"medium"} textAlign={"left"} marginY={2}>Priya Naskar (STD569854)</Typography>
                    </Box>

                    <Box display={'flex'} gap={2}>
                        <Typography textAlign={"left"} marginY={2}>Class :</Typography>
                        <Typography fontWeight={"medium"} textAlign={"left"} marginY={2}>V</Typography>
                    </Box>

                    <Box display={'flex'} gap={2}>
                        <Typography textAlign={"left"} marginY={2}>Section :</Typography>
                        <Typography fontWeight={"medium"} textAlign={"left"} marginY={2}>B</Typography>
                    </Box>

                    <Box display={'flex'} gap={2}>
                        <Typography textAlign={"left"} marginY={2}>Roll# :</Typography>
                        <Typography fontWeight={"medium"} textAlign={"left"} marginY={2}>25</Typography>
                    </Box>
                </Box>

                <Box width={"80%"} margin={"auto"} mt={4}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        hideFooter
                    />
                </Box>

                <Box display="flex" flexDirection={'row'} justifyContent={'space-between'}
                    gap={2} px={24} py={4}>
                    <Button variant="contained" color="primary" fullWidth onClick={() => setDownloadPopup(true)}>
                        View/Edit Result
                    </Button>
                </Box>

                <DownloadResultPopup open={downloadPopup} close={() => setDownloadPopup(false)} />

            </Box >
        </Bbox >
    );
};

export default UpcomingExaminationSchedule;
