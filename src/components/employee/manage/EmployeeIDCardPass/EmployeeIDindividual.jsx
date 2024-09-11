import React, { useState, useEffect } from "react";
import RevealCard from "../../../AnimationComponents/RevealCard";
import {
  Box,
  TextField,
  InputAdornment,
  Button,
  Radio,
  Link
} from "@mui/material";
import { Search } from "@mui/icons-material";
import "react-toastify/dist/ReactToastify.css";
import { useMediaQuery } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import Preview from "./Preview";

const EmployeeIDindividual = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [selectedRow, setSelecetedRow] = useState(null);
  const [previewPopup, setPreviewPopup] = useState(false);

  const [filter, setFilter] = useState({
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    if (endDate == "") setEndDate(startDate);

    const _filter = {
      start_date: startDate && new Date(startDate).toLocaleDateString("en-CA"),
      end_date: endDate && new Date(endDate).toLocaleDateString("en-CA"),
    };
    setFilter(_filter);
  }, [startDate, endDate]);


  // handle closing the prompt dialog
  const handleClosePrompt = () => {
    setShowPrompt(false);
  };

  // table columns
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
        <Link underline="hover" color="primary">
          {params.value}
        </Link>
      ),
    },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "emp_type", headerName: "Employee Type", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    { field: "grade", headerName: "Grade", flex: 1 },
    { field: "last_issue_date", headerName: "Last Issue Date", flex: 1 },
  ];

  // table rows
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

      {/* Render context based on selected dropdown value */}

      <Box>
        {/* Search input area and search button */}
        <Box ml={3} mt={3}>
          {/* Search input area */}
          <TextField
            variant="outlined"
            placeholder="Search by Employee ID / Employee Name"
            size="small"
            sx={{ width: 400 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search sx={{ fontSize: "1.3rem", cursor: "pointer" }} />
                </InputAdornment>
              ),
            }}
          />

        </Box>

        {/* Table */}
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
          // checkboxSelection
          />
        </Box>

        {/* Buttons */}
        <Box
          display="flex"
          justifyContent="flex-end"
          marginBottom={5}
          marginRight={2}
          gap={2}
        >
          {/* Issue button */}
          <Button
            color="primary"
            variant="contained"
            onClick={() => { setPreviewPopup(true) }}
          >
            Issue ID Card
          </Button>

          {/* Print button */}
          <Button
            color="primary"
            variant="outlined"
          >
            Print
          </Button>
        </Box>

        {/* Prompt dialog */}
        <Preview open={previewPopup} close={() => setPreviewPopup(false)} />

      </Box>
    </RevealCard >
  );
};

export default EmployeeIDindividual;
