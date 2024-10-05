import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useMediaQuery } from "@material-ui/core";
import useClasses from "../../../hooks/useClasses";
import { DatePicker } from "@mui/x-date-pickers";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const ActionBulk = () => {
  // breakpoints
  const isSmall = useMediaQuery("(max-width: 1395px)");
  const isTablet = useMediaQuery("(min-width: 1396px) and (max-width: 1535px)");
  const isLaptop = useMediaQuery("(min-width: 1536px) and (max-width: 1706px)");
  const isDesktop = useMediaQuery(
    "(min-width: 1707px) and (max-width: 1919px)"
  );
  const isLarge = useMediaQuery("(min-width: 1920px)");
  const isXlarge = useMediaQuery("(min-width: 2560px)");

  const navigateTo = useNavigate();

  // dropdowns states and variables
  const [filter, setFilter] = useState({});

  const { classes, sections, roll, nonCompliance } = useClasses();
  console.log(classes, sections, roll, nonCompliance);

  const curYear = new Date().getFullYear();

  const academicYear = `${curYear}-${(curYear + 1).toString().slice(2, 4)}`;

  const [acYear, setAcYear] = useState(academicYear);
  const [curClass, setClass] = useState([]);
  const [curSection, setSection] = useState([]);
  const [curRoll, setRoll] = useState([]);
  const [compliance, setCompliance] = useState([]);
  const [compliance2, setCompliance2] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startDate2, setStartDate2] = useState("");
  const [endDate2, setEndDate2] = useState("");
  const [type, setType] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  // table and checkbox states
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);

  // Proceed button click handle
  const handleProceed = () => {
    navigateTo("/student/action/bulk-initiate");
  };

  // context useEffect
  useEffect(() => {
    const _filter = {
      academic_year: acYear,
      class: curClass,
      section: curSection,
      curRoll: curRoll,
      nonCompliance: compliance,
      type: type,
    };
    setFilter(_filter);
  }, [curSection, curRoll, acYear, curClass, compliance, type]);

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

  // handle Roll dropdown change
  const handleRollChange = (e) => {
    const {
      target: { value },
    } = e;

    // Check if "all" is selected
    if (value.includes("all")) {
      // If "all" is selected and all Rolles are already selected, deselect all
      if (curRoll.length === roll.length) {
        setRoll([]);
      } else {
        // If "all" is selected and not all Rolles are selected, select all
        setRoll(roll);
      }
      return;
    }

    // Set the selected Rolles
    setRoll(value);
  };

  // handle non-compliance dropdown change
  const handleComplianceChange = (e) => {
    const {
      target: { value },
    } = e;
    setCompliance(
      value.includes("all")
        ? compliance.length === nonCompliance.length
          ? []
          : nonCompliance
        : value
    );
  };

  // handle non-compliance dropdown change
  const handleComplianceChange2 = (e) => {
    const {
      target: { value },
    } = e;
    setCompliance2(
      value.includes("all")
        ? compliance2.length === nonCompliance.length
          ? []
          : nonCompliance
        : value
    );
  };

  // handle dialog open/close
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  // table columns
  const columns = [
    { field: "space", headerName: "", width: 50 },
    {
      field: "id",
      headerName: "Student ID",
      width: isLaptop ? 120 : isLarge ? 160 : 140,
    },
    {
      field: "name",
      headerName: "Name",
      width: isLaptop ? 120 : isLarge ? 160 : 120,
    },
    {
      field: "class",
      headerName: "Class",
      width: isLaptop ? 80 : isLarge ? 120 : 110,
    },
    {
      field: "section",
      headerName: "Section",
      width: isLaptop ? 100 : isLarge ? 140 : 120,
    },
    {
      field: "roll",
      headerName: "Roll #",
      width: isLaptop ? 90 : isLarge ? 130 : 110,
    },
    {
      field: "status",
      headerName: "Status",
      width: isLaptop ? 110 : isLarge ? 150 : 110,
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
    {
      field: "period",
      headerName: "Period",
      width: isLaptop ? 100 : isLarge ? 140 : 110,
    },
    {
      field: "date",
      headerName: "Date",
      width: isLaptop ? 130 : isLarge ? 170 : 130,
    },
    { field: "amount", headerName: "Amount", width: isLaptop ? 100 : 120 },
    {
      field: "edit",
      headerName: "",
      width: 120,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#C4673B",
              "&:hover": { backgroundColor: "#A14E2C" },
            }}
          >
            Edit
          </Button>
        </Box>
      ),
    },
  ];

  // table rows
  const rows = [
    {
      id: "AG240001",
      name: "Saunav Ray",
      class: "VI",
      section: "A",
      roll: "19",
      status: "Active",
      period: "N/A",
      date: "20-Sep-2023",
      amount: "₹50",
    },
    {
      id: "AG240002",
      name: "Saunav Ray",
      class: "VI",
      section: "A",
      roll: "19",
      status: "Active",
      period: "N/A",
      date: "20-Sep-2023",
      amount: "₹50",
    },
    {
      id: "AG240003",
      name: "Saunav Ray",
      class: "VI",
      section: "A",
      roll: "19",
      status: "Inactive",
      period: "N/A",
      date: "20-Sep-2023",
      amount: "₹50",
    },
    {
      id: "AG240004",
      name: "Saunav Ray",
      class: "VI",
      section: "A",
      roll: "19",
      status: "Active",
      period: "N/A",
      date: "20-Sep-2023",
      amount: "₹50",
    },
    {
      id: "AG240005",
      name: "Saunav Ray",
      class: "VI",
      section: "A",
      roll: "19",
      status: "Active",
      period: "N/A",
      date: "20-Sep-2023",
      amount: "₹50",
    },
    {
      id: "AG240006",
      name: "Saunav Ray",
      class: "VI",
      section: "A",
      roll: "19",
      status: "Inactive",
      period: "N/A",
      date: "20-Sep-2023",
      amount: "₹50",
    },
    {
      id: "AG240007",
      name: "Saunav Ray",
      class: "VI",
      section: "A",
      roll: "19",
      status: "Active",
      period: "N/A",
      date: "20-Sep-2023",
      amount: "₹50",
    },
    {
      id: "AG240008",
      name: "Saunav Ray",
      class: "VI",
      section: "A",
      roll: "19",
      status: "Active",
      period: "N/A",
      date: "20-Sep-2023",
      amount: "₹50",
    },
    {
      id: "AG240009",
      name: "Saunav Ray",
      class: "VI",
      section: "A",
      roll: "19",
      status: "Active",
      period: "N/A",
      date: "20-Sep-2023",
      amount: "₹50",
    },
  ];

  return (
    <Box>
      {/* input section */}
      <Box display="flex" flexDirection="row" gap={4}>
        {/* Left drop-down section */}
        <Box
          borderRadius={1}
          paddingLeft={2}
          paddingRight={2}
          flex={0}
          py={4}
          display="flex"
          flexDirection="column"
          gap="1.6rem"
        >
          {/* academic year dropdown */}
          <FormControl style={{ width: "15rem" }}>
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
          <FormControl style={{ width: "15rem" }}>
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
                selected.length == classes.length ? "All" : selected.join(", ")
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
          <FormControl style={{ width: "15rem" }}>
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

          {/* Roll dropdown */}
          <FormControl style={{ width: "15rem" }}>
            <InputLabel>Roll</InputLabel>
            <Select
              placeholder="All"
              multiple
              value={curRoll}
              onChange={handleRollChange}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300,
                  },
                },
              }}
              input={<OutlinedInput label="Roll" />}
              renderValue={(selected) =>
                selected.length === roll.length ? "All" : selected.join(", ")
              }
            >
              {/* Select All option */}
              <MenuItem value="all">
                <ListItemIcon>
                  <Checkbox
                    checked={curRoll.length === roll.length}
                    indeterminate={
                      curRoll.length > 0 && curRoll.length < roll.length
                    }
                  />
                </ListItemIcon>
                <ListItemText primary="Select All" />
              </MenuItem>
              {/* Roll options */}
              {roll.map((RollOption) => (
                <MenuItem key={RollOption} value={RollOption}>
                  <Checkbox
                    size="small"
                    checked={curRoll.indexOf(RollOption) > -1}
                  />
                  <ListItemText primary={RollOption} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* right input section */}
        <Box
          borderRadius={1}
          paddingLeft={2}
          paddingRight={2}
          flex={0}
          py={4}
          display="flex"
          flexDirection="column"
          gap="1.6rem"
        >
          {/* Warning Slip Issuance Period Date input */}
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

          {/* Suspension Period */}
          <Box display={"flex"} gap={2} width="400px">
            <DatePicker
              label="Start Date"
              onChange={(e) => setStartDate2(e)}
              format="DD MMM YYYY"
            />
            <DatePicker
              format="DD MMM YYYY"
              label="End Date"
              minDate={startDate2}
              onChange={(e) => setEndDate2(e)}
            />
          </Box>

          {/* Penalty Due Amount ≥ */}
          <TextField
            label="Penalty Due Amount ≥"
            placeholder="Penalty Due Amount ≥"
            variant="outlined"
          />

          {/* non-compliance dropdown */}
          <FormControl>
            <InputLabel>Non-Compliance Type</InputLabel>
            <Select
              placeholder="All"
              multiple
              value={compliance}
              onChange={handleComplianceChange}
              MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
              input={<OutlinedInput label="Non-Compliance Type" />}
              renderValue={(selected) =>
                selected.length === nonCompliance.length
                  ? "All"
                  : selected.join(", ")
              }
            >
              <MenuItem value="all">
                <ListItemIcon>
                  <Checkbox
                    checked={compliance.length === nonCompliance.length}
                    indeterminate={
                      compliance.length > 0 &&
                      compliance.length < nonCompliance.length
                    }
                  />
                </ListItemIcon>
                <ListItemText primary="Select All" />
              </MenuItem>
              {nonCompliance.map((nonComplianceNumber) => (
                <MenuItem key={nonComplianceNumber} value={nonComplianceNumber}>
                  <Checkbox
                    size="small"
                    checked={compliance.indexOf(nonComplianceNumber) > -1}
                  />
                  <ListItemText primary={nonComplianceNumber} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Submit button */}
      <Box display="flex" justifyContent="center">
        <Button
          variant="contained"
          style={{ width: "734px" }}
          onClick={handleDialogOpen}
        >
          Submit
        </Button>
      </Box>

      {/* Total number of results found */}
      <Box style={{ display: "flex", justifyContent: "flex-end" }}>
        <Box
          mt={8}
          mr={3}
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

      {/* Table */}
      <Box m={2} style={{ height: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </Box>

      {/* Download Student List button  */}
      <Box display="flex" justifyContent="flex-end" mr={3}>
        <Button variant="outlined">Download Student List</Button>
      </Box>

      {/* Non-compliance type dropdown */}
      <Box mt={4} ml={3}>
        <FormControl style={{ width: "20rem" }}>
          <InputLabel>Non-Compliance Type</InputLabel>
          <Select
            placeholder="All"
            multiple
            value={compliance2}
            onChange={handleComplianceChange2}
            MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
            input={<OutlinedInput label="Non-Compliance Type" />}
            renderValue={(selected) =>
              selected.length === nonCompliance.length
                ? "All"
                : selected.join(", ")
            }
          >
            <MenuItem value="all">
              <ListItemIcon>
                <Checkbox
                  checked={compliance2.length === nonCompliance.length}
                  indeterminate={
                    compliance2.length > 0 &&
                    compliance2.length < nonCompliance.length
                  }
                />
              </ListItemIcon>
              <ListItemText primary="Select All" />
            </MenuItem>
            {nonCompliance.map((nonComplianceNumber) => (
              <MenuItem key={nonComplianceNumber} value={nonComplianceNumber}>
                <Checkbox
                  size="small"
                  checked={compliance2.indexOf(nonComplianceNumber) > -1}
                />
                <ListItemText primary={nonComplianceNumber} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Action Tray */}
      <Box mt={5} ml={3}>
        {/* suspend */}
        <Box display={"flex"}>
          {/* checkbox */}
          <Checkbox
            checked={isChecked}
            onChange={(event) => setIsChecked(event.target.checked)}
            color="primary"
            style={{ fontSize: 16 }}
          />

          {/* suspend text */}
          <Box
            sx={{
              width: "6rem",
              height: "1.5rem",
              background: "#C4673B",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "9px",
            }}
          >
            <Typography
              style={{ fontSize: "16px", fontWeight: "500", color: "white" }}
            >
              Suspend
            </Typography>
          </Box>
        </Box>

        {/* impose penalty */}
        <Box display={"flex"}>
          {/* checkbox */}
          <Checkbox
            checked={isChecked2}
            onChange={(event) => setIsChecked2(event.target.checked)}
            color="primary"
            style={{ fontSize: 16 }}
          />

          {/* impose penalty text */}
          <Box
            sx={{
              width: "9rem",
              height: "1.5rem",
              background: "#C4673B",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <Typography
              style={{ fontSize: "16px", fontWeight: "500", color: "white" }}
            >
              Impose Penalty
            </Typography>
          </Box>
        </Box>

        {/* issue warning slip */}
        <Box display={"flex"}>
          {/* checkbox */}
          <Checkbox
            checked={isChecked3}
            onChange={(event) => setIsChecked3(event.target.checked)}
            color="primary"
            style={{ fontSize: 16 }}
          />

          {/* issue warning slip text */}
          <Box
            sx={{
              width: "11rem",
              height: "1.5rem",
              background: "#C4673B",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <Typography
              style={{ fontSize: "16px", fontWeight: "500", color: "white" }}
            >
              Issue Warning Slip
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Proceed button */}
      <Box mt={4} mb={7} display="flex" justifyContent="center">
        <Button
          variant="contained"
          sx={{ width: "766px" }}
          onClick={handleProceed}
        >
          Proceed
        </Button>
      </Box>

      {/* Submit Button Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            backgroundColor: "#2F7DA1",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>Manage Strength Allocation</Box>

          <IconButton onClick={handleDialogClose} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Typography>
            {/* Table */}
            <Box m={1} mt={5} style={{ height: "100%" }}>
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
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ActionBulk;
