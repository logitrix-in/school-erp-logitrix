import { useState } from "react";
import {
    Box,
} from "@mui/material";
import SmartTimetable from "../../components/employee/timetable/SmartTimetable";
import ManualTimetable from "../../components/employee/timetable/ManualTimetable";
import Navigator from "../../components/employee/leave/Navigator";
import { ToastContainer } from "react-toastify";

const EmployeeTimetable = () => {

    const navs = [
        {
            name: "Overview",
        },
        {
            name: "Smart Timetable",
        },
        {
            name: "Manual Timetable",
        }
    ];

    const [active, setActive] = useState(0);

    return (
        <>
            <Navigator navs={navs} onChange={setActive} />
            <ToastContainer />

            <Box mb={2} />
            {active == 1 && <SmartTimetable />}
            {active == 2 && <ManualTimetable />}
        </>
    )
};

export default EmployeeTimetable;
