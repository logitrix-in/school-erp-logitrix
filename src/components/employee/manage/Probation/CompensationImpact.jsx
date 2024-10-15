import { useState } from "react";
import RevealCard from "../../../AnimationComponents/RevealCard";
import Bbox from "../../../UiComponents/Bbox";
import {
    Box,
    Divider,
    Typography,
    Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditCompensationImpact from "./EditCompensationImpact";
import SetCompensationImpact from "./SetCompensationImpact";

function CompensationImpact() {
    const [setCompensationImpactPopup, setSetCompensationImpactPopup] = useState(false);
    const [editCompensationImpactPopup, setEditCompensationImpactPopup] = useState(false);

    const columns = [
        { field: "space", headerName: "", flex: 0.2 },
        { field: "grade", headerName: "Grade", flex: 0.5 },
        { field: "increment", headerName: "Increment %", flex: 0.4 },
    ];

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

                {/* <Box display="flex" justifyContent="center" mt={2} mb={5} mr={2}>
                    <Button
                        color="primary"
                        variant="contained"
                        sx={{ mr: 2 }}
                        onClick={() => setSetCompensationImpactPopup(true)}
                        value={setCompensationImpactPopup}
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
                            onClick={() => setEditCompensationImpactPopup(true)}
                        >
                            Edit Impact
                        </Button>
                    </Box>

                    <EditCompensationImpact open={editCompensationImpactPopup} close={() => setEditCompensationImpactPopup(false)} />
                    <SetCompensationImpact open={setCompensationImpactPopup} close={() => setSetCompensationImpactPopup(false)} />
                </Box>
            </Bbox>
        </RevealCard >
    )
}

export default CompensationImpact;