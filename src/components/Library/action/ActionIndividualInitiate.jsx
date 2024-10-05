import React, { useState, useEffect } from "react";
import Bbox from "../../UiComponents/Bbox";
import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
  ListItemIcon,
  Checkbox,
  ListItemText,
  TextField,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { useMediaQuery } from "@material-ui/core";
import { DatePicker } from "@mui/x-date-pickers";
import Photo from "../../../assets/icons/photo.png";
import useClasses from "../../../hooks/useClasses";
import { ToastContainer, toast } from "react-toastify";

const ActionIndividualInitiate = () => {
  // breakpoints
  const isSmall = useMediaQuery("(max-width: 1364px)");
  const isTablet = useMediaQuery("(min-width: 1365px) and (max-width: 1535px)");
  const isLaptop = useMediaQuery("(min-width: 1536px) and (max-width: 1706px)");
  const isDesktop = useMediaQuery(
    "(min-width: 1707px) and (max-width: 1919px)"
  );
  const isLarge = useMediaQuery("(min-width: 1920px)");
  const isXlarge = useMediaQuery("(min-width: 2560px)");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filter, setFilter] = useState({
    start_date: "",
    end_date: "",
  });
  const [cursuspend, setsuspend] = useState([]);
  const [type, setType] = useState("all");
  const [showPenaltySection, setShowPenaltySection] = useState(false);
  const [showWarningSection, setShowWarningSection] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  const { suspend } = useClasses();

  useEffect(() => {
    if (endDate == "") setEndDate(startDate);

    const _filter = {
      start_date: startDate && new Date(startDate).toLocaleDateString("en-CA"),
      end_date: endDate && new Date(endDate).toLocaleDateString("en-CA"),
    };
    setFilter(_filter);
  }, [startDate, endDate]);

  // context useEffect
  useEffect(() => {
    const _filter = {
      cursuspend: cursuspend,
      type: type,
    };
    setFilter(_filter);
  }, [cursuspend, type]);

  // handle suspend dropdown change
  const handleSuspendChange = (e) => {
    const {
      target: { value },
    } = e;

    // Check if "all" is selected
    if (value.includes("all")) {
      // If "all" is selected and all suspendes are already selected, deselect all
      if (cursuspend.length === suspend.length) {
        setsuspend([]);
      } else {
        // If "all" is selected and not all suspendes are selected, select all
        setsuspend(suspend);
      }
      return;
    }

    // Set the selected suspendes
    setsuspend(value);
  };

  // handle next button click in suspend section
  const handleNextButtonClick = () => {
    setShowPenaltySection(true);
  };

  // handle next button click in penalty section
  const handlePenaltyNextButtonClick = () => {
    setShowPenaltySection(false);
    setShowWarningSection(true);
  };

  // handle initiate click
  const handleInitiate = () => {
    setShowPrompt(true);
  };

  // handle closing the prompt dialog
  const handleClosePrompt = () => {
    setShowPrompt(false);
  };

  // handle notifying inactive users
  const handleSubmit = () => {
    try {
      toast.success("Action initiated successfully.", {
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error while displaying toast:", error);
    }
    setShowPrompt(false);
  };

  return (
    <Bbox
      mt={2}
      width={"100%"}
      height={"100%"}
      borderRadius={2}
      overflow="hidden"
    >
      {/* suspend section */}
      <Box
        mt={5}
        mb={3}
        style={{
          display:
            !showPenaltySection && !showWarningSection ? "block" : "none",
        }}
      >
        {/* process indicator */}
        <Box display="flex" alignItems="center" justifyContent={"center"}>
          {/* part 1 */}
          <Box>
            <Box display="flex" alignItems="center">
              <Box
                width={60}
                height={60}
                borderRadius="50%"
                bgcolor="#2F7DA1"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize={36}
                fontWeight={700}
                color="white"
              >
                1
              </Box>

              {/* Broad Line */}
              <Box height={8} width={25} bgcolor="#2F7DA1" />
            </Box>

            <Typography fontSize={14} fontWeight={500} color={"#2F7DA1"}>
              Suspend
            </Typography>
          </Box>

          {/* part 2 */}
          <Box>
            <Box display="flex" alignItems="center">
              {/* Broad Line */}
              <Box height={8} width={25} bgcolor="#ECEDED" />

              <Box
                width={60}
                height={60}
                borderRadius="50%"
                bgcolor="#ECEDED"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize={36}
                fontWeight={700}
                color="#2F7DA1"
              >
                2
              </Box>

              {/* Broad Line */}
              <Box height={8} width={25} bgcolor="#ECEDED" />
            </Box>

            <Typography fontSize={14} fontWeight={500} color={"#2F7DA1"} ml={4}>
              Penalty
            </Typography>
          </Box>

          {/* part 3 */}
          <Box>
            <Box display="flex" alignItems="center">
              {/* Broad Line */}
              <Box height={8} width={25} bgcolor="#ECEDED" />

              <Box
                width={60}
                height={60}
                borderRadius="50%"
                bgcolor="#ECEDED"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize={36}
                fontWeight={700}
                color="#2F7DA1"
              >
                3
              </Box>
            </Box>

            <Typography fontSize={14} fontWeight={500} color={"#2F7DA1"} ml={2}>
              Warning Slip
            </Typography>
          </Box>
        </Box>

        {/* suspend text box */}
        <Box sx={{ display: "flex" }}>
          <Box
            ml={3}
            mt={2}
            mr={3}
            height={40}
            width={"100%"}
            backgroundColor="#ECEDED"
            borderRadius={"6px"}
            display="flex"
            flexDirection="column"
          >
            {/* suspend text */}
            <Typography
              style={{
                fontSize: "14px",
                fontWeight: "500",
                marginLeft: "15px",
                marginBottom: "5px",
                marginTop: "9px",
              }}
            >
              Suspend
            </Typography>
          </Box>
        </Box>

        {/* detail box */}
        <Bbox
          mt={4}
          ml={3}
          width={"850px"}
          height={"96px"}
          borderRadius={2}
          overflow="hidden"
          display="flex"
          flexDirection="row"
          padding="10px"
        >
          {/* pic */}
          <img
            src={Photo}
            style={{ width: "70px", height: "70px", marginRight: "20px" }}
          />

          {/* details */}
          <Box display="flex" flexDirection="row" mt={1}>
            {/* student id */}
            <Box display="flex" flexDirection="column" gap={1} mr={6}>
              <Typography
                fontSize={"16px"}
                fontWeight={"400"}
                color={"#00494E"}
              >
                Student ID
              </Typography>
              <Typography
                fontSize={"16px"}
                fontWeight={"400"}
                color={"#625E5E"}
              >
                AG240001
              </Typography>
            </Box>

            {/* name */}
            <Box display="flex" flexDirection="column" gap={1} mr={6}>
              <Typography
                fontSize={"16px"}
                fontWeight={"400"}
                color={"#00494E"}
              >
                Name
              </Typography>
              <Typography
                fontSize={"16px"}
                fontWeight={"400"}
                color={"#625E5E"}
              >
                Saunav Roy
              </Typography>
            </Box>

            {/* class */}
            <Box display="flex" flexDirection="column" gap={1} mr={6}>
              <Typography
                fontSize={"16px"}
                fontWeight={"400"}
                color={"#00494E"}
              >
                Class
              </Typography>
              <Typography
                fontSize={"16px"}
                fontWeight={"400"}
                color={"#625E5E"}
              >
                VII
              </Typography>
            </Box>

            {/* section */}
            <Box display="flex" flexDirection="column" gap={1} mr={6}>
              <Typography
                fontSize={"16px"}
                fontWeight={"400"}
                color={"#00494E"}
              >
                Section
              </Typography>
              <Typography
                fontSize={"16px"}
                fontWeight={"400"}
                color={"#625E5E"}
              >
                C
              </Typography>
            </Box>

            {/* roll # */}
            <Box display="flex" flexDirection="column" gap={1} mr={6}>
              <Typography
                fontSize={"16px"}
                fontWeight={"400"}
                color={"#00494E"}
              >
                Roll #
              </Typography>
              <Typography
                fontSize={"16px"}
                fontWeight={"400"}
                color={"#625E5E"}
              >
                19
              </Typography>
            </Box>

            {/* last issue date */}
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography
                fontSize={"16px"}
                fontWeight={"400"}
                color={"#00494E"}
              >
                Last Issue Date
              </Typography>
              <Typography
                fontSize={"16px"}
                fontWeight={"400"}
                color={"#625E5E"}
              >
                N/A
              </Typography>
            </Box>
          </Box>
        </Bbox>

        {/* text */}
        <Box>
          <Typography ml={6} mt={7} mb={5} fontSize={16} fontWeight={600}>
            Non Compliance Category:{" "}
            <span style={{ fontWeight: 400 }}>Loss/Damage of property</span>
          </Typography>
        </Box>

        {/* Suspension Period Date input */}
        <Box display={"flex"} gap={2} width="400px" ml={3}>
          <DatePicker
            label="Start Date"
            format="DD MMM YYYY"
            onChange={(e) => setStartDate(e)}
          />
          <DatePicker
            label="End Date"
            format="DD MMM YYYY"
            minDate={startDate}
            onChange={(e) => setEndDate(e)}
          />
        </Box>

        {/* Suspend Access dropdown */}
        <Box m={3}>
          <FormControl style={{ width: "25rem" }}>
            <InputLabel>Suspend Access</InputLabel>
            <Select
              placeholder="All"
              multiple
              value={cursuspend}
              onChange={handleSuspendChange}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300,
                  },
                },
              }}
              input={<OutlinedInput label="Suspend Access" />}
              renderValue={(selected) =>
                selected.length === suspend.length ? "All" : selected.join(", ")
              }
            >
              {/* Select All option */}
              <MenuItem value="all">
                <ListItemIcon>
                  <Checkbox
                    checked={cursuspend.length === suspend.length}
                    indeterminate={
                      cursuspend.length > 0 &&
                      cursuspend.length < suspend.length
                    }
                  />
                </ListItemIcon>
                <ListItemText primary="Select All" />
              </MenuItem>
              {/* suspend options */}
              {suspend.map((suspendOption) => (
                <MenuItem key={suspendOption} value={suspendOption}>
                  <Checkbox
                    size="small"
                    checked={cursuspend.indexOf(suspendOption) > -1}
                  />
                  <ListItemText primary={suspendOption} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* next button */}
        <Box display={"flex"} justifyContent={"center"}>
          <Button
            variant="contained"
            sx={{
              width: "100%",
              maxWidth: "760px",
              marginTop: 3,
              marginBottom: 7,
            }}
            onClick={handleNextButtonClick}
          >
            <Typography
              variant="subtitle1"
              fontWeight="600"
              fontSize="16px"
              color="white"
            >
              Next
            </Typography>
          </Button>
        </Box>
      </Box>

      {/* penalty section */}
      <Box
        mt={5}
        mb={3}
        style={{ display: showPenaltySection ? "block" : "none" }}
      >
        {/* process indicator */}
        <Box display="flex" alignItems="center" justifyContent={"center"}>
          {/* part 1 */}
          <Box>
            <Box display="flex" alignItems="center">
              <Box
                width={60}
                height={60}
                borderRadius="50%"
                bgcolor="#2F7DA1"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize={36}
                fontWeight={700}
                color="white"
              >
                <Box style={{ color: "white", fontSize: "30px" }}>&#10003;</Box>
              </Box>

              {/* Broad Line */}
              <Box height={8} width={25} bgcolor="#2F7DA1" />
            </Box>

            <Typography fontSize={14} fontWeight={500} color={"#2F7DA1"}>
              Suspend
            </Typography>
          </Box>

          {/* part 2 */}
          <Box>
            <Box display="flex" alignItems="center">
              {/* Broad Line */}
              <Box height={8} width={25} bgcolor="#2F7DA1" />

              <Box
                width={60}
                height={60}
                borderRadius="50%"
                bgcolor="#2F7DA1"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize={36}
                fontWeight={700}
                color="white"
              >
                2
              </Box>

              {/* Broad Line */}
              <Box height={8} width={25} bgcolor="#ECEDED" />
            </Box>

            <Typography fontSize={14} fontWeight={500} color={"#2F7DA1"} ml={4}>
              Penalty
            </Typography>
          </Box>

          {/* part 3 */}
          <Box>
            <Box display="flex" alignItems="center">
              {/* Broad Line */}
              <Box height={8} width={25} bgcolor="#ECEDED" />

              <Box
                width={60}
                height={60}
                borderRadius="50%"
                bgcolor="#ECEDED"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize={36}
                fontWeight={700}
                color="#2F7DA1"
              >
                3
              </Box>
            </Box>

            <Typography fontSize={14} fontWeight={500} color={"#2F7DA1"} ml={2}>
              Warning Slip
            </Typography>
          </Box>
        </Box>

        {/* penalty text box */}
        <Box sx={{ display: "flex" }}>
          <Box
            ml={3}
            mt={2}
            mr={3}
            height={40}
            width={"100%"}
            backgroundColor="#ECEDED"
            borderRadius={"6px"}
            display="flex"
            flexDirection="column"
          >
            {/* penalty text */}
            <Typography
              style={{
                fontSize: "14px",
                fontWeight: "500",
                marginLeft: "15px",
                marginBottom: "5px",
                marginTop: "9px",
              }}
            >
              Penalty
            </Typography>
          </Box>
        </Box>

        {/* detail box */}
        <Bbox
          mt={4}
          ml={3}
          width={"850px"}
          height={"96px"}
          borderRadius={2}
          overflow="hidden"
          display="flex"
          flexDirection="row"
          padding="10px"
        >
          {/* pic */}
          <img
            src={Photo}
            style={{ width: "70px", height: "70px", marginRight: "20px" }}
          />

          {/* details */}
          <Box display="flex" flexDirection="row" mt={1}>
            {/* student id */}
            <Box display="flex" flexDirection="column" gap={1} mr={6}>
              <Typography
                fontSize={"16px"}
                fontWeight={"400"}
                color={"#00494E"}
              >
                Student ID
              </Typography>
              <Typography
                fontSize={"16px"}
                fontWeight={"400"}
                color={"#625E5E"}
              >
                AG240001
              </Typography>
            </Box>

            {/* name */}
            <Box display="flex" flexDirection="column" gap={1} mr={6}>
              <Typography
                fontSize={"16px"}
                fontWeight={"400"}
                color={"#00494E"}
              >
                Name
              </Typography>
              <Typography
                fontSize={"16px"}
                fontWeight={"400"}
                color={"#625E5E"}
              >
                Saunav Roy
              </Typography>
            </Box>

            {/* class */}
            <Box display="flex" flexDirection="column" gap={1} mr={6}>
              <Typography
                fontSize={"16px"}
                fontWeight={"400"}
                color={"#00494E"}
              >
                Class
              </Typography>
              <Typography
                fontSize={"16px"}
                fontWeight={"400"}
                color={"#625E5E"}
              >
                VII
              </Typography>
            </Box>

            {/* section */}
            <Box display="flex" flexDirection="column" gap={1} mr={6}>
              <Typography
                fontSize={"16px"}
                fontWeight={"400"}
                color={"#00494E"}
              >
                Section
              </Typography>
              <Typography
                fontSize={"16px"}
                fontWeight={"400"}
                color={"#625E5E"}
              >
                C
              </Typography>
            </Box>

            {/* roll # */}
            <Box display="flex" flexDirection="column" gap={1} mr={6}>
              <Typography
                fontSize={"16px"}
                fontWeight={"400"}
                color={"#00494E"}
              >
                Roll #
              </Typography>
              <Typography
                fontSize={"16px"}
                fontWeight={"400"}
                color={"#625E5E"}
              >
                19
              </Typography>
            </Box>

            {/* last issue date */}
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography
                fontSize={"16px"}
                fontWeight={"400"}
                color={"#00494E"}
              >
                Last Issue Date
              </Typography>
              <Typography
                fontSize={"16px"}
                fontWeight={"400"}
                color={"#625E5E"}
              >
                N/A
              </Typography>
            </Box>
          </Box>
        </Bbox>

        {/* flex */}
        <Box display={"flex"} flexDirection={"row"}>
          {/* inputs and text */}
          <Box>
            {/* text */}
            <Box>
              <Typography ml={6} mt={7} mb={5} fontSize={16} fontWeight={600}>
                Non Compliance Category:{" "}
                <span style={{ fontWeight: 400 }}>Loss/Damage of property</span>
              </Typography>
            </Box>

            {/* penalty due Date input */}
            <Box display={"flex"} gap={2} width="400px" ml={3}>
              <DatePicker
                label="Start Date"
                format="DD MMM YYYY"
                onChange={(e) => setStartDate(e)}
              />
              <DatePicker
                label="End Date"
                format="DD MMM YYYY"
                minDate={startDate}
                onChange={(e) => setEndDate(e)}
              />
            </Box>

            {/* Penalty Due Amount input field */}
            <Box m={3}>
              <TextField
                label="Penalty Due Amount"
                variant="outlined"
                type="number"
                sx={{ width: 400 }}
              />
            </Box>
          </Box>

          {/* Caution Money Balance box */}
          <Box
            width={250}
            height={190}
            backgroundColor={"#FAD2C0"}
            mt={7.5}
            ml={3}
            borderRadius={"8px"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Typography fontSize={32} fontWeight={600} color={"#545353"}>
              9900
            </Typography>
            <Typography fontSize={20} fontWeight={400} color={"#535353"}>
              Caution Money Balance
            </Typography>
          </Box>
        </Box>

        {/* checkbox and text */}
        <Box
          ml={3}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* checkbox */}
          <Checkbox
            checked={isChecked}
            onChange={(event) => setIsChecked(event.target.checked)}
            color="primary"
            style={{ fontSize: 16 }}
          />

          {/* text */}
          <Typography fontSize={"16px"} fontWeight={"400"}>
            Deduct from Caution Money
          </Typography>
        </Box>

        {/* next button */}
        <Box display={"flex"} justifyContent={"center"}>
          <Button
            variant="contained"
            sx={{
              width: "100%",
              maxWidth: "760px",
              marginTop: 3,
              marginBottom: 7,
            }}
            onClick={handlePenaltyNextButtonClick}
          >
            <Typography
              variant="subtitle1"
              fontWeight="600"
              fontSize="16px"
              color="white"
            >
              Next
            </Typography>
          </Button>
        </Box>
      </Box>

      {/* warning slip section */}
      <Box style={{ display: showWarningSection ? "block" : "none" }}>
        {/* process indicator */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent={"center"}
          mt={5}
          mb={3}
        >
          {/* part 1 */}
          <Box>
            <Box display="flex" alignItems="center">
              <Box
                width={60}
                height={60}
                borderRadius="50%"
                bgcolor="#2F7DA1"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize={36}
                fontWeight={700}
                color="white"
              >
                <Box style={{ color: "white", fontSize: "30px" }}>&#10003;</Box>
              </Box>

              {/* Broad Line */}
              <Box height={8} width={25} bgcolor="#2F7DA1" />
            </Box>

            <Typography fontSize={14} fontWeight={500} color={"#2F7DA1"}>
              Suspend
            </Typography>
          </Box>

          {/* part 2 */}
          <Box>
            <Box display="flex" alignItems="center">
              {/* Broad Line */}
              <Box height={8} width={25} bgcolor="#2F7DA1" />

              <Box
                width={60}
                height={60}
                borderRadius="50%"
                bgcolor="#2F7DA1"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize={36}
                fontWeight={700}
                color="white"
              >
                <Box style={{ color: "white", fontSize: "30px" }}>&#10003;</Box>
              </Box>

              {/* Broad Line */}
              <Box height={8} width={25} bgcolor="#2F7DA1" />
            </Box>

            <Typography fontSize={14} fontWeight={500} color={"#2F7DA1"} ml={4}>
              Penalty
            </Typography>
          </Box>

          {/* part 3 */}
          <Box>
            <Box display="flex" alignItems="center">
              {/* Broad Line */}
              <Box height={8} width={25} bgcolor="#2F7DA1" />

              <Box
                width={60}
                height={60}
                borderRadius="50%"
                bgcolor="#2F7DA1"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize={36}
                fontWeight={700}
                color="white"
              >
                3
              </Box>
            </Box>

            <Typography fontSize={14} fontWeight={500} color={"#2F7DA1"} ml={2}>
              Warning Slip
            </Typography>
          </Box>
        </Box>

        {/* warning slip text box */}
        <Box sx={{ display: "flex" }}>
          <Box
            ml={3}
            mt={2}
            mr={3}
            height={40}
            width={"100%"}
            backgroundColor="#ECEDED"
            borderRadius={"6px"}
            display="flex"
            flexDirection="column"
          >
            {/* penalty text */}
            <Typography
              style={{
                fontSize: "14px",
                fontWeight: "500",
                marginLeft: "15px",
                marginBottom: "5px",
                marginTop: "9px",
              }}
            >
              Warning Slip
            </Typography>
          </Box>
        </Box>

        {/* detail box */}
        <Bbox
          mt={4}
          ml={3}
          width={"850px"}
          height={"96px"}
          borderRadius={2}
          overflow="hidden"
          display="flex"
          flexDirection="row"
          padding="10px"
        >
          {/* pic */}
          <img
            src={Photo}
            style={{ width: "70px", height: "70px", marginRight: "20px" }}
          />

          {/* details */}
          <Box display="flex" flexDirection="row" mt={1}>
            {/* student id */}
            <Box display="flex" flexDirection="column" gap={1} mr={6}>
              <Typography
                fontSize={"16px"}
                fontWeight={"400"}
                color={"#00494E"}
              >
                Student ID
              </Typography>
              <Typography
                fontSize={"16px"}
                fontWeight={"400"}
                color={"#625E5E"}
              >
                AG240001
              </Typography>
            </Box>

            {/* name */}
            <Box display="flex" flexDirection="column" gap={1} mr={6}>
              <Typography
                fontSize={"16px"}
                fontWeight={"400"}
                color={"#00494E"}
              >
                Name
              </Typography>
              <Typography
                fontSize={"16px"}
                fontWeight={"400"}
                color={"#625E5E"}
              >
                Saunav Roy
              </Typography>
            </Box>

            {/* class */}
            <Box display="flex" flexDirection="column" gap={1} mr={6}>
              <Typography
                fontSize={"16px"}
                fontWeight={"400"}
                color={"#00494E"}
              >
                Class
              </Typography>
              <Typography
                fontSize={"16px"}
                fontWeight={"400"}
                color={"#625E5E"}
              >
                VII
              </Typography>
            </Box>

            {/* section */}
            <Box display="flex" flexDirection="column" gap={1} mr={6}>
              <Typography
                fontSize={"16px"}
                fontWeight={"400"}
                color={"#00494E"}
              >
                Section
              </Typography>
              <Typography
                fontSize={"16px"}
                fontWeight={"400"}
                color={"#625E5E"}
              >
                C
              </Typography>
            </Box>

            {/* roll # */}
            <Box display="flex" flexDirection="column" gap={1} mr={6}>
              <Typography
                fontSize={"16px"}
                fontWeight={"400"}
                color={"#00494E"}
              >
                Roll #
              </Typography>
              <Typography
                fontSize={"16px"}
                fontWeight={"400"}
                color={"#625E5E"}
              >
                19
              </Typography>
            </Box>

            {/* last issue date */}
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography
                fontSize={"16px"}
                fontWeight={"400"}
                color={"#00494E"}
              >
                Last Issue Date
              </Typography>
              <Typography
                fontSize={"16px"}
                fontWeight={"400"}
                color={"#625E5E"}
              >
                N/A
              </Typography>
            </Box>
          </Box>
        </Bbox>

        {/* text */}
        <Box>
          <Typography ml={6} mt={7} mb={5} fontSize={16} fontWeight={600}>
            Non Compliance Category:{" "}
            <span style={{ fontWeight: 400 }}>Loss/Damage of property</span>
          </Typography>
        </Box>

        {/* Buttons */}
        <Box display="flex" flexDirection={"row"} ml={3} gap={2}>
          {/* edit template button */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#C4673B",
              "&:hover": { backgroundColor: "#A14E2C", color: "white" },
            }}
          >
            Edit Template
          </Button>

          {/* Preview Warning Slip button */}
          <Button
            variant="outlined"
            sx={{
              color: "#C4673B",
              border: "1px solid #C4673B",
              "&:hover": {
                backgroundColor: "#A14E2C",
                color: "white",
                border: "none",
              },
            }}
          >
            Preview Warning Slip
          </Button>
        </Box>

        {/* comment box */}
        <Box m={3} mt={10} width={524} height={140}>
          <TextField
            label="Add Comment"
            variant="outlined"
            multiline
            rows={6}
            fullWidth
            sx={{ backgroundColor: "#FFF8F8" }}
          />
        </Box>

        {/* Initiate Action button */}
        <Box display={"flex"} justifyContent={"center"}>
          <Button
            variant="contained"
            sx={{
              width: "100%",
              maxWidth: "760px",
              marginTop: 3,
              marginBottom: 7,
            }}
            onClick={handleInitiate}
          >
            <Typography
              variant="subtitle1"
              fontWeight="600"
              fontSize="16px"
              color="white"
            >
              Initiate Action
            </Typography>
          </Button>
        </Box>
      </Box>

      <ToastContainer />

      {/* Prompt dialog */}
      <Dialog open={showPrompt} onClose={handleClosePrompt}>
        <div
          style={{
            backgroundColor: "#3B98C4",
            height: "15px",
            width: "100%",
          }}
        />
        <DialogTitle style={{ fontSize: "18px", fontWeight: "500" }}>
          Are you sure you want to initiate action against the student?
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={handleClosePrompt}
            sx={{
              color: "red",
              fontWeight: "400",
              "&:hover": {
                backgroundColor: "#FFECEB",
              },
            }}
          >
            No
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Bbox>
  );
};

export default ActionIndividualInitiate;
