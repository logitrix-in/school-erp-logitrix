import React, { useState } from "react";
import RevealCard from "../../../AnimationComponents/RevealCard";
import Bbox from "../../../UiComponents/Bbox";
import { Box, Divider, Typography, Radio, Button, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import "./styles.css";

const Individual = () => {
  // breakpoints
  const isSmall = useMediaQuery("(max-width: 1364px)");
  const isTablet = useMediaQuery("(min-width: 1365px) and (max-width: 1535px)");
  const isLaptop = useMediaQuery("(min-width: 1536px) and (max-width: 1706px)");
  const isDesktop = useMediaQuery(
    "(min-width: 1707px) and (max-width: 1919px)"
  );
  const isLarge = useMediaQuery("(min-width: 1920px)");
  const isXlarge = useMediaQuery("(min-width: 2560px)");

  // States
  const [isEditButtonActive, setIsEditButtonActive] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showEditBtn, setShowEditBtn] = useState(true);

  const navigate = useNavigate();

  // table columns
  const columns = [
    {
      field: "radioButtons",
      headerName: "",
      flex: 0.2,
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
            setIsEditButtonActive(true);
          }}
        />
      ),
    },
    { field: "id", headerName: "Employee ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "emp_type", headerName: "Employee Type", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    { field: "grade", headerName: "Grade", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
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
  ];

  // table rows
  const rows = [
    {
      id: "AG240001",
      name: "Saunav Ray",
      emp_type: "Teaching Staff",
      department: "Science",
      grade: 'B2',
      status: "Active",
    },
    {
      id: "AG240002",
      name: "Saunav Ray",
      emp_type: "Teaching Staff",
      department: "Science",
      grade: 'B2',
      status: "Active",
    },
    {
      id: "AG240003",
      name: "Saunav Ray",
      emp_type: "Teaching Staff",
      department: "Science",
      grade: 'B2',
      status: "Active",
    },
    {
      id: "AG240004",
      name: "Saunav Ray",
      emp_type: "Teaching Staff",
      department: "Science",
      grade: 'B2',
      status: "Active",
    }
  ];

  return (
    <RevealCard>
      <Bbox
        mt={2}
        width={"100%"}
        height={"100%"}
        borderRadius={2}
        overflow="hidden"
      >
        {/* Individual text */}
        <Box
          bgcolor="white"
          py={1.3}
          px={3}
          borderRadius={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography fontWeight={700} fontSize="1.1rem">
            Individual
          </Typography>
        </Box>

        {/* Divider */}
        <Divider />

        {/* Search area and buttons */}
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          p={2}
          mt={1}
          height={70}
          width={"100%"}
        >
          {/* Search input and Search button container */}
          <Box display="flex" alignItems="center">
            <input
              type="text"
              placeholder="Search by Employee ID or Employee Name"
              style={{
                width: 420,
                height: "39px",
                borderRadius: "7px",
                border: "1px solid #ccc",
                paddingLeft: "10px",
              }}
            />


          </Box>

          {/* Spacer */}
          <Box flex={1} />

          {/* Edit button */}
          {
            showEditBtn && (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: isEditButtonActive ? "#C4673B" : "#ccc",
                  "&:hover": {
                    backgroundColor: isEditButtonActive ? "#A14E2C" : "#ccc",
                  },
                }}
                onClick={() => navigate("/employee/manage/OnBoardingDetails")}
                disabled={!isEditButtonActive}
              >
                View / Edit
              </Button>
            )
          }

        </Box>

        {/* Table */}
        <Box m={2} mb={5} height={"100%"}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          // checkboxSelection
          />
        </Box>
      </Bbox>
    </RevealCard>
  );
};

export default Individual;
