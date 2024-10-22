import { Box, Divider} from "@mui/material";
import RevealCard from "@/components/AnimationComponents/RevealCard";
import { useState } from "react";
import Bbox from "@/components/UiComponents/Bbox";
import {useNavigate} from 'react-router-dom';
import EPF from '@/components/payroll/configure/StatutoryComponents/EPF'
import ESI from '@/components/payroll/configure/StatutoryComponents/ESI'
import ProfessionalTax from '@/components/payroll/configure/StatutoryComponents/ProfessionalTax'
import LaborWelfareFund from '@/components/payroll/configure/StatutoryComponents/LaborWelfareFund'

const StatutoryComponents = () => {
    const navigate = useNavigate();

    const [activeButton, setActiveButton] = useState("1");

    const renderComponent = () => {
        switch (activeButton) {
            case "1":
                return <EPF />;
            case "2":
                return <ESI />;
            case "3":
                return <ProfessionalTax />;
            case "4":
                return <LaborWelfareFund />;
            default:
                return null;
        }
    };

    return (
        <>
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
                        onClick={() => navigate("/payroll/configure/organization-profile")}
                    >
                        Organization Profile
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
                        onClick={() => navigate("/payroll/configure/location")}
                    >
                        Location
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
                        onClick={() => navigate("/payroll/configure/statutory-components")}
                    >
                    Statutory Components
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
                        onClick={() => navigate("/payroll/configure/salary-components")}
                    >
                        Salary Components
                    </button>
                </div>
            </div>


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
                            color: activeButton === "1" ? "#675BFA" : "black",
                            borderBottom:
                                activeButton === "1" ? "2px solid #675BFA" : "none",
                            marginRight: "10px",
                            cursor: "pointer",
                            padding: "7px 10px 12px 10px",
                            fontSize: "14px",
                            fontWeight: 400,
                        }}
                        onClick={() => setActiveButton("1")}
                    >
                        EPF
                    </button>

                    <button
                        style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: activeButton === "2" ? "#675BFA" : "black",
                            borderBottom:
                                activeButton === "2" ? "2px solid #675BFA" : "none",
                            marginRight: "10px",
                            cursor: "pointer",
                            padding: "7px 10px 12px 10px",
                            fontSize: "14px",
                            fontWeight: 400,
                        }}
                        onClick={() => setActiveButton("2")}
                    >
                    ESI
                    </button>

                    <button
                        style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: activeButton === "3" ? "#675BFA" : "black",
                            borderBottom:
                                activeButton === "3" ? "2px solid #675BFA" : "none",
                            marginRight: "10px",
                            cursor: "pointer",
                            padding: "7px 10px 12px 10px",
                            fontSize: "14px",
                            fontWeight: 400,
                        }}
                        onClick={() => setActiveButton("3")}
                    >
                        Professional Tax
                    </button>

                    <button
                        style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: activeButton === "4" ? "#675BFA" : "black",
                            borderBottom:
                                activeButton === "4" ? "2px solid #675BFA" : "none",
                            marginRight: "10px",
                            cursor: "pointer",
                            padding: "7px 10px 12px 10px",
                            fontSize: "14px",
                            fontWeight: 400,
                        }}
                        onClick={() => setActiveButton("4")}
                    >
                    Labor Welfare Fund
                    </button>
                </Box>

                <Divider style={{ marginTop: "-10px" }} />

                {renderComponent()}
            </Bbox>
        </RevealCard>

        </>
    );
};



export default StatutoryComponents;
