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
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Preview from "./Preview";
import OnHold from "./OnHold";
import Reject from "./Reject";

const Manage = () => {
    const { acYear, curYear, classes, sections } = useClasses();
    const [academicYear, setAcademicYear] = useState(curYear);
    const [selectedExam, setSelectedExam] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [issuePopup, setIssuePopup] = useState(false);
    const [onHoldPopup, setOnHoldPopup] = useState(false);
    const [rejectPopup, setRejectPopup] = useState(false);

    const [selectedRow, setSelectedRow] = useState(null);

    const exams = ['Mid Term', 'Final Term', 'Unit Test 1', 'Unit Test 2'];

    const columns = [
        {
            field: "student_id", headerName: "Student ID", flex: 0.6,
        },
        {
            field: "student_name", headerName: "Student Name", flex: 1.2,
        },
        {
            field: "student_status", headerName: "Student Status", flex: 0.8,
            renderCell: (params) => (
                <Box
                    style={{
                        fontSize: '12px',
                        backgroundColor:
                            params.value === "Active"
                                ? "#C6F6D5"
                                : params.value === "Rejected"
                                    ? "#FED7D7"
                                    : params.value === "Pending"
                                        ? "#FEEBCB"
                                        : "transparent",
                        color:
                            params.value === "Active"
                                ? "#22543D"
                                : params.value === "Rejected"
                                    ? "#822727"
                                    : params.value === "Pending"
                                        ? "#822727"
                                        : "transparent",
                        borderRadius: "6px",
                        display: "inline-block",

                        paddingLeft: "7px",
                        paddingRight: "7px",
                        paddingTop: "2px",
                        paddingBottom: "2px",
                    }}
                >
                    {params.value}
                </Box>
            ),
        },
        {
            field: "open_incidents", headerName: "Open Incident", flex: 1.4,
            renderCell: (params) => (
                <Box sx={{ display: "flex", gap: "8px" }}>
                    {["334545", "334545", "334545"].map((incident, index) => (
                        <Typography
                            key={index}
                            sx={{
                                backgroundColor: "#e8def8",
                                borderRadius: "6px",
                                fontSize: '12px',
                                fontWeight: "600",
                                display: "inline-block",
                                width: "auto",
                                paddingX: "7px",
                                paddingY: "4px",
                            }}
                        >
                            #{incident}
                        </Typography>
                    ))}
                </Box>
            ),
        },
        {
            field: "attendance_percentage", headerName: "Attendance Percentage", flex: 1,
            renderCell: (params) => (
                <Typography style={{ color: `${params.value < 50 ? '#C4673B' : '#555454'}` }}>
                    {params.value} %
                </Typography>
            ),
        },
        {
            field: "issuance_status", headerName: "Issuance Status", flex: 1,
            renderCell: (params) => (
                <Box
                    style={{
                        fontSize: '12px',
                        backgroundColor:
                            params.value === "Issued"
                                ? "#C6F6D5"
                                : params.value === "Rejected"
                                    ? "#FED7D7"
                                    : params.value === "Pending"
                                        ? "#FEEBCB"
                                        : "transparent",
                        color:
                            params.value === "Issued"
                                ? "#22543D"
                                : params.value === "Rejected"
                                    ? "#822727"
                                    : params.value === "Pending"
                                        ? "#822727"
                                        : "transparent",
                        borderRadius: "6px",
                        display: "inline-block",

                        paddingLeft: "7px",
                        paddingRight: "7px",
                        paddingTop: "2px",
                        paddingBottom: "2px",
                    }}
                >
                    {params.value}
                </Box>
            ),
        },
    ]

    const [rows, setRows] = useState([
        {
            id: "STD02035",
            student_id: "STD02035",
            student_name: "Nilima Banik",
            student_status: "Active",
            open_incidents: "#334545",
            attendance_percentage: "43",
            issuance_status: "Issued",
        },
        {
            id: "STD02036",
            student_id: "STD02036",
            student_name: "Nilima Banik",
            student_status: "Active",
            open_incidents: "#334545",
            attendance_percentage: "80",
            issuance_status: "Pending",
        },
        {
            id: "STD02037",
            student_id: "STD02037",
            student_name: "Nilima Banik",
            student_status: "Active",
            open_incidents: "#334545",
            attendance_percentage: "80",
            issuance_status: "Issued",
        }
    ]);

    return (
        <Bbox borderRadius={2} overflow={"hidden"} marginTop={4}>
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
                <Box
                    py={2}
                    borderRadius={1}
                    display={"flex"}
                    gap={2}
                >

                    <FormControl sx={{ width: "20%" }}>
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

                    <FormControl sx={{ width: "20%" }}>
                        <InputLabel>Class</InputLabel>
                        <Select
                            label="Class"
                            onChange={(e) =>
                                setSelectedClass(e.target.value)
                            }
                            value={selectedClass}
                        >
                            {classes.map((cls) => (
                                <MenuItem key={cls} value={cls}>
                                    {cls}
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
                            {sections.map((section) => (
                                <MenuItem key={section} value={section}>
                                    {section}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Box display="flex" flexDirection={"row"} gap={2} alignItems={"center"} marginTop={2} marginBottom={4}>
                    <span>Class V A:</span>
                    <Box display="flex" flexDirection={"row"} alignItems={"center"} gap={2}>
                        <span>Issued</span>
                        <span style={{ backgroundColor: '#C6F6D5', color: '#22543D', padding: '2px 8px', borderRadius: '6px', fontSize: '12px' }}>47</span>
                    </Box>
                    <Box display="flex" flexDirection={"row"} alignItems={"center"} gap={2}>
                        <span>Non Issued</span>
                        <span style={{ backgroundColor: '#FEEBCB', color: '#822727', padding: '2px 8px', borderRadius: '6px', fontSize: '12px' }}>3</span>
                    </Box>
                    <Button
                        color="primary"
                        variant="outlined"
                    >
                        Mark As Completed
                    </Button>
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
                        onClick={() => { setIssuePopup(true) }}
                    >
                        Issue
                    </Button>

                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => { setOnHoldPopup(true) }}
                    >
                        On Hold
                    </Button>

                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => { setRejectPopup(true) }}
                    >
                        Reject
                    </Button>

                    <Button
                        color="primary"
                        variant="outlined"
                    >
                        Download
                    </Button>
                </Box>

                <Preview open={issuePopup} close={() => setIssuePopup(false)} />
                <OnHold open={onHoldPopup} close={() => setOnHoldPopup(false)} />
                <Reject open={rejectPopup} close={() => setRejectPopup(false)} />

            </Box >
        </Bbox >
    );
};

export default Manage;