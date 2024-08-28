import React, { useState } from "react";
import RevealCard from "@/components/AnimationComponents/RevealCard";
import { Box, TextField, Button, Typography } from "@mui/material";
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

  const columns = [
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
      field: "class",
      headerName: "Class",
      width: isLaptop ? 80 : isLarge ? 120 : 110,
    },
    {
      field: "section",
      headerName: "Section",
      width: isLaptop ? 100 : isLarge ? 140 : 120,
    },
    {
      field: "roll",
      headerName: "Roll #",
      width: isLaptop ? 90 : isLarge ? 130 : 110,
    },
    {
      field: "status",
      headerName: "Status",
      width: isLaptop ? 110 : isLarge ? 150 : 110,
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
      headerName: "Suspension Period",
      width: isLaptop ? 100 : isLarge ? 140 : 110,
    },
    {
      field: "date",
      headerName: "Date",
      width: isLaptop ? 130 : isLarge ? 170 : 130,
    },
    { field: "amount", headerName: "Amount", width: isLaptop ? 100 : 120 },
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
                backgroundColor: "#C4673B",
                color: "#FFFFFF",
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
    {
      id: "AG240002",
      name: "Saunav Ray",
      class: "VI",
      section: "A",
      roll: "19",
      status: "Active",
      period: "N/A",
      date: "20-Sep-2023",
      incidents: ["#223344"],
    },
    {
      id: "AG240003",
      name: "Saunav Ray",
      class: "VI",
      section: "A",
      roll: "19",
      status: "Inactive",
      period: "N/A",
      date: "20-Sep-2023",
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
      date: "20-Sep-2023",
      incidents: ["#223344"],
    },
    {
      id: "AG240005",
      name: "Saunav Ray",
      class: "VI",
      section: "A",
      roll: "19",
      status: "Active",
      period: "N/A",
      date: "20-Sep-2023",
      incidents: ["#223344", "#223344"],
    },
    {
      id: "AG240006",
      name: "Saunav Ray",
      class: "VI",
      section: "A",
      roll: "19",
      status: "Inactive",
      period: "N/A",
      date: "20-Sep-2023",
      incidents: ["#223344", "#223344"],
    },
    {
      id: "AG240007",
      name: "Saunav Ray",
      class: "VI",
      section: "A",
      roll: "19",
      status: "Active",
      period: "N/A",
      date: "20-Sep-2023",
      incidents: ["#223344"],
    },
    {
      id: "AG240008",
      name: "Saunav Ray",
      class: "VI",
      section: "A",
      roll: "19",
      status: "Active",
      period: "N/A",
      date: "20-Sep-2023",
      incidents: ["#223344", "#223344", "#223344"],
    },
    {
      id: "AG240009",
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
            <ReignsSelect items={acYear} multiple label="Academic Year" />
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