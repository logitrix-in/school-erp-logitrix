import { useState, useContext } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import RevealCard from "../../AnimationComponents/RevealCard";
import Bbox from "../../UiComponents/Bbox";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { DatePicker } from "@mui/x-date-pickers";
import Vector from "../../../assets/icons/Vector.png";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Icon } from "@iconify/react";
import photo from "../../../assets/icons/photo.png";
import ReignsSelect from "../../UiComponents/ReignsSelect";
import useClasses from "../../../hooks/useClasses";
import { ToastContainer, toast } from "react-toastify";
import SVGIncident from './SVGIncident';
import DoneIcon from '@mui/icons-material/Done';
import { UserContext } from "./UserContext";
import dayjs from 'dayjs';
import api from "../../../config/api";
import PageLoader from '../../PageLoader'

const ActionSuspend = () => {
  const [extendedView, setExtendedView] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [progress, setProgress] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [amount, setAmount] = useState('')
  const [incidentSummary, setIncidentSummary] = useState('');
  const [suspendAccess, setSuspendAccess] = useState([]);
  const { suspendedUsers, penaltyUsers, setSuspendedUsers, setPenaltyUsers, dateOfIncident, setDateOfIncident, selectedCompliance, setSelectedCompliance } = useContext(UserContext);
  const suspendedUsersCount = suspendedUsers.length;
  const penaltyUsersCount = penaltyUsers.length;
  const [applicable, setApplicable] = useState((suspendedUsersCount > 0 && penaltyUsersCount > 0) ? 'both' : (suspendedUsersCount > 0) ? 'suspend' : (penaltyUsersCount > 0) ? 'penalty' : '');
  const [loading, setLoading] = useState(false);

  console.log(dateOfIncident);
  console.log(selectedCompliance);
  const { suspend } = useClasses();

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  function handleAmountChange(e) {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '');

    if (numericValue === '') {
      setAmount('');
    } else {
      setAmount(`₹ ${parseInt(numericValue).toLocaleString('en-IN')}`);
    }
  }

  const handleSubmitOnlySuspend = async () => {
    try {
      setLoading(true);

      const libraryCards = suspendedUsers.map(user => user.library_card_number);

      const response = api.post('/library/incident/', {
        "library_card": libraryCards,
        "non_compliance_category": selectedCompliance,
        "date_of_incident": dateOfIncident,
        "suspension_start_date": "2024-09-30",
        "suspension_end_date": "2024-0-10-05",
        "suspend": true,
      })

      if (response.status === 201) {
        toast.success('Incident created!')
      }

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmitOnlyPenalty = async () => {
    try {
      setLoading(true);

      const libraryCards = penaltyUsers.map(user => user.library_card_number);

      const response = api.post('/library/incident/', {
        "library_card": libraryCards,
        "non_compliance_category": selectedCompliance,
        "date_of_incident": dateOfIncident,
        "impose_penalty": true,
        "penalty_amount": 100,
        "penalty_due_date": "2024-07-30",
        "payment_mode": "Online/ Offline/ Deduct/ Adjust",
        "summary": setIncidentSummary
      })

      if (response.status === 201) {
        toast.success('Incident created!')
      }

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmitBoth = async () => {
    try {
      setLoading(true);

      const libraryCards = penaltyUsers.map(user => user.library_card_number);

      const response = api.post('/library/incident/', {
        "library_card": libraryCards,
        "non_compliance_category": selectedCompliance,
        "date_of_incident": dateOfIncident,
        "suspend": true,
        "suspension_start_date": "2024-09-30",
        "suspension_end_date": "2024-0-10-05",
        "impose_penalty": true,
        "penalty_amount": 100,
        "penalty_due_date": "2024-07-30",
        "payment_mode": "Online/ Offline/ Deduct/ Adjust",
        "summary": setIncidentSummary
      })

      if (response.status === 201) {
        toast.success('Incident created!')
      }

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (date) => {
    if (!date) return null;
    return dayjs(date).format('YYYY-MM-DD');
  };

  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 6;

  if (loading) {
    console.log('loading');
    <PageLoader />
  }

  return (
    <RevealCard>
      <ToastContainer />
      <Bbox
        sx={{
          marginTop: "2",
          width: "100%",
          height: extendedView ? "1200px" : "1000px",
          borderRadius: 2,
          overflow: "hidden",
          position: "relative",
        }}
      >

        {
          (suspendedUsersCount > 0 && penaltyUsersCount > 0) ? (
            <>
              {progress === 1 ? (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent={"center"}
                  paddingTop={"20px"}
                >

                  <Box sx={{ position: 'absolute', left: 0 }}>
                    <SVGIncident />
                  </Box>

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

                  <Box sx={{ position: 'absolute', left: 0 }}>
                    <SVGIncident />
                  </Box>

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
                        border={"1px solid #2F7DA1"}
                        sx={{ ":hover": { scale: '1.10' }, cursor: 'pointer' }}
                        onClick={() => {
                          setProgress(1);
                        }}
                      >
                        <DoneIcon />
                      </Box>

                      <Box height={8} width={25} bgcolor="#2F7DA1" />
                    </Box>

                    <Typography fontSize={14} fontWeight={500} color={"#2F7DA1"} sx={{ cursor: 'pointer' }} onClick={() => {
                      setProgress(1);
                    }}>
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
            </>
          ) : (suspendedUsersCount > 0) ? (
            <>
              <Box
                display="flex"
                alignItems="center"
                justifyContent={"center"}
                paddingTop={"20px"}
              >

                <Box
                  width={60}
                  height={60}
                >
                </Box>

                <Box sx={{ position: 'absolute', left: 0 }}>
                  <SVGIncident />
                </Box>

              </Box>
            </>
          ) : (penaltyUsersCount > 0) ? (
            <>
              <Box
                display="flex"
                alignItems="center"
                justifyContent={"center"}
                paddingTop={"20px"}
              >

                <Box
                  width={60}
                  height={60}
                >
                </Box>

                <Box sx={{ position: 'absolute', left: 0 }}>
                  <SVGIncident />
                </Box>


              </Box>
            </>
          ) : ''
        }

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

            {
              applicable === 'suspend' && (
                <>
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

                  {suspendedUsersCount > 1 ? (
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
                                {suspendedUsersCount}
                              </Typography>
                              {suspendedUsersCount == 1 ? 'User' : 'Users'} selected
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

                          <Grid container spacing={2} sx={{ paddingTop: "10px" }}>
                            {suspendedUsers.slice(currentPage * cardsPerPage, currentPage * cardsPerPage + cardsPerPage).map((cardData, index) => (
                              <Grid item xs={12} sm={6} md={4} key={index}>
                                <ActionCard {...cardData} tabType="suspend" />
                              </Grid>
                            ))}
                          </Grid>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "flex-end",
                              alignItems: "center",
                              marginTop: '24px',
                              gap: "10px",
                            }}
                          >
                            <IconButton
                              onClick={() => {
                                setCurrentPage((prev) => Math.max(0, prev - 1));
                              }}
                              disabled={currentPage === 0}
                              sx={{ border: "0.5px solid black" }}
                            >
                              <ArrowLeftIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => {
                                setCurrentPage((prev) => Math.min(Math.ceil(suspendedUsersCount / cardsPerPage) - 1, prev + 1));
                              }}
                              disabled={currentPage === Math.ceil(suspendedUsersCount / cardsPerPage) - 1}
                              sx={{ border: "0.5px solid black" }}
                            >
                              <ArrowRightIcon />
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
                              {suspendedUsersCount}
                            </Typography>
                            {suspendedUsersCount > 1 ? 'Users' : 'User'} selected
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
                    <Box>
                      <Bbox
                        sx={{
                          width: "100%",
                          marginTop: "20px",
                          borderRadius: "6px",
                          position: "relative",
                          overflow: "hidden"
                        }}
                      >
                        <Box
                          position={"absolute"}
                          top={0}
                          left={0}
                          width="150px"
                          height="100%"
                          sx={{
                            backgroundColor: 'primary.main',
                            clipPath: 'polygon(0 0, 80% 0, 40% 100%, 0 100%)',
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            zIndex: 1,
                          }}
                        >
                        </Box>

                        {
                          suspendedUsers[0]?.user_id?.startsWith('EMP') ? (
                            <>
                              <Box
                                bgcolor={"white"}
                                py={5}
                                px={3}
                                borderRadius={2}
                                display={"flex"}
                                justifyContent={"space-between"}
                                alignItems={"center"}
                              >
                                <Box
                                  position={"absolute"}
                                  top={0}
                                  left={0}
                                  width="150px"
                                  height="100%"
                                  display={"flex"}
                                  flexDirection={"column"}
                                  alignItems={"center"}
                                  justifyContent={"center"}
                                >
                                  <img src={photo} alt="icon" style={{ width: '120px', marginBottom: '10px', zIndex: 2, borderRadius: '16px' }} />
                                </Box>

                                <Box display="flex" justifyContent="flex-start" width="100%" alignItems="start">
                                  <Box display="flex" gap={2} width="25%" justifyContent="center" borderRight="2px solid #E0E0E0" marginLeft={16}>
                                    <Box display="flex" flexDirection="column" justifyContent="space-between">
                                      <Typography mb={2}>Employee Name</Typography>
                                      <Typography mb={2}>Employee ID</Typography>
                                      <Typography mb={2}>Status</Typography>
                                    </Box>
                                    <Box display="flex" flexDirection="column" justifyContent="space-between">
                                      <Typography fontWeight="medium" ml={1} mb={2}>: {suspendedUsers[0].name}</Typography>
                                      <Typography fontWeight="medium" ml={1} mb={2}>: {suspendedUsers[0].user_id}</Typography>
                                      <Typography fontWeight="medium" ml={1} mb={2} >: <span style={{ color: "#22543D", backgroundColor: "#C6F6D5", padding: "0.25rem 0.5rem", borderRadius: "0.5rem" }}>{suspendedUsers[0].current_status}</span></Typography>
                                    </Box>
                                  </Box>
                                  <Box display="flex" gap={2} width="20%" justifyContent="center" alignItems={'flex-start'}>
                                    <Box display="flex" flexDirection="column" justifyContent="space-between">
                                      <Typography mb={2}>Type</Typography>
                                      <Typography mb={2}>Department</Typography>
                                    </Box>
                                    <Box display="flex" flexDirection="column" justifyContent="space-between">
                                      <Typography fontWeight="medium" ml={1} mb={2}>: {suspendedUsers[0].type}</Typography>
                                      <Typography fontWeight="medium" ml={1} mb={2}>: {suspendedUsers[0].department}</Typography>
                                    </Box>
                                  </Box>
                                </Box>
                              </Box>
                            </>) : (
                            <>
                              <Box
                                position={"absolute"}
                                bottom={0}
                                right={0}
                                padding={2}
                                borderRadius={"8px"}
                                display={"flex"}
                                flexDirection={"column"}
                                alignItems={"flex-start"}
                                justifyContent={"center"}
                              >
                                <Typography fontSize={32} fontWeight={600} color={"#545353"}>
                                  9900
                                </Typography>
                                <Typography fontSize={20} fontWeight={400} color={"#535353"}>
                                  Caution Money Balance
                                </Typography>
                              </Box>

                              <Box
                                position={"absolute"}
                                top={0}
                                left={0}
                                width="150px"
                                height="100%"
                                display={"flex"}
                                flexDirection={"column"}
                                alignItems={"center"}
                                justifyContent={"center"}
                              >
                                <img src={photo} alt="icon" style={{ width: '120px', marginBottom: '10px', zIndex: 2, borderRadius: '16px' }} />
                              </Box>

                              <Box
                                bgcolor={"white"}
                                py={5}
                                px={3}
                                borderRadius={2}
                                display={"flex"}
                                justifyContent={"space-between"}
                                alignItems={"center"}
                              >
                                <Box display="flex" justifyContent="flex-start" width="100%" alignItems="center">
                                  <Box display="flex" gap={2} width="25%" justifyContent="center" borderRight="2px solid #E0E0E0" marginLeft={16}>
                                    <Box display="flex" flexDirection="column" justifyContent="space-between">
                                      <Typography mb={2}>Student Name</Typography>
                                      <Typography mb={2}>Student ID</Typography>
                                      <Typography mb={2}>Status</Typography>
                                    </Box>
                                    <Box display="flex" flexDirection="column" justifyContent="space-between">
                                      <Typography fontWeight="medium" ml={1} mb={2}>: {suspendedUsers[0].name}</Typography>
                                      <Typography fontWeight="medium" ml={1} mb={2}>: {suspendedUsers[0].user_id}</Typography>
                                      <Typography fontWeight="medium" ml={1} mb={2} >: <span style={{ color: "#22543D", backgroundColor: "#C6F6D5", padding: "0.25rem 0.5rem", borderRadius: "0.5rem" }}>{suspendedUsers[0].current_status}</span></Typography>
                                    </Box>
                                  </Box>
                                  <Box display="flex" gap={2} width="15%" justifyContent="center">
                                    <Box display="flex" flexDirection="column" justifyContent="space-between">
                                      <Typography mb={2}>Class</Typography>
                                      <Typography mb={2}>Section</Typography>
                                      <Typography mb={2}>Roll #</Typography>
                                    </Box>
                                    <Box display="flex" flexDirection="column" justifyContent="space-between">
                                      <Typography fontWeight="medium" ml={1} mb={2}>: V</Typography>
                                      <Typography fontWeight="medium" ml={1} mb={2}>: B</Typography>
                                      <Typography fontWeight="medium" ml={1} mb={2} display="flex" alignItems="center" gap={1} >: 22</Typography>
                                    </Box>
                                  </Box>
                                </Box>
                              </Box>
                            </>
                          )
                        }
                      </Bbox>
                    </Box>
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
                        {selectedCompliance.join(", ")}
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
                        {formatDate(dateOfIncident)}
                      </Typography>
                    </Typography>

                    <Box sx={{ paddingTop: "30px" }}>
                      <Typography
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          fontWeight: "600",
                          paddingBottom: "10px",
                        }}
                      >
                        Suspension Period
                      </Typography>
                      <Box display={"flex"} gap={2} width="400px">
                        <DatePicker
                          label="Start Date"
                          format="DD MMM YYYY"
                          value={startDate}
                          onChange={(e) => setStartDate(e)}
                        />
                        <DatePicker
                          label="End Date"
                          format="DD MMM YYYY"
                          minDate={startDate}
                          value={endDate}
                          onChange={(e) => setEndDate(e)}
                        />
                      </Box>
                      <Box marginTop={3}>
                        <ReignsSelect
                          items={suspend}
                          label="Suspend Access"
                          onChange={setSuspendAccess}
                          value={suspendAccess}
                          defaultValues={suspend}
                          multiple
                          sx={{ width: "25rem", marginRight: "2rem" }}
                        />
                      </Box>

                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Button
                          variant="contained"
                          sx={{ marginTop: "40px", width: "600px" }}
                          onClick={() => {
                            console.log("handleSubmitOnlySuspend");
                            handleSubmitOnlySuspend();
                          }}
                        >
                          Submit
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </>
              )}

            {
              applicable === 'penalty' && (
                <>
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
                      Penalty
                    </Typography>
                  </Box>

                  {penaltyUsersCount > 1 ? (
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
                                {penaltyUsersCount}
                              </Typography>
                              {penaltyUsersCount == 1 ? 'User' : 'Users'} selected
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

                          <Grid container spacing={2} sx={{ paddingTop: "10px" }}>
                            {penaltyUsers.slice(currentPage * cardsPerPage, currentPage * cardsPerPage + cardsPerPage).map((cardData, index) => (
                              <Grid item xs={12} sm={6} md={4} key={index}>
                                <ActionCard {...cardData} tabType="penalty" />
                              </Grid>
                            ))}
                          </Grid>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "flex-end",
                              alignItems: "center",
                              marginTop: '24px',
                              gap: "10px",
                            }}
                          >
                            <IconButton
                              onClick={() => {
                                setCurrentPage((prev) => Math.max(0, prev - 1));
                              }}
                              disabled={currentPage === 0}
                              sx={{ border: "0.5px solid black" }}
                            >
                              <ArrowLeftIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => {
                                setCurrentPage((prev) => Math.min(Math.ceil(penaltyUsersCount / cardsPerPage) - 1, prev + 1));
                              }}
                              disabled={currentPage === Math.ceil(penaltyUsersCount / cardsPerPage) - 1}
                              sx={{ border: "0.5px solid black" }}
                            >
                              <ArrowRightIcon />
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
                              {penaltyUsersCount}
                            </Typography>
                            {penaltyUsersCount > 1 ? 'Users' : 'User'} selected
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
                    <Box>
                      <Bbox
                        sx={{
                          width: "100%",
                          marginTop: "20px",
                          borderRadius: "6px",
                          position: "relative",
                          overflow: "hidden"
                        }}
                      >
                        <Box
                          position={"absolute"}
                          top={0}
                          left={0}
                          width="150px"
                          height="100%"
                          sx={{
                            backgroundColor: 'primary.main',
                            clipPath: 'polygon(0 0, 80% 0, 40% 100%, 0 100%)',
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            zIndex: 1,
                          }}
                        >
                        </Box>

                        {
                          penaltyUsers[0]?.user_id.startsWith('EMP') ? (
                            <>
                              <Box
                                bgcolor={"white"}
                                py={5}
                                px={3}
                                borderRadius={2}
                                display={"flex"}
                                justifyContent={"space-between"}
                                alignItems={"center"}
                              >
                                <Box
                                  position={"absolute"}
                                  top={0}
                                  left={0}
                                  width="150px"
                                  height="100%"
                                  display={"flex"}
                                  flexDirection={"column"}
                                  alignItems={"center"}
                                  justifyContent={"center"}
                                >
                                  <img src={photo} alt="icon" style={{ width: '120px', marginBottom: '10px', zIndex: 2, borderRadius: '16px' }} />
                                </Box>

                                <Box display="flex" justifyContent="flex-start" width="100%" alignItems="start">
                                  <Box display="flex" gap={2} width="25%" justifyContent="center" borderRight="2px solid #E0E0E0" marginLeft={16}>
                                    <Box display="flex" flexDirection="column" justifyContent="space-between">
                                      <Typography mb={2}>Employee Name</Typography>
                                      <Typography mb={2}>Employee ID</Typography>
                                      <Typography mb={2}>Status</Typography>
                                    </Box>
                                    <Box display="flex" flexDirection="column" justifyContent="space-between">
                                      <Typography fontWeight="medium" ml={1} mb={2}>: {penaltyUsers[0].name}</Typography>
                                      <Typography fontWeight="medium" ml={1} mb={2}>: {penaltyUsers[0].user_id}</Typography>
                                      <Typography fontWeight="medium" ml={1} mb={2} >: <span style={{ color: "#22543D", backgroundColor: "#C6F6D5", padding: "0.25rem 0.5rem", borderRadius: "0.5rem" }}>{penaltyUsers[0].current_status}</span></Typography>
                                    </Box>
                                  </Box>
                                  <Box display="flex" gap={2} width="20%" justifyContent="center" alignItems={'flex-start'}>
                                    <Box display="flex" flexDirection="column" justifyContent="space-between">
                                      <Typography mb={2}>Type</Typography>
                                      <Typography mb={2}>Department</Typography>
                                    </Box>
                                    <Box display="flex" flexDirection="column" justifyContent="space-between">
                                      <Typography fontWeight="medium" ml={1} mb={2}>: {penaltyUsers[0].type}</Typography>
                                      <Typography fontWeight="medium" ml={1} mb={2}>: {penaltyUsers[0].department}</Typography>
                                    </Box>
                                  </Box>
                                </Box>
                              </Box>
                            </>) : (
                            <>
                              <Box
                                position={"absolute"}
                                bottom={0}
                                right={0}
                                padding={2}
                                borderRadius={"8px"}
                                display={"flex"}
                                flexDirection={"column"}
                                alignItems={"flex-start"}
                                justifyContent={"center"}
                              >
                                <Typography fontSize={32} fontWeight={600} color={"#545353"}>
                                  9900
                                </Typography>
                                <Typography fontSize={20} fontWeight={400} color={"#535353"}>
                                  Caution Money Balance
                                </Typography>
                              </Box>

                              <Box
                                position={"absolute"}
                                top={0}
                                left={0}
                                width="150px"
                                height="100%"
                                display={"flex"}
                                flexDirection={"column"}
                                alignItems={"center"}
                                justifyContent={"center"}
                              >
                                <img src={photo} alt="icon" style={{ width: '120px', marginBottom: '10px', zIndex: 2, borderRadius: '16px' }} />
                              </Box>

                              <Box
                                bgcolor={"white"}
                                py={5}
                                px={3}
                                borderRadius={2}
                                display={"flex"}
                                justifyContent={"space-between"}
                                alignItems={"center"}
                              >
                                <Box display="flex" justifyContent="flex-start" width="100%" alignItems="center">
                                  <Box display="flex" gap={2} width="25%" justifyContent="center" borderRight="2px solid #E0E0E0" marginLeft={16}>
                                    <Box display="flex" flexDirection="column" justifyContent="space-between">
                                      <Typography mb={2}>Student Name</Typography>
                                      <Typography mb={2}>Student ID</Typography>
                                      <Typography mb={2}>Status</Typography>
                                    </Box>
                                    <Box display="flex" flexDirection="column" justifyContent="space-between">
                                      <Typography fontWeight="medium" ml={1} mb={2}>: {penaltyUsers[0].name}</Typography>
                                      <Typography fontWeight="medium" ml={1} mb={2}>: {penaltyUsers[0].user_id}</Typography>
                                      <Typography fontWeight="medium" ml={1} mb={2} >: <span style={{ color: "#22543D", backgroundColor: "#C6F6D5", padding: "0.25rem 0.5rem", borderRadius: "0.5rem" }}>{penaltyUsers[0].current_status}</span></Typography>
                                    </Box>
                                  </Box>
                                  <Box display="flex" gap={2} width="15%" justifyContent="center">
                                    <Box display="flex" flexDirection="column" justifyContent="space-between">
                                      <Typography mb={2}>Class</Typography>
                                      <Typography mb={2}>Section</Typography>
                                      <Typography mb={2}>Roll #</Typography>
                                    </Box>
                                    <Box display="flex" flexDirection="column" justifyContent="space-between">
                                      <Typography fontWeight="medium" ml={1} mb={2}>: V</Typography>
                                      <Typography fontWeight="medium" ml={1} mb={2}>: B</Typography>
                                      <Typography fontWeight="medium" ml={1} mb={2} display="flex" alignItems="center" gap={1} >: 22</Typography>
                                    </Box>
                                  </Box>
                                </Box>
                              </Box>
                            </>
                          )
                        }
                      </Bbox>
                    </Box>
                  )}

                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <FormControl style={{ width: "500px", marginTop: "40px" }}>
                      <DatePicker label="Penalty Due Date" />
                    </FormControl>

                    <FormControl style={{ width: "500px", marginTop: "40px" }}>
                      <TextField
                        id="comments"
                        label="Penalty Due Amount"
                        type="text"
                        placeholder="Enter Penalty Due Amount in ₹"
                        value={amount}
                        onChange={handleAmountChange}
                        variant="outlined"
                        fullWidth
                        inputProps={{
                          inputMode: 'numeric',
                          pattern: '[0-9]*'
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
                          label="Adjust from next payment"
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
                        value={incidentSummary}
                        onChange={(e) => setIncidentSummary(e.target.value)}
                      />
                    </FormControl>

                    <Box sx={{ display: "flex", justifyContent: "space-evenly", marginTop: "40px" }}>
                      <Button
                        variant="contained"
                        sx={{ width: '30%' }}
                        onClick={() => {
                          console.log("handleSubmitOnlyPenalty");
                          handleSubmitOnlyPenalty();
                        }}
                      >
                        Submit
                      </Button>
                    </Box>
                  </Box>
                </>
              )}

            {
              applicable === 'both' && (
                <>
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
                          {progress === 1 ? "Suspend" : "Penalty"}
                        </Typography>
                      </Box>

                      {suspendedUsers.length > 1 ? (
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
                                    {suspendedUsers.length}
                                  </Typography>
                                  {suspendedUsersCount > 1 ? 'Users' : 'User'} selected
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
                                {suspendedUsers.map((cardData, index) => (
                                  <Grid item xs={4} key={index}>
                                    <ActionCard {...cardData} tabType="suspend" />
                                  </Grid>
                                ))}
                              </Grid>

                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "row-reverse",
                                  zIndex: 1,
                                  marginTop: '24px',
                                  gap: "10px", // This adds space between the IconButtons
                                }}
                              >
                                <IconButton sx={{ border: "0.5px solid black" }}>
                                  <ArrowRightIcon />
                                </IconButton>
                                <IconButton sx={{ border: "0.5px solid black" }}>
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
                                  {suspendedUsersCount}
                                </Typography>
                                {suspendedUsersCount > 1 ? 'Users' : 'User'} selected
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
                        <Box>
                          <Bbox
                            sx={{
                              width: "100%",
                              marginTop: "20px",
                              borderRadius: "6px",
                              position: "relative",
                              overflow: "hidden"
                            }}
                          >
                            <Box
                              position={"absolute"}
                              top={0}
                              left={0}
                              width="150px"
                              height="100%"
                              sx={{
                                backgroundColor: 'primary.main',
                                clipPath: 'polygon(0 0, 80% 0, 40% 100%, 0 100%)',
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "white",
                                zIndex: 1,
                              }}
                            >
                            </Box>
                            <Box
                              position={"absolute"}
                              top={0}
                              left={0}
                              width="150px"
                              height="100%"
                              display={"flex"}
                              flexDirection={"column"}
                              alignItems={"center"}
                              justifyContent={"center"}
                            >
                              <img src={photo} alt="icon" style={{ width: '120px', marginBottom: '10px', zIndex: 2, borderRadius: '16px' }} />
                            </Box>

                            <Box
                              position={"absolute"}
                              bottom={0}
                              right={0}
                              padding={2}
                              borderRadius={"8px"}
                              display={"flex"}
                              flexDirection={"column"}
                              alignItems={"flex-start"}
                              justifyContent={"center"}
                            >
                              <Typography fontSize={32} fontWeight={600} color={"#545353"}>
                                9900
                              </Typography>
                              <Typography fontSize={20} fontWeight={400} color={"#535353"}>
                                Caution Money Balance
                              </Typography>
                            </Box>

                            <Box
                              bgcolor={"white"}
                              py={5}
                              px={3}
                              borderRadius={2}
                              display={"flex"}
                              justifyContent={"space-between"}
                              alignItems={"center"}
                            >
                              <Box display="flex" justifyContent="flex-start" width="100%" alignItems="center">
                                <Box display="flex" gap={2} width="25%" justifyContent="center" borderRight="2px solid #E0E0E0" marginLeft={16}>
                                  <Box display="flex" flexDirection="column" justifyContent="space-between">
                                    <Typography mb={2}>Student Name</Typography>
                                    <Typography mb={2}>Student ID</Typography>
                                    <Typography mb={2}>Status</Typography>
                                  </Box>
                                  <Box display="flex" flexDirection="column" justifyContent="space-between">
                                    <Typography fontWeight="medium" ml={1} mb={2}>: Jay Shaw</Typography>
                                    <Typography fontWeight="medium" ml={1} mb={2}>: STU2201</Typography>
                                    <Typography fontWeight="medium" ml={1} mb={2} >: <span style={{ color: "#22543D", backgroundColor: "#C6F6D5", padding: "0.25rem 0.5rem", borderRadius: "0.5rem" }}>Active</span></Typography>
                                  </Box>
                                </Box>
                                <Box display="flex" gap={2} width="15%" justifyContent="center">
                                  <Box display="flex" flexDirection="column" justifyContent="space-between">
                                    <Typography mb={2}>Class</Typography>
                                    <Typography mb={2}>Section</Typography>
                                    <Typography mb={2}>Roll #</Typography>
                                  </Box>
                                  <Box display="flex" flexDirection="column" justifyContent="space-between">
                                    <Typography fontWeight="medium" ml={1} mb={2}>: V</Typography>
                                    <Typography fontWeight="medium" ml={1} mb={2}>: B</Typography>
                                    <Typography fontWeight="medium" ml={1} mb={2} display="flex" alignItems="center" gap={1} >: 22</Typography>
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          </Bbox>
                        </Box>
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
                            {selectedCompliance.join(", ")}
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
                            {formatDate(dateOfIncident)}
                          </Typography>
                        </Typography>

                        {progress === 1 ? (
                          <Box sx={{ paddingTop: "30px" }}>
                            <Typography
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                fontWeight: "600",
                                paddingBottom: "10px",
                              }}
                            >
                              Suspension Period
                            </Typography>
                            <Box display={"flex"} gap={2} width="400px">
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
                            <Box marginTop={3}>
                              <ReignsSelect
                                items={suspend}
                                multiple
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
                              <DatePicker label="Penalty Due Date" />
                            </FormControl>

                            <FormControl style={{ width: "500px", marginTop: "40px" }}>
                              <TextField
                                id="comments"
                                label="Claim Amount"
                                type="text"
                                placeholder="Enter Claim Amount in ₹"
                                value={amount}
                                onChange={handleAmountChange}
                                variant="outlined"
                                fullWidth
                                inputProps={{
                                  inputMode: 'numeric',
                                  pattern: '[0-9]*'
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
                                  label="Adjust from next payment"
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

                            <Box sx={{ display: "flex", justifyContent: "space-evenly", marginTop: "40px" }}>
                              <Button
                                sx={{ width: '30%' }}
                                variant="outlined"
                                onClick={() => {
                                  setProgress(1);
                                }}
                              >
                                Back
                              </Button>

                              <Button
                                variant="contained"
                                sx={{ width: '30%' }}
                                onClick={() => {
                                  console.log("handleSubmitBoth");
                                  handleSubmitBoth();
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
                </>
              )}
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
          <div style={{ flexGrow: 1 }}>Set Promotion Criteria</div>

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
              onClick={() => {
                handleCloseDialog(); toast.success("New incident #xxx registered successfully");
              }}
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
    </RevealCard >
  );
};

export default ActionSuspend;

const ActionCard = ({
  name,
  user_id,
  type,
  department,
  caution_money,
  current_status,
  tabType
}) => {

  const { suspendedUsers, penaltyUsers, setSuspendedUsers, setPenaltyUsers } = useContext(UserContext);

  function handleUserDelete(user_id, tabType) {
    if (tabType === 'suspend') {
      setSuspendedUsers(prevRows => prevRows.filter(r => r.user_id !== user_id));
    } else if (tabType === 'penalty') {
      setPenaltyUsers(prevRows => prevRows.filter(r => r.user_id !== user_id));
    }
  }

  return (
    <Bbox
      position={"relative"}
      overflow={"hidden"}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        padding: "10px",
        borderRadius: "12px",
        height: '90px'
      }}
      border={"1px solid #ff0000"}
    >

      <Box
        position={"absolute"}
        top={0}
        left={0}
        width="100px"
        height="100%"
        sx={{
          backgroundColor: 'primary.main',
          clipPath: 'polygon(0 0, 50% 0, 25% 100%, 0 100%)',
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          zIndex: 1,
        }}
      >
      </Box>

      <Box
        position={"absolute"}
        top={0}
        left={0}
        width="75px"
        height="100%"
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <img src={photo} alt="icon" style={{ width: '60px', zIndex: 2, borderRadius: '50%' }} />
      </Box>

      <Box sx={{ marginLeft: '64px', width: '50%' }}>
        <Typography sx={{ fontWeight: "700", fontSize: "12px" }}>
          {name}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", gap: "6px" }}>
          <Typography sx={{ fontWeight: "200", fontSize: "10px" }}>
            {type}
          </Typography>
          <Typography sx={{ fontWeight: "200", fontSize: "10px" }}>
            {`(`}{department}{`)`}
          </Typography>
        </Box>
        <Typography sx={{ fontWeight: "700", fontSize: "12px" }}>
          {user_id}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: '100%',
          height: '100%',
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", top: 0 }}>
          <Box
            sx={{
              backgroundColor: current_status === 'Active' ? "#C6F6D5" : "#FEE2E2",
              borderRadius: "4px",
              height: "20px",
              paddingX: "6px",
              marginRight: '4px',
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ fontWeight: "600", fontSize: '12px' }}>{current_status}</Typography>
          </Box>
          <button
            style={{
              padding: "0",
              margin: "0",
              backgroundColor: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >

            <DeleteOutlineOutlinedIcon color="error" onClick={() => {
              handleUserDelete(user_id, tabType);
            }} />
          </button>
        </Box>
        {
          user_id.startsWith('STUD') && (
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", }}>
              <Box sx={{ display: "flex", flexDirection: "column-reverse", alignItems: "flex-end", }} >
                <Typography
                  sx={{ color: "#c4673b", fontWeight: "700", fontSize: "16px", }}
                >
                  ₹{caution_money}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: "14px", paddingLeft: "8px", }}>
                Caution{" "}
                <Typography sx={{ fontSize: "12px" }}>Money Balance </Typography>
              </Typography>
            </Box>
          )
        }
      </Box>
    </Bbox>
  );
};
