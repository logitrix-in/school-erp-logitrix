import { useState, useEffect, useCallback, useContext } from "react";
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Radio,
  Typography,
} from "@mui/material";
import useClasses from "../../../hooks/useClasses";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { DatePicker } from "@mui/x-date-pickers";
import RevealCard from "@/components/AnimationComponents/RevealCard";
import ReignsSelect from "@/components/UiComponents/ReignsSelect";
import Flex from "@/components/UiComponents/Flex";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SVGIncident from './SVGIncident';
import { toast } from "react-toastify";
import api from "../../../config/api";
import PageLoader from '../../PageLoader'
import { UserContext } from './UserContext';

const RaiseIncident = () => {
  const { classes, sections, roll, nonCompliance } = useClasses();
  const navigate = useNavigate();
  const [modeSwitch, setModeSwitch] = useState(true);
  const [libraryCardNumbers, setLibraryCardNumbers] = useState([]);
  const [selectedLibraryCard, setSelectedLibraryCard] = useState('');
  const [userType, setUserType] = useState('student');
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [incidentBucketRow, setIncidentBucketRow] = useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const { suspendedUsers, penaltyUsers, setSuspendedUsers, setPenaltyUsers, dateOfIncident, setDateOfIncident, selectedCompliance, setSelectedCompliance, libraryCard, setLibraryCard } = useContext(UserContext);

  const studentColumn = [
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
            setSelectedRow(params.row.id);
          }}
        />
      ),
    },
    {
      field: "id",
      headerName: "Library Card #", flex: 1
    },
    {
      field: "name",
      headerName: "Name", flex: 1.5
    },
    {
      field: "class",
      headerName: "Class", flex: 0.8
    },
    {
      field: "section",
      headerName: "Section", flex: 0.8
    },
    {
      field: "roll",
      headerName: "Roll #", flex: 0.8
    },
    {
      field: "status",
      headerName: "Library Card Status", flex: 1.5,
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
      field: "period",
      headerName: "Last Suspension Period", flex: 1.8
    },
    {
      field: "amount",
      headerName: "Penalty Due Amount", flex: 1.5
    },
    {
      field: "incidentid",
      flex: 1.5,
      headerName: "Open Incidents",
      renderCell: (params) => (
        <Box
          style={{
            backgroundColor: "#e8def8",
            borderRadius: "6px",
            display: "inline-block",
            width: "auto",
            paddingLeft: "7px",
            paddingRight: "7px",
          }}
        >
          {params.value}
        </Box>
      ),
    },
  ];

  const employeeColumn = [
    {
      field: "library_card_number",
      headerName: "Library Card #", flex: 1
    },
    {
      field: "name",
      headerName: "Name", flex: 1.4
    },
    {
      field: "type",
      headerName: "Employee Type", flex: 1.2
    },
    {
      field: "department",
      headerName: "Department", flex: 1.2
    },
    {
      field: "current_status",
      headerName: "Library Card Status", flex: 1.4,
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
      field: "period",
      headerName: "Last Suspension Period", flex: 1.7
    },
    {
      field: "amount",
      headerName: "Penalty Due Amount", flex: 1.4
    },
    {
      field: "open_incidents",
      flex: 1.5,
      headerName: "Open Incidents",
      renderCell: (params) => (
        <Box
          style={{
            backgroundColor: "#e8def8",
            borderRadius: "6px",
            display: "inline-block",
            width: "auto",
            paddingLeft: "7px",
            paddingRight: "7px",
          }}
        >
          {params.value}
        </Box>
      ),
    },
  ];

  const mixedColumn = [
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
            setSelectedRow(params.row.id);
          }}
        />
      ),
    },
    {
      field: "id",
      headerName: "Library Card #", flex: 1
    },
    {
      field: "name",
      headerName: "Name", flex: 1.4
    },
    {
      field: "details",
      headerName: "Details", flex: 1.2
    },
    {
      field: "status",
      headerName: "Library Card Status", flex: 1.4,
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
      field: "period",
      headerName: "Last Suspension Period", flex: 1.7
    },
    {
      field: "amount",
      headerName: "Penalty Due Amount", flex: 1.4
    },
    {
      field: "incidentid",
      flex: 1.5,
      headerName: "Open Incidents",
      renderCell: (params) => (
        <Box
          style={{
            backgroundColor: "#e8def8",
            borderRadius: "6px",
            display: "inline-block",
            width: "auto",
            paddingLeft: "7px",
            paddingRight: "7px",
          }}
        >
          {params.value}
        </Box>
      ),
    },
  ];

  const incidentBucketColumn = [
    {
      field: "library_card_number",
      headerName: "Library Card #",
      flex: 1
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1.4
    },
    {
      field: "type",
      headerName: "Employee Type",
      flex: 1.2
    },
    {
      field: "department",
      headerName: "Department",
      flex: 1.2
    },
    {
      field: "current_status",
      headerName: "Library Card Status",
      flex: 1.4,
      renderCell: (params) => (
        <Box
          style={{
            backgroundColor:
              params.value === "Inactive"
                ? "#C6F6D5"
                : params.value === "Suspended"
                  ? "#FFCCCC"
                  : "transparent",
            borderRadius: "6px",
            display: "inline-block",
            width: "auto",
            padding: "4px 7px",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "suspend",
      headerName: "Suspend",
      flex: 1.7,
      renderCell: (params) => (
        <Checkbox
          checked={params.value}
          onChange={(event) => {
            // Handle checkbox change
            // You'll need to implement this function
            handleSuspendChange(event, params.row);
          }}
        />
      ),
      renderHeader: (params) => (
        <Box display="flex" alignItems="center">
          <Checkbox
            checked={incidentBucketRow.every(r => r.suspend)}
            indeterminate={incidentBucketRow.some(r => r.suspend) && !incidentBucketRow.every(r => r.suspend)}
            onChange={handleHeaderSuspendChange}
          />
          <Typography variant="subtitle2">Suspend</Typography>
        </Box >
      ),
    },
    {
      field: "penalty",
      headerName: "Penalty",
      flex: 1.4,
      renderCell: (params) => (
        <Checkbox
          checked={params.value}
          onChange={(event) => {
            handlePenaltyChange(event, params.row);
          }}
        />
      ),
      renderHeader: (params) => (
        <Box display="flex" alignItems="center">
          <Checkbox
            checked={incidentBucketRow.every(r => r.penalty)}
            indeterminate={incidentBucketRow.some(r => r.penalty) && !incidentBucketRow.every(r => r.penalty)}
            onChange={handleHeaderPenaltyChange}
          />
          <Typography variant="subtitle2">Penalty</Typography>
        </Box>
      ),
    },
    {
      field: "open_delete",
      headerName: "",
      flex: 0.5,
      renderCell: (params) => (
        <DeleteOutlineOutlinedIcon
          color="error"
          style={{ cursor: 'pointer', }}
          onClick={() => {
            // Handle delete action
            // You'll need to implement this function
            handleDelete(params.row);
          }}
        />
      ),
    },
  ];

  const rows2 = [
    {
      id: "AG240001",
      class: "VI",
      name: "Saunav Ray",
      section: "A",
      roll: 23,
      status: "Active",
    },
    {
      id: "AG240002",
      class: "VI",
      name: "Saunav Ray",
      section: "A",
      roll: 23,
      status: "Active",
    },
    {
      id: "AG240003",
      class: "VI",
      name: "Saunav Ray",
      section: "A",
      roll: 23,
      status: "Suspended",
    },
  ];

  const columns3 = [
    {
      field: "space", flex: 0.5,
      headerName: (
        <Checkbox size="small" />
      ),
      renderCell: (params) => (
        <Checkbox
          color="primary"
          sx={{
            transform: "scale(0.6)",
          }}
          inputProps={{ "aria-label": params.row.id }}
          onChange={() => {
          }}
        />
      ),
    },
    { field: "id", headerName: "Library Card #", flex: 1 },
    { field: "name", headerName: "Name", flex: 1.5 },
    { field: "class", headerName: "Class", flex: 0.8 },
    { field: "section", headerName: "Section", flex: 0.8 },
    { field: "roll", headerName: "Roll #", flex: 0.8 },
    {
      field: "status",
      headerName: "Library Card Status",
      flex: 1.5,
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
    { field: "suspension", headerName: "Last Suspension Period", flex: 1.5 },
    { field: "penalty", headerName: "Penalty Due Amount", flex: 1.5 },
  ];

  const rows3 = [
    {
      id: "AG240001",
      class: "VI",
      name: "Saunav Ray",
      section: "A",
      roll: 23,
      status: "Active",
      suspension: "N/A",
      penalty: "Nil",
    },
    {
      id: "AG240002",
      class: "VI",
      name: "Saunav Ray",
      section: "A",
      roll: 23,
      status: "Inactive",
      suspension: "N/A",
      penalty: "Nil",
    },
    {
      id: "AG240003",
      class: "VI",
      name: "Saunav Ray",
      section: "A",
      roll: 23,
      status: "Active",
      suspension: "N/A",
      penalty: "Nil",
    },
    {
      id: "AG240004",
      class: "VI",
      name: "Saunav Ray",
      section: "A",
      roll: 23,
      status: "Active",
      suspension: "N/A",
      penalty: "Nil",
    }
  ];

  const handleSuspendChange = useCallback((event, row) => {
    setIncidentBucketRow(prevRows => prevRows.map(r =>
      r.id === row.id ? { ...r, suspend: event.target.checked } : r
    ));
  }, []);

  const handleHeaderSuspendChange = useCallback((event) => {
    setIncidentBucketRow(prevRows => prevRows.map(r => ({ ...r, suspend: event.target.checked })));
  }, []);

  const handlePenaltyChange = useCallback((event, row) => {
    setIncidentBucketRow(prevRows => prevRows.map(r =>
      r.id === row.id ? { ...r, penalty: event.target.checked } : r
    ));
  }, []);

  const handleHeaderPenaltyChange = useCallback((event) => {
    setIncidentBucketRow(prevRows => prevRows.map(r => ({ ...r, penalty: event.target.checked })));
  }, []);

  const handleDelete = useCallback((row) => {
    setIncidentBucketRow(prevRows => prevRows.filter(r => r.id !== row.id));
  }, []);

  const handleSelectionChange = (selectionModel) => {
    const selectedRows = rows.filter(row => selectionModel.includes(row.id));
    setSelectedRow(selectedRows);
    console.log(selectedRows);
    console.log('change');
  };

  async function handleProceed() {
    try {
      setLoading(true);

      setSuspendedUsers(incidentBucketRow.filter(user => user.suspend));
      setPenaltyUsers(incidentBucketRow.filter(user => user.penalty));
      console.log(suspendedUsers);
      console.log(penaltyUsers);
      console.log(dateOfIncident);
      console.log(selectedCompliance);
      navigate("/library/action/new incident/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddToIncidentBucket() {
    try {
      if (selectedRow.length === 0) {
        toast.error('Please select a row to add to the incident bucket.');
        return;
      }
      setLoading(true);
      console.log(selectedRow)

      setIncidentBucketRow((prevRows) => {
        // Filter the selectedRow array to only include rows that are not in prevRows
        const newRows = selectedRow.filter(
          (newRow) => !prevRows.some((row) => row.id === newRow.id)
        );

        console.log(newRows);

        // Map the new rows to match the structure required by incidentBucketColumn
        const formattedNewRows = newRows.map(cardData => ({
          id: cardData.id,
          library_card_number: cardData.library_card_number,
          user_id: cardData.issued_by,
          caution_money: cardData.caution_money,
          name: cardData.name,
          type: cardData.type,
          department: cardData.department,
          current_status: cardData.current_status,
          suspend: false, // Initialize as unchecked
          penalty: false, // Initialize as unchecked
          open_delete: null // This will be handled by the renderCell function
        }));

        console.log(formattedNewRows);

        // Return the previous rows along with the new ones (if any)
        return [...prevRows, ...formattedNewRows];
      });

      console.log(incidentBucketRow);

      setSelectedRow([])
      setRows([]);
      setSelectedLibraryCard('');
    } catch (error) {
      console.log(error);
      toast.error('Error Loading Data.')
    } finally {
      setLoading(false);
    }
  }

  async function getLibraryCardDetail() {
    try {
      setLoading(true);
      if (!selectedLibraryCard) return;

      const response = await api.get(`/library/library-cards/?card_number=${selectedLibraryCard}`);
      console.log(response.data);

      if (response.data.length > 0) {
        const cardData = response.data[0];
        if (userType === '' && cardData.person_type === 'Employee') {
          setUserType('employee')
        } else if (userType === '' && cardData.person_type === 'Student') {
          setUserType('student')
        } else if (userType === 'employee' && cardData.person_type === 'Student') {
          setUserType('mixed')
        } else if (userType === 'student' && cardData.person_type === 'Employee') {
          setUserType('mixed')
        }

        let newRow;
        if (cardData.person_type === 'Employee') {
          newRow = {
            id: cardData.id,
            library_card_number: cardData.card_number,
            name: `${cardData.employee.employee_personal_details.first_name} ${cardData.employee.employee_personal_details.last_name}`,
            user_id: cardData.issued_by,
            caution_money: cardData.caution_money,
            type: cardData.employee.employee_type, // Note: 'category' is not directly available, using 'employee_type' instead
            department: cardData.employee.department,
            current_status: cardData.is_active ? 'Active' : 'Inactive',
            current_borrowings: cardData.current_borrowings,
            period: cardData.last_suspension_end_date || 'null',
            amount: cardData.penalty_due,
            open_incidents: cardData.open_incidents.join(', ') || 'None'
          };
        }
        console.log('New row:', newRow);
        setRows([newRow]);
      } else {
        ([]); // Set to empty array if no data returned
      }

    } catch (error) {
      console.log(error);
      toast.error('Error Loading Data.')
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { getLibraryCardDetail() }, [selectedLibraryCard])

  useEffect(() => {
    async function getLibraryCardDetails() {
      try {
        const response = await api.get('/library/library-cards/?display_type=list_view');
        console.log(response.data);

        setLibraryCardNumbers(response.data.library_cards);
      } catch (err) {
        console.log(err);
        toast.error('Error Occured!');
      }
    }
    getLibraryCardDetails();
  }, []);


  if (loading) {
    console.log('loading');
    <PageLoader />
  }

  return (
    <>
      {loading && <PageLoader />}
      {!loading && <RevealCard>
        <Box ml={2} mr={2}>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent={"space-between"}
            mt={1}
            height={70}
            width={"100%"}
          >
            {modeSwitch ? (
              <Box display={"flex"} gap={1} sx={{ width: '25%' }}>
                <FormControl fullWidth>
                  <InputLabel>Search by Library Card # or Media #</InputLabel>
                  <Select
                    label="Search by Library Card # or Media #"
                    value={selectedLibraryCard}
                    required
                    onChange={(e) => setSelectedLibraryCard(e.target.value)}
                  >
                    {
                      libraryCardNumbers?.map((type) => (
                        <MenuItem key={type} value={type}>{type}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Box>
            ) : (
              <Box sx={{ width: "30%", visibility: "hidden" }}>
                <TextField
                  placeholder="Hidden Placeholder"
                  label="Hidden Label"
                  sx={{ width: "100%" }}
                />
              </Box>
            )}

            {modeSwitch ? (
              <Button
                variant="contained"
                sx={{ marginLeft: "20px" }}
                onClick={() => {
                  setModeSwitch(!modeSwitch);
                }}
              >
                Switch to Bulk
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{ marginLeft: "20px" }}
                onClick={() => {
                  setModeSwitch(!modeSwitch);
                }}
              >
                Switch to Individual
              </Button>
            )}
          </Box>

          {!modeSwitch && (
            <Box display={"flex"} justifyContent={'space-between'} alignItems={'center'}>
              <Box display={"flex"}>
                <ReignsSelect items={classes} multiple label="Class" sx={{ width: "15rem", marginRight: "2rem" }} />
                <ReignsSelect items={sections} multiple label="Section" sx={{ width: "15rem", marginRight: "2rem" }} />
                <ReignsSelect items={roll} multiple label="Roll#" sx={{ width: "15rem", marginRight: "2rem" }} />
              </Box>

              <Button variant="contained" sx={{ marginLeft: "20px" }}>
                Submit
              </Button>

            </Box>
          )}

          < Box mt={2} mb={5} style={{ height: "100%" }}>
            {modeSwitch ? (
              <div className="custom-data-grid">
                <DataGrid
                  rows={rows}
                  columns={employeeColumn}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                  checkboxSelection
                  hideFooter
                  onRowSelectionModelChange={(newSelectionModel) => {
                    console.log('Selection changed:', newSelectionModel);
                    handleSelectionChange(newSelectionModel);
                  }}
                />
                <style jsx global>{`
        .custom-data-grid .MuiDataGrid-virtualScroller {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .custom-data-grid .MuiDataGrid-virtualScroller::-webkit-scrollbar {
          display: none;  /* Chrome, Safari and Opera */
        }
      `}</style>
              </div>

            ) : (
              <DataGrid
                rows={rows3}
                columns={columns3}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                CheckboxSelection
              />
            )}
          </Box>

          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              sx={{ marginLeft: "20px", marginBottom: '24px' }}
              onClick={() => {
                handleAddToIncidentBucket();
              }}
            >
              Add to Incident Bucket
            </Button>
          </Box>


          {
            incidentBucketRow.length > 0 &&
            <>
              <SVGIncident />
              <Box mt={4} display={"flex"}>
                <ReignsSelect
                  items={nonCompliance}
                  onChange={setSelectedCompliance}
                  label="Non Compliance Type"
                  value={selectedCompliance}
                  defaultValues={nonCompliance}
                  multiple
                  sx={{ width: '25%' }}
                />

                <FormControl style={{ width: "20rem", marginLeft: "2rem" }}>
                  <DatePicker
                    label="Date of incident"
                    format="DD MMM YYYY"
                    value={dateOfIncident}
                    onChange={(e) => setDateOfIncident(e)}
                  />
                </FormControl>

                <Box flex={1} />

                <Button variant="outlined" sx={{ height: "40px", width: "120px" }} onClick={() => setSelectedCompliance('')}>
                  {" "}
                  Clear All{" "}
                </Button>
              </Box>

              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button variant="outlined" sx={{ borderRadius: 16 }}>
                  {incidentBucketRow.length} users added
                </Button>
              </Box>

              <Box mt={2} mb={5} style={{ height: "100%" }}>
                <DataGrid
                  rows={incidentBucketRow}
                  columns={incidentBucketColumn}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                  disableRowSelectionOnClick
                />
              </Box>

              <Box mt={4} mb={7} display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  onClick={() => handleProceed()}
                  sx={{ marginRight: "10px", width: "120px" }}
                >
                  Proceed
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  sx={{ marginLeft: "10px", width: "120px" }}
                >
                  Cancel
                </Button>
              </Box>
            </>
          }
        </Box>
      </RevealCard >}
    </>
  );
};

export default RaiseIncident;