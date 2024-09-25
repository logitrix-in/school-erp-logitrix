import { useNavigate } from "react-router-dom";
import RevealCard from "../../../AnimationComponents/RevealCard";
import Bbox from "../../../UiComponents/Bbox";
import {
    Box,
    Button,
    Divider,
    Typography,
    Autocomplete,
    TextField,
    Radio,
} from "@mui/material";
import { useState } from 'react';
import "react-toastify/dist/ReactToastify.css";
import { DataGrid } from "@mui/x-data-grid";
import Banner from '../Banner'

const Manage = ({ setMapping }) => {
    const navigate = useNavigate();
    const [selectedRow, setSelectedRow] = useState(null);

    // Custom cell renderer
    const SubjectTeacherCell = ({ value }) => (
        <div>
            <Typography variant="body2">{value.class}</Typography>
            {
                value.isClassTeacher && <Typography variant="caption" color="textSecondary" sx={{ bgcolor: '#BEE3F8', px: 1, py: 0.5, borderRadius: 1 }}>Class Teacher</Typography>
            }
        </div >
    );

    // Columns definition
    const columns = [
        { field: 'teacher_name', headerName: 'Teacher Name', flex: 1 },
        {
            field: '10am',
            headerName: '10am - 10:30am',
            flex: 1,
            renderCell: (params) => <SubjectTeacherCell value={params.value} />
        },
        {
            field: '1030am',
            headerName: '10:30am - 11am',
            flex: 1,
            renderCell: (params) => <SubjectTeacherCell value={params.value} />
        },
        {
            field: '11am',
            headerName: '11am - 11:30am',
            flex: 1,
            renderCell: (params) => <SubjectTeacherCell value={params.value} />
        },
        {
            field: '1130am',
            headerName: '11:30am - 12pm',
            flex: 1,
            renderCell: (params) => <SubjectTeacherCell value={params.value} />
        },
        {
            field: '12pm',
            headerName: '12pm - 12:30pm',
            flex: 1,
            renderCell: (params) => <SubjectTeacherCell value={params.value} />
        },
        {
            field: '1230pm',
            headerName: '12:30pm - 1:00pm',
            flex: 1,
            renderCell: (params) => <SubjectTeacherCell value={params.value} />
        },
        {
            field: '1pm',
            headerName: '1:00pm - 1:30pm',
            flex: 1,
            renderCell: (params) => <SubjectTeacherCell value={params.value} />
        },
        {
            field: '130pm',
            headerName: '1:30pm - 2:00pm',
            flex: 1,
            renderCell: (params) => <SubjectTeacherCell value={params.value} />
        },
    ];

    // Rows data
    const rows = [
        {
            id: 1,
            teacher_name: 'Virat Singh',
            '10am': { class: 'V A', isClassTeacher: true },
            '1030am': { class: 'V A', isClassTeacher: false },
            '11am': { class: 'VI B', isClassTeacher: false },
            '1130am': { class: 'VI B', isClassTeacher: false },
            '12pm': { class: 'VII C', isClassTeacher: false },
            '1230pm': { class: 'VII C', isClassTeacher: false },
            '1pm': { class: 'VIII A', isClassTeacher: false },
            '130pm': { class: 'VIII A', isClassTeacher: false }
        },
        {
            id: 2,
            teacher_name: 'Anushka Sharma',
            '10am': { class: 'VI B', isClassTeacher: true },
            '1030am': { class: 'VI B', isClassTeacher: false },
            '11am': { class: 'VII A', isClassTeacher: false },
            '1130am': { class: 'VII A', isClassTeacher: false },
            '12pm': { class: 'VIII B', isClassTeacher: false },
            '1230pm': { class: 'VIII B', isClassTeacher: false },
            '1pm': { class: 'IX A', isClassTeacher: false },
            '130pm': { class: 'IX A', isClassTeacher: false }
        },
        {
            id: 3,
            teacher_name: 'Rahul Dravid',
            '10am': { class: 'VII C', isClassTeacher: true },
            '1030am': { class: 'VII C', isClassTeacher: false },
            '11am': { class: 'VIII A', isClassTeacher: false },
            '1130am': { class: 'VIII A', isClassTeacher: false },
            '12pm': { class: 'IX B', isClassTeacher: false },
            '1230pm': { class: 'IX B', isClassTeacher: false },
            '1pm': { class: 'X A', isClassTeacher: false },
            '130pm': { class: 'X A', isClassTeacher: false }
        },
        {
            id: 4,
            teacher_name: 'Mithali Raj',
            '10am': { class: 'VIII B', isClassTeacher: true },
            '1030am': { class: 'VIII B', isClassTeacher: false },
            '11am': { class: 'IX A', isClassTeacher: false },
            '1130am': { class: 'IX A', isClassTeacher: false },
            '12pm': { class: 'X B', isClassTeacher: false },
            '1230pm': { class: 'X B', isClassTeacher: false },
            '1pm': { class: 'XI A', isClassTeacher: false },
            '130pm': { class: 'XI A', isClassTeacher: false }
        },
        {
            id: 5,
            teacher_name: 'Sunil Chhetri',
            '10am': { class: 'IX B', isClassTeacher: true },
            '1030am': { class: 'IX B', isClassTeacher: false },
            '11am': { class: 'X A', isClassTeacher: false },
            '1130am': { class: 'X A', isClassTeacher: false },
            '12pm': { class: 'XI B', isClassTeacher: false },
            '1230pm': { class: 'XI B', isClassTeacher: false },
            '1pm': { class: 'XII A', isClassTeacher: false },
            '130pm': { class: 'XII A', isClassTeacher: false }
        }
    ];

    return (
        <>

            <RevealCard>
                <Bbox
                    mt={3}
                    width="100%"
                    height="100%"
                    borderRadius={2}
                    overflow="hidden"
                >
                    {/* top bulk text */}
                    <Box
                        bgcolor="white"
                        py={1.3}
                        px={3}
                        borderRadius={2}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography fontWeight={700} fontSize="1.1rem">
                            Manage
                        </Typography>


                        <Autocomplete
                            options={["Student 1", "Student 2"]}
                            filterSelectedOptions
                            freeSolo={false}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Academic Year"
                                    label="Academic Year"
                                />
                            )}
                            sx={{ width: "20%" }}
                        />
                    </Box>

                    {/* divider */}
                    <Divider />

                    <Box>

                        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} p={2}>
                            <Banner text={'Faculty-Wise Mapping'} />

                            <Button color="primary" variant="outlined" onClick={() => setMapping('class')}>Switch to Class wise Mapping</Button>

                        </Box>

                        {/* dropdowns and search button section */}
                        <Box
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                            p={2}
                            mt={2}
                            height={50}
                            gap={4}
                        >

                            <Autocomplete
                                options={["Student 1", "Student 2"]}
                                filterSelectedOptions
                                freeSolo={false}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder="Department"
                                        label="Department"
                                    />
                                )}
                                sx={{ width: "20%" }}
                            />

                            <Button variant="contained">Submit</Button>
                        </Box>

                        <Box mt={2} mb={5} mx={2} style={{ height: "100%" }}>

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
                                            groupId: "DepartmentEnglish",
                                            headerName: "Department - English",
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
                                    variant="outlined"
                                >
                                    Download
                                </Button>
                            </Box>
                        </Box>

                    </Box>

                </Bbox>
            </RevealCard>
        </>
    );
};

export default Manage;
