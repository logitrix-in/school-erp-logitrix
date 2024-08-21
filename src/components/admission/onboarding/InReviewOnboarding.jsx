import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import RevealCard from "../../AnimationComponents/RevealCard";
import Bbox from "../../UiComponents/Bbox";
import DataTable from "./components/ManageTable";

const InReviewOnboarding = () => {
  return (
    <RevealCard>
      <Bbox borderRadius={2} overflow={"hidden"}>
        <Box
          bgcolor={"white"}
          py={1.3}
          px={3}
          borderRadius={2}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography fontWeight={"700"} borderRadius={1} fontSize={"1.1rem"}>
            Onboarding In-Review
          </Typography>
        </Box>
        <Divider />
        <Box p={3} display={'flex'} justifyContent={'center'}>
          <DataTable />
        </Box>
      </Bbox>
    </RevealCard>
  );
};

export default InReviewOnboarding;
