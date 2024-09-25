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
import GenerateTimetable from './GenerateTimetable'

const ManualTimetable = () => {
    const navigate = useNavigate();

    // table columns
    const columns = [
        {
            field: "id", headerName: "Employee ID", flex: 1,
            renderCell: (params) => (
                <Link underline="hover" color="primary">
                    {params.value}
                </Link>
            ),
        },
        { field: "name", headerName: "Name", flex: 1.5 },
        { field: "emp_status", headerName: "Employee Status", flex: 1.5 },
        { field: "department", headerName: "Department", flex: 2 },
        { field: "promotion_eligibility", headerName: "Promotion Eligibility", flex: 2 },
        { field: "curr_grade", headerName: "Current Grade", flex: 1.5 },
        { field: "supervisor_name", headerName: "Supervisor Name", flex: 1 },
        { field: "supervisor_recommendation", headerName: "Supervisor Recommendation", flex: 1 },
        { field: "department_head_name", headerName: "Department Head Name", flex: 1 },
        { field: "department_head_recommendation", headerName: "Department Head Recommendation", flex: 1 },
        { field: "approved_for_upcoming_cycle", headerName: "Approved for Upcoming Cycle", flex: 1 },
    ];

    const rows = [
        {
            id: "AG240001",
            name: "Saunav Ray",
            emp_status: "Active",
            department: "Science",
            promotion_eligibility: "Eligible",
            curr_grade: "B2",
            supervisor_name: "John Doe",
            supervisor_recommendation: "Yes",
            department_head_name: "Jane Smith",
            department_head_recommendation: "Yes",
            approved_for_upcoming_cycle: "Yes",
        },
        {
            id: "AG240003",
            name: "Saunav Ray",
            emp_status: "Active",
            department: "Science",
            promotion_eligibility: "Eligible",
            curr_grade: "B2",
            supervisor_name: "John Doe",
            supervisor_recommendation: "Yes",
            department_head_name: "Jane Smith",
            department_head_recommendation: "Yes",
            approved_for_upcoming_cycle: "Yes",
        },
        {
            id: "AG240003",
            name: "Saunav Ray",
            emp_status: "Active",
            department: "Science",
            promotion_eligibility: "Eligible",
            curr_grade: "B2",
            supervisor_name: "John Doe",
            supervisor_recommendation: "Yes",
            department_head_name: "Jane Smith",
            department_head_recommendation: "Yes",
            approved_for_upcoming_cycle: "Yes",
        }
    ];

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
                        onClick={() => navigate("/employee/timetable/smarttable/")}
                    >
                        Smart Timetable
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
                        onClick={() => navigate("/employee/timetable/manualtable/")}
                    >
                        Manual Timetable
                    </button>
                </div>
            </div>

            <GenerateTimetable />

        </RevealCard>
    );
};

export default <ManualTimetable />;
