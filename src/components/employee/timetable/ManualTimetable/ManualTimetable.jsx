import RevealCard from "../../../AnimationComponents/RevealCard";
import { useNavigate } from "react-router-dom";
import GenerateTimetable from './GenerateTimetable'

const ManualTimetable = () => {
    const navigate = useNavigate();

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
