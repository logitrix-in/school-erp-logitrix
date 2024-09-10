import React, { useState, useEffect } from "react";
import RevealCard from "../../../AnimationComponents/RevealCard";
import Bbox from "../../../UiComponents/Bbox";
import {
  Box,
  Divider,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Radio,
  Button,
  OutlinedInput,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Chip,
  TextField,
  Link
} from "@mui/material";
import { useMediaQuery } from "@material-ui/core";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "./styles.css";
import useClasses from "../../../../hooks/useClasses";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Popup from "../../../UiComponents/Popup";

const StudentIndividual = () => {
  // breakpoints
  const isSmall = useMediaQuery("(max-width: 1364px)");
  const isTablet = useMediaQuery("(min-width: 1365px) and (max-width: 1535px)");
  const isLaptop = useMediaQuery("(min-width: 1536px) and (max-width: 1706px)");
  const isDesktop = useMediaQuery(
    "(min-width: 1707px) and (max-width: 1919px)"
  );
  const isLarge = useMediaQuery("(min-width: 1920px)");
  const isXlarge = useMediaQuery("(min-width: 2560px)");

  // States
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [accessStatus, setAccessStatus] = useState("");
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [isEditButtonActive, setIsEditButtonActive] = useState(false);
  const [row, setRow] = useState([]);
  const [resetDialog, setResetDialog] = useState(false);
  const [disableDialog, setDisableDialog] = useState(false);

  const [curRole, setRole] = useState([]);
  const [filter, setFilter] = useState({});
  const [type, setType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const [resetPassword, setResetPassword] = useState(false);

  const { employeeRole } = useClasses();

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        "https://server.sociolinq.com/api/students/manage/edit-information/individual/edit/",
        {
          params: {
            name: searchQuery,
          },
        }
      );
      console.log(response.data);
      setSearchResult(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // context useEffect
  useEffect(() => {
    const _filter = {
      curRole: curRole,
      type: type,
    };
    setFilter(_filter);
  }, [curRole, type]);

  const columns = [
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
            setIsEditButtonActive(true);
          }}
        />
      ),
    },
    { field: "id", headerName: "Employee ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "emp_type", headerName: "Employee Type", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    { field: "grade", headerName: "Grade", flex: 0.8 },
    {
      field: "access",
      headerName: "Account Access",
      flex: 1,
      renderCell: (params) => (
        <Box
          style={{
            backgroundColor:
              params.value === "Enabled"
                ? "#C6F6D5"
                : params.value === "Disabled"
                  ? "#FFCCCC"
                  : "transparent",
            borderRadius: "6px",
            display: "inline-block",
            width:
              params.value === "Enabled" || params.value === "Disabled"
                ? "70px"
                : "auto",
            paddingLeft:
              params.value === "Enabled"
                ? "11px"
                : params.value === "Disabled"
                  ? "7px"
                  : "0px",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    { field: "role", headerName: "Assigned Role", flex: 1 },
  ];

  // table rows
  const rows = [
    {
      id: "AG240001",
      name: "Saunav Ray",
      emp_type: "Teaching Staff",
      department: "Science",
      grade: 'B2',
      access: "Enabled",
      role: "House Coordinator",
    },
    {
      id: "AG240002",
      name: "Saunav Ray",
      emp_type: "Teaching Staff",
      department: "Science",
      grade: 'B2',
      access: "Enabled",
      role: "House Coordinator",
    },
    {
      id: "AG240003",
      name: "Saunav Ray",
      emp_type: "Teaching Staff",
      department: "Science",
      grade: 'B2',
      access: "Disabled",
      role: "House Coordinator",
    },
    {
      id: "AG240004",
      name: "Saunav Ray",
      emp_type: "Teaching Staff",
      department: "Science",
      grade: 'B2',
      access: "Enabled",
      role: "House Coordinator",
    }
  ];

  // useEffect(() => {
  //   // Find the selected row based on selectedRow ID
  //   const selectedRowData = rows.find((row) => row.id === selectedRow);

  //   // If selectedRowData exists, update accessStatus
  //   if (selectedRowData) {
  //     setAccessStatus(
  //       selectedRowData.access === "Enabled" ? "Enabled" : "Disabled"
  //     );
  //   } else {
  //     // If no row is selected, reset accessStatus
  //     setAccessStatus("Change Access");
  //   }
  // }, [selectedRow, rows]);

  // handle notifying inactive users
  const handleAssignRoleSubmit = () => {
    try {
      toast.success("Assigned role(s) are updated successfully", {
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error while displaying toast:", error);
    }
    setOpenDialog(false);
    setShowConfirmationDialog(false);
  };

  // handle assign role dropdown change
  const handleRoleChange = (e) => {
    const {
      target: { value },
    } = e;

    // Check if "all" is selected
    if (value.includes("all")) {
      // If "all" is selected and all rolles are already selected, deselect all
      if (curRole.length === employeeRole.length) {
        setRole([]);
      } else {
        // If "all" is selected and not all rolles are selected, select all
        setRole(employeeRole);
      }
      return;
    }

    console.log(curRole)
    // Set the selected rolles
    setRole(value);
  };

  const handleSubmit = () => {
    const newRoles = curRole.filter((r) => !employeeRole.includes(r));
    setRole((prevRole) => [...prevRole, ...newRoles]);

    setConfirmationMessage("Are you sure you want to change the role?");
    setShowConfirmationDialog(true);
  };

  const cancelRoleChange = () => {
    setShowConfirmationDialog(false);
  };

  const handleResetPasswordClick = () => {
    setResetDialog(true);
  };

  const handleClose = () => {
    setResetDialog(false);
    setResetPassword(false);
  };

  const handleResetPassword = () => {
    setResetDialog(false);
    toast.success("Successfully password reset.", { autoClose: 3000 });
  };

  const handleAccessConfirmation = () => {
    setDisableDialog(true);
  };

  const handleCloseDisable = () => {
    setDisableDialog(false);
  };

  const handleConfirmDisable = () => {
    setDisableDialog(false);
    toast.success(
      `Successfully ${accessStatus === "Enabled" ? "Access Disabled" : "Access Enabled"
      }.`,
      { autoClose: 3000 }
    );
  };

  const isAnyCheckboxSelected = rows.some((row) => row.id === selectedRow);

  const handleAssignRoleClick = () => setOpenDialog(true);

  const handleCloseDialog = () => setOpenDialog(false);

  return (
    <RevealCard>
      <Bbox
        mt={2}
        width="100%"
        height={"100%"}
        borderRadius={2}
        overflow="hidden"
      >
        <ToastContainer />

        {/* Individual Section */}
        <Box
          bgcolor="white"
          py={1.3}
          px={3}
          borderRadius={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography fontWeight={700} fontSize="1.1rem">
            Individual
          </Typography>
        </Box>
        <Divider />

        {/* Search Section */}
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          p={2}
          mt={1}
          height={70}
          width="100%"
        >
          {/* search input */}
          <input
            type="text"
            placeholder="Search by Employee ID or Employee Name"
            style={{
              width: isLaptop ? 420 : "50%",
              height: "100%",
              borderRadius: "7px",
              border: "1px solid #ccc",
              paddingLeft: "10px",
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Box>

        {/* Table */}
        <Box m={2} style={{ height: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          // checkboxSelection
          />
        </Box>

        {/* Buttons */}
        <Box display="flex" justifyContent="flex-end" mt={5} mr={2} mb={5}>
          <Stack direction="row" spacing={2}>
            {/* reset password button */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleResetPasswordClick}
              disabled={!isAnyCheckboxSelected}
            >
              Reset Password
            </Button>

            {/* disable/enable access button */}
            {accessStatus === "Enabled" ?
              <Button
                variant="contained"
                color="secondary"
                onClick={handleAccessConfirmation}
                disabled={!isAnyCheckboxSelected}
              >Disable Access</Button> : <Button
                variant="contained"
                color="primary"
                onClick={handleAccessConfirmation}
                disabled={!isAnyCheckboxSelected}
              >Enable Access</Button>
            }

            {/* assign role button */}
            <Button
              variant="outlined"
              color="primary"
              onClick={handleAssignRoleClick}
              disabled={!isAnyCheckboxSelected}
            >
              Assign Role
            </Button>
          </Stack>
        </Box>

        {/* Dialog box for Assigning Role */}
        <Popup title={"Assign Role"} open={openDialog}
          close={handleCloseDialog}
          fullWidth
          maxWidth="sm">
          <Box p={5} component={"form"} height={"40vh"} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'align-items'}>

            <Box display={"flex"} flexDirection={"row"} sx={{ marginBottom: "2rem" }}>
              {
                curRole.length == 0 ? (
                  <Typography textAlign={'center'} sx={{ width: '100%', margin: 'auto' }}>No role has been assigned currently</Typography>
                ) : (
                  <>
                    <Typography
                      variant="body1"
                      sx={{
                        marginRight: "1rem", fontSize: "16px",
                        fontWeight: "400",
                      }}
                    >
                      Currently assigned role:
                    </Typography>
                    <Box sx={{ width: "auto" }}>
                      {
                        curRole.map((role, idx) => (
                          <Chip
                            key={idx}
                            label={role}
                            color="primary"
                            // onDelete={handleDelete}
                            style={{ marginRight: "8px" }}
                            sx={{ marginBottom: "5px", backgroundColor: "#e8e2ea", color: "black" }}
                          />
                        ))
                      }
                    </Box>
                  </>
                )
              }
            </Box>

            {/* assign role dropdown */}
            <FormControl fullWidth>
              <InputLabel>Select Role</InputLabel>
              <Select
                placeholder="All"
                multiple
                value={curRole}
                onChange={handleRoleChange}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300,
                    },
                  },
                }}
                input={<OutlinedInput label="Select Role" />}
                renderValue={(selected) =>
                  selected.length === employeeRole.length ? "All" : selected.join(", ")
                }
              >
                {/* Select All option */}
                <MenuItem value="all">
                  <ListItemIcon>
                    <Checkbox
                      checked={curRole.length === employeeRole.length}
                      indeterminate={
                        curRole.length > 0 && curRole.length < employeeRole.length
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary="Select All" />
                </MenuItem>
                {/* roll options */}
                {employeeRole.map((roleOption) => (
                  <MenuItem key={roleOption} value={roleOption}>
                    <Checkbox
                      size="small"
                      checked={curRole.indexOf(roleOption) > -1}
                    />
                    <ListItemText primary={roleOption} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* submit button */}
            <Box mt={4} textAlign="center" sx={{ width: '100%' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                fullWidth
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Popup >

        {/* Confirmation Dialog for role change */}
        <Popup title={"Confirmation"} open={showConfirmationDialog} close={cancelRoleChange}>
          <Box p={5} component={"form"} height={"20vh"} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>

            <Typography variant="body1">
              Are you sure you want to change the role?
            </Typography>

            <Box p={2} display={'flex'} gap={4} justifyContent={'center'} alignItems={'center'}>
              <Button
                color="primary"
                variant="contained"
                onClick={handleAssignRoleSubmit}
              >
                Yes
              </Button>
              <Button onClick={cancelRoleChange} color="primary" variant="outlined">
                No
              </Button>
            </Box>
          </Box>
        </Popup >

        {/* Reset Password Dialog */}
        <Popup title={"Reset Password"} open={resetDialog} close={handleClose}>
          <Box p={5} component={"form"} height={"20vh"} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
            <TextField
              name="critical_ailment"
              fullWidth
              placeholder="Set New Password to Login"
            />
            <Box mt={4} display="flex" sx={{ width: '100%' }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleResetPassword}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Popup >

        {/* Disable/Enable Dialog */}
        <Popup title={"Enable Access"} open={disableDialog} close={handleCloseDisable}>
          <Box p={5} component={"form"} height={"20vh"} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>

            <Box p={2} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
              <Typography variant="body1">
                Are you sure you want to{" "}
                {accessStatus === "Enabled" ? "Disable Access" : "Enable Access"}{" "}
                the employee's account?
              </Typography>

              <Box mt={2} gap={4} display="flex" >
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleConfirmDisable}
                >
                  Yes
                </Button>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={handleCloseDisable}
                >
                  No
                </Button>
              </Box>
            </Box>
          </Box>
        </Popup >
      </Bbox>
    </RevealCard >
  );
};

export default StudentIndividual;
