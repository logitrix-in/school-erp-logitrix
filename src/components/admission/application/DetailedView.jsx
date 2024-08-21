import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../../config/api";
import Bbox from "../../UiComponents/Bbox";

const DetailedView = () => {
  const params = useParams();

  const [obj, setObj] = useState(null);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const [candImg, setImg] = useState(null);

  const renderDetails = (obj) => {
    return Object.entries(obj).map(([key, value]) => {
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
          <Grid item xs={12} key={key}>
            <Box>
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
        if (key == "br") return <Grid item xs={12} />
        else {
          return (
            <Grid item xs={4} key={key}>
              <Box
                display={"flex"}
                gap={1}
                p={1}
                alignItems={"flex-start"}
                key={key}
              >
                <Typography
                  borderRadius={1}
                  fontSize={"1rem"}
                  textTransform={"capitalize"}
                  fontWeight={500}
                >
                  {key.replaceAll("_", " ").concat(" :")}
                </Typography>
                {typeof value == "string" && value.includes("https://") ? (
                  <Box>
                    <img height={200} src={value} alt="" />
                  </Box>
                ) : (
                  <Typography fontSize={"1rem"}>{value}</Typography>
                )}
              </Box>
            </Grid>
          );
        }
      }
    });
  };

  return (
    <Box>
      <Grid container spacing={1}>
        {obj == null ? <CircularProgress /> : renderDetails(obj)}
      </Grid>
    </Box>
  );
};

export default DetailedView;
