import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import RevealCard from "../../AnimationComponents/RevealCard";
import Bbox from "../../UiComponents/Bbox";
import { Link } from "react-router-dom";
import { DataGrid, GridToolbar, GridToolbarContainer } from "@mui/x-data-grid";
import { Icon } from "@iconify/react";
import api from "../../../config/api";
import { ToastContainer, toast } from "react-toastify";
import useClasses from "../../../hooks/useClasses";

const Evaluation = () => {
  const [resultOpen, setResultOpen] = useState(false);
  const CustomToolbar = () => (
    <GridToolbarContainer>
      {/* <GridToolbarExport /> */}
      <GridToolbar />
    </GridToolbarContainer>
  );

  const columns = [
    { field: "id", headerName: "Application Id", width: 150 },
    { field: "name", headerName: "Name", width: 180 },
    {
      field: "test_marks",
      headerName: "Test Score",
      width: 100,
      align: "center",
    },
    {
      field: "interview_marks",
      headerName: "Interview Score",
      width: 130,
      align: "center",
    },
    { field: "gender", headerName: "Gender", width: 100 },
    { field: "caste", headerName: "Caste", width: 90 },
    {
      field: "total",
      headerName: "Total Score",
      width: 90,
      align: "center",
    },
  ];

  const [rows, setRows] = useState([]);

  const [loading, setLoading] = useState(false);

  const { classes } = useClasses();

  return (
    <>
      <RevealCard>
        <Bbox borderRadius={2} bgcolor={"white"}>
          <Box
            py={2}
            px={2}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography fontWeight={"700"} borderRadius={1} fontSize={"1.1rem"}>
              Evaluation
            </Typography>
          </Box>

          <Divider />
          <Box
            borderRadius={2}
            p={2}
            display={"flex"}
            gap={2}
            justifyContent={"center"}
            flexDirection={{ xs: "column", md: "row" }}
          >
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              LinkComponent={Link}
              to="upload-offline-test-score/"
            >
              Upload Offline Test Score
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              LinkComponent={Link}
              to="upload-interview-score/"
            >
              Upload Interview Score
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => {
                setResultOpen(true);
                api
                  .post("/admission/test-center/evaluation/merit-list/", {
                    applyingFor: "all",
                  })
                  .then((res) => {
                    setRows(res.data.data);
                  })
                  .catch((err) => {
                    setRows([]);
                    toast.error(err.response.data.message);
                  });
              }}
            >
              Results
            </Button>

            {/* Result */}
            <Dialog
              maxWidth="md"
              fullWidth
              open={resultOpen}
              onClose={() => setResultOpen(false)}
            >
              <ToastContainer />
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                p={1}
                px={2}
                bgcolor={"primary.main"}
              >
                <Typography fontSize={"1rem"} fontWeight={500} color={"white"}>
                  View Results
                </Typography>
                <IconButton onClick={() => setResultOpen(false)}>
                  <Icon icon={"ion:close"} color="white" />
                </IconButton>
              </Box>
              <Box p={2} className="col" gap={2}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Class</InputLabel>
                  <Select
                    label="Class"
                    defaultValue={"I"}
                    onChange={(e) => {
                      setLoading(true);
                      api
                        .post("/admission/test-center/evaluation/result/", {
                          applyingFor: e.target.value,
                        })
                        .then((res) => {
                          toast.info(res.data.message);
                          console.log(res.data);
                          setRows(res.data.data);
                        })
                        .catch((err) => {
                          setRows([]);
                          console.log(err);
                          toast.error(err.response.data.message);
                        })
                        .finally(() => setLoading(false));
                    }}
                  >
                    {classes?.map((cl, i) => (
                      <MenuItem key={i} value={cl}>
                        {cl}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Box
                  height="55vh"
                  bgcolor={loading ? "#eeeeee" : "#ffffff"}
                  borderRadius={1}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      pageSize={5}
                      rowsPerPageOptions={[5, 10, 20]}
                      disableSelectionOnClick
                      slots={{ toolbar: CustomToolbar }}
                    />
                  )}
                </Box>
              </Box>
            </Dialog>
          </Box>
        </Bbox>
      </RevealCard>
    </>
  );
};

export default Evaluation;
