import { useState } from "react";
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
import ReignsSelect from "../../UiComponents/ReignsSelect";
import useEmployees from "@/hooks/useEmployees";
import useClasses from "@/hooks/useClasses";
import EmployeePopup from '../EmployeePopup'

export default function AppraisalDetails() {

    const { curYear, acYear } = useClasses();
    const { employeeManagementDepartment, employeeTeachingDepartment, employeeSupportStaffDepartment, employeeGrade, employeeStatus } = useEmployees();

    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedGrade, setSelectedGrade] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [employeeDepartment, setEmployeeDepartment] = useState([...employeeManagementDepartment, ...employeeTeachingDepartment, ...employeeSupportStaffDepartment]);
    const [selectedYear, setSelectedYear] = useState(curYear);
    const [employeePopup, setEmployeePopup] = useState(false);

    const columns = [
        { field: "space", headerName: " ", flex: 0.2 },
        {
            field: "id",
            headerName: "Employee ID",
            flex: 0.8,
            renderCell: (params) => (
                <Typography sx={{ cursor: "pointer", color: "primary.main" }} onClick={() => setEmployeePopup(true)}>
                    {params.value}
                </Typography>
            ),
        },
        {
            field: "emp_name",
            headerName: "Employee Name",
            flex: 1.4,
        },
        {
            field: "grade",
            headerName: "Grade",
            flex: 0.6,
        },
        {
            field: "status",
            headerName: "Status",
            flex: 0.8,
            renderCell: (params) => (
                <Box
                  style={{
                    backgroundColor:
                      params.value === "Active"
                        ? "#C6F6D5"
                        : params.value === "Inactive"
                          ? "#FFCCCC"
                          : "transparent",
                    borderRadius: "6px",
                    padding: "2px 8px"
                  }}
                >
                  {params.value}
                </Box>
              ),
        },
        {
            field: "department",
            headerName: "Department",
            flex: 1,
        },
        {
            field: "cycle",
            headerName: "Current Appraisal \nCycle Stage",
            renderHeader: (params) => <MultilineHeader colDef={params.colDef} />,
            flex: 1.2,
        },
        {
            field: "pending",
            headerName: "Pending With",
            flex: 1.5,
            renderCell: (params) => {
                const text = String(params.value);
                const match = text.match(/(.*?)(\(AUG\d+\))/);
                return (
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                            {match ? (
                                <>
                                    {match[1]}
                                    <Typography sx={{ color: "primary.main", cursor: 'pointer' }} onClick={() => setEmployeePopup(true)}>{match[2]}</Typography>
                                </>
                            ) : (
                                text
                            )}
                        </Box>
                    </Box>
                );
            }
        },
        {
            field: "2024",
            headerName: "2024",
            headerAlign: "center",
            flex: 0.6,
            renderCell: (params) => (
                <Box sx={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                <Typography sx={{ cursor: "pointer", color: "primary.main", textAlign: 'center' }}>
                    {params.value}
                </Typography>
                </Box>
            ),
        },
        {
            field: "2023",
            headerName: "2023",
            headerAlign: "center",
            flex: 0.6,
            renderCell: (params) => (
                <Box sx={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                <Typography sx={{ cursor: "pointer", color: "primary.main" }}>
                    {params.value}
                </Typography>
                </Box>
            ),
        },
        {
            field: "2022",
            headerName: "2022",
            headerAlign: "center",
            flex: 0.6,
            renderCell: (params) => (
                <Box sx={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                <Typography sx={{ cursor: "pointer", color: "primary.main" }}>
                    {params.value}
                </Typography>
                </Box>
            ),
        }
    ];

    const MultilineHeader = ({ colDef }) => {
        return (
            <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.4', fontWeight: '600' }}>
                {colDef.headerName}
            </div>
        );
    };

    const rows = [
        {
            id: 'E001',
            emp_name: 'John Doe',
            grade: 'A2',
            status: 'Active',
            department: 'English',
            cycle: 'Supervisor Review',
            pending: 'Alok Sanpui (AUG236547)',
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
            pending: 'Alok Sanpui (AUG236547)',
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
            pending: 'Alok Sanpui (AUG236547)',
            2024: 2,
            2023: 1,
            2022: 2,
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
                        View Employee Appraisal Details
                    </Typography>
                </Box>

                <Divider />

                <Box display={"grid"} gridTemplateColumns={"repeat(5, 1fr)"} gap={2} px={3} py={4}>

                    <FormControl sx={{ width: "100%" }}>
                        <InputLabel>Appraisal Cycle</InputLabel>
                        <Select
                            label="Appraisal Cycle"
                            onChange={(e) =>
                                setSelectedYear(e.target.value)
                            }
                            value={selectedYear}

                        >
                            {acYear.map((year) => (
                                <MenuItem key={year} value={year}>
                                    {year}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <ReignsSelect
                        multiple
                        items={employeeDepartment}
                        defaultValues={employeeDepartment}
                        onChange={setSelectedDepartment}
                        value={selectedDepartment}
                        label="Department"
                    />


                    <ReignsSelect
                        multiple
                        items={employeeGrade}
                        defaultValues={employeeGrade}
                        onChange={setSelectedGrade}
                        value={selectedGrade}
                        label="Grade"
                    />

                    <ReignsSelect
                        multiple
                        items={employeeStatus}
                        defaultValues={employeeStatus}
                        onChange={setSelectedStatus}
                        value={selectedStatus}
                        label="Status"
                    />

                    <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'}>
                        <Button variant="contained" color="primary">Apply</Button>
                    </Box>
                </Box>

                <Box display={"flex"} gap={1} sx={{ width: '35%' }} px={3}>
                    <FormControl fullWidth>
                        <InputLabel>Search by Employee Name or Employee ID</InputLabel>
                        <Select
                            label="Search by Employee Name or Employee ID"
                            // value={selectedLibraryCard}
                            required
                        // onChange={(e) => setSelectedLibraryCard(e.target.value)}
                        >
                            {/* {
								libraryCardNumbers?.map((type) => (
									<MenuItem key={type} value={type}>{type}</MenuItem>
								))
							} */}
                        </Select>
                    </FormControl>
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

                <EmployeePopup open={employeePopup} close={() => setEmployeePopup(false)} />

            </Bbox>
        </RevealCard>
    )
}
