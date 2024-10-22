import { useState } from "react";
import {
    Box,
    Button,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    IconButton,
    Menu
} from "@mui/material";
import Bbox from "../../../components/UiComponents/Bbox";
import RevealCard from "../../../components/AnimationComponents/RevealCard";
import { DataGrid } from "@mui/x-data-grid";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AddNewBonus from "./AddNewBonus";
import EditBonus from "./EditBonus";
import useClasses from "../../../hooks/useClasses";
import { MoreVert as MoreVertIcon } from '@mui/icons-material';

const ActionCell = ({ params, onEdit, onDelete }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        onEdit(params.id);
        handleClose();
    };

    const handleDelete = () => {
        onDelete(params.id);
        handleClose();
    };

    return (
        <>
            <IconButton onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
        </>
    );
};

export default function Bonus() {
    const { acYear, curYear } = useClasses();
    
    const [academicYear, setAcademicYear] = useState(curYear);
    const [addNewBonusPopup, setAddNewBonusPopup] = useState(false);
    const [editBonusPopup, setEditBonusPopup] = useState(false);

    const [rows, setRows] = useState([
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
    ]);

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
            field: "bonus_amount", headerName: "Bonus Amount", flex: 1.5, renderCell: (params) => {
                return (
                    <Box display={"grid"} gridTemplateColumns={"repeat(2, 1fr)"} gap={2}>
                        {Object.entries(params.value).map(([key, value]) => (
                            <Box key={key} display={"flex"} alignItems={"center"} justifyContent={"space-between"} borderRadius={10} bgcolor={"#E5E5E5"} sx={{ paddingLeft: "12px", paddingRight: "8px", paddingY: "4px" }}>
                                <Typography fontSize={"0.8rem"}>{key}: {value}</Typography>
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
            field: "elligiblity_criteria", headerName: "Eligibility Criteria", flex: 1.5, renderCell: (params) => {
                return (
                    <Box>
                        {Object.entries(params.value).map(([key, value]) => (
                            <Typography key={key}>{key}: {value}</Typography>
                        ))}
                    </Box>
                );
            }
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 0.5,
            renderCell: (params) => (
                <ActionCell params={params} onEdit={handleEdit} onDelete={handleDelete} />
            ),
        },
    ];

    const handleEdit = (id) => {
        console.log(`Edit row with id: ${id}`);
        setEditBonusPopup(true);
    };

    const handleDelete = (id) => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    };

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
                                onChange={(e) =>
                                    setAcademicYear(e.target.value)
                                }
                                value={academicYear}
                            >
                                {acYear.map((year) => (
                                    <MenuItem key={year} value={year}>
                                        {year}
                                    </MenuItem>
                                ))}
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
                        <EditBonus open={editBonusPopup} close={() => setEditBonusPopup(false)} />

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