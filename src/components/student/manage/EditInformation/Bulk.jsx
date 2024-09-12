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
  Link
} from "@mui/material";
import { useMediaQuery } from "@material-ui/core";
import useclasses from "../../../../hooks/useClasses";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataGrid } from "@mui/x-data-grid";

const Bulk = () => {
  // breakpoints
  const isSmall = useMediaQuery("(max-width: 1364px)");
  const isTablet = useMediaQuery("(min-width: 1365px) and (max-width: 1535px)");
  const isLaptop = useMediaQuery("(min-width: 1536px) and (max-width: 1706px)");
  const isDesktop = useMediaQuery(
    "(min-width: 1707px) and (max-width: 1919px)"
  );
  const isLarge = useMediaQuery("(min-width: 1920px)");
  const isXlarge = useMediaQuery("(min-width: 2560px)");

  // dropdowns states
  const [filter, setFilter] = useState({});
  const { classes, sections, roll } = useclasses();
  const curYear = new Date().getFullYear();
  const academicYear = `${curYear}-${(curYear + 1).toString().slice(2, 4)}`;

  // states
  const [acYear, setAcYear] = useState(academicYear);
  const [curclass, setclass] = useState([]);
  const [curSection, setSection] = useState([]);
  const [rollNo, setRollNo] = useState([]);
  const [type, setType] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [showUploadArea, setShowUploadArea] = useState(false);
  const [isUploadEnabled, setIsUploadEnabled] = useState(false);
  const [isUploadOccurred, setIsUploadOccurred] = useState(false);

  // context useEffect
  useEffect(() => {
    const _filter = {
      academic_year: acYear,
      class: curclass,
      roll: rollNo,
      section: curSection,
      type: type,
    };
    setFilter(_filter);
  }, [rollNo, acYear, curclass, curSection, type]);

  // handle class dropdown change
  const handleclassChange = (e) => {
    const {
      target: { value },
    } = e;
    setclass(
      value.includes("all")
        ? curclass.length === classes.length
          ? []
          : classes
        : value
    );
  };

  // handle section dropdown change
  const handleSectionChange = (e) => {
    const {
      target: { value },
    } = e;
    setSection(
      value.includes("all")
        ? curSection.length === sections.length
          ? []
          : sections
        : value
    );
  };

  // handle roll no dropdown change
  const handleRollChange = (e) => {
    const {
      target: { value },
    } = e;
    setRollNo(
      value.includes("all")
        ? rollNo.length === roll.length
          ? []
          : roll
        : value
    );
  };

  // Function to handle drag over event
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Function to handle drop event
  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    console.log(files);
    setIsUploadOccurred(true);
  };

  // Function to handle the confirmation of submission
  const handleConfirmation = () => {
    try {
      toast.success("Submitted Successfully", {
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error while displaying toast:", error);
    }
    // setShowPrompt(false);
    setShowModal(false);
    setShowUploadArea(false);
  };

  // Function to enable the Upload button
  const enableUploadButton = () => {
    setIsUploadEnabled(true);
  };

  // table columns
  const columns = [
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
      <Bbox
        mt={3}
        width="100%"
        height="100%"
        borderRadius={2}
        overflow="hidden"
      >
        {/* top bulk text */}
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
            Bulk
          </Typography>
        </Box>

        {/* divider */}
        <Divider />

        {/* Conditional rendering for the table or the upload area */}
        {!showUploadArea ? (
          <Box>
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
                  value={curclass}
                  onChange={handleclassChange}
                  MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
                  input={<OutlinedInput label="class" />}
                  renderValue={(selected) =>
                    selected.length === classes.length
                      ? "All"
                      : selected.join(", ")
                  }
                >
                  <MenuItem value="all">
                    <ListItemIcon>
                      <Checkbox
                        checked={
                          classes.length > 0 &&
                          curclass.length === classes.length
                        }
                        indeterminate={
                          curclass.length > 0 &&
                          curclass.length < classes.length
                        }
                      />
                    </ListItemIcon>
                    <ListItemText primary="Select All" />
                  </MenuItem>
                  {classes.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox
                        size="small"
                        checked={curclass.indexOf(name) > -1}
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
                  MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
                  input={<OutlinedInput label="Section" />}
                  renderValue={(selected) =>
                    selected.length === sections.length
                      ? "All"
                      : selected.join(", ")
                  }
                >
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
                  MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
                  input={<OutlinedInput label="Roll #" />}
                  renderValue={(selected) =>
                    selected.length === roll.length
                      ? "All"
                      : selected.join(", ")
                  }
                >
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

              {/* Spacer */}
              <Box flex={1} />

              {/* search button */}
              <Button variant="contained">Search</Button>
            </Box>

            {/* total number of results found */}
            <Box pr={2} mt={1} display="flex" justifyContent="flex-end">
              <Box
                style={{
                  backgroundColor: "#E1EEFB",
                  border: "1px solid #3381A5",
                  borderRadius: "16px",
                  width: 102,
                  height: 22,
                  padding: "3.5px 12px",
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

            <ToastContainer />

            {/* table */}
            <Box m={2} height={"100%"}>
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
            // table buttons
            <>
              <Button variant="contained" onClick={enableUploadButton}>
                Download Template
              </Button>
              <Button
                variant="contained"
                sx={{ marginLeft: "20px" }}
                onClick={() => setShowUploadArea(true)}
                disabled={!isUploadEnabled}
              >
                Upload
              </Button>
            </>
          ) : (
            // upload buttons
            <>
              <Button
                variant="contained"
                disabled={!isUploadOccurred}
                style={{
                  backgroundColor: !isUploadOccurred ? "#e0e0e0" : undefined,
                }}
              >
                Re-Upload
              </Button>

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
          onClick={() => onConfirmation()}
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

export default Bulk;
