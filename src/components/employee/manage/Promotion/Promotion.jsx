import { useState } from "react";
import RevealCard from "../../../AnimationComponents/RevealCard";
import Bbox from "../../../UiComponents/Bbox";
import {
  Box,
  Divider,
  Typography,
  Button,
  TextField,
  Link,
  FormControlLabel,
  Switch,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Autocomplete,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { ToastContainer } from "react-toastify";
import Accept from "./Accept";
import Reject from "./Reject";
import PromotionIncrement from "./PromotionIncrement";
import EmployeePopup from '../../EmployeePopup'

const Promotion = () => {
  const navigate = useNavigate();
  const [promotionEligibility, setPromotionEligibility] = useState(false);
  const [promotionIncrement, setPromotionIncrement] = useState(false);
  const [acceptPopup, setAcceptPopup] = useState(false);
  const [rejectPopup, setRejectPopup] = useState(false);
  const [employeePopup, setEmployeePopup] = useState(false);

  const columns = [
    {
      field: "id", headerName: "Employee ID", width: 120,
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
    { field: "name", headerName: "Name", width: 120 },
    {
      field: "emp_status", headerName: "Employee Status", width: 120,
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
    { field: "department", headerName: "Department", width: 120 },
    { field: "promotion_eligibility", headerName: "Promotion Eligibility", width: 150 },
    { field: "curr_grade", headerName: "Current Grade", width: 120 },
    { field: "supervisor_name", headerName: "Supervisor Name", width: 120 },
    { field: "supervisor_recommendation", headerName: "Supervisor Recommendation", width: 120 },
    { field: "department_head_name", headerName: "Department Head Name", width: 120 },
    { field: "department_head_recommendation", headerName: "Department Head Recommendation", width: 120 },
    { field: "approved_for_upcoming_cycle", headerName: "Approved for Upcoming Cycle", width: 120 },
  ];

  const rows = [
    {
      id: "AG240001",
      name: "Saunav Ray",
      emp_status: "Active",
      department: "Science",
      promotion_eligibility: "Eligible",
      curr_grade: "B2",
      supervisor_name: "John Doe",
      supervisor_recommendation: "Yes",
      department_head_name: "Jane Smith",
      department_head_recommendation: "Yes",
      approved_for_upcoming_cycle: "Yes",
    },
    {
      id: "AG240003",
      name: "Saunav Ray",
      emp_status: "Active",
      department: "Science",
      promotion_eligibility: "Eligible",
      curr_grade: "B2",
      supervisor_name: "John Doe",
      supervisor_recommendation: "Yes",
      department_head_name: "Jane Smith",
      department_head_recommendation: "Yes",
      approved_for_upcoming_cycle: "Yes",
    },
    {
      id: "AG240003",
      name: "Saunav Ray",
      emp_status: "Active",
      department: "Science",
      promotion_eligibility: "Eligible",
      curr_grade: "B2",
      supervisor_name: "John Doe",
      supervisor_recommendation: "Yes",
      department_head_name: "Jane Smith",
      department_head_recommendation: "Yes",
      approved_for_upcoming_cycle: "Yes",
    }
  ];

  return (
    <RevealCard>
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
            onClick={() => navigate("/employee/manage/")}
          >
            Edit Information
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
            onClick={() => navigate("/employee/manage/employee-account/")}
          >
            Employee Account
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
            onClick={() => navigate("/employee/manage/id-card-pass/")}
          >
            ID Card
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
            onClick={() => navigate("/employee/manage/department/")}
          >
            Department
          </button>

          <button
            style={{
              backgroundColor: "white",
              border: "none",
              color: "black",
              cursor: "pointer",
              borderRadius: "6px",
              padding: "7px 10px 7px 10px",
              fontSize: "16px",
              fontWeight: 400,
            }}
            onClick={() => navigate("/employee/manage/promotion/")}
          >
            Promotion
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
            onClick={() => navigate("/employee/manage/probation")}
          >
            Probation
          </button>
        </div>
      </div>

      <RevealCard>
        <Bbox borderRadius={2} overflow={"hidden"} my={2}>
          <Box
            bgcolor={"white"}
            py={1.3}
            px={3}
            borderRadius={2}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography fontWeight={"700"} borderRadius={1} fontSize={"1.1rem"}>
              Promotion Recommendation
            </Typography>
          </Box>

          <Divider />

          <ToastContainer />

          <Box mt={3} mx={3} display={'flex'} justifyContent={'space-between'}>
            <Autocomplete
              options={["Student 1", "Student 2"]}
              filterSelectedOptions
              freeSolo={false}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Recommended for Promotion by Department Head"
                  label="Recommended for Promotion by Department Head"
                />
              )}
              sx={{ width: "40%" }}
            />

            <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
              <FormControlLabel
                control={<Switch />}
                label="Regular Promotion"
              />
              <Typography color="primary.main" fontWeight={'600'} sx={{ width: '30%' }}>Non Permanent to full time conversion</Typography>
            </Box>
          </Box>

          <Box display={"flex"} gap={1} sx={{ width: '35%', marginY: '16px' }} mx={3} >
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
              checkboxSelection
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
              onClick={() => { setAcceptPopup(true) }}
            >
              Accept
            </Button>

            <Button
              color="secondary"
              variant="contained"
              onClick={() => { setRejectPopup(true) }}
            >
              Reject
            </Button>

            <Button
              color="primary"
              variant="outlined"
            >
              Download
            </Button>
          </Box>

          <Accept open={acceptPopup} close={() => setAcceptPopup(false)} />
          <Reject open={rejectPopup} close={() => setRejectPopup(false)} />
        </Bbox>
      </RevealCard >


      <RevealCard>
        <Bbox borderRadius={2} overflow={"hidden"} my={2}>
          <Box
            bgcolor={"white"}
            py={1.3}
            px={3}
            borderRadius={2}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography fontWeight={"700"} borderRadius={1} fontSize={"1.1rem"}>
              Manage
            </Typography>
          </Box>
          <Divider />
          <ToastContainer />

          <Box display="grid"
            gridTemplateColumns="repeat(3, 1fr)"
            gap={2} px={3} py={4}>
            <Button variant="contained" color="primary" fullWidth onClick={() => setPromotionEligibility(true)}>
              Set Promotion Eligibility Criteria
            </Button>
            <Button variant="contained" color="primary" fullWidth onClick={() => navigate('/employee/manage/probation/promotion-letter-issuance/')}>
              Promotion Letter Issuance
            </Button>
            <Button variant="outlined" color="primary" fullWidth onClick={() => setPromotionIncrement(true)}>
              Promotion Increment
            </Button>
          </Box>

          <PromotionIncrement open={promotionIncrement} close={() => setPromotionIncrement(false)} />
          <EmployeePopup open={employeePopup} close={() => setEmployeePopup(false)} />

        </Bbox>
      </RevealCard>
    </RevealCard>
  );
};

export default <Promotion />;
