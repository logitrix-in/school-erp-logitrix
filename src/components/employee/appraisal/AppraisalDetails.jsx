import React, { useState } from "react";
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
import Bbox from "../../UiComponents/Bbox";
import RevealCard from "../../AnimationComponents/RevealCard";

export default function AppraisalDetails() {
    const [appraisalCycle, setAppraisalCycle] = useState("");

    return (
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
                        View Employee Appraisal Details
                    </Typography>
                </Box>

                <Divider />

                <Box display={"grid"} gridTemplateColumns={"repeat(5, 1fr)"} gap={2} px={3} py={4}>
                    <FormControl fullWidth>
                        <InputLabel>Appraisal Cycle</InputLabel>
                        <Select
                            label="Appraisal Cycle"
                            value={appraisalCycle}
                            onChange={(e) => setAppraisalCycle(e.target.value)}
                        >
                            <MenuItem value={"2021-22"}>2021-22</MenuItem>
                            <MenuItem value={"2023-24"}>2023-24</MenuItem>
                            <MenuItem value={"2024-25"}>2024-25</MenuItem>
                            <MenuItem value={"2025-26"}>2025-26</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>Department</InputLabel>
                        <Select
                            label="Department"
                            value={appraisalCycle}
                            onChange={(e) => setAppraisalCycle(e.target.value)}
                        >
                            <MenuItem value={"2021-22"}>2021-22</MenuItem>
                            <MenuItem value={"2023-24"}>2023-24</MenuItem>
                            <MenuItem value={"2024-25"}>2024-25</MenuItem>
                            <MenuItem value={"2025-26"}>2025-26</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>Grade</InputLabel>
                        <Select
                            label="Grade"
                            value={appraisalCycle}
                            onChange={(e) => setAppraisalCycle(e.target.value)}
                        >
                            <MenuItem value={"2021-22"}>2021-22</MenuItem>
                            <MenuItem value={"2023-24"}>2023-24</MenuItem>
                            <MenuItem value={"2024-25"}>2024-25</MenuItem>
                            <MenuItem value={"2025-26"}>2025-26</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                            label="Status"
                            value={appraisalCycle}
                            onChange={(e) => setAppraisalCycle(e.target.value)}
                        >
                            <MenuItem value={"2021-22"}>2021-22</MenuItem>
                            <MenuItem value={"2023-24"}>2023-24</MenuItem>
                            <MenuItem value={"2024-25"}>2024-25</MenuItem>
                            <MenuItem value={"2025-26"}>2025-26</MenuItem>
                        </Select>
                    </FormControl>

                    <Button variant="contained" color="primary">Apply</Button>
                </Box>
            </Bbox>
        </RevealCard>
    )
}
