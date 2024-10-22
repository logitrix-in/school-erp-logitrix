import {
  Box,
  Divider,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import Bbox from "@/components/UiComponents/Bbox";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import HeadOfficeEdit from "./HeadOfficeEdit";

const ActionCell = ({ params, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onEdit(params.id);
    handleClose();
  };

  const handleDelete = () => {
    onDelete(params.id);
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
};

const HeadOffice = () => {
  const [editHeadOfficePopup, setEditHeadOfficePopup] = useState(false);

  const [rows, setRows] = useState([
    {
      id: 1,
      location: "Kolkata",
      employee_count: 100,
      registered_address: {
        street: "99/1 VBN Road, Tower A2,Maniktala",
        city: "Kolkata",
        pincode: "700021",
      },
    },
  ]);

  const columns = [
    {
      field: "space",
      headerName: "",
      flex: 0.2,
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1,
    },
    {
      field: "employee_count",
      headerName: "Employee Count",
      flex: 1,
    },
    {
      field: "registered_address",
      headerName: "Registered Address",
      flex: 1.5,
      renderCell: (params) => {
        const { street, city, pincode } = params.value;
        return (
          <Box>
            <Typography fontWeight={"600"}>{street}</Typography>
            <Typography>
              {city}, PINCODE- {pincode}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => (
        <ActionCell
          params={params}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ),
    },
  ];

  const handleEdit = (id) => {
    console.log(`Edit row with id: ${id}`);
    setEditHeadOfficePopup(true);
  };

  const handleDelete = (id) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  return (
    <>
      <Bbox borderRadius={2} overflow={"hidden"}>
        <Box
          bgcolor={"white"}
          py={1.3}
          px={2}
          borderRadius={2}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography fontWeight={"700"} fontSize={"1.1rem"}>
            Head Office
          </Typography>
        </Box>

        <Divider />
        <Box p={2} display={"flex"} flexDirection={"column"} gap={2}>
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

          <Box mb={4} style={{ height: "100%" }}>
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

          <HeadOfficeEdit
            open={editHeadOfficePopup}
            close={() => setEditHeadOfficePopup(false)}
          />
        </Box>
      </Bbox>
    </>
  );
};

export default HeadOffice;
