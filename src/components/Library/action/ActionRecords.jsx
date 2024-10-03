import { useState } from "react";
import RevealCard from "@/components/AnimationComponents/RevealCard";
import { Box, TextField, Button, Typography, Link, Switch, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import ReignsSelect from "@/components/UiComponents/ReignsSelect";
import useClasses from "../../../hooks/useClasses";
import { DatePicker } from "@mui/x-date-pickers";
import { DataGrid } from "@mui/x-data-grid";
import PageLoader from "../../PageLoader";
import { toast } from "react-toastify";
import api from "../../../config/api";
import dayjs from 'dayjs'

const ActionRecords = () => {
  const { classes, acYear, curYear, sections, nonCompliance, employeeType } = useClasses();
  const [selectedAcademicYear, setSelectedAcademicYear] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedClasses, setSelectedClasses] = useState('');
  const [selectedSections, setSelectedSections] = useState('');
  const [amount, setAmount] = useState('')
  const [selectedNonCompliance, setSelectedNonCompliance] = useState('');
  const [checked, setChecked] = useState(true);
  const [userType, setUserType] = useState("student");
  const [selectedType, setSelectedType] = useState('');
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSwitchChange = (event) => {
    setChecked(event.target.checked);
    setUserType(event.target.checked ? "student" : "employee");
    setRows([]);
  };

  function handleAmountChange(e) {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '');

    if (numericValue === '') {
      setAmount('');
    } else {
      setAmount(`Greater than ₹ ${parseInt(numericValue).toLocaleString('en-IN')}`);
    }
  }

  const studentColumns = [
    { field: "space", headerName: "", flex: 0.2 },
    {
      field: "id",
      headerName: "Student ID",
      renderCell: (params) => (
        <Link underline="hover" color="primary">
          {params.value}
        </Link>
      ),
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1.4,
    },
    {
      field: "class",
      headerName: "Class",
      flex: 0.6,
    },
    {
      field: "section",
      headerName: "Section",
      flex: 0.6,
    },
    {
      field: "roll",
      headerName: "Roll #",
      flex: 0.6,
    },
    {
      field: "status",
      headerName: "Status",
      renderCell: (params) => (
        <Box
          style={{
            backgroundColor:
              params.value === "Active"
                ? "#C6F6D5"
                : params.value === "Inactive"
                  ? "#FFCCCC"
                  : "transparent",
            flex: 1,
            borderRadius: "4px",
            width: "auto",
            paddingRight: "2px",
            paddingLeft: "2px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
          >
            {params.value}
          </Typography>
        </Box >
      ),
    },
    {
      field: "period",
      headerName: "Last Suspension Period",
      flex: 1.7,
    },
    {
      field: "amount",
      headerName: "Penalty Due Amount",
      flex: 1.5,
    },
    {
      field: "incidents",
      headerName: "Open Incidents",
      flex: 2,
      renderCell: (params) => (
        <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
          {params.row.incidents.map((incident, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{
                backgroundColor: "#e8def8",
                width: "auto",
                paddingLeft: "7px",
                paddingRight: "7px",
                color: "#000000",
                borderRadius: "4px",
              }}
            >
              {incident}
            </Typography>
          ))}
        </Box>
      ),
    },
  ];

  const employeeColumns = [
    { field: "space", headerName: "", flex: 0.2 },
    {
      field: "employeeId",
      headerName: "Employee ID",
      renderCell: (params) => (
        <Link underline="hover" color="primary">
          {params.value}
        </Link>
      ),
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1.4,
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      renderCell: (params) => (
        <Box
          style={{
            backgroundColor:
              params.value === "Active"
                ? "#C6F6D5"
                : params.value === "Inactive"
                  ? "#FFCCCC"
                  : "transparent",
            flex: 1,
            borderRadius: "4px",
            width: "auto",
            paddingRight: "2px",
            paddingLeft: "2px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
          >
            {params.value}
          </Typography>
        </Box >
      ),
    },
    {
      field: "period",
      headerName: "Last Suspension Period",
      flex: 1.7,
    },
    {
      field: "amount",
      headerName: "Penalty Due Amount",
      flex: 1.5,
    },
    {
      field: "incidents",
      headerName: "Open Incidents",
      flex: 2,
      renderCell: (params) => (
        <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
          {params.row.incidents.map((incident, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{
                backgroundColor: "#e8def8",
                width: "auto",
                paddingLeft: "7px",
                paddingRight: "7px",
                color: "#000000",
                borderRadius: "4px",
              }}
            >
              {incident}
            </Typography>
          ))}
        </Box>
      ),
    },
  ];

  async function submitStudent() {
    try {
      setLoading(true);

      const response = await api.post('/library/action/incident-record/', {
        "academic_year": selectedAcademicYear,
        "penalty_due": amount,
        "suspension_start_date": startDate,
        "suspension_end_date": endDate,
        // "class_name": selectedClasses,
        // "section": selectedSections,
        // "non_compliance_category": selectedNonCompliance
      })

      const newRows = response.data.map(item => {
        return {
          id: item.id,
          employeeId: item.employee?.employee_id || "N/A",
          name: `${item.employee?.employee_personal_details?.first_name || ""} ${item.employee?.employee_personal_details?.last_name || ""}`.trim() || "N/A",
          class: "N/A", // Not applicable for employees
          section: "N/A", // Not applicable for employees
          roll: "N/A", // Not applicable for employees
          status: item.current_status || "N/A",
          period: item.last_suspension_start_date && item.last_suspension_end_date
            ? `${item.last_suspension_start_date} - ${item.last_suspension_end_date}`
            : "N/A",
          amount: item.penalty_due || 0,
          incidents: item.open_incidents || []
        };
      })

      if (response.status === 200) {
        setRows([newRows])
      }

    } catch (error) {
      console.error(error);
      toast.error("Error fetching data");
    } finally {
      setLoading(false);
    }
  }

  const formatDateForAPI = (date) => {
    if (!date) return null;
    return dayjs(date).format('YYYY-MM-DD');
  };

  async function submitEmployee() {
    try {
      setLoading(true);
      console.log(amount)
      console.log(selectedAcademicYear)

      const response = await api.post('/library/action/incident-record/', {
        "academic_year": selectedAcademicYear,
        "penalty_due": amount,
        // "suspension_start_date": formatDateForAPI(startDate),
        // "suspension_end_date": formatDateForAPI(endDate),
        // "non_compliance_category": selectedNonCompliance
      })

      console.log(response.data)

      const newRows = response.data.map(item => {
        return {
          id: item.id,
          employeeId: item.employee?.employee_id || "N/A",
          name: `${item.employee?.employee_personal_details?.first_name || ""} ${item.employee?.employee_personal_details?.last_name || ""}`.trim() || "N/A",
          type: item.employee?.employee_type || "N/A", // Added employee type
          status: item.current_status || "N/A",
          period: item.last_suspension_start_date && item.last_suspension_end_date
            ? `${item.last_suspension_start_date} - ${item.last_suspension_end_date}`
            : "N/A",
          amount: item.penalty_due || 0,
          incidents: item.open_incidents || []
        };
      })

      setRows(newRows)
    } catch (error) {
      console.error(error);
      toast.error("Error fetching data");
    } finally {
      setLoading(false);
    }
  }


  if (loading) {
    return <PageLoader />;
  }

  return (
    <RevealCard>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "20px",
          width: "100%",
          paddingX: "24px",
          paddingTop: "24px",
        }}
      >
        <Typography component="div">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1">Employee</Typography>
            <Switch
              checked={checked}
              onChange={handleSwitchChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <Typography variant="body1">Student</Typography>
          </Box>
        </Typography>
      </Box>

      {
        userType === "student" ? (
          <Box sx={{ paddingY: "30px", paddingX: "24px", display: "flex", flexDirection: "column" }}>
            <Box display="flex" justifyContent="flex-end" mb={4}>
              <Button variant="outlined" sx={{ height: "40px", width: "120px" }}>
                Clear All
              </Button>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', gap: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  width: "50%"
                }}
              >

                <FormControl style={{ width: "100%" }}>
                  <InputLabel>Academic Year</InputLabel>
                  <Select
                    label="Academic Year"
                    value={selectedAcademicYear}
                    onChange={(e) => setSelectedAcademicYear(e.target.value)}
                    defaultValue={acYear}
                  >
                    <MenuItem value={"2021-22"}>2021-22</MenuItem>
                    <MenuItem value={"2023-24"}>2023-24</MenuItem>
                    <MenuItem value={"2024-25"}>2024-25</MenuItem>
                    <MenuItem value={"2025-26"}>2025-26</MenuItem>
                  </Select>
                </FormControl>

                <ReignsSelect
                  items={classes}
                  onChange={setSelectedClasses}
                  label="Class"
                  value={selectedClasses}
                  defaultValues={classes}
                  multiple
                />

                <ReignsSelect
                  items={sections}
                  onChange={setSelectedSections}
                  label="Section"
                  value={selectedSections}
                  defaultValues={sections}
                  multiple
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  width: "50%"
                }}
              >
                <Box display={"flex"} justifyContent={'space-between'}>
                  <DatePicker
                    format="DD MMM YYYY"
                    label="Suspension Start Date"
                    onChange={(e) => setStartDate(e)}
                    value={startDate}
                  />
                  <DatePicker
                    format="DD MMM YYYY"
                    label="Suspension End Date"
                    minDate={startDate}
                    value={endDate}
                    onChange={(e) => setEndDate(e)}
                  />
                </Box>

                <TextField
                  id="comments"
                  label="Penalty Due Amount >="
                  type="text"
                  placeholder="Enter Penalty Due Amount >="
                  value={amount}
                  onChange={handleAmountChange}
                  variant="outlined"
                  fullWidth
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*'
                  }}
                />

                <ReignsSelect
                  items={nonCompliance}
                  onChange={setSelectedNonCompliance}
                  label="Non Compliance Type"
                  value={selectedNonCompliance}
                  defaultValues={nonCompliance}
                  multiple
                />
              </Box>
            </Box>
            <Box display="flex" justifyContent="center" marginTop="50px">
              <Button variant="contained" style={{ width: "734px" }} onClick={() => submitStudent()}>
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
                columns={studentColumns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
              />
            </Box>

            <Box display="flex" justifyContent="flex-end" mr={3} mt={3}>
              <Button variant="outlined">Download Report</Button>
            </Box>
          </Box>
        ) : (
          <Box sx={{ paddingY: "30px", paddingX: "24px", display: "flex", flexDirection: "column" }}>
            <Box display="flex" justifyContent="flex-end" mb={4}>
              <Button variant="outlined" sx={{ height: "40px", width: "120px" }}>
                Clear All
              </Button>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', gap: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  width: "50%"
                }}
              >

                <ReignsSelect
                  items={acYear}
                  onChange={setSelectedAcademicYear}
                  label="Academic Year"
                  value={selectedAcademicYear}
                  defaultValues={[curYear]}
                  // defaultVal={curYear}
                  multiple
                />

                <ReignsSelect
                  items={employeeType}
                  onChange={setSelectedType}
                  label="Type"
                  value={selectedType}
                  defaultValues={employeeType}
                  multiple
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  width: "50%"
                }}
              >
                <Box display={"flex"} justifyContent={'space-between'}>
                  <DatePicker
                    format="DD MMM YYYY"
                    label="Suspension Start Date"
                    onChange={(e) => setStartDate(e)}
                    value={startDate}
                  />
                  <DatePicker
                    format="DD MMM YYYY"
                    label="Suspension End Date"
                    minDate={startDate}
                    value={endDate}
                    onChange={(e) => setEndDate(e)}
                  />
                </Box>

                <TextField
                  id="comments"
                  label="Penalty Due Amount >="
                  type="text"
                  placeholder="Enter Penalty Due Amount >="
                  value={amount}
                  onChange={handleAmountChange}
                  variant="outlined"
                  fullWidth
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*'
                  }}
                />

                <ReignsSelect
                  items={nonCompliance}
                  onChange={setSelectedNonCompliance}
                  label="Non Compliance Type"
                  value={selectedNonCompliance}
                  defaultValues={nonCompliance}
                  multiple
                />
              </Box>
            </Box>
            <Box display="flex" justifyContent="center" marginTop="50px">
              <Button variant="contained" style={{ width: "734px" }} onClick={() => submitEmployee()}>
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
                columns={employeeColumns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
              />
            </Box>

            <Box display="flex" justifyContent="flex-end" mr={3} mt={3}>
              <Button variant="outlined">Download Report</Button>
            </Box>
          </Box>
        )
      }
    </RevealCard>
  );
};

export default ActionRecords;
