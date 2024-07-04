import React from "react";
import ScreeningManager from "../../components/admission/screening/ScreeningManager";
import SetScreeningRule from "../../components/admission/screening/SetScreeningRule";
import ScreeningDashboard from "../../components/admission/screening/ScreeningDashboard";

const AdmissionScreening = () => {
  return (
    <>
      <ScreeningDashboard />
      <SetScreeningRule />
      <ScreeningManager />
    </>
  );
};

export default AdmissionScreening;
