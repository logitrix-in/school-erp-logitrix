import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  OutlinedInput,
  ListItemIcon,
  Checkbox,
  ListItemText,
} from "@mui/material";
import RevealCard from "../../AnimationComponents/RevealCard";
import Bbox from "../../UiComponents/Bbox";
import { DatePicker } from "@mui/x-date-pickers";
import useClasses from "../../../hooks/useClasses";
import { useMediaQuery } from "@material-ui/core";
import { BarChart } from "@mui/x-charts/BarChart";

const ClassView = () => {
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

  const { classes } = useClasses();

  const curYear = new Date().getFullYear();

  const academicYear = `${curYear}-${(curYear + 1).toString().slice(2, 4)}`;

  const [acYear, setAcYear] = useState(academicYear);
  const [curClass, setClass] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [type, setType] = useState("all");

  // chart data
  const data1 = [70, 60, 50];
  const data2 = [60, 75, 70];
  const data3 = [50, 65, 60];
  const data4 = [85, 85, 70];
  const data5 = [90, 85, 60];
  const xLabels = ["Class V", "Class VI", "Class VII"];

  // context useEffect
  useEffect(() => {
    const _filter = {
      academic_year: acYear,
      class: curClass,
      type: type,
    };
    setFilter(_filter);
  }, [acYear, curClass, type]);

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

  return (
    <RevealCard>
      {/* Top text box */}
      <Box
        bgcolor="#ECEDED"
        py={1.3}
        px={3}
        borderRadius={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography fontWeight={500} fontSize="14px">
          Attendance - Class View
        </Typography>
      </Box>

      {/* Main Grid section */}
      <Box
        display="flex"
        flexDirection={isSmall ? "column" : "row"}
        gap={2}
        p={2}
      >
        {/* Left drop-down section */}
        <Bbox
          borderRadius={1}
          paddingLeft={2}
          paddingRight={2}
          flex={0}
          py={6}
          display="flex"
          flexDirection="column"
          gap="1.6rem"
          bgcolor="white"
          alignItems={isSmall ? "center" : ""}
        >
          {/* academic year dropdown */}
          <FormControl style={{ width: "14.5rem" }}>
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
          <FormControl style={{ width: "14.5rem" }}>
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
                  <Checkbox
                    size="small"
                    checked={curClass.indexOf(name) > -1}
                  />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* start date input */}
          <DatePicker
            label="Start Date"
            onChange={(e) => setStartDate(e)}
            format="DD MMM YYYY"
          />

          {/* end date input */}
          <DatePicker
            format="DD MMM YYYY"
            label="End Date"
            minDate={startDate}
            onChange={(e) => setEndDate(e)}
          />
        </Bbox>

        {/* Chart */}
        <Bbox>
          <BarChart
            width={900}
            height={400}
            series={[
              { data: data1, label: "Section A", color: "#12953F", id: "Id1" },
              { data: data2, label: "Section B", color: "#ED4660", id: "Id2" },
              { data: data3, label: "Section C", color: "#12953F", id: "Id3" },
              { data: data4, label: "Section D", color: "#12953F", id: "Id4" },
              { data: data5, label: "Section E", color: "#12953F", id: "Id5" },
            ]}
            xAxis={[{ data: xLabels, scaleType: "band" }]}
          />
        </Bbox>
      </Box>
    </RevealCard>
  );
};

export default ClassView;