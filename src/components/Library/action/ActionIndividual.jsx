import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  Typography,
  Radio,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  Link,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useMediaQuery } from "@material-ui/core";
import useClasses from "../../../hooks/useClasses";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

const ActionIndividual = () => {
  // breakpoints
  const isSmall = useMediaQuery("(max-width: 1364px)");
  const isTablet = useMediaQuery("(min-width: 1365px) and (max-width: 1535px)");
  const isLaptop = useMediaQuery("(min-width: 1536px) and (max-width: 1706px)");
  const isDesktop = useMediaQuery(
    "(min-width: 1707px) and (max-width: 1919px)"
  );
  const isLarge = useMediaQuery("(min-width: 1920px)");
  const isXlarge = useMediaQuery("(min-width: 2560px)");

  const { nonCompliance } = useClasses();
  const navigateTo = useNavigate();

  // States
  const [isEditButtonActive, setIsEditButtonActive] = useState(null);
  const [filter, setFilter] = useState({});
  const [compliance, setCompliance] = useState([]);
  const [type, setType] = useState("all");
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  // context useEffect
  useEffect(() => {
    const _filter = {
      nonCompliance: compliance,
      type: type,
    };
    setFilter(_filter);
  }, [compliance, type]);

  // Proceed button click handle
  const handleProceed = () => {
    if (isChecked || isChecked2 || isChecked3) {
      navigateTo("/student/action/action-tray");
      // navigateTo("/student/action/individual-initiate");
    } else {
      alert("Please select at least one action from the Action Tray.");
    }
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

  // table columns
  const columns = [
    {
      field: "radioButtons",
      headerName: "",
      width: isLaptop ? 50 : isSmall ? 40 : isTablet ? 50 : 70,
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
            setIsEditButtonActive(params.row.id);
          }}
        />
      ),
    },
    { field: "space", headerName: "", width: 50 },
    {
      field: "id",
      headerName: "Student ID",
      width: isLaptop
        ? 100
        : isLarge
        ? 140
        : isTablet
        ? 140
        : isSmall
        ? 90
        : 120,

      renderCell: (params) => (
        <Link underline="hover" color="primary">
          {params.value}
        </Link>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      width: isLaptop
        ? 120
        : isLarge
        ? 160
        : isTablet
        ? 120
        : isSmall
        ? 100
        : 140,
    },
    {
      field: "class",
      headerName: "Class",
      width: isLaptop ? 50 : isLarge ? 90 : isTablet ? 110 : isSmall ? 60 : 70,
    },
    {
      field: "section",
      headerName: "Section",
      width: isLaptop
        ? 70
        : isLarge
        ? 110
        : isTablet
        ? 120
        : isSmall
        ? 70
        : 100,
    },
    {
      field: "roll",
      headerName: "Roll #",
      width: isLaptop ? 70 : isLarge ? 110 : isTablet ? 110 : isSmall ? 70 : 90,
    },
    {
      field: "status",
      headerName: "Status",
      width: isLaptop
        ? 100
        : isLarge
        ? 140
        : isTablet
        ? 130
        : isSmall
        ? 110
        : 120,
      renderCell: (params) => (
        <Box
          style={{
            backgroundColor:
              params.value === "Active"
                ? "#C6F6D5"
                : params.value === "Suspended"
                ? "#FFCCCC"
                : "transparent",
            borderRadius: "6px",
            display: "inline-block",
            width:
              params.value === "Active" || params.value === "Suspended"
                ? "auto"
                : "auto",
            paddingLeft:
              params.value === "Active"
                ? "7px"
                : params.value === "Suspended"
                ? "7px"
                : "0px",
            paddingRight:
              params.value === "Active"
                ? "7px"
                : params.value === "Suspended"
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
      headerName: "Last Suspension Period",
      width: isLaptop
        ? 170
        : isLarge
        ? 210
        : isTablet
        ? 220
        : isSmall
        ? 170
        : 190,
    },
    {
      field: "date",
      headerName: "Last Warning Slip Issue Date",
      width: isLaptop
        ? 190
        : isLarge
        ? 230
        : isTablet
        ? 250
        : isSmall
        ? 200
        : 210,
    },
    {
      field: "amount",
      headerName: "Due amount",
      width: isLarge ? 120 : isTablet ? 150 : 90,
    },
    {
      field: "edit",
      headerName: "",
      width: 90,
      renderCell: (params) => (
        <Box>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor:
                isEditButtonActive === params.row.id ? "#C4673B" : "#ccc",
              "&:hover": {
                backgroundColor:
                  isEditButtonActive === params.row.id ? "#A14E2C" : "#ccc",
              },
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
      class: "VI",
      name: "Saunav Ray",
      section: "A",
      roll: 23,
      status: "Active",
      period: "N/A",
      date: "20-Sep-2023",
      amount: "Nil",
    },
    {
      id: "AG240002",
      class: "VI",
      name: "Saunav Ray",
      section: "A",
      roll: 23,
      status: "Active",
      period: "N/A",
      date: "20-Sep-2023",
      amount: "Nil",
    },
    {
      id: "AG240003",
      class: "VI",
      name: "Saunav Ray",
      section: "A",
      roll: 23,
      status: "Suspended",
      period: "N/A",
      date: "20-Sep-2023",
      amount: "Nil",
    },
  ];

  return (
    <Box ml={2} mr={2}>
      {/* Search area and search button */}
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        mt={1}
        height={70}
        width={"100%"}
      >
        {/* Search input area */}
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

        {/* Search button */}
        <Button variant="contained" sx={{ marginLeft: "20px" }}>
          Search
        </Button>
      </Box>

      {/* Table */}
      <Box mt={2} mb={5} style={{ height: "100%" }}>
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

      {/* Non-compliance type dropdown */}
      <Box mt={4}>
        <FormControl style={{ width: "20rem" }}>
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

      {/* Action Tray */}
      <Box mt={5}>
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
          disabled={!isEditButtonActive}
        >
          Proceed
        </Button>
      </Box>
    </Box>
  );
};

export default ActionIndividual;
