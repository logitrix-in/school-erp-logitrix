import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  Grid,
  IconButton,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import api from "../../../config/api";
import { Icon } from "@iconify/react";
import { ToastContainer, toast } from "react-toastify";

const SetAttendaceCriteria = ({ open, close, fetchData: refetch }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  function fetchData() {
    setLoading(true);
    api
      .get("/admission/application/manage-application/?date_format=calendar")
      .then((res) => {
        const data = res.data;
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
      .catch((err) => {});
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleSubmit() {
    setConfirmDialogOpen(true);
  }

  function handleConfirm() {
    // Here you can put your API call to save the attendance criteria
    api
      .put("/admission/application/manage-application/", applications)
      .then((res) => {
        setStatus("Updated Successfully");
        toast.success("Attendance criteria set successfully.", {
          autoClose: 3000,
        });
      })
      .catch((error) => {
        toast.error("Failed to set attendance criteria.");
      });

    setConfirmDialogOpen(false);
    fetchData();
  }

  function handleCancel() {
    setConfirmDialogOpen(false);
  }

  return (
    <Dialog
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
            Set Attendace Criteria
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
              <Grid container spacing={3} key={idx}>
                {/* class */}
                <Grid item>
                  <TextField
                    label="Class"
                    value={app["class"]}
                    size="large"
                    sx={{ width: "130px" }}
                    disabled
                  />
                </Grid>

                {/*  Minimum Required Attendance % */}
                <Grid item>
                  <TextField
                    label="Min Attendance Required"
                    inputProps={{
                      pattern: "[0-9]*",
                      inputMode: "numeric",
                    }}
                    type="number"
                  />
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
          <Box></Box>

          {/* apply button */}
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

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onClose={handleCancel}>
        <div
          style={{
            backgroundColor: "#3B98C4",
            height: "15px",
            width: "100%",
          }}
        />

        <Box p={2}>
          <Typography variant="body1">
            Are you sure you want to confirm the attendance criteria?
          </Typography>

          <Box mt={2} gap={1} display="flex" justifyContent="flex-end">
            <Button
              onClick={handleCancel}
              sx={{
                color: "red",
                fontWeight: "400",
                "&:hover": {
                  backgroundColor: "#FFECEB",
                },
              }}
            >
              No
            </Button>
            <Button
              variant="contained"
              onClick={handleConfirm}
              color="primary"
              autoFocus
            >
              Yes
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Dialog>
  );
};

export default SetAttendaceCriteria;
