import React, { useState } from "react";
import RevealCard from "../../AnimationComponents/RevealCard";
import Suspension from "./Suspension";
import WarningSlip from "./WarningSlip";
import Penalty from "./Penalty";

const ActionProceedNavigate = () => {
  const [activeButton, setActiveButton] = useState("Suspension");

  // conditional render components
  const renderComponent = () => {
    switch (activeButton) {
      case "Suspension":
        return <Suspension />;
      case "Warning Slip":
        return <WarningSlip />;
      case "Penalty Fee":
        return <Penalty />;
      default:
        return null;
    }
  };

  return (
    <div>
      <RevealCard>
        {/* top navigation buttons */}
        <div
          style={{
            backgroundColor: "#E5F3FB",
            display: "flex",
            padding: "10px",
            maxWidth: "385px",
            borderRadius: "10px",
          }}
        >
          {/* Suspension btn */}
          <button
            style={{
              backgroundColor:
                activeButton === "Suspension" ? "white" : "transparent",
              border: "none",
              color: "black",
              marginRight: "10px",
              cursor: "pointer",
              borderRadius: "6px",
              padding: "7px 10px 7px 10px",
              fontSize: "16px",
              fontWeight: 400,
              marginLeft: "6px",
            }}
            onClick={() => setActiveButton("Suspension")}
          >
            Suspension
          </button>

          {/* Warning Slip btn */}
          <button
            style={{
              backgroundColor:
                activeButton === "Warning Slip" ? "white" : "transparent",
              border: "none",
              color: "black",
              marginRight: "10px",
              cursor: "pointer",
              borderRadius: "6px",
              padding: "7px 10px 7px 10px",
              fontSize: "16px",
              fontWeight: 400,
            }}
            onClick={() => setActiveButton("Warning Slip")}
          >
            Warning Slip
          </button>

          {/* Penalty Fee btn */}
          <button
            style={{
              backgroundColor:
                activeButton === "Penalty Fee" ? "white" : "transparent",
              border: "none",
              color: "black",
              marginRight: "10px",
              cursor: "pointer",
              borderRadius: "6px",
              padding: "7px 10px 7px 10px",
              fontSize: "16px",
              fontWeight: 400,
            }}
            onClick={() => setActiveButton("Penalty Fee")}
          >
            Penalty Fee
          </button>
        </div>
      </RevealCard>

      {/* Render the selected component */}
      {renderComponent()}
    </div>
  );
};

export default ActionProceedNavigate;
