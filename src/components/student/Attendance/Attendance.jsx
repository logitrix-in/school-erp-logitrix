import React, { useState, useEffect } from "react";
import {
  Box,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  OutlinedInput,
  ListItemIcon,
  Checkbox,
  ListItemText,
  Button,
  Tooltip,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Icon } from "@iconify/react";
import GroupsIcon from "@mui/icons-material/Groups";
import TrendingUp from "@mui/icons-material/TrendingUp";
import TrendingDown from "@mui/icons-material/TrendingDown";
import RevealCard from "../../AnimationComponents/RevealCard";
import Bbox from "../../UiComponents/Bbox";
import { DatePicker } from "@mui/x-date-pickers";
import useClasses from "../../../hooks/useClasses";
import { useMediaQuery } from "@material-ui/core";
import api from "../../../config/api";
import { useNavigate } from "react-router-dom";
import { Bar, Line } from "react-chartjs-2";
import { BarChart } from "@mui/x-charts/BarChart";
import { Chart, registerables } from "chart.js";
import Pic1 from "../../../assets/icons/attendance-pic-1.png";
import Pic2 from "../../../assets/icons/attendance-pic-2.png";
import SetAttendanceCriteria from "./SetAttendanceCriteria";
import axios from "axios";
import Paper from "@mui/material/Paper";
// import FormControlLabel from "@mui/material/FormControlLabel";
import { ChartContainer } from "@mui/x-charts/ChartContainer";
import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";
import { BarPlot } from "@mui/x-charts/BarChart";
import { LinePlot, MarkPlot } from "@mui/x-charts/LineChart";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";

Chart.register(...registerables);

