import React, { useEffect, useRef, useState } from "react";
import Bbox from "../../UiComponents/Bbox";
import {
  Box,
  Button,
  ButtonBase,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  TextField,
  Select,
  Skeleton,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import api from "../../../config/api";
import { ToastContainer, toast } from "react-toastify";
import { ConstructionOutlined, InfoRounded } from "@mui/icons-material";
import { Icon } from "@iconify/react";
import { State } from "country-state-city";
import ReignsPopup from "../../UiComponents/ReignsPopup";
import { LoadingButton } from "@mui/lab";

const ScreeningRuleEdit = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

  function fetchData() {
    api.get("/admission/screening/").then((res) => {
      // ;
      setClasses(res.data);
    });
  }
  useEffect(() => {
    scrollToTop();
    fetchData();
  }, []);

  function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  useEffect(() => {
    fetchData();
    setCrit(
      classes.find((c) => c.Class == selectedClass) != null
        ? classes.find((c) => c.Class == selectedClass).criteria
        : []
    );
  }, [selectedClass]);

  useEffect(() => {
    // fetchData();
  }, [classes]);

  // dynamic criteria

  const available_crits = [
    "age",
    "board",
    "previous_percent",
    // "specialization",
    "medium",
    "permanent_states",
    "total_income",
    "critical_ailment",
  ];

  const specializationOptions = ["Science", "Arts", "Commerce"];
  const boardOptions = ["CBSE", "ICSE", "State Board"];
  const mediumOptions = ["English", "Bengali", "Hindi", "Other"];

  const option = {
    total_income: {
      label: "Anual family income",
      type: "number",
    },
    critical_ailment: {
      label: "Critical medical ailment",
      type: "singleSelect",
      options: ["Yes", "No"],
    },
    permanent_states: {
      label: "State ( Permanent address )",
      type: "select",
      options: State.getStatesOfCountry("IN").map((st) => st.name),
    },
    medium: {
      label: "Medium",
      type: "select",
      options: mediumOptions,
    },
    age: {
      label: "Age",
      type: "number",
    },
    board: {
      label: "Board",
      type: "select",
      options: boardOptions,
    },
    previous_percent: {
      label: "Marks secured in last class (%)",
      type: "number",
    },
    // specialization: {
    //   label: "Specialization",
    //   type: "select",
    //   options: specializationOptions,
    // },
  };

  const [availCrits, setAvailCrits] = useState(available_crits);
  const [crit, setCrit] = useState([]);

  function addNew() {
    const list = [...crit];
    list.push({
      criteria: "",
      operator: "",
      value: [],
    });
    setCrit(list);
  }

  function remove(index) {
    const updatedItems = [...crit.slice(0, index), ...crit.slice(index + 1)];
    setCrit(updatedItems);
  }

  const [rangeHelper, setRangeHelper] = useState([]);

  function updateRangeHelper(row, val) {
    const temp = [...rangeHelper];
    temp[row] = val;
    setRangeHelper(temp);
  }

  function handleRangeBlur(e, row) {
    if (crit[row].criteria == "age") {
      if (crit[row].operator == "rn" && !e.target.value.includes("-")) {
        updateRangeHelper(row, `invalid range`);

        const temp = [...crit];
        temp[row].value = "";
        setCrit(temp);
      }

      const [min, max] = e.target.value.split("-");
      if (parseInt(min) >= parseInt(max)) {
        updateRangeHelper(row, `minimum age must be less than maximum age`);

        const temp = [...crit];
        temp[row].value = "";
        setCrit(temp);
      }
    }
  }

  function handleChange(e, row) {
    updateRangeHelper(row, "");
    const { name, value } = e.target;
    const temp = [...crit];

    if (name == "value") {
      // age
      if (crit[row].criteria == "age") {
        if (crit[row].operator == "rn") {
          if (value.length > 5) return;

          if (value.length >= 3 && !value.includes("-"))
            return updateRangeHelper(
              row,
              `Invalid range field. It should be min-max. Ex: 12-20`
            );
        } else if (value.length > 2) return;
      }
      // previous percentage
      if (crit[row].criteria == "previous_percent" && value > 100)
        return updateRangeHelper(row, "Percentage can't be more than 100%");
    }

    if (name == "operator")
      temp[row].value = option[temp[row].criteria]?.type == "select" ? [] : "";

    if (name == "criteria")
      temp[row].value = option[value].type == "select" ? [] : "";

    temp[row][name] = value;
    setCrit(temp);
  }

  useEffect(() => {
    // ;
  }, [crit]);

  useEffect(() => {
    //  => c.Class == selectedClass));
    // setCrit(classes.find((c) => c.Class == selectedClass)?.criteria);
  }, [selectedClass]);

  const [loading, setLoading] = useState(false);

  function SetScreeningRule() {
    setLoading(true);
    api
      .post("/admission/screening/set/", {
        type: "update",
        class: selectedClass,
        active: classes.find((c) => c.Class == selectedClass)?.active,
        criteria: crit,
      })
      .then((res) => {
        fetchData();
      })
      .catch((err) => {})
      .finally(() => {
        fetchData();
        setLoading(false);
      });
  }

  const [showPop, setShowPop] = useState(false);
  const [popCnf, setPopCnf] = useState({
    onAccept: () => {},
  });

  return (
    <Bbox display={"flex"} borderRadius={1}>
      <ToastContainer />
      <ReignsPopup
        desc={`Looks like you have made some criteria changes for class ${selectedClass}. Changes which are not saved will be deleted parmanently.`}
        open={showPop}
        close={() => setShowPop(false)}
        {...popCnf}
      />
      {/* left */}
      <Box
        overflow={"auto"}
        display={"flex"}
        gap={1}
        flexDirection={"column"}
        sx={{ borderRight: "1px solid rgba(0,0,0,0.1)" }}
        p={2}
      >
        {classes.length == 0
          ? new Array(12)
              .fill(0)
              .map((c, idx) => (
                <Skeleton key={idx} height={50} width={160}></Skeleton>
              ))
          : classes.map((cl, idx) => (
              <ButtonBase
                key={idx}
                sx={{
                  padding: 1,
                  px: 2,
                  bgcolor: `${
                    selectedClass == cl.Class ? "primary.main" : "white"
                  }`,
                  color: `${
                    selectedClass != cl.Class ? "primary.main" : "white"
                  }`,
                  border: "1px solid blue",
                  borderColor: "primary.main",
                  borderRadius: 1,
                }}
                onClick={() => {
                  if (selectedClass != null && selectedClass != cl.Class) {
                    if (
                      JSON.stringify(
                        classes.find((c) => c.Class == selectedClass).criteria
                      ) == JSON.stringify(crit)
                    )
                      return setSelectedClass(cl.Class);
                    setPopCnf({
                      onAccept: () => setSelectedClass(cl.Class),
                    });
                    setShowPop(true);
                    // setSelectedClass(cl.Class);
                    // scrollToTop();
                  } else setSelectedClass(cl.Class);
                }}
              >
                <Typography>Class {cl.Class}</Typography>
              </ButtonBase>
            ))}
      </Box>

      {/* right */}
      <Box
        p={2}
        flex={1}
        display={"flex"}
        flexDirection={"column"}
        overflow={"auto"}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography
            fontSize={"1rem"}
            fontWeight={"500"}
            bgcolor={"primary.light"}
            p={0.5}
            px={2}
            borderRadius={1}
          >
            {selectedClass
              ? `Set screening rule for class ${selectedClass
                  ?.toString()
                  .replace("-", " ")}`
              : "Select a class to edit screening rules"}
          </Typography>

          <Tooltip
            sx={{ ml: "auto" }}
            placement="bottom-end"
            title={
              <pre style={{ padding: "1rem", width: "20rem" }}>
                {JSON.stringify(
                  {
                    type: "update",
                    class: selectedClass,
                    active: classes.find((c) => c.Class == selectedClass)
                      ?.active,
                    criteria: crit,
                  },
                  null,
                  4
                )}
              </pre>
            }
          >
            <IconButton>
              <InfoRounded />
            </IconButton>
          </Tooltip>
          {selectedClass && (
            <FormControlLabel
              control={
                <Switch
                  checked={
                    classes.find((c) => c.Class == selectedClass)?.active
                  }
                  onChange={(e, c) => {
                    const temp = [...classes];
                    temp.find((c) => c.Class == selectedClass).active = c;
                    setClasses(temp);
                  }}
                />
              }
              label={
                classes.find((c) => c.Class == selectedClass)?.active
                  ? "Enabled"
                  : "Disabled"
              }
            />
          )}
          {selectedClass && crit.length < availCrits.length && (
            <Box display={"flex"} gap={1}>
              {/* <Button
                size="small"
                variant="contained"
                color="secondary"
                disabled={
                  !classes.find((c) => c.Class == selectedClass)?.active
                }
              >
                Add Special Criterias
              </Button> */}
              <Button
                size="small"
                variant="contained"
                onClick={addNew}
                disabled={
                  !classes.find((c) => c.Class == selectedClass)?.active
                }
              >
                Add New criteria
              </Button>
            </Box>
          )}
        </Box>
        <Box
          display={"flex"}
          sx={
            classes.find((c) => c.Class == selectedClass)?.active
              ? {}
              : {
                  opacity: 0.6,
                  pointerEvents: "none",
                }
          }
          flexDirection={"column"}
          gap={2}
          mt={2}
        >
          {crit.map((c, idx) => (
            <Grid container key={idx} spacing={1}>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Criteria
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Criteria"
                    name="criteria"
                    value={c.criteria}
                    onChange={(e) => handleChange(e, idx)}
                  >
                    {availCrits.map((ac, idx) => (
                      <MenuItem
                        key={idx}
                        value={ac}
                        disabled={crit.find((b) => b.criteria == ac) != null}
                      >
                        {option[ac].label.replace("_", " ")}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                {c.criteria && (
                  <>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Operator
                      </InputLabel>
                      {/* number */}
                      {option[c.criteria]?.type == "number" && (
                        <Select
                          value={c.operator}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Operator"
                          name="operator"
                          onChange={(e) => handleChange(e, idx)}
                        >
                          <MenuItem value={"eq"}>Equals To</MenuItem>
                          <MenuItem value={"nt"}>Not Equals To</MenuItem>
                          <MenuItem value={"gt"}>Greater Than</MenuItem>
                          <MenuItem value={"gte"}>
                            Greater Than Equals To
                          </MenuItem>
                          <MenuItem value={"lt"}>Less Than</MenuItem>
                          <MenuItem value={"lte"}>Less Than Equals To</MenuItem>
                          <MenuItem value={"rn"}>range</MenuItem>
                        </Select>
                      )}
                      {/* select */}
                      {option[c.criteria]?.type == "select" && (
                        <Select
                          value={c.operator}
                          labelId="demo-simple-select-label"
                          name="operator"
                          onChange={(e) => handleChange(e, idx)}
                          id="demo-simple-select"
                          label="Operator"
                        >
                          <MenuItem value={"eq"}>Equals To</MenuItem>
                          <MenuItem value={"nt"}>Not Equals To</MenuItem>
                        </Select>
                      )}
                      {/* text */}
                      {option[c.criteria]?.type == "singleSelect" && (
                        <Select
                          value={c.operator}
                          labelId="demo-simple-select-label"
                          name="operator"
                          onChange={(e) => handleChange(e, idx)}
                          id="demo-simple-select"
                          label="Operator"
                        >
                          <MenuItem value={"eq"}>Equal To</MenuItem>
                          <MenuItem value={"nt"}>Not Equal To</MenuItem>
                        </Select>
                      )}
                    </FormControl>
                  </>
                )}
              </Grid>
              <Grid item xs={4}>
                {c.operator && (
                  <>
                    {/* select */}
                    {option[c.criteria]?.type == "select" && (
                      <FormControl fullWidth>
                        <InputLabel>Values</InputLabel>
                        <Select
                          label="values"
                          multiple
                          name="value"
                          value={c.value}
                          renderValue={(selected) => selected.join(", ")}
                          onChange={(e) => handleChange(e, idx)}
                        >
                          {option[c.criteria]?.options.map((item) => (
                            <MenuItem key={item} value={item}>
                              <Checkbox
                                size="small"
                                checked={c.value.indexOf(item) > -1}
                              />
                              <ListItemText primary={item} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                    {/* number */}
                    {option[c.criteria]?.type == "number" && (
                      <TextField
                        fullWidth
                        type="text"
                        error={rangeHelper[idx]?.length > 0}
                        helperText={
                          rangeHelper[idx] ||
                          (crit[idx].operator == "rn" ? "Ex: 10-12" : "")
                        }
                        onBlur={(e) => handleRangeBlur(e, idx)}
                        name="value"
                        label="value"
                        value={c.value}
                        onChange={(e) => handleChange(e, idx)}
                      />
                    )}
                    {/* singleSelect */}
                    {option[c.criteria]?.type == "singleSelect" && (
                      <FormControl fullWidth>
                        <InputLabel>Value</InputLabel>
                        <Select
                          label="value"
                          name="value"
                          value={c.value}
                          onChange={(e) => handleChange(e, idx)}
                        >
                          {option[c.criteria]?.options.map((item) => (
                            <MenuItem key={item} value={item}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  </>
                )}
              </Grid>
              <Grid item xs={1}>
                <Box
                  display={"flex"}
                  height={"100%"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <IconButton
                    variant="contained"
                    onClick={() => remove(idx)}
                    sx={{ color: "primary.dark" }}
                  >
                    <Icon icon={"octicon:trash-16"} fontSize={25} />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          ))}
        </Box>
        
        <Box mt={5} display={ selectedClass ? "flex" : "none"} justifyContent={"flex-end"}>
          <Box display={"flex"} gap={1}>
            <Button
              variant="contained"
              color="error"
              sx={{ px: 4 }}
              onClick={() => {
                fetchData();
                setCrit(
                  classes.find((c) => c.Class == selectedClass)?.criteria
                );
              }}
            >
              Reset
            </Button>
            <LoadingButton
              loading={loading}
              variant="contained"
              sx={{ px: 4 }}
              onClick={SetScreeningRule}
            >
              Apply
            </LoadingButton>
          </Box>
        </Box>
      </Box>
    </Bbox>
  );
};

export default ScreeningRuleEdit;
