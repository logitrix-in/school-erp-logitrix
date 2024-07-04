import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Bbox from "../../../UiComponents/Bbox";
import api from "../../../../config/api";

const OnboardingApproval = () => {
  const params = useParams();

  const [obj, setObj] = useState(null);

  useEffect(() => {
    api
      .get("admission/application/detailed-view/", {
        params: {
          id: params.id,
        },
      })
      .then((res) => {
        console.log(res.data);
        setObj(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const renderDetails = (obj) => {
    return Object.entries(obj).map(([key, value], i) => {
      if (key == "id") return;
      if (value == null) return;
      if (key == "is_same_as_permanent_address") return;
      if (key == "created_at") return;
      if (key == "in_merit_list") return;
      if (key == "is_blacklist") return;
      if (key == "moodle_id") return;
      if (typeof value == "boolean") value = value ? "Yes" : "No";
      if (value == "") value = "NA";

      if (typeof value === "object" && value !== null) {
        return (
          <Grid item xs={12} key={i}>
            <Box key={key}>
              <Typography
                p={1}
                px={2}
                bgcolor={"#eeeeee"}
                textTransform={"capitalize"}
                fontWeight={600}
                fontSize={"1.1rem"}
                borderRadius={1}
              >
                {key.replaceAll("_", " ")}
              </Typography>
              <Bbox borderRadius={1} p={1} mt={1}>
                <Grid container spacing={1}>
                  {renderDetails(value)}
                </Grid>
              </Bbox>
            </Box>
          </Grid>
        );
      } else {
        return (
          <Grid item xs={4} key={i}>
            <Box display={"flex"} alignItems={"center"} key={key}>
              <Typography
                borderRadius={1}
                p={1}
                fontSize={"1rem"}
                textTransform={"capitalize"}
                fontWeight={500}
              >
                {key.replaceAll("_", " ")} :
              </Typography>
              {typeof value == "string" ? (
                value.includes("https://") ? (
                  <Link to={value} target="_BLANK">
                    View
                  </Link>
                ) : (
                  <Typography fontSize={"1rem"} textOverflow={"ellipsis"}>
                    {value}
                  </Typography>
                )
              ) : (
                <Typography fontSize={"1rem"} textOverflow={"ellipsis"}>
                  {value}
                </Typography>
              )}
            </Box>
          </Grid>
        );
      }
    });
  };

  return (
    <Box>
      <Box display={"flex"} gap={1} justifyContent={"flex-end"}>
        <Button
          variant="contained"
          onClick={() => {
            api
              .post("/admission/test-center/onboarding/overview/review/", {
                id: obj.application_id,
                status: "approve",
              })
              .then((res) => {
                console.log(res.data);
              })
              .catch((err) => console.log(err));
          }}
        >
          Approve
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            api
              .post("/admission/test-center/onboarding/overview/review/", {
                id: obj.application_id,
                status: "reject",
              })
              .then((res) => {
                console.log(res.data);
              })
              .catch((err) => console.log(err));
          }}
        >
          Reject
        </Button>
      </Box>
      <Grid container spacing={1}>
        {obj && renderDetails(obj)}
      </Grid>
    </Box>
  );
};

export default OnboardingApproval;
