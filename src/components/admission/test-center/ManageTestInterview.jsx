import { Box, Button, Dialog, Divider, Typography } from "@mui/material";
import React, { useState } from "react";
import RevealCard from "../../AnimationComponents/RevealCard";
import Bbox from "../../UiComponents/Bbox";
import Notification from "./popups/ManageList/Notification";
import { Link } from "react-router-dom";

const ManageTestInterview = () => {
  const [notificationOpen, setNotificationOpen] = useState(false);
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
              Manage Test / Interview
            </Typography>
          </Box>

          <Divider />
          <Box
            borderRadius={2}
            p={2}
            display={"flex"}
            gap={2}
            justifyContent={"center"}
            flexDirection={{ xs: "column", md: "row" }}
          >
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={() => setNotificationOpen(true)}
            >
              Notification
            </Button>

            <Dialog
              open={notificationOpen}
              fullWidth
              maxWidth="md"
              onClose={() => setNotificationOpen(false)}
            >
              <Notification close={() => setNotificationOpen(false)} />
            </Dialog>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              LinkComponent={Link}
              to='admit-card'
            >
              Admit Card
            </Button>

           
          </Box>
        </Bbox>
      </RevealCard>
    </>
  );
};

export default ManageTestInterview;
