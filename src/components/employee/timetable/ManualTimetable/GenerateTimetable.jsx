import { useState } from "react";
import {
    Box,
    Button,
    Divider,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import Bbox from "../../../UiComponents/Bbox";
import RevealCard from "../../../AnimationComponents/RevealCard";
// import UploadPopup from './popups/UploadPopup'
import Banner from './Banner'
import PublishPopup from './popups/PublishPopup'
import { DataGrid } from "@mui/x-data-grid";
import useClasses from '@/hooks/useClasses'

export default function GenerateTimetable() {
    const { classes, sections } = useClasses();

    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');

    const [uploadPopup, setUploadPopup] = useState(false)
    const [publishPopup, setPublishPopup] = useState(false)

    const SubjectTeacherCell = ({ value }) => (
        <div>
            <Typography variant="body2">{value.subject}</Typography>
            <Typography variant="caption" color="textSecondary" sx={{ bgcolor: value.teacher === 'Satish Mehra' ? '#E8DEF8' : 'inherit', px: 1, py: 0.5, borderRadius: 1 }}>{value.teacher}</Typography>
        </div >
    );

    const columns = [
        { field: 'day', headerName: 'Day', width: 120 },
        {
            field: '10am',
            headerName: '10am - 10:30am',
            width: 150,
            renderCell: (params) => <SubjectTeacherCell value={params.value} />
        },
        {
            field: '1030am',
            headerName: '10:30am - 11am',
            width: 150,
            renderCell: (params) => <SubjectTeacherCell value={params.value} />
        },
        {
            field: '11am',
            headerName: '11am - 11:30am',
            width: 150,
            renderCell: (params) => <SubjectTeacherCell value={params.value} />
        },
        {
            field: '1130am',
            headerName: '11:30am - 12pm',
            width: 150,
            renderCell: (params) => <SubjectTeacherCell value={params.value} />
        },
        {
            field: '12pm',
            headerName: '12pm - 12:30pm',
            width: 150,
            renderCell: (params) => <SubjectTeacherCell value={params.value} />
        },
        {
            field: '1230pm',
            headerName: '12:30pm - 1:00pm',
            width: 150,
            renderCell: (params) => <SubjectTeacherCell value={params.value} />
        },
        {
            field: '1pm',
            headerName: '1:00pm - 1:30pm',
            width: 150,
            renderCell: (params) => <SubjectTeacherCell value={params.value} />
        },
        {
            field: '130pm',
            headerName: '1:30pm - 2:00pm',
            width: 150,
            renderCell: (params) => <SubjectTeacherCell value={params.value} />
        },
    ];

    const rows = [
        {
            id: 1,
            day: 'Monday',
            '10am': {
                subject: 'Hindi',
                teacher: 'Satish Mehra'
            },
            '1030am': {
                subject: 'Math',
                teacher: 'Satish Mehra2'
            },
            '11am': {
                subject: 'English',
                teacher: 'Satish Mehra2'
            },
            '1130am': {
                subject: 'Social Studies',
                teacher: 'Satish Mehra2'
            },
            '12pm': {
                subject: 'Social Studies',
                teacher: 'Satish Mehra2'
            },
            '1230pm': {
                subject: 'Social Studies',
                teacher: 'Satish Mehra2'
            },
            '1pm': {
                subject: 'Social Studies',
                teacher: 'Satish Mehra2'
            },
            '130pm': {
                subject: 'Social Studies',
                teacher: 'Satish Mehra2'
            }
        },
        {
            id: 2,
            day: 'Tuesday',
            '10am': {
                subject: 'Hindi',
                teacher: 'Satish Mehra'
            },
            '1030am': {
                subject: 'Math',
                teacher: 'Satish Mehra2'
            },
            '11am': {
                subject: 'English',
                teacher: 'Satish Mehra2'
            },
            '1130am': {
                subject: 'Social Studies',
                teacher: 'Satish Mehra2'
            },
            '12pm': {
                subject: 'Social Studies',
                teacher: 'Satish Mehra2'
            },
            '1230pm': {
                subject: 'Social Studies',
                teacher: 'Satish Mehra2'
            },
            '1pm': {
                subject: 'Social Studies',
                teacher: 'Satish Mehra2'
            },
            '130pm': {
                subject: 'Social Studies',
                teacher: 'Satish Mehra2'
            }
        },
        {
            id: 3,
            day: 'Wednesday',
            '10am': {
                subject: 'Hindi',
                teacher: 'Satish Mehra'
            },
            '1030am': {
                subject: 'Math',
                teacher: 'Satish Mehra2'
            },
            '11am': {
                subject: 'English',
                teacher: 'Satish Mehra2'
            },
            '1130am': {
                subject: 'Social Studies',
                teacher: 'Satish Mehra2'
            },
            '12pm': {
                subject: 'Social Studies',
                teacher: 'Satish Mehra2'
            },
            '1230pm': {
                subject: 'Social Studies',
                teacher: 'Satish Mehra2'
            },
            '1pm': {
                subject: 'Social Studies',
                teacher: 'Satish Mehra2'
            },
            '130pm': {
                subject: 'Social Studies',
                teacher: 'Satish Mehra2'
            }
        },
        {
            id: 4,
            day: 'Thursday',
            '10am': {
                subject: 'Hindi',
                teacher: 'Satish Mehra'
            },
            '1030am': {
                subject: 'Math',
                teacher: 'Satish Mehra2'
            },
            '11am': {
                subject: 'English',
                teacher: 'Satish Mehra2'
            },
            '1130am': {
                subject: 'Social Studies',
                teacher: 'Satish Mehra2'
            },
            '12pm': {
                subject: 'Social Studies',
                teacher: 'Satish Mehra2'
            },
            '1230pm': {
                subject: 'Social Studies',
                teacher: 'Satish Mehra2'
            },
            '1pm': {
                subject: 'Social Studies',
                teacher: 'Satish Mehra2'
            },
            '130pm': {
                subject: 'Social Studies',
                teacher: 'Satish Mehra2'
            }
        },
        {
            id: 5,
            day: 'Friday',
            '10am': {
                subject: 'Hindi',
                teacher: 'Satish Mehra'
            },
            '1030am': {
                subject: 'Math',
                teacher: 'Satish Mehra2'
            },
            '11am': {
                subject: 'English',
                teacher: 'Satish Mehra2'
            },
            '1130am': {
                subject: 'Social Studies',
                teacher: 'Satish Mehra2'
            },
            '12pm': {
                subject: 'Social Studies',
                teacher: 'Satish Mehra2'
            },
            '1230pm': {
                subject: 'Social Studies',
                teacher: 'Satish Mehra2'
            },
            '1pm': {
                subject: 'Social Studies',
                teacher: 'Satish Mehra2'
            },
            '130pm': {
                subject: 'Social Studies',
                teacher: 'Satish Mehra2'
            }
        }
    ];

    return (
        <RevealCard>
            <Bbox borderRadius={2} overflow={"hidden"} mt={4}>
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
                        Generate / Publish Timetable
                    </Typography>
                </Box>

                <Divider />

                <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    mt={4}
                    p={2}
                    height={50}
                    gap={4}
                >

                    <FormControl sx={{ width: "20%" }}>
                        <InputLabel>Class</InputLabel>
                        <Select
                            label="Class"
                            onChange={(e) =>
                                setSelectedClass(e.target.value)
                            }
                            value={selectedClass}
                        >
                            {classes.map((year) => (
                                <MenuItem key={year} value={year}>
                                    {year}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl sx={{ width: "20%" }}>
                        <InputLabel>Section</InputLabel>
                        <Select
                            label="Section"
                            onChange={(e) =>
                                setSelectedSection(e.target.value)
                            }
                            value={selectedSection}
                        >
                            {sections.map((year) => (
                                <MenuItem key={year} value={year}>
                                    {year}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button variant="contained">Submit</Button>
                </Box>

                <Box display="flex" flexDirection={'row'} justifyContent={'space-between'}
                    gap={2} px={24} py={4}>
                    <Button variant="contained" color="primary" fullWidth>
                        Download Template
                    </Button>
                    <Button variant="outlined" color="primary" fullWidth onClick={() => setUploadPopup(true)}>
                        Upload
                    </Button>
                </Box>

                <Box marginY={4} mx={2}>
                    <Banner text={'Timetable'} />

                    <Typography fontWeight={'medium'} mt={2}>Published</Typography>

                    <Box mt={2} mb={5} style={{ height: "100%" }}>

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
                                        groupId: "IATimetable",
                                        headerName: "Class - I A Timetable",
                                        headerAlign: 'center',
                                        children: [
                                            { field: "10am" },
                                            { field: "1030am" },
                                            { field: "11am" },
                                            { field: "1130am" },
                                            { field: "12pm" },
                                            { field: "1230pm" },
                                            { field: "1pm" },
                                            { field: "130pm" },
                                        ],
                                    },
                                ]}
                                disableRowSelectionOnClick
                            />
                        </Box>

                        <Box marginY={4} display={'flex'} justifyContent={'flex-end'} gap={2}>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => setPublishPopup(true)}
                            >
                                Publish
                            </Button>
                            <Button
                                color="primary"
                                variant="outlined"
                            >
                                Download
                            </Button>
                        </Box>
                    </Box>

                    {/* <UploadPopup open={uploadPopup} close={() => setUploadPopup(false)} /> */}
                    <PublishPopup open={publishPopup} close={() => setPublishPopup(false)} />
                </Box>
            </Bbox>
        </RevealCard>
    )
}
