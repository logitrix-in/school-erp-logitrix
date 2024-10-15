import { Box, Divider, Typography } from "@mui/material";
import { useState } from "react";
import useClasses from "@/hooks/useClasses";
import Bbox from "@/components/UiComponents/Bbox";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Radio
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddEditSyllabus from "./AddEditSyllabus";

const Manage = () => {
    const { acYear, curYear } = useClasses();
    const [academicYear, setAcademicYear] = useState(curYear);
    const [addEditSyllabusDialogOpen, setAddEditSyllabusDialogOpen] = useState(false);

    const [selectedRow, setSelectedRow] = useState(null);

    const columns = [
        {
            field: "radioButtons",
            headerName: "",
            flex: 0.5,
            renderCell: (params) => (
                <Radio
                    checked={selectedRow?.id === params.row.id}
                    color="primary"
                    sx={{
                        transform: "scale(0.6)",
                    }}
                    inputProps={{ "aria-label": params.row.id }}
                    onChange={() => {
                        setSelectedRow(params.row);  // Store the entire row object
                        console.log('Selected Row Data:', params.row);
                    }}
                />
            ),
        },
        {
            field: "class", headerName: "Class", flex: 1,
        },
        {
            field: "first_term", headerName: "First Term", flex: 1,
        },
        {
            field: "mid_term", headerName: "Mid Term", flex: 1,
        },
        {
            field: "final_term", headerName: "Final Term", flex: 1,
        },
        {
            field: "not_available", headerName: "Not Available", flex: 3,
        },
    ]
    const [rows, setRows] = useState([
        {
            id: 1,
            class: "I",
            first_term: "✅",
            mid_term: "⚠️",
            final_term: "⚠️",
            not_available: "Geography, Environmental Science"
        },
        {
            id: 2,
            class: "II",
            first_term: "✅",
            mid_term: "⚠️",
            final_term: "⚠️",
            not_available: "Geography, Environmental Science"
        },
        {
            id: 3,
            class: "III",
            first_term: "✅",
            mid_term: "⚠️",
            final_term: "⚠️",
            not_available: "Geography, Environmental Science"
        }
    ]);

    return (
        <Bbox borderRadius={2} overflow={"hidden"}>
            <Box bgcolor={"white"} py={1.3} px={2} borderRadius={2} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography fontWeight={"700"} fontSize={"1.1rem"}>
                    Manage
                </Typography>

                <FormControl sx={{ width: "20%" }}>
                    <InputLabel>Academic Year</InputLabel>
                    <Select
                        label="Academic Year"
                        onChange={(e) =>
                            setAcademicYear(e.target.value)
                        }
                        value={academicYear}
                        size="small"
                    >
                        {acYear.map((year) => (
                            <MenuItem key={year} value={year}>
                                {year}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <Divider />
            <Box
                p={2}
            >
                <Box style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Box
                        my={2}
                        style={{
                            backgroundColor: "#E1EEFB",
                            border: "1px solid #3381A5",
                            borderRadius: "16px",
                            width: 120,
                            height: 28,
                            padding: "4px 14px",
                        }}
                    >
                        <Typography
                            style={{
                                fontSize: "12px",
                                fontWeight: "400",
                                color: "#3381A5",
                            }}
                        >
                            {rows.length} Results Found
                        </Typography>
                    </Box>
                </Box>

                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    columnGroupingModel={[
                        {
                            groupId: 'venue',
                            headerName: 'Section',
                            headerAlign: 'center',
                            children: [
                                { field: 'sectionA' },
                                { field: 'sectionB' },
                                { field: 'sectionC' },
                            ],
                        },
                    ]}
                    experimentalFeatures={{
                        columnGrouping: true
                    }}
                />

                <Box
                    display="flex"
                    justifyContent="flex-end"
                    marginY={2}
                    gap={2}
                >
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => { setAddEditSyllabusDialogOpen(true) }}
                    >
                        Add/Edit
                    </Button>

                    <Button
                        color="primary"
                        variant="outlined"
                    >
                        Download
                    </Button>
                </Box>

                <AddEditSyllabus open={addEditSyllabusDialogOpen} close={() => setAddEditSyllabusDialogOpen(false)} />
            </Box >
        </Bbox >
    );
};

export default Manage;