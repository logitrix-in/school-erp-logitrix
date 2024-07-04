import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import Bbox from "../../UiComponents/Bbox";
import RevealCard from "../../AnimationComponents/RevealCard";
import { Link } from "react-router-dom";
import api from "../../../config/api";
import { useState } from "react";
import { useEffect } from "react";

const SetScreeningRule = () => {
  const [applications, setApplication] = useState([]);

  useEffect(() => {
    api
      .get("/admission/screening/")
      .then((res) => setApplication(res.data))
      .catch((err) =>{} );
  }, []);

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
        <Box display={"flex"} p={2} justifyContent={"space-between"}>
          <Typography fontWeight={"700"} borderRadius={1} fontSize={"1.1rem"}>
            Set Screening Rule
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            size="small"
            LinkComponent={Link}
            to="edit/"
          >
            Edit
          </Button>
        </Box>

        <Divider />
        <Box p={2} px={3} display={"flex"} flexDirection={"column"} gap={1}>
          <Box bgcolor={"#DAF3FE"} p={0.7} px={2} borderRadius={1}>
            Screening Rule Enabled
          </Box>
          <Box display={"flex"} gap={1} flexWrap={"wrap"}>
            {applications
              .filter((cl) => cl.active == true)
              .map((cl, idx) => (
                <Bbox key={idx} p={0.5} px={1.2} borderRadius={1}>
                  class {cl.Class}
                </Bbox>
              ))}
          </Box>
          <Box bgcolor={"#DAF3FE"} p={0.7} px={2} borderRadius={1}>
            Screening Rule Disabled
          </Box>
          <Box display={"flex"} gap={1} flexWrap={"wrap"}>
            {applications
              .filter((cl) => cl.active == false)
              .map((cl, idx) => (
                <Bbox key={idx} p={0.5} px={1.2} borderRadius={1}>
                  <Typography>class {cl.Class}</Typography>
                </Bbox>
              ))}
          </Box>
        </Box>
      </Bbox>
    </RevealCard>
  );
};

export default SetScreeningRule;
