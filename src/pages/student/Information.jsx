import React from "react";
import StudentDashboard from "../../components/student/information/StudentDashboard";
import ClassWiseStrengthAllocation from "../../components/student/information/ClassWiseStrengthAllocation";
import StudentAccountCompliance from "../../components/student/information/StudentAccountCompliance";

const Information = () => {
  return (
    <div>
      {/* dashboard component */}
      <StudentDashboard />

      {/* class-wise strength allocation component */}
      <ClassWiseStrengthAllocation />

      {/* student account compliance component */}
      <StudentAccountCompliance />
    </div>
  );
};

export default Information;
