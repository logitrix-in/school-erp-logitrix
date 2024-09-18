import {
  Box,
  Button,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import { useState } from "react";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import Bbox from "../../../UiComponents/Bbox";
import RevealCard from "../../../AnimationComponents/RevealCard";
import { DatePicker } from "@mui/x-date-pickers";

function OfflineApplicationForm() {
  const [candidate, setCandidate] = useState(null);

  const {
    register,
    formState: { errors },
    control,
    watch,
  } = useForm({
    defaultValues: {
      blood_group: "",
      physician_number: "",
      migration_certificate: "",
      activity: "",
      payment_type: "Challan No",
    },
  });

  const err = (name) => {
    return {
      error: !!errors[name],
      helperText: errors[name]?.message,
    };
  };

  return (
    <>
      <Box>
        {/* Top text and close icon */}
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
            Offline Application Form
          </Typography>

          {/* {searchParams.get("admin") == "true" && ( */}

          {/* close icon */}
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            gap={2}
            alignItems={"center"}
            sx={{
              cursor: "pointer",
              color: "white",
              ":hover": {
                color: "#2b2b2b !important",
              },
            }}
          >
            <Icon
              onClick={() => navigate("/employee/manage/")}
              icon="fa:close"
              fontSize={"1.2rem"}
              color="inherit"
            />
          </Box>
        </Box>

        <RevealCard>
          <Bbox borderRadius={2} overflow={"hidden"} my={2} mx={2}>
            <Box p={2}>
              <Stack spacing={2}>
                <Stack direction={"row"} spacing={2}>
                  <Stack flex={1} spacing={2}>
                    <PersonalDetails
                      candidate={candidate}
                      register={register}
                      err={err}
                      control={control}
                      watch={watch}
                    />
                    <ApplicationDetails
                      candidate={candidate}
                      register={register}
                      err={err}
                    />
                  </Stack>
                  <Stack flex={1} spacing={2}>
                    <PermanentAddress
                      candidate={candidate}
                      register={register}
                      err={err}
                    />
                    <CurrentAddress
                      candidate={candidate}
                      register={register}
                      err={err}
                    />
                    <Other
                      candidate={candidate}
                      register={register}
                      err={err}
                    />
                    <Referral
                      candidate={candidate}
                      register={register}
                      err={err}
                    />
                  </Stack>
                </Stack>

                <EmploymentHistory candidate={candidate} register={register} err={err} />
              </Stack>
            </Box>
          </Bbox>
        </RevealCard>

        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => { toast.success('Submited'); navigate("/employee/recruitment/applications") }}
        >
          Submit
        </Button>
      </Box>
    </>
  );
}

// Left side forms

