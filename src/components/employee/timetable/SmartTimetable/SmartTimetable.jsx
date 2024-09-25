import React, { useState, useEffect } from "react";
import RevealCard from "../../../AnimationComponents/RevealCard";
import Bbox from "../../../UiComponents/Bbox";
import {
    Box,
    Divider,
    Typography,
    Button,
    TextField,
    Link,
    FormControlLabel,
    Switch,
    Autocomplete,
    IconButton
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { ToastContainer } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import GenerateTimetable from './GenerateTimetable'
import ManageClassWise from './ManageClassWise'
import ManageFacultyWise from './ManageFacultyWise'

const SmartTimetable = () => {
    const navigate = useNavigate();
    const [mapping, setMapping] = useState('class');

    return (
        <RevealCard>
            <div
                style={{
                    backgroundColor: "#E5F3FB",
                    display: "flex",
                    padding: "10px",
                    maxWidth: "436px",
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
                        onClick={() => navigate("/employee/timetable/")}
                    >
                        Overview
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
                        onClick={() => navigate("/employee/timetable/smarttable/")}
                    >
                        Smart Timetable
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
                        onClick={() => navigate("/employee/timetable/manualtable/")}
                    >
                        Manual Timetable
                    </button>
                </div>
            </div>

            <RevealCard>
                <Bbox borderRadius={2} overflow={"hidden"} my={2}>
                    <ToastContainer />
                </Bbox>
            </RevealCard >

            {
                mapping === 'class' ?
                    <>
                        <ManageClassWise setMapping={setMapping} />
                        <GenerateTimetable />
                    </>
                    :
                    <ManageFacultyWise setMapping={setMapping} />
            }

        </RevealCard>
    );
};

export default <SmartTimetable />;
