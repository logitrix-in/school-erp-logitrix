import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Button,
  Typography,
  IconButton,
  Avatar,
  AvatarGroup,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import RevealCard from "@/components/AnimationComponents/RevealCard";
import { Search } from "@mui/icons-material";
import { useMediaQuery } from "@material-ui/core";
import ReignsSelect from "@/components/UiComponents/ReignsSelect";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import EditIcon from "@mui/icons-material/Edit";
import Frame from "../../../assets/icons/frame.png";
import Invoice from "../../../assets/icons/invoice-dollar.png";
import Suspend from "../../../assets/icons/suspend.png";
import Profile from "../../../assets/icons/photo.png";
import { DataGrid } from "@mui/x-data-grid";

const ViewEditIncident = () => {
  const isSmall = useMediaQuery("(max-width: 1364px)");
  const isTablet = useMediaQuery("(min-width: 1365px) and (max-width: 1535px)");
  const isLaptop = useMediaQuery("(min-width: 1536px) and (max-width: 1706px)");
  const isDesktop = useMediaQuery(
    "(min-width: 1707px) and (max-width: 1919px)"
  );
  const isLarge = useMediaQuery("(min-width: 1920px)");
  const isXlarge = useMediaQuery("(min-width: 2560px)");

  const statuses = ["Open", "Cancelled", "Closed", "All"];

  const [openId, setOpenId] = useState(null);

  const columns = [
    { field: "space", headerName: "", width: 50 },
    {
      field: "id",
      headerName: "Student ID",
      width: isLaptop ? 120 : isLarge ? 160 : 140,
    },
    {
      field: "name",
      headerName: "Name",
      width: isLaptop ? 120 : isLarge ? 160 : 120,
    },
    {
      field: "details",
      headerName: "Details",
      width: isLaptop ? 100 : isLarge ? 150 : 110,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2">
            {params.row.class}/{params.row.section}/{params.row.roll}
          </Typography>
        </Box>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: isLaptop ? 100 : isLarge ? 150 : 110,
      renderCell: (params) => (
        <Box
          style={{
            backgroundColor:
              params.value === "Active"
                ? "#C6F6D5"
                : params.value === "Inactive"
                ? "#FFCCCC"
                : "transparent",
            borderRadius: "6px",
            display: "inline-block",
            width:
              params.value === "Active" || params.value === "Inactive"
                ? "60px"
                : "auto",
            paddingLeft:
              params.value === "Active"
                ? "11px"
                : params.value === "Inactive"
                ? "7px"
                : "0px",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "period",
      headerName: "Last Suspension Period",
      width: isLaptop ? 160 : isLarge ? 140 : 110,
    },
    {
      field: "date",
      headerName: "Date",
      width: isLaptop ? 130 : isLarge ? 170 : 130,
    },
    { field: "amount", headerName: "Amount Due", width: isLaptop ? 100 : 120 },
    {
      field: "incidents",
      headerName: "Incidents",
      width: 300,
      renderCell: (params) => (
        <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
          {params.row.incidents.map((incident, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{
                backgroundColor: "#e8def8",
                color: "black",
                padding: "2px 4px",
                borderRadius: "4px",
              }}
            >
              {incident}
            </Typography>
          ))}
        </Box>
      ),
    },
  ];

  const rows = [
    {
      id: "AG240001",
      name: "Saunav Ray",
      class: "VI",
      section: "A",
      roll: "19",
      status: "Active",
      period: "N/A",
      date: "20-Sep-2023",
      incidents: ["#223344"],
    },
  ];

  const [recentincidents, setRecentIncidents] = useState([
    {
      id: 0,
      incidentNumber: "INC12345",
      incidentDate: "2024-08-01",
      status: "Cancelled",
      startDate: "2024-07-30",
      endDate: "2024-08-05",
      lastActionedBy: {
        profilePic: "path/to/profilePic1.jpg",
        empId: "E123",
        name: "John Doe",
      },
      comments: "Initial investigation is underway.",
      involvedUsers: [
        { name: "Alice", avatar: "path/to/aliceAvatar.jpg" },
        { name: "Bob", avatar: "path/to/bobAvatar.jpg" },
      ],
    },
    {
      id: 1,
      incidentNumber: "INC67890",
      incidentDate: "2024-08-02",
      status: "Cancelled",
      startDate: "2024-07-31",
      endDate: "2024-08-06",
      lastActionedBy: {
        profilePic: "path/to/profilePic2.jpg",
        empId: "E124",
        name: "Jane Smith",
      },
      comments: "Issue resolved and closed.",
      involvedUsers: [
        { name: "Charlie", avatar: "path/to/charlieAvatar.jpg" },
        { name: "Dave", avatar: "path/to/daveAvatar.jpg" },
      ],
    },
    {
      id: 2,
      incidentNumber: "INC67890",
      incidentDate: "2024-08-02",
      status: "Cancelled",
      startDate: "2024-07-31",
      endDate: "2024-08-06",
      lastActionedBy: {
        profilePic: "path/to/profilePic2.jpg",
        empId: "E124",
        name: "Jane Smith",
      },
      comments: "Issue resolved and closed.",
      involvedUsers: [
        { name: "Charlie", avatar: "path/to/charlieAvatar.jpg" },
        { name: "Dave", avatar: "path/to/daveAvatar.jpg" },
      ],
    },
    {
      id: 3,
      incidentNumber: "INC67890",
      incidentDate: "2024-08-02",
      status: "Cancelled",
      startDate: "2024-07-31",
      endDate: "2024-08-06",
      lastActionedBy: {
        profilePic: "path/to/profilePic2.jpg",
        empId: "E124",
        name: "Jane Smith",
      },
      comments: "Issue resolved and closed.",
      involvedUsers: [
        { name: "Charlie", avatar: "path/to/charlieAvatar.jpg" },
        { name: "Dave", avatar: "path/to/daveAvatar.jpg" },
      ],
    },
  ]);

  const handleToggle1 = (id) => {
    setRecentIncidents((prevCards) =>
      prevCards.map((card) =>
        card.id === id
          ? { ...card, isOpen: !card.isOpen }
          : { ...card, isOpen: false }
      )
    );
  };

  const [incidentsByAcademicYear, setIncidentsByAcademicYear] = useState([
    {
      academicYear: "2024-2025",
      incidents: [
        {
          id: 0,
          incidentNumber: "INC12345",
          incidentDate: "2024-08-01",
          status: "Cancelled",
          startDate: "2024-07-30",
          endDate: "2024-08-05",
          lastActionedBy: {
            profilePic: "path/to/profilePic1.jpg",
            empId: "E123",
            name: "John Doe",
          },
          comments: "Initial investigation is underway.",
          involvedUsers: [
            { name: "Alice", avatar: "path/to/aliceAvatar.jpg" },
            { name: "Bob", avatar: "path/to/bobAvatar.jpg" },
          ],
        },
        {
          id: 1,
          incidentNumber: "INC12345",
          incidentDate: "2024-08-01",
          status: "Cancelled",
          startDate: "2024-07-30",
          endDate: "2024-08-05",
          lastActionedBy: {
            profilePic: "path/to/profilePic1.jpg",
            empId: "E123",
            name: "John Doe",
          },
          comments: "Initial investigation is underway.",
          involvedUsers: [
            { name: "Alice", avatar: "path/to/aliceAvatar.jpg" },
            { name: "Bob", avatar: "path/to/bobAvatar.jpg" },
          ],
        },
      ],
    },
    {
      academicYear: "2023-2024",
      incidents: [
        {
          id: 0,
          incidentNumber: "INC12345",
          incidentDate: "2024-08-01",
          status: "Cancelled",
          startDate: "2024-07-30",
          endDate: "2024-08-05",
          lastActionedBy: {
            profilePic: "path/to/profilePic1.jpg",
            empId: "E123",
            name: "John Doe",
          },
          comments: "Initial investigation is underway.",
          involvedUsers: [
            { name: "Alice", avatar: "path/to/aliceAvatar.jpg" },
            { name: "Bob", avatar: "path/to/bobAvatar.jpg" },
          ],
        },
        {
          id: 1,
          incidentNumber: "INC12345",
          incidentDate: "2024-08-01",
          status: "Cancelled",
          startDate: "2024-07-30",
          endDate: "2024-08-05",
          lastActionedBy: {
            profilePic: "path/to/profilePic1.jpg",
            empId: "E123",
            name: "John Doe",
          },
          comments: "Initial investigation is underway.",
          involvedUsers: [
            { name: "Alice", avatar: "path/to/aliceAvatar.jpg" },
            { name: "Bob", avatar: "path/to/bobAvatar.jpg" },
          ],
        },
      ],
    },
    {
      academicYear: "2022-2023",
      incidents: [],
    },
    {
      academicYear: "2021-2022",
      incidents: [],
    },
    {
      academicYear: "2020-2021",
      incidents: [],
    },
    {
      academicYear: "2019-2020",
      incidents: [],
    },
  ]);

  const handleToggle2 = (id) => {
    setIncidentsByAcademicYear((prevYears) =>
      prevYears.map((year) => ({
        ...year,
        incidents: year.incidents.map((card) =>
          card.id === id
            ? { ...card, isOpen: !card.isOpen }
            : { ...card, isOpen: false }
        ),
      }))
    );
  };

  const [expandedYear, setExpandedYear] = useState(null);

  const handleToggle3 = (year) => {
    if (expandedYear === year) {
      setExpandedYear(null);
    } else {
      setExpandedYear(year);
    }
  };

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleAvatarClick = (user) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedUser(null);
  };

  return (
    <RevealCard>
      <Box ml={2} mr={2}>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          mt={1}
          height={70}
          width={"100%"}
        >
          <Box mt={4} ml={3} mb={4}>
            <TextField
              variant="outlined"
              placeholder="Search by Student ID / Student Name"
              sx={{ width: isLaptop ? 400 : 500 }}
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Search sx={{ fontSize: "1.3rem", cursor: "pointer" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
        <Box style={{ height: "100%", paddingBottom: "20px" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </Box>

        {incidentsByAcademicYear.map((year) => (
          <Box key={year.academicYear}>
            <Box>
              <Typography
                sx={{
                  backgroundColor: "#ECEDED",
                  margin: "10px",
                  borderRadius: "6px",
                  fontWeight: "700",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconButton onClick={() => handleToggle3(year.academicYear)}>
                  {expandedYear ? <ArrowRightIcon /> : <ArrowDropDownIcon />}
                </IconButton>
                {year.academicYear}
              </Typography>
            </Box>
            {expandedYear === year.academicYear && (
              <Grid container spacing={2}>
                {year.incidents.map((card) => (
                  <Grid item xs={12} sm={6} md={4} key={card.id}>
                    <DisplayCard {...card} onToggle={handleToggle2} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        ))}

        <Box
          display="flex"
          flexDirection="row"
          width={"100%"}
          alignItems={"end"}
        >
          <Typography
            sx={{ fontSize: "18px", fontWeight: "700", paddingLeft: "10px" }}
          >
            Recent Incidents
          </Typography>
          <Box flexGrow={1} />
          <ReignsSelect
            items={statuses}
            label="Status"
            sx={{ width: "200px", right: "20px" }}
          />
        </Box>

        <Grid container spacing={2}>
          {recentincidents.map((card) => (
            <Grid item xs={12} sm={6} md={4} key={card.id}>
              <DisplayCard
                {...card}
                onToggle={handleToggle1}
                dialogOpen={dialogOpen}
                selectedUser={selectedUser}
                handleAvatarClick={handleAvatarClick}
                handleCloseDialog={handleCloseDialog}
              />
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            paddingTop: "20px",
            paddingRight: "20px",
            paddingBottom: "20px",
            gap: "20px",
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
    </RevealCard>
  );
};

const DisplayCard = ({
  id,
  isOpen,
  onToggle,
  incidentNumber,
  incidentDate,
  status,
  startDate,
  endDate,
  lastActionedBy,
  comments,
  involvedUsers,
  dialogOpen,
  selectedUser,
  handleAvatarClick,
  handleCloseDialog,
}) => {
  return (
    <Box
      sx={{
        padding: "5px",
        width: "400px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          border: "0.5px solid",
          borderColor: "#e12222",
          borderRadius: "5px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            paddingY: "1px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginBottom: "20px",
              marginTop: "10px",
            }}
          >
            <img src={Frame} alt="frame" />
            <Box
              sx={{
                position: "absolute",
                paddingLeft: "10px",
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "600",
                  color: "white",
                  fontSize: "13px",
                }}
              >
                Incident#: {incidentNumber}
              </Typography>
              <Typography
                sx={{
                  fontWeight: "300",
                  color: "white",
                  fontSize: "11px",
                }}
              >
                {incidentDate}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography
              sx={{
                fontSize: "12px",
                paddingX: "5px",
                backgroundColor: "#fed7d7",
                borderRadius: "6px",
                height: "20px",
              }}
            >
              {status}
            </Typography>
            <IconButton sx={{ marginRight: "5px" }}>
              {isOpen ? <EditIcon /> : <MoreVertIcon />}
            </IconButton>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            paddingX: "10px",
            paddingY: "5px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <img src={Suspend} alt="suspend" />
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: "700",
                  paddingX: "10px",
                }}
              >
                {startDate} - {endDate}
              </Typography>
              <img src={Invoice} alt="invoice" />
              <Typography sx={{ fontSize: "11px", paddingX: "10px" }}>
                {incidentDate}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <IconButton
                onClick={() => {
                  onToggle(id);
                }}
                sx={{}}
              >
                {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </IconButton>
            </Box>
          </Box>
        </Box>

        {isOpen && (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                paddingX: "10px",
                paddingY: "5px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Typography
                  sx={{
                    fontSize: "12px",
                    paddingRight: "20px",
                    color: "#7c7c81",
                  }}
                >
                  Non-Compliance type
                </Typography>
                <Typography sx={{ fontSize: "12px", fontWeight: "700" }}>
                  Loss or Damage of Property
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                paddingX: "10px",
                paddingY: "5px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                    paddingRight: "20px",
                    color: "#7c7c81",
                  }}
                >
                  Last Actioned By
                </Typography>

                <Avatar alt="profile" src={lastActionedBy.profilePic} />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "10px",
                  }}
                >
                  <Typography sx={{ fontSize: "12px", fontWeight: "700" }}>
                    {lastActionedBy.empId}
                  </Typography>
                  <Typography sx={{ fontSize: "11px" }}>
                    {lastActionedBy.name}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                paddingX: "10px",
                paddingY: "5px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Typography
                  sx={{
                    fontSize: "12px",
                    paddingRight: "20px",
                    color: "#7c7c81",
                  }}
                >
                  Comments
                </Typography>

                <Box
                  sx={{
                    border: "0.25px solid #cbc6c6",
                    padding: "5px",
                    borderRadius: "5px",
                    height: "90px",
                    overflowY: "scroll",
                    scrollbarWidth: "none",
                    fontSize: "11px",
                    width: "280px",
                  }}
                >
                  {comments}
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                paddingX: "10px",
                paddingY: "5px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box flexGrow={1} />

              <Button onClick={() => handleAvatarClick(user)}>
                <Box>
                  <AvatarGroup max={4}>
                    {involvedUsers.map((user, index) => (
                      <Avatar
                        key={index}
                        alt={user.name}
                        src={user.avatar}
                        sx={{ width: "30px", height: "30px" }}
                      />
                    ))}
                  </AvatarGroup>
                </Box>
              </Button>
            </Box>
          </>
        )}
      </Box>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Box>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Name: {selectedUser.name}
              </Typography>
              <Typography variant="body2">
                Employee ID: {selectedUser.empId}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ViewEditIncident;
