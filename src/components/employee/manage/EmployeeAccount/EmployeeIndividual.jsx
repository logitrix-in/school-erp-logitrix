import { useState } from "react";
import RevealCard from "../../../AnimationComponents/RevealCard";
import Bbox from "../../../UiComponents/Bbox";
import {
  Box,
  Divider,
  Typography,
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
import Stack from "@mui/material/Stack";
import "./styles.css";
import useClasses from "../../../../hooks/useClasses";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataGrid } from "@mui/x-data-grid";
import Popup from "../../../UiComponents/Popup";
import EmployeePopup from '../../EmployeePopup'
import ReignsSelect from "@/components/UiComponents/ReignsSelect";

const StudentIndividual = () => {
  const { employeeRole } = useClasses();

  const [selectedEmployeeRole, setSelectedEmployeeRole] = useState('');

  const [selectedRow, setSelectedRow] = useState(null);
  const [employeePopup, setEmployeePopup] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);
  const [accessStatus, setAccessStatus] = useState("");
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [resetDialog, setResetDialog] = useState(false);
  const [disableDialog, setDisableDialog] = useState(false);

  const [resetPassword, setResetPassword] = useState(false);


  const columns = [
    {field: "space", headerName: "", flex: 0.2},
    {
    field: "id", headerName: "Employee ID", flex: 1,
      renderCell: (params) => (
        <Typography>
          <Typography
            component="span"
            sx={{ color: "primary.main", cursor: "pointer" }}
            onClick={() => setEmployeePopup(true)}
          >
            {params.id}
          </Typography>
        </Typography>
      ),
    },
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
  ];

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

  const handleSubmit = () => {
    const newRoles = selectedEmployeeRole.filter((r) => !employeeRole.includes(r));
    setSelectedEmployeeRole((prevRole) => [...prevRole, ...newRoles]);

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

          <Box display={"flex"} gap={1} sx={{ width: '35%', marginY: '16px' }} >
            <FormControl fullWidth>
              <InputLabel>Search by Employee Name or Employee ID</InputLabel>
              <Select
                label="Search by Employee Name or Employee ID"
                // value={selectedLibraryCard}
                required
              // onChange={(e) => setSelectedLibraryCard(e.target.value)}
              >
                {/* {
								libraryCardNumbers?.map((type) => (
									<MenuItem key={type} value={type}>{type}</MenuItem>
								))
							} */}
              </Select>
            </FormControl>
          </Box>
        </Box>

        <EmployeePopup open={employeePopup} close={() => setEmployeePopup(false)} />

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

        <Popup title={"Assign Role"} open={openDialog}
          close={handleCloseDialog}
          fullWidth
          maxWidth="sm">
          <Box p={5} component={"form"} height={"40vh"} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'align-items'}>

            <Box display={"flex"} flexDirection={"row"} sx={{ marginBottom: "2rem" }}>
              {
                selectedEmployeeRole.length == 0 ? (
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
                        selectedEmployeeRole.map((role, idx) => (
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

            <ReignsSelect
              multiple
              items={employeeRole}
              defaultValues={employeeRole}
              onChange={setSelectedEmployeeRole}
              value={selectedEmployeeRole}
              label="Select Role"
              sx={{ mb: 2 }}
            />

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

        <Popup title={"Reset Password"} open={resetDialog} close={handleClose} sx={{ width: '50%', margin: 'auto' }}>
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

        <Popup title={"Enable Access"} open={disableDialog} close={handleCloseDisable} sx={{ width: '50%', margin: 'auto' }}>
          <Box p={5} component={"form"} height={"20vh"} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>

            <Box p={2} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
              <Typography variant="body1">
                Are you sure you want to{" "}
                {accessStatus === "Enabled" ? "Disable Access" : "Enable Access"}{" "}
                the employee's account?
              </Typography>

              <Box mt={2} gap={4} display="flex" sx={{ width: '100%' }} >
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleConfirmDisable}
                  sx={{ width: '100%' }}
                >
                  Yes
                </Button>
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={handleCloseDisable}
                  sx={{ width: '100%' }}
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
