import React, { useState } from "react";
import RevealCard from "../../components/AnimationComponents/RevealCard";
import Bbox from "../../components/UiComponents/Bbox";
import { Box, Divider } from "@mui/material";
import ActionIndividual from "../../components/student/action/ActionIndividual";
import ActionBulk from "../../components/student/action/ActionBulk";

const Action = () => {
  const [activeButton, setActiveButton] = useState("Individual");

  // conditional render components
  const renderComponent = () => {
    switch (activeButton) {
      case "Individual":
        return <ActionIndividual />;
      case "Bulk":
        return <ActionBulk />;
      default:
        return null;
    }
  };

  return (
    <RevealCard>
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
        </Box>

        {/* Divider */}
        <Divider style={{ marginTop: "-10px" }} />

        {/* Render the selected component */}
        {renderComponent()}
      </Bbox>
    </RevealCard>
  );
};

export default Action;
