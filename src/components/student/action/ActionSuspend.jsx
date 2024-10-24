import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  Grid,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Divider,
  InputAdornment,
} from "@mui/material";
import RevealCard from "../../AnimationComponents/RevealCard";
import Bbox from "../../UiComponents/Bbox";
import { fontWeight, width } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers";
import Vector from "../../../assets/icons/Vector.png";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Icon } from "@iconify/react";
import ReignsSelect from "../../UiComponents/ReignsSelect";
import useClasses from "../../../hooks/useClasses";
import Profile from "../../../assets/icons/photo.png";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { ToastContainer, toast } from "react-toastify";
import Frame from "../../../assets/icons/frame.png";
import Rectangle1 from "../../../assets/icons/rectangle1.png";

const ActionSuspend = () => {
  const [multiple, setMultiple] = useState(true);
  const [extendedView, setExtendedView] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [progress, setProgress] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [value, setValue] = useState("");

  const { suspend } = useClasses();

  const handleCloseDialog = () => {
    toast.success("Action submitted successfully", {
      autoClose: 3000,
    });
    setTimeout(() => {
      setOpenDialog(false);
    }, 2000);
  };

  const cardData = [
    {
      name: "John Doe",
      classname: "5",
      section: "A",
      roll: 1,
      studentid: "12345",
      balance: 1000,
      status: "Active",
    },
    {
      name: "John Doe",
      classname: "5",
      section: "A",
      roll: 1,
      studentid: "12345",
      balance: 1000,
      status: "Active",
    },
    {
      name: "John Doe",
      classname: "5",
      section: "A",
      roll: 1,
      studentid: "12345",
      balance: 1000,
      status: "Active",
    },
    {
      name: "John Doe",
      classname: "5",
      section: "A",
      roll: 1,
      studentid: "12345",
      balance: 1000,
      status: "Active",
    },
    {
      name: "John Doe",
      classname: "5",
      section: "A",
      roll: 1,
      studentid: "12345",
      balance: 1000,
      status: "Active",
    },
    {
      name: "John Doe",
      classname: "5",
      section: "A",
      roll: 1,
      studentid: "12345",
      balance: 1000,
      status: "Active",
    },
    {
      name: "John Doe",
      classname: "5",
      section: "A",
      roll: 1,
      studentid: "12345",
      balance: 1000,
      status: "Active",
    },
    {
      name: "John Doe",
      classname: "5",
      section: "A",
      roll: 1,
      studentid: "12345",
      balance: 1000,
      status: "Active",
    },
    {
      name: "John Doe",
      classname: "5",
      section: "A",
      roll: 1,
      studentid: "12345",
      balance: 1000,
      status: "Active",
    },
    {
      name: "John Doe",
      classname: "5",
      section: "A",
      roll: 1,
      studentid: "12345",
      balance: 1000,
      status: "Active",
    },
    {
      name: "John Doe",
      classname: "5",
      section: "A",
      roll: 1,
      studentid: "12345",
      balance: 1000,
      status: "Active",
    },
    {
      name: "John Doe",
      classname: "5",
      section: "A",
      roll: 1,
      studentid: "12345",
      balance: 1000,
      status: "Active",
    },
  ];

  return (
    <RevealCard>
      <ToastContainer />
      <Bbox
        sx={{
          marginTop: "2",
          width: "100%",
          height:
            progress === 1
              ? multiple
                ? extendedView
                  ? "1150px"
                  : "830px"
                : "830px"
              : progress === 2
              ? multiple
                ? extendedView
                  ? "1350px"
                  : "1050px"
                : "1050px"
              : "0px",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        {progress === 1 ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent={"center"}
            paddingTop={"20px"}
          >
            <Box>
              <Box display="flex" alignItems="center">
                <Box
                  width={60}
                  height={60}
                  borderRadius="50%"
                  bgcolor="#2F7DA1"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize={36}
                  fontWeight={700}
                  color="white"
                >
                  1
                </Box>

                <Box height={8} width={25} bgcolor="#2F7DA1" />
              </Box>

              <Typography fontSize={14} fontWeight={500} color={"#2F7DA1"}>
                Suspend
              </Typography>
            </Box>

            <Box>
              <Box display="flex" alignItems="center">
                <Box height={8} width={25} bgcolor="#ECEDED" />

                <Box
                  width={60}
                  height={60}
                  borderRadius="50%"
                  bgcolor="#ECEDED"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize={36}
                  fontWeight={700}
                  color="#2F7DA1"
                >
                  2
                </Box>
              </Box>

              <Typography
                fontSize={14}
                fontWeight={500}
                color={"#2F7DA1"}
                ml={4}
              >
                Penalty
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box
            display="flex"
            alignItems="center"
            justifyContent={"center"}
            paddingTop={"20px"}
          >
            <Box>
              <Box display="flex" alignItems="center">
                <Box
                  width={60}
                  height={60}
                  borderRadius="50%"
                  bgcolor="#2F7DA1"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize={36}
                  fontWeight={700}
                  color="white"
                >
                  1
                </Box>

                <Box height={8} width={25} bgcolor="#2F7DA1" />
              </Box>

              <Typography fontSize={14} fontWeight={500} color={"#2F7DA1"}>
                Suspend
              </Typography>
            </Box>

            <Box>
              <Box display="flex" alignItems="center">
                <Box height={8} width={25} bgcolor="#2F7DA1" />

                <Box
                  width={60}
                  height={60}
                  borderRadius="50%"
                  bgcolor="#2F7DA1"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize={36}
                  fontWeight={700}
                  color="white"
                >
                  2
                </Box>
              </Box>

              <Typography
                fontSize={14}
                fontWeight={500}
                color={"#2F7DA1"}
                ml={4}
              >
                Penalty
              </Typography>
            </Box>
          </Box>
        )}

        <Box sx={{ marginRight: "20px", marginLeft: "20px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginTop: "15px",
              height: "70px",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <img src={Frame} alt="frame" style={{ width: "25%" }} />
              <Typography
                sx={{
                  fontWeight: "600",
                  position: "absolute",
                  paddingLeft: "20px",
                  color: "white",
                }}
              >
                Incident#: #112233
              </Typography>
            </Box>

            <Box
              sx={{
                width: "100%",
                height: "100%",
                backgroundColor: "#ECEDED",
                borderRadius: "6px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "500",
                  marginLeft: "15px",
                  marginBottom: "5px",
                  marginTop: "9px",
                }}
              >
                Suspend
              </Typography>
            </Box>

            {multiple ? (
              <Box>
                {extendedView ? (
                  <Box>
                    <Bbox
                      sx={{
                        width: "100%",
                        padding: "10px",
                        marginTop: "20px",
                        borderRadius: "6px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Box sx={{ padding: "10px" }}>
                        <img src={Vector} alt="Vector" />
                      </Box>

                      <Typography
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "20px",
                          color: "#00494e",
                          paddingLeft: "20px",
                        }}
                      >
                        <Typography
                          sx={{ fontSize: "50px", paddingRight: "20px" }}
                        >
                          25
                        </Typography>
                        Students selected
                      </Typography>
                    </Bbox>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        padding: "10px",
                        marginTop: "-50px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column-reverse",
                          width: "100px",
                        }}
                      >
                        <Button
                          onClick={() => {
                            setExtendedView(!extendedView);
                          }}
                        >
                          view less
                        </Button>
                      </Box>
                    </Box>

                    <Grid container spacing={1} sx={{ paddingTop: "10px" }}>
                      {cardData.map((cardData, index) => (
                        <Grid item xs={3} key={index}>
                          <ActionCard {...cardData} />
                        </Grid>
                      ))}
                    </Grid>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row-reverse",
                        paddingTop: "20px",
                        paddingRight: "20px",
                        gap: "20px",
                      }}
                    >
                      <IconButton sx={{ border: "0.25px solid black" }}>
                        <ArrowRightIcon />
                      </IconButton>
                      <IconButton sx={{ border: "0.25px solid black" }}>
                        <ArrowLeftIcon />
                      </IconButton>
                    </Box>
                  </Box>
                ) : (
                  <Bbox
                    sx={{
                      width: "600px",
                      padding: "10px",
                      marginTop: "20px",
                      borderRadius: "6px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ padding: "40px" }}>
                      <img src={Vector} alt="Vector" />
                    </Box>

                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "20px",
                        color: "#00494e",
                        padding: "20px",
                      }}
                    >
                      <Typography
                        sx={{ fontSize: "50px", paddingRight: "20px" }}
                      >
                        25
                      </Typography>
                      Students selected
                    </Typography>

                    <Box
                      sx={{ display: "flex", flexDirection: "column-reverse" }}
                    >
                      <Button
                        onClick={() => {
                          setExtendedView(!extendedView);
                        }}
                      >
                        view more
                      </Button>
                    </Box>
                  </Bbox>
                )}
              </Box>
            ) : (
              <Bbox
                sx={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "20px",
                  borderRadius: "6px",
                  height: "200px",
                }}
              >
                <img
                  src={Rectangle1}
                  alt="rectangle"
                  style={{
                    position: "absolute",
                    marginTop: "-10px",
                    marginLeft: "-10px",
                    height: "186px",
                    borderRadius: "6px",
                  }}
                />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    backgroundColor: "transparent",
                    alignItems: "center",
                    paddingLeft: "20px",
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Box
                      sx={{
                        height: "9rem",
                        width: "9rem",
                        backgroundColor: "#ECEDED",
                        borderRadius: "6px",
                        zIndex: "1",
                      }}
                    >
                      <Box>
                        <img
                          src={Profile}
                          alt="profile pic"
                          style={{ width: "100%", height: "100%" }}
                        />
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "20px",
                        width: "250px",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          padding: "3px",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography sx={{ width: "100px" }}>
                          Student Name
                        </Typography>
                        <Typography sx={{ fontWeight: "700" }}>:</Typography>
                        <Typography sx={{ fontWeight: "700", width: "70px" }}>
                          Jay Shaw
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          padding: "3px",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography sx={{ width: "100px" }}>
                          Student ID
                        </Typography>
                        <Typography sx={{ fontWeight: "700" }}>:</Typography>
                        <Typography sx={{ fontWeight: "700", width: "70px" }}>
                          STU2201
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          padding: "3px",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography sx={{ width: "100px" }}>Status</Typography>
                        <Typography sx={{ fontWeight: "700" }}>:</Typography>
                        <Box
                          sx={{
                            backgroundColor: "#C6F6D5",
                            padding: "2px 4px",
                            borderRadius: "6px",
                            width: "70px",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Typography sx={{ fontWeight: "700" }}>
                            Active
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ border: "0.01px solid #c2c2c2" }}
                    />

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "20px",
                        width: "200px",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          padding: "3px",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography sx={{ width: "70px" }}>Class</Typography>
                        <Typography sx={{ fontWeight: "700" }}>:</Typography>
                        <Typography sx={{ fontWeight: "700", width: "40px" }}>
                          V
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          padding: "3px",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography sx={{ width: "70px" }}>Section</Typography>
                        <Typography sx={{ fontWeight: "700" }}>:</Typography>
                        <Typography sx={{ fontWeight: "700", width: "40px" }}>
                          B
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          padding: "3px",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography sx={{ width: "70px" }}>Roll #</Typography>
                        <Typography sx={{ fontWeight: "700" }}>:</Typography>
                        <Typography sx={{ fontWeight: "700", width: "40px" }}>
                          22
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      padding: "20px",
                      display: "flex",
                      flexDirection: "column",
                      marginTop: "60px",
                    }}
                  >
                    <Typography sx={{ fontWeight: "700", fontSize: "30px" }}>
                      <CurrencyRupeeIcon /> 9900
                    </Typography>

                    <Typography>Caution Money Balance</Typography>
                  </Box>
                </Box>
              </Bbox>
            )}

            <Box
              sx={{
                padding: "10px",
                marginTop: "40px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ display: "flex", flexDirection: "row" }}>
                Non Compliance Category:{" "}
                <Typography sx={{ paddingLeft: "5px", fontWeight: "600" }}>
                  Loss / Damage of property
                </Typography>
              </Typography>

              <Typography
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  paddingTop: "10px",
                }}
              >
                Date of Incident:{" "}
                <Typography sx={{ paddingLeft: "5px", fontWeight: "600" }}>
                  12 Jun, 2023
                </Typography>
              </Typography>

              {progress === 1 ? (
                <Box sx={{ paddingTop: "30px" }}>
                  <Typography
                    ml={3}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      fontWeight: "600",
                      paddingBottom: "10px",
                      fontSize: "px",
                    }}
                  >
                    Suspension Period
                  </Typography>
                  <Box display={"flex"} gap={2} width="400px" ml={3}>
                    <DatePicker
                      label="Start Date"
                      format="DD MMM YYYY"
                      onChange={(e) => setStartDate(e)}
                    />
                    <DatePicker
                      label="End Date"
                      format="DD MMM YYYY"
                      minDate={startDate}
                      onChange={(e) => setEndDate(e)}
                    />
                  </Box>
                  <Box ml={3} marginTop={3}>
                    <ReignsSelect
                      items={suspend}
                      label="Suspend"
                      sx={{ width: "25rem", marginRight: "2rem" }}
                    />
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      variant="contained"
                      sx={{ marginTop: "40px", width: "600px" }}
                      onClick={() => {
                        setProgress(2);
                      }}
                    >
                      Next
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <FormControl style={{ width: "500px", marginTop: "40px" }}>
                    <DatePicker label="Date of incident" />
                  </FormControl>

                  <FormControl style={{ width: "500px", marginTop: "40px" }}>
                    <TextField
                      label="Penalty Due Amount"
                      value={value}
                      onChange={(event) => {
                        const newValue = event.target.value.replace(
                          /[^0-9]/g,
                          ""
                        );
                        setValue(newValue);
                      }}
                      InputProps={{
                        maxLength: 10,
                        startAdornment: (
                          <InputAdornment position="start">
                            <CurrencyRupeeIcon sx={{ fontSize: "1.3rem" }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </FormControl>

                  <FormControl sx={{ marginTop: "40px" }}>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      row
                    >
                      <FormControlLabel
                        value="deduct"
                        control={<Radio />}
                        label="Deduct from caution money"
                      />
                      <FormControlLabel
                        value="adjust"
                        control={<Radio />}
                        label="Adjust from next fee cycle"
                      />
                      <FormControlLabel
                        value="online"
                        control={<Radio />}
                        label="Online / Offline payment"
                      />
                    </RadioGroup>
                  </FormControl>

                  <FormControl style={{ width: "500px", marginTop: "40px" }}>
                    <TextField
                      label="Add incident summary(upto 200 characters)"
                      multiline
                      rows={4}
                      variant="outlined"
                    />
                  </FormControl>

                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      variant="contained"
                      sx={{ marginTop: "40px", width: "600px" }}
                      onClick={() => {
                        setOpenDialog(true);
                      }}
                    >
                      Submit
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Bbox>

      <Dialog open={openDialog} onClose={handleCloseDialog} height={"100%"}>
        <DialogTitle
          sx={{
            backgroundColor: "#2F7DA1",
            textAlign: "center",
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            width: "600px",
          }}
        >
          <div style={{ flexGrow: 1 }}>Finalise Action</div>

          <IconButton
            aria-label="close"
            size="small"
            onClick={handleCloseDialog}
          >
            <Icon icon={"ep:close-bold"} color="white" fontSize={"1.3rem"} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "70px",
              paddingBottom: "70px",
              fontWeight: "600",
              fontSize: "18px",
            }}
          >
            Are you sure you want to submit?
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Button
              variant="outlined"
              color="error"
              sx={{ width: "200px", marginRight: "10px" }}
              onClick={handleCloseDialog}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              sx={{ width: "200px" }}
              onClick={handleCloseDialog}
            >
              No
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </RevealCard>
  );
};

