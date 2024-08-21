import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useClasses from "../../../../hooks/useClasses";
import api from "../../../../config/api";
import ReignsSelect from "../../../UiComponents/ReignsSelect";
import { setYear } from "date-fns";

const ManageOnboarding = () => {
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
      field: "MLStatus",
      headerName: "Mertit List Status",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "WLStatus",
      headerName: "Waiting List Status",
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

  const { classes, acYear, curYear } = useClasses();

  const [selectedClass, setClass] = useState(["I"]);
  const [data, setData] = useState(null);
  const [year, setYear] = useState(curYear);

  const fetchData = () => {
    api
      .get(`/admission/test-center/onboarding/overview/`, {
        params: {
          admission_year: year,
          applyingFor: selectedClass,
        },
      })
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, [selectedClass, year]);

  return (
    <Box>
      <Box display={"flex"} flexDirection={"column"} gap={1}>
        <Typography
          p={1}
          px={1.5}
          bgcolor={"#eeeeee"}
          fontWeight={500}
          borderRadius={1}
        >
          Onboarding Overview
        </Typography>
        <Box mt={2} display={"flex"} gap={1}>
          <FormControl sx={{ width: "10rem" }}>
            <InputLabel>Admission Year</InputLabel>
            <Select
              label="Admission Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              {acYear.map((y, i) => (
                <MenuItem value={y} key={i}>
                  {y}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <ReignsSelect
            sx={{ width: "12rem" }}
            items={classes}
            label="Classes"
            multiple
            onChange={(e) => setClass(e)}
          />
        </Box>
        <Box>
          <DataGrid
            disableRowSelectionOnClick
            hideFooter={true}
            rows={[{ ...data, id: 1 }]}
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
          Initiate Onboarding Based on Merit/Waiting List
        </Typography>
        <Box display={"flex"} gap={1}>
          <Button
            variant="contained"
            fullWidth
            LinkComponent={Link}
            to="merit-list/"
          >
            Merit List
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            LinkComponent={Link}
            to="waiting-list/"
          >
            Waiting List
          </Button>
        </Box>

        <Typography
          p={1}
          px={1.5}
          bgcolor={"#eeeeee"}
          fontWeight={500}
          borderRadius={1}
          mt={2}
        >
          Direct Onboarding
        </Typography>
        <Box display={"flex"} flexDirection={"column"} gap={1}>
          <Box>
            <TextField
              sx={{ width: "25rem", mr: 1 }}
              size="small"
              label="Enter Email Address / Application ID"
            />
            <Button variant="contained">Initiate</Button>
            <Button variant="outlined" sx={{ ml: 1 }}>
              View/Edit Template
            </Button>
          </Box>

          <Typography mt={1} fontWeight={600}>
            Bulk Upload for onboarding
          </Typography>
          <Box display={"flex"} gap={1}>
            <Button variant="contained">Download Template</Button>
            <Button variant="contained" color="secondary" component="label">
              Upload
              <input type="file" hidden accept=".csv" />
            </Button>
          </Box>

          <Box display={"flex"} gap={1} alignItems={"center"}>
            <Typography fontWeight={500}>
              25 new candidate details have been uploaded for Onboarding
            </Typography>
            <Button variant="outlined">View/Edit</Button>
            <Button variant="contained">Initiate</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ManageOnboarding;
