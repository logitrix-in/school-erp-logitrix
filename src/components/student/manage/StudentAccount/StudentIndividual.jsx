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
  const [selectedRow, setSelecetedRow] = useState(null);
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

  const { role } = useClasses();

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

  // table columns
  const columns = [
    {
      field: "radioButtons",
      headerName: "",
      width: 100,
      renderCell: (params) => (
        <Radio
          checked={params.row.id === selectedRow}
          color="primary"
          sx={{
            transform: "scale(0.6)",
          }}
          inputProps={{ "aria-label": params.row.id }}
          onChange={() => {
            setSelecetedRow(params.row.id);
            setIsEditButtonActive(true);
          }}
        />
      ),
    },
    {
      field: "id",
      headerName: "Student ID",
      width: isLaptop
        ? 150
        : isLarge
        ? 200
        : isTablet
        ? 140
        : isSmall
        ? 110
        : 170,
    },
    {
      field: "name",
      headerName: "Name",
      width: isLaptop
        ? 150
        : isLarge
        ? 200
        : isTablet
        ? 120
        : isSmall
        ? 110
        : 170,
    },
    {
      field: "class",
      headerName: "Class",
      width: isLaptop
        ? 150
        : isLarge
        ? 200
        : isTablet
        ? 110
        : isSmall
        ? 80
        : 170,
    },
    {
      field: "section",
      headerName: "Section",
      width: isLaptop
        ? 150
        : isLarge
        ? 200
        : isTablet
        ? 120
        : isSmall
        ? 80
        : 170,
    },
    {
      field: "roll",
      headerName: "Roll #",
      width: isLaptop
        ? 150
        : isLarge
        ? 200
        : isTablet
        ? 110
        : isSmall
        ? 80
        : 170,
    },
    {
      field: "access",
      headerName: "Account Access",
      width: isLaptop
        ? 150
        : isLarge
        ? 200
        : isTablet
        ? 170
        : isSmall
        ? 140
        : 170,
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
                ? "10px"
                : params.value === "Disabled"
                ? "8px"
                : "0px",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    { field: "role", headerName: "Assigned Role", width: 180 },
  ];

  // table rows
  const rows = [
    {
      id: "AG240001",
      class: "VI",
      name: "Saunav Ray",
      section: "A",
      roll: 23,
      access: "Enabled",
      role: "Dance Club Secretary",
    },
    {
      id: "AG240002",
      class: "VI",
      name: "Saunav Ray",
      section: "A",
      roll: 23,
      access: "Enabled",
      role: "Dance Club Secretary",
    },
    {
      id: "AG240003",
      class: "VI",
      name: "Saunav Ray",
      section: "A",
      roll: 23,
      access: "Disabled",
      role: "Dance Club Secretary",
    },
  ];

  useEffect(() => {
    // Find the selected row based on selectedRow ID
    const selectedRowData = rows.find((row) => row.id === selectedRow);

    // If selectedRowData exists, update accessStatus
    if (selectedRowData) {
      setAccessStatus(
        selectedRowData.access === "Enabled" ? "Enabled" : "Disabled"
      );
    } else {
      // If no row is selected, reset accessStatus
      setAccessStatus("Change Access");
    }
  }, [selectedRow, rows]);

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
      if (curRole.length === role.length) {
        setRole([]);
      } else {
        // If "all" is selected and not all rolles are selected, select all
        setRole(role);
      }
      return;
    }

    // Set the selected rolles
    setRole(value);
  };

  const handleSubmit = () => {
    const newRoles = curRole.filter((r) => !role.includes(r));
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

  const handleResetConfirm = () => {
    setResetDialog(false);
    setResetPassword(true);
  };

  const handleResetPassword = () => {
    setResetPassword(false);
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
      `Successfully ${
        accessStatus === "Enabled" ? "Access Disabled" : "Access Enabled"
      }.`,
      { autoClose: 3000 }
    );
  };

  const isAnyCheckboxSelected = rows.some((row) => row.id === selectedRow);

  const handleAssignRoleClick = () => setOpenDialog(true);

  const handleCloseDialog = () => setOpenDialog(false);

  // Styles
  const buttonStyle = {
    backgroundColor: "#C4673B",
    color: "white",
    "&:hover": { backgroundColor: "#A14E2C" },
    width: "140px",
  };

 const roles = [
    "House Coordinator",
    "High School Coordinator",
    "Dance Club Supervisor",
  ];

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

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
            placeholder="Search by Student ID or Student Name"
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

          {/* search button */}
          <Button
            variant="contained"
            style={{ marginLeft: "15px" }}
            onClick={handleSearch}
          >
            Search
          </Button>
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
              sx={buttonStyle}
              onClick={handleResetPasswordClick}
              disabled={!isAnyCheckboxSelected}
            >
              Reset Password
            </Button>

            {/* disable/enable access button */}
            <Button
              variant="contained"
              sx={buttonStyle}
              onClick={handleAccessConfirmation}
              disabled={!isAnyCheckboxSelected}
            >
              {accessStatus === "Enabled" ? "Disable Access" : "Enable Access"}
            </Button>

            {/* assign role button */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: "white",
                color: "#C4673B",
                border: "1px solid #C4673B",
                "&:hover": { backgroundColor: "#A14E2C", color: "white" },
                width: "140px",
              }}
              onClick={handleAssignRoleClick}
              disabled={!isAnyCheckboxSelected}
            >
              Assign Role
            </Button>
          </Stack>
        </Box>

        {/* Dialog box for Assigning Role */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle
            sx={{
              backgroundColor: "#2F7DA1",
              textAlign: "center",
              color: "white",
              fontSize: "20px",
              fontWeight: "600",
            }}
          >
            Assign Role
            <IconButton
              aria-label="close"
              onClick={handleCloseDialog}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: "white",
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent dividers>
            {/* already selected roles */}
            <Box display={"flex"} flexDirection={"row"}>
              <Typography
                variant="body1"
                gutterBottom
                style={{
                  fontSize: "16px",
                  fontWeight: "400",
                  marginBottom: "10%",
                }}
              >
                Currently assigned role -&nbsp;
              </Typography>
              <Box sx={{ width: "auto" }}>
                {roles.map((role) => (
                  <Chip
                    label={role}
                    color="primary"
                    onDelete={handleDelete}
                    style={{ marginRight: "8px" }}
                    sx={{marginBottom: "5px", backgroundColor: "#ccccc", color: "black"}}
                  />
                ))}
              </Box>
            </Box>

            {/* assign role dropdown */}
            <FormControl style={{ width: "15rem", marginLeft: "10rem" }}>
              <InputLabel>Assign Role</InputLabel>
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
                input={<OutlinedInput label="Assign Role" />}
                renderValue={(selected) =>
                  selected.length === role.length ? "All" : selected.join(", ")
                }
              >
                {/* Select All option */}
                <MenuItem value="all">
                  <ListItemIcon>
                    <Checkbox
                      checked={curRole.length === role.length}
                      indeterminate={
                        curRole.length > 0 && curRole.length < role.length
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary="Select All" />
                </MenuItem>
                {/* roll options */}
                {role.map((roleOption) => (
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
            <Box mt={10} textAlign="center">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Box>
          </DialogContent>
        </Dialog>

        {/* Confirmation Dialog for role change */}
        <Dialog open={showConfirmationDialog}>
          <Box style={{ height: "15px", backgroundColor: "#2F7DA1" }}></Box>
          <DialogContent>
            <Typography>{confirmationMessage}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={cancelRoleChange} color="secondary">
              No
            </Button>
            <Button
              color="primary"
              sx={{
                backgroundColor: "#2F7DA1",
                color: "white",
                "&:hover": { backgroundColor: "#1c536b" },
              }}
              onClick={handleAssignRoleSubmit}
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>

        {/* Reset Password Dialog */}
        <Dialog open={resetDialog} onClose={handleClose}>
          <div
            style={{
              backgroundColor: "#3B98C4",
              height: "50px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "600",
              color: "white",
              fontSize: "20px",
            }}
          >
            {" "}
            Reset Password
          </div>

          <Box p={2}>
            <Typography variant="body1">
              Are you sure you want to reset the password?
            </Typography>

            <Box mt={2} gap={1} display="flex" justifyContent="flex-end">
              <Button
                onClick={handleClose}
                sx={{
                  color: "red",
                  fontWeight: "400",
                  "&:hover": {
                    backgroundColor: "#FFECEB",
                  },
                }}
              >
                No
              </Button>
              <Button
                variant="contained"
                onClick={handleResetConfirm}
                color="primary"
                autoFocus
              >
                Yes
              </Button>
            </Box>
          </Box>
        </Dialog>

        <Dialog open={resetPassword} onClose={handleClose}>
          <div
            style={{
              backgroundColor: "#3B98C4",
              height: "50px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "600",
              color: "white",
              fontSize: "20px",
            }}
          >
            {" "}
            Reset Password
          </div>

          <Box
            p={2}
            width={"600px"}
            height={"300px"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <TextField
              label="Set new password for login"
              variant="outlined"
              fullWidth
              type="password"
              style={{ marginBottom: "20px" }}
              sx={{ width: "400px" }}
            />

            <Button
              variant="contained"
              sx={{ width: "400px" }}
              onClick={handleResetPassword}
            >
              Submit
            </Button>
          </Box>
        </Dialog>

        {/* Disable/Enable Dialog */}
        <Dialog open={disableDialog} onClose={handleCloseDisable}>
          <div
            style={{
              backgroundColor: "#3B98C4",
              height: "15px",
              width: "100%",
            }}
          />

          <Box p={2}>
            <Typography variant="body1">
              Are you sure you want to{" "}
              {accessStatus === "Enabled" ? "Disable Access" : "Enable Access"}{" "}
              the student's account?
            </Typography>

            <Box mt={2} gap={1} display="flex" justifyContent="flex-end">
              <Button
                onClick={handleCloseDisable}
                sx={{
                  color: "red",
                  fontWeight: "400",
                  "&:hover": {
                    backgroundColor: "#FFECEB",
                  },
                }}
              >
                No
              </Button>
              <Button
                variant="contained"
                onClick={handleConfirmDisable}
                color="primary"
                autoFocus
              >
                Yes
              </Button>
            </Box>
          </Box>
        </Dialog>
      </Bbox>
    </RevealCard>
  );
};

export default StudentIndividual;
