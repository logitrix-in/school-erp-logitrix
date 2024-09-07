import { useState } from "react";
import {
    Box,
} from "@mui/material";
import LeaveManagement from "../../components/employee/leave/LeaveManagement";
import Record from "../../components/employee/leave/Record";
import Configure from "../../components/employee/leave/Configure";
import Navigator from "../../components/employee/leave/Navigator";
import { ToastContainer } from "react-toastify";

const EmployeeLeave = () => {

    const navs = [
        {
            name: "Leave Management",
        },
        {
            name: "Record",
        },
        {
            name: "Configure",
        }
    ];

    const [active, setActive] = useState(0);

    return (
        <>
            <Navigator navs={navs} onChange={setActive} />
            <ToastContainer />

            <Box mb={2} />
            {active == 0 && <LeaveManagement />}
            {active == 1 && <Record />}
            {active == 2 && <Configure />}
        </>
    )
};

export default EmployeeLeave;
