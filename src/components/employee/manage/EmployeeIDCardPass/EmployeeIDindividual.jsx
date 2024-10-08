import { useState } from "react";
import {
  Box,
  Button,
  Radio,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import RevealCard from "../../../AnimationComponents/RevealCard";
import "react-toastify/dist/ReactToastify.css";
import { DataGrid } from "@mui/x-data-grid";
import Preview from "./Preview";
import EmployeePopup from '../../EmployeePopup'

const EmployeeIDindividual = () => {
  const [selectedRow, setSelecetedRow] = useState(null);
  const [previewPopup, setPreviewPopup] = useState(false);

  const [employeePopup, setEmployeePopup] = useState(false);

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
            setSelecetedRow(params.row.id);
          }}
        />
      ),
    },
    {
      field: "id", headerName: "Employee ID", flex: 1,
      renderCell: (params) => (
        <Typography
          component="span"
          sx={{ color: "primary.main", cursor: "pointer" }}
          onClick={() => setEmployeePopup(true)}
        >
          {params.value}
        </Typography>
      ),
    },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "emp_type", headerName: "Employee Type", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    { field: "grade", headerName: "Grade", flex: 1 },
    { field: "last_issue_date", headerName: "Last Issue Date", flex: 1 },
  ];

  const rows = [
    {
      id: "AG240001",
      name: "Saunav Ray",
      emp_type: "Teaching Staff",
      department: "Science",
      grade: "B2",
      last_issue_date: "20-Sep-2023",
    },
    {
      id: "AG240002",
      name: "Saunav Ray",
      emp_type: "Teaching Staff",
      department: "Science",
      grade: "B2",
      last_issue_date: "20-Sep-2023",
    },
    {
      id: "AG240003",
      name: "Saunav Ray",
      emp_type: "Teaching Staff",
      department: "Science",
      grade: "B2",
      last_issue_date: "20-Sep-2023",
    },
  ];

  return (
    <RevealCard>

      <Box>
        <Box display={"flex"} gap={1} sx={{ width: '35%', marginY: '16px' }} mx={2} >
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

        <Box m={2} mt={4} height="100%">
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 20, 50]}
          />
        </Box>

        <Box
          display="flex"
          justifyContent="flex-end"
          marginBottom={5}
          marginRight={2}
          gap={2}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={() => { setPreviewPopup(true) }}
          >
            Issue ID Card
          </Button>

          <Button
            color="primary"
            variant="outlined"
          >
            Print
          </Button>
        </Box>

        <Preview open={previewPopup} close={() => setPreviewPopup(false)} />
        <EmployeePopup open={employeePopup} close={() => setEmployeePopup(false)} />

      </Box>
    </RevealCard >
  );
};

export default EmployeeIDindividual;
