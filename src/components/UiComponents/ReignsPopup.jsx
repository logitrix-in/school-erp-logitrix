import { Box, Button, Dialog, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React, { useState } from "react";

const ReignsPopup = ({
  open = false,
  close,
  onCancel = () => {},
  onAccept = () => {},
  title = "Are you sure you want to proceed?",
  desc = "Any changes that are not saved will be deleted parmanently.",
  accept_txt = "Confirm",
  reject_txt = "Cancel",
}) => {
  return (
    <Dialog open={open} maxWidth="xs" fullWidth onClose={close}>
      <Box>
        <Box bgcolor={"primary.main"} height={15}></Box>
        <Box p={2}>
          <Typography fontWeight={500} fontSize={"1.1rem"}>
            {title}
          </Typography>
          <Typography mt={1} fontWeight={400} fontSize={"0.9rem"}>
            {desc}
          </Typography>
        </Box>
        <Box display={"flex"} justifyContent={"flex-end"} gap={1} p={1}>
          <Button
            color="error"
            onClick={() => {
              onCancel();
              close();
            }}
          >
            {reject_txt}
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              onAccept();
              close();
            }}
          >
            {accept_txt}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default ReignsPopup;
