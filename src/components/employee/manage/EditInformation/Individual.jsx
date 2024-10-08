import { useState } from "react";
import RevealCard from "../../../AnimationComponents/RevealCard";
import Bbox from "../../../UiComponents/Bbox";
import { Box, Divider, Typography, Radio, Button, FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import EmployeePopup from '../../EmployeePopup'
import "./styles.css";

const Individual = () => {
  const [employeePopup, setEmployeePopup] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const navigate = useNavigate();

  const columns = [
    {
      field: "radioButtons",
      headerName: "",
      flex: 0.2,
      renderCell: (params) => (
        <Radio
          checked={params.row.id === selectedRow?.id}
          color="primary"
          sx={{
            transform: "scale(0.6)",
          }}
          inputProps={{ "aria-label": params.row.id }}
          onChange={() => {
            setSelectedRow(params.row);
          }}
        />
      ),
    },
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
    { field: "grade", headerName: "Grade", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Box
          style={{
            backgroundColor:
              params.value === "Active"
                ? "#C6F6D5"
                : params.value === "Inactive"
                  ? "#FFCCCC"
                  : "transparent",
            borderRadius: "6px",
            display: "inline-block",
            width:
              params.value === "Active" || params.value === "Inactive"
                ? "60px"
                : "auto",
            paddingLeft:
              params.value === "Active"
                ? "11px"
                : params.value === "Inactive"
                  ? "7px"
                  : "0px",
          }}
        >
          {params.value}
        </Box>
      ),
    },
  ];

  const rows = [
    {
      id: "AG240001",
      name: "Saunav Ray",
      emp_type: "Teaching Staff",
      department: "Science",
      grade: 'B2',
      status: "Active",
    },
    {
      id: "AG240002",
      name: "Saunav Ray",
      emp_type: "Teaching Staff",
      department: "Science",
      grade: 'B2',
      status: "Active",
    },
    {
      id: "AG240003",
      name: "Saunav Ray",
      emp_type: "Teaching Staff",
      department: "Science",
      grade: 'B2',
      status: "Active",
    },
    {
      id: "AG240004",
      name: "Saunav Ray",
      emp_type: "Teaching Staff",
      department: "Science",
      grade: 'B2',
      status: "Active",
    }
  ];

  return (
    <RevealCard>
      <Bbox
        mt={2}
        width={"100%"}
        height={"100%"}
        borderRadius={2}
        overflow="hidden"
      >
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

        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          p={2}
          mt={1}
          height={70}
          width={"100%"}
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

          <Box flex={1} />

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#C4673B",
              "&:hover": {
                backgroundColor: "#A14E2C",
              },
            }}
            onClick={() => navigate("/employee/manage/OnBoardingDetails")}
            disabled={!selectedRow}
          >
            View / Edit
          </Button>

        </Box>

        {/* Table */}
        <Box m={2} mb={5} height={"100%"}>
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

        <EmployeePopup open={employeePopup} close={() => setEmployeePopup(false)} />
      </Bbox>
    </RevealCard >
  );
};

export default Individual;
