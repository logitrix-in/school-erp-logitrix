import { useState } from "react";
import {
    Box,
} from "@mui/material";
import Schedule from "../../components/examination-management/PreExamination/ScheduleTab/Schedule";
import AdmitCard from "../../components/examination-management/PreExamination/AdmitCardTab/AdmitCard";
import Syllabus from "../../components/examination-management/PreExamination/SyllabusTab/Syllabus";
import Navigator from "../../components/employee/claim&bonus/Navigator";

const PreExamination = () => {

    const navs = [
        {
            name: "Schedule",
        },
        {
            name: "Admit Card",
        },
        {
            name: "Syllabus",
        }
    ];

    const [active, setActive] = useState(0);


    return (
        <>
            <Navigator navs={navs} onChange={setActive} />

            <Box mb={2} />
            {active == 0 && <Schedule />}
            {active == 1 && <AdmitCard />}
            {active == 2 && <Syllabus />}
        </>
    )
};

export default PreExamination;
