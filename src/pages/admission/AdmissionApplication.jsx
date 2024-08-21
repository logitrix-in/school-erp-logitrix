import React, { useState } from "react";
import ApplicationRecieved from "../../components/admission/application/ApplicationRecieved";
import ManageApplications from "../../components/admission/application/ManageApplications";
import SmartManagement from "../../components/admission/application/SmartManagement";

const AdmissionApplication = () => {
  return (
    <>
      <ApplicationRecieved />
      <ManageApplications/>
      <SmartManagement/>
    </>
  );
};

export default AdmissionApplication;
