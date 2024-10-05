import React from "react";
import RevealCard from "../../AnimationComponents/RevealCard";
import Bbox from "../../UiComponents/Bbox";
import { Box, Typography, IconButton } from "@mui/material";
import { useMediaQuery } from "@material-ui/core";
import SimCardDownloadOutlined from "@mui/icons-material/SimCardDownloadOutlined";

const WarningSlip = () => {
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
                paddingLeft="70px"
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
                Warning Slip Issue Date
              </Typography>
              <Typography color="#555454" fontSize="14px" fontWeight="400">
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
                Warning Slip
              </Typography>

              <Box marginLeft="50px">
                <IconButton sx={{ bottom: "8px" }}>
                  <SimCardDownloadOutlined />
                </IconButton>
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
              <Typography
                color="#000"
                fontSize="14px"
                fontWeight="400"
                width="135px"
              >
                Warning Slip Issue Date
              </Typography>
              <Typography color="#555454" fontSize="14px" fontWeight="400">
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
                Warning Slip
              </Typography>

              <Box marginLeft="50px">
                <IconButton sx={{ bottom: "8px" }}>
                  <SimCardDownloadOutlined />
                </IconButton>
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
              <Typography
                color="#000"
                fontSize="14px"
                fontWeight="400"
                width="135px"
              >
                Warning Slip Issue Date
              </Typography>
              <Typography color="#555454" fontSize="14px" fontWeight="400">
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
                Warning Slip
              </Typography>

              <Box marginLeft="50px">
                <IconButton sx={{ bottom: "8px" }}>
                  <SimCardDownloadOutlined />
                </IconButton>
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

export default WarningSlip;
