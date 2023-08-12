import React from "react";
import Modal from "@mui/joy/Modal";
import { Typography, Button, Box, Grid, TextField } from "@mui/material";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import Bid from "../service/bid";
import { inputProps } from "../Constants";

interface BidModalProps {
  bidAmount: number;
  layout: string;
  setLayout: Function;
  setOpen: Function;
  productId: number;
  lastBid: number
}

export default function BidModal({
  bidAmount,
  layout,
  setLayout,
  setOpen,
  productId,
  lastBid,
}: BidModalProps) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const amount = Number(data.get("Bid-Amount")) as number;

    if ((amount >= bidAmount) && (amount > lastBid)) {
      try {
        await Bid({
          productId,
          amount,
        });
        setLayout(undefined);
        window.location.reload();
      } catch (error) {
        console.error("Error submitting bid:", error);
      }
    } else {
      setOpen(true);
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
                  required
                  fullWidth
                  id="Bid-Amount"
                  label="Bid Amount"
                  name="Bid-Amount"
                  type="number"
                  inputProps={inputProps}
                />
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
