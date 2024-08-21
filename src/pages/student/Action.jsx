import React, { useState } from "react";
import RevealCard from "../../components/AnimationComponents/RevealCard";
import Bbox from "../../components/UiComponents/Bbox";
import { Box, Divider } from "@mui/material";
<<<<<<< HEAD
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
=======
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
>>>>>>> 75e9332c5a0a1e4e751f9b6a8fb31bf79f2e1d62
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
<<<<<<< HEAD

=======
        {/* navigation buttons */}
>>>>>>> 75e9332c5a0a1e4e751f9b6a8fb31bf79f2e1d62
        <Box
          style={{
            display: "flex",
            padding: "10px",
          }}
        >
<<<<<<< HEAD

=======
          {/* Individual btn */}
>>>>>>> 75e9332c5a0a1e4e751f9b6a8fb31bf79f2e1d62
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
<<<<<<< HEAD
              color: activeButton === "New Incident" ? "#675BFA" : "black",
              borderBottom:
                activeButton === "New Incident" ? "2px solid #675BFA" : "none",
=======
              color: activeButton === "Individual" ? "#675BFA" : "black",
              borderBottom:
                activeButton === "Individual" ? "2px solid #675BFA" : "none",
>>>>>>> 75e9332c5a0a1e4e751f9b6a8fb31bf79f2e1d62
              marginRight: "10px",
              cursor: "pointer",
              padding: "7px 10px 12px 10px",
              fontSize: "14px",
              fontWeight: 400,
            }}
<<<<<<< HEAD
            onClick={() => setActiveButton("New Incident")}
          >
            Raise New Incident
          </button>

=======
            onClick={() => setActiveButton("Individual")}
          >
            Individual
          </button>

          {/* Bulk btn */}
>>>>>>> 75e9332c5a0a1e4e751f9b6a8fb31bf79f2e1d62
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
<<<<<<< HEAD
              color: activeButton === "Existing Incident" ? "#675BFA" : "black",
              borderBottom:
                activeButton === "Existing Incident" ? "2px solid #675BFA" : "none",
=======
              color: activeButton === "Bulk" ? "#675BFA" : "black",
              borderBottom:
                activeButton === "Bulk" ? "2px solid #675BFA" : "none",
>>>>>>> 75e9332c5a0a1e4e751f9b6a8fb31bf79f2e1d62
              marginRight: "10px",
              cursor: "pointer",
              padding: "7px 10px 12px 10px",
              fontSize: "14px",
              fontWeight: 400,
            }}
<<<<<<< HEAD
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

=======
            onClick={() => setActiveButton("Bulk")}
          >
            Bulk
          </button>
        </Box>

        {/* Divider */}
        <Divider style={{ marginTop: "-10px" }} />

        {/* Render the selected component */}
>>>>>>> 75e9332c5a0a1e4e751f9b6a8fb31bf79f2e1d62
        {renderComponent()}
      </Bbox>
    </RevealCard>
  );
};

export default Action;
