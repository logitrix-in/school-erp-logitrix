import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import api from "../../../../config/api";
import { Icon } from "@iconify/react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import Bbox from "../../../UiComponents/Bbox";
import { ToastContainer, toast } from "react-toastify";

const EditManageApplication = ({ open, close, fetchData: refetch }) => {
  const classOptions = [
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
    "XI-Science",
    "XI-Commerce",
    "XI-Arts",
    "XII-Science",
    "XII-Commerce",
    "XII-Arts",
    "Nursery",
    "PP1",
    "PP2",
  ];

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  function fetchData() {
    setLoading(true);
    api
      .get("/admission/application/manage-application/?date_format=calendar")
      .then((res) => {
        const data = res.data;
        ;
        setApplications(
          data.map((d) => {
            return {
              id: d.id,
              startingDate: d.application_open,
              closingDate: d.application_close,
              class: d.class_name,
              is_active: d.is_active,
            };
          })
        );
        refetch();
        setLoading(false);
      })
      .catch((err) =>{} );
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleChange(e, row) {
    const { name, value } = e.target;
    const data = [...applications];
    data[row][name] = value;
    ;
    setApplications(data);
  }

  function handleDateChange(name, val, row) {
    const data = [...applications];

    data[row][name] = new Date(val).toLocaleDateString("en-CA");
    ;
    setApplications(data);
  }

  function handleSubmit() {
    api
      .put("/admission/application/manage-application/", applications)
      .then((res) => {
        setStatus("Updated Successfully"); 
        toast.success("Updated Successfully", {
          autoClose: 3000,
        });
        ;
      });

    fetchData();
  }

  return (
    <Dialog
      fullWidth
      PaperProps={{
        sx: {
          maxHeight: "100%",
        },
      }}
      maxWidth="md"
      open={open}
      onClose={() => close()}
      disableEnforceFocus={true}
    >
      <ToastContainer />
      <Box overflow={"hidden"}>
        <Box bgcolor={"primary.main"} display={"flex"}>
          <Typography
            flex={1}
            ml={5}
            p={1}
            py={1.5}
            color={"white"}
            fontSize={"1rem"}
            textAlign={"center"}
          >
            Edit Application Window
          </Typography>
          <IconButton
            aria-label="delete"
            sx={{ mr: 1 }}
            onClick={() => close()}
          >
            <Icon icon={"ep:close-bold"} color="white" fontSize={"1.3rem"} />
          </IconButton>
        </Box>

        <Box
          display={"flex"}
          gap={2}
          p={2}
          py={2}
          alignItems={"center"}
          flexDirection={"column"}
          height={"75vh"}
          overflow={"auto"}
        >
          {loading ? (
            <Box width={"100%"} height={"100%"}>
              {new Array(9).fill(0).map((app, idx) => (
                <Grid container spacing={1} key={idx}>
                  <Grid item xs={3}>
                    <Skeleton height={60} />
                  </Grid>
                  <Grid item xs={3}>
                    <Skeleton height={60} />
                  </Grid>
                  <Grid item xs={3}>
                    <Skeleton height={60} />
                  </Grid>
                  <Grid item xs={3}>
                    <Skeleton height={60} />
                  </Grid>
                </Grid>
              ))}
            </Box>
          ) : (
            applications.map((app, idx) => (
              <Grid container spacing={1} key={idx}>
                <Grid item xs={3}>
                  <TextField
                    label="Class"
                    value={app["class"]}
                    fullWidth
                    disabled
                  />
                </Grid>
                <Grid item xs={3}>
                  <DatePicker
                    onChange={(e) => handleDateChange("startingDate", e, idx)}
                    sx={{ width: "100%" }}
                    minDate={new dayjs()}
                    value={dayjs(new Date(app.startingDate))}
                    label="Open Date"
                    format="DD MMM YYYY"
                  />
                </Grid>
                <Grid item xs={3}>
                  <DatePicker
                    onChange={(e) => handleDateChange("closingDate", e, idx)}
                    sx={{ width: "100%" }}
                    minDate={dayjs(new Date(app.startingDate))}
                    format="DD MMM YYYY"
                    label="Close Date"
                    value={dayjs(new Date(app.closingDate))}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField label="Status" value={app.is_active} disabled />
                </Grid>
              </Grid>
            ))
          )}
        </Box>

        <Box
          p={1.5}
          px={2}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{ borderTop: "1px solid rgba(0,0,0,0.2)" }}
        >
          {/* {status.length == 0 ? (
            <Box></Box>
          ) : (
            <Box display={"flex"} gap={0.5} alignItems={"center"}>
              <Icon color="green" icon="teenyicons:tick-circle-solid" />
              <Typography>{status}</Typography>
            </Box>
          )} */}
          <Box></Box>
          <Button
            startIcon={<Icon icon={"fluent:save-28-regular"} />}
            variant="contained"
            sx={{ px: 4 }}
            onClick={handleSubmit}
          >
            <Typography>Apply</Typography>
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default EditManageApplication;
