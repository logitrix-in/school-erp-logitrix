import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Button,
} from "@mui/material";
import axios from "axios";
import RevealCard from "../../AnimationComponents/RevealCard";
import Bbox from "../../UiComponents/Bbox";
import { useMediaQuery } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import Calendar from "react-calendar";
import "./styles.css";

const StudentView = () => {
  // breakpoints
  const isSmall = useMediaQuery("(max-width: 1364px)");
  const isTablet = useMediaQuery("(min-width: 1365px) and (max-width: 1535px)");
  const isLaptop = useMediaQuery("(min-width: 1536px) and (max-width: 1706px)");
  const isDesktop = useMediaQuery(
    "(min-width: 1707px) and (max-width: 1919px)"
  );
  const isLarge = useMediaQuery("(min-width: 1920px)");
  const isXlarge = useMediaQuery("(min-width: 2560px)");

  const curYear = new Date().getFullYear();

  const academicYear = `${curYear}-${(curYear + 1).toString().slice(2, 4)}`;

  const [filter, setFilter] = useState({});
  const [acYear, setAcYear] = useState(academicYear);
  const [value, setValue] = useState(new Date());
  const [apiData, setApiData] = useState([]);
  // const [rows, setRows] = useState([]);
  // const [columns, setColumns] = useState([]);

  // api call
  // useEffect(() => {
  //   const apiUrl =
  //     "https://server.sociolinq.com/api/students/attendance/?type=student_view";
  //   axios
  //     .get(apiUrl)
  //     .then((response) => {
  //       console.log("success", response.data);
  //       setApiData(response.data);
  //     })
  //     .catch((error) => {
  //       setError(error);
  //     });
  // }, []);

  // Update table 1 rows and columns with API data
  // useEffect(() => {
  //   if (Array.isArray(apiData)) {
  //     const updatedRows = apiData.map((studentData, index) => ({
  //       id: studentData.student_id,
  //       name: studentData.name,
  //       class: studentData.class,
  //       section: studentData.section,
  //       roll: studentData.roll_no,
  //       status: studentData.status,
  //     }));

  //     // columns
  //     const updatedColumns = [
  //       { field: "id", headerName: "Student ID", flex: 1 },
  //       { field: "name", headerName: "Name", flex: 1 },
  //       { field: "class", headerName: "Class", flex: 1 },
  //       { field: "section", headerName: "Section", flex: 1 },
  //       { field: "roll", headerName: "Roll #", flex: 1 },
  //       {
  //         field: "status",
  //         headerName: "Status",
  //         flex: 1,
  //         renderCell: (params) => (
  //           <Box
  //             style={{
  //               backgroundColor:
  //                 params.value.toLowerCase() === "active"
  //                   ? "#C6F6D5"
  //                   : "#FFCCCC",
  //               borderRadius: "6px",
  //               display: "inline-block",
  //               width: "60px",
  //               paddingLeft: "11px",
  //             }}
  //           >
  //             {params.value}
  //           </Box>
  //         ),
  //       },
  //     ];

  //     setRows(updatedRows);
  //     setColumns(updatedColumns);
  //   }
  // }, [apiData]);

  // context useEffect
  useEffect(() => {
    const _filter = {
      academic_year: acYear,
    };
    setFilter(_filter);
  }, [acYear]);

  // table columns
  const columns = [
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
  ];

  // table columns
  const columns2 = [
    { field: "space", headerName: "", width: 50 },
    { field: "id", headerName: "Month", flex: 1 },
    { field: "attendance", headerName: "Attendance", flex: 1 },
    { field: "days", headerName: "Working Days", flex: 1 },
    { field: "attendace", headerName: "Attendance %", flex: 1 },
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
                : params.value === "Suspended"
                ? "#FED7D7"
                : params.value === "Partially Suspended"
                ? "#FEEBCB"
                : params.value === "Separated"
                ? "#E2E8F0"
                : "transparent",
            borderRadius: "6px",
            display: "inline-block",
            width:
              params.value === "Active" || params.value === "Inactive"
                ? "60px"
                : params.value === "Suspended"
                ? "80px"
                : params.value === "Partially Suspended"
                ? "140px"
                : params.value === "Separated"
                ? "80px"
                : "auto",
            paddingLeft:
              params.value === "Active"
                ? "11px"
                : params.value === "Inactive"
                ? "7px"
                : params.value === "Suspended"
                ? "5px"
                : params.value === "Partially Suspended"
                ? "9px"
                : params.value === "Separated"
                ? "8px"
                : "0px",
          }}
        >
          {params.value}
        </Box>
      ),
    },
  ];

  // table rows
  const rows2 = [
    {
      id: "Jan",
      attendance: "20",
      days: "24",
      attendace: "80%",
      status: "Active",
    },
    {
      id: "Feb",
      attendance: "20",
      days: "24",
      attendace: "80%",
      status: "Suspended",
    },
    {
      id: "Mar",
      attendance: "20",
      days: "24",
      attendace: "80%",
      status: "Partially Suspended",
    },
    {
      id: "Apr",
      attendance: "20",
      days: "24",
      attendace: "80%",
      status: "Separated",
    },
    {
      id: "May",
      attendance: "20",
      days: "24",
      attendace: "80%",
      status: "N/A",
    },
    {
      id: "Jun",
      attendance: "20",
      days: "24",
      attendace: "80%",
      status: "Inactive",
    },
    {
      id: "Jul",
      attendance: "20",
      days: "24",
      attendace: "80%",
      status: "Active",
    },
    {
      id: "Aug",
      attendance: "20",
      days: "24",
      attendace: "80%",
      status: "Active",
    },
    {
      id: "Sep",
      attendance: "20",
      days: "24",
      attendace: "80%",
      status: "Active",
    },
    {
      id: "Oct",
      attendance: "20",
      days: "24",
      attendace: "80%",
      status: "Active",
    },
    {
      id: "Nov",
      attendance: "20",
      days: "24",
      attendace: "80%",
      status: "Active",
    },
    {
      id: "Dec",
      attendance: "20",
      days: "24",
      attendace: "80%",
      status: "Active",
    },
  ];

  return (
    <RevealCard>
      <Bbox
        mt={2}
        width={"100%"}
        height={"100%"}
        borderRadius={2}
        overflow="hidden"
      >
        {/* Top text box */}
        <Box
          bgcolor="#ECEDED"
          py={1.3}
          px={3}
          borderRadius={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          m={2}
        >
          <Typography fontWeight={500} fontSize="14px">
            Attendance - Student View
          </Typography>
        </Box>

        {/* Search area and academic year dropdown */}
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          p={2}
          height={70}
          width={"100%"}
        >
          {/* Search input and Search button container */}
          <Box display="flex" alignItems="center">
            <input
              type="text"
              placeholder="Search by Student ID or Student Name"
              style={{
                width: 420,
                height: "39px",
                borderRadius: "7px",
                border: "1px solid #ccc",
                paddingLeft: "10px",
              }}
            />

            {/* Search button */}
            <Button variant="contained" style={{ marginLeft: "15px" }}>
              Search
            </Button>
          </Box>

          {/* Spacer */}
          <Box flex={1} />

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
        </Box>

        {/* table 1 */}
        <Box m={2} mb={5} height={"100%"}>
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

        {/* calendar */}
        <Box m={2} mb={7}>
          {/* row 1 */}
          <Box
            display={"flex"}
            flexDirection={"row"}
            gap={isLaptop ? 1.2 : isLarge ? 13.4 : isTablet ? 4.5 : 6.6}
          >
            <Calendar onChange={setValue} value={value} className="calendar" />
            <Calendar onChange={setValue} value={value} className="calendar" />
            <Calendar onChange={setValue} value={value} className="calendar" />
            <Calendar onChange={setValue} value={value} className="calendar" />
            {!isTablet && (
              <Calendar
                onChange={setValue}
                value={value}
                className="calendar"
              />
            )}
          </Box>

          {/* row 2 */}
          <Box
            mt={isLaptop ? 1.2 : 4}
            display={"flex"}
            flexDirection={"row"}
            gap={isLaptop ? 1.2 : isLarge ? 13.4 : isTablet ? 4.5 : 6.6}
          >
            <Calendar onChange={setValue} value={value} className="calendar" />
            <Calendar onChange={setValue} value={value} className="calendar" />
            <Calendar onChange={setValue} value={value} className="calendar" />
            <Calendar onChange={setValue} value={value} className="calendar" />
            {!isTablet && (
              <Calendar
                onChange={setValue}
                value={value}
                className="calendar"
              />
            )}
          </Box>
        </Box>

        {/* table 2 */}
        <Box m={2} mb={5} height={"100%"}>
          <DataGrid
            rows={rows2}
            columns={columns2}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            // checkboxSelection
          />
        </Box>
      </Bbox>
    </RevealCard>
  );
};

export default StudentView;
