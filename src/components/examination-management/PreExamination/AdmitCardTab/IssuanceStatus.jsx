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

const IssuanceStatus = () => {
    const { acYear, curYear } = useClasses();
    const [academicYear, setAcademicYear] = useState(curYear);
    const [selectedExam, setSelectedExam] = useState('');

    const [selectedRow, setSelectedRow] = useState(null);

    const exams = ['Mid Term', 'Final Term', 'Unit Test 1', 'Unit Test 2'];

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
            field: "sectionA", headerName: "Section A", flex: 1,
        },
        {
            field: "sectionB", headerName: "Section B", flex: 1,
        },
        {
            field: "sectionC", headerName: "Section C", flex: 1,
        },
    ]
    const [rows, setRows] = useState([
        {
            id: 1,
            class: "I",
            sectionA: "✅",
            sectionB: "⚠️",
            sectionC: "✅",
        },
        {
            id: 2,
            class: "II",
            sectionA: "✅",
            sectionB: "⚠️",
            sectionC: "✅",
        },
        {
            id: 3,
            class: "III",
            sectionA: "✅",
            sectionB: "⚠️",
            sectionC: "✅",
        }
    ]);

    return (
        <Bbox borderRadius={2} overflow={"hidden"}>
            <Box bgcolor={"white"} py={1.3} px={2} borderRadius={2} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography fontWeight={"700"} fontSize={"1.1rem"}>
                    Issuance Status
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
                <Box
                    width={"23rem"}
                    py={2}
                    borderRadius={1}
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={'space-between'}
                    gap={2}
                >

                    <FormControl sx={{ width: "100%" }}>
                        <InputLabel>Exam Type</InputLabel>
                        <Select
                            label="Exam Type"
                            onChange={(e) =>
                                setSelectedExam(e.target.value)
                            }
                            value={selectedExam}
                        >
                            {exams.map((exam) => (
                                <MenuItem key={exam} value={exam}>
                                    {exam}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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
                    >
                        Download Admit Card
                    </Button>

                    <Button
                        color="primary"
                        variant="outlined"
                    >
                        Download Issuance Report
                    </Button>
                </Box>
            </Box >
        </Bbox >
    );
};

export default IssuanceStatus;