const PersonalDetails = ({ candidate, register, err, control, watch }) => {

  return (
    <Box sx={{ py: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Typography variant="subtitle1" gutterBottom>
              Candidate's Image
            </Typography>
            <Typography gutterBottom>
              Dimension: 3.5*4.5 cm Size Limit: 100KB
            </Typography>
          </Box>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
          // onChange={handleFileChange}
          />
          <label htmlFor="raised-button-file">
            <Button variant="contained" component="span" fullWidth>
              Upload
            </Button>
          </label>
          {/* {selectedFile && <Typography variant="caption">{selectedFile.name}</Typography>} */}
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Candidate's Name
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField fullWidth label="First" placeholder="Enter First Name" required />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField fullWidth label="Middle" placeholder="Enter Middle Name" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField fullWidth label="Last" placeholder="Enter Last Name" required />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Contact Details
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Contact Number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                    <img src="https://flagcdn.com/w20/in.png" width="20" alt="Indian flag" />
                    +91
                  </Box>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField fullWidth label="Email ID" placeholder="Enter Email ID" />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Personal Details
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Nationality</InputLabel>
            <Select defaultValue="Indian">
              <MenuItem value="Indian">Indian</MenuItem>
              {/* Add other nationalities as needed */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Religion</InputLabel>
            <Select>
              <MenuItem value="">Select</MenuItem>
              {/* Add religion options */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select>
              <MenuItem value="">Select</MenuItem>
              {/* Add category options */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Marital Status</InputLabel>
            <Select>
              <MenuItem value="">Select</MenuItem>
              {/* Add marital status options */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
          <DatePicker
            label="Date of Birth"
            // value={birthDate}
            // onChange={(newValue) => setBirthDate(newValue)}
            renderInput={(params) => <TextField {...params} fullWidth sx={{ width: '100%' }} />}
            inputFormat="dd/MM/yyyy"
          />
          {/* </LocalizationProvider> */}
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select>
              <MenuItem value="">Select</MenuItem>
              {/* Add gender options */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Critical Medical Ailment (if Any)</InputLabel>
            <Select>
              <MenuItem value="">Select</MenuItem>
              {/* Add medical ailment options */}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box >
  );
};


const ApplicationDetails = ({ candidate, register, err }) => {
  return (
    <Box>
      <Typography
        width={"100%"}
        p={1}
        px={2}
        bgcolor={"#E3E0E0"}
        fontWeight={600}
        fontSize={"1rem"}
        borderRadius={1}
      >
        Application Details
      </Typography>

      <Box sx={{ py: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="job-id-label">Job ID</InputLabel>
              <Select
                labelId="job-id-label"
                id="job-id"
                label="Job ID**"
              >
                <MenuItem value="">Select</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2">Employee Type : NA</Typography>
                <Typography variant="body2">Role : NA</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">Department : NA</Typography>
                <Typography variant="body2">Class Scope : NA</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="work-location-label">Preferred Work Location</InputLabel>
              <Select
                labelId="work-location-label"
                id="work-location"
                label="Preferred Work Location*"
              >
                <MenuItem value="">Select</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>Qualification:</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth>
                  <InputLabel id="degree-label">Degree</InputLabel>
                  <Select labelId="degree-label" id="degree" label="Degree">
                    <MenuItem value="">Select</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth>
                  <InputLabel id="specialization-label">Specialization</InputLabel>
                  <Select labelId="specialization-label" id="specialization" label="Specialization">
                    <MenuItem value="">Select</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth>
                  <InputLabel id="university-label">University</InputLabel>
                  <Select labelId="university-label" id="university" label="University**">
                    <MenuItem value="">Select</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField fullWidth label="School/College" placeholder="Enter Name" />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField fullWidth label="Percentage Secured/ CGPA" placeholder="Enter % Secured" />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Button startIcon={<>+</>} color="primary">
              Add New
            </Button>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel id="language-label">Language</InputLabel>
              <Select labelId="language-label" id="language" label="Language">
                <MenuItem value="">Select</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel id="proficiency-label">Proficiency</InputLabel>
              <Select labelId="proficiency-label" id="proficiency" label="Proficiency">
                <MenuItem value="">Select</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Read" />
            <FormControlLabel control={<Checkbox />} label="Write" />
            <FormControlLabel control={<Checkbox defaultChecked />} label="Speak" />
          </Grid>

          <Grid item xs={12}>
            <Button startIcon={<>+</>} color="primary">
              Add New
            </Button>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="computer-proficiency-label">Basic Computer Proficiency</InputLabel>
              <Select labelId="computer-proficiency-label" id="computer-proficiency" label="Basic Computer Proficiency">
                <MenuItem value="">Select</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const EmploymentHistory = ({ candidate, register, err }) => {
  return (
    <Box>
      <Typography
        width={"100%"}
        p={1}
        px={2}
        bgcolor={"#E3E0E0"}
        fontWeight={600}
        fontSize={"1rem"}
        borderRadius={1}
      >
        Employment History
      </Typography>

    </Box>
  );
};

// Right side forms

const PermanentAddress = ({
  candidate,
  register,
  err,
}) => {
  return (
    <Box>
      <Typography
        width={"100%"}
        p={1}
        px={2}
        bgcolor={"#E3E0E0"}
        fontWeight={600}
        fontSize={"1rem"}
        borderRadius={1}
      >
        Permanent Address
      </Typography>


      <Box sx={{ py: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              placeholder="Street Name/Flat/House No/Floor/Building/Area"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Country</InputLabel>
              <Select defaultValue="India" label="Country">
                <MenuItem value="India">India</MenuItem>
                {/* Add more countries as needed */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>State</InputLabel>
              <Select label="State">
                <MenuItem value="">Select</MenuItem>
                {/* Add states here */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>City</InputLabel>
              <Select label="City">
                <MenuItem value="">Select</MenuItem>
                {/* Add cities here */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>District</InputLabel>
              <Select label="District">
                <MenuItem value="">Select</MenuItem>
                {/* Add districts here */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Pincode</InputLabel>
              <Select label="Pincode">
                <MenuItem value="">Select</MenuItem>
                {/* Add pincodes here */}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const CurrentAddress = ({ candidate, register, err }) => {

  const [sameAsPermanent, setSameAsPermanent] = useState(false);

  const handleCheckboxChange = (event) => {
    setSameAsPermanent(event.target.checked);
    // Here you would typically copy the permanent address data if checked
  };

  return (
    <Box>
      <Typography
        width={"100%"}
        p={1}
        px={2}
        bgcolor={"#E3E0E0"}
        fontWeight={600}
        fontSize={"1rem"}
        borderRadius={1}
      >
        Current Address
      </Typography>

      <Box sx={{ py: 1 }}>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={sameAsPermanent}
                  onChange={handleCheckboxChange}
                />
              }
              label="Same as Permanent Address"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              placeholder="Street Name/Flat/House No/Floor/Building/Area"
              variant="outlined"
              disabled={sameAsPermanent}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Country</InputLabel>
              <Select defaultValue="India" label="Country" disabled={sameAsPermanent}>
                <MenuItem value="India">India</MenuItem>
                {/* Add more countries as needed */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>State</InputLabel>
              <Select label="State"
                disabled={sameAsPermanent}>
                <MenuItem value="">Select</MenuItem>
                {/* Add states here */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>City</InputLabel>
              <Select label="City" disabled={sameAsPermanent}>
                <MenuItem value="">Select</MenuItem>
                {/* Add cities here */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>District</InputLabel>
              <Select label="District" disabled={sameAsPermanent}>
                <MenuItem value="">Select</MenuItem>
                {/* Add districts here */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Pincode</InputLabel>
              <Select label="Pincode" disabled={sameAsPermanent}>
                <MenuItem value="">Select</MenuItem>
                {/* Add pincodes here */}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const Other = ({ candidate, register, err }) => {

  const [studyingRelative, setStudyingRelative] = useState('No');
  const [workingRelative, setWorkingRelative] = useState('No');

  const handleStudyingChange = (event, newValue) => {
    if (newValue !== null) {
      setStudyingRelative(newValue);
    }
  };

  const handleWorkingChange = (event, newValue) => {
    if (newValue !== null) {
      setWorkingRelative(newValue);
    }
  };

  return (
    <Box>
      <Typography
        width={"100%"}
        p={1}
        px={2}
        bgcolor={"#E3E0E0"}
        fontWeight={600}
        fontSize={"1rem"}
        borderRadius={1}
      >
        Other
      </Typography>

      <Box sx={{ py: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              Has any of your relative(s) studied/currently been studying in Demo School?
            </Typography>
            <ToggleButtonGroup
              color="primary"
              value={studyingRelative}
              exclusive
              onChange={handleStudyingChange}
              sx={{ mb: 2 }}
            >
              <ToggleButton value="Yes">Yes</ToggleButton>
              <ToggleButton value="No">No</ToggleButton>
            </ToggleButtonGroup>
          </Grid>

          {studyingRelative === 'Yes' && (
            <>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Name</InputLabel>
                  <Select label="Name">
                    <MenuItem value="">Select</MenuItem>
                    {/* Add names here */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Student ID</InputLabel>
                  <Select label="Student ID">
                    <MenuItem value="">Select</MenuItem>
                    {/* Add student IDs here */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Relationship Type</InputLabel>
                  <Select label="Relationship Type">
                    <MenuItem value="">Select</MenuItem>
                    {/* Add relationship types here */}
                  </Select>
                </FormControl>
              </Grid>
            </>
          )}

          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              Has any of your relative(s) worked/currently been working in Demo School?
            </Typography>
            <ToggleButtonGroup
              color="primary"
              value={workingRelative}
              exclusive
              onChange={handleWorkingChange}
              sx={{ mb: 2 }}
            >
              <ToggleButton value="Yes">Yes</ToggleButton>
              <ToggleButton value="No">No</ToggleButton>
            </ToggleButtonGroup>
          </Grid>

          {workingRelative === 'Yes' && (
            <>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Name</InputLabel>
                  <Select label="Name">
                    <MenuItem value="">Select</MenuItem>
                    {/* Add names here */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Employee ID</InputLabel>
                  <Select label="Employee ID">
                    <MenuItem value="">Select</MenuItem>
                    {/* Add employee IDs here */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Relationship Type</InputLabel>
                  <Select label="Relationship Type">
                    <MenuItem value="">Select</MenuItem>
                    {/* Add relationship types here */}
                  </Select>
                </FormControl>
              </Grid>
            </>
          )}

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Where did you hear about us?</InputLabel>
              <Select label="Where did you hear about us?">
                <MenuItem value="">Select</MenuItem>
                {/* Add options here */}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const Referral = ({ candidate, register, err }) => {
  return (
    <Box>
      <Typography
        width={"100%"}
        p={1}
        px={2}
        bgcolor={"#E3E0E0"}
        fontWeight={600}
        fontSize={"1rem"}
        borderRadius={1}
      >
        Referral
      </Typography>


    </Box>
  );
};

export default OfflineApplicationForm;
