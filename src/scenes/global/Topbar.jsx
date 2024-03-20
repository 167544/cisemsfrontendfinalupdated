// Topbar.jsx
import React, { useEffect, useState } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ManagerSelect from "./ManagerSelect";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logos from '../../Assets/logo.jpg';

const Topbar = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      localStorage.removeItem('token');
      window.location.reload();
      
    }
}
 
  return (
    <Box display="flex" justifyContent="space-between" p={2} ml={0.2} sx={{background:"#0A6E7C"}}>
      <img src={logos} alt="logo" width={"50px"} height={"50px"} />
      <h2 style={{color:"white",fontWeight:"bold"}}>CIS Employee Management Portal</h2>
      {/* SEARCH BAR */}
      {/* <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box> */}

      {/* Select for manager names
      <ManagerSelect  /> */}

      {/* ICONS */}
      <Box style={{display:'flex'}}>
        {/* <IconButton>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton> */}
        <IconButton  onClick = {handleLogout}>
          <PersonOutlinedIcon  />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
