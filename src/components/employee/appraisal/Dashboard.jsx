import { useState, useEffect } from "react";
import {
    Box,
    Button,
    Divider,
    Grid,
    Typography,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import Chart from "react-apexcharts";
import Bbox from "../../UiComponents/Bbox";
import RevealCard from "../../AnimationComponents/RevealCard";
import ReignsSelect from "../../UiComponents/ReignsSelect";
import Analyze from "./popup/Analyze";
import useClasses from "@/hooks/useClasses";
import useEmployees from "@/hooks/useEmployees";

export default function Dashboard() {
    const [analyzePopup, setAnalyzePopup] = useState(false);
    const { curYear, acYear } = useClasses();
    const { employeeManagementDepartment, employeeTeachingDepartment, employeeSupportStaffDepartment, employeeGrade, employeeStatus } = useEmployees();

    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedGrade, setSelectedGrade] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [employeeDepartment, setEmployeeDepartment] = useState([...employeeManagementDepartment, ...employeeTeachingDepartment, ...employeeSupportStaffDepartment]);
    const [selectedYear, setSelectedYear] = useState(curYear);
    // const [selectedEmployeeType, setSelectedEmployeeType] = useState('');

    // useEffect(() => {
    //     console.log(selectedEmployeeType);
    //     let departments = [];

    //     if (selectedEmployeeType === '') {
    //         return;
    //     }

    //     selectedEmployeeType.forEach(type => {
    //         switch (type) {
    //             case 'Management':
    //                 departments = [...departments, ...employeeManagementDepartment];
    //                 break;
    //             case 'Teaching Staff':
    //                 departments = [...departments, ...employeeTeachingDepartment];
    //                 break;
    //             case 'Support Staff':
    //                 departments = [...departments, ...employeeSupportStaffDepartment];
    //                 break;
    //             default:
    //                 break;
    //         }
    //     });

    //     setEmployeeDepartment(departments);
    // }, [selectedEmployeeType]);

    return (
        <RevealCard>
            <Bbox borderRadius={2} overflow={"hidden"}>
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
                        Dashboard
                    </Typography>
                </Box>

                <Divider />

                <Box display={"flex"} alignItems={"flex-start"} px={3} py={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <RevealCard>
                                <Bbox borderRadius={2}>
                                    <Box px={3} py={4} mb={2}>
                                        <FormControl sx={{ width: "100%" }}>
                                            <InputLabel>Appraisal Cycle</InputLabel>
                                            <Select
                                                label="Appraisal Cycle"
                                                onChange={(e) =>
                                                    setSelectedYear(e.target.value)
                                                }
                                                value={selectedYear}
                                                sx={{ mb: 2 }}

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
                                            sx={{ mb: 2 }}
                                        />


                                        <ReignsSelect
                                            multiple
                                            items={employeeGrade}
                                            defaultValues={employeeGrade}
                                            onChange={setSelectedGrade}
                                            value={selectedGrade}
                                            label="Grade"
                                            sx={{ mb: 2 }}
                                        />

                                        <ReignsSelect
                                            multiple
                                            items={employeeStatus}
                                            defaultValues={employeeStatus}
                                            onChange={setSelectedStatus}
                                            value={selectedStatus}
                                            label="Status"
                                            sx={{ mb: 2 }}
                                        />

                                    </Box>
                                </Bbox>
                            </RevealCard>
                        </Grid>

                        <Grid item xs={6} style={{
                            display: 'flex'
                        }}>
                            <RevealCard style={{ width: '100%' }}>
                                <Bbox borderRadius={2} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <Box px={3} py={4} style={{ flexGrow: 1 }}>
                                        <Box display="flex" justifyContent="space-between" alignItems="center" height="100%">
                                            <Box width="70%">
                                                <Chart
                                                    options={{
                                                        chart: {
                                                            type: "donut",
                                                            toolbar: {
                                                                show: false,
                                                            },
                                                        },
                                                        dataLabels: {
                                                            enabled: true,
                                                            style: {
                                                                fontSize: '10px',
                                                                fontWeight: '400' // Adjust the font size of the percentage labels
                                                            },
                                                        },
                                                        plotOptions: {
                                                            pie: {
                                                                donut: {
                                                                    size: "70rem", // chart thickness
                                                                },
                                                            },
                                                        },
                                                        legend: {
                                                            show: false,
                                                        },
                                                        colors: [
                                                            "#0072DB",
                                                            "#85BB13",
                                                            "#FF6163",
                                                            "#00E781",
                                                            "#A855F7",
                                                            "#C0BFBF",
                                                            "#FFD81B",
                                                        ],
                                                        labels: [
                                                            "Goal Setting Pending",
                                                            "Self Assessment",
                                                            "Supervisor Review",
                                                            "Rationalization",
                                                            "Rating Released",
                                                            "Appeal",
                                                            "Completed",
                                                        ],
                                                        tooltip: {
                                                            enabled: false, // Disable the on-hover tooltip
                                                        },
                                                    }}
                                                    series={[44, 25, 10, 9, 5, 3, 4]}

                                                    type="donut"
                                                    width="100%"
                                                    height="300"
                                                />
                                            </Box>

                                            {/* Custom label names */}
                                            <Box
                                                width="35%"
                                                display="flex"
                                                flexDirection="column"
                                                gap={1}
                                            >
                                                {[
                                                    { color: "#0072DB", label: "Goal Setting Pending" },
                                                    { color: "#85BB13", label: "Self Assessment" },
                                                    { color: "#FF6163", label: "Supervisor Review" },
                                                    { color: "#00E781", label: "Rationalization" },
                                                    { color: "#A855F7", label: "Rating Released" },
                                                    { color: "#C0BFBF", label: "Appeal" },
                                                    { color: "#FFD81B", label: "Completed" },
                                                ].map(({ color, label }) => (
                                                    <Box key={label} display="flex" alignItems="center">
                                                        <Box
                                                            width={10}
                                                            height={10}
                                                            borderRadius="50%"
                                                            bgcolor={color}
                                                            mr={1}
                                                        />
                                                        <Typography fontSize={12} fontWeight={400}>
                                                            {label}
                                                        </Typography>
                                                    </Box>
                                                ))}
                                            </Box>
                                        </Box>
                                    </Box>
                                </Bbox>
                            </RevealCard>
                        </Grid>

                        <Analyze open={analyzePopup} close={() => setAnalyzePopup(false)} />

                        <Grid item xs={2} display="flex" alignItems="flex-start">
                            <Button variant="contained" color="primary" sx={{ px: 8 }} onClick={() => setAnalyzePopup(true)}>
                                Analyze
                            </Button>
                        </Grid>
                    </Grid>

                </Box>
            </Bbox>
        </RevealCard >
    )
}
