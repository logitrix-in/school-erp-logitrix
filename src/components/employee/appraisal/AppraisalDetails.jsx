import React, { useState } from "react";
import {
    Box,
    Button,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Autocomplete,
    TextField,
    Select,
    Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Bbox from "../../UiComponents/Bbox";
import RevealCard from "../../AnimationComponents/RevealCard";

export default function AppraisalDetails() {
    const [appraisalCycle, setAppraisalCycle] = useState("");

    const columns = [
        {
            field: "id",
            headerName: "Employee ID",
            flex: 1,
            renderCell: (params) => (
                <Typography sx={{ cursor: "pointer", color: "primary.main" }}>
                    {params.value}
                </Typography>
            ),
        },
        {
            field: "emp_name",
            headerName: "Employee Name",
            flex: 1.5,
        },
        {
            field: "grade",
            headerName: "Grade",
            flex: 1,
        },
        {
            field: "status",
            headerName: "Status",
            flex: 1,
        },
        {
            field: "department",
            headerName: "Department",
            flex: 1,
        },
        {
            field: "cycle",
            headerName: "Current Appraisal Cycle Stage",
            flex: 1.5,
        },
        {
            field: "pending",
            headerName: "Pending With",
            flex: 1,
        },
        {
            field: "2024",
            headerName: "2024",
            flex: 0.6,
        },
        {
            field: "2023",
            headerName: "2023",
            flex: 0.6,
        },
        {
            field: "2022",
            headerName: "2022",
            flex: 0.6,
        }
    ];

    const rows = [
        {
            id: 'E001',
            emp_name: 'John Doe',
            grade: 'A2',
            status: 'Active',
            department: 'English',
            cycle: 'Supervisor Review',
            pending: 'Geography',
            2024: 2,
            2023: 1,
            2022: 2,
        },
        {
            id: 'E002',
            emp_name: 'Jane Smith',
            grade: 'A2',
            status: 'Active',
            department: 'English',
            cycle: 'Supervisor Review',
            pending: 'Geography',
            2024: 2,
            2023: 1,
            2022: 2,
        },
        {
            id: 'E003',
            emp_name: 'Alice Johnson',
            grade: 'A2',
            status: 'Active',
            department: 'English',
            cycle: 'Supervisor Review',
            pending: 'Geography',
            2024: 2,
            2023: 1,
            2022: 2,
        }
    ];

    return (
        <RevealCard>
            <Bbox borderRadius={2} overflow={"hidden"}>
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
                        View Employee Appraisal Details
                    </Typography>
                </Box>

                <Divider />

                <Box display={"grid"} gridTemplateColumns={"repeat(5, 1fr)"} gap={2} px={3} py={4}>
                    <FormControl fullWidth>
                        <InputLabel>Appraisal Cycle</InputLabel>
                        <Select
                            label="Appraisal Cycle"
                            value={appraisalCycle}
                            onChange={(e) => setAppraisalCycle(e.target.value)}
                        >
                            <MenuItem value={"2021-22"}>2021-22</MenuItem>
                            <MenuItem value={"2023-24"}>2023-24</MenuItem>
                            <MenuItem value={"2024-25"}>2024-25</MenuItem>
                            <MenuItem value={"2025-26"}>2025-26</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>Department</InputLabel>
                        <Select
                            label="Department"
                            value={appraisalCycle}
                            onChange={(e) => setAppraisalCycle(e.target.value)}
                        >
                            <MenuItem value={"2021-22"}>2021-22</MenuItem>
                            <MenuItem value={"2023-24"}>2023-24</MenuItem>
                            <MenuItem value={"2024-25"}>2024-25</MenuItem>
                            <MenuItem value={"2025-26"}>2025-26</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>Grade</InputLabel>
                        <Select
                            label="Grade"
                            value={appraisalCycle}
                            onChange={(e) => setAppraisalCycle(e.target.value)}
                        >
                            <MenuItem value={"2021-22"}>2021-22</MenuItem>
                            <MenuItem value={"2023-24"}>2023-24</MenuItem>
                            <MenuItem value={"2024-25"}>2024-25</MenuItem>
                            <MenuItem value={"2025-26"}>2025-26</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                            label="Status"
                            value={appraisalCycle}
                            onChange={(e) => setAppraisalCycle(e.target.value)}
                        >
                            <MenuItem value={"2021-22"}>2021-22</MenuItem>
                            <MenuItem value={"2023-24"}>2023-24</MenuItem>
                            <MenuItem value={"2024-25"}>2024-25</MenuItem>
                            <MenuItem value={"2025-26"}>2025-26</MenuItem>
                        </Select>
                    </FormControl>

                    <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'}>
                        <Button variant="contained" color="primary">Apply</Button>
                    </Box>
                </Box>

                <Box px={3}>
                    <Autocomplete
                        options={["Student 1", "Student 2"]}
                        filterSelectedOptions
                        freeSolo={false}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Employee name or Employee ID"
                                label="Search by Employee name or Employee ID"
                            />
                        )}
                        sx={{ width: "30%" }}
                    />
                </Box>

                <Box px={3} py={4}>
                    <DataGrid
                        autoHeight
                        experimentalFeatures={{
                            columnGrouping: true,
                        }}
                        rows={rows}
                        columns={columns}
                        columnGroupingModel={[
                            {
                                groupId: "last_3_years",
                                headerName: "Last 3 Year's Ratings",
                                headerAlign: 'center',
                                children: [
                                    { field: "2024" },
                                    { field: "2023" },
                                    { field: "2022" },
                                ],
                            },
                        ]}
                        disableRowSelectionOnClick
                    />
                </Box>

            </Bbox>
        </RevealCard>
    )
}
