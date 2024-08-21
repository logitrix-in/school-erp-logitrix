import React, { useEffect, useState } from "react";
import Bbox from "../../../../UiComponents/Bbox";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  ArrowDropDownOutlined,
  ArrowDropUpOutlined,
} from "@mui/icons-material";
import { Icon } from "@iconify/react";
import api from "../../../../../config/api";
import { ToastContainer, toast } from "react-toastify";

const SetMeritListRule = () => {
  const [IncludeTest, setIncludeTest] = useState(true);
  const [includeInterview, setIncludeInterview] = useState(true);
  const [weightage, setWeightage] = useState(50);

  const [meritListNum, setMeritListNum] = useState(1);
  const [waitingListNum, setWaitingListNum] = useState(0);
  const [Class, setClass] = useState("I");

  const [classes, setClasses] = useState([]);

  const [meritList, setMeritList] = useState([]);

  const [genderDiversityEnable, setGenderDiversityEnable] = useState(false);
  const [culturalDiversityEnable, setCulturalDiversityEnable] = useState(false);
  const [casteDiversityEnable, setCasteDiversityEnable] = useState(false);

  const [priority, setPriority] = useState([
    "Test Score & Interview",
    "Caste Diversity",
    "Cultural Diversity",
    "Gender Diversity",
  ]);

  const moveUp = (index) => {
    if (index > 0) {
      const updatedPriority = [...priority];
      const temp = updatedPriority[index - 1];
      updatedPriority[index - 1] = updatedPriority[index];
      updatedPriority[index] = temp;
      setPriority(updatedPriority);
    }
  };

  const moveDown = (index) => {
    if (index < priority.length - 1) {
      const updatedPriority = [...priority];
      const temp = updatedPriority[index + 1];
      updatedPriority[index + 1] = updatedPriority[index];
      updatedPriority[index] = temp;
      setPriority(updatedPriority);
    }
  };

  const [loading, setLoading] = useState(false);

  const updateMeritListRules = () => {
    {
      const payload = {
        applyingFor: Class,
        numCountMerit: meritListNum,
        numCountWaiting: waitingListNum,
        weightage:
          IncludeTest && includeInterview
            ? {
                test: 100 - weightage,
                interview: weightage,
              }
            : null,
        include_offline: IncludeTest,
        include_online: includeInterview,
      };

      setLoading(true);
      api
        .put("/admission/test-center/evaluation/merit-list/", payload)
        .then((res) => {
          toast.success(res.data.message);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    api.get("/admission/get-all-classes").then((res) => setClasses(res.data));
  }, []);

  return (
    <Bbox borderRadius={1}>
      <Typography fontSize={"1rem"} fontWeight={500} p={2}>
        Merit List - Set Rule
      </Typography>
      <Divider />
      <Box p={2}>
        <FormControl sx={{ mb: 2, width: "10rem" }}>
          <InputLabel id="demo-simple-select-label">Class</InputLabel>
          <Select
            label="Class"
            value={Class}
            onChange={(e) => setClass(e.target.value)}
          >
            {classes.map((cl, idx) => (
              <MenuItem key={idx} value={cl}>
                {cl}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box display={"flex"} gap={3}>
          <Box display={"flex"} gap={1} alignItems={"center"}>
            <Typography>
              Number of Candidates to be considered for Merit List
            </Typography>
            <TextField
              value={meritListNum}
              onChange={(e) => setMeritListNum(e.target.value)}
              sx={{ width: "5rem" }}
              size="small"
            />
          </Box>
          <Box display={"flex"} gap={1} alignItems={"center"}>
            <Typography>
              Number of Candidates to be considered for Waiting List
            </Typography>
            <TextField
              value={waitingListNum}
              onChange={(e) => setWaitingListNum(e.target.value)}
              sx={{ width: "5rem" }}
              size="small"
            />
          </Box>
        </Box>
        <Typography
          mt={2}
          p={1}
          px={2}
          bgcolor={"#eeeeee"}
          fontSize={"1rem"}
          fontWeight={500}
          borderRadius={1}
          mb={1}
        >
          Set Weightage
        </Typography>
        <FormControlLabel
          sx={{ mr: 5 }}
          control={<Checkbox />}
          onChange={(_, v) => setIncludeTest(v)}
          checked={IncludeTest}
          label="Include Offline/Online Test"
        />
        <FormControlLabel
          control={<Checkbox />}
          onChange={(_, v) => setIncludeInterview(v)}
          checked={includeInterview}
          label="Include Interview Score"
        />
        <br />
        <Box width={"fit-content"} borderRadius={1}>
          <Box
            display={"flex"}
            gap={2}
            sx={{ my: 1, width: "30rem" }}
            alignItems="center"
          >
            <Typography whiteSpace={"nowrap"}>
              Test Score {`(${100 - weightage}%)`}
            </Typography>
            <Slider
              disabled={!(includeInterview && IncludeTest)}
              min={0}
              max={100}
              onChange={(_, v) => setWeightage(v)}
              value={weightage}
              defaultValue={50}
            />
            <Typography whiteSpace={"nowrap"}>
              Interview {`(${weightage}%)`}
            </Typography>
          </Box>
        </Box>

        {/* <Box mt={2} p={1} px={2} bgcolor={"#eeeeee"} borderRadius={1} mb={1}>
          <FormControlLabel
            control={<Checkbox />}
            onChange={(_, v) => {
              setGenderDiversityEnable(v);
            }}
            checked={genderDiversityEnable}
            label={
              <Typography
                fontSize={"1rem"}
                fontWeight={500}
                sx={{ userSelect: "none" }}
              >
                Gender Diversity
              </Typography>
            }
          />
        </Box>

        <Collapse
          sx={{ mb: 1 }}
          orientation="vertical"
          in={genderDiversityEnable}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box display={"flex"} gap={1} alignItems={"center"}>
              <Typography>Male</Typography>
              <TextField
                defaultValue={50}
                sx={{ width: "4rem" }}
                size="small"
                InputProps={{
                  endAdornment: "%",
                }}
              />
            </Box>
            <Box display={"flex"} gap={1} alignItems={"center"}>
              <Typography>Female</Typography>
              <TextField
                defaultValue={50}
                sx={{ width: "4rem" }}
                size="small"
                InputProps={{
                  endAdornment: "%",
                }}
              />
            </Box>
            <Box display={"flex"} gap={1} alignItems={"center"}>
              <Typography>Third Gender</Typography>
              <TextField
                defaultValue={0}
                sx={{ width: "4rem" }}
                size="small"
                InputProps={{
                  endAdornment: "%",
                }}
              />
            </Box>
          </Box>
        </Collapse>

        <Box p={1} px={2} bgcolor={"#eeeeee"} borderRadius={1} mb={1}>
          <FormControlLabel
            control={<Checkbox />}
            onChange={(_, v) => {
              setCulturalDiversityEnable(v);
            }}
            checked={culturalDiversityEnable}
            label={
              <Typography
                fontSize={"1rem"}
                fontWeight={500}
                sx={{ userSelect: "none" }}
              >
                Cultural Diversity
              </Typography>
            }
          />
        </Box>

        <Collapse
          sx={{ mb: 1 }}
          orientation="vertical"
          in={culturalDiversityEnable}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box display={"flex"} gap={1} alignItems={"center"}>
              <Typography>Hindu</Typography>
              <TextField
                defaultValue={50}
                sx={{ width: "4rem" }}
                size="small"
                InputProps={{
                  endAdornment: "%",
                }}
              />
            </Box>
            <Box display={"flex"} gap={1} alignItems={"center"}>
              <Typography>Muslim</Typography>
              <TextField
                defaultValue={50}
                sx={{ width: "4rem" }}
                size="small"
                InputProps={{
                  endAdornment: "%",
                }}
              />
            </Box>
            <Box display={"flex"} gap={1} alignItems={"center"}>
              <Typography>Sikh</Typography>
              <TextField
                defaultValue={0}
                sx={{ width: "4rem" }}
                size="small"
                InputProps={{
                  endAdornment: "%",
                }}
              />
            </Box>
            <Box display={"flex"} gap={1} alignItems={"center"}>
              <Typography>Other</Typography>
              <TextField
                defaultValue={0}
                sx={{ width: "4rem" }}
                size="small"
                InputProps={{
                  endAdornment: "%",
                }}
              />
            </Box>
          </Box>
        </Collapse>

        <Box p={1} px={2} bgcolor={"#eeeeee"} borderRadius={1}>
          <FormControlLabel
            control={<Checkbox />}
            onChange={(_, v) => {
              setCasteDiversityEnable(v);
            }}
            checked={casteDiversityEnable}
            label={
              <Typography
                fontSize={"1rem"}
                fontWeight={500}
                sx={{ userSelect: "none" }}
              >
                Caste Diversity
              </Typography>
            }
          />
        </Box>

        <Collapse
          sx={{ mt: 1 }}
          orientation="vertical"
          in={casteDiversityEnable}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box display={"flex"} gap={1} alignItems={"center"}>
              <Typography>General</Typography>
              <TextField
                defaultValue={50}
                sx={{ width: "4rem" }}
                size="small"
                InputProps={{
                  endAdornment: "%",
                }}
              />
            </Box>
            <Box display={"flex"} gap={1} alignItems={"center"}>
              <Typography>SC</Typography>
              <TextField
                defaultValue={50}
                sx={{ width: "4rem" }}
                size="small"
                InputProps={{
                  endAdornment: "%",
                }}
              />
            </Box>
            <Box display={"flex"} gap={1} alignItems={"center"}>
              <Typography>ST</Typography>
              <TextField
                defaultValue={0}
                sx={{ width: "4rem" }}
                size="small"
                InputProps={{
                  endAdornment: "%",
                }}
              />
            </Box>
            <Box display={"flex"} gap={1} alignItems={"center"}>
              <Typography>OBC</Typography>
              <TextField
                defaultValue={0}
                sx={{ width: "4rem" }}
                size="small"
                InputProps={{
                  endAdornment: "%",
                }}
              />
            </Box>
          </Box>
        </Collapse>

        <Bbox
          p={2}
          mt={2}
          borderRadius={1}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"start"}
          gap={0.5}
        >
          <Typography fontSize={"1.1rem"} fontWeight={500} mb={1}>
            Set Priority
          </Typography>
          {priority.map((name, index) => (
            <Box
              key={index}
              display={"flex"}
              gap={0.5}
              borderRadius={1}
              overflow={"hidden"}
            >
              <Box display={"flex"}>
                <Box
                  bgcolor={"primary.main"}
                  p={0.5}
                  px={1}
                  display={"flex"}
                  alignItems={"center"}
                  onClick={() => moveUp(index)}
                  sx={{ cursor: "pointer" }}
                >
                  <Icon color="white" icon="icon-park-solid:up-one" />
                </Box>
                <Box
                  bgcolor={"error.main"}
                  p={0.5}
                  px={1}
                  display={"flex"}
                  alignItems={"center"}
                  onClick={() => moveDown(index)}
                  sx={{ cursor: "pointer" }}
                >
                  <Icon color="white" icon="icon-park-solid:down-one" />
                </Box>
              </Box>
              <Typography
                fontWeight={500}
                bgcolor={"#eaeaea"}
                p={1}
                px={2}
                width={"15rem"}
              >
                {name}
              </Typography>
            </Box>
          ))}
        </Bbox> */}
        <ToastContainer />
        <LoadingButton
          loading={loading}
          variant="contained"
          sx={{ mt: 2 }}
          onClick={updateMeritListRules}
        >
          Save
        </LoadingButton>
      </Box>
    </Bbox>
  );
};

export default SetMeritListRule;
