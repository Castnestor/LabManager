import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../themes/theme";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useUserContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [errMsg, setErrMsg] = useState("");
  const [invalid, setInvalid] = useState("");

  const { currentUser, handleUpdateUser } = useUserContext({});

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    let userName = data.get("userName");
    let userPassword = data.get("password");

    let loggedInUser = null;

    try {
      let response = await axios.post("api/users/login", {
        userName: userName,
        password: userPassword,
      });
      loggedInUser = response.data.data;
      console.log(loggedInUser);
    } catch (err) {
      setInvalid("Your userName or password are invalid");
      return setErrMsg(err.message + ": " + err.response.data.result);
    }

    if (!loggedInUser) {
      let newAttempt = loginAttemps + 1;
    }

    handleUpdateUser(loggedInUser);

    navigate("/");
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
          "& .MuiFormLabel-root": {
            border: "none",
            color: colors.greenAccent[300],
          },
          "& .css-mx8x5h-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="userName"
            label="user name"
            name="userName"
            autoComplete="userName"
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
          <div>{invalid}</div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Typography
            component="div"
            variant="body2"
            sx={{ mt: 2, textAlign: "center" }}
          >
            Don't have an account?{" "}
            <Link to="/register" style={{ color: colors.blueAccent[100] }}>
              Register here
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
