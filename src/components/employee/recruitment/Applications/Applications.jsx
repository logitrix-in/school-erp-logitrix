import { useNavigate } from "react-router-dom";
import RevealCard from "../../../AnimationComponents/RevealCard";
import Bbox from "../../../UiComponents/Bbox";
import {
  Box,
  Button,
  Divider,
  Typography,
  Autocomplete,
  TextField,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { DataGrid } from "@mui/x-data-grid";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import NewJobRequirement from "../popup/NewJobRequirement";
import { useState } from "react";

const StudentAccount = () => {
  const navigate = useNavigate();

  const columns = [
    { field: "id", headerName: "Application ID", flex: 0.8 },
    { field: "candidate_name", headerName: "Candidate Name", flex: 0.8 },
    { field: "job_id", headerName: "Job ID", flex: 0.8 },
    { field: "emp_type", headerName: "Employee Type", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    { field: "grade", headerName: "Grade", flex: 1 },
    { field: "application_date", headerName: "Application Date", flex: 1 },
    { field: "resume", headerName: "Resume", flex: 1 },
  ];

  const rows = [
    {
      id: 1,
      candidate_name: "John Doe",
      job_id: 101,
      emp_type: "Full-Time",
      department: "Engineering",
      grade: "A",
      application_date: "2023-10-01",
      resume: "john_doe_resume.pdf"
    },
    {
      id: 2,
      candidate_name: "Jane Smith",
      job_id: 102,
      emp_type: "Part-Time",
      department: "Marketing",
      grade: "B",
      application_date: "2023-10-02",
      resume: "jane_smith_resume.pdf"
    },
    {
      id: 3,
      candidate_name: "Alice Johnson",
      job_id: 103,
      emp_type: "Contract",
      department: "HR",
      grade: "C",
      application_date: "2023-10-03",
      resume: "alice_johnson_resume.pdf"
    }
  ];

  const [newJobPopup, setNewJobPopup] = useState(false);


  return (
    <>
      {/* top navigation buttons */}
      <div
        style={{
          backgroundColor: "#E5F3FB",
          display: "flex",
          padding: "10px",
          maxWidth: "730px",
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
          {/* top bulk text */}
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
              Bulk
            </Typography>
          </Box>

          {/* divider */}
          <Divider />

          <Box>
            {/* dropdowns and search button section */}
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              p={2}
              mt={4}
              height={50}
              gap={4}
            >

              <Autocomplete
                options={["Student 1", "Student 2"]}
                filterSelectedOptions
                freeSolo={false}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Academic Year"
                    label="Academic Year"
                  />
                )}
                sx={{ width: "20%" }}
              />

              <Autocomplete
                options={["Student 1", "Student 2"]}
                filterSelectedOptions
                freeSolo={false}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Job ID"
                    label="Job ID"
                  />
                )}
                sx={{ width: "20%" }}
              />

              <Autocomplete
                options={["Student 1", "Student 2"]}
                filterSelectedOptions
                freeSolo={false}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Department"
                    label="Department"
                  />
                )}
                sx={{ width: "20%" }}
              />
              <Button variant="contained">Submit</Button>
            </Box>



            {/* total number of results found */}
            <Box p={2} mt={1} display="flex" justifyContent="space-between" alignItems={'flex-end'}>
              <Autocomplete
                options={['stud 1', 'stud 2', 'stud 3', 'stud 4']}
                filterSelectedOptions
                freeSolo={false}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search by Candidate Name or Application ID"
                    placeholder="Search by Student ID / Student Name"
                    variant="outlined"
                  />
                )}
                sx={{ width: "35%" }}
              />

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


            {/* table */}
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
                    groupId: "applied_for",
                    headerName: "Applied For",
                    headerAlign: 'center',
                    children: [
                      { field: "job_id" },
                      { field: "emp_type" },
                      { field: "department" },
                      { field: "grade" },
                    ],
                  },
                ]}
                disableRowSelectionOnClick
              />
            </Box>
            <NewJobRequirement open={newJobPopup} close={() => setNewJobPopup(false)} />

          </Box>
        </Bbox>
      </RevealCard>
    </>
  );
};

export default <StudentAccount />;
