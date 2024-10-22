import RevealCard from "@/components/AnimationComponents/RevealCard";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
} from "@mui/material";
import Banner from "@/components/Banner";
import { useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import LaborWelfareFundEdit from "./LaborWelfareFundEdit";
import LaborWelfareFundDisable from "./LaborWelfareDisable";
import { DataGrid } from "@mui/x-data-grid";

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
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
};

const LaborWelfareFund = () => {
  const [editPopup, setEditPopup] = useState(false);
  const [disablePopup, setDisablePopup] = useState(false);
  const [enabled, setEnabled] = useState(true);

  const columns = [
    {
      field: "state",
      headerName: "State",
      flex: 1,
    },
    {
      field: "deduction_cycle",
      headerName: "Deduction Cycle",
      flex: 1,
    },
    {
      field: "employee_contribution",
      headerName: "Employee  Contribution",
      flex: 1,
      renderCell: (params) => `₹ ${params.value}`,
    },
    {
      field: "employer_contribution",
      headerName: "Employer  Contribution",
      flex: 1,
      renderCell: (params) => `₹ ${params.value}`,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => (
        <ActionCell
          params={params}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ),
    },
  ];

  const [rows, setRows] = useState([
    {
      id: 1,
      state: "West Bengal",
      deduction_cycle: "Monthly",
      employee_contribution: 10,
      employer_contribution: 10,
    },
    {
      id: 2,
      state: "West Bengal",
      deduction_cycle: "Monthly",
      employee_contribution: 20,
      employer_contribution: 20,
    },
  ]);

  const handleEdit = (id) => {
    console.log(`Edit row with id: ${id}`);
    setEditPopup(true);
  };

  const handleDelete = (id) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  return (
    <RevealCard>
      <Box p={2} display={"flex"} flexDirection={"column"} gap={3}>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box display={"flex"} alignItems={"center"}>
            <Banner text={"Labor Welfare Fund"} style={{ marginTop: "0px" }} />
            <Tooltip title="Labor Welfare Fund act ensures social security and improved working conditions  for employees whose monthly salary is up to INR 15000.">
              <IconButton>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Box display={"flex"} gap={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={!enabled}
            >
              Add
            </Button>
            {enabled ? (
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => setDisablePopup(true)}
              >
                Disable
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => {
                  setEnabled(true);
                }}
              >
                Enable
              </Button>
            )}
          </Box>
        </Box>

        <Box mt={2} mb={4} style={{ height: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </Box>

        <LaborWelfareFundEdit
          open={editPopup}
          close={() => setEditPopup(false)}
        />
        <LaborWelfareFundDisable
          open={disablePopup}
          close={() => setDisablePopup(false)}
          setEnabled={setEnabled}
        />
      </Box>
    </RevealCard>
  );
};

export default LaborWelfareFund;
