import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "@mui/icons-material";
import { Icon } from "@iconify/react";
import { config } from "../config";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import Quickbar from "./Quickbar";
import api from "../config/api";

const Navbar = () => {
  const user = useAuth();
  const navigate = useNavigate();
  return (
    <Box
      ml={config.NAVBAR_WIDTH}
      flex={1}
      height={"fit-content"}
      pt={1}
      px={3}
      sx={{
        backgroundColor: "rgba(255,255,255,0.3)",
        backdropFilter: "blur(5px)",
        pointerEvents: "auto",
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        height={"3rem"}
      >
        <Box mr={"auto"}>
          <TextField
            size="small"
            placeholder="Search Faculty/Parent/Student"
            sx={{ width: "22rem" }}
            variant="outlined"
            InputProps={{
              sx: {
                fontSize: "0.9rem",
              },
              endAdornment: (
                <InputAdornment position="end">
                  <Search sx={{ fontSize: "1.3rem" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box
          display={"flex"}
          gap={1}
          fontSize={"1.6rem"}
          mr={2}
          color={"black"}
        >
          <IconButton>
            <Icon icon="mingcute:notification-fill" />
          </IconButton>
          <IconButton>
            <Icon icon="gg:list" />
          </IconButton>
          <IconButton>
            <Icon icon="simple-line-icons:calender" />
          </IconButton>
        </Box>
        {user?.user?.username == null ? (
          <Button
            variant="contained"
            LinkComponent={Link}
            to="/login"
            size="small"
          >
            Login
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                api
                  .delete("/login/")
                  .then((res) => {})
                  .catch()
                  .finally(() => {
                    navigate("/login/");
                    user.setUser(null);
                  });
              }}
            >
              Logout
            </Button>
          </>
        )}
      </Box>
      <Box mt={1}>
        <Quickbar />
      </Box>
    </Box>
  );
};

export default Navbar;
