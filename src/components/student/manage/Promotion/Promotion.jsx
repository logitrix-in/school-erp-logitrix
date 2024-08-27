import React, { useState, useEffect } from "react";
import RevealCard from "../../../AnimationComponents/RevealCard";
import Bbox from "../../../UiComponents/Bbox";
import {
  Box,
  Divider,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  TextField,
  InputAdornment,
  Radio,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { Search } from "@mui/icons-material";
import { useMediaQuery } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import useClasses from "../../../../hooks/useClasses";
import { Icon } from "@iconify/react";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";

const Promotion = () => {
  const navigate = useNavigate();

  // breakpoints
  const isSmall = useMediaQuery("(max-width: 1364px)");
  const isTablet = useMediaQuery("(min-width: 1365px) and (max-width: 1535px)");
  const isLaptop = useMediaQuery("(min-width: 1536px) and (max-width: 1706px)");
  const isDesktop = useMediaQuery(
    "(min-width: 1707px) and (max-width: 1919px)"
  );
  const isLarge = useMediaQuery("(min-width: 1920px)");
  const isXlarge = useMediaQuery("(min-width: 2560px)");

  // academic year calculation
  const curYear = new Date().getFullYear();
  const academicYear = `${curYear}-${(curYear + 1).toString().slice(2, 4)}`;

  // states
  const [acYear, setAcYear] = useState(academicYear);
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [filter, setFilter] = useState({});
  const [curClass, setClass] = useState([]);
  const [classDrop, setClassDrop] = useState("");
  const [englishValue, setEnglishValue] = useState("");
  const [bengaliValue, setBengaliValue] = useState("");
  const [mathematicsValue, setMathematicsValue] = useState("");
  const [physicsValue, setPhysicsValue] = useState("");
  const [sportsValue, setSportsValue] = useState("");
  const [allocateSeats, setAllocateSeats] = useState(false);

  const { classes } = useClasses();

  // context useEffect
  useEffect(() => {
    const _filter = {
      class: curClass,
    };
    setFilter(_filter);
  }, [curClass]);

  // api call
  useEffect(() => {
    const apiUrl =
      "https://server.sociolinq.com/api/students/manage/edit-information/individual/edit/?type=promotion";

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

  // Reset input values when classDrop changes
  useEffect(() => {
    setEnglishValue("");
    setBengaliValue("");
    setMathematicsValue("");
    setPhysicsValue("");
    setSportsValue("");
  }, [classDrop]);

  // Update table 1 rows and columns with API data
  useEffect(() => {
    if (apiData) {
      const updatedRows = apiData.map((studentData, index) => ({
        id: index + 1,
        space: "",
        class: studentData.class,
        eligible: `${studentData.eligible_for_promotion}/80`,
        promoted: `${studentData.promoted}/85`,
        confirmed: `${studentData.seats_confirmed}/85`,
        fulfillment: `${studentData.seats_fullfillment > 0 ? "-" : ""}${
          studentData.seats_fullfillment
        }`,
        promotion: `${studentData.promotion_percent} %`,
      }));

      // Define columns based on API data
      const updatedColumns = [
        { field: "space", headerName: "", width: 50 },
        {
          field: "class",
          headerName: "Class",
          width: isLaptop ? 200 : isLarge ? 250 : isTablet ? 130 : 230,
        },
        {
          field: "eligible",
          headerName: "Eligible for Promotion",
          width: isLaptop ? 200 : isLarge ? 250 : isTablet ? 210 : 230,
        },
        {
          field: "promoted",
          headerName: "Promoted",
          width: isLaptop ? 200 : isLarge ? 250 : isTablet ? 130 : 230,
        },
        {
          field: "confirmed",
          headerName: "Seats Confirmed",
          width: isLaptop ? 200 : isLarge ? 250 : isTablet ? 180 : 230,
        },
        {
          field: "fulfillment",
          headerName: "Seat Fulfillment",
          width: isLaptop ? 200 : isLarge ? 250 : isTablet ? 170 : 230,
          renderCell: (params) => (
            <span style={{ color: "#B72020" }}>{params.value}</span>
          ),
        },
        {
          field: "promotion",
          headerName: "Promotion %",
          width: isTablet ? 150 : 100,
        },
      ];

      setRows(updatedRows);
      setColumns(updatedColumns);
    }
  }, [apiData]);

  // Set Promotion Criteria dialog open
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // set stream eligibility dialog close
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [promotionstatus, setPromotionStatus] = useState("");

  // table 2 columns
  const columns2 = [
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
              params.value === "Promoted"
                ? "#C6F6D5"
                : params.value === "Not Promoted"
                ? "#FFCCCC"
                : "transparent",
            borderRadius: "6px",
            display: "inline-block",
            width:
              params.value === "Promoted" || params.value === "Not Promoted"
                ? "100px"
                : "auto",
            paddingLeft:
              params.value === "Promoted"
                ? "19px"
                : params.value === "Not Promoted"
                ? "7px"
                : "0px",
          }}
        >
          {params.value}
        </Box>
      ),
    },
  ];

  // table 2 rows
  const rows2 = [
    {
      id: "AG240001",
      name: "Saunav Ray",
      class: "VI",
      section: "A",
      roll: "19",
      status: "Promoted",
    },
    {
      id: "AG240002",
      name: "Saunav Ray",
      class: "VI",
      section: "A",
      roll: "19",
      status: "Not Promoted",
    },
    {
      id: "AG240003",
      name: "Saunav Ray",
      class: "VI",
      section: "A",
      roll: "19",
      status: "Not Promoted",
    },
  ];

  return (
    <RevealCard>
      {/* top navigation buttons */}
      <div
        style={{
          backgroundColor: "#E5F3FB",
          display: "flex",
          padding: "10px",
          maxWidth: "720px",
          borderRadius: "10px",
        }}
      >
        <div>
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "black",
              marginRight: "10px",
              cursor: "pointer",
              borderRadius: "6px",
              padding: "7px 10px 7px 10px",
              fontSize: "16px",
              fontWeight: 400,
            }}
            onClick={() => navigate("/student/manage/edit-information/")}
          >
            Edit Information
          </button>

          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "black",
              marginRight: "10px",
              cursor: "pointer",
              borderRadius: "6px",
              padding: "7px 10px 7px 10px",
              fontSize: "16px",
              fontWeight: 400,
            }}
            onClick={() => navigate("/student/manage/student-account/")}
          >
            Student Account
          </button>

          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "black",
              marginRight: "10px",
              cursor: "pointer",
              borderRadius: "6px",
              padding: "7px 10px 7px 10px",
              fontSize: "16px",
              fontWeight: 400,
            }}
            onClick={() => navigate("/student/manage/id-card-pass/")}
          >
            Card / Pass
          </button>

          <button
            style={{
              backgroundColor: "white",
              border: "none",
              color: "black",
              cursor: "pointer",
              borderRadius: "6px",
              padding: "7px 10px 7px 10px",
              fontSize: "16px",
              fontWeight: 400,
            }}
            onClick={() => navigate("/student/manage/promotion/")}
          >
            Promotion
          </button>

          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "black",
              marginRight: "10px",
              cursor: "pointer",
              borderRadius: "6px",
              padding: "7px 10px 7px 10px",
              fontSize: "16px",
              fontWeight: 400,
            }}
            onClick={() => navigate("/student/manage/section-allotment/")}
          >
            Section Allotment
          </button>
        </div>
      </div>

      <Bbox
        mt={2}
        width={"100%"}
        height={"100%"}
        borderRadius={2}
        overflow="hidden"
      >
        {/* Divider */}
        <Divider style={{ marginTop: "2rem" }} />

        {/* Dropdown and buttons */}
        <Box ml={3} mt={4} mr={3}>
          {/* academic year dropdown */}
          <FormControl style={{ width: "280px" }}>
            <InputLabel>Academic Year</InputLabel>
            <Select
              label="Academic Year"
              value={acYear}
              onChange={(e) => setAcYear(e.target.value)}
            >
              <MenuItem value={"2024-25"}>2024-25</MenuItem>
              <MenuItem value={"2025-26"}>2025-26</MenuItem>
            </Select>
          </FormControl>

          {/* buttons */}
          <Box mt={4} display="flex" flexDirection="row">
            {/* Allocate Seat for External Admission button */}
            <Button
              variant="contained"
              onClick={() => setAllocateSeats(!allocateSeats)}
            >
              Allocate Seats for External Admission
            </Button>

            {/* Set Promotion Criteria button */}
            <Button
              variant="contained"
              style={{ marginLeft: "2rem" }}
              onClick={handleOpenDialog}
            >
              Set Promotion Criteria
            </Button>
          </Box>
        </Box>

        {/* Class - wise Distribution text box */}
        <Box
          ml={3}
          mt={4}
          mr={3}
          height={40}
          backgroundColor="#C6EDFF"
          borderRadius={"6px"}
          display="flex"
          alignItems="center"
        >
          <Typography
            style={{ fontSize: "14px", fontWeight: "500", marginLeft: "15px" }}
          >
            Class - wise Distribution
          </Typography>
        </Box>

        {/* Total number of results found */}
        <Box mt={2} mr={3} display="flex" justifyContent="flex-end">
          <Box
            style={{
              backgroundColor: "#E1EEFB",
              border: "1px solid #3381A5",
              borderRadius: "16px",
              width: 107,
              height: 25,
              padding: "3.7px 14px",
            }}
          >
            <Typography
              style={{
                fontSize: "10px",
                fontWeight: "400",
                color: "#3381A5",
              }}
            >
              {rows.length} Results found
            </Typography>
          </Box>
        </Box>

        {/* table 1 */}
        <Box m={2} height="100%">
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 20, 50]}
          />
        </Box>

        {/* Review and Download Student List buttons */}
        <Box mt={4} display="flex" justifyContent="center" flexDirection="row">
          {/* Review button */}
          <Button
            variant="contained"
            style={{ width: "12rem" }}
            onClick={() => navigate("/student/manage/promotion/review")}
          >
            Review
          </Button>

          {/* Set Promotion Criteria button */}
          <Button variant="outlined" style={{ marginLeft: "2rem" }}>
            Download Student List
          </Button>
        </Box>

        {/* Promote / Cancel Promotion - Individually text box */}
        <Box
          ml={3}
          mt={5}
          mr={3}
          height={40}
          backgroundColor="#C6EDFF"
          borderRadius={"6px"}
          display="flex"
          alignItems="center"
        >
          <Typography
            style={{ fontSize: "14px", fontWeight: "500", marginLeft: "15px" }}
          >
            Promote / Cancel Promotion - Individually
          </Typography>
        </Box>

        {/* Search area and search button */}
        <Box mt={4} ml={3}>
          {/* search area field */}
          <TextField
            variant="outlined"
            placeholder="Search by Student ID / Student Name"
            sx={{ width: isLaptop ? 400 : 500 }}
            size="small"
            // icon
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search sx={{ fontSize: "1.3rem", cursor: "pointer" }} />
                </InputAdornment>
              ),
            }}
          />

          {/* search button */}
          <Button variant="contained" style={{ marginLeft: "30px" }}>
            Search
          </Button>
        </Box>

        {/* table 2 */}
        <Box m={2} height="100%">
          <DataGrid
            rows={rows2}
            columns={columns2}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 20, 50]}
          />
        </Box>

        {/* Promote button */}
        <Box mb={5} display="flex" justifyContent="center">
          <Button
            variant="contained"
            style={{ width: "550px" }}
            disabled={selectedRow === null}
          >
            {/* {promotionstatus === 'Promoted' ? 'Cancel Promotion' : 'Promote'} */}
            Promote / Cancel Promotion
          </Button>
        </Box>
      </Bbox>

      {/* set promotion criteria dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} height={"100%"}>
        {/* dialog title */}
        <DialogTitle
          sx={{
            backgroundColor: "#2F7DA1",
            textAlign: "center",
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px",
          }}
        >
          {/* text */}
          <div style={{ flexGrow: 1 }}>Set Promotion Criteria</div>

          {/* close icon */}
          <IconButton
            aria-label="cloase"
            size="small"
            onClick={handleCloseDialog}
          >
            <Icon icon={"ep:close-bold"} color="white" fontSize={"1.3rem"} />
          </IconButton>
        </DialogTitle>

        <DialogContent style={{ marginTop: "20px" }}>
          {/* class dropdown */}
          <Box mt={4}>
            <FormControl style={{ width: "280px" }}>
              <InputLabel>Select Class</InputLabel>
              <Select
                label="Select Class"
                value={classDrop}
                onChange={(e) => setClassDrop(e.target.value)}
              >
                {classes.map((classItem) => (
                  <MenuItem key={classItem} value={classItem}>
                    {classItem}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* subjects view and Save/Cancel buttons */}
          {classDrop && (
            <>
              {/* subjects view */}
              <Box mt={4} display={"flex"} flexDirection={"column"}>
                {/* English */}
                <TextField
                  label="English"
                  variant="outlined"
                  size="small"
                  sx={{ width: "200px" }}
                  inputProps={{
                    pattern: "[0-9]*",
                    inputMode: "numeric",
                  }}
                  type="number"
                  value={englishValue}
                  onChange={(e) => setEnglishValue(e.target.value)}
                />

                {/* Bengali */}
                <TextField
                  label="Bengali"
                  variant="outlined"
                  size="small"
                  sx={{ width: "200px", marginTop: "15px" }}
                  inputProps={{
                    pattern: "[0-9]*",
                    inputMode: "numeric",
                  }}
                  type="number"
                  value={bengaliValue}
                  onChange={(e) => setBengaliValue(e.target.value)}
                />

                {/* Mathematics */}
                <TextField
                  label="Mathematics"
                  variant="outlined"
                  size="small"
                  sx={{ width: "200px", marginTop: "15px" }}
                  inputProps={{
                    pattern: "[0-9]*",
                    inputMode: "numeric",
                  }}
                  type="number"
                  value={mathematicsValue}
                  onChange={(e) => setMathematicsValue(e.target.value)}
                />

                {/* Physics */}
                <TextField
                  label="Physics"
                  variant="outlined"
                  size="small"
                  sx={{ width: "200px", marginTop: "15px" }}
                  inputProps={{
                    pattern: "[0-9]*",
                    inputMode: "numeric",
                  }}
                  type="number"
                  value={physicsValue}
                  onChange={(e) => setPhysicsValue(e.target.value)}
                />

                {/* Sports */}
                <TextField
                  label="Sports"
                  variant="outlined"
                  size="small"
                  sx={{ width: "200px", marginTop: "15px" }}
                  inputProps={{
                    pattern: "[0-9]*",
                    inputMode: "numeric",
                  }}
                  type="number"
                  value={sportsValue}
                  onChange={(e) => setSportsValue(e.target.value)}
                />
              </Box>

              {/* Save and Cancel buttons */}
              <Box display="flex" justifyContent="flex-end" mt={4}>
                {/* save button */}
                <Button variant="contained" onClick={handleCloseDialog}>
                  Save
                </Button>

                {/* cancel button */}
                <Button
                  variant="outlined"
                  onClick={handleCloseDialog}
                  style={{ marginLeft: "8px" }}
                >
                  Cancel
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={allocateSeats}
        onClose={() => setAllocateSeats(!allocateSeats)}
        maxWidth="lg"
        maxLength="lg"
      >
        <DialogTitle
          sx={{
            height: "50px",
            backgroundColor: "#a14e2c",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "900px",
          }}
        >
          <Typography
            sx={{ color: "white", fontWeight: "600", fontSize: "20px" }}
          >
            Seat Allocation for External Admission - Science
          </Typography>

          <IconButton
            onClick={() => setAllocateSeats(!allocateSeats)}
            sx={{ position: "absolute", right: "10px", color: "white" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDSirection: "row",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                height: "300px",
                backgroundColor: "#f4f4f4",
                margin: "20px",
                borderRadius: "10px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  border: "0.5px solid black",
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                  padding: "20px",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  sx={{ fontSize: "40px", fontWeight: "600", color: "#00494e" }}
                >
                  100
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#9aa0a5",
                    }}
                  >
                    Total Number of Seats
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#9aa0a5",
                    }}
                  >
                    (Science)
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  border: "0.25px solid black",
                  borderTopRightRadius: "10px",
                  borderBottomRightRadius: "10px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    paddingBottom: "20px",
                    padding: "40px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "30px",
                      fontWeight: "600",
                      color: "#00494e",
                    }}
                  >
                    12
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#9aa0a5",
                    }}
                  >
                    Seats Currently Allocated for External Admission
                  </Typography>
                </Box>
                <Divider sx={{ border: "0.25px solid black", width: "100%" }} />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "40px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "30px",
                      fontWeight: "600",
                      color: "#00494e",
                    }}
                  >
                    50
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#9aa0a5",
                    }}
                  >
                    Seats Currently Reserved for Existing Admission
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
              Number of seats to be allocated for external admission
            </Typography>
            <TextField
              label="Number of Seats"
              variant="outlined"
              size="small"
              style={{ marginLeft: "20px", width: "150px" }}
              inputProps={{
                maxLength: 3,
                pattern: "[0-9]*",
                inputMode: "numeric",
              }}
            />
            <Typography
              sx={{ fontSize: "16px", fontWeight: "600", paddingX: "10px" }}
            >
              (Max 38)
            </Typography>
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "center", padding: "20px" }}
          >
            <Button
              sx={{
                backgroundColor: "#a14e2c",
                width: "200px",
                color: "white",
              }}
            >
              Submit
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </RevealCard>
  );
};

export default <Promotion />;
