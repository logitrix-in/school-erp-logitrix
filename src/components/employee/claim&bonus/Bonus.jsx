import { useState } from "react";
import {
    Box,
    Button,
    Checkbox,
    Radio,
    Divider,
    FormControl,
    InputLabel,
    ListItemIcon,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    Typography,
} from "@mui/material";
import Bbox from "../../../components/UiComponents/Bbox";
import RevealCard from "../../../components/AnimationComponents/RevealCard";
import { DataGrid } from "@mui/x-data-grid";
import { useMediaQuery } from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AddNewBonus from "./AddNewBonus";
import CloseIcon from '@mui/icons-material/Close';

export default function Bonus() {
    const [acYear, setAcYear] = useState("");
    const [addNewBonusPopup, setAddNewBonusPopup] = useState(false);

    // breakpoints
    const isSmall = useMediaQuery("(max-width: 1364px)");
    const isTablet = useMediaQuery("(min-width: 1365px) and (max-width: 1535px)");
    const isLaptop = useMediaQuery("(min-width: 1536px) and (max-width: 1706px)");
    const isDesktop = useMediaQuery(
        "(min-width: 1707px) and (max-width: 1919px)"
    );
    const isLarge = useMediaQuery("(min-width: 1920px)");
    const isXlarge = useMediaQuery("(min-width: 2560px)");

    const columns = [
        {
            field: "space",
            headerName: "",
            flex: 0.2,
        },
        {
            field: "bonus_head_name", headerName: "Bonus Head Name", flex: 1,
        },
        {
            field: "period", headerName: "Period", flex: 1,
        },
        {
            field: "bonus_amount", headerName: "Bonus Amount", flex: 2, renderCell: (params) => {
                return (
                    <Box display={"grid"} gridTemplateColumns={"repeat(2, 1fr)"} gap={2}>
                        {Object.entries(params.value).map(([key, value]) => (
                            <Box key={key} display={"flex"} alignItems={"center"} justifyContent={"space-between"} borderRadius={10} bgcolor={"#E5E5E5"} sx={{ paddingLeft: "12px", paddingRight: "8px", paddingY: "4px" }}>
                                <Typography fontSize={"0.8rem"}>{key}: {value}</Typography>
                                <CloseIcon sx={{ backgroundColor: "#BBB0B0", color: "white", borderRadius: "50%", padding: "2px", marginLeft: "4px" }} cursor={"pointer"} />
                            </Box>
                        ))}
                    </Box>
                );
            }
        },
        {
            field: "tds_applicable", headerName: "TDS Applicable", flex: 1,
        },
        {
            field: "elligiblity_criteria", headerName: "Elligibility Criteria", flex: 1.5, renderCell: (params) => {
                return (
                    <Box>
                        {Object.entries(params.value).map(([key, value]) => (
                            <Typography key={key}>{key}: {value}</Typography>
                        ))}
                    </Box>
                );
            }
        },
    ];

    const rows = [
        {
            id: 1, bonus_head_name: "Diwali Bonus", period: "Jul 2024 - Aug 2024", bonus_amount: {
                "A1": '₹25000',
                "B1": '₹25000',
                "B3": '₹25000',
                "A2": '₹25000'
            }, tds_applicable: "Yes", elligiblity_criteria: {
                "Employee Status": "Active",
                "Leave without Pay": "No",
                "Open Incident(s)": "No",
                "Appraisal Rating": 2
            }
        },
    ];

    return (
        <>
            <RevealCard>
                <Bbox borderRadius={2} overflow={"hidden"}>
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
                            Active Bonuses
                        </Typography>
                    </Box>

                    <Divider />

                    <Box p={2}>
                        <FormControl sx={{ width: "30%" }}>
                            <InputLabel>Academic Year</InputLabel>
                            <Select
                                label="Academic Year"
                                value={acYear}
                                onChange={(e) => setAcYear(e.target.value)}
                            >
                                <MenuItem value={"2021-22"}>2021-22</MenuItem>
                                <MenuItem value={"2023-24"}>2023-24</MenuItem>
                                <MenuItem value={"2024-25"}>2024-25</MenuItem>
                                <MenuItem value={"2025-26"}>2025-26</MenuItem>
                            </Select>
                        </FormControl>

                        <Box mt={2} mb={4} style={{ height: "100%" }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                rowHeight={100}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                pageSizeOptions={[5, 10]}
                            />
                        </Box>

                        <AddNewBonus open={addNewBonusPopup} close={() => setAddNewBonusPopup(false)} />

                        <Box marginBottom={4}>
                            <Button variant="contained" color="primary" width="auto" onClick={() => {
                                console.log("clicked");
                                setAddNewBonusPopup(true);
                            }}><AddCircleOutlineOutlinedIcon sx={{ mr: 1 }} />Add New</Button>
                        </Box>
                    </Box>
                </Bbox>
            </RevealCard >
        </>
    )
}