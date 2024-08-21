import React, { useState } from "react";
import RevealCard from "../../AnimationComponents/RevealCard";
import Bbox from "../../UiComponents/Bbox";
import { Box, Button, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Notify from "./popup/Notify";

const ManageOnboarding = () => {
  const [notifyOpen, setNotifyOpen] = useState(false);

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
            Manage Onboarding
          </Typography>
        </Box>

        <Divider />
        <Box p={3} display={"flex"} gap={2}>
          <Button
            fullWidth
            variant="contained"
            LinkComponent={Link}
            to={"manage/"}
          >
            Initiate Onboarding
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => setNotifyOpen(true)}
          >
            Notify
          </Button>

          <Notify open={notifyOpen} close={() => setNotifyOpen(false)} />
        </Box>
      </Bbox>
    </RevealCard>
  );
};

export default ManageOnboarding;
