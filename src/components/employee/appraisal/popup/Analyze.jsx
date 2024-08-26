import React from "react";
import {
    Box,
    Button,
    Dialog,
    InputLabel,
    Divider,
    TextField,
    IconButton,
    Tab,
    Tabs,
    Select,
    MenuItem,
    FormControl,
    Typography,
} from "@mui/material";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import RevealCard from "../../../AnimationComponents/RevealCard";
import Bbox from "../../../UiComponents/Bbox";
import CloseIcon from "@mui/icons-material/Close";
import Chart from "react-apexcharts";
import { Stack } from "@mui/system";
import { BarChart } from '@mui/x-charts/BarChart';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';

const Analyze = ({ open, close }) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const series = [
        {
            name: "Male",
            data: [3, 15, 32, 4, 1],
            type: "column",
        },
        {
            name: "Female",
            data: [3, 2, 10, 1, 1],
            type: "column",
        },
        {
            name: "Others",
            data: [0, 0, 1, 0, 0],
            type: "column",
        }
    ];


    const options = {
        chart: {
            height: 250,
            type: "bar",
            stacked: true,
            toolbar: false,
        },
        legend: {
            show: true,
            position: "top",
            horizontalAlign: "right",
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "40px",
                borderRadius: 4,
            },
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: ["Rating 1", "Rating 2", "Rating 3", "Rating 4", "Rating 5"],
        },
        fill: {
            opacity: 1,
        },
        colors: ["#EC7C30", "#F8A46B", "#D2CBC6"],
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + "%";
                },
            },
        },
    };


    const dataset = [
        {
            eligibility: 'Not Eligible',
            percentage: 65,
        },
        {
            eligibility: 'Eligible',
            percentage: 35,
        },
    ];

    const chartSettingsH = {
        slotProps: {
            legend: {
                direction: 'row',
                position: { vertical: 'bottom', horizontal: 'middle' },
                padding: -5,
            },
        },
    };

    const valueFormatter = (value) => `${value}%`;

    return (
        <Dialog
            fullWidth
            PaperProps={{
                sx: {
                    maxHeight: "100%",
                },
            }}
            maxWidth="lg"
            open={open}
            onClose={() => close()}
            disableEnforceFocus={true}
        >
            <Box overflow={"hidden"}>
                <Box
                    p={1}
                    py={1}
                    bgcolor={"primary.main"}
                    color={"white"}
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Box />
                    <Typography fontSize={"1.1rem"} textAlign={"center"}>
                        Analyze
                    </Typography>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={close}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Box display="flex" flexDirection="column" p={2} justifyContent="space-between" width={"85%"} margin="auto" >
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
                                    Appraisal Eligibility Distribution
                                </Typography>
                            </Box>

                            <Divider />

                            <Box py={2} width="100%">
                                <BarChart
                                    dataset={dataset}
                                    xAxis={[{
                                        scaleType: 'linear',
                                    }]}
                                    yAxis={[{
                                        scaleType: 'band', dataKey: 'eligibility',
                                    }]}
                                    series={[{
                                        dataKey: 'percentage', valueFormatter
                                    }]}

                                    {...chartSettingsH}

                                    layout="horizontal"
                                    grid={{ vertical: true, horizontal: false }}
                                    height={400}
                                    slotProps={{
                                        legend: {
                                            direction: 'row',
                                            position: { vertical: 'top', horizontal: 'right' },
                                            padding: 0,
                                        },
                                    }}
                                />
                            </Box>
                        </Bbox>
                    </RevealCard>


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
                                    Rating Distribution
                                </Typography>
                            </Box>

                            <Divider />

                            <Box>
                                <Stack flex={1}>
                                    <Chart
                                        options={options}
                                        series={series}
                                        type="bar"
                                        height={350}
                                    />
                                </Stack>
                            </Box>
                        </Bbox>
                    </RevealCard>
                </Box>
            </Box>
        </Dialog >
    );
};

export default Analyze;
