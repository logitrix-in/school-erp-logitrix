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
} from "@mui/material";
import Chart from "react-apexcharts";
import RevealCard from "../../AnimationComponents/RevealCard";
import Bbox from "../../UiComponents/Bbox";
import { Icon } from "@iconify/react";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import * as XLSX from "xlsx";
import "chart.js/auto";
import useClasses from "../../../hooks/useClasses";
import { useMediaQuery } from "@material-ui/core";

const StudentDashboard = () => {
  // breakpoints
  const isSmall = useMediaQuery("(max-width: 1364px)");
  const isTablet = useMediaQuery("(min-width: 1365px) and (max-width: 1535px)");
  const isLaptop = useMediaQuery("(min-width: 1536px) and (max-width: 1706px)");
  const isDesktop = useMediaQuery(
    "(min-width: 1707px) and (max-width: 1919px)"
  );
  const isLarge = useMediaQuery("(min-width: 1920px)");
  const isXlarge = useMediaQuery("(min-width: 2560px)");

  // Api response / error state
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);

  // dropdowns states and variables
  const [filter, setFilter] = useState({});

  const { classes, sections, status } = useClasses();

  const curYear = new Date().getFullYear();

  const academicYear = `${curYear}-${(curYear + 1).toString().slice(2, 4)}`;

  const [acYear, setAcYear] = useState(academicYear);
  const [curClass, setClass] = useState([]);
  const [curSection, setSection] = useState([]);
  const [curStatus, setStatus] = useState([]);

  const [type, setType] = useState("all");

  // context useEffect
  useEffect(() => {
    const _filter = {
      academic_year: acYear,
      class: curClass,
      section: curSection,
      curStatus: curStatus,
      type: type,
    };
    setFilter(_filter);
  }, [curSection, curStatus, acYear, curClass, type]);

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

  // handle section dropdown change
  const handleSectionChange = (e) => {
    const {
      target: { value },
    } = e;

    // Check if "all" is selected
    if (value.includes("all")) {
      // If "all" is selected, set all available sections
      if (curSection.length === sections.length) {
        setSection([]);
      } else {
        setSection(sections);
      }
      return;
    }

    // Set the selected sections
    setSection(value);
  };

  // handle status dropdown change
  const handleStatusChange = (e) => {
    const {
      target: { value },
    } = e;

    // Check if "all" is selected
    if (value.includes("all")) {
      // If "all" is selected and all statuses are already selected, deselect all
      if (curStatus.length === status.length) {
        setStatus([]);
      } else {
        // If "all" is selected and not all statuses are selected, select all
        setStatus(status);
      }
      return;
    }

    // Set the selected statuses
    setStatus(value);
  };

  // Cultural diversity data state
  const [chartData, setChartData] = useState({
    datasets: [
      {
        data: [0, 2, 3, 4, 0],
        backgroundColor: ["#FFD81B", "#00E781", "black", "blue", "orange"],
        borderWidth: [16, 2, 5, 4, 10],
      },
    ],
  });

  // Api call for dashboard using axios and Doughnut chart data update
  useEffect(() => {
    const apiUrl =
      "https://server.sociolinq.com/api/students/information?type=dashboard";

    axios
      .get(apiUrl)
      .then((response) => {
        // console.log("success", response.data);
        setApiData(response.data);

        // Update chartData state with API data for cultural diversity
        setChartData({
          datasets: [
            {
              // data: [
              //   response.data?.cultural_diversity.hinduism || 0, // hinduism
              //   response.data?.cultural_diversity.islam || 0, // islam
              // ],
              data: [2, 4, 6, 3, 7, 3],
              backgroundColor: [
                "#FFD81B",
                "#00E781",
                "black",
                "blue",
                "orange",
              ],
              borderWidth: [15, 8, 5, 20, 10],
            },
          ],
        });
      })
      .catch((error) => {
        // Handle errors
        setError(error);
      });
  }, []);

  // Function to handle download action
  const handleDownload = (containerData) => {
    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Convert data to worksheet
    const wsData = [Object.keys(containerData), Object.values(containerData)];
    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "Data");

    // Save the workbook
    XLSX.writeFile(wb, "dashboard-info.xlsx");
  };

  return (
    <RevealCard>
      <Bbox width={"100%"} borderRadius={2} overflow="hidden">
        {/* Dashboard top text box */}
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
            Dashboard
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
            <FormControl
              style={{
                width: isLaptop
                  ? "15rem"
                  : isTablet
                  ? "12rem"
                  : isLarge
                  ? "25rem"
                  : isSmall
                  ? "22rem"
                  : "22rem",
              }}
            >
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
            <FormControl
              style={{
                width: isLaptop
                  ? "15rem"
                  : isTablet
                  ? "12rem"
                  : isLarge
                  ? "25rem"
                  : isSmall
                  ? "22rem"
                  : "22rem",
              }}
            >
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

            {/* section dropdown */}
            <FormControl
              style={{
                width: isLaptop
                  ? "15rem"
                  : isTablet
                  ? "12rem"
                  : isLarge
                  ? "25rem"
                  : isSmall
                  ? "22rem"
                  : "22rem",
              }}
            >
              <InputLabel>Section</InputLabel>
              <Select
                placeholder="All"
                multiple
                value={curSection}
                onChange={handleSectionChange}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300,
                    },
                  },
                }}
                input={<OutlinedInput label="Section" />}
                renderValue={(selected) =>
                  selected.length === sections.length
                    ? "All"
                    : selected.join(", ")
                }
              >
                {/* Select All option */}
                <MenuItem value="all">
                  <ListItemIcon>
                    <Checkbox
                      checked={curSection.length === sections.length}
                      indeterminate={
                        curSection.length > 0 &&
                        curSection.length < sections.length
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary="Select All" />
                </MenuItem>
                {/* Section options */}
                {sections.map((section) => (
                  <MenuItem key={section} value={section}>
                    <Checkbox
                      size="small"
                      checked={curSection.indexOf(section) > -1}
                    />
                    <ListItemText primary={section} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* status dropdown */}
            <FormControl
              style={{
                width: isLaptop
                  ? "15rem"
                  : isTablet
                  ? "12rem"
                  : isLarge
                  ? "25rem"
                  : isSmall
                  ? "22rem"
                  : "22rem",
              }}
            >
              <InputLabel>Status</InputLabel>
              <Select
                placeholder="All"
                multiple
                value={curStatus}
                onChange={handleStatusChange}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300,
                    },
                  },
                }}
                input={<OutlinedInput label="Status" />}
                renderValue={(selected) =>
                  selected.length === status.length
                    ? "All"
                    : selected.join(", ")
                }
              >
                {/* Select All option */}
                <MenuItem value="all">
                  <ListItemIcon>
                    <Checkbox
                      checked={curStatus.length === status.length}
                      indeterminate={
                        curStatus.length > 0 && curStatus.length < status.length
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary="Select All" />
                </MenuItem>
                {/* Status options */}
                {status.map((statusOption) => (
                  <MenuItem key={statusOption} value={statusOption}>
                    <Checkbox
                      size="small"
                      checked={curStatus.indexOf(statusOption) > -1}
                    />
                    <ListItemText primary={statusOption} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Bbox>

          {/* Mid and right grid section */}
          <Grid container spacing={1} flex={2}>
            {/* total students section */}
            <Grid
              item
              xs={4}
              md={6}
              lg={12}
              style={{ maxWidth: isLaptop ? "35%" : isTablet ? "34%" : "32%" }}
            >
              <Bbox
                height={"11rem"}
                bgcolor={"primary.light"}
                borderRadius={1}
                p={2}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems={isLarge ? "flex-start" : "stretch"}
                position={"relative"}
              >
                {/* total students in number */}
                <Typography
                  fontSize={30}
                  fontWeight="600"
                  color={"primary.dark"}
                  align="left"
                >
                  {apiData && apiData.total_students.total}
                </Typography>

                {/* total students in text */}
                <Typography
                  fontSize={16}
                  fontWeight="300"
                  color={"#3B98C4"}
                  align="left"
                  style={{ marginTop: "-2rem" }}
                >
                  Total students
                </Typography>

                {/* flex-row */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  style={{ paddingBottom: "0.5rem", paddingRight: "3rem" }}
                >
                  {/* active section */}
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="left"
                    borderRight="1px solid black"
                    paddingRight={isTablet ? "0.5rem" : "1rem"}
                    paddingBottom="0.5rem"
                  >
                    <Typography
                      fontSize={14}
                      fontWeight="500"
                      color={"primary.dark"}
                    >
                      {apiData && apiData.total_students.active}
                    </Typography>
                    <Typography
                      fontSize={12}
                      fontWeight="300"
                      color={"primary.dark"}
                    >
                      Active
                    </Typography>
                  </Box>
                  {/* suspended section */}
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="left"
                    borderRight="1px solid black"
                    paddingRight={isTablet ? "0.5rem" : "1rem"}
                    marginLeft={isLarge ? "20px" : isSmall ? "0.5rem" : ""}
                  >
                    <Typography
                      fontSize={14}
                      fontWeight="500"
                      color={"primary.dark"}
                    >
                      {apiData && apiData.total_students.suspended}
                    </Typography>
                    <Typography
                      fontSize={12}
                      fontWeight="300"
                      color={"primary.dark"}
                    >
                      Suspended
                    </Typography>
                  </Box>
                  {/* saperated section */}
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="left"
                    paddingLeft={isLarge ? "1rem" : ""}
                    marginLeft={isSmall ? "0.5rem" : ""}
                  >
                    <Typography
                      fontSize={14}
                      fontWeight="500"
                      color={"primary.dark"}
                    >
                      {apiData && apiData.total_students.separated}
                    </Typography>
                    <Typography
                      fontSize={12}
                      fontWeight="300"
                      color={"primary.dark"}
                    >
                      Separated
                    </Typography>
                  </Box>
                </Box>

                {/* download icon */}
                <Box position={"absolute"} bottom={"0.1rem"} right={"0.1rem"}>
                  <IconButton
                    onClick={() => handleDownload(apiData.total_students)}
                  >
                    <Icon icon={"ic:round-download"} fontSize={"1.4rem"} />
                  </IconButton>
                </Box>
              </Bbox>
            </Grid>

            {/* student-teacher ratio section */}
            <Grid
              item
              xs={4}
              md={6}
              lg={12}
              style={{ maxWidth: isLaptop ? "35%" : isTablet ? "34%" : "32%" }}
            >
              <Bbox
                height={"11rem"}
                bgcolor={"secondary.light"}
                borderRadius={1}
                p={2}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="stretch"
                position={"relative"}
              >
                {/* ration in number */}
                <Typography
                  fontSize={30}
                  fontWeight="600"
                  color={"primary.dark"}
                  align="left"
                >
                  {apiData && apiData.student_teacher_ratio.ratio}
                </Typography>

                {/* student-teacher ratio text */}
                <Typography
                  fontSize={15}
                  fontWeight="300"
                  color={"#B34A19"}
                  align="left"
                  style={{ marginTop: "-2rem" }}
                >
                  Student-Teacher Ratio
                </Typography>

                {/* flex row */}
                <Box
                  display="flex"
                  style={{ paddingBottom: "0.5rem", paddingRight: "2rem" }}
                >
                  {/* total students */}
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="left"
                    borderRight="1px solid black"
                    paddingRight={isTablet ? "0.5rem" : "1rem"}
                    paddingBottom="0.5rem"
                  >
                    <Typography
                      fontSize={15}
                      fontWeight="500"
                      color={"primary.dark"}
                    >
                      {apiData && apiData.student_teacher_ratio.students}
                    </Typography>
                    <Typography
                      fontSize={12}
                      fontWeight="300"
                      color={"primary.dark"}
                    >
                      Students
                    </Typography>
                  </Box>

                  {/* total teachers */}
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="left"
                    paddingLeft={isTablet ? "0.5rem" : "1rem"}
                  >
                    <Typography
                      fontSize={15}
                      fontWeight="500"
                      color={"primary.dark"}
                    >
                      {apiData && apiData.student_teacher_ratio.teachers}
                    </Typography>
                    <Typography
                      fontSize={12}
                      fontWeight="300"
                      color={"primary.dark"}
                    >
                      Teachers
                    </Typography>
                  </Box>
                </Box>
              </Bbox>
            </Grid>

            {/* gender distribution chart section */}
            <Grid
              item
              xs={4}
              md={6}
              lg={12}
              style={{ maxWidth: isLaptop ? "30%" : isTablet ? "14.9rem" : "36%" }}
            >
              <div style={{ maxWidth: "100%", overflow: "hidden" }}>
                <Bbox
                  height={"11rem"}
                  borderRadius={1}
                  p={1}
                  px={0}
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-start"
                  alignItems="stretch"
                  position={"relative"}
                  style={{ maxWidth: "100%" }}
                >
                  {/* Title above the chart */}
                  <Typography
                    fontSize={14}
                    fontWeight={600}
                    color={"black"}
                    style={{
                      marginBottom: "0.5rem",
                      marginLeft: "1.5rem",
                      marginTop: "0.2rem",
                    }}
                  >
                    Gender Distribution
                  </Typography>

                  {/* Chart */}
                  <div style={{ paddingRight: isSmall ? "91px" : "90px" }}>
                    <Chart
                      options={{
                        chart: {
                          type: "donut",
                          toolbar: {
                            show: false,
                          },
                        },
                        dataLabels: {
                          enabled: false,
                        },
                        plotOptions: {
                          pie: {
                            donut: {
                              size: "75%", // chart thickness
                              labels: {
                                show: false,
                              },
                            },
                          },
                        },
                        legend: {
                          show: false,
                        },
                        colors: ["#0072DB", "#C6CA00", "#FF6163"],
                        labels: ["Male", "Female", "Others"],
                      }}
                      series={[
                        apiData && apiData.gender_distribution.male,
                        apiData && apiData.gender_distribution.female,
                        apiData && apiData.gender_distribution.others,
                      ]}
                      type="donut"
                      width="100%"
                      height="150"
                    />
                  </div>

                  {/* total number in the middle of the chart */}
                  <div
                    style={{
                      position: "absolute",
                      top: "59%",
                      left: isLaptop
                        ? "34%"
                        : isTablet
                        ? "31%"
                        : isLarge
                        ? "39%"
                        : isSmall
                        ? "38%"
                        : "37%",
                      transform: "translate(-50%, -50%)",
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "black",
                    }}
                  >
                    {/* adding the total and displaying it */}
                    <span style={{ paddingLeft: "25%" }}>
                      {apiData &&
                        apiData.gender_distribution.male +
                          apiData.gender_distribution.female +
                          apiData.gender_distribution.others}
                    </span>
                    <br />
                    Total
                  </div>

                  {/* Custom label names */}
                  <Box
                    style={{
                      position: "absolute",
                      marginTop: 65,
                      marginLeft: isTablet ? "63%" : "64%",
                      gap: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* male */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor: "#0072DB",
                          marginRight: 5,
                        }}
                      ></div>
                      <Typography style={{ fontSize: 12, fontWeight: 400 }}>
                        Male
                      </Typography>
                    </div>

                    {/* female */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor: "#C6CA00",
                          marginRight: 5,
                        }}
                      ></div>
                      <Typography style={{ fontSize: 12, fontWeight: 400 }}>
                        Female
                      </Typography>
                    </div>

                    {/* others */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor: "#FF6163",
                          marginRight: 5,
                        }}
                      ></div>
                      <Typography style={{ fontSize: 12, fontWeight: 400 }}>
                        Others
                      </Typography>
                    </div>
                  </Box>
                </Bbox>
              </div>
            </Grid>

            {/* vaccancy section */}
            <Grid
              item
              xs={4}
              md={6}
              lg={12}
              style={{ maxWidth: isLaptop ? "35%" : isTablet ? "34%" : "32%" }}
            >
              <div style={{ maxWidth: "100%", overflow: "hidden" }}>
                <Bbox
                  height={"11rem"}
                  bgcolor={"secondary.light"}
                  borderRadius={1}
                  p={1}
                  px={1}
                  py={3}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  position={"relative"}
                >
                  {/* left side */}
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                    gap={2}
                    paddingLeft={1}
                  >
                    {/* total vacancy */}
                    <Typography
                      fontSize={30}
                      fontWeight="600"
                      color={"primary.dark"}
                      align="left"
                      style={{ marginBottom: "-1rem" }}
                    >
                      {apiData && apiData.vacancy.current}
                    </Typography>

                    {/* vacancy text */}
                    <Typography
                      fontSize={15}
                      fontWeight="500"
                      color={"#B34A19"}
                      align="left"
                      style={{ marginBottom: "-1rem" }}
                    >
                      Vacancy
                    </Typography>

                    {/* fulfilment percentage */}
                    <Typography
                      fontSize={12}
                      fontWeight="400"
                      color={"#626262"}
                      align="left"
                      style={{ marginBottom: "1rem" }}
                    >
                      {apiData &&
                        (
                          (apiData.vacancy.current / apiData.vacancy.total) *
                          100
                        ).toFixed(2)}{" "}
                      % Fulfillment
                    </Typography>
                  </Box>

                  {/* chart showing vacancy */}
                  <div
                    style={{
                      position: "relative",
                    }}
                  >
                    <Chart
                      options={{
                        chart: {
                          type: "donut",
                          width: "80%",
                          height: "80%",
                          toolbar: {
                            show: false,
                          },
                        },
                        dataLabels: {
                          enabled: false,
                        },
                        plotOptions: {
                          pie: {
                            donut: {
                              size: "80%", // chart thickness
                              labels: {
                                show: false,
                              },
                            },
                          },
                        },
                        legend: {
                          show: false,
                        },
                        colors: ["#04BE38", "#b8b4b4"],
                      }}
                      series={[
                        apiData && apiData.vacancy.current,
                        apiData &&
                          apiData.vacancy.total - apiData.vacancy.current,
                      ]}
                      type="donut"
                      width="100%"
                      height="150"
                    />

                    {/* percentage text in the middle of the chart */}
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "51%",
                        transform: "translate(-50%, -50%)",
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "black",
                      }}
                    >
                      {apiData &&
                        (
                          (apiData.vacancy.current / apiData.vacancy.total) *
                          100
                        ).toFixed(1)}{" "}
                      %
                    </div>
                  </div>

                  {/* download icon */}
                  <Box position={"absolute"} bottom={"0.1rem"} right={"0.1rem"}>
                    <IconButton onClick={() => handleDownload(apiData.vacancy)}>
                      <Icon icon={"ic:round-download"} fontSize={"1.4rem"} />
                    </IconButton>
                  </Box>
                </Bbox>
              </div>
            </Grid>

            {/* defaulter section */}
            <Grid
              item
              xs={4}
              md={6}
              lg={12}
              style={{ maxWidth: isLaptop ? "35%" : isTablet ? "34%" : "32%" }}
            >
              <Bbox
                height={"11rem"}
                bgcolor={"primary.light"}
                borderRadius={1}
                p={2}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems={isLarge ? "flex-start" : "stretch"}
                position={"relative"}
              >
                {/* total defaulter in number */}
                <Typography
                  fontSize={30}
                  fontWeight="600"
                  color={"primary.dark"}
                  align="left"
                >
                  {apiData && apiData.defaulter.total}
                </Typography>

                {/* defaulter text */}
                <Typography
                  fontSize={16}
                  fontWeight="300"
                  color={"#3B98C4"}
                  align="left"
                  style={{ marginTop: "0.1rem" }}
                >
                  Defaulter
                </Typography>

                {/* defaulter percentage */}
                <Typography
                  fontSize={12}
                  fontWeight="300"
                  color={"#545454"}
                  align="left"
                >
                  {apiData &&
                    (
                      ((apiData.defaulter.attendance +
                        apiData.defaulter.discipline +
                        apiData.defaulter.fee_penalty) /
                        apiData.defaulter.total) *
                      100
                    ).toFixed(2)}{" "}
                  % of total students
                </Typography>

                {/* flex-row */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  style={{
                    paddingRight: "1rem",
                    paddingTop: "0.5rem",
                  }}
                >
                  {/* fee / penalty section */}
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="left"
                    borderRight="1px solid black"
                    paddingRight={isTablet || isSmall ? "0.4rem" : "1rem"}
                    paddingBottom="0.5rem"
                  >
                    <Typography
                      fontSize={14}
                      fontWeight="500"
                      color={"primary.dark"}
                    >
                      {apiData && apiData.defaulter.fee_penalty}
                    </Typography>
                    <Typography
                      fontSize={12}
                      fontWeight="300"
                      color={"primary.dark"}
                    >
                      Fee / Penalty
                    </Typography>
                  </Box>
                  {/* attendance section */}
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="left"
                    borderRight="1px solid black"
                    paddingRight={isTablet || isSmall ? "0.5rem" : "1rem"}
                    marginLeft={isLarge ? "20px" : ""}
                  >
                    <Typography
                      fontSize={14}
                      fontWeight="500"
                      color={"primary.dark"}
                    >
                      {apiData && apiData.defaulter.attendance}
                    </Typography>
                    <Typography
                      fontSize={12}
                      fontWeight="300"
                      color={"primary.dark"}
                    >
                      Attendance
                    </Typography>
                  </Box>
                  {/* discipline section */}
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="left"
                    marginLeft={isLarge ? "1rem" : ""}
                  >
                    <Typography
                      fontSize={14}
                      fontWeight="500"
                      color={"primary.dark"}
                    >
                      {apiData && apiData.defaulter.discipline}
                    </Typography>
                    <Typography
                      fontSize={12}
                      fontWeight="300"
                      color={"primary.dark"}
                    >
                      Discipline
                    </Typography>
                  </Box>
                </Box>

                {/* download icon */}
                <Box position={"absolute"} bottom={"0.1rem"} right={"0.1rem"}>
                  <IconButton onClick={() => handleDownload(apiData.defaulter)}>
                    <Icon icon={"ic:round-download"} fontSize={"1.4rem"} />
                  </IconButton>
                </Box>
              </Bbox>
            </Grid>

            {/* cultural diversity section */}
            <Grid
              item
              xs={4}
              md={6}
              lg={12}
              // style={{
              //   maxWidth: isLaptop ? "17rem" : isTablet ? "14.9rem" : "36%",
              // }}
              style={{ maxWidth: isLaptop ? "30%" : isTablet ? "14.9rem" : "36%" }}
            >
              <div style={{ width: "100%", overflow: "hidden" }}>
                <Bbox
                  height={"11rem"}
                  borderRadius={1}
                  p={1}
                  px={0}
                  py={0}
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-start"
                  alignItems="stretch"
                  position={"relative"}
                >
                  {/* Title above the chart */}
                  <Typography
                    fontSize={14}
                    fontWeight={600}
                    color={"black"}
                    style={{
                      marginBottom: "0.5rem",
                      marginLeft: "1.5rem",
                      marginTop: "0.2rem",
                    }}
                  >
                    Cultural Diversity
                  </Typography>

                  {/* chart */}
                  <div style={{ paddingRight: isSmall ? "91px" : "90px" }}>
                    <Chart
                      options={{
                        chart: {
                          type: "donut",
                          toolbar: {
                            show: false,
                          },
                        },
                        dataLabels: {
                          enabled: false,
                        },
                        plotOptions: {
                          pie: {
                            donut: {
                              size: "70rem", // chart thickness
                              labels: {
                                show: false,
                              },
                            },
                          },
                        },
                        legend: {
                          show: false,
                        },
                        colors: [
                          "#0072DB",
                          "#C6CA00",
                          "#FF6163",
                          "#00E781",
                          "#817E7E",
                        ],
                        labels: [
                          "Hinduism",
                          "Islam",
                          "Christianity",
                          "Sikhism",
                          "Others",
                        ],
                      }}
                      series={[40, 30, 15, 10, 5]} // religious data
                      type="donut"
                      width="100%"
                      height="150"
                    />
                  </div>

                  {/* total number in the middle of the chart */}
                  <div
                    style={{
                      position: "absolute",
                      top: "5.8rem",
                      left: isLaptop
                        ? "5.8rem"
                        : isTablet
                        ? "4.1rem"
                        : isLarge
                        ? "39%"
                        : isSmall
                        ? "38%"
                        : "37%",
                      transform: "translate(-50%, -50%)",
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "black",
                    }}
                  >
                    <span style={{ paddingLeft: "16%" }}>100</span>
                    <br />
                    Total
                  </div>

                  {/* Custom label names */}
                  <Box
                    style={{
                      position: "absolute",
                      marginTop: 48,
                      marginLeft: isTablet ? "63%" : "64%",
                      gap: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* hinduism */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor: "#0072DB",
                          marginRight: 5,
                        }}
                      ></div>
                      <Typography style={{ fontSize: 12, fontWeight: 400 }}>
                        Hinduism
                      </Typography>
                    </div>

                    {/* islam */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor: "#C6CA00",
                          marginRight: 5,
                        }}
                      ></div>
                      <Typography style={{ fontSize: 12, fontWeight: 400 }}>
                        Islam
                      </Typography>
                    </div>

                    {/* christianity */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor: "#FF6163",
                          marginRight: 5,
                        }}
                      ></div>
                      <Typography style={{ fontSize: 12, fontWeight: 400 }}>
                        Christianity
                      </Typography>
                    </div>

                    {/* sikhism */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor: "#00E781",
                          marginRight: 5,
                        }}
                      ></div>
                      <Typography style={{ fontSize: 12, fontWeight: 400 }}>
                        Sikhism
                      </Typography>
                    </div>

                    {/* others */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor: "#817E7E",
                          marginRight: 5,
                        }}
                      ></div>
                      <Typography style={{ fontSize: 12, fontWeight: 400 }}>
                        Others
                      </Typography>
                    </div>
                  </Box>
                </Bbox>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Bbox>
    </RevealCard>
  );
};

export default StudentDashboard;
