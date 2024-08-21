import { Icon } from "@iconify/react";
import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React, { useEffect, useState } from "react";
import api from "../../../config/api";
import RevealCard from "../../AnimationComponents/RevealCard";
import Bbox from "../../UiComponents/Bbox";
import download from "../../../hooks/useDownload";
import useClasses from "../../../hooks/useClasses";
import ReignsPopup from "../../UiComponents/ReignsPopup";
import ReignsSelect from "../../UiComponents/ReignsSelect";

const ScreeningDashboard = () => {
  const curYear = new Date().getFullYear();
  const academicYear = `${curYear}-${(curYear + 1).toString().slice(2, 4)}`;

  const [filter, setFilter] = useState({
    academic_year: academicYear,
    start_date: "",
    end_date: "",
    class: [],
  });

  const { classes } = useClasses();
  const [charts, setCharts] = useState({
    total: 0,
    screenedPending: 0,
  });

  function getValues() {
    api
      .put("/admission/screening/", filter)
      .then((response) => {
        const data = response.data;
        setCharts({
          total: data.total_application,
          screenedPending: data.screened_pending,
        });
      })
      .catch((error) => {});
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
          gap={2}
          flexDirection={{ xs: "column", lg: "row" }}
          alignItems={{ xs: "stretch" }}
          p={3}
        >
          <Bbox
            borderRadius={1}
            p={3}
            py={5}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={'center'}
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
                label="Start Date"
                onChange={(e) => setStartDate(e)}
                format="DD MMM YYYY"
              />
              <DatePicker
                format="DD MMM YYYY"
                label="End Date"
                minDate={startDate}
                onChange={(e) => setEndDate(e)}
              />
            </Box>

            {/* <FormControl fullWidth>
              <InputLabel>Class</InputLabel>
              <Select
                multiple
                value={curClass}
                onChange={handleClassChange}
                input={<OutlinedInput label="class" />}
                renderValue={(selected) => selected.join(", ")}
              >
                {classes?.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox
                      size="small"
                      checked={curClass.indexOf(name) > -1}
                    />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}

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

          <Box display={"flex"} flexDirection={"column"} gap={2} flex={1}>
            <Box
              flex={1}
              borderRadius={1}
              p={2}
              display={"flex"}
              alignItems={"center"}
              sx={{
                background: "linear-gradient(to right, #2C7BA0, #9BD9F4)",
              }}
              position={"relative"}
            >
              <Box flex={2} p={3}>
                <Typography
                  fontSize={"4rem"}
                  fontWeight={500}
                  color={"#CEE7FF"}
                  lineHeight={1.2}
                >
                  {charts.total}
                </Typography>
                <Typography fontSize={"1.5rem"} color={"#CDDFF4"}>
                  Total Application Received
                </Typography>
              </Box>
              <Box flex={1}>
                <Icon
                  icon={"fluent:notepad-person-20-filled"}
                  fontSize={"10rem"}
                  color="#2C7BA0"
                />
              </Box>
              <Box position={"absolute"} bottom={"0.2rem"} right={"0.5rem"}>
                <IconButton
                  onClick={() => download("total_application_recieved")}
                >
                  <Icon icon={"ic:round-download"} fontSize={"1.4rem"} />
                </IconButton>
              </Box>
            </Box>
            <Box
              flex={1}
              borderRadius={1}
              p={2}
              display={"flex"}
              alignItems={"center"}
              sx={{
                background: "linear-gradient(to right, #E59D7A, #FAD2C0)",
              }}
              position={"relative"}
            >
              <Box flex={2} p={3}>
                <Typography
                  fontSize={"4rem"}
                  fontWeight={500}
                  color={"#B34A19"}
                  lineHeight={1.2}
                >
                  {charts.screenedPending}
                </Typography>
                <Typography fontSize={"1.5rem"} color={"#974B27"}>
                  Screening Pending
                </Typography>
              </Box>
              <Box flex={1}>
                <Icon
                  icon={"mdi:account-alert"}
                  fontSize={"10rem"}
                  color="#C4673B"
                />
              </Box>
              <Box position={"absolute"} bottom={"0.2rem"} right={"0.5rem"}>
                <IconButton onClick={() => download("screening_pending")}>
                  <Icon icon={"ic:round-download"} fontSize={"1.4rem"} />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Bbox>
    </RevealCard>
  );
};

export default ScreeningDashboard;
