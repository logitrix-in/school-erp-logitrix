import CloseIcon from "@mui/icons-material/Close";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import nationalities from "../../../../assets/nationalities.json";

import { Icon } from "@iconify/react";
import { InfoRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import axios from "axios";
import debounce from "lodash.debounce";
import MuiPhoneNumber from "material-ui-phone-number";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import api from "../../../../config/api";
import dayjs from "dayjs";
import useClasses from "../../../../hooks/useClasses";
import ReignsSelect from "../../../UiComponents/ReignsSelect";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function OfflineApplicationForm({ open, close }) {
  const [countries, setCounties] = useState([]);
  const [permStates, setPermStates] = useState([]);
  const [permCities, setPermCities] = useState([]);

  const [curState, setCurState] = useState([]);
  const [curCities, setCurCities] = useState([]);

  const [board, setBoard] = useState("");
  const [medium, setMedium] = useState("");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    middle_name: "",
    dob: "",
    gender: "",
    is_critical_ailment: false,
    critical_ailment: "",
    nationality: "Indian",
    religion: "",
    category: "",
    contact_number: "",
    email: "",
    profile_photo: "",
    applying_for: "",
    admission_year: "",
    current_class: "",
    percentage_secured: "",
    caste: "",
    school_name: "",
    board: "",
    medium: "",
    permanent_address: "",
    permanent_country: "IN",
    permanent_states: "",
    permanent_cities: "",
    permanent_district: "",
    permanent_pin_code: "",
    is_same_as_permanent_address: "",
    current_address: "",
    current_country: "IN",
    current_states: "",
    current_cities: "",
    current_district: "",
    current_pin_code: "",
    father_name: "",
    father_occupation: "",
    father_annual_income: "",
    father_contact_number: "",
    father_email: "",
    mother_name: "",
    mother_occupation: "",
    mother_annual_income: "",
    mother_email: "",
    mother_contact_number: "",
    guardian_name: "",
    guardian_occupation: "",
    guardian_annual_income: "",
    guardian_contact_number: "",
    guardian_email: "",
    payment_date: "",
    payment_mode: "",
    primary_contact: "candidate",
    relationType: "",
    receipt_no: "",
    type: "offline",
  });

  const convertObjectToFormData = (obj) => {
    const formData = new FormData();

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        formData.append(key, obj[key]);
      }
    }

    return formData;
  };

  const [loading, setLoading] = useState(false);

  const [devMode, setDevMode] = useState(false);

  const handleKeyPress = (event) => {
    if (event.ctrlKey || event.metaKey) {
      if (event.key === "/") {
        toast.dismiss();
        setDevMode((prev) => !prev);
      }
    }
  };

  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    devMode
      ? toast.dark("Dev mode On", {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
        autoClose: 500,
        closeButton: false,
        style: {
          textAlign: "center",
          color: "#5cda46",
          background:
            "url(data:image/jpeg;base64,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)",
          backgroundSize: "cover",
        },
      })
      : toast.error("Dev mode Off", {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
        autoClose: 500,
        closeButton: false,
      });
  }, [devMode]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  var required = [
    "first_name",
    "last_name",
    "dob",
    "gender",
    // "is_critical_ailment",
    // "critical_ailment",
    "nationality",
    "religion",
    "category",
    // "contact_number",
    // "email",
    "profile_photo",
    "applying_for",
    "admission_year",
    // "current_class",
    // "percentage_secured",
    // "",
    // "school_name",
    // "board",
    // "medium",
    "permanent_address",
    "permanent_country",
    "permanent_states",
    "permanent_cities",
    "permanent_pin_code",
    // "is_same_as_permanent_address",
    // "current_address",
    // "current_country",
    // "current_states",
    // "current_cities",
    // "current_pin_code",
    "father_name",
    "father_occupation",
    "father_annual_income",
    // "father_contact_number",
    // "father_email",
    "mother_name",
    "mother_occupation",
    "mother_annual_income",
    // "mother_email",
    // "mother_contact_number",
    // "guardian_name",
    // "guardian_occupation",
    // "guardian_annual_income",
    // "guardian_contact_number",
    // "guardian_email",
    // "relationType",
    "payment_date",
    "payment_mode",
    "primary_contact",
    "receipt_no",
    "type",
  ];

  function sentenceCase(str) {
    if (str === null || str === "") return false;
    else str = str.toString();

    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  const onSubmit = () => {
    toast.dismiss();

    if (formData.is_critical_ailment && formData.critical_ailment == "")
      return toast.error("Critical Ailment is Required.", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });

    if (
      [
        formData.father_email,
        formData.mother_email,
        formData.guardian_email,
        formData.email,
      ].every((val) => val == "")
    )
      return toast.error("At least one email is required", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });

    if (
      formData.father_occupation == "Not Applicable" &&
      formData.mother_occupation == "Not Applicable"
    ) {
      required = required.concat([
        "guardian_name",
        "guardian_occupation",
        "guardian_annual_income",
        "guardian_contact_number",
        "guardian_email",
        "relationType",
      ]);
    }

    if (!["Nursery", "PP1", "PP2", "I"].includes(formData.applying_for))
      required = required.concat([
        "current_class",
        "percentage_secured",
        "school_name",
        "board",
        "medium",
      ]);

    console.log(required);
    // check required

    var flag = true;

    for (let i = 0; i < required.length; i++) {
      if (formData[required[i]] == "" || formData[required[i]] == null) {
        flag = false;
        toast.error(
          `${sentenceCase(required[i].replaceAll("_", " "))} are required `,
          {
            position: "top-right",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "dark",
          }
        );
        break;
      }
    }
    if (!flag) return;

    setLoading(true);
    api
      .post("/admission/application/", convertObjectToFormData(formData), {
        "Content-Type": "multipart/form-data",
      })
      .then((res) => {
        close();
        toast.success("Application has been submitted successfully");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => setLoading(false));
  };

  const nationalityCategories = nationalities;

  const religionOptions = useMemo(() => [
    "Christianity",
    "Islam",
    "Hinduism",
    "Buddhism",
    "Judaism",
    "Sikhism",
    "Jainism",
    "Bahá'í Faith",
    "Shintoism",
    "Taoism",
    "Zoroastrianism",
    "Atheism",
    "Agnosticism",
    "Other / Not specified",
  ]);

  const [classOptions, setClasses] = useState([]);

  const { classes } = useClasses();

  const categoryOptions = [
    "Unreserved",
    "OBC-A",
    "OBC-B",
    "SC",
    "ST",
    "EWS",
    "PwD",
  ];
  const admissionYearOptions = ["2023-24", "2024-25", "2025-26"];
  const specializationOptions = [
    "Science",
    "Commerce",
    "Humanities",
    "Arts",
    "Others",
  ];
  const boardOptions = ["CBSE", "ICSE", "ISC", "WBBSE", "WBCHSE", "Others"];
  const mediumOptions = ["English", "Bengali", "Hindi", "Others"];
  const OccupationOptions = [
    "Service",
    "Business",
    "Self-Employed",
    "Unemployed",
    "Retired",
    "Homemaker",
    "Others",
    "Not Applicable",
  ];
  const paymentOptions = ["Online", "Offline - Challan", "Offline - Cash"];
  // country

  useEffect(() => {
    api
      .get(
        "/admission/application/manage-application/?date_format=calendar&is_active=1"
      )
      .then((res) => {
        setClasses(res.data.map((d) => d.class_name));
      });

    axios
      .get("https://api.countrystatecity.in/v1/countries", {
        headers: {
          "X-CSCAPI-KEY":
            "UktWSUFIa0VSazU1V1ZpZnRKN0IzNFVlWjRtWlR4bDl0Tm43RFcyNA==",
        },
      })
      .then((res) => {
        setCounties(res.data);
      });
  }, []);

  // permanent state
  useEffect(() => {
    if (formData.permanent_country == "") return;
    axios
      .get(
        `https://api.countrystatecity.in/v1/countries/${formData.permanent_country}/states`,
        {
          headers: {
            "X-CSCAPI-KEY":
              "UktWSUFIa0VSazU1V1ZpZnRKN0IzNFVlWjRtWlR4bDl0Tm43RFcyNA==",
          },
        }
      )
      .then((res) => setPermStates(res.data));
  }, [formData.permanent_country]);

  // permanent city
  useEffect(() => {
    if (formData.permanent_states == "") return;

    axios
      .get(
        `https://api.countrystatecity.in/v1/countries/IN/states/${formData.permanent_states}/cities/`,
        {
          headers: {
            "X-CSCAPI-KEY":
              "UktWSUFIa0VSazU1V1ZpZnRKN0IzNFVlWjRtWlR4bDl0Tm43RFcyNA==",
          },
        }
      )
      .then((res) => setPermCities(res.data));
  }, [formData.permanent_states]);

  // current state
  useEffect(() => {
    if (formData.current_country == "") return;
    axios
      .get(
        `https://api.countrystatecity.in/v1/countries/${formData.current_country}/states`,
        {
          headers: {
            "X-CSCAPI-KEY":
              "UktWSUFIa0VSazU1V1ZpZnRKN0IzNFVlWjRtWlR4bDl0Tm43RFcyNA==",
          },
        }
      )
      .then((res) => setCurState(res.data));
  }, [formData.current_country]);

  // current city
  useEffect(() => {
    if (formData.current_states == "") return;

    axios
      .get(
        `https://api.countrystatecity.in/v1/countries/IN/states/${formData.current_states}/cities/`,
        {
          headers: {
            "X-CSCAPI-KEY":
              "UktWSUFIa0VSazU1V1ZpZnRKN0IzNFVlWjRtWlR4bDl0Tm43RFcyNA==",
          },
        }
      )
      .then((res) => setCurCities(res.data));
  }, [formData.current_states]);

  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };

      reader.readAsDataURL(image);
    } else {
      setImagePreview(null);
    }
  }, [image]);

  function handleImageChange(e) {
    const selectedFile = e.target.files[0];

    if (selectedFile.size > 102400)
      return toast.error(
        "Photograph size limit exceeded. Maximum acceptable size limit is 100 KB."
      );

    // var _URL = window.URL || window.webkitURL;

    // var img;
    // img = new Image();
    // var objectUrl = _URL.createObjectURL(selectedFile);
    // img.onload = function () {
    //   ;
    //   _URL.revokeObjectURL(objectUrl);
    // };
    // img.src = objectUrl;

    setImage(selectedFile);
    setFormData((prevFormData) => ({
      ...prevFormData,
      profile_photo: selectedFile,
    }));
  }

  function handleChange(e) {
    var { name, value } = e.target;

    if (name == "primary_contact" && value == formData.primary_contact)
      value = "";
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  const [PAC, setPAC] = useState(false);
  const imageRef = useRef();

  const [do_agree, setDoAgree] = useState(false);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={close}
      TransitionComponent={Transition}
    >
      <ToastContainer />
      <AppBar sx={{ position: "fixed" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={close}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} fontSize={"1rem"}>
            Offline Application
          </Typography>
        </Toolbar>
      </AppBar>
      <Box display={"flex"} p={3} alignItems={"flex-start"}>
        <Grid container px={4} spacing={1} rowSpacing={2} flex={2}>
          <Grid item xs={12}>
            <Typography
              p={1}
              borderRadius={1}
              bgcolor={"#ececec"}
              fontWeight={500}
              mb={1}
            >
              Personal Details
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography fontWeight={600}>Candidate's Image</Typography>
            <Typography>
              <b>Dimension: </b> 3.5 x 4.5 cm <b>Size Limit: </b>100 KB
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            mb={2}
            display={"flex"}
            alignItems={"stretch"}
            gap={2}
          >
            <input
              type="file"
              hidden
              ref={imageRef}
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img
                style={{
                  borderRadius: "10px",
                  height: "150px",
                  width: "150px",
                  objectFit: "contain",
                  background: "whitesmoke",
                }}
                src={imagePreview}
                alt="Preview"
              />
            )}
            <Box flex={1} display={"flex"} flexDirection={"column"}>
              {image && <Typography fontWeight={500}>{image.name}</Typography>}
              {image && <Typography>{image.type}</Typography>}
              {image && (
                <Typography>
                  {(image.size / (1024 * 1024)).toFixed(2) + "MB"}
                </Typography>
              )}
              <Button
                sx={{ mt: "auto" }}
                variant="contained"
                fullWidth
                onClick={() => imageRef.current.click()}
              >
                Upload
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography fontWeight={600}>Candidate's Name</Typography>
          </Grid>

          <Grid item xs={4}>
            <TextField
              fullWidth
              required
              label="First"
              // value={formData.first_name}
              name="first_name"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Middle"
              // value={formData.middle_name}
              name="middle_name"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              fullWidth
              label="Last"
              // value={formData.last_name}
              name="last_name"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography fontWeight={600} mt={2}>
              Contact Details
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <MuiPhoneNumber
              defaultCountry={"in"}
              variant="outlined"
              fullWidth
              label="Contact Number"
              name="contact_number"
              onChange={(value) => {
                const e = {
                  target: {
                    name: "contact_number",
                    value,
                  },
                };
                handleChange(e);
              }}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              // value={formData.email}
              onChange={handleChange}
              name="email"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              name="primary_contact"
              value="Candidate"
              control={
                <Checkbox checked={formData.primary_contact == "Candidate"} />
              }
              onChange={handleChange}
              label="Set as primary contact"
            />
            <Tooltip
              arrow
              placement="right"
              title="School authority will treat this contact number as the first point of contact for all further communication."
            >
              <IconButton>
                <Icon icon={"ic:round-info"} fontSize={"1.6rem"} />
              </IconButton>
            </Tooltip>
          </Grid>

          <Grid item xs={12}>
            <Typography fontWeight={600} mt={2}>
              Other Details
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Nationality</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Nationality"
                onChange={handleChange}
                name="nationality"
                value={formData.nationality}
              >
                {nationalityCategories.map((category, index) => (
                  <MenuItem key={index} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Religion</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Religion"
                onChange={handleChange}
                name="religion"
              // value={formData.religion}
              >
                {religionOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Category"
                onChange={handleChange}
                name="category"
              // value={formData.category}
              >
                {categoryOptions.map((cat, idx) => (
                  <MenuItem key={idx} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <DatePicker
                label="Date of Birth"
                format="DD MMM YYYY"
                onChange={(date) => {
                  const _date = new Date(date);
                  const year = _date.getFullYear();
                  const month = String(_date.getMonth() + 1).padStart(2, "0");
                  const day = String(_date.getDate()).padStart(2, "0");

                  const formattedDate = `${year}-${month}-${day}`;
                  setFormData((prev) => ({ ...prev, dob: formattedDate }));
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Gender"
                onChange={handleChange}
                name="gender"
              // value={formData.gender}
              >
                <MenuItem value={"male"}>Male</MenuItem>
                <MenuItem value={"female"}>Female</MenuItem>
                <MenuItem value={"other"}>Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Critical Medical Ailment (if any)
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Critical Medical Ailment (if any)"
                onChange={handleChange}
                name="is_critical_ailment"
                // defaultValue={false}
                value={formData.is_critical_ailment}
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {formData.is_critical_ailment && (
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                name="critical_ailment"
                fullWidth
                placeholder="Critical Condition"
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <Typography
              p={1}
              px={1}
              bgcolor={"#ececec"}
              borderRadius={1}
              color={"black"}
              fontWeight={500}
              mb={1}
              mt={2}
            >
              Application Details
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="applying-for-label">Applying For</InputLabel>
              <Select
                labelId="applying-for-label"
                id="applying-for"
                label="Applying For"
                name="applying_for"
                onChange={handleChange}
              // value={formData.applying_for}
              >
                {classOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="admission-year-label">Admission Year</InputLabel>
              <Select
                required
                labelId="admission-year-label"
                id="admission-year"
                label="Admission Year"
                name="admission_year"
                onChange={handleChange}
              // value={formData.admission_year}
              >
                {admissionYearOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="current-class-label">Current Class</InputLabel>
              <Select
                labelId="current-class-label"
                id="current-class"
                label="Current Class"
                name="current_class"
                onChange={handleChange}
                disabled={["Nursery", "PP1", "PP2", "I"].some(
                  (v) => v == formData.applying_for
                )}
              // value={formData.current_class}
              >
                {classes.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <TextField
              fullWidth
              label="% secured in Prev. Class Final Exam"
              name="percentage_secured"
              type="number"
              disabled={["Nursery", "PP1", "PP2", "I"].some(
                (v) => v == formData.applying_for
              )}
              // value={formData.percentage_secured}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={8}>
            <TextField
              fullWidth
              label="School Name"
              name="school_name"
              disabled={["Nursery", "PP1", "PP2", "I"].some(
                (v) => v == formData.applying_for
              )}
              // value={formData.school_name}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="board-label">Board</InputLabel>
              <Select
                labelId="board-label"
                disabled={["Nursery", "PP1", "PP2", "I"].some(
                  (v) => v == formData.applying_for
                )}
                id="board"
                label="Board"
                name="board"
                onChange={handleChange}
              // value={formData.board}
              >
                {boardOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {formData.board == "Others" && (
              <TextField
                sx={{ mt: 0.5 }}
                fullWidth
                placeholder="Board Name"
                name="other_board"
                onChange={handleChange}
              />
            )}
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="medium-label">Medium</InputLabel>
              <Select
                labelId="medium-label"
                disabled={["Nursery", "PP1", "PP2", "I"].some(
                  (v) => v == formData.applying_for
                )}
                id="medium"
                label="Medium"
                name="medium"
                onChange={handleChange}
              // value={formData.medium}
              >
                {mediumOptions.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {formData.medium == "Others" && (
              <TextField
                sx={{ mt: 0.5 }}
                fullWidth
                placeholder="Medium Name"
                // value={medium}
                name="other_medium"
                onChange={handleChange}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography
              p={1}
              px={1}
              bgcolor={"#ececec"}
              borderRadius={1}
              color={"black"}
              fontWeight={500}
              mb={1}
              mt={2}
            >
              Fee Payment Details
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <DatePicker
                label="Payment Date"
                format="DD MMM YYYY"
                onChange={(e) => {
                  const _date = new Date(e);
                  const year = _date.getFullYear();
                  const month = String(_date.getMonth() + 1).padStart(2, "0");
                  const day = String(_date.getDate()).padStart(2, "0");

                  const formattedDate = `${year}-${month}-${day}`;
                  setFormData((prev) => ({
                    ...prev,
                    payment_date: formattedDate,
                  }));
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Payment Mode
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Payment Mode"
                onChange={handleChange}
                name="payment_mode"
              // value={formData.payment_mode}
              >
                {paymentOptions.map((pay, idx) => (
                  <MenuItem key={idx} value={pay}>
                    {pay}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="text"
              fullWidth
              label="Challan No. / Reciept No."
              onChange={handleChange}
              name="receipt_no"
            // value={formData.receipt_no}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              p={1}
              px={1}
              bgcolor={"#ececec"}
              borderRadius={1}
              color={"black"}
              fontWeight={500}
              mb={1}
              mt={2}
            >
              Others
            </Typography>
          </Grid>
          <Question1 handleChange={handleChange} />
          <Question2 handleChange={handleChange} />
        </Grid>
        <Box bgcolor={"grey.300"} width={"1px"}></Box>
        <Grid container px={4} spacing={1} rowSpacing={2} flex={2}>
          <Grid item xs={12}>
            <Typography
              fontSize={"1rem"}
              p={1}
              px={1}
              bgcolor={"#ececec"}
              borderRadius={1}
              color={"black"}
              fontWeight={500}
            >
              Address Details
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography fontWeight={"bold"}>Permanent Address</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Street Name/Flat/House No/Floor/Building/Area"
              name="permanent_address"
              // value={formData.permanent_address}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Country</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Country"
                name="permanent_country"
                onChange={handleChange}
                defaultValue={"IN"}
              // value={formData.permanent_country}
              >
                {countries.map((c, idx) => (
                  <MenuItem key={idx} value={c.iso2}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">State</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                disabled={
                  formData.permanent_country == "" || permStates.length == 0
                }
                label="State"
                onChange={handleChange}
                name="permanent_states"
              // value={formData.permanent_states}
              >
                {permStates.map((s, idx) => (
                  <MenuItem key={idx} value={s.iso2}>
                    {s.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">City</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                disabled={
                  formData.permanent_states == "" || permCities.length == 0
                }
                id="demo-simple-select"
                label="City"
                onChange={handleChange}
                name="permanent_cities"
              // value={formData.permanent_cities}
              >
                {permCities.map((c, idx) => (
                  <MenuItem key={idx} value={c.name}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="District"
              // value={formData.permanent_district}
              onChange={handleChange}
              name="permanent_district"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="number"
              fullWidth
              label="Pin Code"
              // value={formData.permanent_pin_code}
              onChange={handleChange}
              name="permanent_pin_code"
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 6);
              }}
            />
          </Grid>

          <Grid
            item
            xs={12}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography fontWeight={"bold"}>Current Address</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={PAC}
                  onChange={(e, ch) => {
                    setPAC(ch),
                      setFormData((prev) => ({
                        ...prev,
                        is_same_as_permanent_address: ch ? 1 : 0,
                      }));
                  }}
                />
              }
              label="Same as Permanent Address"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              disabled={PAC}
              fullWidth
              onChange={handleChange}
              name="current_address"
              value={
                PAC ? formData.permanent_address : formData.current_address
              }
              label="Street Name/Flat/House No/Floor/Building/Area"
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth disabled={PAC}>
              <InputLabel id="demo-simple-select-label">Country</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Country"
                name="current_country"
                onChange={handleChange}
                defaultValue={"IN"}
                value={
                  PAC ? formData.permanent_country : formData.current_country
                }
              >
                {countries.map((c, idx) => (
                  <MenuItem key={idx} value={c.iso2}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl
              fullWidth
              disabled={
                PAC || formData.current_country == "" || curState.length == 0
              }
            >
              <InputLabel id="demo-simple-select-label">State</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="State"
                name="current_states"
                value={
                  PAC ? formData.permanent_states : formData.current_states
                }
                onChange={handleChange}
              >
                {PAC
                  ? permStates.map((c, idx) => (
                    <MenuItem key={idx} value={c.iso2}>
                      {c.name}
                    </MenuItem>
                  ))
                  : curState.map((c, idx) => (
                    <MenuItem key={idx} value={c.iso2}>
                      {c.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl
              fullWidth
              disabled={
                PAC || formData.current_states == "" || curCities.length == 0
              }
            >
              <InputLabel id="demo-simple-select-label">City</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="City"
                onChange={handleChange}
                name="current_cities"
                value={
                  PAC ? formData.permanent_cities : formData.current_cities
                }
              >
                {PAC
                  ? permCities.map((c, idx) => (
                    <MenuItem key={idx} value={c.name}>
                      {c.name}
                    </MenuItem>
                  ))
                  : curCities.map((c, idx) => (
                    <MenuItem key={idx} value={c.name}>
                      {c.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="District"
              disabled={PAC}
              value={
                PAC ? formData.permanent_district : formData.current_district
              }
              onChange={handleChange}
              name="current_district"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              disabled={PAC}
              type="number"
              fullWidth
              label="Pin Code"
              value={
                PAC ? formData.permanent_pin_code : formData.current_pin_code
              }
              onChange={handleChange}
              name="current_pin_code"
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 6);
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography
              fontSize={"1rem"}
              p={1}
              px={1}
              bgcolor={"#ececec"}
              borderRadius={1}
              color={"black"}
              fontWeight={500}
            >
              Parent / Guardian Details
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography fontWeight={"bold"}>Father's Details</Typography>
          </Grid>

          <Grid item xs={4}>
            <TextField
              type="text"
              fullWidth
              label="Name"
              onChange={handleChange}
              name="father_name"
              value={formData.father_name}
            />
          </Grid>
          <Grid item xs={4}>
            <Tooltip
              arrow
              placement="top"
              title="Select the occupation as ‘Not Applicable’ only if the applicant’s Father is deceased."
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Occupation
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Occupation"
                  onChange={handleChange}
                  name="father_occupation"
                  value={formData.father_occupation}
                >
                  {OccupationOptions.map((occ, idx) => (
                    <MenuItem key={idx} value={occ}>
                      {occ}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Tooltip>
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="text"
              fullWidth
              label="Anual Income"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₹</InputAdornment>
                ),
              }}
              onChange={handleChange}
              name="father_annual_income"
              value={formData.father_annual_income}
            />
          </Grid>
          <Grid item xs={6}>
            <MuiPhoneNumber
              defaultCountry={"in"}
              variant="outlined"
              fullWidth
              label="Contact Number"
              name="contact_number"
              onChange={(value) => {
                const e = {
                  target: {
                    name: "father_contact_number",
                    value,
                  },
                };
                handleChange(e);
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              type="email"
              fullWidth
              label="Email"
              value={formData.father_email}
              onChange={handleChange}
              name="father_email"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              name="primary_contact"
              value="Father"
              control={
                <Checkbox checked={formData.primary_contact == "Father"} />
              }
              onChange={handleChange}
              label="Set as primary contact"
            />
            <Tooltip
              arrow
              placement="right"
              title="School authority will treat this contact number as the first point of contact for all further communication."
            >
              <IconButton>
                <Icon icon={"ic:round-info"} fontSize={"1.6rem"} />
              </IconButton>
            </Tooltip>
          </Grid>

          <Grid item xs={12}>
            <Typography fontWeight={"bold"}>Mother's Details</Typography>
          </Grid>

          <Grid item xs={4}>
            <TextField
              type="text"
              fullWidth
              label="Name"
              onChange={handleChange}
              name="mother_name"
              value={formData.mother_name}
            />
          </Grid>
          <Grid item xs={4}>
            <Tooltip
              arrow
              placement="top"
              title="Select the occupation as ‘Not Applicable’ only if the applicant’s Mother is deceased."
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Occupation
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Occupation"
                  onChange={handleChange}
                  name="mother_occupation"
                  value={formData.mother_occupation}
                >
                  {OccupationOptions.map((occ, idx) => (
                    <MenuItem key={idx} value={occ}>
                      {occ}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Tooltip>
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="text"
              fullWidth
              label="Anual Income"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₹</InputAdornment>
                ),
              }}
              onChange={handleChange}
              name="mother_annual_income"
              value={formData.mother_annual_income}
            />
          </Grid>
          <Grid item xs={6}>
            <MuiPhoneNumber
              defaultCountry={"in"}
              variant="outlined"
              fullWidth
              label="Contact Number"
              name="contact_number"
              onChange={(value) => {
                const e = {
                  target: {
                    name: "mother_contact_number",
                    value,
                  },
                };
                handleChange(e);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="email"
              fullWidth
              label="Email"
              value={formData.mother_email}
              onChange={handleChange}
              name="mother_email"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              name="primary_contact"
              value="Mother"
              control={
                <Checkbox checked={formData.primary_contact == "Mother"} />
              }
              onChange={handleChange}
              label="Set as primary contact"
            />
            <Tooltip
              arrow
              placement="right"
              title="School authority will treat this contact number as the first point of contact for all further communication."
            >
              <IconButton>
                <Icon icon={"ic:round-info"} fontSize={"1.6rem"} />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={12} display={"flex"} alignItems={"center"}>
            <Typography fontWeight={"bold"}>
              Local Guardian's Details
            </Typography>
            <Tooltip
              sx={{ mr: "auto" }}
              arrow
              placement="right"
              title="This section is mandatory only if the applicant is not residing with his/her father/mother"
            >
              <IconButton>
                <InfoRounded />
              </IconButton>
            </Tooltip>
            <Button
              color="error"
              size="small"
              onClick={() => {
                setFormData((prev) => ({
                  ...prev,
                  guardian_name: "",
                  guardian_occupation: "",
                  guardian_annual_income: "",
                  guardian_contact_number: "",
                  guardian_email: "",
                  relationType: "",
                }));
              }}
            >
              Clear
            </Button>
          </Grid>

          <Grid item xs={4}>
            <TextField
              type="text"
              fullWidth
              label="Name"
              onChange={handleChange}
              name="guardian_name"
              value={formData.guardian_name}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Occupation</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Occupation"
                onChange={handleChange}
                name="guardian_occupation"
                value={formData.guardian_occupation}
              >
                {OccupationOptions.map((occ, idx) => {
                  if (occ != "Not Applicable")
                    return (
                      <MenuItem key={idx} value={occ}>
                        {occ}
                      </MenuItem>
                    );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="number"
              fullWidth
              label="Anual Income"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₹</InputAdornment>
                ),
              }}
              onChange={handleChange}
              name="guardian_annual_income"
              value={formData.guardian_annual_income}
            />
          </Grid>
          <Grid item xs={4}>
            <MuiPhoneNumber
              defaultCountry={"in"}
              variant="outlined"
              fullWidth
              label="Contact Number"
              name="contact_number"
              value={formData.guardian_contact_number}
              onChange={(value) => {
                const e = {
                  target: {
                    name: "guardian_contact_number",
                    value,
                  },
                };
                handleChange(e);
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type="email"
              fullWidth
              label="Email"
              value={formData.guardian_email}
              onChange={handleChange}
              name="guardian_email"
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Relation Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Relation Type"
                onChange={handleChange}
                name="relationType"
                value={formData.relationType}
              >
                {[
                  "Uncle",
                  "Aunt",
                  "Sister",
                  "Brother",
                  "Father-in Law",
                  "Mother-in Law",
                  "Grandfather",
                  "Grandmother",
                  "Others",
                ].map((occ, idx) => {
                  if (occ != "Not Applicable")
                    return (
                      <MenuItem key={idx} value={occ}>
                        {occ}
                      </MenuItem>
                    );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} display={"flex"} alignItems={"center"}>
            <FormControlLabel
              name="primary_contact"
              value="Guardian"
              control={
                <Checkbox checked={formData.primary_contact == "Guardian"} />
              }
              onChange={handleChange}
              label="Set as primary contact"
            />
            <Tooltip
              arrow
              placement="right"
              title="School authority will treat this contact number as the first point of contact for all further communication."
            >
              <IconButton>
                <Icon icon={"ic:round-info"} fontSize={"1.6rem"} />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>

      <Box padding={"0 3rem"}>
        <FormControlLabel
          name="do_agree"
          control={
            <Box>
              <Checkbox />
            </Box>
          }
          value={do_agree}
          onChange={(e) => setDoAgree(e.target.checked)}
          label={
            <Typography fontStyle={"italic"}>
              I hereby declare that the information furnished above is true,
              complete and correct to the best of my knowledge and belief. I
              understand that in the event of my information being found false
              or incorrect at any stage, my candidature shall be liable to
              cancellation without notice.
            </Typography>
          }
        />
      </Box>
      <Box p={2} px={6} display={"flex"} justifyContent={"center"}>
        <LoadingButton
          sx={{ padding: "0.5rem 4rem" }}
          disabled={!do_agree}
          loading={loading}
          // fullWidth
          variant="contained"
          onClick={() => onSubmit()}
        >
          Submit
        </LoadingButton>
      </Box>
    </Dialog>
  );
}

const Question1 = ({ handleChange }) => {
  const [isYes, setIsYes] = useState("no");
  const [question, setQuestion] = useState({});

  const onChange = (e) => {
    const { name, value } = e.target;
    setQuestion((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    console.log(question);
    handleChange({
      target: {
        name: "question1",
        value: JSON.stringify(question),
      },
    });
  }, [question]);

  return (
    <>
      <Grid item xs={12} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography fontWeight={500}>
          Has any of your relative(s) studied/ currently been studying in Demo
          School?
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={isYes}
          exclusive
          onChange={(e, v) => setIsYes(e.target.value)}
          name="Question1"
          size="small"
        >
          <ToggleButton value="yes">YES</ToggleButton>
          <ToggleButton value="no">NO</ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      {isYes == "yes" && (
        <>
          <Grid item xs={4}>
            <TextField label="Name" name="name" fullWidth onChange={onChange} />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              name="passing_year"
              select
              label="Passing Year"
              onChange={onChange}
            >
              {[
                "Not Applicable",
                ...new Array(50)
                  .fill(0)
                  .map((e, i) => `${new Date().getFullYear() - i}`),
              ].map((e, i) => (
                <MenuItem key={i} value={e}>
                  {e}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Relationship Type</InputLabel>
              <Select
                label="Relationship Type"
                name="relationship"
                onChange={onChange}
              >
                {[
                  "Father",
                  "Mother",
                  "Uncle",
                  "Aunt",
                  "Sister",
                  "Brother",
                  "Father-in Law",
                  "Mother-in Law",
                  "Grandfather",
                  "Grandmother",
                ].map((occ, idx) => {
                  if (occ != "Not Applicable")
                    return (
                      <MenuItem key={idx} value={occ}>
                        {occ}
                      </MenuItem>
                    );
                })}
              </Select>
            </FormControl>
          </Grid>
        </>
      )}
    </>
  );
};

const Question2 = ({ handleChange }) => {
  const [isYes, setIsYes] = useState("no");
  const [question, setQuestion] = useState({});

  const onChange = (e) => {
    const { name, value } = e.target;
    setQuestion((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    console.log(question);
    handleChange({
      target: {
        name: "question2",
        value: JSON.stringify(question),
      },
    });
  }, [question]);

  return (
    <>
      <Grid item xs={12} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography fontWeight={500}>
          Has any of your relative(s) worked / currently been working in Demo
          School?
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={isYes}
          exclusive
          onChange={(e, v) => setIsYes(e.target.value)}
          name="Question1"
          size="small"
        >
          <ToggleButton value="yes">YES</ToggleButton>
          <ToggleButton value="no">NO</ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      {isYes == "yes" && (
        <>
          <Grid item xs={4}>
            <TextField label="Name" fullWidth name="name" onChange={onChange} />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Department"
              fullWidth
              name="department"
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Relationship Type</InputLabel>
              <Select
                label="Relationship Type"
                name="relationship"
                onChange={onChange}
              >
                {[
                  "Father",
                  "Mother",
                  "Uncle",
                  "Aunt",
                  "Sister",
                  "Brother",
                  "Father-in Law",
                  "Mother-in Law",
                  "Grandfather",
                  "Grandmother",
                ].map((occ, idx) => {
                  if (occ != "Not Applicable")
                    return (
                      <MenuItem key={idx} value={occ}>
                        {occ}
                      </MenuItem>
                    );
                })}
              </Select>
            </FormControl>
          </Grid>
        </>
      )}
    </>
  );
};

export default OfflineApplicationForm;
