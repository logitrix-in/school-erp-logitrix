import React from "react";
import TestcenterDashboard from "../../components/admission/test-center/TestcenterDasahboard";
import OnlinetestInterview from "../../components/admission/test-center/OnlinetestInterview";
import Evaluation from "../../components/admission/test-center/Evaluation";
import MeritListInterview from "../../components/admission/test-center/MeritListInterview";
import ManageTestInterview from "../../components/admission/test-center/ManageTestInterview";
import { Grid } from "@mui/material";
import RevealCard from "../../components/AnimationComponents/RevealCard";

const AdmissionTestCenter = () => {
  return (
    <>
      <RevealCard>
        <TestcenterDashboard />
      </RevealCard>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12}>
          <RevealCard>
            <ManageTestInterview />
          </RevealCard>
        </Grid>
        <Grid item xs={12}>
          <RevealCard>
            <OnlinetestInterview />
          </RevealCard>
        </Grid>
        <Grid item xs={12}>
          <RevealCard>
            <Evaluation />
          </RevealCard>
        </Grid>
        <Grid item xs={12}>
          <RevealCard>
            <MeritListInterview />
          </RevealCard>
        </Grid>
      </Grid>
    </>
  );
};

export default AdmissionTestCenter;
