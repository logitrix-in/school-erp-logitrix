import RevealCard from "@/components/AnimationComponents/RevealCard";
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  IconButton,
  Tooltip,
} from "@mui/material";
import Banner from "@/components/Banner";
import { useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import { DataGrid } from "@mui/x-data-grid";
import ProfessionalTaxPopup from './ProfessionalTaxPopup'

const ProfessionalTax = () => {
  const [professionalTaxPopup, setProfessionalTaxPopup] = useState("");

  // Define the columns
  const columns = [
    {
      field: "state",
      headerName: "State",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "deduction",
      headerName: "Deduction",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "grossSalary",
      headerName: "Gross Salary",
      flex: 1.5,
      minWidth: 200,
      renderCell: (params) => {
        // Handle ranges differently
        if (params.value.startsWith("Above")) {
          return params.value;
        }
        return `₹ ${params.value}`;
      },
    },
    {
      field: "amountPayable",
      headerName: "Amount Payable",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => `₹ ${params.value}`,
    },
  ];

  // Define the rows
  const rows = [
    {
      id: 1,
      state: "West Bengal",
      deduction: "Monthly",
      grossSalary: "Upto ₹10,000",
      amountPayable: "Nil",
    },
    {
      id: 2,
      state: "West Bengal",
      deduction: "Monthly",
      grossSalary: "₹10,001 - ₹15,000",
      amountPayable: "110",
    },
    {
      id: 3,
      state: "West Bengal",
      deduction: "Monthly",
      grossSalary: "₹15,001 - ₹25,000",
      amountPayable: "130",
    },
    {
      id: 4,
      state: "West Bengal",
      deduction: "Monthly",
      grossSalary: "₹25,001 - ₹40,000",
      amountPayable: "150",
    },
    {
      id: 5,
      state: "West Bengal",
      deduction: "Monthly",
      grossSalary: "Above ₹40,001",
      amountPayable: "250",
    },
    {
      id: 6,
      state: "Telengana",
      deduction: "Monthly",
      grossSalary: "₹10,001 - ₹15,000",
      amountPayable: "110",
    },
    {
      id: 7,
      state: "Telengana",
      deduction: "Monthly",
      grossSalary: "₹15,001 - ₹25,000",
      amountPayable: "130",
    },
    {
      id: 8,
      state: "Telengana",
      deduction: "Monthly",
      grossSalary: "₹25,001 - ₹40,000",
      amountPayable: "150",
    },
    {
      id: 9,
      state: "Telengana",
      deduction: "Monthly",
      grossSalary: "Above ₹40,001",
      amountPayable: "250",
    },
  ];

  // Create a lookup for merged cells
  const mergedStateRows = {};
  let currentState = null;
  let startIdx = 0;

  rows.forEach((row, idx) => {
    if (currentState !== row.state) {
      if (currentState) {
        mergedStateRows[startIdx] = idx - startIdx;
      }
      currentState = row.state;
      startIdx = idx;
    }
  });
  // Don't forget to add the last group
  if (currentState) {
    mergedStateRows[startIdx] = rows.length - startIdx;
  }

  return (
    <RevealCard>
      <Box p={2} display={"flex"} flexDirection={"column"} gap={3}>
        <Box display={"flex"} alignItems={"center"}>
          <Banner
            text={"Employees’ Provident Fund"}
            style={{ marginTop: "0px" }}
          />
          <Tooltip title="Professional Tax is state specific. It will be applicable according to employee base  location and tax slab.">
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Box style={{ display: "flex", justifyContent: "flex-end" }}>
          <Box
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
              0 Results found
            </Typography>
          </Box>
        </Box>

        <Box sx={{ width: "100%", height: 400 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
            experimentalFeatures={{ columnGrouping: true }}
            getCellClassName={(params) => {
              // Add styling for merged cells
              if (params.field === "state") {
                const rowIndex = rows.findIndex((r) => r.id === params.id);
                if (
                  rowIndex > 0 &&
                  rows[rowIndex].state === rows[rowIndex - 1].state
                ) {
                  return "hidden-cell";
                }
              }
              return "";
            }}
            hideFooterSelectedRowCount
            getRowSpacing={(params) => ({
              top: params.isFirstVisible ? 0 : 5,
              bottom: params.isLastVisible ? 0 : 5,
            })}
          />
          <style>
            {`
          .hidden-cell {
            visibility: hidden;
          }
          .grid-cell {
            border-right: 1px solid rgba(224, 224, 224, 1);
          }
        `}
          </style>
        </Box>

        <Box display={"flex"} justifyContent={"end"}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setProfessionalTaxPopup(true)}
          >
            Edit
          </Button>
        </Box>

        <ProfessionalTaxPopup open={professionalTaxPopup} close={() => setProfessionalTaxPopup(false)} />
      </Box>
    </RevealCard>
  );
};

export default ProfessionalTax;
