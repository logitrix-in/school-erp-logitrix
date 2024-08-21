import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import RevealCard from "../../AnimationComponents/RevealCard";
import Bbox from "../../UiComponents/Bbox";
import { Link } from "react-router-dom";

const MeritListInterview = () => {
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
              Merit List
            </Typography>
          </Box>

          <Divider />
          <Box
            borderRadius={2}
            p={2}
            display={"flex"}
            justifyContent={'center'}
            gap={2}
            flexDirection={{ xs: "column", md: "row" }}
          >
            <Button fullWidth variant="outlined" LinkComponent={Link} to={'set-rule/'}>
              Set Rule
            </Button>
            <Button fullWidth variant="contained" LinkComponent={Link} to={'generate-merit-list/'}>
              Generate Merit List
            </Button>
          </Box>
        </Bbox>
      </RevealCard>
    </>
  );
};

export default MeritListInterview;
