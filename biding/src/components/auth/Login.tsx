import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  Grid,
  Box,
  Typography,
  Container,
  TextField,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import login from "../../service/login";
import Notification from "../../generic/Notification";
import { LoginRedirect } from "../../utils/auth";

export default function Login() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const response = await login({
        email: data?.get("email") as string,
        password: data?.get("password") as string,
      });
      if (response.status === 200) {
        return LoginRedirect(response, navigate);
      }
      setOpen(true);
    } catch (error) {
      console.error(error);
      setOpen(true);
    }
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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email"
                id="email"
                required
                fullWidth
                type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="password"
                label="Password"
                id="password"
                type="password"
                required
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link to="/Register">Register</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Notification
        open={open}
        setOpen={setOpen}
        message={"Invalid Credentials. Please try again"}
      />
    </Container>
  );
}
