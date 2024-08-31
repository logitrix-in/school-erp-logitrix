import React, { useState, useEffect } from "react";
import RevealCard from "../../../AnimationComponents/RevealCard";
import Bbox from "../../../UiComponents/Bbox";
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Checkbox,
  ListItemText,
  OutlinedInput,
  ListItemIcon,
  Link,
} from "@mui/material";
import useClasses from "../../../../hooks/useClasses";
import { useMediaQuery } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataGrid } from "@mui/x-data-grid";

const StudentBulk = () => {
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
  const [rollNo, setRollNo] = useState([]);
  const [type, setType] = useState("all");
  const [isUploaded, setIsUploaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [templateDownloaded, setTemplateDownloaded] = useState(false);
  const [showUndoButton, setShowUndoButton] = useState(false);

  // drag & drop state
  const [showUploadArea, setShowUploadArea] = useState(false);

  // context useEffect
  useEffect(() => {
    const _filter = {
      academic_year: acYear,
      class: curClass,
      roll: rollNo,
      section: curSection,
      type: type,
    };
    setFilter(_filter);
  }, [rollNo, acYear, curClass, curSection, type]);

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

  // handle roll no dropdown change
  const handleRollChange = (e) => {
    const {
      target: { value },
    } = e;
    if (value.includes("all")) {
      if (rollNo.length === roll.length) {
        setRollNo([]);
      } else {
        setRollNo(roll);
      }
      return;
    }
    setRollNo(value);
  };

  // Function to handle drag over event
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Function to handle drop event
  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    // Handle the dropped files here
    console.log(files);
    // Set isUploaded to true when files are dropped
    setIsUploaded(true);
  };

  // Function to handle the confirmation of submission
  const handleConfirmation = (confirm) => {
    if (confirm) {
      setShowModal(false);
      setShowUploadArea(false);
      setShowUndoButton(true);
    } else {
      setShowModal(false);
    }
  };

  // Function to handle the undo action
  const handleUndo = () => {
    setShowUndoButton(false);
    // Reset isUploaded state when undo action is performed
    setIsUploaded(false);
  };

  const handleDownloadTemplate = () => {
    setTemplateDownloaded(true);
  };

  // table columns
  const columns = [
    {
      field: "space",
      headerName: "",
      width: 50,
    },
    {
      field: "id",
      headerName: "Student ID",
      width: isLaptop
        ? 150
        : isLarge
        ? 200
        : isTablet
        ? 140
        : isSmall
        ? 110
        : 170,
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
        ? 150
        : isLarge
        ? 200
        : isTablet
        ? 130
        : isSmall
        ? 110
        : 170,
    },
    {
      field: "class",
      headerName: "Class",
      width: isLaptop
        ? 150
        : isLarge
        ? 200
        : isTablet
        ? 120
        : isSmall
        ? 80
        : 170,
    },
    {
      field: "section",
      headerName: "Section",
      width: isLaptop
        ? 150
        : isLarge
        ? 200
        : isTablet
        ? 120
        : isSmall
        ? 80
        : 170,
    },
    {
      field: "roll",
      headerName: "Roll #",
      width: isLaptop
        ? 150
        : isLarge
        ? 200
        : isTablet
        ? 110
        : isSmall
        ? 80
        : 170,
    },
    {
      field: "access",
      headerName: "Account Access",
      width: isLaptop
        ? 160
        : isLarge
        ? 220
        : isTablet
        ? 170
        : isSmall
        ? 140
        : 190,
      renderCell: (params) => (
        <Box
          style={{
            backgroundColor:
              params.value === "Enabled"
                ? "#C6F6D5"
                : params.value === "Disabled"
                ? "#FFCCCC"
                : "transparent",
            borderRadius: "6px",
            display: "inline-block",
            width:
              params.value === "Enabled" || params.value === "Disabled"
                ? "70px"
                : "auto",
            paddingLeft:
              params.value === "Enabled"
                ? "10px"
                : params.value === "Disabled"
                ? "8px"
                : "0px",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    { field: "role", headerName: "Assigned Role", width: 180 },
  ];

  // table rows
  const rows = [
    {
      id: "AG240001",
      class: "VI",
      name: "Saunav Ray",
      section: "A",
      roll: 23,
      access: "Enabled",
      role: "Dance Club Secretary",
    },
    {
      id: "AG240002",
      class: "VI",
      name: "Saunav Ray",
      section: "A",
      roll: 23,
      access: "Enabled",
      role: "Dance Club Secretary",
    },
    {
      id: "AG240003",
      class: "VI",
      name: "Saunav Ray",
      section: "A",
      roll: 23,
      access: "Disabled",
      role: "Dance Club Secretary",
    },
  ];

  return (
    <RevealCard>
      <Bbox
        mt={3}
        width="100%"
        height="100%"
        borderRadius={2}
        overflow="hidden"
      >
        {/* top bulk text and undu button */}
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
            Bulk Manage
          </Typography>

          {/* undu button */}
          {showUndoButton && (
            <Button variant="outlined" onClick={handleUndo}>
              Undo
            </Button>
          )}
        </Box>

        {/* divider */}
        <Divider />

        {/* Conditional rendering for the table or the upload area */}
        {!showUploadArea ? (
          <Box>
            <ToastContainer />

            {/* dropdowns and search button section */}
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              p={2}
              mt={4}
              height={50}
            >
              {/* class dropdown */}
              <FormControl style={{ width: "21%", marginRight: "30px" }}>
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
              <FormControl style={{ width: "21%", marginRight: "30px" }}>
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

              {/* roll no dropdown */}
              <FormControl style={{ width: "21%" }}>
                <InputLabel>Roll #</InputLabel>
                <Select
                  placeholder="All"
                  multiple
                  value={rollNo}
                  onChange={handleRollChange}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 300,
                      },
                    },
                  }}
                  input={<OutlinedInput label="Roll #" />}
                  renderValue={(selected) =>
                    selected.length === roll.length
                      ? "All"
                      : selected.join(", ")
                  }
                >
                  {/* Select All option */}
                  <MenuItem value="all">
                    <ListItemIcon>
                      <Checkbox
                        checked={rollNo.length === roll.length}
                        indeterminate={
                          rollNo.length > 0 && rollNo.length < roll.length
                        }
                      />
                    </ListItemIcon>
                    <ListItemText primary="Select All" />
                  </MenuItem>
                  {/* Roll options */}
                  {roll.map((rollNumber) => (
                    <MenuItem key={rollNumber} value={rollNumber}>
                      <Checkbox
                        size="small"
                        checked={rollNo.indexOf(rollNumber) > -1}
                      />
                      <ListItemText primary={rollNumber} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box flex={1} />

              {/* search button */}
              <Button variant="contained">Search</Button>
            </Box>

            {/* table */}
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
                // checkboxSelection
              />
            </Box>
          </Box>
        ) : (
          // upload area
          <UploadArea
            setShowUploadArea={setShowUploadArea}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          />
        )}

        {/* Buttons section */}
        <Box style={{ marginLeft: "1%", marginBottom: "2%" }}>
          {!showUploadArea ? (
            <>
              {/* download template button */}
              <Button variant="contained" onClick={handleDownloadTemplate}>
                Download Template
              </Button>

              {/* upload button */}
              <Button
                variant="contained"
                sx={{ marginLeft: "20px" }}
                onClick={() => setShowUploadArea(true)}
                disabled={!templateDownloaded}
              >
                Upload
              </Button>
            </>
          ) : (
            <>
              {/* re-upload button */}
              <Button variant="contained" disabled={!isUploaded}>
                Re-Upload
              </Button>

              {/* submit button */}
              <Button
                variant="contained"
                sx={{ marginLeft: "20px" }}
                onClick={() => setShowModal(true)}
              >
                Submit
              </Button>

              {/* Modal for confirmation */}
              {showModal && (
                <ConfirmationModal onConfirmation={handleConfirmation} />
              )}
            </>
          )}
        </Box>
      </Bbox>
    </RevealCard>
  );
};

// Upload area component
const UploadArea = ({ setShowUploadArea, onDrop, onDragOver }) => {
  return (
    <Box
      border="1px dashed #ccc"
      borderRadius="7px"
      width="80%"
      height="300px"
      marginLeft="10%"
      marginTop="4%"
      marginBottom="2%"
      p={3}
      textAlign="center"
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <Typography
        style={{
          color: "#7C7A7A",
          fontSize: "30px",
          fontWeight: "500",
          paddingTop: "90px",
        }}
      >
        Click / Drag & Drop to upload Excel
      </Typography>
      <Button onClick={() => setShowUploadArea(false)}>Cancel</Button>
    </Box>
  );
};

const ConfirmationModal = ({ onConfirmation }) => {
  // handle success message
  const handleNotifyInactiveUsers = () => {
    try {
      toast.success("Submitted Successfully.", {
        autoClose: 3000,
      });
      // Call the onConfirmation function with true
      onConfirmation(true);
    } catch (error) {
      console.error("Error while displaying toast:", error);
    }
  };

  return (
    <Box
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "20px",
        border: "1px solid #000",
        borderRadius: "7px",
        zIndex: 9999,
      }}
    >
      <Typography style={{ fontSize: "20px", fontWeight: "600" }}>
        Are you sure you want to submit?
      </Typography>
      <Box
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Button
          variant="outlined"
          color="primary"
          style={{
            color: "#000",
            border: "1px solid #B0AEAE",
            marginRight: "10px",
          }}
          // onClick={() => onConfirmation(true)}
          onClick={handleNotifyInactiveUsers}
        >
          Yes
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          style={{ color: "#000", border: "1px solid #B0AEAE" }}
          onClick={() => onConfirmation(false)}
        >
          No
        </Button>
      </Box>
    </Box>
  );
};

export default StudentBulk;
