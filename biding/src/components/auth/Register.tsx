import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import register from "../../service/register";
import Notification from "../../generic/Notification";
import { LoginRedirect } from "../../utils/auth";
import { validateEmail } from "../../utils/emailvalidation";

export default function Register() {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Something went wrong. Please try again."
  );

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;

    if (!validateEmail(setErrorMessage, email)) {
      setOpen(true);
      return;
    }

    try {
      const response = await register({
        name: data.get("name") as string,
        email,
        password: data.get("password") as string,
      });

      if (response.status === 201) return LoginRedirect(response, navigate);
      setOpen(true);
    } catch (error) {
      console.error("Error during registration:", error);
      setOpen(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {[
              { name: "name", label: "Name" },
              { name: "email", label: "Email" },
              {
                name: "password",
                label: "Password",
                type: "password",
              },
            ].map((field) => (
              <Grid item xs={12} key={field.name}>
                <TextField
                  required
                  fullWidth
                  id={field.name}
                  name={field.name}
                  label={field.label}
                  type={field.type || "text"}
                />
              </Grid>
            ))}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link to="/">Login</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Notification open={open} setOpen={setOpen} message={errorMessage} />
    </Container>
  );
}
