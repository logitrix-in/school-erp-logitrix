import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import RevealCard from "../../AnimationComponents/RevealCard";
import Bbox from "../../UiComponents/Bbox";
import { URLS } from "../../../config";

const OnlinetestInterview = () => {
  return (
    <>
      <RevealCard>
        <Bbox borderRadius={2} bgcolor={"white"}>
          <Box
            py={2}
            px={2}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography fontWeight={"700"} borderRadius={1} fontSize={"1.1rem"}>
              Online Test
            </Typography>
          </Box>

          <Divider />
          <Box
            borderRadius={2}
            p={2}
            display={"flex"}
            gap={2}
            justifyContent={'center'}
            flexDirection={{ xs: "column", md: "row" }}
          >
            <Button
              fullWidth
              variant="contained"
              href={URLS.moodle}
              target="_blank"
            >
              Set Up
            </Button>
          </Box>
        </Bbox>
      </RevealCard>
    </>
  );
};

export default OnlinetestInterview;
