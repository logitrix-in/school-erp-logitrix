import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Overview from "../../components/employee/timetable/Overview";

const EmployeeRecruitment = () => {
    const navigate = useNavigate();

    return (
        <Box display={'flex'} flexDirection={'column'} gap={2}>
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

            <Overview />
        </Box>
    );
};

export default EmployeeRecruitment;
