import React, { useState, useEffect } from "react";
import RevealCard from "../../../AnimationComponents/RevealCard";
import Bbox from "../../../UiComponents/Bbox";
import {
    Box,
    Divider,
    Typography,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Button,
    Autocomplete,
    TextField,
    Radio,
} from "@mui/material";
import { useMediaQuery } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { ToastContainer } from "react-toastify";
import Review from './Review'
import CompensationImpact from "./CompensationImpact";
import ProbationLetterTemplate from "./ProbationLetterTemplate";

const Probation = () => {
    const navigate = useNavigate();

    // states
    return (
        <RevealCard>
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
                        onClick={() => navigate("/employee/manage/promotion/")}
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
                        onClick={() => navigate("/employee/manage/section-allotment/")}
                    >
                        Probation
                    </button>
                </div>
            </div>

            <Review />
            <CompensationImpact />
            <ProbationLetterTemplate />

        </RevealCard >
    );
};

export default <Probation />;
