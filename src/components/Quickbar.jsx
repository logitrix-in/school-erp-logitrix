import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const Quickbar = () => {
  const ctx = useContext(AppContext);
  const [tabs, setTabs] = useState({});

  useEffect(() => {
    setTabs(ctx.quickTabs);
    // console.log(ctx.quickTabs);
  }, [ctx.quickTabs]);

  return (
    <Box width={"100%"} display={"flex"} justifyContent={"center"}>
      <Box
        flex={1}
        p={1}
        bgcolor={"rgba(151, 151, 151, 0.06)"}
        borderRadius={1}
        boxShadow={"0 2px 10px -2px rgba(0,0,0,0.2)"}
        display="flex"
        gap={2}
        alignItems="center"
      >
        <Box display={"flex"} alignItems={"center"}>
          <Icon
            icon={"solar:history-bold-duotone"}
            color="gray"
            fontSize={"1.5rem"}
          />
        </Box>

        {Object.values(tabs).map((tab, idx) => (
          <Box
            component={Link}
            to={tab.link}
            p={0.5}
            key={idx}
            bgcolor={"#3B98C420"}
            borderRadius={1}
            px={2}
            display={"flex"}
            gap={1}
            alignItems={"center"}
            boxShadow={"0 1px 10px -4px rgba(0,0,0,0.4)"}
            width={1}
            whiteSpace="nowrap"
            textAlign={"center"}
          >
            {/* <Box
              height={12}
              sx={{ aspectRatio: 1 }}
              bgcolor={"#3B98C4"}
              borderRadius={100}
            /> */}
            <Typography flex={1} textAlign={"center"}>
              {tab.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Quickbar;
