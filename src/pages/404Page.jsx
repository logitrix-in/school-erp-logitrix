import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import clound from "../assets/404_cloud.jpg";

const _404 = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1}}
      transition={{
        duration: 0.6,
      }}
      alignItems={"center"}
      flexDirection={"column"}
      borderRadius={2}
      height={"80vh"}
      sx={{
        backgroundImage: `url(${clound})`,
        backgroundSize: "cover",
      }}
    >
      <Typography
        component={motion.div}
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        variant="h2"
      >
        404
      </Typography>
      <Typography
        fontSize={"1rem"}
        component={motion.div}
        initial={{ x: -100 }}
        animate={{ x: 0 }}
      >
        Page not available
      </Typography>
    </Box>
  );
};

export default _404;
