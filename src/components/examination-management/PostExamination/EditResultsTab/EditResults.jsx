import {
    Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditViewResults from "./EditViewResults";

const EditResults = () => {
    const navigate = useNavigate();

    return (
        <Box display={'flex'} flexDirection={'column'} gap={2}>
            <div
                style={{
                    backgroundColor: "#E5F3FB",
                    display: "flex",
                    padding: "10px",
                    maxWidth: "404px",
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
                        onClick={() => navigate("/examination-management/post-examination/")}
                    >
                        Publish Results
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
                        onClick={() => navigate("/examination-management/post-examination/edit-results/")}
                    >
                        Edit Results
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
                        onClick={() => navigate("/examination-management/post-examination/report-card/")}
                    >
                        Report Card
                    </button>
                </div>
            </div>

            <EditViewResults />
        </Box>
    )
};

export default EditResults;
