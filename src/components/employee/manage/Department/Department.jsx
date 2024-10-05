import { useState } from "react";
import RevealCard from "../../../AnimationComponents/RevealCard";
import Bbox from "../../../UiComponents/Bbox";
import { Box, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
    Button,
    TextField,
    Autocomplete,
    Radio,
    Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditSupervisor from "./EditSupervisor";
import DepartmentTransfer from "./DepartmentTransfer";
import LocationTransfer from "./LocationTransfer";
import AddNewDepartment from "./AddNewDepartment";
import ModifyDepartment from "./ModifyDepartment";
import DeleteDepartment from "./DeleteDepartment";

const EmployeeDepartment = () => {
    const columns1 = [
        {
            field: "radioButtons",
            headerName: "",
            flex: 0.2,
            renderCell: (params) => (
                <Radio
                    checked={params.row.id === selectedRow}
                    color="primary"
                    sx={{
                        transform: "scale(0.6)",
                    }}
                    inputProps={{ "aria-label": params.row.id }}
                    onChange={() => {
                        setSelectedRow(params.row.id);
                    }}
                />
            ),
        },
        {
            field: "id",
            headerName: "Employee ID", flex: 1
        },
        {
            field: "name",
            headerName: "Name", flex: 1.5
        },
        {
            field: "emp_type",
            headerName: "Employee Type", flex: 0.8
        },
        {
            field: "department",
            headerName: "Department", flex: 0.8
        },
        {
            field: "grade",
            headerName: "Grade", flex: 0.8
        },
        {
            field: "supervisor",
            headerName: "Supervisor", flex: 0.8
        },
        {
            field: "roles",
            headerName: "Roles", flex: 0.8
        },
    ];

    const rows1 = [
        {
            id: "AG240001",
            name: "Saunav Ray",
            emp_type: "Permanent",
            department: "IT",
            grade: "A",
            supervisor: "John Doe",
            roles: "Admin",
        },
        {
            id: "AG240002",
            name: "Saunav Ray",
            emp_type: "Permanent",
            department: "IT",
            grade: "A",
            supervisor: "John Doe",
            roles: "Admin",
        },
        {
            id: "AG240003",
            name: "Saunav Ray",
            emp_type: "Permanent",
            department: "IT",
            grade: "A",
            supervisor: "John Doe",
            roles: "Admin",
        },
    ];

    const columns2 = [
        {
            field: "radioButtons",
            headerName: "",
            flex: 0.2,
            renderCell: (params) => (
                <Radio
                    checked={params.row.id === selectedRow}
                    color="primary"
                    sx={{
                        transform: "scale(0.6)",
                    }}
                    inputProps={{ "aria-label": params.row.id }}
                    onChange={() => {
                        setSelectedRow(params.row.id);
                    }}
                />
            ),
        },
        {
            field: "id",
            headerName: "Employee ID", flex: 1
        },
        {
            field: "name",
            headerName: "Name", flex: 1.5
        },
        {
            field: "emp_type",
            headerName: "Employee Type", flex: 0.8
        },
        {
            field: "department",
            headerName: "Department", flex: 0.8
        },
        {
            field: "grade",
            headerName: "Grade", flex: 0.8
        },
        {
            field: "supervisor",
            headerName: "Supervisor", flex: 0.8
        },
        {
            field: "location",
            headerName: "Location", flex: 0.8
        },
        {
            field: "status",
            headerName: "Status", flex: 0.8, renderCell: (params) => (
                <Box
                    style={{
                        backgroundColor:
                            params.value === "Approved"
                                ? "#C6F6D5"
                                : params.value === "Rejected"
                                    ? "#FED7D7"
                                    : params.value === "Pending"
                                        ? "#FEEBCB"
                                        : "transparent",
                        color:
                            params.value === "Approved"
                                ? "#22543D"
                                : params.value === "Rejected"
                                    ? "#822727"
                                    : params.value === "Pending"
                                        ? "#822727"
                                        : "transparent",
                        borderRadius: "6px",
                        display: "inline-block",

                        paddingLeft: "7px",
                        paddingRight: "7px",
                        paddingTop: "2px",
                        paddingBottom: "2px",
                    }}
                >
                    {params.value}
                </Box>
            ),
        },
    ];

    const rows2 = [
        {
            id: "AG240001",
            name: "Saunav Ray",
            emp_type: "Permanent",
            department: "IT",
            grade: "A",
            supervisor: "John Doe",
            location: "Kolkata",
            status: "Approved",
        },
        {
            id: "AG240002",
            name: "Saunav Ray",
            emp_type: "Permanent",
            department: "IT",
            grade: "A",
            supervisor: "John Doe",
            location: "Kolkata",
            status: "Approved",
        },
        {
            id: "AG240003",
            name: "Saunav Ray",
            emp_type: "Permanent",
            department: "IT",
            grade: "A",
            supervisor: "John Doe",
            location: "Kolkata",
            status: "Approved",
        },
    ];
    const navigate = useNavigate();
    const [selectedRow, setSelectedRow] = useState(null);
    const [editSupervisorPopup, setEditSupervisorPopup] = useState(false);
    const [departmentTransferPopup, setDepartmentTransferPopup] = useState(false);
    const [locationTransferPopup, setLocationTransferPopup] = useState(false);
    const [addNewDepartmentPopup, setAddNewDepartmentPopup] = useState(false);
    const [modifyDepartmentPopup, setModifyDepartmentPopup] = useState(false);
    const [deleteDepartmentPopup, setDeleteDepartmentPopup] = useState(false);

    return (
        <RevealCard>
            {/* top navigation buttons */}
            <div
                style={{
                    backgroundColor: "#E5F3FB",
                    display: "flex",
                    padding: "10px",
                    maxWidth: "730px",
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
                        onClick={() => navigate("/employee/manage/")}
                    >
                        Edit Information
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
                        onClick={() => navigate("/employee/manage/employee-account/")}
                    >
                        Employee Account
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
                        onClick={() => navigate("/employee/manage/id-card-pass/")}
                    >
                        ID Card
                    </button>

                    <button
                        style={{
                            backgroundColor: "white",
                            border: "none",
                            color: "black",
                            cursor: "pointer",
                            borderRadius: "6px",
                            padding: "7px 10px 7px 10px",
                            fontSize: "16px",
                            fontWeight: 400,
                        }}
                        onClick={() => navigate("/employee/manage/department/")}
                    >
                        Department
                    </button>

                    <button
                        style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "black",
                            cursor: "pointer",
                            borderRadius: "6px",
                            padding: "7px 10px 7px 10px",
                            fontSize: "16px",
                            fontWeight: 400,
                        }}
                        onClick={() => navigate("/employee/manage/promotion/")}
                    >
                        Promotion
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
                        onClick={() => navigate("/employee/manage/probation")}
                    >
                        Probation
                    </button>
                </div>
            </div>

            <ToastContainer />

            <Bbox borderRadius={2} mt={2} pb={4} overflow={"hidden"}>
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
                        Department View
                    </Typography>
                </Box>

                <Divider />

                <Box ml={2} mr={2}>
                    <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent={"space-between"}
                        mt={1}
                        height={70}
                        width={"100%"}
                    >

                        <Autocomplete
                            options={["Student 1", "Student 2"]}
                            filterSelectedOptions
                            freeSolo={false}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Select Department"
                                    label="Select Department"
                                />
                            )}
                            sx={{ width: "30%" }}
                        />

                        <Button
                            color="secondary"
                            variant="outlined"
                            sx={{ marginLeft: "20px" }}
                        >
                            Reporting Structure
                        </Button>
                    </Box>

                    < Box mt={2} mb={5} style={{ height: "100%" }}>
                        <DataGrid
                            rows={rows1}
                            columns={columns1}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                        />
                    </Box>

                    <Box display="flex" justifyContent="flex-end">
                        <Button
                            variant="contained"
                            sx={{ marginLeft: "20px" }}
                            onClick={() => setEditSupervisorPopup(true)}
                        >
                            Edit Supervisor
                        </Button>
                    </Box>

                    <EditSupervisor open={editSupervisorPopup} close={() => setEditSupervisorPopup(false)} />
                </Box>
            </Bbox>

            <Bbox borderRadius={2} mt={4} pb={4} overflow={"hidden"}>
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
                        Transfer
                    </Typography>
                </Box>

                <Divider />

                <Box ml={2} mr={2}>
                    <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent={"space-between"}
                        mt={1}
                        height={70}
                        width={"100%"}
                    >

                        <Autocomplete
                            options={["Student 1", "Student 2"]}
                            filterSelectedOptions
                            freeSolo={false}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Search by Employee name or Employee ID"
                                    label="Search by Employee name or Employee ID"
                                />
                            )}
                            sx={{ width: "30%" }}
                        />
                    </Box>

                    < Box mt={2} mb={5} style={{ height: "100%" }}>
                        <DataGrid
                            rows={rows2}
                            columns={columns2}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                        />
                    </Box>

                    <Box display="flex" justifyContent="flex-end" gap={2}>
                        <Button
                            variant="contained"
                            sx={{ marginLeft: "20px" }}
                            onClick={() => setDepartmentTransferPopup(true)}
                        >
                            Department Transfer
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{ marginLeft: "20px" }}
                            onClick={() => setLocationTransferPopup(true)}
                        >
                            Location Transfer
                        </Button>
                    </Box>

                    <DepartmentTransfer open={departmentTransferPopup} close={() => setDepartmentTransferPopup(false)} />
                    <LocationTransfer open={locationTransferPopup} close={() => setLocationTransferPopup(false)} />
                </Box>
            </Bbox>

            <Bbox borderRadius={2} mt={4} pb={4} overflow={"hidden"}>
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
                        Add / Modify / Remove Department
                    </Typography>
                </Box>

                <Divider />

                <Box ml={2} mr={2}>
                    <Box
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent={"space-between"}
                        mt={1}
                        height={70}
                        width={"100%"}
                    >

                        <Box />

                        <Autocomplete
                            options={["Student 1", "Student 2"]}
                            filterSelectedOptions
                            freeSolo={false}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Select Department"
                                    label="Select Department"
                                />
                            )}
                            sx={{ width: "30%" }}
                        />

                        <Button variant="contained" onClick={() => setAddNewDepartmentPopup(true)}>Add New Department</Button>
                    </Box>

                    <Box display="flex" justifyContent="center" gap={2} mt={4}>
                        <Button
                            variant="outlined"
                            sx={{ marginLeft: "20px" }}
                            onClick={() => setModifyDepartmentPopup(true)}
                        >
                            Modify
                        </Button>
                        <Button
                            color="secondary"
                            variant="contained"
                            sx={{ marginLeft: "20px" }}
                            onClick={() => setDeleteDepartmentPopup(true)}
                        >
                            Delete
                        </Button>
                    </Box>

                    <AddNewDepartment open={addNewDepartmentPopup} close={() => setAddNewDepartmentPopup(false)} />
                    <ModifyDepartment open={modifyDepartmentPopup} close={() => setModifyDepartmentPopup(false)} />
                    <DeleteDepartment open={deleteDepartmentPopup} close={() => setDeleteDepartmentPopup(false)} />


                </Box>
            </Bbox>
        </RevealCard >
    );
};

export default <EmployeeDepartment />;
