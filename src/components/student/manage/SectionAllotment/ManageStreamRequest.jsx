import React, { useState } from "react";
import RevealCard from "../../../AnimationComponents/RevealCard";
import Bbox from "../../../UiComponents/Bbox";
import {
  Box,
  Typography,
  FormControl,
  MenuItem,
  Select,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from "@mui/material";
import { Icon } from "@iconify/react";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@material-ui/core";

const ManageStreamRequest = () => {
  // breakpoints
  const isSmall = useMediaQuery("(max-width: 1364px)");
  const isTablet = useMediaQuery("(min-width: 1365px) and (max-width: 1535px)");
  const isLaptop = useMediaQuery("(min-width: 1536px) and (max-width: 1706px)");
  const isDesktop = useMediaQuery(
    "(min-width: 1707px) and (max-width: 1919px)"
  );
  const isLarge = useMediaQuery("(min-width: 1920px)");
  const isXlarge = useMediaQuery("(min-width: 2560px)");

  const navigate = useNavigate();

  const [stream, setStream] = useState("Science");
  const [openDialog, setOpenDialog] = useState(false);
  const [scienceValue, setScienceValue] = useState("");
  const [commerceValue, setCommerceValue] = useState("");
  const [humanitiesValue, setHumanitiesValue] = useState("");

  // set stream eligibility dialog open
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // set stream eligibility dialog close
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChangeScience = (event) => {
    const inputValue = event.target.value;
    // Validate input to allow numbers between 0 to 100 with optional decimal places
    if (
      /^\d{0,2}(\.\d{0,2})?$/.test(inputValue) &&
      parseFloat(inputValue) <= 100
    ) {
      setScienceValue(inputValue);
    } else if (inputValue === "" || /^\d{0,2}(\.\d{0,2})?$/.test(inputValue)) {
      setScienceValue(inputValue);
    }
  };

  const handleChangeCommerce = (event) => {
    const inputValue = event.target.value;
    // Validate input to allow only numbers between 0 to 100
    if (/^\d{0,2}$/.test(inputValue) && parseInt(inputValue) <= 100) {
      setCommerceValue(inputValue);
    } else if (inputValue === "" || /^\d{0,2}$/.test(inputValue)) {
      setCommerceValue(inputValue);
    }
  };

  const handleChangeHumanities = (event) => {
    const inputValue = event.target.value;
    // Validate input to allow only numbers between 0 to 100
    if (/^\d{0,2}$/.test(inputValue) && parseInt(inputValue) <= 100) {
      setHumanitiesValue(inputValue);
    } else if (inputValue === "" || /^\d{0,2}$/.test(inputValue)) {
      setHumanitiesValue(inputValue);
    }
  };

  return (
    <RevealCard>
      <Bbox
        mt={2}
        width={"100%"}
        height={630}
        borderRadius={2}
        overflow="hidden"
      >
        {/* Buttons */}
        <Box mt={4} ml={3} display="flex" flexDirection="row">
          {/* Set Stream Eligibility button */}
          <Button variant="outlined" onClick={handleOpenDialog}>
            Set Stream Eligibility
          </Button>

          {/* Download Stream Preference List button */}
          <Button variant="contained" style={{ marginLeft: "30px" }}>
            Download Stream Preference List
          </Button>
        </Box>

        {/* Dashboard text and stream selection dropdown */}
        <Box
          ml={3}
          mt={4}
          mr={3}
          height={40}
          backgroundColor="#ECEDED"
          borderRadius={"6px"}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          {/* dashboard text */}
          <Typography
            style={{
              fontSize: "14px",
              fontWeight: "500",
              marginLeft: "15px",
            }}
          >
            Dashboard
          </Typography>

          {/* stream selection dropdown */}
          <FormControl
            style={{
              width: 130,
              marginRight: "15px",
              background: "white",
              borderRadius: "5px",
            }}
          >
            <Select
              value={stream}
              onChange={(e) => setStream(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Select Stream" }}
              style={{ height: "30px", fontSize: "14px" }}
            >
              <MenuItem value="Science">Science</MenuItem>
              <MenuItem value="Commerce">Commerce</MenuItem>
              <MenuItem value="Humanities">Humanities</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Grid boxes */}
        <Box mr={3} ml={3} mt={4} sx={{ display: isSmall ? "" : "flex" }}>
          {/* grid boxes */}
          <Box gap={4} flex={1} display={"flex"}>
            {/* confirmed seats */}
            <Box
              position={"relative"}
              width="245px"
              height="296px"
              borderRadius={1}
              display={"flex"}
              alignItems={"center"}
              sx={{
                background: "linear-gradient(to right, #2C7BA0, #9BD9F4)",
                textAlign: "center",
              }}
            >
              {/* linear box */}
              <Box flex={2} p={3}>
                <Typography
                  fontSize={"48px"}
                  fontWeight={600}
                  color={"#FFF"}
                  lineHeight={1.2}
                >
                  0/100
                </Typography>
                <Typography fontSize={"20px"} fontWeight={"700"} color={"#FFF"}>
                  Confirmed Seats
                </Typography>
              </Box>

              {/* download icon */}
              <Box position={"absolute"} bottom={"0.1rem"} right={"0.1rem"}>
                <IconButton>
                  <Icon icon={"ic:round-download"} fontSize={"1.4rem"} />
                </IconButton>
              </Box>
            </Box>

            {/* flex column boxes */}
            <Box>
              {/* no. of requests */}
              <Box
                borderRadius={1}
                p={2}
                sx={{
                  background: "linear-gradient(to right, #E59D7A, #FAD2C0)",
                }}
                width={isTablet ? "360px" : "450px"}
                height="133px"
                display={"flex"}
                alignItems={"center"}
              >
                <Box flex={2} p={3}>
                  <Typography
                    fontSize={"40px"}
                    fontWeight={600}
                    color={"#00494E"}
                  >
                    122
                  </Typography>
                  <Typography
                    fontSize={"16px"}
                    fontWeight={"500"}
                    color={"#B34A19"}
                  >
                    No. of Requests (Preference 1)
                  </Typography>
                </Box>

                {/* download icon */}
                <Box paddingTop={12}>
                  <IconButton>
                    <Icon icon={"ic:round-download"} fontSize={"1.4rem"} />
                  </IconButton>
                </Box>
              </Box>

              {/* eligible from preference */}
              <Box
                borderRadius={1}
                p={2}
                sx={{ backgroundColor: "#C2DFED" }}
                width={isTablet ? "360px" : "450px"}
                height="133px"
                display={"flex"}
                alignItems={"center"}
                marginTop="30px"
              >
                <Box flex={2} p={3}>
                  <Typography
                    fontSize={"40px"}
                    fontWeight={600}
                    color={"#00494E"}
                  >
                    122
                  </Typography>
                  <Typography
                    fontSize={"16px"}
                    fontWeight={"500"}
                    color={"#3B98C4"}
                  >
                    Eligible from Preference 1 List
                  </Typography>
                </Box>

                {/* download icon */}
                <Box paddingTop={12}>
                  <IconButton>
                    <Icon icon={"ic:round-download"} fontSize={"1.4rem"} />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* buttons */}
          <Box
            display="flex"
            flexDirection="column"
            justifyContent={"center"}
            marginRight={
              isLaptop ? "50px" : isLarge ? "150px" : isTablet ? "0px" : "80px"
            }
            marginLeft={isSmall ? "280px" : ""}
          >
            {/* Rationalise button */}
            <Button
              variant="outlined"
              style={{
                marginBottom: "10px",
                width: isSmall ? "300px" : "100%",
                marginTop: isSmall ? "30px" : "",
              }}
              onClick={() =>
                navigate(
                  "/student/manage/section-allotment/manage-stream-request/rationalise"
                )
              }
            >
              Rationalise
            </Button>

            {/* Allocate Seat for External Admission button */}
            <Button
              variant="contained"
              sx={{
                width: isSmall ? "300px" : "100%",
                marginTop: "10px",
                backgroundColor: "#C4673B",
                borderColor: "#2F7DA1",
                "&:hover": {
                  backgroundColor: "#A14E2C",
                  color: "white",
                },
              }}
            >
              Allocate Seat for External Admission
            </Button>
          </Box>
        </Box>
      </Bbox>

      {/* set stream eligibility dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        {/* dialog title */}
        <DialogTitle
          sx={{
            backgroundColor: "#2F7DA1",
            textAlign: "center",
            color: "#fff",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <div style={{ marginRight: "30px" }}>
            Set Cutoff Marks ( Percentage )
          </div>

          {/* close icon */}
          <IconButton
            aria-label="cloase"
            size="small"
            onClick={handleCloseDialog}
          >
            <Icon icon={"ep:close-bold"} color="white" fontSize={"1.3rem"} />
          </IconButton>
        </DialogTitle>

        <DialogContent style={{ marginTop: "20px" }}>
          {/* science */}
          <Box display={"flex"} flexDirection={"row"} mb={2} mt={1}>
            <Typography fontSize={"14px"} fontWeight={"500"} mt={1}>
              Science
            </Typography>
            <TextField
              label="Science"
              variant="outlined"
              size="small"
              style={{ marginLeft: "63px", width: "150px" }}
              value={scienceValue}
              onChange={handleChangeScience}
              inputProps={{
                maxLength: 3,
                pattern: "[0-9]*",
                inputMode: "numeric",
              }}
              InputProps={{
                endAdornment: <Typography variant="subtitle1">%</Typography>,
              }}
            />
          </Box>

          {/* commerce */}
          <Box display={"flex"} flexDirection={"row"} mb={2}>
            <Typography fontSize={"14px"} fontWeight={"500"} mt={1}>
              Commerce
            </Typography>
            <TextField
              label="Commerce"
              variant="outlined"
              size="small"
              style={{ marginLeft: "44px", width: "150px" }}
              value={commerceValue}
              onChange={handleChangeCommerce}
              inputProps={{
                maxLength: 3,
                pattern: "[0-9]*",
                inputMode: "numeric",
              }}
              InputProps={{
                endAdornment: <Typography variant="subtitle1">%</Typography>,
              }}
            />
          </Box>

          {/* humanities */}
          <Box display={"flex"} flexDirection={"row"} mb={5}>
            <Typography fontSize={"14px"} fontWeight={"500"} mt={1}>
              Humanities
            </Typography>
            <TextField
              label="Humanities"
              variant="outlined"
              size="small"
              style={{ marginLeft: "40px", width: "150px" }}
              value={humanitiesValue}
              onChange={handleChangeHumanities}
              inputProps={{
                maxLength: 3,
                pattern: "[0-9]*",
                inputMode: "numeric",
              }}
              InputProps={{
                endAdornment: <Typography variant="subtitle1">%</Typography>,
              }}
            />
          </Box>

          {/* Save and Cancel buttons */}
          <Box display="flex" justifyContent="flex-end" mt={2}>
            {/* save button */}
            <Button variant="contained" onClick={handleCloseDialog}>
              Save
            </Button>

            {/* cancel button */}
            <Button
              variant="outlined"
              onClick={handleCloseDialog}
              style={{ marginLeft: "8px" }}
            >
              Cancel
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </RevealCard>
  );
};

export default ManageStreamRequest;
