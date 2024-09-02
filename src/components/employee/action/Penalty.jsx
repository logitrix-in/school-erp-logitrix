import React from "react";
import RevealCard from "../../AnimationComponents/RevealCard";
import Bbox from "../../UiComponents/Bbox";
import { Box, Typography, IconButton } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useMediaQuery } from "@material-ui/core";

const Penalty = () => {
  // breakpoints
  const isSmall = useMediaQuery("(max-width: 1364px)");
  const isTablet = useMediaQuery("(min-width: 1365px) and (max-width: 1535px)");
  const isLaptop = useMediaQuery("(min-width: 1536px) and (max-width: 1706px)");
  const isDesktop = useMediaQuery(
    "(min-width: 1707px) and (max-width: 1919px)"
  );
  const isLarge = useMediaQuery("(min-width: 1920px)");
  const isXlarge = useMediaQuery("(min-width: 2560px)");

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
                paddingLeft="69px"
              >
                BB12DC12
              </Typography>
            </Box>

            {/* line 2 */}
            <Box display="flex" flexDirection="row">
              <Typography
                color="#000"
                fontSize="14px"
                fontWeight="400"
                width="135px"
              >
                Penalty Due Date
              </Typography>
              <Typography
                // sx={{ marginLeft: isTablet ? 2.3 : 0 }}
                color="#555454"
                fontSize="14px"
                fontWeight="400"
              >
                20-Aug-2023
              </Typography>
            </Box>

            {/* line 3 */}
            <Box display="flex" flexDirection="row">
              <Typography
                color="#000"
                fontSize="14px"
                fontWeight="400"
                width="135px"
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
                Penalty Fee
              </Typography>

              <Box
                backgroundColor="#F9DEDC"
                width="40px"
                height="17px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                marginTop="2px"
                marginLeft="59px"
                padding="8px 8px"
              >
                <Typography color="#000" fontSize="11px" fontWeight="400">
                  ₹ 50
                </Typography>
              </Box>
            </Box>

            {/* line 5 */}
            <Box display="flex" flexDirection="row">
              <Typography color="#000" fontSize="14px" fontWeight="400">
                Status
              </Typography>
              <Box
                backgroundColor="#C6F6D5"
                width="33px"
                height="20px"
                borderRadius="6px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                marginTop="2px"
                marginLeft="91px"
                padding="0 8px"
              >
                <Typography color="#22543D" fontSize="11px" fontWeight="400">
                  Paid
                </Typography>
              </Box>
            </Box>

            {/* line 6 */}
            <Box display="flex" flexDirection="row">
              <Typography color="#000" fontSize="14px" fontWeight="400">
                Comments
              </Typography>

              <Box
                border="1px solid #CBC6C6"
                borderRadius="6px"
                marginLeft="63px"
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
                paddingLeft="69px"
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
              <Typography
                color="#000"
                fontSize="14px"
                fontWeight="400"
                width="135px"
              >
                Penalty Due Date
              </Typography>
              <Typography
                color="#555454"
                fontSize="14px"
                fontWeight="400"
              >
                20-Aug-2023
              </Typography>
            </Box>

            {/* line 3 */}
            <Box display="flex" flexDirection="row">
              <Typography
                color="#000"
                fontSize="14px"
                fontWeight="400"
                width="135px"
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
                Penalty Fee
              </Typography>

              <Box
                backgroundColor="#F9DEDC"
                width="40px"
                height="17px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                marginTop="2px"
                marginLeft="59px"
                padding="8px 8px"
              >
                <Typography
                  color="#000"
                  fontSize={isTablet ? "10px" : "11px"}
                  fontWeight="400"
                >
                  ₹ 50
                </Typography>
              </Box>

              <Box
                backgroundColor="#C4673B"
                width="85px"
                height="27px"
                borderRadius="6px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                marginLeft="30px"
                padding="12px 14px"
              >
                <Typography
                  color="#000"
                  fontSize={isTablet ? "13px" : "14px"}
                  fontWeight="600"
                >
                  Pay Now
                </Typography>
              </Box>
            </Box>

            {/* line 5 */}
            <Box display="flex" flexDirection="row">
              <Typography color="#000" fontSize="14px" fontWeight="400">
                Status
              </Typography>
              <Box
                backgroundColor="#FED7D7"
                width="33px"
                height="20px"
                borderRadius="6px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                marginTop="2px"
                marginLeft="91px"
                padding="0 8px"
              >
                <Typography color="#822727" fontSize="11px" fontWeight="400">
                  Due
                </Typography>
              </Box>
            </Box>

            {/* line 6 */}
            <Box display="flex" flexDirection="row">
              <Typography color="#000" fontSize="14px" fontWeight="400">
                Comments
              </Typography>

              <Box
                border="1px solid #CBC6C6"
                borderRadius="6px"
                marginLeft="64px"
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
                paddingLeft="69px"
              >
                BB12DC12
              </Typography>
            </Box>

            {/* line 2 */}
            <Box display="flex" flexDirection="row">
              <Typography
                color="#000"
                fontSize="14px"
                fontWeight="400"
                width="135px"
              >
                Penalty Due Date
              </Typography>
              <Typography
                color="#555454"
                fontSize="14px"
                fontWeight="400"
              >
                20-Aug-2023
              </Typography>
            </Box>

            {/* line 3 */}
            <Box display="flex" flexDirection="row">
              <Typography
                color="#000"
                fontSize="14px"
                fontWeight="400"
                width="135px"
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
                Penalty Fee
              </Typography>

              <Box
                backgroundColor="#F9DEDC"
                width="40px"
                height="17px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                marginTop="2px"
                marginLeft="59px"
                padding="8px 8px"
              >
                <Typography color="#000" fontSize="11px" fontWeight="400">
                  ₹ 50
                </Typography>
              </Box>
            </Box>

            {/* line 5 */}
            <Box display="flex" flexDirection="row">
              <Typography color="#000" fontSize="14px" fontWeight="400">
                Status
              </Typography>
              <Box
                backgroundColor="#BEE3F8"
                width="80px"
                height="20px"
                borderRadius="6px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                marginTop="2px"
                marginLeft="91px"
                padding="0 8px"
              >
                <Typography color="#2A4365" fontSize="11px" fontWeight="400">
                  Waived Off
                </Typography>
              </Box>
            </Box>

            {/* line 6 */}
            <Box display="flex" flexDirection="row">
              <Typography color="#000" fontSize="14px" fontWeight="400">
                Comments
              </Typography>

              <Box
                border="1px solid #CBC6C6"
                borderRadius="6px"
                marginLeft="64px"
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

export default Penalty;
