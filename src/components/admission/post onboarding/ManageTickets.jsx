import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import useClasses from "../../../hooks/useClasses";
import api from "../../../config/api";
import dayjs from "dayjs";
import CloseIcon from "@mui/icons-material/Close";

const ManageTickets = () => {
  const columns = [
    { field: "id", headerName: "Ticket ID", flex: 1 },
    { field: "category", headerName: "Ticket Category", flex: 1 },
    { field: "type", headerName: "Type", wiwdth: 90 },
    { field: "Class", headerName: "Class", flex: 1 },
    { field: "subject", headerName: "Subject", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "ageing", headerName: "Ageing (days)", flex: 1 },
  ];

  const [rows, setRows] = useState([]);

  const fetchTickets = () => {
    api.get("/admission/post-onboarding/ticket/").then((res) => {
      console.log(res.data);
      setRows(
        res.data.map((el) => ({
          ...el,
          date: dayjs(new Date(el.created_on)).format("DD MMM YYYY"),
        }))
      );
    });
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const [open, setOpen] = useState(false);
  useEffect(() => {
    fetchTickets();
  }, [open]);

  const { classes } = useClasses();

  return (
    <Box>
      <Box py={1.5} px={2} bgcolor={"#eeeeee"} borderRadius={1}>
        <Typography fontWeight={500} fontSize={"1rem"}>
          Open Tickets
        </Typography>
      </Box>
      <Box mt={2}>
        <Box
          display={"flex"}
          gap={2}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography fontWeight={600}>Filters</Typography>
          <ButtonGroup variant="outlined" size="small" sx={{ mr: "auto" }}>
            <Button>All (558) </Button>
            <Button>New (377)</Button>
            <Button>High Ageing (45) </Button>
          </ButtonGroup>

          <TextField label="Find By Category" sx={{ width: "23rem" }} />
        </Box>
        <Box display={"flex"} gap={2} mt={1} justifyContent={"space-between"}>
          <Box />
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setOpen(true)}
          >
            + Create New Ticket
          </Button>
        </Box>
      </Box>

      <Box height={"20rem"} mt={2}>
        <DataGrid columns={columns} rows={rows} />
      </Box>
      <CreateTicket open={open} setOpen={setOpen} classes={classes} />
    </Box>
  );
};

const CreateTicket = ({ open, setOpen, classes }) => {
  const [category, setCategory] = useState("");
  const [Class, setClass] = useState("");
  const [Subject, setSubject] = useState("");
  const [Description, setDescription] = useState("");

  const createTicket = () => {
    api
      .post("/admission/post-onboarding/ticket/", {
        category: category,
        Class: Class,
        subject: Subject,
        description: Description,
      })
      .then((res) => {
        console.log(res.data);
        setOpen(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Dialog maxWidth="md" fullWidth open={open} onClose={() => setOpen(false)}>
      <Box>
        <Box
          p={2}
          bgcolor={"primary.main"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          color={"white"}
        >
          <Typography fontWeight={500} fontSize={"1rem"} color={"white"}>
            Create a New Ticket
          </Typography>
          <IconButton color="inherit" onClick={() => setOpen(false)}>
            <CloseIcon color="#ffffff" />
          </IconButton>
        </Box>
        <Box p={2}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Ticket Category</InputLabel>
                <Select
                  label="Ticket Category"
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  {["Uniform", "School Application", "Exit Request"].map(
                    (val, idx) => (
                      <MenuItem key={idx} value={val}>
                        {val}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl fullWidth>
                <InputLabel>Class</InputLabel>
                <Select
                  label="Class"
                  onChange={(e) => {
                    setClass(e.target.value);
                  }}
                >
                  {classes.map((val, idx) => (
                    <MenuItem key={idx} value={val}>
                      {val}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Subject"
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                fullWidth
                rows={10}
                label="Description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => createTicket()}
              >
                Add Ticket
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Dialog>
  );
};

export default ManageTickets;
