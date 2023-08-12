import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Grid,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import { UpdateRecord } from "../../utils/auth";
import recharge from "../../service/recharge";
import { inputProps } from "../../Constants";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";

interface BidModalProps {
  layout: string;
  setLayout: Function;
}

export default function Recharge({ layout, setLayout }: BidModalProps) {
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const response = await recharge({
        balance: data.get("balance"),
      });
      if (response.status === 201) {
        UpdateRecord(response, navigate);
        return setLayout(undefined);
      }
    } catch (error) {
      console.error(error);
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
            Recharge Account
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="balance"
                  label="Enter Amount to Recharge"
                  id="balance"
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
              Recharge
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </div>
  );
}
