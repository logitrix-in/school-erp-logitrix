import { Box, Divider, Typography } from "@mui/material";
import { useState } from "react";
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
import EmployeePopup from "@/components/employee/EmployeePopup";
import IncidentBanner from '@/components/Banner';
import Tooltip from '@mui/material/Tooltip';
import Notify from './Notify'
import Publish from './Publish'

const Results = () => {

    const { classes, acYear, curYear } = useClasses();
    const [academicYear, setAcademicYear] = useState(curYear);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedExam, setSelectedExam] = useState('');

    const [publishPopup, setPublishPopup] = useState(false);
    const [notifyPopup, setNotifyPopup] = useState(false);
    const [employeePopup, setEmployeePopup] = useState(false);

    const exams = ['Mid Term', 'Final Term', 'Unit Test 1', 'Unit Test 2'];

    const columns = [
        {
            field: "section", headerName: "Section", flex: 0.5,
        },
        {
            field: "english", headerName: "English", headerAlign: 'center', flex: 1,
            renderCell: (params) => (
                <Box display={'flex'} flexDirection={'column'}>
                    {

                        params.value === true ? <Tooltip title="Marksheet Submitted">
                            <Typography textAlign={'center'}>
                                ✅
                            </Typography>
                        </Tooltip> :
                            <Tooltip title="Marksheet Pending">
                                <Typography textAlign={'center'}>
                                    ⚠️
                                </Typography>
                            </Tooltip>
                    }

                    <Typography textAlign={'center'} mt={0.4}>
                        {params.row.name}
                    </Typography>
                </Box>
            )
        },
        {
            field: "science", headerName: "Science", headerAlign: 'center', flex: 1,
            renderCell: (params) => (
                <Box display={'flex'} flexDirection={'column'}>
                    {
                        params.value === true ? <Tooltip title="Marksheet Submitted">
                            <Typography textAlign={'center'}>
                                ✅
                            </Typography>
                        </Tooltip> :
                            <Tooltip title="Marksheet Pending">
                                <Typography textAlign={'center'}>
                                    ⚠️
                                </Typography>
                            </Tooltip>
                    }

                    <Typography textAlign={'center'} mt={0.4}>
                        {params.row.name}
                    </Typography>
                </Box>
            )
        },
        {
            field: "mathematics", headerName: "Mathematics", headerAlign: 'center', flex: 1,
            renderCell: (params) => (
                <Box display={'flex'} flexDirection={'column'}>
                    {
                        params.value === true ? <Tooltip title="Marksheet Submitted">
                            <Typography textAlign={'center'}>
                                ✅
                            </Typography>
                        </Tooltip> :
                            <Tooltip title="Marksheet Pending">
                                <Typography textAlign={'center'}>
                                    ⚠️
                                </Typography>
                            </Tooltip>
                    }

                    <Typography textAlign={'center'} mt={0.4}>
                        {params.row.name}
                    </Typography>
                </Box >
            )
        },
        {
            field: "history", headerName: "History", headerAlign: 'center', flex: 1,
            renderCell: (params) => (
                <Box display={'flex'} flexDirection={'column'}>
                    {
                        params.value === true ? <Tooltip title="Marksheet Submitted">
                            <Typography textAlign={'center'}>
                                ✅
                            </Typography>
                        </Tooltip> :
                            <Tooltip title="Marksheet Pending">
                                <Typography textAlign={'center'}>
                                    ⚠️
                                </Typography>
                            </Tooltip>
                    }

                    <Typography textAlign={'center'} mt={0.4}>
                        {params.row.name}
                    </Typography>
                </Box >
            )
        },
        {
            field: "value_education", headerName: "Value Education", headerAlign: 'center', flex: 1,
            renderCell: (params) => (
                <Box display={'flex'} flexDirection={'column'}>
                    {
                        params.value === true ? <Tooltip title="Marksheet Submitted">
                            <Typography textAlign={'center'}>
                                ✅
                            </Typography>
                        </Tooltip> :
                            <Tooltip title="Marksheet Pending">
                                <Typography textAlign={'center'}>
                                    ⚠️
                                </Typography>
                            </Tooltip>
                    }

                    <Typography textAlign={'center'} mt={0.4}>
                        {params.row.name}
                    </Typography>
                </Box >
            )
        },
    ];

    const [rows, setRows] = useState([
        {
            id: 1,
            section: "A",
            english: true,
            science: false,
            mathematics: false,
            history: true,
            value_education: false,
            name: "Jyotika Dutta (AUG559845)",
        },
        {
            id: 2,
            section: "B",
            english: true,
            science: false,
            mathematics: false,
            history: true,
            value_education: false,
            name: "Jyotika Dutta (AUG559845)",
        },
        {
            id: 3,
            section: "C",
            english: true,
            science: false,
            mathematics: false,
            history: true,
            value_education: false,
            name: "Jyotika Dutta (AUG559845)",
        },
    ]);

    const columns2 = [
        { field: "space", headerName: "", flex: 0.2 },
        {
            field: "status", headerName: "Status", flex: 1.5,
            renderCell: (params) => (
                <Box
                    style={{
                        textAlign: 'center',
                        backgroundColor:
                            params.value === "Published"
                                ? "#C6F6D5"
                                : params.value === "Ready to Publish"
                                    ? "#FEEBCB"
                                    : params.value === "Not Ready"
                                        ? "#FFCCCC"
                                        : "transparent",
                        borderRadius: "6px",
                        display: "inline-block",
                        width:
                            params.value === "Published"
                                ? "80px"
                                : params.value === "Ready to Publish"
                                    ? "120px"
                                    : params.value === "Not Ready"
                                        ? "80px"
                                        : "auto"
                    }}
                >
                    {params.value}
                </Box>
            ),
        },
        {
            field: "classes", headerName: "Classes", flex: 1.5,
            renderCell: (params) => (
                <Box display="flex" gap={2}>
                    {params.value.map((val, index) => (
                        <Typography key={index} sx={{ backgroundColor: "#BEE3F8" }} px={1} py={0.5} borderRadius={1}>
                            {val}
                        </Typography>
                    ))}
                </Box>
            ),
        },
        {
            field: "action", headerName: "Action", flex: 1,
            renderCell: (params) => (
                <Typography sx={{ textDecoration: "underline", color: 'blue', cursor: 'pointer' }}>
                    {params.value}
                </Typography>
            ),
        }
    ];

    const [rows2, setRows2] = useState([
        {
            id: 1,
            status: "Published",
            classes: ["I", "II", "III"],
            action: "View Details",
        },
        {
            id: 2,
            status: "Ready to Publish",
            classes: ["I", "II", "III"],
            action: "Publish",
        },
        {
            id: 3,
            status: "Not Ready",
            classes: ["I", "II", "III"],
            action: "Notify",
        },
    ]);

    return (
        <Bbox borderRadius={2} overflow={"hidden"}>
            <Box bgcolor={"white"} py={1.3} px={2} borderRadius={2} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography fontWeight={"700"} fontSize={"1.1rem"}>
                    Results
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

                <Box bgcolor={'#ECEDED'} py={1} px={2} borderRadius={1}><Typography my={1}>Result Submission Status</Typography></Box>

                <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="flex-start"
                    justifyContent="flex-start"
                    py={2}
                    gap={4}
                    sx={{ width: "100%" }}
                >

                    <FormControl sx={{ width: "30%" }}>
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

                    <FormControl sx={{ width: "30%" }}>
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
                </Box>

                <IncidentBanner text="Class I - Mid Term 2024-25" style={{ marginTop: '16px', marginBottom: '16px' }} />

                <Typography>Unpublished: ⚠️</Typography>

                <Box style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Box
                        my={2}
                        style={{
                            backgroundColor: "#E1EEFB",
                            border: "1px solid #3381A5",
                            borderRadius: "16px",
                            width: 120,
                            height: 25,
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
                            groupId: 'subject',
                            headerName: 'Subject',
                            headerAlign: 'center',
                            children: [
                                { field: 'english' },
                                { field: 'science' },
                                { field: 'mathematics' },
                                { field: 'history' },
                                { field: 'value_education' },
                            ],
                        },
                    ]}
                    experimentalFeatures={{
                        columnGrouping: true
                    }}
                    checkboxSelection
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
                        onClick={() => { setPublishPopup(true) }}
                    >
                        Publish
                    </Button>

                    <Button
                        color="primary"
                        variant="outlined"
                        onClick={() => { setNotifyPopup(true) }}
                    >
                        Notify
                    </Button>

                    <Button
                        color="primary"
                        variant="outlined"
                    >
                        Download
                    </Button>
                </Box>


                <Box bgcolor={'#ECEDED'} py={1} px={2} borderRadius={1}><Typography my={1}>Upload Marksheet</Typography></Box>
                <Box
                    p={2}
                >
                    <Box display="flex" flexDirection={'row'} justifyContent={'space-between'}
                        gap={2} px={24} py={2}>
                        <Button variant="contained" color="primary" fullWidth>
                            Download Template
                        </Button>
                        <Button variant="outlined" color="primary" fullWidth>
                            Upload
                        </Button>
                    </Box>
                </Box >

                <Box bgcolor={'#ECEDED'} py={1} px={2} borderRadius={1}><Typography my={1}>Result Status</Typography></Box>

                <DataGrid
                    rows={rows2}
                    columns={columns2}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    columnGroupingModel={[
                        {
                            groupId: 'subject',
                            headerName: 'Subject',
                            headerAlign: 'center',
                            children: [
                                { field: 'english' },
                                { field: 'science' },
                                { field: 'mathematics' },
                                { field: 'history' },
                                { field: 'value_education' },
                            ],
                        },
                    ]}
                    experimentalFeatures={{
                        columnGrouping: true
                    }}
                />

                <Notify open={notifyPopup} close={() => setNotifyPopup(false)} />
                <Publish open={publishPopup} close={() => setPublishPopup(false)} />
                <EmployeePopup open={employeePopup} close={() => setEmployeePopup(false)} />
            </Box >
        </Bbox >
    );
};

export default Results;
