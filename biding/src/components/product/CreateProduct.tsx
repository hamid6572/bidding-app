import React, { useState } from "react";
import {
  Button,
  CssBaseline,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useNavigate } from "react-router-dom";
import { createProducts } from "../../service/product";
import Header from "../../layout/Header";
import Notification from "../../generic/Notification";
import { inputProps } from "../../Constants";


export default function CreateProduct() {
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 1);
  
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date(currentDate).toISOString());
  const [productName, setProductName] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const result = await createProducts({
        name: productName,
        starting_price: Number(data.get("price")),
        bid_time: date,
      });
      if (result.status === 201) return navigate("/dashboard");
      setOpen(true);
    } catch (error) {
      console.error(error);
      setOpen(true);
    }
  };

  return (
    <>
      <Header
      />
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
          <Typography component="h1" variant="h5">
            Add Product
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Product Name"
                  name="name"
                  onChange={({ target: { value } }) => setProductName(value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="price"
                  label="Starting Price in $"
                  type="number"
                  id="price"
                  inputProps={inputProps}
                />
              </Grid>
            </Grid>
            <div style={{ marginTop: "20px" }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="Bid Time"
                  defaultValue={new Date(date)}
                  disablePast
                  onChange={(newValue) => {
                    setDate(newValue?.toISOString() as string);
                  }}
                />
              </LocalizationProvider>
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Product
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </Button>
          </Box>
        </Box>
        <Notification
          open={open}
          setOpen={setOpen}
          message={"Something went wrong, please try again"}
        />
      </Container>
    </>
  );
}
