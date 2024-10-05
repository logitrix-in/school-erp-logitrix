import { useState } from "react";
import RevealCard from "@/components/AnimationComponents/RevealCard";
import { Box, TextField, Button, Typography, InputLabel, FormControl, Select, MenuItem } from "@mui/material";
import ReignsSelect from "@/components/UiComponents/ReignsSelect";
import { DatePicker } from "@mui/x-date-pickers";
import { DataGrid } from "@mui/x-data-grid";
import useClasses from "../../../hooks/useClasses";
import useEmployees from "../../../hooks/useEmployees";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const ActionRecords = () => {
  const { acYear, curYear, nonCompliance } = useClasses();
  const { employeeManagementDepartment, employeeTeachingDepartment, employeeSupportStaffDepartment, employeeType } = useEmployees();

  const [academicYear, setAcademicYear] = useState(curYear);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedEmployeeType, setSelectedEmployeeType] = useState('');
  const [penaltyDueAmount, setPenaltyDueAmount] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedCompliance, setSelectedCompliance] = useState('');
  const [employeeDepartment, setEmployeeDepartment] = useState([...employeeManagementDepartment, ...employeeTeachingDepartment, ...employeeSupportStaffDepartment]);

  const columns = [
    {
      field: "id",
      headerName: "Employee ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "employeeType",
      headerName: "Employee Type",
      flex: 1,
    },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
    },
    {
      field: "grade",
      headerName: "Grade",
      flex: 0.5,
    },
    {
      field: "status",
      headerName: "Status", flex: 0.7,
      renderCell: (params) => (
        <Box
          style={{
            backgroundColor:
              params.value === "Active"
                ? "#C6F6D5"
                : params.value === "Suspended"
                  ? "#FFCCCC"
                  : "transparent",
            borderRadius: "6px",
            display: "inline-block",
            width:
              params.value === "Active" || params.value === "Suspended"
                ? "auto"
                : "auto",
            paddingLeft:
              params.value === "Active"
                ? "7px"
                : params.value === "Suspended"
                  ? "7px"
                  : "0px",
            paddingRight:
              params.value === "Active"
                ? "7px"
                : params.value === "Suspended"
                  ? "7px"
                  : "0px",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "lastSuspensionPeriod",
      headerName: "Last Suspension Period",
      flex: 1.4,
    },
    {
      field: "dueAmount",
      headerName: "Penalty Due amount",
      flex: 0.8,
    },
    {
      field: "incidentid",
      headerName: "Open Incident(s)",
      flex: 1.5,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: "8px" }}>
          {params.row.incidentid.map((incident, index) => (
            <Typography
              key={index}
              sx={{
                backgroundColor: "#e8def8",
                borderRadius: "6px",
                fontSize: "0.7rem",
                fontWeight: "600",
                display: "inline-block",
                width: "auto",
                paddingX: "7px",
                paddingY: "4px",
              }}
            >
              {incident}
            </Typography>
          ))}
        </Box>
      ),
    },
  ];

  const rows = [
    {
      id: "AG240001",
      name: "Saurav Ray",
      employeeType: "Teaching Staff",
      department: "Physics",
      grade: "C1",
      status: "Active",
      lastSuspensionPeriod: "N/A",
      dueAmount: "₹50",
      incidentid: ["#112334"],
    },
    {
      id: "AG240001",
      name: "Saurav Ray",
      employeeType: "Teaching Staff",
      department: "Physics",
      grade: "C1",
      status: "Inactive",
      lastSuspensionPeriod: "N/A",
      dueAmount: "₹50",
      incidentid: ["#112334", "#456636"],
    },
    {
      id: "AG240001",
      name: "Saurav Ray",
      employeeType: "Teaching Staff",
      department: "Physics",
      grade: "C1",
      status: "Active",
      lastSuspensionPeriod: "N/A",
      dueAmount: "₹50",
      incidentid: ["#112334", "#456636"],
    }
  ];

  function handleAmountChange(e) {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '');

    if (numericValue === '') {
      setPenaltyDueAmount('');
    } else {
      setPenaltyDueAmount(`Greater than ₹ ${parseInt(numericValue).toLocaleString('en-IN')}`);
    }
  }

  return (
    <RevealCard>
      <Box sx={{ padding: "50px", display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: "500px",
            }}
          >

            <FormControl>
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

            <ReignsSelect
              items={employeeType}
              multiple
              label="Employee Type"
              defaultValues={employeeType}
              onChange={setSelectedEmployeeType}
              value={selectedEmployeeType}
            />

            <ReignsSelect
              multiple
              label="Department"
              items={employeeDepartment}
              defaultValues={employeeDepartment}
              onChange={setSelectedDepartment}
              value={selectedDepartment}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: "500px",
            }}
          >

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box display="flex" gap={2}>
                <DatePicker
                  label="Start Date"
                  onChange={(newValue) => setStartDate(newValue)}
                  value={startDate}
                  format="DD MMM YYYY"
                  slotProps={{ textField: { fullWidth: true } }}
                />
                <DatePicker
                  label="End Date"
                  minDate={startDate}
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  format="DD MMM YYYY"
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Box>
            </LocalizationProvider>

            <TextField
              id="comments"
              label="Penalty Due Amount >="
              type="text"
              placeholder="Enter Penalty Due Amount >="
              value={penaltyDueAmount}
              onChange={handleAmountChange}
              variant="outlined"
              fullWidth
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*'
              }}
            />

            <ReignsSelect
              multiple
              label="Non Compliance"
              items={nonCompliance}
              defaultValues={nonCompliance}
              onChange={setSelectedCompliance}
              value={selectedCompliance}
            />
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" marginTop="50px">
          <Button variant="contained" style={{ width: "734px" }}>
            Submit
          </Button>
        </Box>

        <Box style={{ display: "flex", justifyContent: "flex-end" }}>
          <Box
            mt={8}
            mr={3}
            style={{
              backgroundColor: "#E1EEFB",
              border: "1px solid #3381A5",
              borderRadius: "16px",
              width: 120,
              height: 28,
              marginBottom: 12,
              padding: "4px 14px",
            }}
          >
            <Typography
              style={{
                fontSize: "12px",
                fontWeight: "400",
                color: "#3381A5",
              }}
            >
              {rows.length} Results found
            </Typography>
          </Box>
        </Box>

        <Box style={{ height: "100%" }}>
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

        <Box display="flex" justifyContent="flex-end" mr={3} mt={3}>
          <Button variant="outlined">Download Student List</Button>
        </Box>
      </Box>
    </RevealCard>
  );
};

export default ActionRecords;
