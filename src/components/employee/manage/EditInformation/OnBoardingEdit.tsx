import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Divider,
  Box,
  Tooltip,
  IconButton,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloseIcon from "@mui/icons-material/Close";
import { ToastContainer, toast } from "react-toastify";

const OnBoardingEdit = () => {
  const navigate = useNavigate();

  const [confirmation, setConfirmation] = React.useState(false);

  const [formValues, setFormValues] = React.useState({
    profileImage: null,

    firstName: "",
    middleName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    nationality: "",
    religion: "",
    dateOfBirth: null,
    category: "",
    gender: "",
    bloodGroup: "",
    criticalMedicalAilments: "",
    categoryCertificate: null,
    transferCertificate: null,
    migrationCertificate: null,

    // Father details
    fatherName: "",
    fatherOccupation: "",
    fatherIncome: "",
    fatherContactNumber: "",
    fatherEmail: "",
    fatherIDProof: null,

    // Mother details
    motherName: "",
    motherOccupation: "",
    motherIncome: "",
    motherContactNumber: "",
    motherEmail: "",
    motherIDProof: null,

    // Guardian details
    guardianName: "",
    guardianOccupation: "",
    guardianIncome: "",
    guardianContactNumber: "",
    guardianEmail: "",
    guardianIDProof: null,

    // Extracurricular activities
    activities: "",
    highestLevel: "",
    enrolledInNCC: "",
    nccDocument: null,
    hobbies: "",

    // applying for
    applyingForArea: "",
    currentClass: "",
    admissionYear: "",
    marksheets: null,
    schoolName: "",
    schoolAddress: "",
    boardName: "",
    medium: "",

    // Address details
    addressLine1: "",
    country1: "",
    state1: "",
    city1: "",
    district1: "",
    pinCode1: "",
    addressLine2: "",
    country2: "",
    state2: "",
    city2: "",
    district2: "",
    pinCode2: "",

    // Relatives in school
    hasRelativesStudied: "",
    relativesStudiedDetails: {
      name: "",
      passingYear: "",
      relation: "",
    },
    hasRelativesWorking: "",
    relativesWorkingDetails: {
      name: "",
      passingYear: "",
      relation: "",
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormValues({
      ...formValues,
      [name]: files[0],
    });
  };

  const handleDateChange = (date, name) => {
    setFormValues({
      ...formValues,
      [name]: date,
    });
  };

  const handleSubmit = () => {
    setConfirmation(false);
    toast.success("Submitted Successfully", {
      autoClose: 2000,
    });
    navigate("/employee/manage/edit-information");
  };

  const handleClose = () => {
    setConfirmation(false);
    toast.error("Edit Details Cancelled", {
      autoClose: 2000,
    });
    navigate("/employee/manage/edit-information");
  };

  return (
    <form>
      <Box
        bgcolor={"primary.main"}
        p={2}
        display={"flex"}
        justifyContent={"space-between"}
        gap={2}
        alignItems={"center"}
      >
        {/* Edit Information text */}
        <Typography fontSize={"1.2rem"} color={"white"}>
          Offline Onboarding Form
        </Typography>

        <IconButton onClick={() => handleClose()}>
          <CloseIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>

      <ToastContainer />

      <Box sx={{ display: "flex", justifyContent: "center", marginY: "20px" }}>
        <Tooltip title="Upload Profile Image" arrow>
          <IconButton component="label">
            <input
              hidden
              accept="image/*"
              type="file"
              name="profileImage"
              onChange={handleFileChange}
            />
            {formValues.profileImage ? (
              <Avatar
                src={URL.createObjectURL(formValues.profileImage)}
                sx={{ width: 100, height: 100 }}
              />
            ) : (
              <Avatar sx={{ width: 150, height: 150 }}>
                <UploadFileIcon fontSize="large" />
              </Avatar>
            )}
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            paddingX: "10px",
          }}
        >
          <Box>
            <Typography
              width={"100%"}
              p={1}
              px={2}
              bgcolor={"#E3E0E0"}
              fontWeight={600}
              fontSize={"1rem"}
              borderRadius={"5px"}
            >
              Personal Details
            </Typography>

            <Box sx={{ paddingY: "10px" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px",
                }}
              >
                <Typography sx={{ fontWeight: "600" }}>
                  Candidate's Name:
                </Typography>

                <TextField
                  label="First Name"
                  name="firstName"
                  value={formValues.firstName}
                  onChange={handleInputChange}
                />

                <TextField
                  label="Middle Name"
                  name="middleName"
                  value={formValues.middleName}
                  onChange={handleInputChange}
                />

                <TextField
                  label="Last Name"
                  name="lastName"
                  value={formValues.lastName}
                  onChange={handleInputChange}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <Typography sx={{ fontWeight: "600", width: "120px" }}>
                  Contact Number:{" "}
                </Typography>
                <TextField
                  label="Contact Number"
                  name="contactNumber"
                  value={formValues.contactNumber}
                  onChange={(event) => {
                    const newContactNumber = event.target.value.replace(
                      /[^0-9]/g,
                      ""
                    ); // Remove non-numeric characters
                    if (newContactNumber.length <= 10) {
                      setFormValues({
                        ...formValues,
                        contactNumber: newContactNumber,
                      });
                    }
                  }}
                  inputProps={{ maxLength: 10 }}
                />

                <Typography sx={{ fontWeight: "600", width: "120px" }}>
                  Email ID:{" "}
                </Typography>
                <TextField
                  label="Email ID"
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <Typography sx={{ fontWeight: "600", width: "120px" }}>
                  Nationality:
                </Typography>
                <FormControl sx={{ width: "200px" }}>
                  <InputLabel>Nationality</InputLabel>
                  <Select
                    name="nationality"
                    value={formValues.nationality}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="Indian">Indian</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>

                <Typography sx={{ fontWeight: "600", width: "120px" }}>
                  Religion:
                </Typography>

                <FormControl sx={{ width: "200px" }}>
                  <InputLabel>Religion</InputLabel>
                  <Select
                    name="religion"
                    value={formValues.religion}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="Hindu">Hindu</MenuItem>
                    <MenuItem value="Muslim">Muslim</MenuItem>
                    <MenuItem value="Christian">Christian</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px",
                }}
              >
                <Typography sx={{ fontWeight: "600", width: "120px" }}>
                  Date of Birth:
                </Typography>
                <Box sx={{ width: "200px" }}>
                  <DatePicker
                    label="Date of Birth"
                    value={formValues.dateOfBirth}
                    onChange={handleDateChange}
                  />
                </Box>

                <Typography sx={{ fontWeight: "600", width: "120px" }}>
                  Category:
                </Typography>
                <FormControl sx={{ width: "125px" }}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={formValues.category}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="General">General</MenuItem>
                    <MenuItem value="OBC">OBC</MenuItem>
                    <MenuItem value="SC">SC</MenuItem>
                    <MenuItem value="ST">ST</MenuItem>
                  </Select>
                </FormControl>

                <Tooltip title="Upload Category Certificate">
                  <IconButton component="label">
                    <UploadFileIcon />
                    <input
                      type="file"
                      name="categoryCertificate"
                      onChange={handleFileChange}
                      hidden
                    />
                  </IconButton>
                </Tooltip>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px",
                }}
              >
                <Typography sx={{ fontWeight: "600", width: "120px" }}>
                  Gender:
                </Typography>
                <FormControl sx={{ width: "200px" }}>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    value={formValues.gender}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <Typography sx={{ fontWeight: "600", width: "120px" }}>
                  Father's Name:{" "}
                </Typography>
                <TextField
                  label="Father's Name"
                  name="contactNumber"
                  value={formValues.contactNumber}
                  onChange={(event) => {
                    const newContactNumber = event.target.value.replace(
                      /[^0-9]/g,
                      ""
                    ); // Remove non-numeric characters
                    if (newContactNumber.length <= 10) {
                      setFormValues({
                        ...formValues,
                        contactNumber: newContactNumber,
                      });
                    }
                  }}
                  inputProps={{ maxLength: 10 }}
                />

                <Typography sx={{ fontWeight: "600", width: "120px" }}>
                  Father's Occupation:{" "}
                </Typography>
                <TextField
                  label="Father's Occupation"
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <Typography sx={{ fontWeight: "600", width: "120px" }}>
                  Mother's Name:{" "}
                </Typography>
                <TextField
                  label="Mother's Name"
                  name="contactNumber"
                  value={formValues.contactNumber}
                  onChange={(event) => {
                    const newContactNumber = event.target.value.replace(
                      /[^0-9]/g,
                      ""
                    ); // Remove non-numeric characters
                    if (newContactNumber.length <= 10) {
                      setFormValues({
                        ...formValues,
                        contactNumber: newContactNumber,
                      });
                    }
                  }}
                  inputProps={{ maxLength: 10 }}
                />

                <Typography sx={{ fontWeight: "600", width: "120px" }}>
                  Mother's Occupation:{" "}
                </Typography>
                <TextField
                  label="Mother's Occupation"
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <Typography sx={{ fontWeight: "600", width: "120px" }}>
                  Spouse's Name:{" "}
                </Typography>
                <TextField
                  label="Spouse's Name"
                  name="contactNumber"
                  value={formValues.contactNumber}
                  onChange={(event) => {
                    const newContactNumber = event.target.value.replace(
                      /[^0-9]/g,
                      ""
                    ); // Remove non-numeric characters
                    if (newContactNumber.length <= 10) {
                      setFormValues({
                        ...formValues,
                        contactNumber: newContactNumber,
                      });
                    }
                  }}
                  inputProps={{ maxLength: 10 }}
                />

                <Typography sx={{ fontWeight: "600", width: "120px" }}>
                  Spouse's Occupation:{" "}
                </Typography>
                <TextField
                  label="Spouse's Occupation"
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px",
                }}
              >
                <Typography sx={{ fontWeight: "600", width: "120px" }}>
                  Blood Group:
                </Typography>
                <FormControl sx={{ width: "200px" }}>
                  <InputLabel>Blood Group</InputLabel>
                  <Select
                    name="bloodGroup"
                    value={formValues.bloodGroup}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="A+">A+</MenuItem>
                    <MenuItem value="A-">A-</MenuItem>
                    <MenuItem value="B+">B+</MenuItem>
                    <MenuItem value="B-">B-</MenuItem>
                    <MenuItem value="AB+">AB+</MenuItem>
                    <MenuItem value="AB-">AB-</MenuItem>
                    <MenuItem value="O+">O+</MenuItem>
                    <MenuItem value="O-">O-</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px",
                }}
              >
                <Typography sx={{ fontWeight: "600", width: "250px" }}>
                  Critical Medical Ailment (s):
                </Typography>
                <Typography sx={{ fontWeight: "600", width: "250px" }}>
                  Yes (Chronic Aplastic Anaemia)
                </Typography>

                <TextField
                  label="Critical Medical Ailments"
                  name="criticalMedicalAilments"
                  value={formValues.criticalMedicalAilments}
                  onChange={handleInputChange}
                  rows={4}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <Typography sx={{ fontWeight: "600", width: "120px" }}>
                  Emergency Contact Number:{" "}
                </Typography>
                <TextField
                  label="Emergency Contact Number"
                  name="contactNumber"
                  value={formValues.contactNumber}
                  onChange={(event) => {
                    const newContactNumber = event.target.value.replace(
                      /[^0-9]/g,
                      ""
                    ); // Remove non-numeric characters
                    if (newContactNumber.length <= 10) {
                      setFormValues({
                        ...formValues,
                        contactNumber: newContactNumber,
                      });
                    }
                  }}
                  inputProps={{ maxLength: 10 }}
                />

                <Typography sx={{ fontWeight: "600", width: "120px" }}>
                  Emergency Contact Name:{" "}
                </Typography>
                <TextField
                  label="Emergency Contact Name"
                  name="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <Typography sx={{ fontWeight: "600", width: "120px" }}>
                  Emergency Contact Relationship:{" "}
                </Typography>
                <TextField
                  label="Emergency Contact Relationship"
                  name="contactNumber"
                  value={formValues.contactNumber}
                  onChange={(event) => {
                    const newContactNumber = event.target.value.replace(
                      /[^0-9]/g,
                      ""
                    ); // Remove non-numeric characters
                    if (newContactNumber.length <= 10) {
                      setFormValues({
                        ...formValues,
                        contactNumber: newContactNumber,
                      });
                    }
                  }}
                  inputProps={{ maxLength: 10 }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px",
                }}
              >
                <Typography sx={{ fontWeight: "600", width: "250px" }}>
                  ID Proof:
                </Typography>
                <FormControl sx={{ width: "200px" }}>
                  <InputLabel>Blood Group</InputLabel>
                  <Select
                    name="bloodGroup"
                    value={formValues.bloodGroup}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="A+">A+</MenuItem>
                    <MenuItem value="A-">A-</MenuItem>
                    <MenuItem value="B+">B+</MenuItem>
                    <MenuItem value="B-">B-</MenuItem>
                    <MenuItem value="AB+">AB+</MenuItem>
                    <MenuItem value="AB-">AB-</MenuItem>
                    <MenuItem value="O+">O+</MenuItem>
                    <MenuItem value="O-">O-</MenuItem>
                  </Select>
                </FormControl>
                <Tooltip title="Upload Transfer Certificate">
                  <IconButton component="label">
                    <UploadFileIcon />
                    <input
                      type="file"
                      name="categoryCertificate"
                      onChange={handleFileChange}
                      hidden
                    />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>

          <Box>
            <Typography
              width={"100%"}
              p={1}
              px={2}
              bgcolor={"#E3E0E0"}
              fontWeight={600}
              fontSize={"1rem"}
              borderRadius={"5px"}
            >
              Extra Curricular Activities
            </Typography>

            <Box sx={{ paddingY: "10px" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: "10px",
                }}
              >
                <FormControl sx={{ width: "300px" }}>
                  <InputLabel>Activities or Sports</InputLabel>
                  <Select
                    name="activities"
                    value={formValues.activities}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="Sports">Sports</MenuItem>
                    <MenuItem value="Music">Music</MenuItem>
                    <MenuItem value="Dance">Dance</MenuItem>
                    <MenuItem value="Art">Art</MenuItem>
                    {/* Add more options as needed */}
                  </Select>
                </FormControl>

                <FormControl sx={{ width: "300px" }}>
                  <InputLabel>Highest Level</InputLabel>
                  <Select
                    name="highestLevel"
                    value={formValues.highestLevel}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="District">District</MenuItem>
                    <MenuItem value="State">State</MenuItem>
                    <MenuItem value="National">National</MenuItem>
                    {/* Add more options as needed */}
                  </Select>
                </FormControl>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <FormControl component="fieldset">
                  <Typography sx={{ fontWeight: "600" }}>
                    Enrolled in NCC
                  </Typography>
                  <RadioGroup
                    row
                    name="enrolledInNCC"
                    value={formValues.enrolledInNCC}
                    onChange={handleInputChange}
                  >
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>

                {formValues.enrolledInNCC === "Yes" && (
                  <Grid item xs={12}>
                    <Button variant="contained" component="label">
                      Upload NCC Document
                      <input
                        type="file"
                        name="nccDocument"
                        onChange={handleFileChange}
                        hidden
                      />
                    </Button>
                  </Grid>
                )}
              </Box>

              <Box sx={{ padding: "10px" }}>
                <TextField
                  label="Hobbies / Interests"
                  name="hobbies"
                  value={formValues.hobbies}
                  onChange={handleInputChange}
                  rows={4}
                  fullWidth
                />
              </Box>
            </Box>
          </Box>

          <Box>
            <Typography
              width={"100%"}
              p={1}
              px={2}
              bgcolor={"#E3E0E0"}
              fontWeight={600}
              fontSize={"1rem"}
              borderRadius={"5px"}
            >
              Application Details
            </Typography>
            <Box sx={{ paddingY: "10px" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px",
                }}
              >
                <Typography sx={{ fontWeight: "600" }}>
                  Applying For:{" "}
                </Typography>
                <TextField
                  label="Applying For"
                  name="applyingForArea"
                  value={formValues.applyingForArea}
                  onChange={handleInputChange}
                />

                <Typography sx={{ fontWeight: "600" }}>
                  Current Class:{" "}
                </Typography>
                <TextField
                  label="Current Class"
                  name="currentClass"
                  value={formValues.currentClass}
                  onChange={handleInputChange}
                />

                <Typography sx={{ fontWeight: "600" }}>
                  Admission Year:{" "}
                </Typography>
                <TextField
                  label="Admission Year"
                  name="admissionYear"
                  value={formValues.admissionYear}
                  onChange={handleInputChange}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  gap: "10px",
                  padding: "10px",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontWeight: "600" }}>
                  Marks secured in the final examination of previous class(%)
                </Typography>
                <Tooltip title="Upload Marksheets">
                  <IconButton component="label">
                    <UploadFileIcon />
                    <input
                      type="file"
                      name="marksheets"
                      onChange={handleFileChange}
                      hidden
                    />
                  </IconButton>
                </Tooltip>
              </Box>

              <Box
                sx={{
                  padding: "10px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <TextField
                  label="School Name"
                  name="schoolName"
                  value={formValues.schoolName}
                  onChange={handleInputChange}
                  fullWidth
                />

                <TextField
                  label="School Address"
                  name="schoolAddress"
                  value={formValues.schoolAddress}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Box>

              <Box
                sx={{
                  padding: "10px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontWeight: "600" }}>Board Name:</Typography>
                <TextField
                  label="Board Name"
                  name="boardName"
                  value={formValues.boardName}
                  onChange={handleInputChange}
                />
                <Typography sx={{ fontWeight: "600" }}>Medium:</Typography>
                <TextField
                  label="Medium"
                  name="medium"
                  value={formValues.medium}
                  onChange={handleInputChange}
                />
              </Box>
            </Box>
          </Box>

          <Box>
            <Typography
              width={"100%"}
              p={1}
              px={2}
              bgcolor={"#E3E0E0"}
              fontWeight={600}
              fontSize={"1rem"}
              borderRadius={"5px"}
            >
              Additional Details
            </Typography>
            <Box sx={{ paddingY: "10px" }}>
              <Box sx={{ padding: "10px" }}>
                <FormControl component="fieldset">
                  <Typography sx={{ fontWeight: "600" }}>
                    Has any relative studied in this school?
                  </Typography>
                  <RadioGroup
                    row
                    name="hasRelativesStudied"
                    value={formValues.hasRelativesStudied}
                    onChange={handleInputChange}
                  >
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>

              {formValues.hasRelativesStudied === "Yes" && (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                      padding: "10px",
                    }}
                  >
                    <TextField
                      label="Relative's Name"
                      name="relativesStudiedDetails.name"
                      value={formValues.relativesStudiedDetails.name}
                      onChange={handleInputChange}
                      fullWidth
                    />
                    <TextField
                      label="Passing Year"
                      name="relativesStudiedDetails.passingYear"
                      value={formValues.relativesStudiedDetails.passingYear}
                      onChange={handleInputChange}
                      fullWidth
                    />
                    <TextField
                      label="Relation"
                      name="relativesStudiedDetails.relation"
                      value={formValues.relativesStudiedDetails.relation}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Box>
                </>
              )}

              <Box sx={{ padding: "10px" }}>
                <FormControl component="fieldset">
                  <Typography sx={{ fontWeight: "600" }}>
                    Has any relative worked / is working in this school?
                  </Typography>
                  <RadioGroup
                    row
                    name="hasRelativesWorking"
                    value={formValues.hasRelativesWorking}
                    onChange={handleInputChange}
                  >
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>

              {formValues.hasRelativesWorking === "Yes" && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    padding: "10px",
                  }}
                >
                  <TextField
                    label="Relative's Name"
                    name="relativesWorkingDetails.name"
                    value={formValues.relativesWorkingDetails.name}
                    onChange={handleInputChange}
                    fullWidth
                  />
                  <TextField
                    label="Passing Year"
                    name="relativesWorkingDetails.passingYear"
                    value={formValues.relativesWorkingDetails.passingYear}
                    onChange={handleInputChange}
                    fullWidth
                  />
                  <TextField
                    label="Relation"
                    name="relativesWorkingDetails.relation"
                    value={formValues.relativesWorkingDetails.relation}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Box>
              )}
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "50%",
            paddingX: "10px",
          }}
        >
          <Box>
            <Typography
              width={"100%"}
              p={1}
              px={2}
              bgcolor={"#E3E0E0"}
              fontWeight={600}
              fontSize={"1rem"}
              borderRadius={"5px"}
            >
              Parent / Guardian Details
            </Typography>

            <Box sx={{ paddingY: "10px" }}>
              <Box
                p={1}
                mt={2}
                bgcolor={"primary.light"}
                width={"14rem"}
                fontWeight={600}
                sx={{
                  clipPath:
                    "polygon(0% 0%, 90% 0, 100% 50%, 90% 100%, 0% 100%)",
                }}
                marginY={"10px"}
              >
                Father's Details
              </Box>

              <Box
                sx={{
                  padding: "10px",
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                }}
              >
                <TextField
                  label="Father's Name"
                  name="fatherName"
                  value={formValues.fatherName}
                  onChange={handleInputChange}
                  fullWidth
                />

                <TextField
                  label="Occupation"
                  name="fatherOccupation"
                  value={formValues.fatherOccupation}
                  onChange={handleInputChange}
                  fullWidth
                />

                <TextField
                  label="Annual Income"
                  name="fatherIncome"
                  value={formValues.fatherIncome}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Box>

              <Box
                sx={{
                  padding: "10px",
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                }}
              >
                <TextField
                  label="Contact Number"
                  name="fatherContactNumber"
                  value={formValues.fatherContactNumber}
                  onChange={(event) => {
                    const newContactNumber = event.target.value.replace(
                      /[^0-9]/g,
                      ""
                    ); // Remove non-numeric characters
                    if (newContactNumber.length <= 10) {
                      setFormValues({
                        ...formValues,
                        fatherContactNumber: newContactNumber,
                      });
                    }
                  }}
                  fullWidth
                  inputProps={{ maxLength: 10 }}
                />

                <TextField
                  label="Email ID"
                  name="fatherEmail"
                  value={formValues.fatherEmail}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Box>

              <Box
                sx={{
                  padding: "10px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <Typography sx={{ fontWeight: "600" }}>ID Proof: </Typography>
                <Tooltip title="Update Father's Valid ID Proof">
                  <IconButton component="label">
                    <UploadFileIcon />
                    <input
                      type="file"
                      name="fatherIDProof"
                      onChange={handleFileChange}
                      hidden
                    />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            <Box sx={{ paddingY: "10px" }}>
              <Box
                p={1}
                mt={2}
                bgcolor={"primary.light"}
                width={"14rem"}
                fontWeight={600}
                sx={{
                  clipPath:
                    "polygon(0% 0%, 90% 0, 100% 50%, 90% 100%, 0% 100%)",
                }}
                marginY={"10px"}
              >
                Mother's Details
              </Box>

              <Box
                sx={{
                  padding: "10px",
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                }}
              >
                <TextField
                  label="Mother's Name"
                  name="motherName"
                  value={formValues.motherName}
                  onChange={handleInputChange}
                  fullWidth
                />

                <TextField
                  label="Occupation"
                  name="motherOccupation"
                  value={formValues.motherOccupation}
                  onChange={handleInputChange}
                  fullWidth
                />

                <TextField
                  label="Annual Income"
                  name="motherIncome"
                  value={formValues.motherIncome}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Box>

              <Box
                sx={{
                  padding: "10px",
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                }}
              >
                <TextField
                  label="Contact Number"
                  name="motherContactNumber"
                  value={formValues.motherContactNumber}
                  onChange={(event) => {
                    const newContactNumber = event.target.value.replace(
                      /[^0-9]/g,
                      ""
                    ); // Remove non-numeric characters
                    if (newContactNumber.length <= 10) {
                      setFormValues({
                        ...formValues,
                        motherContactNumber: newContactNumber,
                      });
                    }
                  }}
                  fullWidth
                  inputProps={{ maxLength: 10 }}
                />

                <TextField
                  label="Email ID"
                  name="motherEmail"
                  value={formValues.motherEmail}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Box>

              <Box
                sx={{
                  padding: "10px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <Typography sx={{ fontWeight: "600" }}>ID Proof: </Typography>
                <Tooltip title="Update Mother's Valid ID Proof">
                  <IconButton component="label">
                    <UploadFileIcon />
                    <input
                      type="file"
                      name="motherIDProof"
                      onChange={handleFileChange}
                      hidden
                    />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            <Box sx={{ paddingY: "10px" }}>
              <Box
                p={1}
                mt={2}
                bgcolor={"primary.light"}
                width={"14rem"}
                fontWeight={600}
                sx={{
                  clipPath:
                    "polygon(0% 0%, 90% 0, 100% 50%, 90% 100%, 0% 100%)",
                }}
                marginY={"10px"}
              >
                Guardian's Details
              </Box>

              <Box
                sx={{
                  padding: "10px",
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                }}
              >
                <TextField
                  label="Guardian's Name"
                  name="guardianName"
                  value={formValues.guardianName}
                  onChange={handleInputChange}
                  fullWidth
                />

                <TextField
                  label="Occupation"
                  name="guardianOccupation"
                  value={formValues.guardianOccupation}
                  onChange={handleInputChange}
                  fullWidth
                />

                <TextField
                  label="Annual Income"
                  name="guardianIncome"
                  value={formValues.guardianIncome}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Box>

              <Box
                sx={{
                  padding: "10px",
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                }}
              >
                <TextField
                  label="Contact Number"
                  name="guardianContactNumber"
                  value={formValues.guardianContactNumber}
                  onChange={(event) => {
                    const newContactNumber = event.target.value.replace(
                      /[^0-9]/g,
                      ""
                    ); // Remove non-numeric characters
                    if (newContactNumber.length <= 10) {
                      setFormValues({
                        ...formValues,
                        guardianContactNumber: newContactNumber,
                      });
                    }
                  }}
                  fullWidth
                  inputProps={{ maxLength: 10 }}
                />

                <TextField
                  label="Email ID"
                  name="guardianEmail"
                  value={formValues.guardianEmail}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Box>

              <Box
                sx={{
                  padding: "10px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <Typography sx={{ fontWeight: "600" }}>ID Proof: </Typography>
                <Tooltip title="Update Guardian's Valid ID Proof">
                  <IconButton component="label">
                    <UploadFileIcon />
                    <input
                      type="file"
                      name="guardianIDProof"
                      onChange={handleFileChange}
                      hidden
                    />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>

          <Box>
            <Typography
              width={"100%"}
              p={1}
              px={2}
              bgcolor={"#E3E0E0"}
              fontWeight={600}
              fontSize={"1rem"}
              borderRadius={"5px"}
            >
              Address Details
            </Typography>

            <Box
              p={1}
              mt={2}
              bgcolor={"primary.light"}
              width={"14rem"}
              fontWeight={600}
              sx={{
                clipPath: "polygon(0% 0%, 90% 0, 100% 50%, 90% 100%, 0% 100%)",
              }}
              marginY={"10px"}
            >
              Permanent Address
            </Box>

            <Typography sx={{ fontWeight: "600" }}>Address Line 1:</Typography>

            <TextField
              label="Address Line 1"
              name="addressLine1"
              value={formValues.addressLine1}
              onChange={handleInputChange}
              fullWidth
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px",
              }}
            >
              <Typography sx={{ fontWeight: "600" }}>Country:</Typography>
              <TextField
                label="Country"
                name="country1"
                value={formValues.country1}
                onChange={handleInputChange}
              />

              <Typography sx={{ fontWeight: "600" }}>State:</Typography>

              <TextField
                label="State"
                name="state1"
                value={formValues.state1}
                onChange={handleInputChange}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px",
                gap: "10px",
              }}
            >
              <Typography sx={{ fontWeight: "600" }}>City:</Typography>

              <TextField
                label="City"
                name="city1"
                value={formValues.city1}
                onChange={handleInputChange}
              />
              <Typography sx={{ fontWeight: "600" }}>District:</Typography>

              <TextField
                label="District"
                name="district1"
                value={formValues.district1}
                onChange={handleInputChange}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px",
                gap: "10px",
              }}
            >
              <Typography sx={{ fontWeight: "600" }}>Pin Code:</Typography>

              <TextField
                label="Pin Code"
                name="pinCode1"
                value={formValues.pinCode1}
                onChange={(event) => {
                  const newPinCode = event.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                  if (newPinCode.length <= 6) {
                    setFormValues({ ...formValues, pinCode1: newPinCode });
                  }
                }}
              />

              <Typography sx={{ fontWeight: "600", width: "250px" }}>
                Address Proof:
              </Typography>

              <Tooltip title="Update Father's Valid ID Proof">
                <IconButton component="label">
                  <UploadFileIcon />
                  <input
                    type="file"
                    name="fatherIDProof"
                    onChange={handleFileChange}
                    hidden
                  />
                </IconButton>
              </Tooltip>
            </Box>

            <Box
              p={1}
              mt={2}
              bgcolor={"primary.light"}
              width={"14rem"}
              fontWeight={600}
              sx={{
                clipPath: "polygon(0% 0%, 90% 0, 100% 50%, 90% 100%, 0% 100%)",
              }}
              marginY={"10px"}
            >
              Current Address
            </Box>

            <Typography sx={{ fontWeight: "600" }}>Address Line 2:</Typography>

            <TextField
              label="Address Line 2"
              name="addressLine2"
              value={formValues.addressLine2}
              onChange={handleInputChange}
              fullWidth
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px",
              }}
            >
              <Typography sx={{ fontWeight: "600" }}>Country:</Typography>
              <TextField
                label="Country"
                name="country2"
                value={formValues.country2}
                onChange={handleInputChange}
              />

              <Typography sx={{ fontWeight: "600" }}>State:</Typography>

              <TextField
                label="State"
                name="state2"
                value={formValues.state2}
                onChange={handleInputChange}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px",
                gap: "10px",
              }}
            >
              <Typography sx={{ fontWeight: "600" }}>City:</Typography>

              <TextField
                label="City"
                name="city2"
                value={formValues.city2}
                onChange={handleInputChange}
              />
              <Typography sx={{ fontWeight: "600" }}>District:</Typography>

              <TextField
                label="District"
                name="district2"
                value={formValues.district2}
                onChange={handleInputChange}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px",
                gap: "10px",
              }}
            >
              <Typography sx={{ fontWeight: "600" }}>Pin Code:</Typography>

              <TextField
                label="Pin Code"
                name="pinCode1"
                value={formValues.pinCode1}
                onChange={(event) => {
                  const newPinCode = event.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                  if (newPinCode.length <= 6) {
                    setFormValues({ ...formValues, pinCode1: newPinCode });
                  }
                }}
              />

              <Typography sx={{ fontWeight: "600", width: "250px" }}>
                Address Proof:
              </Typography>

              <Tooltip title="Update Father's Valid ID Proof">
                <IconButton component="label">
                  <UploadFileIcon />
                  <input
                    type="file"
                    name="fatherIDProof"
                    onChange={handleFileChange}
                    hidden
                  />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", padding: "10px" }}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ width: "500px" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>

      <Dialog open={confirmation} onClose={() => setConfirmation(false)}>
        <DialogTitle>
          <Typography variant="h6">Confirmation</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to discard the changes?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setConfirmation(false)}
            color="primary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleSubmit();
            }}
            color="primary"
            variant="contained"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default OnBoardingEdit;
