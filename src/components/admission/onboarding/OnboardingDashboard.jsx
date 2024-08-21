import { Icon } from "@iconify/react";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React, { useEffect, useState } from "react";
import api from "../../../config/api";
import RevealCard from "../../AnimationComponents/RevealCard";
import Bbox from "../../UiComponents/Bbox";
import { LoadingButton } from "@mui/lab";
import { ToastContainer, toast } from "react-toastify";
import download from "../../../hooks/useDownload";
import ReignsSelect from "../../UiComponents/ReignsSelect";
import useClasses from "../../../hooks/useClasses";

const OnboardingDashboard = () => {
  useEffect(() => {
    api
      .get("/admission/test-center/onboarding/")
      .then((res) => (charts.value = res.data));
  }, []);

  const curYear = new Date().getFullYear();
  const academicYear = `${curYear}-${(curYear + 1).toString().slice(2, 4)}`;

  const [filter, setFilter] = useState({
    academic_year: academicYear,
    start_date: "",
    end_date: "",
    class: [],
  });

  const { classes } = useClasses();
  const [charts, setCharts] = useState({});

  function getValues() {
    api
      .get("/admission/test-center/onboarding/")
      .then((response) => {
        const data = response.data;
        setCharts(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  useEffect(() => {
    getValues();
    return () => clearInterval();
  }, []);

  useEffect(() => {
    getValues();
  }, [filter]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [acYear, setAcYear] = useState(academicYear);
  const [curClass, setClass] = useState([]);

  useEffect(() => {
    if (endDate == "") setEndDate(startDate);

    const _filter = {
      academic_year: acYear,
      start_date: startDate && new Date(startDate).toLocaleDateString("en-CA"),
      end_date: endDate && new Date(endDate).toLocaleDateString("en-CA"),
      class: curClass,
    };
    setFilter(_filter);
  }, [acYear, curClass, startDate, endDate]);

  const handleClassChange = (e) => {
    const {
      target: { value },
    } = e;
    setClass(typeof value === "string" ? value.split(",") : value);
  };

  // cards

  return (
    <RevealCard>
      <Bbox borderRadius={2} overflow={"hidden"}>
        <Box
          bgcolor={"white"}
          py={1.3}
          px={3}
          borderRadius={2}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography fontWeight={"700"} borderRadius={1} fontSize={"1.1rem"}>
            Dashboard
          </Typography>
        </Box>

        <Divider />

        <Box
          display={"flex"}
          gap={3}
          flexDirection={{ xs: "column", lg: "row" }}
          alignItems={{ xs: "center" }}
          p={3}
          pb={2}
        >
          <Bbox
            borderRadius={1}
            p={3}
            flex={1}
            py={5}
            display={"flex"}
            flexDirection={"column"}
            gap={"2rem"}
            bgcolor={"white"}
            width={{ xs: "100%", lg: "30rem" }}
          >
            <FormControl fullWidth>
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

            <Box display={"flex"} gap={2}>
              <DatePicker
                sx={{ width: "100%" }}
                label="Start Date"
                onChange={(e) => setStartDate(e)}
                format="DD MMM YYYY"
              />
              <DatePicker
                format="DD MMM YYYY"
                label="End Date"
                minDate={startDate}
                sx={{ width: "100%" }}
                onChange={(e) => setEndDate(e)}
              />
            </Box>

            <ReignsSelect
              multiple
              items={classes}
              onChange={(val) => {
                console.log(val);
                setClass(val);
              }}
              label="Class"
            />
          </Bbox>

          <Grid container spacing={2} flex={2}>
            <Grid item xs={6}>
              <Bbox
                height={"9rem"}
                bgcolor={"primary.light"}
                borderRadius={1}
                p={3}
                px={10}
                display="flex"
                justifyContent="flex-start"
                alignItems="stretch"
                position={"relative"}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  flex={1}
                  justifyContent={"space-between"}
                  gap={3}
                >
                  <Box>
                    <Typography
                      fontSize={"1.6rem"}
                      color={"primary.dark"}
                      fontWeight={600}
                    >
                      {charts.interview}
                    </Typography>
                    <Typography color={"primary.main"}>
                      Candidates selected for Test/Interview
                    </Typography>
                  </Box>

                  <Icon
                    icon={"fluent:note-edit-24-filled"}
                    color="#3B98C4"
                    fontSize={"4rem"}
                  />
                </Box>
                <Box position={"absolute"} bottom={"0.2rem"} right={"0.5rem"}>
                  <IconButton onClick={() => download("candidates_selected")}>
                    <Icon icon={"ic:round-download"} fontSize={"1.4rem"} />
                  </IconButton>
                </Box>
              </Bbox>
            </Grid>
            <Grid item xs={6}>
              <Bbox
                height={"9rem"}
                bgcolor={"secondary.light"}
                borderRadius={1}
                p={3}
                px={10}
                display="flex"
                justifyContent="flex-start"
                alignItems="stretch"
                position={"relative"}
              >
                <Box
                  display={"flex"}
                  flex={1}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  gap={3}
                >
                  <Box>
                    <Typography
                      fontSize={"1.6rem"}
                      color={"secondary.dark"}
                      fontWeight={600}
                    >
                      {charts.in_merit}
                    </Typography>
                    <Typography color={"secondary.main"}>
                      Candidates in Merit
                    </Typography>
                  </Box>

                  <Icon
                    icon={"clarity:list-solid"}
                    color="#91431F"
                    fontSize={"4rem"}
                  />
                </Box>
                <Box position={"absolute"} bottom={"0.2rem"} right={"0.5rem"}>
                  <IconButton onClick={() => download("candidates_in_merit")}>
                    <Icon icon={"ic:round-download"} fontSize={"1.4rem"} />
                  </IconButton>
                </Box>
              </Bbox>
            </Grid>
            <Grid item xs={6}>
              <Bbox
                height={"9rem"}
                bgcolor={"secondary.light"}
                borderRadius={1}
                p={3}
                px={10}
                display="flex"
                justifyContent="flex-start"
                alignItems="stretch"
                position={"relative"}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  flex={1}
                  gap={3}
                >
                  <Box>
                    <Typography
                      fontSize={"1.6rem"}
                      color={"secondary.dark"}
                      fontWeight={600}
                    >
                      {charts.in_review}
                    </Typography>
                    <Typography color={"secondary.main"}>
                      Onboarding In-Review
                    </Typography>
                  </Box>

                  <Icon
                    icon={"mdi:file-document-box-search"}
                    color="#91431F"
                    fontSize={"4rem"}
                  />
                </Box>
                <Box position={"absolute"} bottom={"0.2rem"} right={"0.5rem"}>
                  <IconButton onClick={() => download("candidate_in_review")}>
                    <Icon icon={"ic:round-download"} fontSize={"1.4rem"} />
                  </IconButton>
                </Box>
              </Bbox>
            </Grid>
            <Grid item xs={6}>
              <Bbox
                height={"9rem"}
                bgcolor={"primary.light"}
                borderRadius={1}
                p={3}
                px={10}
                display="flex"
                justifyContent="flex-start"
                alignItems="stretch"
                position={"relative"}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  flex={1}
                  gap={3}
                >
                  <Box>
                    <Typography
                      fontSize={"1.6rem"}
                      color={"primary.dark"}
                      fontWeight={600}
                    >
                      {charts.completed}
                    </Typography>
                    <Typography color={"primary.main"}>
                      Onboarding Completed
                    </Typography>
                  </Box>

                  <Icon
                    icon={"teenyicons:tick-circle-solid"}
                    color="#3B98C4"
                    fontSize={"4rem"}
                  />
                </Box>
                <Box position={"absolute"} bottom={"0.2rem"} right={"0.5rem"}>
                  <IconButton onClick={() => download("onboarding_completed")}>
                    <Icon icon={"ic:round-download"} fontSize={"1.4rem"} />
                  </IconButton>
                </Box>
              </Bbox>
            </Grid>
          </Grid>
        </Box>
        <AddRemove />
      </Bbox>
      <ToastContainer />
    </RevealCard>
  );
};

const AddRemove = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [appId, setAddId] = useState(null);
  const [cand, setCand] = useState(null);

  const [loading, setLoading] = useState(false);

  const fetchCand = () => {
    api
      .get(`/admission/application/search-by-id/?id=${appId}`)
      .then((res) => {
        console.log(res.data);
        setCand(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Box ml={3} mb={3}>
      {!isSearch ? (
        <Button
          sx={{ px: 5 }}
          size="small"
          color="secondary"
          variant="contained"
          onClick={() => {
            setIsSearch(true);
          }}
        >
          Add / Remove candidate to/from Merit List
        </Button>
      ) : (
        <Box>
          <Box display={"flex"} gap={1}>
            <TextField
              size="small"
              label="Enter Application Id"
              onChange={(e) => setAddId(e.target.value)}
            />
            <Button
              variant="contained"
              onClick={() => {
                fetchCand();
              }}
            >
              Find Application
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setCand(null);
                setAddId(null);
                setIsSearch(false);
              }}
            >
              Back
            </Button>
          </Box>
          {cand && (
            <Card
              sx={{ p: 1, mt: 2, width: "25rem", bgcolor: "primary.light" }}
              elevation={5}
            >
              <Box display={"flex"} gap={1}>
                <img
                  height={100}
                  src={cand?.candidate_details.profile_photo}
                  style={{ borderRadius: 5 }}
                />
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"flex-start"}
                >
                  <Typography fontWeight={500} fontSize={"1rem"}>
                    {cand?.candidate_details.first_name}{" "}
                    {cand?.candidate_details.last_name}
                  </Typography>
                  <Typography>{cand?.candidate_details.email}</Typography>
                  <LoadingButton
                    loading={loading}
                    color={cand.in_merit_list ? "error" : "primary"}
                    variant="contained"
                    size="small"
                    sx={{ mt: "auto" }}
                    onClick={() => {
                      setLoading(true);
                      api
                        .post(
                          "/admission/test-center/evaluation/merit-list/external/",
                          {
                            id: cand.application_id,
                            applyingFor: cand.application_details.applying_for,
                            in_merit_list: !cand.in_merit_list,
                          }
                        )
                        .then((res) => {
                          toast.info(res.data.message);
                          fetchCand();
                        })
                        .catch((err) => console.log(err))
                        .finally(() => {});
                    }}
                  >
                    {cand.in_merit_list ? "Remove" : "Add"}
                  </LoadingButton>
                </Box>
              </Box>
            </Card>
          )}
        </Box>
      )}
    </Box>
  );
};

export default OnboardingDashboard;
