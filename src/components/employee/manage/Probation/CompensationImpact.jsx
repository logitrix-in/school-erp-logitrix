import React, { useState, useEffect } from "react";
import RevealCard from "../../../AnimationComponents/RevealCard";
import Bbox from "../../../UiComponents/Bbox";
import {
    Box,
    Divider,
    Typography,
    Button,
} from "@mui/material";
import { useMediaQuery } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { ToastContainer } from "react-toastify";
import SetCompensationImpact from "./SetCompensationImpact";

function CompensationImpact() {
    const [setCompensationImpactPopup, setSetCompensationImpactPopup] = useState(false);

    // table 2 columns
    const columns = [
        { field: "grade", headerName: "Grade", flex: 1 },
        { field: "increment", headerName: "Increment %", flex: 1 },
    ];

    // table 2 rows
    const rows = [
        { id: 1, grade: "A", increment: "19" },
        { id: 2, grade: "B", increment: "20" },
        { id: 3, grade: "C", increment: "21" },
    ];

    return (
        <RevealCard>
            <Bbox borderRadius={2} overflow={"hidden"} sx={{ mt: 2 }}>
                <Box
                    bgcolor={"white"}
                    py={1.3}
                    px={3}
                    borderRadius={2}
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Typography fontWeight={"700"} borderRadius={1} fontSize={"1.1rem"}>
                        Compensation Impact
                    </Typography>
                </Box>

                <Divider />

                <ToastContainer />

                {/* <Box display="flex" justifyContent="center" mt={2} mb={5} mr={2}>
                    <Button
                        color="primary"
                        variant="contained"
                        sx={{ mr: 2 }}
                        onClick={() => setSetCompensationImpactPopup(true)}
                    >
                        Set Compensation Impact
                    </Button>
                </Box> */}

                {/* table */}
                <Box mt={2} mb={5} style={{ height: "100%" }} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} mx={'auto'}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        sx={{ width: "40%" }}
                        pageSizeOptions={[10]}
                    />

                    <Box display="flex" justifyContent="center" mt={2} mb={5} mr={2}>
                        <Button
                            color="primary"
                            variant="contained"
                            sx={{ mr: 2 }}
                            onClick={() => setSetCompensationImpactPopup(true)}
                        >
                            Edit Impact
                        </Button>
                    </Box>

                    <SetCompensationImpact open={setCompensationImpactPopup} close={() => setSetCompensationImpactPopup(false)} />
                </Box>
            </Bbox>
        </RevealCard >
    )
}

export default CompensationImpact;