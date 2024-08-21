import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import Bbox from "../../UiComponents/Bbox";
import RevealCard from "../../AnimationComponents/RevealCard";
import api from "../../../config/api";
import { Link } from "react-router-dom";

const ScreeningManager = () => {
  function resetScreening() {}

  return (
    <RevealCard>
      <Bbox
        mt={3}
        bgcolor={"white"}
        borderRadius={2}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        alignItems={"stretch"}
      >
        <Typography
          p={2}
          fontWeight={"700"}
          borderRadius={1}
          fontSize={"1.1rem"}
        >
          Screening Manager
        </Typography>
        <Divider />
        <Box
          p={2}
          px={3}
          display={"flex"}
          gap={2}
          flexDirection={{ xs: "column", md: "row" }}
        >
          <Button fullWidth variant="contained" color="primary" LinkComponent={Link} to={'review/'}>
            Screen Pending Applications
          </Button>
        </Box>
      </Bbox>
    </RevealCard>
  );
};

export default ScreeningManager;
