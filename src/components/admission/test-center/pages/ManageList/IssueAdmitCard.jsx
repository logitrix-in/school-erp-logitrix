import {
  Box,
  Button,
  Checkbox,
  Dialog,
  Drawer,
  FormControl,
  FormControlLabel,
  Grid,
  Icon,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Bbox from "../../../../UiComponents/Bbox";
import { Link, useSearchParams } from "react-router-dom";
import {
  DateField,
  DatePicker,
  MobileTimePicker,
  TimeField,
  TimePicker,
} from "@mui/x-date-pickers";
import api from "../../../../../config/api";
import dayjs from "dayjs";
import { LoadingButton } from "@mui/lab";
import { ToastContainer, toast } from "react-toastify";
import { CheckBox, DeleteForever } from "@mui/icons-material";

const IssueAdmitCard = () => {
  const [applicants, setApplicants] = useState([]);

  const fetchData = () =>
    api.get("/admission/test-center/issue-admit-card/").then((res) => {
      setApplicants(res.data.admit_card);
    });
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    doSearch();
  }, [applicants]);

  const [admitLoding, setAdmitLoading] = useState(false);
  const [downloadLoding, setDownloadLoading] = useState(false);

  const sendAdmit = () => {
    setAdmitLoading(true);
    api
      .post("/admission/test-center/issue-admit-card/", {
        applicants: selected,
        resend: resend,
        date: dayjs(playload.date).format("YYYY-MM-DD"),
        venue: playload.venue,
        time: dayjs(playload.time).format("HH:mm"),
        end_time: dayjs(playload.end_time).format("HH:mm"),
      })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error("Something Went Wrong");
      })
      .finally(() => {
        setAdmitLoading(false);
      });

    // console.log({
    //   applicants: selected,
    //   resend: resend,
    //   date: dayjs(playload.date).format("YYYY-MM-DD"),
    //   venue: playload.venue,
    //   time: dayjs(playload.time).format("HH:mm"),
    //   duration: dayjs(playload.duration).format("HH:mm"),
    // });
  };

  const downloadAdmit = () => {
    setDownloadLoading(true);
    console.log(playload);
    api
      .post("/admission/test-center/download-admit-card/", { id: selected })
      .then((res) => {
        window.open(res.data.link, "_blank", "noopener,noreferrer");
      })
      .catch((err) => {
        toast.error("Something Went Wrong");
      })
      .finally(() => {
        setDownloadLoading(false);
      });
  };

  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const doSearch = () => {
    console.log(search);
    console.log(
      applicants.filter((app) =>
        app.name.toLowerCase().includes(search.toLowerCase())
      )
    );
    if (search == "") return setSearchResult([]);
    var value = applicants.filter(
      (app) =>
        app.name.toLowerCase().includes(search.toLowerCase()) ||
        app.id.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResult(value);
    if (value.length == 0) toast.error("No Candidates Found In Search Result");
  };

  useEffect(() => {
    console.log(searchResult);
  }, [searchResult]);

  function timeToDate(timeString) {
    var timeParts = timeString.split(":");
    var hours = parseInt(timeParts[0], 10);
    var minutes = parseInt(timeParts[1], 10);
    var seconds = parseInt(timeParts[2], 10);

    // Create a new Date object
    var dateObject = new Date();

    // Set the hours, minutes, and seconds of the Date object
    dateObject.setHours(hours);
    dateObject.setMinutes(minutes);
    dateObject.setSeconds(seconds);

    return dateObject;
  }

  const [playload, setPlayload] = useState({
    date: dayjs(new Date("30 oct 2023")),
    venue: "",
    time: timeToDate("00:00:00"),
    end_time: timeToDate("00:00:00"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayload((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {}, [playload]);

  useEffect(() => {}, [selected]);

  const deleteItem = (id) => {
    const updatedItems = selected.filter((item) => item.id !== id);
    setSelected(updatedItems);
  };

  // resend check

  const [resend, setResend] = useState(false);

  const [open, setOpen] = useState(false);
  const [checkState, setCheckState] = useState(false);

  const close = () => setOpen(false);

  useEffect(() => {
    setSelected([]);
  }, [resend]);

  // side drawer

  const [sideOpen, setSideOpen] = useState(false);
  const [viewCandidate, setViewCandidate] = useState(null);

  return (
    <>
      <ToastContainer />
      <Bbox borderRadius={1} p={1} pb={0}>
        <Typography
          p={1}
          px={2}
          borderRadius={1}
          bgcolor={"#f2f2f2"}
          fontWeight={600}
        >
          Admit Card - Quick Search
        </Typography>

        <Box p={1} display={"flex"} flexDirection={"column"} gap={1}>
          <Box
            justifyContent={"space-between"}
            display={"flex"}
            gap={1}
            alignItems={"center"}
          >
            <FormControlLabel
              sx={{ mr: "auto" }}
              label="Show candidates
              whose admit card has been issued"
              control={<Checkbox />}
              onChange={(_, v) => {
                setCheckState(v);
                setOpen(true);
              }}
              checked={resend}
            />

            <Dialog open={open} maxWidth="xs" fullWidth>
              <Box>
                <Box bgcolor={"primary.main"} height={15}></Box>
                <Box p={2}>
                  <Typography fontWeight={500} fontSize={"1.1rem"}>
                    Any Selected Candidates will be cleared
                  </Typography>
                  <Typography mt={1} fontWeight={400} fontSize={"0.9rem"}>
                    Do you wish to continue?
                  </Typography>
                </Box>
                <Box display={"flex"} justifyContent={"flex-end"} gap={1} p={1}>
                  <Button
                    color="error"
                    onClick={() => {
                      close();
                    }}
                  >
                    cancel
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => {
                      setResend(checkState);
                      close();
                    }}
                  >
                    ok
                  </Button>
                </Box>
              </Box>
            </Dialog>
            <TextField
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ width: "50%" }}
              size="small"
              placeholder="Search by Candidate Name / Application ID"
            />
            <Button variant="contained" onClick={doSearch}>
              Search
            </Button>
          </Box>

          {viewCandidate && (
            <Drawer
              anchor={"right"}
              open={sideOpen}
              onClose={() => setSideOpen(false)}
            >
              <Box
                width={"20rem"}
                p={2}
                display={"flex"}
                flexDirection={"column"}
                height={"100%"}
              >
                <Typography fontSize={"1.05rem"} fontWeight={500}>
                  Candidate Name
                </Typography>
                <Typography fontSize={"1rem"}>{viewCandidate?.name}</Typography>

                <Typography mt={1} fontSize={"1.05rem"} fontWeight={500}>
                  Application Id
                </Typography>
                <Typography fontSize={"0.9rem"}>{viewCandidate.id}</Typography>

                {viewCandidate?.date == "" ? (
                  <Typography fontSize={"1rem"} mt={2}>
                    Exam is not issued for this candidate yet
                  </Typography>
                ) : (
                  <>
                    <Typography mt={1} fontSize={"1.05rem"} fontWeight={500}>
                      Exam Date
                    </Typography>
                    <Typography fontSize={"0.9rem"}>
                      {dayjs(new Date(viewCandidate?.date)).format(
                        "DD MMM YYYY"
                      )}
                    </Typography>

                    <Typography mt={1} fontSize={"1.05rem"} fontWeight={500}>
                      Exam Time
                    </Typography>
                    <Typography fontSize={"0.9rem"}>
                      {dayjs(timeToDate(viewCandidate?.startTime)).format(
                        "hh:mm a"
                      )}
                    </Typography>

                    <Typography mt={1} fontSize={"1.05rem"} fontWeight={500}>
                      Exam Venue
                    </Typography>
                    <Typography fontSize={"0.9rem"}>
                      {viewCandidate?.venue}
                    </Typography>
                  </>
                )}

                <Box
                  mt={"auto"}
                  display={"flex"}
                  gap={1}
                  flexDirection={"column"}
                >
                  <Box display={"flex"} gap={1}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() =>
                        !selected.some((s) => s.id == viewCandidate.id)
                          ? setSelected((prev) => [
                              ...prev,
                              {
                                id: viewCandidate.id,
                                name: viewCandidate.name,
                              },
                            ])
                          : deleteItem(viewCandidate.id)
                      }
                    >
                      {!selected.some((s) => s.id == viewCandidate.id)
                        ? "select"
                        : "Unselect"}
                    </Button>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ color: "white", bgcolor: "#272727" }}
                      onClick={() => {
                        api
                          .post("/admission/test-center/candidate-blacklist/", {
                            id: viewCandidate.id,
                            is_blacklist: viewCandidate.is_blacklist
                              ? false
                              : true,
                          })
                          .then((res) => {
                            fetchData();
                            // setSearchResult([]);
                            setSideOpen(false);
                          });
                      }}
                    >
                      {viewCandidate.is_blacklist ? "Whitelist" : "Blacklist"}
                    </Button>
                  </Box>
                  <Button
                    color="error"
                    variant="outlined"
                    fullWidth
                    onClick={() => setSideOpen(false)}
                  >
                    Close
                  </Button>
                </Box>
              </Box>
            </Drawer>
          )}

          {searchResult.length > 0 &&
            searchResult.filter((res) => !selected.some((s) => s.id == res.id))
              .length > 0 && (
              <Box
                overflow={"auto"}
                sx={{
                  border: "1px solid rgba(0,0,0,0.2)",
                  borderBottom: 0,
                  borderRadius: 0,
                  display: "block",
                }}
              >
                <Box display={"flex"}>
                  <Typography
                    flex={1}
                    minWidth={"100px"}
                    p={1}
                    sx={{
                      borderRight: "1px solid rgba(0,0,0,0.2)",
                      borderBottom: "1px solid rgba(0,0,0,0.2)",
                      bgcolor: "rgba(0,0,0,0.05)",
                      textAlign: "center",
                    }}
                  >
                    Applicant ID
                  </Typography>
                  <Typography
                    flex={2}
                    minWidth={"200px"}
                    p={1}
                    sx={{
                      borderRight: "1px solid rgba(0,0,0,0.2)",
                      borderBottom: "1px solid rgba(0,0,0,0.2)",
                      bgcolor: "rgba(0,0,0,0.05)",
                      textAlign: "center",
                    }}
                  >
                    Candidate Name
                  </Typography>
                  <Typography
                    flex={1}
                    minWidth={"100px"}
                    p={1}
                    sx={{
                      borderRight: "1px solid rgba(0,0,0,0.2)",
                      borderBottom: "1px solid rgba(0,0,0,0.2)",
                      bgcolor: "rgba(0,0,0,0.05)",
                      textAlign: "center",
                    }}
                  >
                    Issue Date
                  </Typography>
                  <Typography
                    flex={1}
                    minWidth={"100px"}
                    p={1}
                    sx={{
                      borderRight: "1px solid rgba(0,0,0,0.2)",
                      borderBottom: "1px solid rgba(0,0,0,0.2)",
                      bgcolor: "rgba(0,0,0,0.05)",
                      textAlign: "center",
                    }}
                  >
                    Applying For
                  </Typography>
                  <Typography
                    flex={1}
                    minWidth={"100px"}
                    p={1}
                    sx={{
                      bgcolor: "rgba(0,0,0,0.05)",
                      borderBottom: "1px solid rgba(0,0,0,0.2)",
                      textAlign: "center",
                    }}
                  >
                    Actions
                  </Typography>
                </Box>

                {searchResult
                  .filter((res) =>
                    !resend ? res.issueDate == "Not Issued" : res
                  )
                  .filter((res) => !selected.some((s) => s.id == res.id))
                  .sort((a, b) => {
                    if (a.id < b.id) {
                      return -1;
                    }
                    if (a.id > b.id) {
                      return 1;
                    }
                    return 0;
                  })
                  .map((app, idx) => (
                    <Box display={"flex"} key={idx}>
                      <Typography
                        flex={1}
                        minWidth={"100px"}
                        p={1}
                        sx={{
                          borderRight: "1px solid rgba(0,0,0,0.2)",
                          borderBottom: "1px solid rgba(0,0,0,0.2)",
                          textAlign: "center",
                        }}
                      >
                        {app.id}
                      </Typography>
                      <Typography
                        flex={2}
                        minWidth={"200px"}
                        p={1}
                        sx={{
                          borderRight: "1px solid rgba(0,0,0,0.2)",
                          borderBottom: "1px solid rgba(0,0,0,0.2)",
                          textAlign: "center",
                        }}
                      >
                        {app.name}
                      </Typography>
                      <Typography
                        flex={1}
                        minWidth={"100px"}
                        p={1}
                        sx={{
                          borderRight: "1px solid rgba(0,0,0,0.2)",
                          borderBottom: "1px solid rgba(0,0,0,0.2)",
                          textAlign: "center",
                        }}
                      >
                        {app.issueDate}
                      </Typography>
                      <Typography
                        flex={1}
                        minWidth={"100px"}
                        p={1}
                        sx={{
                          borderRight: "1px solid rgba(0,0,0,0.2)",
                          borderBottom: "1px solid rgba(0,0,0,0.2)",
                          textAlign: "center",
                        }}
                      >
                        {app.applyingFor}
                      </Typography>

                      <Box
                        flex={1}
                        display={"flex"}
                        minWidth={"100px"}
                        gap={1}
                        justifyContent={"center"}
                        p={1}
                        sx={{
                          borderBottom: "1px solid rgba(0,0,0,0.2)",
                          textAlign: "center",
                        }}
                      >
                        <Button
                          fullWidth
                          variant="contained"
                          size="small"
                          onClick={() =>
                            setSelected((prev) => [
                              ...prev,
                              { id: app.id, name: app.name },
                            ])
                          }
                        >
                          Select
                        </Button>
                        <Button
                          fullWidth
                          variant="outlined"
                          size="small"
                          onClick={() => {
                            setSideOpen(true);
                            setViewCandidate(app);
                          }}
                        >
                          View
                        </Button>
                      </Box>
                    </Box>
                  ))}
              </Box>
            )}

          <Box sx={{ display: selected.length > 0 ? "block" : "none" }}>
            <Typography my={1} mb fontSize={"1rem"} fontWeight={500}>
              Send Admit Card to Selected Candidates
            </Typography>
            <Box display={"flex"} gap={2}>
              <Box flex={1}>
                <Box
                  overflow={"auto"}
                  maxHeight={"15rem"}
                  sx={{
                    border: "1px solid rgba(0,0,0,0.2)",
                    // borderBottom: 0,
                    borderRadius: 0,
                  }}
                >
                  <Box display={"flex"}>
                    <Typography
                      flex={2}
                      minWidth={"150px"}
                      p={1}
                      sx={{
                        borderRight: "1px solid rgba(0,0,0,0.2)",
                        borderBottom: "1px solid rgba(0,0,0,0.2)",
                        bgcolor: "rgba(0,0,0,0.05)",
                        textAlign: "center",
                      }}
                    >
                      Applicant ID
                    </Typography>
                    <Typography
                      flex={2}
                      minWidth={"200px"}
                      p={1}
                      sx={{
                        borderRight: "1px solid rgba(0,0,0,0.2)",
                        borderBottom: "1px solid rgba(0,0,0,0.2)",
                        bgcolor: "rgba(0,0,0,0.05)",
                        textAlign: "center",
                      }}
                    >
                      Candidate Name
                    </Typography>
                    <Typography
                      flex={1}
                      minWidth={"60px"}
                      p={1}
                      sx={{
                        // borderRight: "1px solid rgba(0,0,0,0.2)",
                        borderBottom: "1px solid rgba(0,0,0,0.2)",
                        bgcolor: "rgba(0,0,0,0.05)",
                        textAlign: "center",
                      }}
                    >
                      Action
                    </Typography>
                  </Box>

                  {selected
                    .sort((a, b) => {
                      if (a.id < b.id) {
                        return -1;
                      }
                      if (a.id > b.id) {
                        return 1;
                      }
                      return 0;
                    })
                    .map((sel, idx) => (
                      <Box
                        display={"flex"}
                        sx={{
                          "&:not(:last-child)": {
                            borderBottom: "1px solid rgba(0,0,0,0.2)",
                          },
                        }}
                      >
                        <Typography
                          flex={2}
                          minWidth={"150px"}
                          p={1}
                          sx={{
                            borderRight: "1px solid rgba(0,0,0,0.2)",

                            textAlign: "center",
                          }}
                        >
                          {sel.id}
                        </Typography>
                        <Typography
                          flex={2}
                          minWidth={"200px"}
                          p={1}
                          sx={{
                            borderRight: "1px solid rgba(0,0,0,0.2)",

                            textAlign: "center",
                          }}
                        >
                          {sel.name}
                        </Typography>
                        <Box
                          flex={1}
                          minWidth={"60px"}
                          p={1}
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          <IconButton
                            color="error"
                            onClick={() => deleteItem(sel.id)}
                          >
                            <DeleteForever />
                          </IconButton>
                        </Box>
                      </Box>
                    ))}
                </Box>
              </Box>
              <Bbox flex={2} p={2} borderRadius={1}>
                <Grid container spacing={1} rowSpacing={2}>
                  <Grid item xs={3}>
                    <DatePicker
                      disabled={resend}
                      onChange={(val) =>
                        handleChange({
                          target: {
                            name: "date",
                            value: val,
                          },
                        })
                      }
                      value={playload.date}
                      label="Exam Date"
                      sx={{ mt: 2, width: "100%" }}
                      format="DD MMM YYYY"
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      disabled={resend}
                      name="venue"
                      onChange={handleChange}
                      value={playload.venue}
                      label="Exam Venue"
                      fullWidth
                      sx={{ mt: 2 }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TimePicker
                      disabled={resend}
                      onChange={(val) =>
                        handleChange({
                          target: {
                            name: "time",
                            value: dayjs(val),
                          },
                        })
                      }
                      value={dayjs(playload.time)}
                      sx={{ width: "100%" }}
                      label="Select Start Time"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TimePicker
                      disabled={resend}
                      minTime={dayjs(playload?.time)}
                      onChange={(val) =>
                        handleChange({
                          target: {
                            name: "end_time",
                            value: dayjs(val),
                          },
                        })
                      }
                      value={dayjs(playload.end_time)}
                      sx={{ width: "100%" }}
                      label="Select End Time"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    display={"flex"}
                    alignItems={"center"}
                    gap={1}
                  >
                    <LoadingButton
                      loading={admitLoding}
                      fullWidth
                      size="medium"
                      variant="contained"
                      onClick={sendAdmit}
                    >
                      {resend ? "Resend" : "Send"} Admit Card
                    </LoadingButton>

                    <LoadingButton
                      loading={downloadLoding}
                      size="medium"
                      fullWidth
                      variant="outlined"
                      onClick={downloadAdmit}
                    >
                      View Admit Card
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Bbox>
            </Box>
          </Box>
        </Box>
      </Bbox>

      <Bbox borderRadius={1} p={1} mt={2}>
        <Typography
          p={1}
          px={2}
          borderRadius={1}
          bgcolor={"#f2f2f2"}
          fontWeight={600}
        >
          Admit Card - Bulk Manage
        </Typography>
        <Grid container spacing={2} py={1}>
          <Grid item xs={4}>
            <Button
              fullWidth
              variant="contained"
              LinkComponent={Link}
              to="bulk-manage"
            >
              Issue Admit Card
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth variant="outlined">
              Download Report
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth variant="outlined">
              Download Admit Card
            </Button>
          </Grid>
        </Grid>
      </Bbox>
    </>
  );
};

export default IssueAdmitCard;
