import { useState, useEffect } from "react";
import RevealCard from "../../../AnimationComponents/RevealCard";
import {
  Box,
  Typography,
  Button,
} from "@mui/material";
import useEmployees from "../../../../hooks/useEmployees";
import "react-toastify/dist/ReactToastify.css";
import { DataGrid } from "@mui/x-data-grid";
import Preview from "./Preview";
import ReignsSelect from "@/components/UiComponents/ReignsSelect";
import EmployeePopup from '../../EmployeePopup'

const IDbulk = () => {
  const [previewPopup, setPreviewPopup] = useState(null);

  const { employeeType, employeeManagementDepartment, employeeTeachingDepartment, employeeSupportStaffDepartment, employeeGrade } = useEmployees();

  const [selectedEmployeeType, setSelectedEmployeeType] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [employeeDepartment, setEmployeeDepartment] = useState([...employeeManagementDepartment, ...employeeTeachingDepartment, ...employeeSupportStaffDepartment]);

  const [employeePopup, setEmployeePopup] = useState(false);

  useEffect(() => {
    console.log(selectedEmployeeType);
    let departments = [];

    if (selectedEmployeeType === '') {
      return;
    }

    selectedEmployeeType.forEach(type => {
      switch (type) {
        case 'Management':
          departments = [...departments, ...employeeManagementDepartment];
          break;
        case 'Teaching Staff':
          departments = [...departments, ...employeeTeachingDepartment];
          break;
        case 'Support Staff':
          departments = [...departments, ...employeeSupportStaffDepartment];
          break;
        default:
          break;
      }
    });

    setEmployeeDepartment(departments);
  }, [selectedEmployeeType]);

  const columns = [
    {
      field: "id", headerName: "Employee ID", flex: 0.7,
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
    // { field: "grade", headerName: "Grade", flex: 1 },
    { field: "last_issue_date", headerName: "Last Issue Date", flex: 1 },
  ];

  // table rows
  const rows = [
    {
      id: "AG240001",
      name: "Saunav Ray",
      emp_type: "Teaching Staff",
      department: "Science",
      // grade: "B2",
      last_issue_date: "20-Sep-2023",
    },
    {
      id: "AG240002",
      name: "Saunav Ray",
      emp_type: "Teaching Staff",
      department: "Science",
      // grade: "B2",
      last_issue_date: "20-Sep-2023",
    },
    {
      id: "AG240003",
      name: "Saunav Ray",
      emp_type: "Teaching Staff",
      department: "Science",
      // grade: "B2",
      last_issue_date: "20-Sep-2023",
    },
  ];

  return (
    <RevealCard>

      <Box
        borderRadius={1}
        paddingLeft={3}
        paddingRight={2}
        flex={0}
        py={4}
        display="flex"
        flexDirection="row"
        // justifyContent={"space-between"}
        gap={2}
        bgcolor="white"
      ><ReignsSelect
          items={employeeType}
          multiple
          label="Employee Type"
          defaultValues={employeeType}
          onChange={setSelectedEmployeeType}
          value={selectedEmployeeType}
          sx={{
            width: '30%'
          }}
        />
        <ReignsSelect
          items={employeeDepartment}
          multiple
          defaultValues={employeeDepartment}
          onChange={setSelectedDepartment}
          value={selectedDepartment}
          label="Department"
          sx={{
            width: '30%'
          }}
        />
        {/* <ReignsSelect
          items={employeeGrade}
          multiple
          label="Grade"
          defaultValues={employeeGrade}
          onChange={setSelectedGrade}
          value={selectedGrade}
          sx={{
            width: '30%'
          }}
        /> */}
      </Box>

      <Box style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" style={{ width: "700px" }}>
          Submit
        </Button>
      </Box>

      {/* Total number of results found */}
      <Box style={{ display: "flex", justifyContent: "flex-end" }}>
        <Box
          mt={5}
          mr={3}
          style={{
            backgroundColor: "#E1EEFB",
            border: "1px solid #3381A5",
            borderRadius: "16px",
            width: 107,
            height: 25,
            padding: "3.7px 14px",
          }}
        >
          <Typography
            style={{
              fontSize: "10px",
              fontWeight: "400",
              color: "#3381A5",
            }}
          >
            {rows.length} Results found
          </Typography>
        </Box>
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
          checkboxSelection
        />
      </Box>

      {/* Buttons */}
      <Box
        display="flex"
        justifyContent="flex-end"
        marginRight={3}
        marginBottom={5}
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
          variant="outlined"
          color="primary"
        >
          Print
        </Button>
      </Box>

      <EmployeePopup open={employeePopup} close={() => setEmployeePopup(false)} />
      <Preview open={previewPopup} close={() => setPreviewPopup(false)} />
    </RevealCard>
  );
};

export default IDbulk;
