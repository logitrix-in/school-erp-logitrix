import React, { useState, useEffect } from "react";
import RevealCard from "../../../AnimationComponents/RevealCard";
import {
  Box,
  TextField,
  InputAdornment,
  Button,
  Radio,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogTitle,
  Link
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IDCard from "../../../../assets/cards/idc.png";
import IDCardBack from "../../../../assets/cards/idcb.png";
import GuardianCard from "../../../../assets/cards/gc.png";
import GuardianCardBack from "../../../../assets/cards/gcb.png";
import EventPass from "../../../../assets/cards/ep.png";
import LibraryCard from "../../../../assets/cards/lc.png";
import LibraryCardBack from "../../../../assets/cards/lcb.png";
import GuestPass from "../../../../assets/cards/gp.png";
import LocalGuardianCard from "../../../../assets/cards/lgc.png";
import LocalGuardianCardBack from "../../../../assets/cards/lgcb.png";
import { useMediaQuery } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";

const IDindividual = () => {
  // breakpoints
  const isSmall = useMediaQuery("(max-width: 1364px)");
  const isTablet = useMediaQuery("(min-width: 1365px) and (max-width: 1535px)");
  const isLaptop = useMediaQuery("(min-width: 1536px) and (max-width: 1706px)");
  const isDesktop = useMediaQuery(
    "(min-width: 1707px) and (max-width: 1919px)"
  );
  const isLarge = useMediaQuery("(min-width: 1920px)");
  const isXlarge = useMediaQuery("(min-width: 2560px)");

  const [selectedValue, setSelectedValue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [selectedRow, setSelecetedRow] = useState(null);
  const [filter, setFilter] = useState({
    start_date: "",
    end_date: "",
  });

  const handleStartTimeChange = (time) => {
    setStartTime(time);
  };

  useEffect(() => {
    if (endDate == "") setEndDate(startDate);

    const _filter = {
      start_date: startDate && new Date(startDate).toLocaleDateString("en-CA"),
      end_date: endDate && new Date(endDate).toLocaleDateString("en-CA"),
    };
    setFilter(_filter);
  }, [startDate, endDate]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
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
      toast.success(`Successfully ${selectedValue.toLowerCase()} issued`, {
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error while displaying toast:", error);
    }
    setShowPrompt(false);
  };

  // table columns
  const columns = [
    {
      field: "radioButtons",
      headerName: "",
      width: 50,
      renderCell: (params) => (
        <Radio
          checked={params.row.id === selectedRow}
          color="primary"
          sx={{
            transform: "scale(0.6)",
          }}
          inputProps={{ "aria-label": params.row.id }}
          onChange={() => {
            setSelecetedRow(params.row.id);
          }}
        />
      ),
    },
    { field: "space", headerName: "", width: isLarge ? 80 : 50 },
    { field: "id", headerName: "Student ID", flex: 1,
      renderCell: (params) => (
        <Link underline="hover" color="primary">
          {params.value}
        </Link>
      ),
     },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "class", headerName: "Class", flex: 1 },
    { field: "section", headerName: "Section", flex: 1 },
    { field: "roll", headerName: "Roll #", flex: 1 },
    { field: "date", headerName: "Last Issue Date", flex: 1 },
  ];

  // table rows
  const rows = [
    {
      id: "AG240001",
      class: "VI",
      name: "Saunav Ray",
      section: "A",
      roll: 23,
      date: "20-Sep-2023",
    },
    {
      id: "AG240002",
      class: "VI",
      name: "Saunav Ray",
      section: "A",
      roll: 23,
      date: "20-Sep-2023",
    },
    {
      id: "AG240003",
      class: "VI",
      name: "Saunav Ray",
      section: "A",
      roll: 23,
      date: "20-Sep-2023",
    },
  ];

  const [flip, setFlip] = useState(false);

  return (
    <RevealCard>
      <ToastContainer />

      {/* Dropdown */}
      <Box width={"500px"} mt={3} ml={3}>
        <Select
          value={selectedValue}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          displayEmpty
        >
          <MenuItem value="" disabled>
            Card Selection
          </MenuItem>
          <MenuItem value={"ID Card"}>ID Card</MenuItem>
          <MenuItem value={"Parent's Card"}>Parent's Card</MenuItem>
          <MenuItem value={"Local Guardian's Card"}>
            Local Guardian's Card
          </MenuItem>
          <MenuItem value={"Library Card"}>Library Card</MenuItem>
          <MenuItem value={"Event Pass"}>Event Pass</MenuItem>
          <MenuItem value={"Guest Pass"}>Guest Pass</MenuItem>
        </Select>
      </Box>

      {/* Render context based on selected dropdown value */}
      {selectedValue === "Guest Pass" ? (
        /* Guest Pass context */
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "24px",
            marginTop: "20px",
          }}
        >
          {/* guest name input */}
          <TextField
            variant="outlined"
            placeholder="Enter Guest Name"
            size="small"
            sx={{
              width: "400px",
              height: "48px",
              mt: 2,
            }}
            InputProps={{
              style: {
                fontSize: "14px",
                fontWeight: 500,
                color: "#9F9898",
              },
            }}
          />

          {/* event name input */}
          <TextField
            variant="outlined"
            placeholder="Enter Event Name"
            size="small"
            sx={{
              width: "400px",
              height: "48px",
              mt: 1,
            }}
            InputProps={{
              style: {
                fontSize: "14px",
                fontWeight: 500,
                color: "#9F9898",
              },
            }}
          />

          {/* venue input */}
          <TextField
            variant="outlined"
            placeholder="Enter Venue"
            size="small"
            sx={{
              width: "400px",
              height: "48px",
              mt: 1,
            }}
            InputProps={{
              style: {
                fontSize: "14px",
                fontWeight: 500,
                color: "#9F9898",
              },
            }}
          />

          {/* Event Date input */}
          <Box display={"flex"} gap={2} width="400px">
            <DatePicker
              label="Start Date"
              onChange={(e) => setStartDate(e)}
              format="DD MMM YYYY"
            />
            <DatePicker
              format="DD MMM YYYY"
              label="End Date"
              minDate={startDate}
              onChange={(e) => setEndDate(e)}
            />
          </Box>

          {/* Event Start Time input */}
          <TimePicker
            onChange={handleStartTimeChange}
            value={startTime}
            label="Select Start Time"
            sx={{
              width: "400px",
              height: "48px",
              mt: 2,
            }}
          />

          {/* Buttons */}
          <Box
            display="flex"
            justifyContent="flex-end"
            marginRight={1.6}
            marginBottom={5}
          >
            {/* Issue button */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#C4673B",
                "&:hover": {
                  backgroundColor: "#A14E2C",
                  color: "white",
                },
              }}
              onClick={handleOpenPrompt}
            >
              Issue
            </Button>

            {/* Print button */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#C4673B",
                "&:hover": {
                  backgroundColor: "#A14E2C",
                  color: "white",
                },
                marginLeft: "20px",
              }}
            >
              Print
            </Button>
          </Box>

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
              Are you sure you want to issue guest pass?
            </DialogTitle>

            {/* guest pass preview */}
            <Box>
              <img
                src={GuestPass}
                alt="ID Card"
                style={{
                  width: "420px",
                  height: "220px",
                  display: "block",
                  margin: "3rem",
                }}
              />
            </Box>

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
        </Box>
      ) : (
        // Other options context
        <Box>
          {/* Search input area and search button */}
          <Box ml={3} mt={3}>
            {/* Search input area */}
            <TextField
              variant="outlined"
              placeholder="Search by Student ID / Student Name"
              size="small"
              sx={{ width: 400 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Search sx={{ fontSize: "1.3rem", cursor: "pointer" }} />
                  </InputAdornment>
                ),
              }}
            />

          </Box>

          {/* Table */}
          <Box m={2} mt={4} height="100%">
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10, 20, 50]}
              // checkboxSelection
            />
          </Box>

          {/* Buttons */}
          <Box
            display="flex"
            justifyContent="flex-end"
            marginRight={1.6}
            marginBottom={5}
          >
            {/* Issue button */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#C4673B",
                "&:hover": {
                  backgroundColor: "#A14E2C",
                  color: "white",
                },
              }}
              onClick={handleOpenPrompt}
            >
              Issue
            </Button>

            {/* Print button */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#C4673B",
                "&:hover": {
                  backgroundColor: "#A14E2C",
                  color: "white",
                },
                marginLeft: "20px",
              }}
            >
              Print
            </Button>
          </Box>

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
              Are you sure you want to issue {selectedValue.toLowerCase()}?
            </DialogTitle>

            {/* Conditional rendering of card previews */}
            <Box>
              {/* id card */}
              {selectedValue === "ID Card" && (
                <Box
                  onClick={() => {
                    setFlip(!flip);
                  }}
                >
                  {!flip ? (
                    <img
                      src={IDCard}
                      alt="ID Card"
                      style={{
                        width: "420px",
                        height: "220px",
                        display: "block",
                        margin: "3rem",
                      }}
                    />
                  ) : (
                    <img
                      src={IDCardBack}
                      alt="ID Card Back"
                      style={{
                        width: "420px",
                        height: "220px",
                        display: "block",
                        margin: "3rem",
                      }}
                    />
                  )}
                </Box>
              )}
              {/* parent's card */}
              {selectedValue === "Parent's Card" && (
                <Box
                  onClick={() => {
                    setFlip(!flip);
                  }}
                >
                  {!flip ? (
                    <img
                      src={GuardianCard}
                      alt="Guardian Card"
                      style={{
                        width: "420px",
                        height: "220px",
                        display: "block",
                        margin: "3rem",
                      }}
                    />
                  ) : (
                    <img
                      src={GuardianCardBack}
                      alt="Guardian Card Back"
                      style={{
                        width: "420px",
                        height: "220px",
                        display: "block",
                        margin: "3rem",
                      }}
                    />
                  )}
                </Box>
              )}
              {/* guardian's card */}
              {selectedValue === "Local Guardian's Card" && (
                <Box
                  onClick={() => {
                    setFlip(!flip);
                  }}
                >
                  {!flip ? (
                    <img
                      src={LocalGuardianCard}
                      alt="Local Guardian Card"
                      style={{
                        width: "420px",
                        height: "220px",
                        display: "block",
                        margin: "3rem",
                      }}
                    />
                  ) : (
                    <img
                      src={LocalGuardianCardBack}
                      alt="Local Guardian Card Back"
                      style={{
                        width: "420px",
                        height: "220px",
                        display: "block",
                        margin: "3rem",
                      }}
                    />
                  )}
                </Box>
              )}
              {/* library card */}
              {selectedValue === "Library Card" && (
                <Box
                  onClick={() => {
                    setFlip(!flip);
                  }}
                  sx={{height: "500px"}}
                >
                  {!flip ? (
                    <img
                      src={LibraryCard}
                      alt="Library Card"
                      style={{
                        width: "400px",
                        height: "450px",
                        display: "block",
                        margin: "3rem",
                      }}
                    />
                  ) : (
                    <img
                      src={LibraryCardBack}
                      alt="Library Card Back"
                      style={{
                        width: "400px",
                        height: "450px",
                        display: "block",
                        margin: "3rem",
                      }}
                    />
                  )}
                </Box>
              )}
              {/* event pass */}
              {selectedValue === "Event Pass" && (
                <img
                  src={EventPass}
                  alt="ID Card"
                  style={{
                    width: "420px",
                    height: "220px",
                    display: "block",
                    margin: "3rem",
                  }}
                />
              )}
            </Box>

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
        </Box>
      )}
    </RevealCard>
  );
};

export default IDindividual;
