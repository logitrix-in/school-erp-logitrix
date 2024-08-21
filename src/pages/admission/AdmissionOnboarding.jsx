import React from "react";
import OnboardingDashboard from "../../components/admission/onboarding/OnboardingDashboard";
import ManageOnboarding from "../../components/admission/onboarding/ManageOnboarding";
import { Box } from "@mui/material";
import InReviewOnboarding from "../../components/admission/onboarding/InReviewOnboarding";

const AdmissionOnboarding = () => {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={2}>
      <OnboardingDashboard />
      <ManageOnboarding/>
      <InReviewOnboarding/>
    </Box>
  );
};

export default AdmissionOnboarding;
