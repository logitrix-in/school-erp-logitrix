import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import useClasses from "../../../../hooks/useClasses";
import api from "../../../../config/api";
import { ToastContainer, toast } from "react-toastify";
import ReignsSelect from "../../../UiComponents/ReignsSelect";
import { Navigate, redirect, useNavigate } from "react-router-dom";

const OnboardingMeritList = () => {
  const [isInitiating, setIsInitiating] = useState(false);
  const [initiatingFor, setInitiatingFor] = useState("");

  const [email, setEmail] = useState(false);
  const [message, setMessage] = useState(false);
  const [whatsapp, setWhatsapp] = useState(false);

  const columns = [
    {
      field: "class",
      headerName: "Class",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "vacancy",
      headerName: "Vacancy",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "OnboardingPending",
      headerName: "Onboarding Pending",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "OnboardingRejected",
      headerName: "Onboarding Rejected",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "OnboardingSuccessful",
      headerName: "Onboarding Successful",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
  ];

  const MeritListColumn = [
    // {
    //   field: "checkbox", // Special field for checkbox selection
    //   headerName: "Select",
    //   width: 80,
    //   checkboxSelection: true, // Enable checkbox selection
    //   headerCheckboxSelection: true, // Enable header checkbox for selecting all rows
    // },
    {
      field: "rank",
      headerName: "Rank",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "ApplicationID",
      headerName: "Application ID",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "CandidateName",
      headerName: "Candidate Name",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "OnboardingStatus",
      headerName: "Onboarding Status",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
  ];

  const navigate = useNavigate();
  const [selectionModel, setSelectionModel] = useState([]);

  useEffect(() => console.log(selectionModel), [selectionModel]);

  const handleSelectionModelChange = (newSelectionModel) => {
    setSelectionModel(newSelectionModel);
    console.log("Selected Rows:", newSelectionModel);
  };

  const { classes, acYear, curYear } = useClasses();

  const [selectedClass, setClass] = useState([]);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState(curYear);
  const [data, setData] = useState(null);
  const [tableRow, setTableRow] = useState(null);

  useEffect(() => {
    api
      .get(`/admission/test-center/onboarding/overview/?type=merit_list`, {
        params: {
          admission_year: selectedAcademicYear,
          applyingFor: selectedClass,
        },
      })
      .then((res) => {
        setTableRow(res.data.map((e, i) => ({ ...e, id: i })));
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    api
      .get("/admission/test-center/onboarding/initiate/online/data/", {
        params: {
          applyingFor: selectedClass,
          admission_year: selectedAcademicYear,
        },
      })
      .then((res) => {
        console.log(res.data);
        setData(
          res.data.map((app, idx) => ({
            id: idx,
            key: idx,
            rank: idx + 1,
            ApplicationID: app?.application_no,
            CandidateName: app?.name,
            OnboardingStatus: app?.status,
          }))
        );
      });
  }, []);

  return (
    <Box>
      <Box display={"flex"} flexDirection={"column"} gap={1}>
        <Typography
          p={1}
          px={1.5}
          bgcolor={"#eeeeee"}
          fontWeight={500}
          borderRadius={1}
          mb={1}
        >
          Onboarding Overview
        </Typography>
        <Box>
          <FormControl sx={{ width: "10rem" }}>
            <InputLabel>Admission Year</InputLabel>
            <Select
              label="Admission Year"
              value={selectedAcademicYear}
              onChange={(e) => setSelectedAcademicYear(e.target.value)}
            >
              {acYear.map((y, i) => (
                <MenuItem key={i} value={y}>
                  {y}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <ReignsSelect
            items={classes}
            onChange={(e) => {
              setClass(e);
              setData(null);
              setTableRow(null);

              api
                .get(
                  `/admission/test-center/onboarding/overview/?type=merit_list`,
                  {
                    params: {
                      admission_year: selectedAcademicYear,
                      applyingFor: e,
                    },
                  }
                )
                .then((res) => {
                  setTableRow(res.data.map((e, i) => ({ ...e, id: i })));
                  console.log(res.data);
                })
                .catch((err) => {
                  console.log(err);
                });

              api
                .get(
                  "/admission/test-center/onboarding/initiate/online/data/",
                  {
                    params: {
                      admission_year: selectedAcademicYear,
                      applyingFor: e,
                    },
                  }
                )
                .then((res) => {
                  console.log(res.data);
                  setData(
                    res.data.map((app, idx) => ({
                      id: idx,
                      key: idx,
                      rank: idx + 1,
                      ApplicationID: app?.application_no,
                      CandidateName: app?.name,
                      OnboardingStatus: app?.status,
                    }))
                  );
                });
            }}
            label="Class"
            multiple
            sx={{
              width: "10rem",
              ml: 1,
            }}
          />
        </Box>

        {tableRow && data ? (
          <>
            <Box>
              <Box>
                <DataGrid
                  disableRowSelectionOnClick
                  hideFooter={true}
                  rows={tableRow ?? []}
                  columns={columns}
                />
              </Box>

              <Typography
                p={1}
                px={1.5}
                bgcolor={"#eeeeee"}
                fontWeight={500}
                borderRadius={1}
                mt={2}
              >
                Initiate Onboarding Based on Merit List
              </Typography>

              <Box mt={1} height={400}>
                <DataGrid
                  checkboxSelection // Enable checkbox selection for the entire DataGrid
                  disableSelectionOnClick
                  getRowId={(row) => row.ApplicationID}
                  initialState={{
                    pagination: { paginationModel: { pageSize: 10 } },
                  }}
                  pageSizeOptions={[5, 10, 25]}
                  rowSelectionModel={selectionModel}
                  onRowSelectionModelChange={handleSelectionModelChange}
                  rows={data ?? []}
                  columns={MeritListColumn}
                  isRowSelectable={(row) =>
                    row.row.OnboardingStatus != "Rejected"
                  }
                />
              </Box>
            </Box>
            <Box mb={2}>
              {!isInitiating ? (
                <Box display={"flex"} gap={1}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setInitiatingFor("online");
                      setIsInitiating(true);

                      console.log(isInitiating);
                    }}
                  >
                    Initiate Online Onboarding Request
                  </Button>
                  <Button
                    variant="contained"
                    disabled={selectionModel.length > 1}
                    onClick={() =>
                      navigate(
                        `/admission/onboarding-form?appid=${selectionModel[0]}&admin=true`
                      )
                    }
                  >
                    Initiate Offline Onboarding Request
                  </Button>
                </Box>
              ) : (
                <Box>
                  <Typography
                    textTransform={"capitalize"}
                    fontWeight={500}
                    mt={1}
                  >
                    Initiate {initiatingFor} Onboarding for{" "}
                    {selectionModel.length} students
                  </Typography>
                  <FormControlLabel
                    disabled
                    control={<Checkbox defaultChecked />}
                    label="Email"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    onChange={(_, v) => setMessage(v)}
                    label="SMS"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    onChange={(_, v) => setWhatsapp(v)}
                    label="Whatsapp"
                  />
                  <Button
                    variant="contained"
                    sx={{ mr: 1 }}
                    disabled={selectionModel.length == 0}
                    onClick={() => {
                      const payload = {
                        onboarding: "merit-list",
                        type: initiatingFor,
                        email: true,
                        sms: message,
                        whatsapp: whatsapp,
                        app_ids: selectionModel,
                      };

                      api
                        .post(
                          "/admission/test-center/onboarding/initiate/",
                          payload
                        )
                        .then((res) => {
                          console.log(res.data);
                          toast.success(res.data.message);
                        });
                    }}
                  >
                    Initiate
                  </Button>
                  <Button onClick={() => setIsInitiating(false)}>Back</Button>
                  <ToastContainer />
                </Box>
              )}
            </Box>
          </>
        ) : (
          <Box>
            <Skeleton variant="rounded" height={110} />
            <Skeleton variant="rounded" sx={{ mt: 2 }} height={435} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default OnboardingMeritList;
