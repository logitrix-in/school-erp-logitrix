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
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import useClasses from "../../../../hooks/useClasses";
import { useMediaQuery } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IDCard from "../../../../assets/cards/IDCard.png";
import IDCardBack from "../../../../assets/cards/IDCardBack.png";
import GuardianCard from "../../../../assets/cards/GuardianCard.png";
import GuardianCardBack from "../../../../assets/cards/GuardianCardBack.png";
import GuestPass from "../../../../assets/cards/GuestPass.png";
import EventPass from "../../../../assets/cards/EventPass.png";
import LibraryCard from "../../../../assets/cards/LibraryCard.png";
import LibraryCardBack from "../../../../assets/cards/LibraryCardBack.png";
import { DataGrid } from "@mui/x-data-grid";

const IDbulk = () => {
  // breakpoints
  const isSmall = useMediaQuery("(max-width: 1364px)");
  const isTablet = useMediaQuery("(min-width: 1365px) and (max-width: 1535px)");
  const isLaptop = useMediaQuery("(min-width: 1536px) and (max-width: 1706px)");
  const isDesktop = useMediaQuery(
    "(min-width: 1707px) and (max-width: 1919px)"
  );
  const isLarge = useMediaQuery("(min-width: 1920px)");
  const isXlarge = useMediaQuery("(min-width: 2560px)");

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

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  // table columns
  const columns = [
    { field: "space", headerName: "", width: isLarge ? 80 : 50 },
    { field: "id", headerName: "Student ID", flex: 1 },
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
    {
      id: "AG240004",
      class: "VI",
      name: "Saunav Ray",
      section: "A",
      roll: 23,
      date: "20-Sep-2023",
    },
    {
      id: "AG240005",
      class: "VI",
      name: "Saunav Ray",
      section: "A",
      roll: 23,
      date: "20-Sep-2023",
    },
    {
      id: "AG240006",
      class: "VI",
      name: "Saunav Ray",
      section: "A",
      roll: 23,
      date: "20-Sep-2023",
    },
    {
      id: "AG240007",
      class: "VI",
      name: "Saunav Ray",
      section: "A",
      roll: 23,
      date: "20-Sep-2023",
    },
    {
      id: "AG240008",
      class: "VI",
      name: "Saunav Ray",
      section: "A",
      roll: 23,
      date: "20-Sep-2023",
    },
    {
      id: "AG240009",
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

      {/* Left drop-down section */}
      <Box
        borderRadius={1}
        paddingLeft={3}
        paddingRight={2}
        flex={0}
        py={4}
        display="flex"
        flexDirection="row"
        gap="1.6rem"
        bgcolor="white"
      >
        {/* academic year dropdown */}
        <FormControl
          style={{
            width: isLaptop
              ? "15rem"
              : isTablet
              ? "13rem"
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
              ? "13rem"
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
        <FormControl
          style={{
            width: isLaptop
              ? "15rem"
              : isTablet
              ? "13rem"
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

        {/* roll dropdown */}
        <FormControl
          style={{
            width: isLaptop
              ? "15rem"
              : isTablet
              ? "13rem"
              : isLarge
              ? "25rem"
              : isSmall
              ? "22rem"
              : "22rem",
          }}
        >
          <InputLabel>Roll #</InputLabel>
          <Select
            placeholder="All"
            multiple
            value={curRole}
            onChange={handlerollChange}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 300,
                },
              },
            }}
            input={<OutlinedInput label="Roll #" />}
            renderValue={(selected) =>
              selected.length === roll.length ? "All" : selected.join(", ")
            }
          >
            {/* Select All option */}
            <MenuItem value="all">
              <ListItemIcon>
                <Checkbox
                  checked={curRole.length === roll.length}
                  indeterminate={
                    curRole.length > 0 && curRole.length < roll.length
                  }
                />
              </ListItemIcon>
              <ListItemText primary="Select All" />
            </MenuItem>
            {/* roll options */}
            {roll.map((rollOption) => (
              <MenuItem key={rollOption} value={rollOption}>
                <Checkbox
                  size="small"
                  checked={curRole.indexOf(rollOption) > -1}
                />
                <ListItemText primary={rollOption} />
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
    </RevealCard>
  );
};

export default IDbulk;
