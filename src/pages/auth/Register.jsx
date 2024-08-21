import { Icon } from "@iconify/react";
import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  Button,
  Checkbox,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("username"),
      password: data.get("password"),
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ bgcolor: "primary.main", m: 2 }}>
          <Icon
            icon="icon-park-outline:setting-two"
            color="white"
            fontSize={"1.4rem"}
          />
        </Avatar>
        <Typography component="h1" variant="h2" fontWeight={400}>
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="cnfpassword"
            label="Confirm Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Agree to terms and conditions"
          />
          <Button
            type="submit"
            color="secondary"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>

          <Typography textAlign={"center"}>
            Already have an account? <Link to={"/login"}>Log In</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
