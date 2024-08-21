import React, { useState } from "react";
import RevealCard from "../../components/AnimationComponents/RevealCard";
import Bbox from "../../components/UiComponents/Bbox";
import { Box, Divider } from "@mui/material";
import ViewEditIncident from "../../components/student/action/ViewEditIncident";
import RaiseIncident from "../../components/student/action/RaiseIncident";
import ActionRecords from "../../components/student/action/ActionRecords";

const Action = () => {
  const [activeButton, setActiveButton] = useState("New Incident");

  const renderComponent = () => {
    switch (activeButton) {
      case "New Incident":
        return <RaiseIncident />;
      case "Existing Incident":
        return <ViewEditIncident />;
        case "Records":
          return <ActionRecords />;
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
        <Box
          style={{
            display: "flex",
            padding: "10px",
          }}
        >
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: activeButton === "New Incident" ? "#675BFA" : "black",
              borderBottom:
                activeButton === "New Incident" ? "2px solid #675BFA" : "none",
              marginRight: "10px",
              cursor: "pointer",
              padding: "7px 10px 12px 10px",
              fontSize: "14px",
              fontWeight: 400,
            }}
            onClick={() => setActiveButton("New Incident")}
          >
            Raise New Incident
          </button>

          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: activeButton === "Existing Incident" ? "#675BFA" : "black",
              borderBottom:
                activeButton === "Existing Incident" ? "2px solid #675BFA" : "none",
              marginRight: "10px",
              cursor: "pointer",
              padding: "7px 10px 12px 10px",
              fontSize: "14px",
              fontWeight: 400,
            }}
            onClick={() => setActiveButton("Existing Incident")}
          >
            View / Edit Existing Incident
          </button>

          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: activeButton === "Records" ? "#675BFA" : "black",
              borderBottom:
                activeButton === "Records" ? "2px solid #675BFA" : "none",
              marginRight: "10px",
              cursor: "pointer",
              padding: "7px 10px 12px 10px",
              fontSize: "14px",
              fontWeight: 400,
            }}
            onClick={() => setActiveButton("Records")}
          >
            Records
          </button>
        </Box>

        <Divider style={{ marginTop: "-10px" }} />

        {renderComponent()}
      </Bbox>
    </RevealCard>
  );
};

export default Action;