const ActionCard = ({
  name,
  classname,
  studentid,
  section,
  roll,
  balance,
  status,
}) => {
  return (
    <Bbox
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "90px",
        width: "280px",
        alignItems: "center",
        padding: "10px",
        borderRadius: "6px",
      }}
    >
      <img
        src={Rectangle1}
        alt="rectangle"
        style={{
          position: "absolute",
          borderRadius: "6px",
          height: "90px",
          marginLeft: "-10px",
        }}
      />
      <Avatar
        alt="profile"
        src={Profile}
        sx={{ marginRight: "10px", width: "50px", height: "50px" }}
      />
      <Box sx={{ width: "80px" }}>
        <Typography sx={{ fontWeight: "700", fontSize: "12px" }}>
          {name}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
          <Typography sx={{ fontWeight: "200", fontSize: "10px" }}>
            {classname}
          </Typography>
          <Typography sx={{ fontWeight: "200", fontSize: "10px" }}>
            ({section})
          </Typography>
          <Typography sx={{ fontWeight: "200", fontSize: "10px" }}>
            {roll}
          </Typography>
        </Box>
        <Typography sx={{ fontWeight: "700", fontSize: "12px" }}>
          {studentid}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "150px",
          marginLeft: "10px",
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Box flex={1}></Box>
          <Box
            sx={{
              backgroundColor: "#C6F6D5",
              borderRadius: "6px",
              width: "60px",
              height: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ fontWeight: "700" }}>Active</Typography>
          </Box>
          <IconButton size="small">
            <MoreVertIcon />
          </IconButton>
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <Typography
            sx={{
              color: "#c4673b",
              fontWeight: "700",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <CurrencyRupeeIcon fontSize="small"/> {balance}
          </Typography>
          <Typography
            sx={{ fontSize: "10px", paddingLeft: "10px"  }}
          >
            Caution Money Balance
          </Typography>
        </Box>
      </Box>
    </Bbox>
  );
};

export default ActionSuspend;
