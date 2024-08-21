import React from "react";
import StudentIndividual from "./StudentIndividual";
import StudentBulk from "./StudentBulk";
import { useNavigate } from "react-router-dom";

const StudentAccount = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* top navigation buttons */}
      <div
        style={{
          backgroundColor: "#E5F3FB",
          display: "flex",
          padding: "10px",
          maxWidth: "720px",
          borderRadius: "10px",
        }}
      >
        <div>
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
            onClick={() => navigate("/student/manage/")}
          >
            Edit Information
          </button>

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
            onClick={() => navigate("/student/manage/student-account/")}
          >
            Student Account
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
            onClick={() => navigate("/student/manage/id-card-pass/")}
          >
            ID Card / Pass
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
            onClick={() => navigate("/student/manage/section-allotment/")}
          >
            Section Allotment
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
            onClick={() => navigate("/student/manage/promotion/")}
          >
            Promotion
          </button>
        </div>
      </div>

      {/* individual component */}
      <StudentIndividual />

      {/* bulk component */}
      <StudentBulk />
    </>
  );
};

export default <StudentAccount />;
