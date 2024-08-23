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
  IconButton,
} from "@mui/material";
import { CheckBox, Search } from "@mui/icons-material";
import { useMediaQuery } from "@material-ui/core";
import useClasses from "../../../hooks/useClasses";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { DatePicker } from "@mui/x-date-pickers";
import DeleteIcon from "@mui/icons-material/Delete";
import RevealCard from "@/components/AnimationComponents/RevealCard";
import ReignsSelect from "@/components/UiComponents/ReignsSelect";

const RaiseIncident = () => {
  // breakpoints
  const isSmall = useMediaQuery("(max-width: 1364px)");
  const isTablet = useMediaQuery("(min-width: 1365px) and (max-width: 1535px)");
  const isLaptop = useMediaQuery("(min-width: 1536px) and (max-width: 1706px)");
  const isDesktop = useMediaQuery(
    "(min-width: 1707px) and (max-width: 1919px)"
  );
  const isLarge = useMediaQuery("(min-width: 1920px)");
  const isXlarge = useMediaQuery("(min-width: 2560px)");

  const { classes, sections, roll } = useClasses();

  const { nonCompliance } = useClasses();

  const navigate = useNavigate();

  const [compliance, setCompliance] = useState([]);
  const [isChecked, setIsChecked] = useState(true);
  const [modeSwitch, setModeSwitch] = useState(true);

  const handleProceed = () => {
    return <ActionSuspend />;
  };

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

  const columns1 = [
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
    },
    { field: "space", headerName: "", width: 50 },
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
      field: "amount",
      headerName: "Penalty Due Amount",
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
      field: "incidentid",
      headerName: "Incident ID",
      width: isLarge ? 120 : isTablet ? 150 : 90,
      renderCell: (params) => (
        <Box
          style={{
            backgroundColor: "#e8def8",
            borderRadius: "6px",
            display: "inline-block",
            width: "auto",
            paddingLeft: "7px",
            paddingRight: "7px",
          }}
        >
          {params.value}
        </Box>
      ),
    },
  ];

  const rows1 = [
    {
      id: "AG240001",
      class: "VI",
      name: "Saunav Ray",
      section: "A",
      roll: 23,
      status: "Active",
      period: "N/A",
      amount: "Nil",
      incidentid: "#112233",
    },
    {
      id: "AG240002",
      class: "VI",
      name: "Saunav Ray",
      section: "A",
      roll: 23,
      status: "Active",
      period: "N/A",
      amount: "Nil",
      incidentid: "#112233",
    },
    {
      id: "AG240003",
      class: "VI",
      name: "Saunav Ray",
      section: "A",
      roll: 23,
      status: "Suspended",
      period: "N/A",
      amount: "Nil",
      incidentid: "#112233",
    },
  ];

  const [checkboxState, setCheckboxState] = useState({});

  const handleCheckboxChange = (id, field) => {
    setCheckboxState((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [field]: !prevState[id]?.[field],
      },
    }));
  };

  const handleSelectAll = (field, checked) => {
    const newState = {};
    rows2.forEach((row) => {
      newState[row.id] = { ...checkboxState[row.id], [field]: checked };
    });
    setCheckboxState(newState);
  };

  const columns2 = [
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
    },
    { field: "space", headerName: "", width: 50 },
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
    {field: "space", headerName: "", width: 50},
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
    {field: "space", headerName: "", width: 50},

    {
      field: "roll",
      headerName: "Roll #",
      width: isLaptop ? 70 : isLarge ? 110 : isTablet ? 110 : isSmall ? 70 : 90,
    },
    {field: "space", headerName: "", width: 50},
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
      field: 'suspend',
      headerName: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox
            checked={Object.values(checkboxState).every((row) => row?.suspend)}
            onChange={(e) => handleSelectAll('suspend', e.target.checked)}
          />
          Suspend
        </div>
      ),
      width: 150,
      renderCell: (params) => (
        <Checkbox
          checked={checkboxState[params.row.id]?.suspend || false}
          onChange={() => handleCheckboxChange(params.row.id, 'suspend')}
        />
      ),
    },
    {
      field: 'penalty',
      headerName: (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox
            checked={Object.values(checkboxState).every((row) => row?.penalty)}
            onChange={(e) => handleSelectAll('penalty', e.target.checked)}
          />
          Impose Penalty
        </div>
      ),
      width: 150,
      renderCell: (params) => (
        <Checkbox
          checked={checkboxState[params.row.id]?.penalty || false}
          onChange={() => handleCheckboxChange(params.row.id, 'penalty')}
        />
      ),
    },
    { field: "space", headerName: "", width: 50 },
    {
      field: "delete",
      headerName: "",
      width: 100,
      renderCell: (params) => (
        <IconButton>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  const rows2 = [
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
      status: "Active",
    },
    {
      id: "AG240003",
      class: "VI",
      name: "Saunav Ray",
      section: "A",
      roll: 23,
      status: "Suspended",
    },
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
      status: "Active",
    },
    {
      id: "AG240003",
      class: "VI",
      name: "Saunav Ray",
      section: "A",
      roll: 23,
      status: "Suspended",
    },
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
      status: "Active",
    },
    {
      id: "AG240003",
      class: "VI",
      name: "Saunav Ray",
      section: "A",
      roll: 23,
      status: "Suspended",
    },
  ];

  const columns3 = [
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
    { field: "suspension", headerName: "Last Suspension Period", flex: 1 },
    { field: "penalty", headerName: "Penalty Due Amount", flex: 1 },
  ];

  const rows3 = [
    {
      id: "AG240001",
      class: "VI",
      name: "Saunav Ray",
      section: "A",
      roll: 23,
      status: "Active",
      suspension: "N/A",
      penalty: "Nil",
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
    {
      id: "AG240004",
      class: "VI",
      name: "Saunav Ray",
      section: "A",
      roll: 23,
      status: "Active",
    },
    {
      id: "AG240005",
      class: "VI",
      name: "Saunav Ray",
      section: "A",
      roll: 23,
      status: "Inactive",
    },
    {
      id: "AG240006",
      class: "VI",
      name: "Saunav Ray",
      section: "A",
      roll: 23,
      status: "Active",
    },
    {
      id: "AG240007",
      class: "VI",
      name: "Saunav Ray",
      section: "A",
      roll: 23,
      status: "Active",
    },
    {
      id: "AG240008",
      class: "VI",
      name: "Saunav Ray",
      section: "A",
      roll: 23,
      status: "Inactive",
    },
    {
      id: "AG240009",
      class: "VI",
      name: "Saunav Ray",
      section: "A",
      roll: 23,
      status: "Inactive",
    },
  ];

  return (
    <RevealCard>
      <Box ml={2} mr={2}>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          mt={1}
          height={70}
          width={"100%"}
        >
          {modeSwitch ? (
            <Box display="flex" alignItems="center">
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

              <Button variant="contained" sx={{ marginLeft: "20px" }}>
                Search
              </Button>
            </Box>
          ) : (
            <Box display={"flex"}>
              <ReignsSelect
                items={classes}
                multiple
                label="Class"
                sx={{ width: "15rem", marginRight: "2rem" }}
              />
              <ReignsSelect
                items={sections}
                multiple
                label="Section"
                sx={{ width: "15rem", marginRight: "2rem" }}
              />
              <ReignsSelect
                items={roll}
                multiple
                label="Roll#"
                sx={{ width: "15rem", marginRight: "2rem" }}
              />
            </Box>
          )}

          <Box flex={1} />

          {modeSwitch ? (
            <Button
              variant="contained"
              sx={{ marginLeft: "20px" }}
              onClick={() => {
                setModeSwitch(!modeSwitch);
              }}
            >
              Switch to Bulk
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{ marginLeft: "20px" }}
              onClick={() => {
                setModeSwitch(!modeSwitch);
              }}
            >
              Switch to Individual
            </Button>
          )}
        </Box>

        <Box mt={2} mb={5} style={{ height: "100%" }}>
          {modeSwitch ? (
            <DataGrid
              rows={rows1}
              columns={columns1}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
            />
          ) : (
            <DataGrid
              rows={rows3}
              columns={columns3}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          )}
        </Box>

        <Box display={"flex"} justifyContent={"center"}>
          <Box flex={1} />

          <Button variant="contained">Add to Incident Bucket</Button>
        </Box>

        <Button variant="contained">Incident#: #112233</Button>

        <Box mt={4} display={"flex"}>
          <FormControl style={{ width: "20rem", marginRight: "2rem" }}>
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

          <FormControl style={{ width: "20rem", marginLeft: "2rem" }}>
            <DatePicker label="Date of incident" />
          </FormControl>

          <Box flex={1} />

          <Button variant="outlined" sx={{ height: "40px", width: "120px" }}>
            {" "}
            Clear All{" "}
          </Button>
        </Box>

        <Box style={{ display: "flex", justifyContent: "flex-end" }}>
        <Box
          mt={2}
          mr={2}
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
            {rows2.length} Results found
          </Typography>
        </Box>
      </Box>

        <Box mt={2} mb={5} style={{ height: "100%" }}>
          <DataGrid
            rows={rows2}
            columns={columns2}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </Box>

        <Box mt={4} mb={7} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            onClick={() => navigate("/student/action/deliver/")}
            sx={{ marginRight: "10px", width: "120px" }}
          >
            Proceed
          </Button>

          <Button
            variant="outlined"
            color="error"
            onClick={() => navigate("/student/action/deliver")}
            sx={{ marginLeft: "10px", width: "120px" }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </RevealCard>
  );
};

export default RaiseIncident;
