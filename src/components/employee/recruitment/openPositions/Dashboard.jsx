import { Box, Divider, Grid, Typography, IconButton } from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from "react";
import Bbox from "../../../UiComponents/Bbox";
import ReignsSelect from "../../../UiComponents/ReignsSelect";
import { AppContext } from "../../../../context/AppContext";
import useClasses from "../../../../hooks/useClasses";
import { Icon } from "@iconify/react";
import { maxWidth } from "@mui/system";

const Dashboard = () => {
    const ctx = useContext(AppContext);
    const { classes, sections, acYear, curYear, status } = useClasses();
    const [academicYear, setAcademicYear] = useState(curYear);
    console.log(classes);

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
                    <ReignsSelect
                        items={acYear}
                        onChange={(e) =>
                            setAcademicYear(e?.target.value ?? academicYear)
                        }
                        label="Academic Year"
                        value={academicYear}
                    />
                    <ReignsSelect
                        items={[
                            "Management",
                            "Teaching Staff",
                            "Support Staff",
                        ]}
                        multiple
                        label="Employee Type"
                        defaultValues={["Management", "Teaching Staff", "Support Staff"]}
                    />
                    <ReignsSelect
                        items={classes}
                        multiple
                        label="Department"
                        defaultValues={classes}
                    />
                    <ReignsSelect
                        items={sections}
                        multiple
                        label="Grade"
                        defaultValues={sections}
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
