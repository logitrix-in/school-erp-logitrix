import { Box, Divider, Typography, Button } from "@mui/material";
import { useState } from "react";
import Bbox from "@/components/UiComponents/Bbox";
import { useNavigate } from "react-router-dom";
import EditOrganisationProfile from "./EditOrganisationProfile";

const OrganisationProfile = () => {
  const navigate = useNavigate();

  const [editOrganisationProfilePopup, setEditOrganisationProfilePopup] =
    useState(false);

  return (
    <>
      <div
        style={{
          backgroundColor: "#E5F3FB",
          display: "flex",
          padding: "10px",
          maxWidth: "730px",
          borderRadius: "10px",
        }}
      >
        <div>
          <button
            style={{
              backgroundColor: "white",
              border: "none",
              color: "black",
              marginRight: "10px",
              cursor: "pointer",
              borderRadius: "6px",
              padding: "7px 10px 7px 10px",
              fontSize: "16px",
              fontWeight: 400,
            }}
            onClick={() => navigate("/payroll/configure/organization-profile")}
          >
            Organization Profile
          </button>

          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "black",
              marginRight: "10px",
              cursor: "pointer",
              borderRadius: "6px",
              padding: "7px 10px 7px 10px",
              fontSize: "16px",
              fontWeight: 400,
            }}
            onClick={() => navigate("/payroll/configure/location")}
          >
            Location
          </button>

          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "black",
              marginRight: "10px",
              cursor: "pointer",
              borderRadius: "6px",
              padding: "7px 10px 7px 10px",
              fontSize: "16px",
              fontWeight: 400,
            }}
            onClick={() => navigate("/payroll/configure/statutory-components")}
          >
            Statutory Components
          </button>

          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "black",
              cursor: "pointer",
              borderRadius: "6px",
              padding: "7px 10px 7px 10px",
              fontSize: "16px",
              fontWeight: 400,
            }}
            onClick={() => navigate("/payroll/configure/salary-components")}
          >
            Salary Components
          </button>
        </div>
      </div>

      <Bbox borderRadius={2} overflow={"hidden"}>
        <Box
          bgcolor={"white"}
          py={1.3}
          px={2}
          borderRadius={2}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography fontWeight={"700"} fontSize={"1.1rem"}>
            Below Company logo and address will be used across all files and
            payslips
          </Typography>
        </Box>

        <Divider />
        <Box p={2} display={"flex"} flexDirection={"column"} gap={4}>
          <Box display={"flex"} gap={2}>
            <Typography>Company Name :</Typography>
            <Typography fontWeight={"600"}>XYZ Company</Typography>
          </Box>

          <Box display={"flex"} gap={2}>
            <Typography>Company Logo :</Typography>
            <Typography fontWeight={"600"}>Logo</Typography>
          </Box>

          <Box display={"flex"} gap={2}>
            <Typography>Industry :</Typography>
            <Typography fontWeight={"600"}>XYZ Company</Typography>
          </Box>

          <Box display={"flex"} gap={2}>
            <Typography>
              Company Email Address from which Payslips should be sent to
              employees :
            </Typography>
            <Typography fontWeight={"600"}>schoolname@gmail.com</Typography>
          </Box>

          <Box display={"flex"} justifyContent={"end"}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setEditOrganisationProfilePopup(true)}
            >
              Edit
            </Button>
          </Box>
          <EditOrganisationProfile
            open={editOrganisationProfilePopup}
            close={() => setEditOrganisationProfilePopup(false)}
          />
        </Box>
      </Bbox>
    </>
  );
};

export default OrganisationProfile;
