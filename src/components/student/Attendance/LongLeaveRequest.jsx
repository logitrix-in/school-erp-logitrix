import React, { useState } from "react";
import RevealCard from "../../AnimationComponents/RevealCard";
import Bbox from "../../UiComponents/Bbox";
import { Box, Divider } from "@mui/material";
import PendingRequest from "./PendingRequest";
import LLRRecords from "./LLRRecords";

const LongLeaveRequest = () => {
  const [activeButton, setActiveButton] = useState("Pending Request");

  // conditional render components
  const renderComponent = () => {
    switch (activeButton) {
      case "Pending Request":
        return <PendingRequest />;
      case "LLR Records":
        return <LLRRecords />;
      default:
        return null;
    }
  };

  return (
    <RevealCard>
      {/* top navigation buttons */}
      <Box
        sx={{
          backgroundColor: "#E5F3FB",
          display: "flex",
          padding: "10px",
          maxWidth: "291px",
          borderRadius: "10px",
        }}
      >
        <Box>
          <button
            style={{
              backgroundColor:
                activeButton === "Pending Request" ? "white" : "transparent",
              border: "none",
              color: "black",
              marginRight: "10px",
              cursor: "pointer",
              borderRadius: "6px",
              padding: "7px 10px 7px 10px",
              fontSize: "16px",
              fontWeight: 400,
            }}
            onClick={() => setActiveButton("Pending Request")}
          >
            Pending Request
          </button>

          <button
            style={{
              backgroundColor:
                activeButton === "LLR Records" ? "white" : "transparent",
              border: "none",
              color: "black",
              // marginRight: "10px",
              cursor: "pointer",
              borderRadius: "6px",
              padding: "7px 10px 7px 10px",
              fontSize: "16px",
              fontWeight: 400,
            }}
            onClick={() => setActiveButton("LLR Records")}
          >
            LLR Records
          </button>
        </Box>
      </Box>

      {/* Render the selected component */}
      {renderComponent()}
    </RevealCard>
  );
};

export default LongLeaveRequest;
