import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Radio,
  Divider,
  FormControl,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import Bbox from "../../components/UiComponents/Bbox";
import RevealCard from "../../components/AnimationComponents/RevealCard";
import { DataGrid } from "@mui/x-data-grid";
import { useMediaQuery } from "@material-ui/core";
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { ToastContainer, toast } from "react-toastify";
import Approve from "../../components/employee/claim&bonus/popups/Approve";
import Reject from "../../components/employee/claim&bonus/popups/Reject";
import Raise from "../../components/employee/claim&bonus/popups/Raise";
import ClaimID from "../../components/employee/claim&bonus/popups/ClaimID";
import AddNewBonus from "../../components/employee/claim&bonus/AddNewBonus";
import { useNavigate } from "react-router-dom";

const ClaimsBonuses = () => {

  const curYear = new Date().getFullYear();
  const academicYear = `${curYear}-${(curYear + 1).toString().slice(2, 4)}`;
  const [acYear, setAcYear] = useState(academicYear);
  const [type, setType] = useState("all");
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditButtonActive, setIsEditButtonActive] = useState(null);

  // breakpoints
  const isSmall = useMediaQuery("(max-width: 1364px)");
  const isTablet = useMediaQuery("(min-width: 1365px) and (max-width: 1535px)");
  const isLaptop = useMediaQuery("(min-width: 1536px) and (max-width: 1706px)");
  const isDesktop = useMediaQuery(
    "(min-width: 1707px) and (max-width: 1919px)"
  );
  const isLarge = useMediaQuery("(min-width: 1920px)");
  const isXlarge = useMediaQuery("(min-width: 2560px)");


  const [approvePopup, setApprovePopup] = useState(false);
  const [rejectPopup, setRejectPopup] = useState(false);
  const [downloadPopup, setDownloadPopup] = useState(false);
  const [raisePopup, setRaisePopup] = useState(false);
  const [claimIDPopup, setClaimIDPopup] = useState(false);
  const [addNewBonusPopup, setAddNewBonusPopup] = useState(false);
  const [tab, setTab] = useState("claims");
  const navigate = useNavigate();

  // table columns
  const columns = [
    {
      field: "radioButtons",
      headerName: "",
      width: isLaptop ? 50 : isSmall ? 40 : isTablet ? 50 : 70,
      renderCell: (params) => (
        <Radio
          checked={params.row.id === selectedRow}
          color="primary"
          sx={{
            transform: "scale(0.6)",
          }}
          inputProps={{ "aria-label": params.row.id }}
          onChange={() => {
            setSelectedRow(params.row.id);
            setIsEditButtonActive(params.row.id);
          }}
        />
      ),
    },
    {
      field: "id", headerName: "Claim ID",
      width: isLaptop ? 70 : isLarge ? 110 : isTablet ? 110 : isSmall ? 70 : 90,
      renderCell: (params) => (
        <Typography sx={{ cursor: "pointer", color: "primary.main" }} onClick={() => setClaimIDPopup(true)}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "claim_type", headerName: "Claim Request Type",
      width: isLaptop
        ? 120
        : isLarge
          ? 150
          : isTablet
            ? 170
            : isSmall
              ? 120
              : 140,
    },
    {
      field: "employee_name", headerName: "Employee Name",
      width: isLaptop ? 140
        : isLarge ? 160
          : isTablet ? 180
            : isSmall ? 150
              : 170,
      renderCell: (params) => (
        <Typography>
          {params.value.name}{' '}
          <Typography
            component="span"
            sx={{ color: "primary.main", cursor: "pointer" }}
          >
            ({params.value.id})
          </Typography>
        </Typography>
      ),
    },
    {
      field: "claim_raised_on", headerName: "Claim Raised on",
      width: isLaptop ? 100
        : isLarge ? 110
          : isTablet ? 120
            : isSmall ? 100
              : 140,
    },
    {
      field: "claim_amount", headerName: "Claim Amount",
      width: isLaptop ? 100
        : isLarge ? 110
          : isTablet ? 120
            : isSmall ? 100
              : 140,
    },
    {
      field: "claim_status", headerName: "Claim Status", width: isLaptop ? 80 : isLarge ? 100 : isTablet ? 100 : isSmall ? 80 : 100, renderCell: (params) => (
        <Box
          style={{
            backgroundColor:
              params.value === "Approved"
                ? "#C6F6D5"
                : params.value === "Rejected"
                  ? "#FED7D7"
                  : params.value === "Pending"
                    ? "#FEEBCB"
                    : "transparent",
            color:
              params.value === "Approved"
                ? "#22543D"
                : params.value === "Rejected"
                  ? "#822727"
                  : params.value === "Pending"
                    ? "#822727"
                    : "transparent",
            borderRadius: "6px",
            display: "inline-block",

            paddingLeft: "7px",
            paddingRight: "7px",
            paddingTop: "2px",
            paddingBottom: "2px",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "actioned_by", headerName: "Actioned By",
      width: isLaptop
        ? 120
        : isLarge
          ? 150
          : isTablet
            ? 170
            : isSmall
              ? 120
              : 140,
    },
    {
      field: "attachment", headerName: "Attachment",
      width: isLaptop ? 70 : isLarge ? 110 : isTablet ? 110 : isSmall ? 70 : 90,
      renderCell: (params) => (
        <Box
          style={{
            marginLeft: "24px",
          }}
        >
          <DescriptionOutlinedIcon />
          {params.value}
        </Box>
      ),
    },
  ];

  // table rows
  const rows = [
    {
      id: "CLA76890",
      claim_type: "Internet reimbursement",
      employee_name: {
        name: "Bishakha Das",
        id: "CBH9890"
      },
      claim_raised_on: "4 Jul 2024",
      claim_amount: "₹ 2500",
      claim_status: "Approved",
      actioned_by: "Topesh Mata(CBH9890)",
      attachment: true,
    },
    {
      id: "CLA76891",
      claim_type: "Travel Expenses",
      employee_name: {
        name: "Maya Day",
        id: "CBH9890"
      },
      claim_raised_on: "4 Jul 2024",
      claim_amount: "₹ 2500",
      claim_status: "Rejected",
      actioned_by: "Topesh Mata(CBH9890)",
      attachment: true,
    },
    {
      id: "CLA76892",
      claim_type: "Travel Expenses",
      employee_name: {
        name: "Maya Devi",
        id: "CBH9890"
      },
      claim_raised_on: "4 Jul 2024",
      claim_amount: "₹ 2500",
      claim_status: "Pending",
      actioned_by: "Topesh Mata(CBH9890)",
      attachment: true,
    },
    {
      id: "CLA76893",
      claim_type: "Internet reimbursement",
      employee_name: {
        name: "Rajesh Kumar",
        id: "CBH9890"
      },
      claim_raised_on: "4 Jul 2024",
      claim_amount: "₹ 2500",
      claim_status: "Approved",
      actioned_by: "Topesh Mata(CBH9890)",
      attachment: true,
    }
  ];

  return (
    <>
      {/* top navigation buttons */}
      <div
        style={{
          backgroundColor: "#E5F3FB",
          display: "flex",
          padding: "10px",
          borderRadius: "10px",
          width: "200px",
          marginBottom: "24px"
        }}
      >
        <div>
          <button
            style={{
              backgroundColor: tab === "claims" ? "white" : "transparent",
              border: "none",
              color: "black",
              marginRight: "10px",
              cursor: "pointer",
              borderRadius: "6px",
              padding: "7px 10px 7px 10px",
              fontSize: "16px",
              fontWeight: 400,
            }}
            onClick={() => setTab("claims")}
          >
            Claims
          </button>

          <button
            style={{
              backgroundColor: tab === "bonuses" ? "white" : "transparent",
              border: "none",
              color: "black",
              marginRight: "10px",
              cursor: "pointer",
              borderRadius: "6px",
              padding: "7px 10px 7px 10px",
              fontSize: "16px",
              fontWeight: 400,
            }}
            onClick={() => setTab("bonuses")}
          >
            Bonuses
          </button>
        </div>
      </div >

      {tab === "claims" ? (
        <RevealCard>
          <Bbox borderRadius={2} overflow={"hidden"}>
            <Box
              bgcolor={"white"}
              py={1.3}
              px={3}
              borderRadius={2}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography fontWeight={"700"} borderRadius={1} fontSize={"1.1rem"}>
                Claims Requests
              </Typography>
            </Box>

            <Divider />

            <Box>
              <Box
                display={"flex"}
                flexDirection="row"
                alignItems="center"
                p={2}
                mt={4}
                height={50}
              >

                {/* academic year dropdown */}
                <FormControl fullWidth style={{ width: "21%", marginRight: "30px" }}>
                  <InputLabel>Academic Year</InputLabel>
                  <Select
                    label="Academic Year"
                    value={acYear}
                    onChange={(e) => setAcYear(e.target.value)}
                  >
                    <MenuItem value={"2021-22"}>2021-22</MenuItem>
                    <MenuItem value={"2023-24"}>2023-24</MenuItem>
                    <MenuItem value={"2024-25"}>2024-25</MenuItem>
                    <MenuItem value={"2025-26"}>2025-26</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth style={{ width: "21%", marginRight: "30px" }}>
                  <InputLabel>Claim Status</InputLabel>
                  <Select
                    label="Claim Status"
                    value={type}
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                  >
                    <MenuItem value={"pending"}>Pending</MenuItem>
                    <MenuItem value={"approved"}>Approved</MenuItem>
                    <MenuItem value={"rejected"}>Rejected</MenuItem>
                    <MenuItem value={"all"}>All</MenuItem>
                  </Select>
                </FormControl>

                {/* Spacer */}
                <Box flex={1} />

                {/* search button */}
                <Button variant="outlined" color="primary" onClick={() => setRaisePopup(true)}>Raise New Request</Button>
              </Box>
            </Box>

            {/* table */}
            <Box mt={2} mb={5} style={{ height: "100%" }} mx={2}>
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

            <ToastContainer />

            <Approve open={approvePopup} close={() => setApprovePopup(false)} />
            <Reject open={rejectPopup} close={() => setRejectPopup(false)} />
            <Raise open={raisePopup} close={() => setRaisePopup(false)} />
            <ClaimID open={claimIDPopup} close={() => setClaimIDPopup(false)} />

            <Box display="flex" justifyContent="flex-end" mt={2} mb={5} mr={2}>
              <Button
                color="primary"
                variant="contained"
                sx={{ mr: 2 }}
                onClick={() => setApprovePopup(true)}
              >
                Approve
              </Button>

              <Button
                variant="contained"
                color="secondary"
                sx={{ mr: 2 }}
                onClick={() => setRejectPopup(true)}
              >
                Reject
              </Button>

              <Button
                variant="outlined"
                color="primary"
              >
                Download List
              </Button>
            </Box>
          </Bbox>
        </RevealCard>
      ) : (
        <>
          <Typography>Bonuses</Typography>
          <RevealCard>
            <Bbox borderRadius={2} overflow={"hidden"}>
              <Box
                bgcolor={"white"}
                py={1.3}
                px={3}
                borderRadius={2}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography fontWeight={"700"} borderRadius={1} fontSize={"1.1rem"}>
                  Active Bonuses
                </Typography>
              </Box>

              <Divider />

              <Box>

              </Box>
            </Bbox>
          </RevealCard>
          <AddNewBonus open={addNewBonusPopup} close={() => setAddNewBonusPopup(false)} />
        </>
      )}
    </>
  )
};

export default ClaimsBonuses;
