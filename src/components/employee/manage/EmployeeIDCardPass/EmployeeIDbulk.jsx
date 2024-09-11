import React, { useState, useEffect } from "react";
import RevealCard from "../../../AnimationComponents/RevealCard";
import {
  Box,
  Typography,
  Button,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  ListItemIcon,
  ListItemText,
  Link,
} from "@mui/material";
import useClasses from "../../../../hooks/useClasses";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataGrid } from "@mui/x-data-grid";
import Preview from "./Preview";

const IDbulk = () => {
  // dropdowns states and variables
  const [filter, setFilter] = useState({});

  const { classes, sections, roll } = useClasses();

  const curYear = new Date().getFullYear();

  const academicYear = `${curYear}-${(curYear + 1).toString().slice(2, 4)}`;

  const [acYear, setAcYear] = useState(academicYear);
  const [curClass, setClass] = useState([]);
  const [curSection, setSection] = useState([]);
  const [curRole, setRoll] = useState([]);
  const [showPrompt, setShowPrompt] = useState(false);
  const [type, setType] = useState("all");
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedRow, setSelecetedRow] = useState(null);
  const [previewPopup, setPreviewPopup] = useState(null);

  // context useEffect
  useEffect(() => {
    const _filter = {
      academic_year: acYear,
      class: curClass,
      section: curSection,
      curRole: curRole,
      type: type,
    };
    setFilter(_filter);
  }, [curSection, curRole, acYear, curClass, type]);

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

  // handle roll dropdown change
  const handlerollChange = (e) => {
    const {
      target: { value },
    } = e;

    // Check if "all" is selected
    if (value.includes("all")) {
      // If "all" is selected and all rolles are already selected, deselect all
      if (curRole.length === roll.length) {
        setRoll([]);
      } else {
        // If "all" is selected and not all rolles are selected, select all
        setRoll(roll);
      }
      return;
    }

    // Set the selected rolles
    setRoll(value);
  };

  const columns = [
    {
      field: "id", headerName: "Employee ID", flex: 1,
      renderCell: (params) => (
        <Link underline="hover" color="primary">
          {params.value}
        </Link>
      ),
    },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "emp_type", headerName: "Employee Type", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    { field: "grade", headerName: "Grade", flex: 1 },
    { field: "last_issue_date", headerName: "Last Issue Date", flex: 1 },
  ];

  // table rows
  const rows = [
    {
      id: "AG240001",
      name: "Saunav Ray",
      emp_type: "Teaching Staff",
      department: "Science",
      grade: "B2",
      last_issue_date: "20-Sep-2023",
    },
    {
      id: "AG240002",
      name: "Saunav Ray",
      emp_type: "Teaching Staff",
      department: "Science",
      grade: "B2",
      last_issue_date: "20-Sep-2023",
    },
    {
      id: "AG240003",
      name: "Saunav Ray",
      emp_type: "Teaching Staff",
      department: "Science",
      grade: "B2",
      last_issue_date: "20-Sep-2023",
    },
  ];


  const [flip, setFlip] = useState(false);

  return (
    <RevealCard>
      <ToastContainer />

      {/* Dropdown */}
      {/* <Box width={"500px"} mt={3} ml={3}>
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
      </Box> */}

      {/* Left drop-down section */}
      <Box
        borderRadius={1}
        paddingLeft={3}
        paddingRight={2}
        flex={0}
        py={4}
        display="flex"
        flexDirection="row"
        justifyContent={"space-between"}
        gap={2}
        bgcolor="white"
      >
        {/* academic year dropdown */}
        <FormControl style={{ width: '30%' }}>
          <InputLabel>Employee Type</InputLabel>
          <Select
            label="Employee Type"
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
        <FormControl style={{ width: '30%' }}
        >
          <InputLabel>Department</InputLabel>
          <Select
            placeholder="Department"
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
            input={<OutlinedInput label="Department" />}
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
                <Checkbox size="small" checked={curClass.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* section dropdown */}
        <FormControl style={{ width: '30%' }}
        >
          <InputLabel>Grade</InputLabel>
          <Select
            placeholder="Grade"
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
              selected.length === sections.length ? "All" : selected.join(", ")
            }
          >
            {/* Select All option */}
            <MenuItem value="all">
              <ListItemIcon>
                <Checkbox
                  checked={curSection.length === sections.length}
                  indeterminate={
                    curSection.length > 0 && curSection.length < sections.length
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
      </Box>

      {/* Submit button */}
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" style={{ width: "700px" }}>
          Submit
        </Button>
      </Box>

      {/* Total number of results found */}
      <Box style={{ display: "flex", justifyContent: "flex-end" }}>
        <Box
          mt={5}
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
          checkboxSelection
        />
      </Box>

      {/* Buttons */}
      <Box
        display="flex"
        justifyContent="flex-end"
        marginRight={3}
        marginBottom={5}
        gap={2}
      >
        {/* Issue button */}
        <Button
          color="primary"
          variant="contained"
          onClick={() => { setPreviewPopup(true) }}
        >
          Issue ID Card
        </Button>

        {/* Print button */}
        <Button
          variant="outlined"
          color="primary"
        >
          Print
        </Button>
      </Box>


      {/* Prompt dialog */}
      <Preview open={previewPopup} close={() => setPreviewPopup(false)} />
    </RevealCard>
  );
};

export default IDbulk;
