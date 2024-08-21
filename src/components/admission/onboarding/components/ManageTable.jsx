import { Box, Button, CircularProgress, LinearProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../../../config/api";
import { ErrorOutlineSharp } from "@mui/icons-material";

export default function DataTable() {
  const [curMode, setCurMode] = useState("class");

  // candidate
  const candidateColumn = [
    {
      field: "application_no",
      headerName: "Application Id",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          LinkComponent={Link}
          to={`${params.row.application_no}/`}
          // onClick={() => console.log(params)}
        >
          Review
        </Button>
      ),
    },
  ];

  // class
  const classColumn = [
    {
      field: "class",
      headerName: "Class",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "pending",
      headerName: "Pending",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => {
            console.log(params.row?.candidates);
            setColumn(candidateColumn);
            setRows(params.row?.candidates);
            setCurMode("candidates");
          }}
        >
          View
        </Button>
      ),
    },
  ];
  const [classRows, setClassRow] = useState([]);

  // table setters
  const [rows, setRows] = useState([]);
  const [columns, setColumn] = useState(classColumn);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api
      .get("/admission/test-center/onboarding/overview/table/")
      .then((res) => {
        console.log(res.data.map((c, i) => ({ ...c, id: i })));
        setClassRow(res.data.map((c, i) => ({ ...c, id: i })));
        setRows(res.data.map((c, i) => ({ ...c, id: i })));
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {loading ? (
        <Box>
          <CircularProgress />
        </Box>
      ) : (
        <div style={{ width: "max(50%, 30rem)" }}>
          <div style={{ height: 370 }}>
            <DataGrid
              rowSelection={false}
              density="standard"
              rows={rows}
              columns={columns}
            />
          </div>
          {curMode != "class" && (
            <Button
              variant="contained"
              sx={{ mt: 1 }}
              size="small"
              onClick={() => {
                setCurMode("class");
                setColumn(classColumn);
                setRows(classRows);
              }}
            >
              Back
            </Button>
          )}
        </div>
      )}
    </>
  );
}