const AttendanceOverview = () => {
  // breakpoints
  const isSmall = useMediaQuery("(max-width: 1364px)");
  const isTablet = useMediaQuery("(min-width: 1365px) and (max-width: 1535px)");
  const isLaptop = useMediaQuery("(min-width: 1536px) and (max-width: 1706px)");
  const isDesktop = useMediaQuery(
    "(min-width: 1707px) and (max-width: 1919px)"
  );
  const isLarge = useMediaQuery("(min-width: 1920px)");
  const isXlarge = useMediaQuery("(min-width: 2560px)");

  const navigate = useNavigate();

  // dropdowns states and variables
  const [filter, setFilter] = useState({});

  const { classes, status } = useClasses();

  const curYear = new Date().getFullYear();

  const academicYear = `${curYear}-${(curYear + 1).toString().slice(2, 4)}`;

  const [acYear, setAcYear] = useState(academicYear);
  const [curClass, setClass] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [curStatus, setStatus] = useState([]);
  const [endDate, setEndDate] = useState("");
  const [type, setType] = useState("all");
  const [showDialog, setShowDialog] = useState(false);
  const [rows, setRows] = useState([]);
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);
  const [isResponsive, setIsResponsive] = React.useState(true);

  const Container = isResponsive ? ResponsiveChartContainer : ChartContainer;
  const sizingProps = isResponsive ? {} : { width: 500, height: 300 };

  // api calling
  useEffect(() => {
    const apiUrl =
      "https://server.sociolinq.com/api/students/attendance/?type=overview";

    axios
      .get(apiUrl)
      .then((response) => {
        console.log("success", response.data);
        setApiData(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  // fetching api "/admission/application/manage-application/"
  function fetchData() {
    api
      .get("/admission/application/manage-application/")
      .then((res) => {
        const data = res.data;
        setRows(
          data.map((d) => {
            return {
              id: d.id,
              startingDate: d.application_open,
              closingDate: d.application_close,
              class: d.class_name,
              applicationStatus: d.is_active.toString(),
            };
          })
        );
      })
      .catch((err) => {});
  }

  useEffect(() => {
    fetchData();
  }, []);

  // context useEffect
  useEffect(() => {
    const _filter = {
      academic_year: acYear,
      class: curClass,
      status: curStatus,
      type: type,
    };
    setFilter(_filter);
  }, [acYear, curClass, curStatus, type]);

  // handle class dropdown change
  const handleClassChange = (e) => {
    const {
      target: { value },
    } = e;
    if (value[value.length - 1] === "all") {
      setClass(curClass.length === classes.length ? [] : classes);
      return;
    }
    setClass(typeof value === "string" ? value.split(",") : value);
  };

  // handle type dropdown change
  const handleTypeChange = (e) => {
    const {
      target: { value },
    } = e;
    if (value[value.length - 1] === "all") {
      setStatus(curStatus.length === status.length ? [] : status);
      return;
    }
    setStatus(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <RevealCard>
      {/* Attendance - Overview */}
      <Bbox width={"100%"} borderRadius={2} overflow="hidden">
        {/* Top text box */}
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
            Attendance - Overview
          </Typography>
        </Box>

        {/* Divider */}
        <Divider />

        {/* Main Grid section */}
        <Box
          display="flex"
          flexDirection={isSmall ? "column" : "row"}
          gap={2}
          p={2}
        >
          {/* Left drop-down section */}
          <Bbox
            borderRadius={1}
            paddingLeft={2}
            paddingRight={2}
            flex={0}
            py={4}
            display="flex"
            flexDirection="column"
            gap="1.6rem"
            bgcolor="white"
            alignItems={isSmall ? "center" : ""}
            justifyContent="center"
          >
            {/* academic year dropdown */}
            <FormControl style={{ width: "14.5rem" }}>
              <InputLabel>Academic Year</InputLabel>
              <Select
                label="Academic Year"
                value={acYear}
                onChange={(e) => setAcYear(e.target.value)}
              >
                <MenuItem value={"2021-22"}>2021-22</MenuItem>
                <MenuItem value={"2023-24"}>2023-24</MenuItem>
                <MenuItem value={"2024-25"}>2024-25</MenuItem>
                <MenuItem value={"2025-26"}>2025-26</MenuItem>
              </Select>
            </FormControl>

            {/* class dropdown */}
            <FormControl style={{ width: "14.5rem" }}>
              <InputLabel>Class</InputLabel>
              <Select
                placeholder="All"
                multiple
                value={curClass}
                onChange={handleClassChange}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300,
                    },
                  },
                }}
                input={<OutlinedInput label="class" />}
                renderValue={(selected) =>
                  selected.length == classes.length
                    ? "All"
                    : selected.join(", ")
                }
              >
                <MenuItem value="all">
                  <ListItemIcon>
                    <Checkbox
                      checked={
                        classes.length > 0 && curClass.length === classes.length
                      }
                      indeterminate={
                        curClass.length > 0 && curClass.length < classes.length
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary="Select All" />
                </MenuItem>
                {classes.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox
                      size="small"
                      checked={curClass.indexOf(name) > -1}
                    />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* start date input */}
            <DatePicker
              label="Start Date"
              onChange={(e) => setStartDate(e)}
              format="DD MMM YYYY"
            />

            {/* end date input */}
            <DatePicker
              format="DD MMM YYYY"
              label="End Date"
              minDate={startDate}
              onChange={(e) => setEndDate(e)}
            />
          </Bbox>

          {/* boxes and chart */}
          <Box>
            {/* Boxes and buttons */}
            <Grid container spacing={1}>
              {/* trending up section */}
              <Tooltip
                title="Attendance deviation percentage compared to last working day."
                placement="bottom"
              >
                <Box
                  position={"absolute"}
                  display={"flex"}
                  ml={
                    isLaptop
                      ? 32
                      : isLarge
                      ? 45
                      : isTablet
                      ? 27
                      : isSmall
                      ? 33
                      : 38
                  }
                  mt={4}
                >
                  {/* up-arrow icon */}
                  <Box
                    width={"32px"}
                    height={"32px"}
                    borderRadius={"24px"}
                    backgroundColor={"#79F9C3"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <TrendingUp style={{ color: "#2F7DA1" }} />
                  </Box>

                  <Typography
                    sx={{
                      color: "#626363",
                      fontSize: "14px",
                      fontWeight: "400",
                      marginTop: "8px",
                      marginLeft: "5px",
                    }}
                  >
                    + 2.1 %
                  </Typography>
                </Box>
              </Tooltip>

              {/* Today’s Attendance box */}
              <Grid item>
                <Grid
                  pt={6}
                  pl={3}
                  sx={{
                    width: isLaptop
                      ? 350
                      : isLarge
                      ? 450
                      : isTablet
                      ? 300
                      : isSmall
                      ? 350
                      : 400,
                    height: 200,
                    backgroundColor: "rgba(212, 243, 230, 0.61)",
                    borderRadius: "8px",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#597173",
                      fontSize: "36px",
                      fontWeight: "500",
                    }}
                  >
                    {apiData ? apiData.todays_attendance : ""}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#597173",
                      fontSize: "18px",
                      fontWeight: "500",
                    }}
                  >
                    Today's Attendance
                  </Typography>
                  <Typography
                    sx={{
                      color: "#597173",
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                  >
                    {apiData
                      ? (apiData.todays_attendance / apiData.total_attendance) *
                        100
                      : ""}{" "}
                    % of total active students
                  </Typography>

                  {/* download icon */}
                  <Box
                    ml={
                      isLaptop
                        ? 36
                        : isLarge
                        ? 47
                        : isTablet
                        ? 29
                        : isSmall
                        ? 36
                        : 41
                    }
                    mt={1.2}
                  >
                    <IconButton>
                      <Icon icon={"ic:round-download"} fontSize={"1.4rem"} />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>

              {/* Average Attendance */}
              <Grid item>
                {/* trending down section */}
                <Tooltip
                  title="Attendance deviation percentage compared to previous similar timeframe."
                  placement="bottom"
                >
                  <Box
                    position={"absolute"}
                    display={"flex"}
                    ml={
                      isLaptop
                        ? 32
                        : isLarge
                        ? 43
                        : isTablet
                        ? 26
                        : isSmall
                        ? 32
                        : 37
                    }
                    mt={2}
                  >
                    <Box
                      width={"32px"}
                      height={"32px"}
                      borderRadius={"24px"}
                      backgroundColor={"#FFD783"}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <TrendingDown style={{ color: "#C4673B" }} />
                    </Box>

                    <Typography
                      sx={{
                        color: "#626363",
                        fontSize: "14px",
                        fontWeight: "400",
                        marginTop: "8px",
                        marginLeft: "5px",
                      }}
                    >
                      - 2.1 %
                    </Typography>
                  </Box>
                </Tooltip>

                {/* Average Attendance box */}
                <Grid
                  pt={6}
                  pl={3}
                  sx={{
                    width: isLaptop
                      ? 350
                      : isLarge
                      ? 450
                      : isTablet
                      ? 300
                      : isSmall
                      ? 350
                      : 400,
                    height: 200,
                    backgroundColor: "rgba(255, 241, 211, 0.69)",
                    borderRadius: "8px",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#597173",
                      fontSize: "40px",
                      fontWeight: "500",
                    }}
                  >
                    {apiData ? apiData.average_attendance : ""} %
                  </Typography>
                  <Typography
                    sx={{
                      color: "#B34A19",
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                  >
                    Average Attendance
                  </Typography>
                </Grid>
              </Grid>

              {/* Buttons */}
              <Grid item>
                <Grid
                  container
                  spacing={2}
                  direction="column"
                  gap={2}
                  ml={isTablet ? 1 : 4}
                  mt={7}
                >
                  {/* Class button */}
                  <Button
                    variant="outlined"
                    startIcon={
                      <GroupsIcon
                        style={{ color: "black", fontSize: "25px" }}
                      />
                    }
                    sx={{
                      color: "#C4673B",
                      borderColor: "#C4673B",
                      "&:hover": {
                        backgroundColor: "#C4673B",
                        color: "#FFFFFF",
                        borderColor: "#C4673B",
                      },
                      width: "109px",
                    }}
                    onClick={() => navigate("/student/attendance/class-view")}
                  >
                    Class
                  </Button>

                  {/* Student button */}
                  <Button
                    variant="outlined"
                    startIcon={
                      <GroupsIcon
                        style={{ color: "black", fontSize: "25px" }}
                      />
                    }
                    sx={{
                      color: "#C4673B",
                      borderColor: "#C4673B",
                      "&:hover": {
                        backgroundColor: "#C4673B",
                        color: "#FFFFFF",
                        borderColor: "#C4673B",
                      },
                      width: "109px",
                    }}
                    onClick={() => navigate("/student/attendance/student-view")}
                  >
                    Student
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            {/* chart */}
            <Bbox borderRadius={1} marginTop={4}>
              {/*  height="204px" */}
              <Box p={1} width="100%">
                <Paper sx={{ width: "100%", height: 300 }} elevation={3}>
                  <Container
                    series={[
                      {
                        type: "bar",
                        data: [1, 2, 3, 2, 1],
                        stack: "bar",
                        barWidth: 0.5,
                        itemStyle: {
                          color: "#FF6384",
                        },
                      },
                      {
                        type: "bar",
                        data: [1, 1, 2, 1, 1],
                        stack: "bar",
                        barWidth: 0.5,
                      },
                      {
                        type: "bar",
                        data: [1, 1, 2, 1, 1],
                        stack: "bar",
                        barWidth: 0.5,
                      },
                      {
                        type: "line",
                        data: [4, 3, 1, 3, 4],
                      },
                    ]}
                    xAxis={[
                      {
                        data: ["A", "B", "C", "D", "E"],
                        scaleType: "band",
                        id: "x-axis-id",
                      },
                    ]}
                    {...sizingProps}
                  >
                    <BarPlot />
                    <LinePlot />
                    <ChartsXAxis
                      label="X axis"
                      position="bottom"
                      axisId="x-axis-id"
                    />
                  </Container>
                </Paper>
              </Box>
            </Bbox>
          </Box>
        </Box>
      </Bbox>

      {/* Defaulters / Long Leave Request */}
      <Bbox width={"100%"} borderRadius={2} overflow="hidden">
        {/* Top text box */}
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
            Defaulters / Long Leave Request
          </Typography>
        </Box>

        {/* Divider */}
        <Divider />

        {/* Main Grid section */}
        <Box
          display="flex"
          flexDirection={isSmall ? "column" : "row"}
          gap={2}
          p={2}
        >
          {/* Left drop-down section */}
          <Bbox
            borderRadius={1}
            paddingLeft={2}
            paddingRight={2}
            flex={0}
            py={4}
            display="flex"
            flexDirection="column"
            gap="1.6rem"
            bgcolor="white"
            alignItems={isSmall ? "center" : ""}
          >
            {/* academic year dropdown */}
            <FormControl style={{ width: "14.5rem" }}>
              <InputLabel>Academic Year</InputLabel>
              <Select
                label="Academic Year"
                value={acYear}
                onChange={(e) => setAcYear(e.target.value)}
              >
                <MenuItem value={"2021-22"}>2021-22</MenuItem>
                <MenuItem value={"2023-24"}>2023-24</MenuItem>
                <MenuItem value={"2024-25"}>2024-25</MenuItem>
                <MenuItem value={"2025-26"}>2025-26</MenuItem>
              </Select>
            </FormControl>

            {/* class dropdown */}
            <FormControl style={{ width: "14.5rem" }}>
              <InputLabel>Class</InputLabel>
              <Select
                placeholder="All"
                multiple
                value={curClass}
                onChange={handleClassChange}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300,
                    },
                  },
                }}
                input={<OutlinedInput label="class" />}
                renderValue={(selected) =>
                  selected.length == classes.length
                    ? "All"
                    : selected.join(", ")
                }
              >
                <MenuItem value="all">
                  <ListItemIcon>
                    <Checkbox
                      checked={
                        classes.length > 0 && curClass.length === classes.length
                      }
                      indeterminate={
                        curClass.length > 0 && curClass.length < classes.length
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary="Select All" />
                </MenuItem>
                {classes.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox
                      size="small"
                      checked={curClass.indexOf(name) > -1}
                    />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* type dropdown */}
            <FormControl style={{ width: "14.5rem" }}>
              <InputLabel>Type</InputLabel>
              <Select
                placeholder="All"
                multiple
                value={curStatus}
                onChange={handleTypeChange}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300,
                    },
                  },
                }}
                input={<OutlinedInput label="class" />}
                renderValue={(selected) =>
                  selected.length == status.length ? "All" : selected.join(", ")
                }
              >
                <MenuItem value="all">
                  <ListItemIcon>
                    <Checkbox
                      checked={
                        status.length > 0 && curStatus.length === status.length
                      }
                      indeterminate={
                        curStatus.length > 0 && curStatus.length < status.length
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary="Select All" />
                </MenuItem>
                {status.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox
                      size="small"
                      checked={curStatus.indexOf(name) > -1}
                    />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* start date input */}
            <DatePicker
              label="Start Date"
              onChange={(e) => setStartDate(e)}
              format="DD MMM YYYY"
            />

            {/* end date input */}
            <DatePicker
              format="DD MMM YYYY"
              label="End Date"
              minDate={startDate}
              onChange={(e) => setEndDate(e)}
            />
          </Bbox>

          {/* boxes and chart */}
          <Box>
            {/* Boxes and buttons */}
            <Grid container spacing={1}>
              {/* Defaulters box */}
              <Grid item>
                <Grid
                  pt={5}
                  pl={3}
                  sx={{
                    width: isLaptop
                      ? 440
                      : isLarge
                      ? 480
                      : isTablet
                      ? 360
                      : isSmall
                      ? 430
                      : 460,
                    height: 200,
                    backgroundColor: "rgba(205, 212, 216, 0.30)",
                    borderRadius: "8px",
                  }}
                >
                  <Box
                    display={"flex"}
                    flexDirection={"row"}
                    alignItems={"center"}
                  >
                    {/* text */}
                    <Box>
                      <Typography
                        sx={{
                          color: "#2F7DA1",
                          fontSize: "40px",
                          fontWeight: "500",
                        }}
                      >
                        98
                      </Typography>
                      <Typography
                        sx={{
                          color: "#2F7DA1",
                          fontSize: "20px",
                          fontWeight: "400",
                        }}
                      >
                        Defaulters
                      </Typography>
                      <Typography
                        sx={{
                          color: "#2F7DA1",
                          fontSize: "16px",
                          fontWeight: "500",
                        }}
                      >
                        9% of total active students
                      </Typography>
                    </Box>

                    {/* image */}
                    <Box ml={isTablet ? 6 : 15}>
                      <img src={Pic2} />
                    </Box>
                  </Box>

                  {/* download icon */}
                  <Box
                    ml={
                      isLaptop
                        ? 47
                        : isLarge
                        ? 52
                        : isTablet
                        ? 37
                        : isSmall
                        ? 45
                        : 49
                    }
                    mt={1.2}
                  >
                    <IconButton>
                      <Icon icon={"ic:round-download"} fontSize={"1.4rem"} />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>

              {/* Long Leave Request box */}
              <Grid item>
                <Grid
                  pt={5}
                  pl={3}
                  sx={{
                    width: isLaptop
                      ? 440
                      : isLarge
                      ? 480
                      : isTablet
                      ? 360
                      : isSmall
                      ? 430
                      : 460,
                    height: 200,
                    backgroundColor: "rgba(255, 241, 211, 0.69)",
                    borderRadius: "8px",
                  }}
                  onClick={() =>
                    navigate("/student/attendance/long-leave-request")
                  }
                >
                  <Box
                    display={"flex"}
                    flexDirection={"row"}
                    alignItems={"center"}
                  >
                    <Box>
                      <Typography
                        sx={{
                          color: "#C4673B",
                          fontSize: "40px",
                          fontWeight: "500",
                        }}
                      >
                        12
                      </Typography>
                      <Typography
                        sx={{
                          color: "#C4673B",
                          fontSize: "20px",
                          fontWeight: "400",
                        }}
                      >
                        Long Leave Request
                      </Typography>
                      <Typography
                        sx={{
                          color: "#C4673B",
                          fontSize: "16px",
                          fontWeight: "500",
                        }}
                      >
                        1.8% of total active students
                      </Typography>
                    </Box>

                    {/* image */}
                    <Box ml={isTablet ? 4 : 12}>
                      <img src={Pic1} />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            {/* chart */}
            <Bbox borderRadius={1} marginTop={4}>
              {/*  height="204px" */}
              <Box p={1} width="100%">
                <Paper sx={{ width: "100%", height: 300 }} elevation={3}>
                  <Container
                    series={[
                      {
                        type: "bar",
                        data: [1, 2, 3, 2, 1],
                        stack: "bar",
                        barWidth: 0.5,
                        itemStyle: {
                          color: "#FF6384",
                        },
                      },
                      {
                        type: "bar",
                        data: [1, 1, 2, 1, 1],
                        stack: "bar",
                        barWidth: 0.5,
                      },
                      {
                        type: "bar",
                        data: [1, 1, 2, 1, 1],
                        stack: "bar",
                        barWidth: 0.5,
                      },
                      {
                        type: "line",
                        data: [4, 3, 1, 3, 4],
                      },
                    ]}
                    xAxis={[
                      {
                        data: ["A", "B", "C", "D", "E"],
                        scaleType: "band",
                        id: "x-axis-id",
                      },
                    ]}
                    {...sizingProps}
                  >
                    <BarPlot />
                    <LinePlot />
                    <ChartsXAxis
                      label="X axis"
                      position="bottom"
                      axisId="x-axis-id"
                    />
                  </Container>
                </Paper>
              </Box>
            </Bbox>
          </Box>
        </Box>

        {/* Set Attendance Criteria button */}
        <Box display={"flex"} justifyContent={"center"} mt={7} mb={3}>
          <Button
            variant="contained"
            sx={{ width: "766px" }}
            onClick={() => setShowDialog(true)}
          >
            Set Attendance Criteria
          </Button>
        </Box>
      </Bbox>

      <Bbox borderRadius={1} flex={2} width={"100%"}>
        {showDialog && (
          <SetAttendanceCriteria
            fetchData={fetchData}
            open={showDialog}
            close={() => setShowDialog(false)}
          />
        )}
      </Bbox>
    </RevealCard>
  );
};

export default AttendanceOverview;
