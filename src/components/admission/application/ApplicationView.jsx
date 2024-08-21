import { Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../../../config/api";
import {
  DataGrid,
  GridExpandMoreIcon,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarExportContainer,
} from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";

const ApplicationView = () => {
  const [applications, setApplication] = useState(null);

  const state = useLocation();

  useEffect(() => {
    console.log(state.state.filter)
    api
      .get("/admission/application/", {
        params: {
          ...state.state.filter
        },
      })
      .then((res) => {
        const data = res.data;
        const values = data.map((user, idx) => {
          return {
            id: idx + 1,
            app_id: user.application_id,
            primary_contact: user.candidate_details.contact_number,
            applied_for: user.application_details.applying_for,
            name:
              user.candidate_details.first_name +
              " " +
              user.candidate_details.last_name,
            avatarUrl: user.candidate_details.profile_photo,
            email: user.candidate_details.email,
            created_at: new Date(user.created_at).toLocaleDateString(),
            screening_status:
              user.status.charAt(0).toUpperCase() + user.status.slice(1),
          };
        });
        setApplication(values);
      })
      .catch((err) => console.error(err));
  }, []);

  const columns = [
    { field: "id", headerName: "#", width: 50 },
    {
      field: "avatar",
      headerName: "Avatar",
      headerClassName: "center-header",

      flex: 1,
      renderCell: (params) => (
        <img
          src={params.row.avatarUrl} // Replace with the field containing the image URL
          alt={params.row.name} // Provide an alt text for accessibility
          style={{ height: "100%", aspectRatio: 1, objectFit: "contain" }}
        />
      ),
    },
    { field: "app_id", headerName: "Application Id", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "primary_contact",
      headerName: "Primary Contact Number",
      flex: 1,
    },
    {
      field: "applied_for",
      headerName: "Applied For",
      flex: 1,
    },

    { field: "created_at", headerName: "Applied On", flex: 1 },
    { field: "screening_status", headerName: "Screening Status", flex: 1 },
    {
      field: "action",
      disableSelectionOnClick: true,
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Button LinkComponent={Link} to={`${params?.row.app_id}/`}>
          Details
        </Button>
      ),
    },
  ];

  const rows = applications;

  const boldCell = (params) => {
    return params.field === "app_id" ? "bold-column" : "";
  };

  const CustomToolbar = () => (
    <GridToolbarContainer>
      {/* <GridToolbarExport /> */}
      <GridToolbar />
    </GridToolbarContainer>
  );

  return (
    <div className="application-view">
      {applications ? (
        <div style={{ width: "100%" }}>
          <DataGrid
            initialState={{
              pagination: { paginationModel: { pageSize: 50 } },
            }}
            pageSizeOptions={[20, 50, 100]}
            density="standard"
            rowHeight={120}
            getCellClassName={boldCell}
            rows={rows}
            columns={columns}
            slots={{ toolbar: CustomToolbar }}
          />
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

export default ApplicationView;
