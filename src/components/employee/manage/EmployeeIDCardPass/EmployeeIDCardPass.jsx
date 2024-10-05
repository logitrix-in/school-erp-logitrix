import { useState } from "react";
import RevealCard from "../../../AnimationComponents/RevealCard";
import Bbox from "../../../UiComponents/Bbox";
import { Box, Divider } from "@mui/material";
import EmployeeIDindividual from "./EmployeeIDindividual";
import EmployeeIDbulk from "./EmployeeIDbulk";
import EmployeeIDsetDesign from "./EmployeeIDsetDesign";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const EmployeeIDCardPass = () => {
  const [activeButton, setActiveButton] = useState("Individual");

  const navigate = useNavigate();

  // conditional render components
  const renderComponent = () => {
    switch (activeButton) {
      case "Individual":
        return <EmployeeIDindividual />;
      case "Bulk":
        return <EmployeeIDbulk />;
      case "Set Design":
        return <EmployeeIDsetDesign />;
      default:
        return null;
    }
  };

  return (
    <RevealCard>
      {/* top navigation buttons */}
      {/* top navigation buttons */}
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
            onClick={() => navigate("/employee/manage/")}
          >
            Edit Information
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
            onClick={() => navigate("/employee/manage/employee-account/")}
          >
            Employee Account
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
            onClick={() => navigate("/employee/manage/id-card-pass/")}
          >
            ID Card
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
            onClick={() => navigate("/employee/manage/department/")}
          >
            Department
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
            onClick={() => navigate("/employee/manage/promotion/")}
          >
            Promotion
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
            onClick={() => navigate("/employee/manage/probation/")}
          >
            Probation
          </button>
        </div>
      </div>

      <ToastContainer />

      <Bbox
        mt={2}
        width={"100%"}
        height={"100%"}
        borderRadius={2}
        overflow="hidden"
      >
        {/* navigation buttons */}
        <Box
          style={{
            display: "flex",
            padding: "10px",
          }}
        >
          {/* Individual btn */}
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: activeButton === "Individual" ? "#675BFA" : "black",
              borderBottom:
                activeButton === "Individual" ? "2px solid #675BFA" : "none",
              marginRight: "10px",
              cursor: "pointer",
              padding: "7px 10px 12px 10px",
              fontSize: "14px",
              fontWeight: 400,
            }}
            onClick={() => setActiveButton("Individual")}
          >
            Individual
          </button>

          {/* Bulk btn */}
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: activeButton === "Bulk" ? "#675BFA" : "black",
              borderBottom:
                activeButton === "Bulk" ? "2px solid #675BFA" : "none",
              marginRight: "10px",
              cursor: "pointer",
              padding: "7px 10px 12px 10px",
              fontSize: "14px",
              fontWeight: 400,
            }}
            onClick={() => setActiveButton("Bulk")}
          >
            Bulk
          </button>

          {/* Set Design btn */}
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: activeButton === "Set Design" ? "#675BFA" : "black",
              borderBottom:
                activeButton === "Set Design" ? "2px solid #675BFA" : "none",
              marginRight: "10px",
              cursor: "pointer",
              padding: "7px 10px 12px 10px",
              fontSize: "14px",
              fontWeight: 400,
            }}
            onClick={() => setActiveButton("Set Design")}
          >
            Set Design
          </button>
        </Box>

        {/* Divider */}
        <Divider style={{ marginTop: "-10px" }} />

        {/* Render the selected component */}
        {renderComponent()}
      </Bbox>
    </RevealCard>
  );
};

export default <EmployeeIDCardPass />;
