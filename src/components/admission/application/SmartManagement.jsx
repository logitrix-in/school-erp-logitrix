import { Box, Button, Divider, Typography } from "@mui/material";
import React, { useState } from "react";
import Bbox from "../../UiComponents/Bbox";
import RevealCard from "../../AnimationComponents/RevealCard";
import AutoResponse from "./popups/AutoResponse";
import MultipleApplication from "./popups/MultipleApplication";
import Engage from "./popups/Engage";

const SmartManagement = () => {
  const [showAutoResponse, setShowAutoResponse] = useState(false);
  const [showMultipleApplication, setShowMultipeApplication] = useState(false);
  const [showEngage, setShowEngage] = useState(false);

  return (
    <>
      <RevealCard>
        <Bbox mt={3} borderRadius={2} bgcolor={"white"}>
          <Box
            py={2}
            px={2}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography fontWeight={"700"} borderRadius={1} fontSize={"1.1rem"}>
              Smart Management
            </Typography>
          </Box>

          <Divider />
          <Box
            borderRadius={2}
            p={2}
            display={"flex"}
            gap={2}
            flexDirection={{ xs: "column", md: "row" }}
          >
            {/* auto response */}
            <AutoResponse
              open={showAutoResponse}
              close={() => setShowAutoResponse(false)}
            />
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              onClick={() => setShowAutoResponse(true)}
            >
              Set Auto Response
            </Button>
            {/* multiple Application */}
            <MultipleApplication
              open={showMultipleApplication}
              close={() => setShowMultipeApplication(false)}
            />
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              onClick={() => setShowMultipeApplication(true)}
            >
              Multiple Application
            </Button>

            {/* Engage */}
            <Engage open={showEngage} close={() => setShowEngage(false)} />
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              onClick={() => setShowEngage(true)}
            >
              Engage
            </Button>
          </Box>
        </Bbox>
      </RevealCard>
    </>
  );
};

export default SmartManagement;
