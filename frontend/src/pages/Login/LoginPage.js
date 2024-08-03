import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Avatar,
  CssBaseline,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuthStore } from "stores";
import { App } from "antd";

const theme = createTheme();

const LoginPage = () => {
  const { notification } = App.useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = useAuthStore((state) => state.loginUser);
  const handleSignIn = async () => {
    try {
      await loginUser({ email, password });
      navigate("/");
      console.log();
    } catch (error) {
      console.log(error.message);
      notification.error({ message: error.message });
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Paper
            elevation={6}
            sx={{ p: 4, borderRadius: "15px", textAlign: "center" }}
          >
            <Avatar sx={{ m: "auto", bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
              Sign In
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
                onClick={handleSignIn}
              >
                Sign In
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default LoginPage;
