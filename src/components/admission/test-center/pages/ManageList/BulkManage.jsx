import {
  Avatar,
  Badge,
  Box,
  Button,
  ButtonBase,
  Card,
  Checkbox,
  Chip,
  CircularProgress,
  Dialog,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Bbox from "../../../../UiComponents/Bbox";
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
import { Icons, ToastContainer, toast } from "react-toastify";
import { Download, Mail } from "@mui/icons-material";
import { Icon } from "@iconify/react";
import { DataGrid } from "@mui/x-data-grid";
import ReignsPopup from "../../../../UiComponents/ReignsPopup";

const BulkManage = () => {
  const [classes, setClasses] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [generatebatchLoading, setgeneratebatchLoading] = useState(false);

  function fetchData() {
    api
      .get("/admission/test-center/issue-admit-card/create-batch/")
      .then((res) => {
        console.log(res.data);
        setClasses(res.data.classes);
        if (selectedClass)
          setSelectedClass(
            res.data.classes.find(
              (c) => c.applying_for == selectedClass.applying_for
            )
          );
      })
      .catch((err) => {});
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {}, [selectedClass]);

  function timeToDate(timeString) {
    var timeParts = timeString.split(":");
    var hours = parseInt(timeParts[0], 10);
    var minutes = parseInt(timeParts[1], 10);
    var seconds = parseInt(timeParts[2], 10);

    var dateObject = new Date();

    dateObject.setHours(hours);
    dateObject.setMinutes(minutes);
    dateObject.setSeconds(seconds);

    return dateObject;
  }

  const [playload, setPlayload] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayload((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {}, [playload]);

  function generateBatches() {
    setgeneratebatchLoading(true);
    api
      .put("/admission/test-center/issue-admit-card/create-batch/", {
        applyingFor: selectedClass?.applying_for,
        max_candidates_per_badge: parseInt(batchSettings.max_number),
        check_non_issued: batchSettings.is_issued,
        admit_card_type: batchSettings.admit_card_type,
      })
      .then((res) => {
        if (res.data.length == 0)
          toast.error("No Applicants in this class to generate batches");
        else {
          toast.success(
            `${res.data.length} batches created for class ${selectedClass?.applying_for}`
          );
        }

        fetchData();
        // setSelectedClass(null);
      })
      .catch((err) => {})
      .finally(() => {
        setgeneratebatchLoading(false);
      });
  }

  // handle batch settings

  const [batchSettings, setBatchSettings] = useState({
    is_issued: false,
    max_number: 0,
    admit_card_type: "Online Test",
  });

  useEffect(() => {}, [batchSettings]);

  useEffect(() => {
    console.log(playload);
  }, [playload]);

  function handleSettingChange(name, value) {
    setBatchSettings((prev) => ({ ...prev, [name]: value }));
  }

  // select Batch

  const [selectBatch, setSelectBatch] = useState(null);
  const [openbatchPopup, setOpenbatchPopup] = useState(false);
  const [saveBatchButtonLoading, setSaveBatchButtonLoading] = useState(false);

  useEffect(() => {
    selectBatch &&
      setPlayload((prev) => ({
        ...prev,
        applyingFor: selectedClass.applying_for,
        batch_id: selectBatch?.batch_no,
        exam_date:
          selectBatch?.exam_date ?? dayjs(new Date()).format("YYYY-MM-DD"),
        start_time: selectBatch?.start_time ?? "00:00:00",
        end_time: selectBatch?.end_time ?? "00:00:00",
        venue: selectBatch?.venue ?? "",
      }));
  }, [selectBatch]);

  const [disabledLoading, setDisabledLoading] = useState(false);

  // batch send admit card

  const [batchAdmitSentLoding, setBatchAdmitSendLoading] = useState(null);
  const [sendAllAdmitLoading, setAllAdmitLoading] = useState(false);

  const [openPopup, setOpenPopup] = useState(false);

  const [openConfirm, setOpenConfirm] = useState(false);

  return (
    <>
      <ToastContainer />
      <Bbox borderRadius={1} p={1}>
        <Typography
          p={1}
          px={2}
          borderRadius={1}
          bgcolor={"#f2f2f2"}
          fontWeight={600}
        >
          Issue Admit Card
        </Typography>

        <Bbox mt={2} display={"flex"} borderRadius={1}>
          {/* left */}
          <Box
            width={"15rem"}
            height={"65vh"}
            overflow={"auto"}
            display={"flex"}
            // bgcolor={'primary.lighter'}
            gap={1}
            flexDirection={"column"}
            sx={{ borderRight: "1px solid rgba(0,0,0,0.1)" }}
            p={2}
          >
            {classes?.map((cl, idx) => (
              <ButtonBase
                key={idx}
                sx={{
                  padding: 1,
                  px: 2,
                  bgcolor: `${
                    selectedClass?.applying_for == cl.applying_for
                      ? "primary.main"
                      : "white"
                  }`,
                  color: `${
                    selectedClass?.applying_for != cl.applying_for
                      ? "primary.main"
                      : "white"
                  }`,
                  border: "1px solid blue",
                  borderColor: "primary.main",
                  borderRadius: 1,
                }}
                onClick={() => {
                  setSelectedClass(
                    classes.find((c) => c.applying_for == cl.applying_for)
                  );
                }}
              >
                <Typography>Class {cl.applying_for}</Typography>
              </ButtonBase>
            ))}
          </Box>

          {/* popup */}

          {selectBatch && (
            <Dialog
              maxWidth="md"
              fullWidth
              open={openbatchPopup}
              onClose={() => setOpenbatchPopup(false)}
            >
              <Box flex={2} p={2} borderRadius={1}>
                <Typography fontSize={"1rem"} fontWeight={500}>
                  {selectBatch?.batch_no}
                </Typography>
                <Grid container spacing={1} rowSpacing={2}>
                  <Grid item xs={3}>
                    <DatePicker
                      defaultValue={dayjs(
                        new Date(selectBatch?.exam_date ?? new Date())
                      )}
                      onChange={(val) => {
                        handleChange({
                          target: {
                            name: "exam_date",
                            value: dayjs(new Date(val)).format("YYYY-MM-DD"),
                          },
                        });
                      }}
                      label="Exam Date"
                      sx={{ mt: 2, width: "100%" }}
                      format="DD MMM YYYY"
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      name="venue"
                      defaultValue={selectBatch?.venue}
                      onChange={handleChange}
                      label="Exam Venue"
                      fullWidth
                      sx={{ mt: 2 }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TimePicker
                      // defaultValue={dayjs(timeToDate(selectBatch?.start_time == null))}
                      defaultValue={
                        selectBatch?.start_time ?? false
                          ? dayjs(timeToDate(selectBatch?.start_time))
                          : dayjs(timeToDate("00:00:00"))
                      }
                      onChange={(val) =>
                        handleChange({
                          target: {
                            name: "start_time",
                            value: dayjs(val).format("HH:mm:ss"),
                          },
                        })
                      }
                      sx={{ width: "100%" }}
                      label="Select Start Time"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TimePicker
                      defaultValue={
                        selectBatch?.end_time ?? false
                          ? dayjs(timeToDate(selectBatch?.start_time))
                          : dayjs(timeToDate("00:00:00"))
                      }
                      minTime={dayjs(
                        timeToDate(playload?.start_time ?? "00:00:00")
                      )}
                      onChange={(val) =>
                        handleChange({
                          target: {
                            name: "end_time",
                            value: dayjs(val).format("HH:mm:ss"),
                          },
                        })
                      }
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
                      loading={saveBatchButtonLoading}
                      fullWidth
                      // color="success"
                      // sx={{color:'white'}}
                      variant="contained"
                      onClick={() => {
                        setSaveBatchButtonLoading(true);
                        api
                          .post(
                            "/admission/test-center/issue-admit-card/create-batch/",
                            playload
                          )
                          .then((res) => {
                            toast.success(
                              `${playload.batch_id} is saved successfully`
                            );
                            fetchData();
                          })
                          .catch((err) => {})
                          .finally(() => {
                            setSaveBatchButtonLoading(false);
                          });
                      }}
                    >
                      Save Batch
                    </LoadingButton>
                    <LoadingButton
                      loading={batchAdmitSentLoding == selectBatch?.batch_no}
                      onClick={() => {
                        setBatchAdmitSendLoading(selectBatch?.batch_no);
                        api
                          .post(
                            "/admission/test-center/issue-admit-card/create-batch/",
                            playload
                          )
                          .then((res) => {
                            api
                              .post(
                                `/admission/test-center/send-admit-card/${selectedClass?.applying_for}/${selectBatch?.batch_no}/?resend=${selectBatch?.is_mail_sent}`
                              )
                              .then((res) => {
                                toast.success(res.data.message);
                                fetchData();
                                setBatchAdmitSendLoading(null);
                                setOpenbatchPopup(false);
                              })
                              .catch((err) => {
                                toast.error(
                                  err.response.data.message ||
                                    "Some error occurred"
                                );
                              });
                          })
                          .catch((err) => {})
                          .finally(() => {
                            setSaveBatchButtonLoading(false);
                          });
                        setOpenConfirm(true);
                      }}
                      fullWidth
                      size="medium"
                      variant="contained"
                      // color={selectBatch.is_mail_sent ? "warning" : "primary"}
                    >
                      {selectBatch.is_mail_sent ? "resend" : "Send Admit Card"}
                    </LoadingButton>

                    <LoadingButton
                      disabled
                      size="medium"
                      fullWidth
                      variant="outlined"
                    >
                      Download Sample Admit Card
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Box>
            </Dialog>
          )}

          {/* right */}
          {selectedClass ? (
            selectedClass.batches.length > 0 ? (
              <Box
                p={2}
                flex={1}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"flex-start"}
              >
                <Typography
                  fontSize={"1rem"}
                  borderRadius={1}
                  color={"white"}
                  fontWeight={400}
                  p={0.5}
                  px={1}
                  bgcolor={"primary.main"}
                  width={"100%"}
                >
                  Generated Batches for Class {selectedClass?.applying_for}
                </Typography>
                <Box
                  display={"flex"}
                  flexWrap={"wrap"}
                  gap={2}
                  mt={1}
                  height={"47vh"}
                  overflow={"auto"}
                  pb={2}
                  pt={2}
                  width={"100%"}
                >
                  {selectedClass?.batches
                    .sort(function (a, b) {
                      var batchNumberA = parseInt(a.batch_no.split(" ")[1]);
                      var batchNumberB = parseInt(b.batch_no.split(" ")[1]);
                      return batchNumberA - batchNumberB;
                    })
                    .map((bat, idx) => (
                      <Card
                        key={idx}
                        elevation={10}
                        sx={{
                          borderRadius: 1,
                          border: "1px solid #eeeeee",
                          display: "flex",
                          flexDirection: "column",
                          height: "fit-content",
                          position: "relative",
                          overflow: "visible",
                        }}
                      >
                        <Tooltip title="Download">
                          <Box
                            sx={{
                              position: "absolute",
                              right: 0,
                              top: 0,
                              zIndex: 2000,
                              transform: "translateX(50%) translateY(-50%)",
                            }}
                            bgcolor={"#ffffff"}
                            borderRadius={50}
                            padding={0.05}
                            boxShadow={"0 0 10px -1px rgba(0,0,0,0.2)"}
                            border={"1px solid transparent"}
                          >
                            <IconButton size="small" color="primary">
                              <Icon icon={"material-symbols:download"} />
                            </IconButton>
                          </Box>
                        </Tooltip>
                        <Box borderRadius={1} overflow={'hidden'}>
                          <Box
                            bgcolor={
                              bat?.is_disabled
                                ? "#8e8e8e"
                                : bat.is_mail_sent == null
                                ? "warning.main"
                                : bat.is_mail_sent
                                ? "success.main"
                                : "error.main"
                            }
                            height={8}
                          />
                          <Box
                            px={2}
                            py={1.4}
                            width={"18rem"}
                            position={"relative"}
                          >
                            {bat.is_disabled && (
                              <Box
                                sx={{
                                  position: "absolute",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  backgroundColor: "rgba(195, 192, 192, 0.1)",
                                  backdropFilter: "blur(2px)",
                                }}
                              >
                                <Icon
                                  fontSize={"4rem"}
                                  icon="ic:outline-block"
                                  color="#8e8e8e"
                                />
                              </Box>
                            )}
                            <Box
                              display={"flex"}
                              justifyContent={"space-between"}
                              alignItems={"center"}
                              gap={1}
                            >
                              <Typography
                                mr={"auto"}
                                fontSize={"1.1rem"}
                                fontWeight={500}
                              >
                                {bat.batch_no}{" "}
                              </Typography>
                              <Chip
                                size="small"
                                sx={{ px: 1 }}
                                color={
                                  bat.is_mail_sent == null
                                    ? "warning"
                                    : bat.is_mail_sent
                                    ? "success"
                                    : "error"
                                }
                                icon={<Mail />}
                                label={
                                  bat.is_mail_sent == null
                                    ? "Pending"
                                    : bat.is_mail_sent
                                    ? "Sent"
                                    : "Not Sent"
                                }
                                variant="outlined"
                              />
                            </Box>

                            <Box
                              display={"flex"}
                              pt={0.8}
                              justifyContent={"space-between"}
                              alignItems={"center"}
                            >
                              <Typography fontSize={"0.8rem"} fontWeight={400}>
                                Candidates Allocated:
                              </Typography>
                              <Typography fontSize={"0.9rem"} fontWeight={400}>
                                {bat.application?.length}
                              </Typography>
                            </Box>
                            <Box
                              display={"flex"}
                              pt={0.8}
                              justifyContent={"space-between"}
                              alignItems={"center"}
                            >
                              <Typography fontSize={"0.8rem"} fontWeight={400}>
                                Exam Date
                              </Typography>
                              <Typography fontSize={"0.9rem"} fontWeight={400}>
                                {bat.exam_date
                                  ? dayjs(new Date(bat.exam_date)).format(
                                      "DD MMM YYYY"
                                    )
                                  : "Not Issued"}
                              </Typography>
                            </Box>
                            <Box
                              display={"flex"}
                              pt={0.8}
                              justifyContent={"space-between"}
                              alignItems={"center"}
                            >
                              <Typography fontSize={"0.8rem"} fontWeight={400}>
                                Exam Start
                              </Typography>
                              <Typography fontSize={"0.9rem"} fontWeight={400}>
                                {bat.start_time == null
                                  ? "Not Issued"
                                  : dayjs(timeToDate(bat.start_time)).format(
                                      "hh:mm a"
                                    )}
                              </Typography>
                            </Box>
                            <Box
                              display={"flex"}
                              pt={0.8}
                              justifyContent={"space-between"}
                              alignItems={"center"}
                            >
                              <Typography fontSize={"0.8rem"} fontWeight={400}>
                                Exam End
                              </Typography>
                              <Typography fontSize={"0.9rem"} fontWeight={400}>
                                {bat.end_time == null
                                  ? "Not Issued"
                                  : dayjs(timeToDate(bat.end_time)).format(
                                      "hh:mm a"
                                    )}
                              </Typography>
                            </Box>
                            <Box
                              display={"flex"}
                              pt={0.8}
                              justifyContent={"space-between"}
                              alignItems={"center"}
                              mb={1}
                            >
                              <Typography fontSize={"0.8rem"} fontWeight={400}>
                                Exam Venue
                              </Typography>
                              <Typography
                                width={"50%"}
                                overflow={"hidden"}
                                whiteSpace={"nowrap"}
                                textOverflow={"ellipsis"}
                                textAlign={"right"}
                                fontSize={"0.9rem"}
                                fontWeight={400}
                              >
                                {bat.venue == null ? "Not Issued" : bat.venue}
                              </Typography>
                            </Box>
                          </Box>

                          <Box
                            display={"flex"}
                            mt={"auto"}
                            borderTop={"1px solid #e4e4e4"}
                          >
                            <Button
                              variant="contained"
                              sx={{ borderRadius: 0 }}
                              disabled={bat?.is_disabled}
                              fullWidth
                              onClick={() => {
                                setOpenbatchPopup(true);
                                setSelectBatch(bat);
                              }}
                            >
                              Enter Details
                            </Button>
                            <LoadingButton
                              loading={disabledLoading == bat.batch_no}
                              color="error"
                              sx={{
                                borderRadius: 0,
                                color: bat.is_disabled ? "primary.main" : "red",
                              }}
                              fullWidth
                              onClick={() => {
                                setDisabledLoading(bat.batch_no);
                                api
                                  .patch(
                                    "/admission/test-center/issue-admit-card/create-batch/",
                                    {
                                      id: bat.id,
                                    }
                                  )
                                  .then((res) => {
                                    toast.info(res.data.message);
                                    fetchData();
                                  })
                                  .catch((err) => {})
                                  .finally(() => setDisabledLoading(false));
                              }}
                            >
                              {bat.is_disabled ? "Enable" : "Disable"}
                            </LoadingButton>
                          </Box>
                        </Box>
                      </Card>
                    ))}
                </Box>
                <Box mt={"auto"} display={"flex"} gap={1}>
                  <Button
                    variant="outlined"
                    color="info"
                    onClick={() => {
                      api
                        .delete(
                          "/admission/test-center/issue-admit-card/create-batch/",
                          {
                            data: { applyingFor: selectedClass?.applying_for },
                          }
                        )
                        .then((res) => {
                          fetchData();
                          // setSelectedClass(null);
                        })
                        .catch((err) => {});
                    }}
                  >
                    Reset
                  </Button>
                  <LoadingButton
                    loading={sendAllAdmitLoading}
                    variant="contained"
                    disabled={selectedClass.batches.every((b) => b.is_disabled)}
                    onClick={() => {
                      setOpenConfirm(true);
                    }}
                  >
                    Send Admit Card
                  </LoadingButton>
                  <ReignsPopup
                    desc={`Upon confirmation, admit cards will be promptly sent to all Class ${selectedClass?.applying_for} batches`}
                    open={openConfirm}
                    onCancel={() => {
                      setOpenConfirm(false);
                    }}
                    close={() => {
                      setOpenConfirm(false);
                    }}
                    onAccept={() => {
                      setAllAdmitLoading(true);
                      api
                        .post(
                          `/admission/test-center/send-admit-card/${selectedClass?.applying_for}/all/`
                        )
                        .then((res) => {
                          toast.success(res.data.message);
                          setAllAdmitLoading(false);
                          fetchData();
                        })
                        .catch((err) => {
                          toast.error(
                            err.response.data.message || "Some error occurred"
                          );
                        });
                    }}
                  />
                </Box>
              </Box>
            ) : (
              <Box
                p={2}
                flex={1}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"start"}
              >
                <Typography
                  fontSize={"1rem"}
                  borderRadius={1}
                  color={"white"}
                  fontWeight={400}
                  p={0.5}
                  px={1}
                  mb={1}
                  bgcolor={"primary.main"}
                  width={"100%"}
                >
                  Class {selectedClass?.applying_for}
                </Typography>
                <Box>
                  <FormControl>
                    <FormControlLabel
                      label="Only Issue admit card for candidates whose admit card has not been issued yet."
                      control={<Checkbox />}
                      onChange={(_, c) => handleSettingChange("is_issued", c)}
                      checked={batchSettings.is_issued}
                    />
                  </FormControl>
                  <Box mt={2} display={"flex"} gap={2} alignItems={"center"}>
                    <Typography>
                      {selectedClass?.extras.count} candidates have been
                      selected
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={() => setOpenPopup(true)}
                    >
                      View
                    </Button>
                  </Box>
                </Box>
                {/* popup */}

                <Dialog
                  maxWidth="md"
                  fullWidth
                  open={openPopup}
                  onClose={() => setOpenPopup(false)}
                >
                  <>
                    <Box p={2}>
                      <DataGrid
                        rows={selectedClass?.extras.applications?.map(
                          (a, i) => ({
                            appid: a.application_id,
                            gender: `${a.candidate_details.gender}`,
                            nation: `${a.candidate_details.nationality}`,
                            name: `${a.candidate_details.first_name} ${a.candidate_details.middle_name} ${a.candidate_details.last_name}`,
                            id: i,
                          })
                        )}
                        columns={[
                          {
                            field: "name",
                            headerName: "name",
                            flex: 1,
                          },
                          {
                            field: "appid",
                            headerName: "Application Id",
                            flex: 1,
                          },
                          {
                            field: "gender",
                            headerName: "Gender",
                            flex: 1,
                          },
                          {
                            field: "nation",
                            headerName: "Nationality",
                            flex: 1,
                          },
                        ]}
                      />
                    </Box>
                    <Button color="error" onClick={() => setOpenPopup(false)}>
                      CLOSE
                    </Button>
                  </>
                </Dialog>

                <Box mt={2} display={"flex"} gap={2} alignItems={"center"}>
                  <Typography>
                    Maximum number of candidates allowed per batch
                  </Typography>
                  <TextField
                    type="number"
                    sx={{ width: "6ch" }}
                    size="small"
                    onChange={(e) =>
                      handleSettingChange("max_number", e.target.value)
                    }
                    value={batchSettings.max_number}
                  />
                </Box>
                <Box mt={2} display={"flex"} gap={2} alignItems={"center"}>
                  <FormControl sx={{ width: "10rem" }}>
                    <InputLabel>Admit Card Type</InputLabel>
                    <Select
                      label="Admit Card Type"
                      onChange={(e) =>
                        handleSettingChange("admit_card_type", e.target.value)
                      }
                      value={batchSettings.admit_card_type}
                    >
                      {[
                        "Online Test",
                        "Offline Test",
                        "Online Test & Interview",
                        "Offline Test & Interview",
                        "Only Interview",
                      ].map((m, i) => (
                        <MenuItem key={i} value={m}>
                          {m}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <LoadingButton
                  loading={generatebatchLoading}
                  sx={{ mt: "auto" }}
                  variant="contained"
                  onClick={() => {
                    generateBatches();
                    // fetchData();
                    // setSelectedClass(null);
                  }}
                >
                  Generate Batches
                </LoadingButton>
              </Box>
            )
          ) : (
            <Box
              height={"65vh"}
              flex={1}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography fontSize={"1.3rem"} color={"gray"}>
                Select a class to generate batches
              </Typography>
            </Box>
          )}
        </Bbox>
      </Bbox>
    </>
  );
};

export default BulkManage;
