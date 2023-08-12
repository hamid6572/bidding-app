import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import getBalance from "../service/balance"
import { ModalDialogProps } from "@mui/joy/ModalDialog";
import Recharge from "../components/recharge/Recharge";


export default function Header() {
  const navigate = useNavigate();
  const [layout, setLayout] = useState<ModalDialogProps["layout"] | undefined>(
    undefined
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    getBalance();
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(()=>{
  }, [anchorEl])



  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate("/dashboard")}
          >
            B<MenuIcon />D
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bidding App
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenMenu}
              color="inherit"
            >
              <AccountCircle
                fontSize="large"
              />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              <MenuItem>User: {localStorage.getItem("name")}</MenuItem>
              <MenuItem>Balance: ${localStorage.getItem("balance")}</MenuItem>
              <MenuItem onClick={() => navigate("/my-products")}>
                My Products
              </MenuItem>
              <MenuItem onClick={() => navigate("/add-product")}>
                Add Product
              </MenuItem>
              <MenuItem onClick={() => setLayout("center")}>
                Recharge Balance
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Recharge layout={layout as string} setLayout={setLayout}/>
    </Box>
  );
}
