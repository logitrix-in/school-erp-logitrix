import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Checkbox,
  ListItemText,
  Dialog,
  DialogActions,
  DialogTitle,
  OutlinedInput,
  ListItemIcon,
  Radio,
} from "@mui/material";
import RevealCard from "../../AnimationComponents/RevealCard";
import Bbox from "../../UiComponents/Bbox";
import { Search } from "@mui/icons-material";
import { Chart } from "react-google-charts";
import "./styles.css";
import useClasses from "../../../hooks/useClasses";
import { useMediaQuery } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { DataGrid } from "@mui/x-data-grid";


const StudentAccountCompliance = () => {
  // breakpoints
  const isSmall = useMediaQuery("(max-width: 1364px)");
  const isTablet = useMediaQuery("(min-width: 1365px) and (max-width: 1535px)");
  const isLaptop = useMediaQuery("(min-width: 1536px) and (max-width: 1706px)");
  const isDesktop = useMediaQuery(
    "(min-width: 1707px) and (max-width: 1919px)"
  );
  const isLarge = useMediaQuery("(min-width: 1920px)");

  // prompt state
  const [showPrompt, setShowPrompt] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // dropdowns states and variables
  const [filter, setFilter] = useState({});

  const { classes, sections, days } = useClasses();

  const curYear = new Date().getFullYear();

  const academicYear = `${curYear}-${(curYear + 1).toString().slice(2, 4)}`;

  const [acYear, setAcYear] = useState(academicYear);
  const [curClass, setClass] = useState([]);
  const [curSection, setSection] = useState([]);
  const [day, setDay] = useState([]);
  const [type, setType] = useState("all");
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);

  const [isEditButtonActive, setIsEditButtonActive] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  // table columns
  const columns = [
    {
      field: "radioButtons",
      headerName: "",
      width: isLaptop ? 50 : isLarge ? 70 : isSmall ? 40 : isTablet ? 50 : 70,
      renderCell: (params) => (
        <Radio
          checked={params.row.id === selectedRow}
          color="primary"
          sx={{
            transform: "scale(0.6)",
          }}
          inputProps={{ "aria-label": params.row.id }}
          onChange={() => {
            setSelectedRow(params.row.id);
            setIsEditButtonActive(true);
          }}
        />
      ),
    },
    { field: "space", headerName: "", width: isLarge ? 80 : 50 },
    { field: "id", headerName: "Student ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "class", headerName: "Class", flex: 1 },
    { field: "section", headerName: "Section", flex: 1 },
    { field: "roll", headerName: "Roll #", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
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
            display: "inline-block",
            width:
              params.value === "Active" || params.value === "Inactive"
                ? "60px"
                : "auto",
            paddingLeft:
              params.value === "Active"
                ? "11px"
                : params.value === "Inactive"
                ? "7px"
                : "0px",
          }}
        >
          {params.value}
        </Box>
      ),
    },
  ];

  // table rows
  const rows = [
    {
      id: "AG240001",
      class: "VI",
      name: "Saunav Ray",
      section: "A",
      roll: 23,
      status: "Active",
    },
    {
      id: "AG240002",
      class: "VI",
      name: "Saunav Ray",
      section: "A",
      roll: 23,
      status: "Inactive",
    },
    {
      id: "AG240003",
      class: "VI",
      name: "Saunav Ray",
      section: "A",
      roll: 23,
      status: "Active",
    },
  ];

  // api calling
  useEffect(() => {
    const apiUrl =
      "https://server.sociolinq.com/api/students/information?type=student_account_compliance";

    axios
      .get(apiUrl)
      .then((response) => {
        // console.log("success", response.data);
        setApiData(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  // context useEffect
  useEffect(() => {
    const _filter = {
      academic_year: acYear,
      dayss: day,
      class: curClass,
      section: curSection,
      type: type,
    };
    setFilter(_filter);
  }, [curSection, day, acYear, curClass]);

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

  // handle opening the prompt dialog
  const handleOpenPrompt = () => {
    setShowPrompt(true);
  };

  // handle closing the prompt dialog
  const handleClosePrompt = () => {
    setShowPrompt(false);
  };

  // handle notifying inactive users
  const handleNotifyInactiveUsers = () => {
    try {
      toast.success("Notified successfully", {
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error while displaying toast:", error);
    }
    setShowPrompt(false);
  };

  // chart dimension state
  const [chartDimensions, setChartDimensions] = useState({
    width: "100%",
    height: 350,
  });

  // useEffect to calc height and width of chart for responsive
  useEffect(() => {
    const handleResize = () => {
      const maxWidth = document.getElementById("chart-container").offsetWidth;
      const maxHeight = window.innerHeight * 0.6; // Height

      setChartDimensions({
        width: maxWidth,
        height: maxHeight,
      });
    };

    handleResize(); // Initial call to set dimensions

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <RevealCard>
      <Bbox width={"100%"} mt={4} borderRadius={2} overflow="hidden">
        {/* Title text */}
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
            Student Account Compliance
          </Typography>
        </Box>

        {/* Divider */}
        <Divider />

        {/* main grid */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          p={2}
          pb={2}
        >
          {/* Search input area */}
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <TextField
                variant="outlined"
                placeholder="Search by Student ID / Student Name"
                sx={{ width: isLaptop ? 400 : 500 }}
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Search sx={{ fontSize: "1.3rem", cursor: "pointer" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

         <Box my={2} mb={2} height={"100%"} width={"100%"}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              // checkboxSelection
            />
          </Box>
            

          {/* Grid section */}
          <Box display="flex" gap={2} pt={4} pb={2}>
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
              width={isSmall ? "46%" : "100%"}
            >
              {/* class dropdown */}
              <FormControl
                style={{
                  width: isLaptop
                    ? "20rem"
                    : isTablet
                    ? "15rem"
                    : isSmall
                    ? "14rem"
                    : isLarge
                    ? "25rem"
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
                          classes.length > 0 &&
                          curClass.length === classes.length
                        }
                        indeterminate={
                          curClass.length > 0 &&
                          curClass.length < classes.length
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
                    ? "20rem"
                    : isTablet
                    ? "15rem"
                    : isSmall
                    ? "14rem"
                    : isLarge
                    ? "25rem"
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

              {/* days dropdown */}
              <FormControl
                style={{
                  width: isLaptop
                    ? "20rem"
                    : isTablet
                    ? "15rem"
                    : isSmall
                    ? "14rem"
                    : isLarge
                    ? "25rem"
                    : "22rem",
                }}
              >
                <InputLabel>Days</InputLabel>
                <Select
                  label="Days"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                >
                  <MenuItem value={"7"}>Last 7 days</MenuItem>
                  <MenuItem value={"15"}>Last 15 days</MenuItem>
                  <MenuItem value={"30"}>Last 30 days</MenuItem>
                  <MenuItem value={"60"}>Last 60 days</MenuItem>
                </Select>
              </FormControl>
            </Bbox>

            <Box display="flex" flexDirection={isSmall ? "row" : "row"}>
              {/* Mid chart section */}
              <Bbox
                borderRadius={1}
                flex={0}
                p={1}
                display="flex"
                flexDirection="column"
                gap="1.6rem"
                bgcolor="white"
                width={isLaptop ? "26rem" : isSmall ? "20rem" : "100%"}
                marginLeft={isLarge ? "5rem" : ""}
              >
                {/* Custom title positioned absolutely */}
                <Box
                  position="absolute"
                  marginLeft={2}
                  marginTop={1}
                  zIndex={1}
                >
                  <Typography
                    color="black"
                    sx={{ fontSize: 16, fontWeight: 600 }}
                  >
                    Utilisation
                  </Typography>
                </Box>

                {/* Pie chart */}
                <Chart
                  width={"100%"}
                  height={"250px"}
                  chartType="PieChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ["Status", "Percentage"],
                    // ["Inactive Users", 20],
                    // ["Active Users", 30],
                    apiData &&
                      apiData.inactive_users && [
                        "Inactive Users",
                        apiData.inactive_users,
                      ],
                    apiData &&
                      apiData.active_users && [
                        "Active Users",
                        apiData.active_users,
                      ],
                  ]}
                  options={{
                    chartArea: {
                      left: 30,
                      top: 35,
                      width: "100%",
                      height: "70%",
                    },
                    legend: {
                      alignment: "center",
                      position: "right",
                    },
                    is3D: true,
                    colors: ["#0072DB", "#C6CA00"],
                  }}
                  rootProps={{ "data-testid": "1" }}
                />
              </Bbox>

              {/* Right buttons section */}
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                pt={4}
                ml={3}
                marginTop={"40px"}
                marginLeft={isLarge ? "5rem" : "40px"}
              >
                {/* Download button */}
                <Button
                  variant="contained"
                  sx={{
                    width: isLaptop
                      ? 340
                      : isDesktop
                      ? 400
                      : isTablet
                      ? 250
                      : isSmall
                      ? 230
                      : 400,
                    height: 40,
                    bgcolor: "#2F7DA1",
                    color: "white",
                    mb: 5,
                  }}
                >
                  Download
                </Button>

                <ToastContainer />

                {/* Notify inactive users button */}
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    width: isLaptop
                      ? 340
                      : isDesktop
                      ? 400
                      : isTablet
                      ? 250
                      : isSmall
                      ? 230
                      : 400,
                    height: 40,
                  }}
                  onClick={handleOpenPrompt}
                >
                  Notify Inactive Users
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Bbox>

      {/* Prompt dialog */}
      <Dialog open={showPrompt} onClose={handleClosePrompt}>
        <div
          style={{
            backgroundColor: "#3B98C4",
            height: "15px",
            width: "100%",
          }}
        />
        <DialogTitle style={{ fontSize: "18px", fontWeight: "500" }}>
          Are you sure you want to notify all inactive users?
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={handleClosePrompt}
            sx={{
              color: "red",
              fontWeight: "400",
              "&:hover": {
                backgroundColor: "#FFECEB",
              },
            }}
          >
            No
          </Button>
          <Button
            variant="contained"
            onClick={handleNotifyInactiveUsers}
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </RevealCard>
  );
};

export default StudentAccountCompliance;
