import { Box, Divider, Grid, Typography, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import Bbox from "../../../UiComponents/Bbox";
import ReignsSelect from "../../../UiComponents/ReignsSelect";
import useClasses from "../../../../hooks/useClasses";
import useEmployees from "../../../../hooks/useEmployees";
import { Icon } from "@iconify/react";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";

const Dashboard = () => {
    const { acYear, curYear } = useClasses();
    const [academicYear, setAcademicYear] = useState(curYear);

    const { employeeType, employeeManagementDepartment, employeeTeachingDepartment, employeeSupportStaffDepartment, employeeGrade } = useEmployees();

    const [selectedEmployeeType, setSelectedEmployeeType] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedGrade, setSelectedGrade] = useState('');
    const [employeeDepartment, setEmployeeDepartment] = useState([...employeeManagementDepartment, ...employeeTeachingDepartment, ...employeeSupportStaffDepartment]);

    const [rows, setRows] = useState([
        {
            id: 1,
            emp_type: "Full-Time",
            department: "Engineering",
            grade: "A",
            role: "Software Engineer",
            class_scope: "Global",
            open_positions: 5,
            comments: "Urgent hiring",
        },
        {
            id: 2,
            emp_type: "Part-Time",
            department: "Marketing",
            grade: "B",
            role: "Marketing Specialist",
            class_scope: "Local",
            open_positions: 2,
            comments: "New project",
        },
        {
            id: 3,
            emp_type: "Contract",
            department: "HR",
            grade: "C",
            role: "HR Manager",
            class_scope: "Regional",
            open_positions: 1,
            comments: "Replacement",
        }
    ]);

    const [newJobPopup, setNewJobPopup] = useState(false);
    const [editJobPopup, setEditJobPopup] = useState(false);
    const [jobIdPopup, setJobIdPopup] = useState(false);

    useEffect(() => {
        console.log(selectedEmployeeType);
        let departments = [];

        if (selectedEmployeeType === '') {
            return;
        }

        selectedEmployeeType.forEach(type => {
            switch (type) {
                case 'Management':
                    departments = [...departments, ...employeeManagementDepartment];
                    break;
                case 'Teaching Staff':
                    departments = [...departments, ...employeeTeachingDepartment];
                    break;
                case 'Support Staff':
                    departments = [...departments, ...employeeSupportStaffDepartment];
                    break;
                default:
                    break;
            }
        });

        setEmployeeDepartment(departments);
    }, [selectedEmployeeType]);

    return (
        <Bbox borderRadius={2} overflow={"hidden"}>
            <Box bgcolor={"white"} py={1.3} px={2} borderRadius={2}>
                <Typography fontWeight={"700"} fontSize={"1.1rem"}>
                    Dashboard
                </Typography>
            </Box>

            <Divider />
            <Box
                p={2}
                display={"flex"}
                gap={1}
                flexDirection={{
                    sm: "column",
                    md: "row",
                }}
            >
                <Bbox
                    width={"23rem"}
                    p={2}
                    borderRadius={1}
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={'space-between'}
                    gap={2}
                >
                    <FormControl sx={{ width: "100%" }}>
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
                    <ReignsSelect
                        items={employeeType}
                        multiple
                        label="Employee Type"
                        defaultValues={employeeType}
                        onChange={setSelectedEmployeeType}
                        value={selectedEmployeeType}
                        sx={{
                            width: '100%'
                        }}
                    />
                    <ReignsSelect
                        items={employeeDepartment}
                        multiple
                        defaultValues={employeeDepartment}
                        onChange={setSelectedDepartment}
                        value={selectedDepartment}
                        label="Department"
                        sx={{
                            width: '100%'
                        }}
                    />
                    <ReignsSelect
                        items={employeeGrade}
                        multiple
                        label="Grade"
                        defaultValues={employeeGrade}
                        onChange={setSelectedGrade}
                        value={selectedGrade}
                        sx={{
                            width: '100%'
                        }}
                    />
                </Bbox>
                <Grid container flex={2} spacing={1}>
                    <DisplayCard
                        bgColor={"#D9EBF4"}
                        color={"#3B98C4"}
                        header="Open Positions"
                        value="9"
                    />
                    <DisplayCard
                        bgColor={"#FAD2C0"}
                        color={"#B34A19"}
                        header="Serving Notice Period"
                        value="5"
                    />
                    <DisplayCard
                        bgColor={"#FAD2C0"}
                        color={"#B34A19"}
                        header="Application Received"
                        value="27"
                    />
                    <DisplayCard
                        bgColor={"#D9EBF4"}
                        color={"#3B98C4"}
                        header="Attrition"
                        value="14%"
                    />
                </Grid>
            </Box>
        </Bbox>
    );
};

const DisplayCard = ({ bgColor, header = "", value = "", color }) => {
    return (
        <Grid item xs={12} md={6} position={"relative"}>
            <Box
                bgcolor={bgColor}
                height={"100%"}
                p={3}
                borderRadius={1}
                display={"flex"}
                justifyContent={'space-between'}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                    <Typography sx={{ fontSize: "1.5rem", fontWeight: "600" }}>
                        {value}
                    </Typography>
                    <Typography
                        sx={{ fontSize: "1.2rem", fontWeight: "500", color: color }}
                    >
                        {header}
                    </Typography>
                </Box>

                <Box>
                    <Icon
                        icon={"mdi:account-check"}
                        fontSize={"7rem"}
                        color={color}
                    // B34A19
                    />
                </Box>


                <Box
                    position={"absolute"}
                    bottom={"0.2rem"}
                    right={"0.5rem"}
                >
                    <IconButton
                        onClick={() =>
                            download("total_application_recieved")
                        }
                    >
                        <Icon
                            icon={"ic:round-download"}
                            fontSize={"1.4rem"}
                        />
                    </IconButton>
                </Box>
            </Box>
        </Grid>
    );
};

export default Dashboard;
