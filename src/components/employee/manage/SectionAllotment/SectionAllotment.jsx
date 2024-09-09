import React, { useState } from "react";
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
  Radio,
  RadioGroup,
  FormControlLabel,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PlusImage from "../../../../assets/icons/plus.png";
import MinusImage from "../../../../assets/icons/minus.png";
import { Icon } from "@mdi/react";
import { mdiAccountGroup } from "@mdi/js";
import { useMediaQuery } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SectionAllotment = () => {
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

  const navigate = useNavigate();

  const sectionsList = [
    "Nursery",
    "PP1",
    "PP2",
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
    "XI Science",
    "XI Commerce",
    "XI Humanities",
    "XII Science",
    "XII Commerce",
    "XII Humanities",
  ];

  // states
  const [acYear, setAcYear] = useState(academicYear);
  const [sortingRule, setSortingRule] = useState("1");
  const [selectedClass, setSelectedClass] = useState("");
  const [showUploadArea, setShowUploadArea] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [templateDownloaded, setTemplateDownloaded] = useState(false);
  const [showUndoButton, setShowUndoButton] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [sections, setSections] = useState(
    sectionsList.map((section, index) => ({
      id: index + 1,
      label: section,
      values: Array.from({ length: 3 }, (_, valueIndex) => ({
        id: valueIndex + 1,
        value: 0,
      })),
    }))
  );

  // Function to handle the submission
  const handleSubmit = () => {
    setShowConfirmationDialog(false);
    setShowUndoButton(true);
  };

  // Function to handle the undo action
  const handleUndo = () => {
    setShowUndoButton(false);
  };

  // handle sorting rule bullet option change
  const handleSortingRuleChange = (event) => {
    setSortingRule(event.target.value);
  };

  // handle class change dropdown
  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleUploadButtonClick = () => {
    setShowUploadArea(true);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // handle notifying inactive users
  const handleNotifyInactiveUsers = () => {
    try {
      toast.success("Submitted successfully", {
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error while displaying toast:", error);
    }
    setShowConfirmationDialog(false);
    setShowUploadArea(false);
  };

  // Handle template download button click
  const handleTemplateDownload = () => {
    setTemplateDownloaded(true);
  };

  // Section handlers
  const handleAddSection = (sectionIndex) => {
    const newValues = [
      ...sections[sectionIndex].values,
      { id: Date.now(), value: 0 },
    ];
    const updatedSections = [...sections];
    updatedSections[sectionIndex].values = newValues;
    setSections(updatedSections);
  };

  const handleRemoveSection = (sectionIndex) => {
    if (sections[sectionIndex].values.length > 1) {
      const updatedValues = [...sections[sectionIndex].values];
      updatedValues.pop();
      const updatedSections = [...sections];
      updatedSections[sectionIndex].values = updatedValues;
      setSections(updatedSections);
    }
  };

  const handleInputChange = (sectionIndex, valueIndex, value) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].values[valueIndex].value =
      parseInt(value) || 0;
    setSections(updatedSections);
  };

  // Dialog handlers
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

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
              backgroundColor: "transparent",
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
              backgroundColor: "white",
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
        {/* Section Allotment text */}
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
            Section Allotment
          </Typography>
        </Box>

        {/* Divider */}
        <Divider />

        {/* Dropdown and buttons */}
        <Box
          ml={3}
          mt={4}
          mr={3}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
        >
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
          <Box mt={2} display="flex" flexDirection="row">

            {/* strength allocation button */}
            <Button variant="outlined" onClick={handleOpenDialog}>
              Strength Allocation
            </Button>
          </Box>
        </Box>

        {/* Rule-based Distribution text box */}
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
            Rule-based Distribution
          </Typography>
        </Box>

        {/* Sorting rule, distribution type section */}
        <Box sx={{ display: "flex" }}>
          {/* Assign Roll Number - Sorting Rule */}
          <Box
            ml={3}
            mt={2}
            mr={3}
            height={40}
            width={"45%"}
            backgroundColor="#ECEDED"
            borderRadius={"6px"}
            display="flex"
            flexDirection="column"
          >
            {/* Assign Roll Number - Sorting Rule text */}
            <Typography
              style={{
                fontSize: "14px",
                fontWeight: "500",
                marginLeft: "15px",
                marginBottom: "5px",
                marginTop: "9px",
              }}
            >
              Assign Roll Number - Sorting Rule
            </Typography>

            {/* radio form */}
            <FormControl
              component="fieldset"
              style={{ marginLeft: "15px", marginTop: "15px" }}
            >
              <RadioGroup
                aria-label="sorting-rule"
                value={sortingRule}
                onChange={handleSortingRuleChange}
              >
                <FormControlLabel
                  value="Alphabetical order (First Name)"
                  control={<Radio size="small" />}
                  label="Alphabetical order (First Name)"
                />
                <FormControlLabel
                  value="Alphabetical order (Last Name)"
                  control={<Radio size="small" />}
                  label="Alphabetical order (Last Name)"
                />
                <FormControlLabel
                  value="Marks of Last Annual Examination"
                  control={<Radio size="small" />}
                  label="Marks of Last Annual Examination"
                />
                <FormControlLabel
                  value="Random"
                  control={<Radio size="small" />}
                  label="Random"
                />
              </RadioGroup>
            </FormControl>
          </Box>

          {/* Distribution type */}
          <Box
            ml={3}
            mt={2}
            mr={3}
            height={40}
            width={"50%"}
            backgroundColor="#ECEDED"
            borderRadius={"6px"}
            display="flex"
            flexDirection="column"
          >
            {/* Distribution Type text */}
            <Typography
              style={{
                fontSize: "14px",
                fontWeight: "500",
                marginLeft: "15px",
                marginBottom: "5px",
                marginTop: "9px",
              }}
            >
              Distribution Type
            </Typography>

            {/* box text */}
            <Box
              sx={{
                position: "absolute",
                marginTop: "60px",
                border: "1px solid #A9A5A5",
                borderRadius: "6px",
                padding: "10px",
                width: isLaptop
                  ? "38.7%"
                  : isLarge
                  ? "41.5%"
                  : isTablet
                  ? "37.3%"
                  : isSmall
                  ? "35.3%"
                  : "40.2%",
              }}
            >
              <Typography style={{ fontSize: "14px", fontWeight: "400" }}>
                Best Fit : All the students of a class will be divided in such a
                way that each section will be having equal percentage of
                students (based on the respective strength of each section).
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Apply button */}
        <Box display={"flex"} justifyContent={"center"}>
          <Button
            variant="contained"
            style={{
              position: "absolute",
              width: "369px",
              marginTop: "15rem",
            }}
            onClick={() => setShowConfirmationDialog(true)}
          >
            Apply
          </Button>
        </Box>

        {/* Manual Distribution text */}
        <Box
          ml={3}
          mt={40}
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
            Manual Distribution
          </Typography>
        </Box>

        {/* Class dropdown and buttons */}
        <Box m={3} display="flex" flexDirection="column">
          <Box display="flex" justifyContent="space-between">
            {/* class dropdown */}
            <FormControl style={{ width: "280px" }}>
              <InputLabel>Class</InputLabel>
              <Select
                label="Class"
                value={selectedClass}
                onChange={handleClassChange}
              >
                {/* <MenuItem value={"2024-25"}>2024-25</MenuItem> */}
                <MenuItem value={"Nursey"}>Nursey</MenuItem>
                <MenuItem value={"PP1"}>PP1</MenuItem>
                <MenuItem value={"PP2"}>PP2</MenuItem>
                <MenuItem value={"I"}>I</MenuItem>
                <MenuItem value={"II"}>II</MenuItem>
                <MenuItem value={"III"}>III</MenuItem>
                <MenuItem value={"IV"}>IV</MenuItem>
                <MenuItem value={"V"}>V</MenuItem>
                <MenuItem value={"VI"}>VI</MenuItem>
                <MenuItem value={"VII"}>VII</MenuItem>
                <MenuItem value={"VIII"}>VIII</MenuItem>
                <MenuItem value={"IX"}>IX</MenuItem>
                <MenuItem value={"X"}>X</MenuItem>
                <MenuItem value={"XI Science"}>XI Science</MenuItem>
                <MenuItem value={"XI Commerce"}>XI Commerce</MenuItem>
                <MenuItem value={"XI Humanities"}>XI Humanities</MenuItem>
                <MenuItem value={"XII Science"}>XII Science</MenuItem>
                <MenuItem value={"XII Commerce"}>XII Commerce</MenuItem>
                <MenuItem value={"XII Humanities"}>XII Humanities</MenuItem>
              </Select>
            </FormControl>

            {/* Undo button */}
            <Button
              variant="outlined"
              sx={{ height: "35px" }}
              onClick={handleUndo}
            >
              Undo
            </Button>
          </Box>

          {/* Download template and upload buttons */}
          <Box mt={3} display="flex" flexDirection="row">
            {/* download template button */}
            <Button variant="contained" onClick={handleTemplateDownload}>
              Download Template
            </Button>

            {/* upload button */}
            <Button
              variant="contained"
              style={{
                marginLeft: "30px",
                width: "10rem",
              }}
              onClick={handleUploadButtonClick}
              disabled={!templateDownloaded}
            >
              Upload
            </Button>
          </Box>

          {/* Show UploadArea if showUploadArea is true */}
          {showUploadArea && (
            <UploadArea
              setShowUploadArea={setShowUploadArea}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              handleSubmit={handleSubmit}
              setShowConfirmationDialog={setShowConfirmationDialog}
              showConfirmationDialog={showConfirmationDialog}
            />
          )}
        </Box>

        {/* Section Distribution - Special Cases text */}
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
            Section Distribution - Special Cases
          </Typography>
        </Box>

        {/* Map Section and Manage Stream buttons */}
        <Box
          ml={3}
          mt={2}
          mr={3}
          mb={5}
          display="flex"
          justifyContent="center"
        >

          {/* Manage Stream Request button */}
          <Button
            variant="contained"
            style={{
              width: isLaptop
                ? "35rem"
                : isLarge
                ? "47rem"
                : isTablet
                ? "31rem"
                : isSmall
                ? "25rem"
                : "41rem",
            }}
            onClick={() =>
              navigate(
                "/student/manage/section-allotment/manage-stream-request"
              )
            }
          >
            Manage Stream Request (Class XI)
          </Button>
        </Box>

        {/* Confirmation Dialog */}
        <Dialog
          open={showConfirmationDialog}
          onClose={() => setShowConfirmationDialog(false)}
        >
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
              Are you sure you want to apply?
            </Typography>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                style={{
                  color: "#000",
                  border: "1px solid #B0AEAE",
                  marginRight: "10px",
                }}
                onClick={handleNotifyInactiveUsers}
              >
                Yes
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                style={{ color: "#000", border: "1px solid #B0AEAE" }}
                onClick={() => setShowConfirmationDialog(false)}
              >
                No
              </Button>
            </Box>
          </Box>
        </Dialog>

        <ToastContainer />
      </Bbox>

      {/* Strength allocation management dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        sx={{
          maxHeight: isLaptop
            ? "616px"
            : isLarge
            ? "716px"
            : isTablet
            ? "685px"
            : isSmall
            ? "480px"
            : "692px",
        }}
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
          <IconButton onClick={handleCloseDialog} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ overflowX: "auto", paddingBottom: "30px" }}>
          <Box
            sx={{
              display: "grid",
              gridAutoFlow: "row",
              gap: "10px",
            }}
          >
            {/* submit button */}
            <Box
              position={"fixed"}
              zIndex={"9999"}
              width={"900px"}
              height={"62px"}
              backgroundColor={"white"}
              left={
                isLaptop
                  ? "318px"
                  : isLarge
                  ? "510px"
                  : isTablet
                  ? "234px"
                  : isSmall
                  ? "164.5px"
                  : "403.5px"
              }
              mt={
                isLaptop
                  ? 60
                  : isLarge
                  ? 72.5
                  : isTablet
                  ? 68.6
                  : isSmall
                  ? 43
                  : 69.5
              }
              display={"flex"}
              justifyContent={"center"}
              sx={{
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Button
                variant="contained"
                onClick={handleCloseDialog}
                sx={{ width: "600px", height: "40px", marginTop: "10px" }}
              >
                Submit
              </Button>
            </Box>

            {sections.map((section, sectionIndex) => (
              <Box
                key={section.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <BoxContainer
                  section={section}
                  sectionIndex={sectionIndex}
                  handleAddSection={handleAddSection}
                  handleRemoveSection={handleRemoveSection}
                  handleInputChange={handleInputChange}
                />
              </Box>
            ))}
          </Box>
        </DialogContent>
      </Dialog>
    </RevealCard>
  );
};

// Upload area component
const UploadArea = ({
  setShowUploadArea,
  onDrop,
  onDragOver,
  handleSubmit,
  setShowConfirmationDialog,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Function to handle file upload
  const handleFileUpload = (files) => {
    setUploadedFiles(files);
  };

  // Function to handle submission
  const handleSubmission = () => {
    if (uploadedFiles.length > 0) {
      setShowConfirmationDialog(true);
    } else {
      // Notify user to upload at least one file
      toast.error("Please upload at least one file", {
        autoClose: 3000,
      });
    }
  };

  return (
    <Box
      border="1px dashed #ccc"
      borderRadius="7px"
      width="80%"
      height="300px"
      marginLeft="10%"
      marginTop="4%"
      marginBottom={10}
      p={3}
      textAlign="center"
      onDrop={(event) => {
        handleFileUpload(event.dataTransfer.files);
        onDrop(event);
      }}
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

      {/* Buttons */}
      <Box mt={15} display="flex" justifyContent="center">
        <Button variant="contained" disabled={uploadedFiles.length === 0}>
          Re-Upload
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "10px" }}
          onClick={handleSubmission}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

const BoxContainer = ({
  section,
  sectionIndex,
  handleAddSection,
  handleRemoveSection,
  handleInputChange,
}) => {
  const totalValue = section.values.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#FEF7FF",
        borderRadius: "15px",
        margin: "10px 50px 0 50px",
        border: "1px solid #B2AFAF",
        alignItems: "center",
        overflowY: "hidden",
        overflowX: "auto",
        maxWidth: "calc(100vw - 10px)",
        padding: "35px 45px 35px 25px",
      }}
    >
      {/* Class name */}
      <Typography
        sx={{
          width: "100px",
          fontSize: "16px",
          fontWeight: "700",
          color: "#585657",
        }}
      >
        {section.label}
      </Typography>

      {/* Section inputs */}
      {section.values.map((value, valueIndex) => (
        <Box
          key={value.id}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "auto",
          }}
        >
          <TextField
            label={`Section ${String.fromCharCode(65 + valueIndex)}`}
            variant="outlined"
            size="small"
            sx={{ width: "90px", marginRight: "5px" }}
            inputProps={{
              onChange: (e) =>
                handleInputChange(sectionIndex, valueIndex, e.target.value),
              pattern: "[0-9]*",
              inputMode: "numeric",
            }}
            type="number"
          />

          {/* Remove button */}
          {valueIndex === section.values.length - 1 && (
            <Button
              onClick={() => handleRemoveSection(sectionIndex)}
              disabled={section.values.length === 1}
            >
              <img
                src={MinusImage}
                alt="minus"
                style={{ width: "15px", height: "15px" }}
              />
            </Button>
          )}
        </Box>
      ))}

      {/* Add button */}
      <Button
        variant="contained"
        sx={{
          width: "95px",
          height: "30px",
          backgroundColor: "#2F7DA1",
          margin: "10px 0",
          minWidth: "95px",
        }}
        onClick={() => handleAddSection(sectionIndex)}
      >
        <img
          src={PlusImage}
          alt="plus"
          style={{ width: "15px", height: "15px", marginRight: "5px" }}
        />
        <Typography sx={{ fontSize: 10, paddingTop: 0.3 }}>Add New</Typography>
      </Button>

      {/* Group icon and total value */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "auto",
          marginLeft: "60px",
        }}
      >
        {/* Group icon */}
        <Icon
          path={mdiAccountGroup}
          size={1}
          sx={{ marginLeft: "30px", marginRight: "5px", color: "#585657" }}
        />

        {/* Total value */}
        <Typography
          sx={{ marginTop: "3.5px", color: "#585657", marginLeft: "10px" }}
        >
          {totalValue}
        </Typography>
      </Box>
    </Box>
  );
};

export default <SectionAllotment />;
