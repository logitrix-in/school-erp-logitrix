import React, { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Button,
  Typography,
  Radio,
  Link,
  IconButton
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { useMediaQuery } from "@material-ui/core";
import AttachFileIcon from "@mui/icons-material/AttachFile";

const LLRRecords = () => {
  // breakpoints
  const isSmall = useMediaQuery("(max-width: 1364px)");
  const isTablet = useMediaQuery("(min-width: 1365px) and (max-width: 1535px)");
  const isLaptop = useMediaQuery("(min-width: 1536px) and (max-width: 1706px)");
  const isDesktop = useMediaQuery(
    "(min-width: 1707px) and (max-width: 1919px)"
  );
  const isLarge = useMediaQuery("(min-width: 1920px)");
  const isXlarge = useMediaQuery("(min-width: 2560px)");

  const [selectedRow, setSelectedRow] = useState(null);

  // table columns
  const columns = [
    // { field: "space", headerName: "", width: isLarge ? 80 : 50 },
    {
      field: "llrid",
      headerName: "LLR ID",
      width: isLaptop ? 80 : isLarge ? 120 : isTablet ? 120 : 100,
    },
    {
      field: "id",
      headerName: "Student ID",
      width: isLaptop ? 100 : isLarge ? 140 : isTablet ? 140 : 120,
      renderCell: (params) => (
        <Link underline="hover" color="primary">
          {params.value}
        </Link>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      width: isLaptop ? 100 : isLarge ? 140 : 120,
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
      field: "period",
      headerName: "Leave Request Period",
      width: isLaptop ? 200 : isTablet ? 220 : 220,
    },
    {
      field: "reason",
      headerName: "Reason",
      width: isLaptop ? 110 : isLarge ? 150 : 130,
    },
    {
      field: "description",
      headerName: "Description",
      width: isLaptop ? 150 : isLarge ? 190 : 170,
    },
    {
      field: "status",
      headerName: "Status",
      width: isLaptop ? 110 : isLarge ? 130 : isTablet ? 110 : 120,
      renderCell: (params) => (
        <Box
          style={{
            backgroundColor:
              params.value === "Accepted"
                ? "#c6f6d5"
                : params.value === "Rejected"
                ? "#fed7d7"
                :params.value === "Pending"
                ? "#feebcb"
                : "transparent",
            borderRadius: "6px",
            width: "90px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    {
      field: "comment",
      headerName: "Comment",
      width: isLaptop ? 150 : isLarge ? 110 : isTablet ? 140 : 120,
    },
    {
      field: "attachment",
      headerName: (
        <IconButton>
          <AttachFileIcon />
        </IconButton>
      ),
      width: isTablet ? 160 : 100,
    },
  ];

  // table rows
  const rows = [
    {
      llrid: "004567",
      id: "AG240001",
      name: "Saunav Ray",
      class: "VI",
      section: "A",
      roll: "19",
      period: "20-Sep-2023 to 27-Sep-2023",
      reason: "Medical Issue",
      description: "Will undergo surgery...",
      status: "Accepted",
      comment: "-",
      attachment: "",
    },
    {
      llrid: "004567",
      id: "AG240002",
      name: "Saunav Ray",
      class: "VI",
      section: "A",
      roll: "19",
      period: "20-Sep-2023 to 27-Sep-2023",
      reason: "Medical Issue",
      description: "Will undergo surgery...",
      status: "Rejected",
      comment: "-",
      attachment: "",
    },
    {
      llrid: "004567",
      id: "AG240003",
      name: "Saunav Ray",
      class: "VI",
      section: "A",
      roll: "19",
      period: "20-Sep-2023 to 27-Sep-2023",
      reason: "Medical Issue",
      description: "Will undergo surgery...",
      status: "Pending",
      comment: "-",
      attachment: "",
    },
    {
      llrid: "004567",
      id: "AG240004",
      name: "Saunav Ray",
      class: "VI",
      section: "A",
      roll: "19",
      period: "20-Sep-2023 to 27-Sep-2023",
      reason: "Medical Issue",
      description: "Will undergo surgery...",
      status: "Accepted",
      comment: "-",
      attachment: "",
    },
    {
      llrid: "004567",
      id: "AG240005",
      name: "Saunav Ray",
      class: "VI",
      section: "A",
      roll: "19",
      period: "20-Sep-2023 to 27-Sep-2023",
      reason: "Medical Issue",
      description: "Will undergo surgery...",
      status: "Accepted",
      comment: "-",
      attachment: "",
    },
    {
      llrid: "004567",
      id: "AG240006",
      name: "Saunav Ray",
      class: "VI",
      section: "A",
      roll: "19",
      period: "20-Sep-2023 to 27-Sep-2023",
      reason: "Medical Issue",
      description: "Will undergo surgery...",
      status: "Accepted",
      comment: "-",
      attachment: "",
    },
    {
      llrid: "004567",
      id: "AG240007",
      name: "Saunav Ray",
      class: "VI",
      section: "A",
      roll: "19",
      period: "20-Sep-2023 to 27-Sep-2023",
      reason: "Medical Issue",
      description: "Will undergo surgery...",
      status: "Accepted",
      comment: "-",
      attachment: "",
    },
    {
      llrid: "004567",
      id: "AG240008",
      name: "Saunav Ray",
      class: "VI",
      section: "A",
      roll: "19",
      period: "20-Sep-2023 to 27-Sep-2023",
      reason: "Medical Issue",
      description: "Will undergo surgery...",
      status: "Accepted",
      comment: "-",
      attachment: "",
    },
    {
      llrid: "004567",
      id: "AG240009",
      name: "Saunav Ray",
      class: "VI",
      section: "A",
      roll: "19",
      period: "20-Sep-2023 to 27-Sep-2023",
      reason: "Medical Issue",
      description: "Will undergo surgery...",
      status: "Accepted",
      comment: "-",
      attachment: "",
    },
    {
      llrid: "004567",
      id: "AG240010",
      name: "Saunav Ray",
      class: "VI",
      section: "A",
      roll: "19",
      period: "20-Sep-2023 to 27-Sep-2023",
      reason: "Medical Issue",
      description: "Will undergo surgery...",
      status: "Accepted",
      comment: "-",
      attachment: "",
    },
    {
      llrid: "004567",
      id: "AG240011",
      name: "Saunav Ray",
      class: "VI",
      section: "A",
      roll: "19",
      period: "20-Sep-2023 to 27-Sep-2023",
      reason: "Medical Issue",
      description: "Will undergo surgery...",
      status: "Accepted",
      comment: "-",
      attachment: "",
    },
  ];

  return (
    <Box>
      {/* Search input area and search button */}
      <Box mt={4}>
        {/* Search input area */}
        <TextField
          variant="outlined"
          placeholder="Search by Student ID / Student Name"
          size="small"
          sx={{ width: 400 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search sx={{ fontSize: "1.3rem", cursor: "pointer" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Total number of results found */}
      <Box style={{ display: "flex", justifyContent: "flex-end" }}>
        <Box
          style={{
            backgroundColor: "#E1EEFB",
            border: "1px solid #3381A5",
            borderRadius: "16px",
            width: 107,
            height: 25,
            padding: "3.7px 14px",
          }}
        >
          <Typography
            style={{
              fontSize: "10px",
              fontWeight: "400",
              color: "#3381A5",
            }}
          >
            {rows.length} Results found
          </Typography>
        </Box>
      </Box>

      {/* table */}
      <Box mt={2} mb={4} pb={10} height="100%">
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 20, 50]}
        />
      </Box>
    </Box>
  );
};

export default LLRRecords;
