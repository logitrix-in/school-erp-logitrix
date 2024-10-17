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
import IncidentBanner from '@/components/Banner';

const ReportCardBulk = () => {
    const { classes, sections, acYear, curYear } = useClasses();
    const [academicYear, setAcademicYear] = useState(curYear);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [selectedExam, setSelectedExam] = useState('');

    const exams = ['Mid Term', 'Final Term', 'Unit Test 1', 'Unit Test 2'];

    return (
        <Bbox borderRadius={2} overflow={"hidden"}>
            <Box bgcolor={"white"} py={1.3} px={2} borderRadius={2} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography fontWeight={"700"} fontSize={"1.1rem"}>
                    Report Card - Bulk
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

            <Box p={2}>

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
                            {sections.map(section => (
                                <MenuItem key={section} value={section}>
                                    {section}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <IncidentBanner text="Class I - Mid Term 2024-25" style={{ marginTop: '16px', marginBottom: '16px' }} />
                <Box
                    p={2}
                >
                    <Box display="flex" flexDirection={'row'} justifyContent={'space-between'}
                        gap={2} px={24} py={2}>
                        <Button variant="contained" color="primary" fullWidth>
                            Download Report Card
                        </Button>
                        <Button variant="outlined" color="primary" fullWidth>
                            Download Excel
                        </Button>
                    </Box>
                </Box >

            </Box >
        </Bbox >
    );
};

export default ReportCardBulk;
