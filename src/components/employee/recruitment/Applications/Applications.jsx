import { useNavigate } from "react-router-dom";
import RevealCard from "../../../AnimationComponents/RevealCard";
import Bbox from "../../../UiComponents/Bbox";
import {
  Box,
  Button,
  Divider,
  Typography,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { DataGrid } from "@mui/x-data-grid";
import ApplicationID from "../popup/ApplicationID";
import ManageApplications from "./ManageApplications";
import { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import useClasses from '@/hooks/useClasses'
import useEmployees from '@/hooks/useEmployees'
import ReignsSelect from "../../../UiComponents/ReignsSelect";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

const StudentAccount = () => {
  const navigate = useNavigate();

  const columns = [
    {
      field: "id", headerName: "Application ID", flex: 0.8, renderCell: (params) => (
        <Typography sx={{ cursor: "pointer", color: "primary.main" }} onClick={() => setApplicationIDPopup(true)}>
          {params.value}
        </Typography>
      ),
    },
    { field: "candidate_name", headerName: "Candidate Name", flex: 1 },
    {
      field: "job_id", headerName: "Job ID", flex: 0.8,
      renderCell: (params) => (
        <Typography sx={{ cursor: "pointer", color: "primary.main" }} onClick={() => setApplicationIDPopup(true)}>
          {params.value}
        </Typography>
      ),
    },
    { field: "emp_type", headerName: "Employee Type", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    { field: "grade", headerName: "Grade", flex: 0.6 },
    { field: "application_date", headerName: "Application Date", flex: 1 },
    {
      field: "resume", headerName: "Attachment", flex: 0.6,
      renderCell: (params) => (
        <Box>
          <DescriptionOutlinedIcon />
        </Box>
      ),
    },
  ];

  const rows = [
    {
      id: "EMP35435443",
      candidate_name: "John Doe",
      job_id: "JOB101",
      emp_type: "Full-Time",
      department: "Engineering",
      grade: "A",
      application_date: "30 Mar 2023",
      resume: "pdf"
    },
    {
      id: "EMP35435444",
      candidate_name: "Jane Smith",
      job_id: "JOB102",
      emp_type: "Part-Time",
      department: "Marketing",
      grade: "B",
      application_date: "30 Mar 2023",
      resume: "pdf"
    },
    {
      id: "EMP35435445",
      candidate_name: "Alice Johnson",
      job_id: "JOB103",
      emp_type: "Contract",
      department: "HR",
      grade: "C",
      application_date: "30 Mar 2023",
      resume: "pdf"
    }
  ];
  const { acYear, curYear } = useClasses();
  const [academicYear, setAcademicYear] = useState(curYear);

  const { employeeManagementDepartment, employeeTeachingDepartment, employeeSupportStaffDepartment } = useEmployees();

  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedJobID, setSelectedJobID] = useState('');
  const [candidateName, setCandidateName] = useState('');
  const [employeeDepartment, setEmployeeDepartment] = useState([...employeeManagementDepartment, ...employeeTeachingDepartment, ...employeeSupportStaffDepartment]);

  const [applicationIDPopup, setApplicationIDPopup] = useState(false);

  return (
    <>
      <div
        style={{
          backgroundColor: "#E5F3FB",
          display: "flex",
          padding: "10px",
          maxWidth: "670px",
          borderRadius: "10px",
        }}
      >
        <div>
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "black",
              marginRight: "10px",
              cursor: "pointer",
              borderRadius: "6px",
              padding: "7px 10px 7px 10px",
              fontSize: "16px",
              fontWeight: 400,
            }}
            onClick={() => navigate("/employee/recruitment/")}
          >
            Open Position(s)
          </button>

          <button
            style={{
              backgroundColor: "white",
              border: "none",
              color: "black",
              marginRight: "10px",
              cursor: "pointer",
              borderRadius: "6px",
              padding: "7px 10px 7px 10px",
              fontSize: "16px",
              fontWeight: 400,
            }}
            onClick={() => navigate("/employee/recruitment/applications/")}
          >
            Applications
          </button>

          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "black",
              marginRight: "10px",
              cursor: "pointer",
              borderRadius: "6px",
              padding: "7px 10px 7px 10px",
              fontSize: "16px",
              fontWeight: 400,
            }}
            onClick={() => navigate("/employee/recruitment/screening/")}
          >
            Screening
          </button>

          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "black",
              cursor: "pointer",
              borderRadius: "6px",
              padding: "7px 10px 7px 10px",
              fontSize: "16px",
              fontWeight: 400,
            }}
            onClick={() => navigate("/employee/recruitment/selection/")}
          >
            Selection
          </button>

          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "black",
              cursor: "pointer",
              borderRadius: "6px",
              padding: "7px 10px 7px 10px",
              fontSize: "16px",
              fontWeight: 400,
            }}
            onClick={() => navigate("/employee/recruitment/offer/")}
          >
            Offer
          </button>

          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "black",
              marginRight: "10px",
              cursor: "pointer",
              borderRadius: "6px",
              padding: "7px 10px 7px 10px",
              fontSize: "16px",
              fontWeight: 400,
            }}
            onClick={() => navigate("/employee/recruitment/onboarding/")}
          >
            Onboarding
          </button>
        </div>
      </div>

      <RevealCard>
        <Bbox
          mt={3}
          width="100%"
          height="100%"
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
              View Applications
            </Typography>
          </Box>

          <Divider />

          <Box>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              p={2}
              mt={4}
              gap={4}
            >

              <FormControl sx={{ width: "30%" }}>
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
                multiple
                label="Job ID"
                items={[]}
                defaultValues={[]}
                onChange={setSelectedJobID}
                value={selectedJobID}
                sx={{
                  width: '30%'
                }}
              />

              <ReignsSelect
                multiple
                label="Department"
                items={employeeDepartment}
                defaultValues={employeeDepartment}
                onChange={setSelectedDepartment}
                value={selectedDepartment}
                sx={{
                  width: '30%'
                }}
              />

              <Button variant="contained">Submit</Button>
            </Box>

            <Box p={2} mt={1} display="flex" justifyContent="space-between" alignItems={'flex-end'}>

              <FormControl sx={{ width: "30%" }}>
                <InputLabel>Search by Candidate Name or Application ID</InputLabel>
                <Select
                  label="Search by Candidate Name or Application ID"
                  onChange={(e) =>
                    setCandidateName(e.target.value)
                  }
                  value={candidateName}
                >
                  {[].map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box
                style={{
                  backgroundColor: "#E1EEFB",
                  border: "1px solid #3381A5",
                  borderRadius: "16px",
                  width: 102,
                  height: 22,
                  padding: "3.5px 12px",
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

            <Box m={2} height={"100%"}>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                columnGroupingModel={[
                  {
                    groupId: 'applied_for',
                    headerName: 'Applied For',
                    headerAlign: 'center',
                    children: [
                      { field: 'job_id' },
                      { field: 'emp_type' },
                      { field: 'department' },
                      { field: 'grade' },
                    ],
                  },
                ]}
                experimentalFeatures={{
                  columnGrouping: true
                }}
              />
            </Box>
            <ApplicationID open={applicationIDPopup} close={() => setApplicationIDPopup(false)} />

          </Box>
        </Bbox>
      </RevealCard>

      <ManageApplications />
    </>
  );
};

export default <StudentAccount />;
