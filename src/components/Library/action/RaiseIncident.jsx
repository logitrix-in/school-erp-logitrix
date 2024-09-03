import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Autocomplete,
  MenuItem,
  ListItemIcon,
  Checkbox,
  Typography,
  ListItemText,
  Link
} from "@mui/material";
import { useMediaQuery } from "@material-ui/core";
import useClasses from "../../../hooks/useClasses";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { DatePicker } from "@mui/x-date-pickers";
import DeleteIcon from "@mui/icons-material/Delete";
import RevealCard from "@/components/AnimationComponents/RevealCard";
import ReignsSelect from "@/components/UiComponents/ReignsSelect";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SVGIncident from './SVGIncident';

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
  const [modeSwitch, setModeSwitch] = useState(true);

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

  const [selectedRow, setSelectedRow] = useState(null);

  const columns1 = [
    {
      field: "space", headerName: "", flex: 0.2,
    },
    {
      field: "id",
      headerName: "Library Card #", flex: 1
    },
    {
      field: "name",
      headerName: "Name", flex: 1.5
    },
    {
      field: "class",
      headerName: "Class", flex: 0.8
    },
    {
      field: "section",
      headerName: "Section", flex: 0.8
    },
    {
      field: "roll",
      headerName: "Roll #", flex: 0.8
    },
    {
      field: "status",
      headerName: "Library Card Status", flex: 1.5,
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
      headerName: "Last Suspension Period", flex: 1.8
    },
    {
      field: "amount",
      headerName: "Penalty Due Amount", flex: 1.5
    },
    {
      field: "incidentid",
      flex: 1.5,
      headerName: "Open Incidents",
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

  const columns2 = [
    { field: "space", headerName: "", flex: 0.2 },
    {
      field: "id",
      headerName: "Student ID",
      flex: 1,
      renderCell: (params) => (
        <Link underline="hover" color="primary">
          {params.value}
        </Link>
      )
    },
    {
      field: "name",
      headerName: "Name", flex: 1.2
    },
    {
      field: "class",
      headerName: "Class", flex: 0.7
    },
    {
      field: "section",
      headerName: "Section", flex: 0.7
    },
    {
      field: "roll",
      headerName: "Roll #", flex: 0.7
    },
    {
      field: "status",
      headerName: "Library Card Status", flex: 1.2,
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
      field: "suspend", flex: 1,
      headerName: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Checkbox />
          Suspend
        </div>
      ),
      renderCell: (params) => <Checkbox />,
    },
    {
      field: "penalty", flex: 1.3,
      headerName: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Checkbox />
          Impose Penalty
        </div>
      ),
      renderCell: (params) => <Checkbox />,
    },
    {
      field: "delete",
      headerName: "",
      flex: 0.8,
      renderCell: (params) => <DeleteOutlineOutlinedIcon color="error" sx={{ cursor: 'pointer' }} />
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
  ];

  const columns3 = [
    {
      field: "space", flex: 0.5,
      headerName: (
        <Checkbox size="small" />
      ),
      renderCell: (params) => (
        <Checkbox
          color="primary"
          sx={{
            transform: "scale(0.6)",
          }}
          inputProps={{ "aria-label": params.row.id }}
          onChange={() => {
          }}
        />
      ),
    },
    { field: "id", headerName: "Library Card #", flex: 1 },
    { field: "name", headerName: "Name", flex: 1.5 },
    { field: "class", headerName: "Class", flex: 0.8 },
    { field: "section", headerName: "Section", flex: 0.8 },
    { field: "roll", headerName: "Roll #", flex: 0.8 },
    {
      field: "status",
      headerName: "Library Card Status",
      flex: 1.5,
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
    { field: "suspension", headerName: "Last Suspension Period", flex: 1.5 },
    { field: "penalty", headerName: "Penalty Due Amount", flex: 1.5 },
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
      suspension: "N/A",
      penalty: "Nil",
    },
    {
      id: "AG240003",
      class: "VI",
      name: "Saunav Ray",
      section: "A",
      roll: 23,
      status: "Active",
      suspension: "N/A",
      penalty: "Nil",
    },
    {
      id: "AG240004",
      class: "VI",
      name: "Saunav Ray",
      section: "A",
      roll: 23,
      status: "Active",
      suspension: "N/A",
      penalty: "Nil",
    }
  ];

  return (
    <RevealCard>
      <Box ml={2} mr={2}>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent={"space-between"}
          mt={1}
          height={70}
          width={"100%"}
        >
          {modeSwitch ? (
            <Autocomplete
              options={["Student 1", "Student 2"]}
              filterSelectedOptions
              freeSolo={false}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Library Card #"
                  label="Search by Library Card #"
                />
              )}
              sx={{ width: "30%" }}
            />
          ) : (
            <Box sx={{ width: "30%", visibility: "hidden" }}>
              <TextField
                placeholder="Hidden Placeholder"
                label="Hidden Label"
                sx={{ width: "100%" }}
              />
            </Box>
          )}

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

        {!modeSwitch && (
          <Box display={"flex"} justifyContent={'space-between'} alignItems={'center'}>
            <Box display={"flex"}>
              <ReignsSelect items={classes} multiple label="Class" sx={{ width: "15rem", marginRight: "2rem" }} />
              <ReignsSelect items={sections} multiple label="Section" sx={{ width: "15rem", marginRight: "2rem" }} />
              <ReignsSelect items={roll} multiple label="Roll#" sx={{ width: "15rem", marginRight: "2rem" }} />
            </Box>

            <Button variant="contained" sx={{ marginLeft: "20px" }}>
              Submit
            </Button>

          </Box>
        )}

        < Box mt={2} mb={5} style={{ height: "100%" }}>
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
              CheckboxSelection
            />
          )}
        </Box>

        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            sx={{ marginLeft: "20px" }}
            onClick={() => {
              setModeSwitch(!modeSwitch);
            }}
          >
            Add to Incident Bucket
          </Button>
        </Box>
        <SVGIncident />

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

        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button variant="outlined" sx={{ borderRadius: 16 }}>
            80 users added
          </Button>
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
            onClick={() => navigate("/library/action/deliver/")}
            sx={{ marginRight: "10px", width: "120px" }}
          >
            Proceed
          </Button>

          <Button
            variant="outlined"
            color="error"
            sx={{ marginLeft: "10px", width: "120px" }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </RevealCard >
  );
};

export default RaiseIncident;