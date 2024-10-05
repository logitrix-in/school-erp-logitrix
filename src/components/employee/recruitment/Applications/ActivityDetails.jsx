import {
    Box,
    Divider,
    Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import RevealCard from "../../../../components/AnimationComponents/RevealCard";
import Bbox from "../../../../components/UiComponents/Bbox";


function ActivityDetails({ rows, columns }) {
    return (
        <>
            <RevealCard>
                <Bbox borderRadius={2} overflow={"hidden"} mx={2} my={4}>
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
                            Activity  Details
                        </Typography>
                    </Box>

                    <Divider />

                    <Box mt={2} mb={5} style={{ height: "100%" }} mx={2}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                        />
                    </Box>
                </Bbox>
            </RevealCard>
        </>
    )
}

export default ActivityDetails;