import React, { useState } from "react";
import RevealCard from "../../AnimationComponents/RevealCard";
import Bbox from "../../UiComponents/Bbox";
import { Box, Typography, IconButton } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { DatePicker } from "@mui/x-date-pickers";
import { useMediaQuery } from "@material-ui/core";

const Suspension = () => {
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

  return (
    <RevealCard>
      <Bbox
        mt={2}
        width={"100%"}
        height={"600px"}
        borderRadius={2}
        overflow="hidden"
      >
        {/* flex row */}
        <Box
          m={3}
          display="flex"
          flexDirection="row"
          justifyContent="center"
          gap={2}
        >
          {/* box 1 */}
          <Box
            width={isTablet ? 330 : 400}
            height={"100%"}
            border="1px solid #C5BCBC"
            borderRadius={2}
            padding={2}
            display="flex"
            flexDirection="column"
            gap={1}
          >
            {/* line 1 */}
            <Box display="flex" flexDirection="row">
              <Typography color="#000" fontSize="14px" fontWeight="400">
                Incident #
              </Typography>
              <Typography
                color="#555454"
                fontSize="14px"
                fontWeight="400"
                paddingLeft="68px"
              >
                BB12DC12
              </Typography>

              {/* icon */}
              <IconButton
                size="small"
                style={{
                  marginLeft: "auto",
                  border: "1px solid #B8B0B0",
                  borderRadius: "50%",
                  padding: "4px",
                }}
              >
                <EditOutlinedIcon
                  style={{ color: "#B8B0B0", fontSize: "16px" }}
                />
              </IconButton>
            </Box>

            {/* line 2 */}
            <Box display="flex" flexDirection="row">
              <Typography color="#000" fontSize="14px" fontWeight="400">
                Suspension Period
              </Typography>

              {/* <Box display={"flex"} gap={2} width="200px">
                <DatePicker
                  label="Start Date"
                  onChange={(e) => setStartDate(e)}
                  format="DD MMM YYYY"
                  // sx={{ width: "150px", height: "30px"}}
                />
                <DatePicker
                  format="DD MMM YYYY"
                  label="End Date"
                  minDate={startDate}
                  onChange={(e) => setEndDate(e)}
                />
              </Box> */}

              <Typography
                color="#555454"
                fontSize={isTablet ? "11px" : "14px"}
                fontWeight={isTablet ? "600" : "400"}
                paddingLeft="12px"
              >
                20-Aug-2023 <span style={{ color: "#000" }}>to</span>{" "}
                20-Sep-2023
              </Typography>
            </Box>

            {/* line 3 */}
            <Box display="flex" flexDirection="row">
              <Typography
                color="#000"
                fontSize="14px"
                fontWeight="400"
                width="133px"
              >
                Non-Compliance type
              </Typography>
              <Box
                backgroundColor="#F9DEDC"
                width={isTablet ? "160px" : "190px"}
                height="27px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                marginTop="5px"
              >
                <Typography color="#000" fontSize="11px" fontWeight="400">
                  Loss of Damage of property
                </Typography>
              </Box>
            </Box>

            {/* line 4 */}
            <Box display="flex" flexDirection="row">
              <Typography color="#000" fontSize="14px" fontWeight="400">
                Status
              </Typography>

              <Box
                marginLeft="90px"
                backgroundColor="#C6F6D5"
                padding="0 8px"
                borderRadius="6px"
              >
                <Typography color="#22543D" fontSize="14px" fontWeight="400">
                  Active
                </Typography>
              </Box>
            </Box>

            {/* line 5 */}
            <Box display="flex" flexDirection="row">
              <Typography color="#000" fontSize="14px" fontWeight="400">
                Last Actioned by
              </Typography>
              <Typography
                color="#555454"
                fontSize="14px"
                fontWeight="400"
                paddingLeft="24px"
              >
                NN78M672
              </Typography>
            </Box>

            {/* line 6 */}
            <Box display="flex" flexDirection="row">
              <Typography color="#000" fontSize="14px" fontWeight="400">
                Comments
              </Typography>

              <Box
                border="1px solid #CBC6C6"
                borderRadius="6px"
                marginLeft="62px"
              >
                <Typography
                  color="#555454"
                  fontSize="14px"
                  fontWeight="400"
                  padding={1}
                >
                  Lorem ipsum dolor sit amet consectetur. Non bibendum nulla
                  risus mauris pharetra ut at augue. Mattis quis netus
                  scelerisque a congue. Nibh commodo est sed sed eu vel
                  consequat.
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* box 2 */}
          <Box
            width={isTablet ? 330 : 400}
            height={"100%"}
            border="1px solid #C5BCBC"
            borderRadius={2}
            padding={2}
            display="flex"
            flexDirection="column"
            gap={1}
          >
            {/* line 1 */}
            <Box display="flex" flexDirection="row">
              <Typography color="#000" fontSize="14px" fontWeight="400">
                Incident #
              </Typography>
              <Typography
                color="#555454"
                fontSize="14px"
                fontWeight="400"
                paddingLeft="70px"
              >
                BB12DC12
              </Typography>
            </Box>

            {/* line 2 */}
            <Box display="flex" flexDirection="row">
              <Typography color="#000" fontSize="14px" fontWeight="400">
                Suspension Period
              </Typography>
              <Typography
                color="#555454"
                fontSize={isTablet ? "11px" : "14px"}
                fontWeight={isTablet ? "600" : "400"}
                paddingLeft="14px"
              >
                20-Aug-2023 <span style={{ color: "#000" }}>to</span>{" "}
                20-Sep-2023
              </Typography>
            </Box>

            {/* line 3 */}
            <Box display="flex" flexDirection="row">
              <Typography
                color="#000"
                fontSize="14px"
                fontWeight="400"
                width="133px"
              >
                Non-Compliance type
              </Typography>
              <Box
                backgroundColor="#F9DEDC"
                width={isTablet ? "160px" : "190px"}
                height="27px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                marginTop="5px"
              >
                <Typography color="#000" fontSize="11px" fontWeight="400">
                  Loss of Damage of property
                </Typography>
              </Box>
            </Box>

            {/* line 4 */}
            <Box display="flex" flexDirection="row">
              <Typography color="#000" fontSize="14px" fontWeight="400">
                Status
              </Typography>

              <Box
                marginLeft="90px"
                backgroundColor="#FED7D7"
                padding="0 8px"
                borderRadius="6px"
              >
                <Typography color="#822727" fontSize="14px" fontWeight="400">
                  Cancelled
                </Typography>
              </Box>
            </Box>

            {/* line 5 */}
            <Box display="flex" flexDirection="row">
              <Typography color="#000" fontSize="14px" fontWeight="400">
                Last Actioned by
              </Typography>
              <Typography
                color="#555454"
                fontSize="14px"
                fontWeight="400"
                paddingLeft="24px"
              >
                NN78M672
              </Typography>
            </Box>

            {/* line 6 */}
            <Box display="flex" flexDirection="row">
              <Typography color="#000" fontSize="14px" fontWeight="400">
                Comments
              </Typography>

              <Box
                border="1px solid #CBC6C6"
                borderRadius="6px"
                marginLeft="62px"
              >
                <Typography
                  color="#555454"
                  fontSize="14px"
                  fontWeight="400"
                  padding={1}
                >
                  Lorem ipsum dolor sit amet consectetur. Non bibendum nulla
                  risus mauris pharetra ut at augue. Mattis quis netus
                  scelerisque a congue. Nibh commodo est sed sed eu vel
                  consequat.
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* box 3 */}
          <Box
            width={isTablet ? 330 : 400}
            height={"100%"}
            border="1px solid #C5BCBC"
            borderRadius={2}
            padding={2}
            display="flex"
            flexDirection="column"
            gap={1}
          >
            {/* line 1 */}
            <Box display="flex" flexDirection="row">
              <Typography color="#000" fontSize="14px" fontWeight="400">
                Incident #
              </Typography>
              <Typography
                color="#555454"
                fontSize="14px"
                fontWeight="400"
                paddingLeft="70px"
              >
                BB12DC12
              </Typography>
            </Box>

            {/* line 2 */}
            <Box display="flex" flexDirection="row">
              <Typography color="#000" fontSize="14px" fontWeight="400">
                Suspension Period
              </Typography>
              <Typography
                color="#555454"
                fontSize={isTablet ? "11px" : "14px"}
                fontWeight={isTablet ? "600" : "400"}
                paddingLeft="14px"
              >
                20-Aug-2023 <span style={{ color: "#000" }}>to</span>{" "}
                20-Sep-2023
              </Typography>
            </Box>

            {/* line 3 */}
            <Box display="flex" flexDirection="row">
              <Typography
                color="#000"
                fontSize="14px"
                fontWeight="400"
                width="133px"
              >
                Non-Compliance type
              </Typography>
              <Box
                backgroundColor="#F9DEDC"
                width={isTablet ? "160px" : "190px"}
                height="27px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                marginTop="5px"
              >
                <Typography color="#000" fontSize="11px" fontWeight="400">
                  Loss of Damage of property
                </Typography>
              </Box>
            </Box>

            {/* line 4 */}
            <Box display="flex" flexDirection="row">
              <Typography color="#000" fontSize="14px" fontWeight="400">
                Status
              </Typography>

              <Box
                marginLeft="90px"
                backgroundColor="#BEE3F8"
                padding="0 8px"
                borderRadius="6px"
              >
                <Typography color="#2A4365" fontSize="14px" fontWeight="400">
                  Completed
                </Typography>
              </Box>
            </Box>

            {/* line 5 */}
            <Box display="flex" flexDirection="row">
              <Typography color="#000" fontSize="14px" fontWeight="400">
                Last Actioned by
              </Typography>
              <Typography
                color="#555454"
                fontSize="14px"
                fontWeight="400"
                paddingLeft="24px"
              >
                NN78M672
              </Typography>
            </Box>

            {/* line 6 */}
            <Box display="flex" flexDirection="row">
              <Typography color="#000" fontSize="14px" fontWeight="400">
                Comments
              </Typography>

              <Box
                border="1px solid #CBC6C6"
                borderRadius="6px"
                marginLeft="62px"
              >
                <Typography
                  color="#555454"
                  fontSize="14px"
                  fontWeight="400"
                  padding={1}
                >
                  Lorem ipsum dolor sit amet consectetur. Non bibendum nulla
                  risus mauris pharetra ut at augue. Mattis quis netus
                  scelerisque a congue. Nibh commodo est sed sed eu vel
                  consequat.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Bbox>
    </RevealCard>
  );
};

export default Suspension;
