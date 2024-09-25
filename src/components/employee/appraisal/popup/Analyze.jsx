import {
    Box,
    Dialog,
    Divider,
    IconButton,
    Typography,
} from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import RevealCard from "../../../AnimationComponents/RevealCard";
import Bbox from "../../../UiComponents/Bbox";
import CloseIcon from "@mui/icons-material/Close";
import Chart from "react-apexcharts";
import { Stack } from "@mui/system";

const Analyze = ({ open, close }) => {

    const data = [
        { name: 'Not Eligible', value: 65, color: '#1D55E5' },
        { name: 'Eligible', value: 35, color: '#EC7C30' },
    ];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <Box sx={{ bgcolor: 'background.paper', p: 1, border: '1px solid #ccc' }} borderRadius={1}>
                    <Typography variant="body2">{`${label} : ${payload[0].value}%`}</Typography>
                </Box>
            );
        }
        return null;
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
            sparkline: {
                enabled: false
            }
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
                // dataLabels: {
                //     position: 'top' // Position the labels on top of the bars
                // }
            },
        },
        dataLabels: {
            enabled: true,
            formatter: (val) => `${((val / series.reduce((a, b) => a + b.data.reduce((c, d) => c + d, 0), 0)) * 100).toFixed(2)}%`,
            style: {
                fontSize: "10px",
                fontWeight: "400",
            }
        },
        xaxis: {
            categories: ["Rating 1", "Rating 2", "Rating 3", "Rating 4", "Rating 5"],
        },
        fill: {
            opacity: 1,
        },
        colors: ["#EC7C30", "#F8A46B", "#D2CBC6"],
        tooltip: {
            enabled: true,
            theme: 'light',
            style: {
                fontSize: '12px',
                fontFamily: undefined
            },
            x: {
                show: false
            },
            y: {
                formatter: (value) => `${value}%`
            }
        }
    };

    const horizontalBarChartSeries = [
        {
            name: "Not Eligible",
            data: [65, 0],
            type: "column",
        },
        {
            name: "Eligible",
            data: [0, 35],
            type: "column",
        },
    ];

    const horizontalBarChartOptions = {
        chart: {
            type: "bar",
            toolbar: {
                show: false,
            },
        },
        legend: {
            show: true,
            position: "top",
            horizontalAlign: "right",
        },
        plotOptions: {
            bar: {
                horizontal: true,
                columnWidth: "40px",
                borderRadius: '4px 0 0 4px',
                // dataLabels: {
                //     position: 'top' // Position the labels on top of the bars
                // }
            },
        },

        dataLabels: {
            enabled: false,
            formatter: (val) => `${((val / series.reduce((a, b) => a + b.data.reduce((c, d) => c + d, 0), 0)) * 100).toFixed(2)}%`,
            style: {
                fontSize: "10px",
                fontWeight: "400",
            }
        },
        xaxis: {
            categories: ["Not Eligible", "Eligible"],
        },
        colors: ["#1D55E5", "#EC7C30",],
        tooltip: {
            enabled: true,
            theme: 'light',
            style: {
                fontSize: '12px',
                fontFamily: undefined
            },
            x: {
                show: true
            },
            y: {
                formatter: (value) => `${value}%`
            }
        }
    }

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

                        <Box sx={{ width: '100%', height: 400, py: 2 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    layout="vertical"
                                    data={data}
                                    margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
                                >
                                    <XAxis type="number" tickFormatter={(value) => `${value}%`} />
                                    <YAxis dataKey="name" type="category" />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                    <Bar
                                        dataKey="value"
                                        shape={props => {
                                            return (
                                                <rect
                                                    {...props}
                                                    fill={props.payload.color}
                                                    height={props.height * 0.2}  // Reduce thickness by 50%
                                                    y={props.y + props.height * 0.40}  // Center the thinner bar
                                                    rx={4}
                                                    ry={4}
                                                />
                                            );
                                        }}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </Box>
                    </Bbox>
                </RevealCard>


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
        </Dialog >
    );
};

export default Analyze;
