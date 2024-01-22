import * as React from "react";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { tokens } from "../themes/theme";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    axios
      .post("/api/users/register", Object.fromEntries(data.entries()))
      .then((response) => {
        let result = response.data.response;
        let user = response.data.data;
        navigate("/");
        // console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });

    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& .MuiFormLabel-root": {
            border: "none",
            color: colors.greenAccent[300],
          },
          "& .MuiButtonBase-root": {
            backgroundColor: colors.blueAccent[700],
          },
        }}
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <img
            alt="profile-user"
            width="200px"
            height="200px"
            src={
              theme.palette.mode === "dark"
                ? "/labManagerLight.png"
                : "/labManager.png"
            }
            style={{
              borderRadius: "50%",
              marginBottom: "6rem",
              marginTop: "6rem",
            }}
          />
        </Box>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="userName"
                required
                fullWidth
                id="userName"
                label="User Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid
            container
            justifyContent="flex-end"
            sx={{
              "& .MuiTypography-root": {
                border: "none",
                color: colors.greenAccent[300],
              },
            }}
          >
            <Grid item>
              <Typography
                component="div"
                variant="body2"
                sx={{ mt: 2, textAlign: "center" }}
              >
                Already have an account? {" "}
                <Link to="/login" style={{ color: colors.blueAccent[100] }}>
                  Sign in
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
