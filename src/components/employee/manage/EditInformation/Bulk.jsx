import { useState, useEffect } from "react";
import RevealCard from "../../../AnimationComponents/RevealCard";
import Bbox from "../../../UiComponents/Bbox";
import {
  Box,
  Button,
  Divider,
  Typography,
  InputLabel,
} from "@mui/material";
import useEmployees from "@/hooks/useEmployees";
import { toast } from "react-toastify";
import ReignsSelect from "@/components/UiComponents/ReignsSelect";
import "react-toastify/dist/ReactToastify.css";
import { DataGrid } from "@mui/x-data-grid";
import Popup from "../../../UiComponents/Popup";
import EmployeePopup from '../../EmployeePopup'

const Bulk = () => {
  const [showModal, setShowModal] = useState(false);
  const [showUploadArea, setShowUploadArea] = useState(false);
  const [isUploadEnabled, setIsUploadEnabled] = useState(false);
  const [isUploadOccurred, setIsUploadOccurred] = useState(false);

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

  // Function to handle drag over event
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Function to handle drop event
  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    console.log(files);
    setIsUploadOccurred(true);
  };

  // Function to handle the confirmation of submission
  const handleConfirmation = () => {
    try {
      console.log("Submitted Successfully");
      toast.success("Submitted Successfully");
    } catch (error) {
      console.error("Error while displaying toast:", error);
    }
    // setShowPrompt(false);
    setShowModal(false);
    setShowUploadArea(false);
  };

  // Function to enable the Upload button
  const enableUploadButton = () => {
    setIsUploadEnabled(true);
  };

  const columns = [
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

        {/* Conditional rendering for the table or the upload area */}
        {!showUploadArea ? (
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

              <ReignsSelect
                items={employeeType}
                multiple
                label="Employee Type"
                defaultValues={employeeType}
                onChange={setSelectedEmployeeType}
                value={selectedEmployeeType}
                sx={{
                  width: '20%'
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
                  width: '20%'
                }}
              />
              <ReignsSelect
                items={employeeGrade}
                multiple
                label="Grade"
                defaultValues={employeeGrade}
                onChange={setSelectedGrade}
                value={selectedGrade}
                sx={{
                  width: '20%'
                }}
              />


              {/* Spacer */}
              <Box flex={1} />

              {/* search button */}
              <Button variant="contained">Search</Button>
            </Box>

            {/* total number of results found */}
            <Box pr={2} mt={1} display="flex" justifyContent="flex-end">
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
                checkboxSelection
              />
            </Box>
          </Box>
        ) : (
          // upload area
          <UploadArea
            setShowUploadArea={setShowUploadArea}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          />
        )}

        {/* Buttons section */}
        <Box style={{ marginLeft: "1%", marginBottom: "2%" }}>
          {!showUploadArea ? (
            // table buttons
            <>
              <Button variant="contained" onClick={enableUploadButton}>
                Download Template
              </Button>
              <Button
                variant="contained"
                sx={{ marginLeft: "20px" }}
                onClick={() => setShowUploadArea(true)}
                disabled={!isUploadEnabled}
              >
                Upload
              </Button>
            </>
          ) : (
            // upload buttons
            <>
              <Button
                variant="contained"
                disabled={!isUploadOccurred}
                style={{
                  backgroundColor: !isUploadOccurred ? "#e0e0e0" : undefined,
                }}
              >
                Re-Upload
              </Button>

              <Button
                variant="contained"
                sx={{ marginLeft: "20px" }}
                onClick={() => setShowModal(true)}
              >
                Submit
              </Button>

              {/* Modal for confirmation */}
              <ConfirmationModal showModal={showModal} setShowModal={setShowModal} handleConfirmation={handleConfirmation} />
            </>
          )}

          <EmployeePopup open={employeePopup} close={() => setEmployeePopup(false)} />
        </Box>
      </Bbox>
    </RevealCard>
  );
};

// Upload area component
const UploadArea = ({ setShowUploadArea, onDrop, onDragOver }) => {
  return (
    <Box
      border="1px dashed #ccc"
      borderRadius="7px"
      width="80%"
      height="300px"
      marginLeft="10%"
      marginTop="4%"
      marginBottom="2%"
      p={3}
      textAlign="center"
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <Typography
        style={{
          color: "#7C7A7A",
          fontSize: "30px",
          fontWeight: "500",
          paddingTop: "90px",
        }}
      >
        Click / Drag & Drop to upload Excel
      </Typography>
      <Box display={'flex'} justifyContent={'center'} mt={2} gap={4}>
        <input type="file" style={{ display: "none" }} name="browse-file" id="browse-file" />
        <InputLabel htmlFor="browse-file">
          <Button color="primary" variant="contained" component="span">
            Browse
          </Button>
        </InputLabel>
        <Button color="primary" variant="outlined" onClick={() => setShowUploadArea(false)}>Cancel</Button>
      </Box>
    </Box>
  );
};

const ConfirmationModal = ({ showModal, setShowModal, handleConfirmation }) => {
  return (
    <Popup title={"Confirmation"} open={showModal} close={() => setShowModal(false)}>
      <Box p={5} component={"form"} height={"20vh"} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
        <Typography style={{ fontSize: "20px", fontWeight: "500" }}>
          Are you sure you want to submit?
        </Typography>

        <Box
          style={{ display: "flex", justifyContent: "center", marginTop: "20px", gap: 16 }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleConfirmation()}
          >
            Yes
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setShowModal(false)}
          >
            No
          </Button>
        </Box>
      </Box>
    </Popup >
  );
};

export default Bulk;
