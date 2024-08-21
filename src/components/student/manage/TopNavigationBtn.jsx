import React, { useState, useEffect } from "react";
import RevealCard from "../../AnimationComponents/RevealCard";
import EditInformation from "./EditInformation/EditInformation";
import StudentAccount from "./StudentAccount/StudentAccount";
import IDCardPass from "./IDCardPass/IDCardPass";
import SectionAllotment from "./SectionAllotment/SectionAllotment";
import Promotion from "./Promotion/Promotion";
import { Link, useParams } from "react-router-dom";

const TopNavigationBtn = () => {
  // const [activeButton, setActiveButton] = useState("Edit Information");
  const { activeButton: activeButtonParam } = useParams();
  const [activeButton, setActiveButton] = useState(
    activeButtonParam || "Edit Information"
  );

  // Update active button when the URL parameter changes
  useEffect(() => {
    setActiveButton(activeButtonParam || "Edit Information");
  }, [activeButtonParam]);

  // conditional render components
  const renderComponent = () => {
    switch (activeButton) {
      case "Edit Information":
        return <EditInformation />;
      case "Student Account":
        return <StudentAccount />;
      case "ID Card / Pass":
        return <IDCardPass />;
      case "Section Allotment":
        return <SectionAllotment />;
      case "Promotion":
        return <Promotion />;
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
            maxWidth: "720px",
            borderRadius: "10px",
          }}
        >
          <div>
            <button
              style={{
                backgroundColor:
                  activeButton === "Edit Information" ? "white" : "transparent",
                border: "none",
                color: "black",
                marginRight: "10px",
                cursor: "pointer",
                borderRadius: "6px",
                padding: "7px 10px 7px 10px",
                fontSize: "16px",
                fontWeight: 400,
              }}
              onClick={() => setActiveButton("Edit Information")}
            >
              Edit Information
            </button>

            <button
              style={{
                backgroundColor:
                  activeButton === "Student Account" ? "white" : "transparent",
                border: "none",
                color: "black",
                marginRight: "10px",
                cursor: "pointer",
                borderRadius: "6px",
                padding: "7px 10px 7px 10px",
                fontSize: "16px",
                fontWeight: 400,
              }}
              onClick={() => setActiveButton("Student Account")}
            >
              Student Account
            </button>

            <button
              style={{
                backgroundColor:
                  activeButton === "ID Card / Pass" ? "white" : "transparent",
                border: "none",
                color: "black",
                marginRight: "10px",
                cursor: "pointer",
                borderRadius: "6px",
                padding: "7px 10px 7px 10px",
                fontSize: "16px",
                fontWeight: 400,
              }}
              onClick={() => setActiveButton("ID Card / Pass")}
            >
              ID Card / Pass
            </button>

            <button
              style={{
                backgroundColor:
                  activeButton === "Section Allotment"
                    ? "white"
                    : "transparent",
                border: "none",
                color: "black",
                marginRight: "10px",
                cursor: "pointer",
                borderRadius: "6px",
                padding: "7px 10px 7px 10px",
                fontSize: "16px",
                fontWeight: 400,
              }}
              onClick={() => setActiveButton("Section Allotment")}
            >
              Section Allotment
            </button>

            <button
              style={{
                backgroundColor:
                  activeButton === "Promotion" ? "white" : "transparent",
                border: "none",
                color: "black",
                cursor: "pointer",
                borderRadius: "6px",
                padding: "7px 10px 7px 10px",
                fontSize: "16px",
                fontWeight: 400,
              }}
              onClick={() => setActiveButton("Promotion")}
            >
              Promotion
            </button>
          </div>

          {/* <div>
            <Link
              to="/edit-information"
              style={{
                backgroundColor:
                  activeButton === "Edit Information" ? "white" : "transparent",
                border: "none",
                color: "black",
                marginRight: "10px",
                cursor: "pointer",
                borderRadius: "6px",
                padding: "7px 10px 7px 10px",
                fontSize: "16px",
                fontWeight: 400,
                textDecoration: "none",
              }}
            >
              Edit Information
            </Link>

            <Link
              to="/student-account"
              style={{
                backgroundColor:
                  activeButton === "Student Account" ? "white" : "transparent",
                border: "none",
                color: "black",
                marginRight: "10px",
                cursor: "pointer",
                borderRadius: "6px",
                padding: "7px 10px 7px 10px",
                fontSize: "16px",
                fontWeight: 400,
                textDecoration: "none",
              }}
            >
              Student Account
            </Link>

            <Link
              to="/id-card-pass"
              style={{
                backgroundColor:
                  activeButton === "ID Card / Pass" ? "white" : "transparent",
                border: "none",
                color: "black",
                marginRight: "10px",
                cursor: "pointer",
                borderRadius: "6px",
                padding: "7px 10px 7px 10px",
                fontSize: "16px",
                fontWeight: 400,
                textDecoration: "none",
              }}
            >
              ID Card / Pass
            </Link>

            <Link
              to="/section-allotment"
              style={{
                backgroundColor:
                  activeButton === "Section Allotment"
                    ? "white"
                    : "transparent",
                border: "none",
                color: "black",
                marginRight: "10px",
                cursor: "pointer",
                borderRadius: "6px",
                padding: "7px 10px 7px 10px",
                fontSize: "16px",
                fontWeight: 400,
                textDecoration: "none",
              }}
            >
              Section Allotment
            </Link>

            <Link
              to="/promotion"
              style={{
                backgroundColor:
                  activeButton === "Promotion" ? "white" : "transparent",
                border: "none",
                color: "black",
                cursor: "pointer",
                borderRadius: "6px",
                padding: "7px 10px 7px 10px",
                fontSize: "16px",
                fontWeight: 400,
                textDecoration: "none",
              }}
            >
              Promotion
            </Link>
          </div> */}
        </div>
      </RevealCard>

      {/* Render the selected component */}
      {renderComponent()}
    </div>
  );
};

export default TopNavigationBtn;
