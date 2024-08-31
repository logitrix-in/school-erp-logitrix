import React, { useState } from "react";
import RevealCard from "@/components/AnimationComponents/RevealCard";
import { Box, TextField, Button, Typography, InputLabel, FormControl, Select, MenuItem } from "@mui/material";
import ReignsSelect from "@/components/UiComponents/ReignsSelect";
import useClasses from "../../../hooks/useClasses";
import { DatePicker } from "@mui/x-date-pickers";
import { useMediaQuery } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";

const ActionRecords = () => {
  const isSmall = useMediaQuery("(max-width: 1395px)");
  const isTablet = useMediaQuery("(min-width: 1396px) and (max-width: 1535px)");
  const isLaptop = useMediaQuery("(min-width: 1536px) and (max-width: 1706px)");
  const isDesktop = useMediaQuery(
    "(min-width: 1707px) and (max-width: 1919px)"
  );
  const isLarge = useMediaQuery("(min-width: 1920px)");
  const isXlarge = useMediaQuery("(min-width: 2560px)");

  const { classes, acYear, curYear, sections, nonCompliance } = useClasses();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [academicYear, setAcademicYear] = useState(curYear);

  const columns = [
    {
      field: "id",
      headerName: "Library Card #",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1.4,
    },
    {
      field: "class",
      headerName: "Class",
      flex: 0.6,
    },
    {
      field: "section",
      headerName: "Section",
      flex: 0.6,
    },
    {
      field: "roll",
      headerName: "Roll #",
      flex: 0.6,
    },
    {
      field: "status",
      headerName: "Status",
      renderCell: (params) => (
        <Box
          style={{
            backgroundColor:
              params.value === "Active"
                ? "#C6F6D5"
                : params.value === "Inactive"
                  ? "#FFCCCC"
                  : "transparent",
            flex: 1,
            borderRadius: "4px",
            width: "auto",
            paddingRight: "2px",
            paddingLeft: "2px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
          >
            {params.value}
          </Typography>
        </Box >
      ),
    },
    {
      field: "period",
      headerName: "Last Suspension Period",
      flex: 1.7,
    },
    {
      field: "amount",
      headerName: "Penalty Due Amount",
      flex: 1.5,
    },
    {
      field: "incidents",
      headerName: "Open Incidents",
      flex: 2,
      renderCell: (params) => (
        <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
          {params.row.incidents.map((incident, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{
                backgroundColor: "#e8def8",
                width: "auto",
                paddingLeft: "7px",
                paddingRight: "7px",
                color: "#000000",
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
      amount: "₹5000",
      incidents: ["#223344"],
    },
    {
      id: "AG240002",
      name: "Saunav Ray",
      class: "VI",
      section: "A",
      roll: "19",
      status: "Active",
      period: "N/A",
      amount: "₹5000",
      incidents: ["#223344", "#112244"],
    },
    {
      id: "AG240003",
      name: "Saunav Ray",
      class: "VI",
      section: "A",
      roll: "19",
      status: "Inactive",
      period: "N/A",
      amount: "₹5000",
      incidents: ["#223344"],
    },
    {
      id: "AG240004",
      name: "Saunav Ray",
      class: "VI",
      section: "A",
      roll: "19",
      status: "Active",
      period: "N/A",
      amount: "₹5000",
      incidents: ["#223344"],
    }
  ];

  return (
    <RevealCard>
      <Box sx={{ padding: "50px", display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: "400px",
            }}
          >

            <ReignsSelect items={acYear} multiple defaultValues={[curYear]} label="Academic Year" />
            <ReignsSelect items={classes} multiple label="Class" />
            <ReignsSelect items={sections} multiple label="Section" />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: "500px",
              marginLeft: "50px",
            }}
          >
            <Box display={"flex"} gap={2}>
              <DatePicker
                label="Start Date"
                onChange={(e) => setStartDate(e)}
                // minDate={dayjs()}
                format="DD MMM YYYY"
              />
              <DatePicker
                format="DD MMM YYYY"
                label="End Date"
                minDate={startDate}
                onChange={(e) => setEndDate(e)}
              />
            </Box>

            <TextField label="Penalty Due Amount" fullWidth />

            <ReignsSelect
              items={nonCompliance}
              multiple
              label="Non Compliance"
            />
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" marginTop="50px">
          <Button variant="contained" style={{ width: "734px" }}>
            Submit
          </Button>
        </Box>

        <Box style={{ display: "flex", justifyContent: "flex-end" }}>
          <Box
            mt={8}
            mr={3}
            style={{
              backgroundColor: "#E1EEFB",
              border: "1px solid #3381A5",
              borderRadius: "16px",
              width: 120,
              height: 28,
              marginBottom: 12,
              padding: "4px 14px",
            }}
          >
            <Typography
              style={{
                fontSize: "12px",
                fontWeight: "400",
                color: "#3381A5",
              }}
            >
              {rows.length} Results found
            </Typography>
          </Box>
        </Box>

        <Box style={{ height: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </Box>

        <Box display="flex" justifyContent="flex-end" mr={3} mt={3}>
          <Button variant="outlined">Download Student List</Button>
        </Box>
      </Box>
    </RevealCard>
  );
};

export default ActionRecords;
