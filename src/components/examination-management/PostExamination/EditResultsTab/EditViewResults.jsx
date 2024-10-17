import { Box, Divider, Typography, Checkbox } from "@mui/material";
import { useState, useCallback, useEffect } from "react";
import Bbox from "@/components/UiComponents/Bbox";
import useClasses from "@/hooks/useClasses";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import IncidentBanner from '@/components/Banner';
import DownloadResultPopup from './DownloadResultPopup';

const EditViewResults = () => {

    const { classes, sections, acYear, curYear } = useClasses();
    const [academicYear, setAcademicYear] = useState(curYear);

    const [downloadPopup, setDownloadPopup] = useState(false);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [selectedExam, setSelectedExam] = useState('');

    const [subjectBucketRow, setSubjectBucketRow] = useState([]);

    const exams = ['Mid Term', 'Final Term', 'Unit Test 1', 'Unit Test 2'];

    const handleSectionAChange = useCallback((event, row) => {
        console.log(subjectBucketRow);
        console.log(row);
        console.log(event);

        setSubjectBucketRow(prevRows => prevRows.map(r =>
            r.id === row.id ? { ...r, sectionA: event.target.checked } : row
        ));
        console.log(subjectBucketRow);

    }, []);

    const handleSectionBChange = useCallback((event, row) => {
        console.log(subjectBucketRow);

        setSubjectBucketRow(prevRows => prevRows.map(r =>
            r.id === row.id ? { ...r, sectionB: event.target.checked } : r
        ));
    }, []);

    const handleSectionCChange = useCallback((event, row) => {
        console.log(subjectBucketRow);

        setSubjectBucketRow(prevRows => prevRows.map(r =>
            r.id === row.id ? { ...r, sectionC: event.target.checked } : r
        ));
    }, []);

    const columns = [
        {
            field: "space", headerName: "", flex: 0.2,
        },
        {
            field: "subject", headerName: "Subject", flex: 1,
        },
        {
            field: "sectionA", headerName: "A", headerAlign: 'center', flex: 1,
            renderCell: (params) => (
                <Box display="flex" alignItems="center" justifyContent="center" textAlign="center" height="100%" width="100%">
                    <Checkbox
                        checked={params.value}
                        onChange={(event) => {
                            handleSectionAChange(event, params.row);
                        }}
                    />
                </Box>
            ),
        },
        {
            field: "sectionB", headerName: "B", headerAlign: 'center', flex: 1,
            renderCell: (params) => (
                <Box display="flex" alignItems="center" justifyContent="center" textAlign="center" height="100%" width="100%">
                    <Checkbox
                        checked={params.value}
                        onChange={(event) => {
                            handleSectionBChange(event, params.row);
                        }}
                    />
                </Box >
            ),
        },
        {
            field: "sectionC", headerName: "C", headerAlign: 'center', flex: 1,
            renderCell: (params) => (
                <Box display="flex" alignItems="center" justifyContent="center" textAlign="center" height="100%" width="100%">
                    <Checkbox
                        checked={params.value}
                        onChange={(event) => {
                            handleSectionCChange(event, params.row);
                        }}
                    />
                </Box >
            ),
        }
    ];

    const [rows, setRows] = useState([
        {
            id: 1,
            subject: "English",
        },
        {
            id: 2,
            subject: "Bengali",
        },
        {
            id: 3,
            subject: "Science",
        },
    ]);

    // Initialize subjectBucketRow with the initial rows data
    useEffect(() => {
        setSubjectBucketRow(rows.map(row => ({
            ...row,
            sectionA: false,
            sectionB: false,
            sectionC: false
        })));
    }, [rows]);

    // Helper function to count total selections
    const getTotalSelections = useCallback(() => {
        return subjectBucketRow.reduce((total, row) => {
            return total + (row.sectionA ? 1 : 0) + (row.sectionB ? 1 : 0) + (row.sectionC ? 1 : 0);
        }, 0);
    }, [subjectBucketRow]);

    return (
        <Bbox borderRadius={2} overflow={"hidden"}>
            <Box bgcolor={"white"} py={1.3} px={2} borderRadius={2} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography fontWeight={"700"} fontSize={"1.1rem"}>
                    Edit/View Results
                </Typography>
            </Box>

            <Divider />
            <Box p={2}>

                <Box bgcolor={'#ECEDED'} py={1} px={2} borderRadius={1}>
                    <Typography my={1}>Result Submission Status</Typography>
                </Box>

                <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="flex-start"
                    justifyContent="flex-start"
                    py={2}
                    gap={4}
                    sx={{ width: "100%" }}
                >

                    <FormControl sx={{ width: "20%" }}>
                        <InputLabel>Academic Year</InputLabel>
                        <Select
                            label="Academic Year"
                            onChange={(e) =>
                                setAcademicYear(e.target.value)
                            }
                            value={academicYear}
                        >
                            {acYear.map((year) => (
                                <MenuItem key={year} value={year}>
                                    {year}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl sx={{ width: "20%" }}>
                        <InputLabel>Examination Name</InputLabel>
                        <Select
                            label="Examination Name"
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

                    <FormControl sx={{ width: "20%" }}>
                        <InputLabel>Select Class</InputLabel>
                        <Select
                            label="Select Class"
                            onChange={(e) =>
                                setSelectedClass(e.target.value)
                            }
                            value={selectedClass}
                        >
                            {classes.map(cls => (
                                <MenuItem key={cls} value={cls}>
                                    {cls}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl sx={{ width: "20%" }}>
                        <InputLabel>Select Section</InputLabel>
                        <Select
                            label="Select Section"
                            onChange={(e) =>
                                setSelectedSection(e.target.value)
                            }
                            value={selectedSection}
                        >
                            {sections.map(cls => (
                                <MenuItem key={cls} value={cls}>
                                    {cls}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <IncidentBanner text="Class I - Mid Term 2024-25" style={{ marginTop: '16px', marginBottom: '16px' }} />

                <Typography>Results Published : ✅</Typography>

                <Box sx={{ width: '60%', margin: 'auto' }}>
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
                                groupId: 'section',
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
                            onClick={() => { setDownloadPopup(true); console.log(subjectBucketRow) }}
                            disabled={getTotalSelections() !== 1}
                        >
                            View/Edit
                        </Button>

                        <Button
                            color="primary"
                            variant="outlined"
                        >
                            Download
                        </Button>
                    </Box>
                </Box>

                <DownloadResultPopup open={downloadPopup} close={() => setDownloadPopup(false)} />

            </Box >
        </Bbox >
    );
};

export default EditViewResults;
