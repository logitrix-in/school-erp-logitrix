import { Box, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const ReviewRightCard = ({ selected }) => {
  const can = selected.candidate_details;
  const app = selected.application_details;
  const add = selected.address_details.permanent_address;

  console.log(selected)

  return (
    <Box>
      <Typography fontSize={18} fontWeight={500} color={"primary.light"}>
        Detailed View
      </Typography>
      <Divider sx={{ my: 1 }} />
      <Box display={"flex"} gap={2} mt={2}>
        <img
          height={120}
          src={selected.candidate_details.profile_photo}
          alt=""
        />
        <Box display={"flex"} flexDirection={"column"} gap={0.2}>
          <Typography fontSize={"1.2rem"} fontWeight={500}>
            {selected.candidate_details.first_name}{" "}
            {selected.candidate_details.last_name}
          </Typography>
          <Typography fontSize={"0.9rem"}>
            {selected.candidate_details.email}
          </Typography>
          <Typography fontSize={"0.9rem"}>
            Age:
            {(
              new Date().getFullYear() -
              new Date(selected.candidate_details.dob).getFullYear()
            ).toString()}
          </Typography>
          <Typography fontSize={"0.9rem"}>
            {selected.candidate_details.gender}
          </Typography>
        </Box>
      </Box>

      {[
        {
          label: "Applied for",
          value: app.applying_for,
        },
        {
          label: "State",
          value: add.states,
        },
        {
          label: "Medium",
          value: app.medium,
        },
        {
          label: "Previous Marks",
          value: app.percentage_secured + "%",
        },
        {
          label: "Reason",
          value: selected.reason ?? "NA",
        },
      ].map((elem, idx) => (
        <Box key={idx}>
          <Box
            my={1.8}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography fontSize={15}>{elem.label}:</Typography>
            <Typography textTransform={'capitalize'} fontSize={16}>{elem.value}</Typography>
          </Box>
          <Divider />
        </Box>
      ))}
    </Box>
  );
};

export default ReviewRightCard;
