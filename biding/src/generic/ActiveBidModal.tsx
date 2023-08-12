import { useState } from "react";
import Modal from "@mui/joy/Modal";
import { Typography, Button, Box, Grid, TextField } from "@mui/material";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import { ActiveProducts } from "../service/product"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { inputProps } from "../Constants";
interface BidModalProps {
  layout: string;
  setLayout: Function;
  setOpen?: Function;
  productId: number;
  currentDate: string;
  starting_price: number
}

export default function ActiveBidModal({
  layout,
  setLayout,
  productId,
  currentDate,
  starting_price,
}: BidModalProps) {
    const [date, setDate] = useState(new Date(currentDate).toISOString());
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (date >= new Date().toISOString()) {
      try {
        await ActiveProducts({
          productId,
          bid_time: date,
          starting_price: Number(data.get("price")),
        });
        setLayout(undefined);
        window.location.reload();
      } catch (error) {
        console.error("Error submitting bid:", error);
      }
    } else {

    }
  };

  return (
    <div>
      <Modal open={!!layout} onClose={() => setLayout(undefined)}>
        <ModalDialog
          aria-labelledby="layout-modal-title"
          aria-describedby="layout-modal-description"
          layout={"center"}
        >
          <ModalClose />
          <Typography id="layout-modal-title" component="h2">
            Modal Dialog
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                defaultValue={Number(starting_price)}
                  required
                  fullWidth
                  name="price"
                  label="Starting Price in $"
                  type="number"
                  id="price"
                  inputProps={inputProps}
                />
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </div>
  );
}
