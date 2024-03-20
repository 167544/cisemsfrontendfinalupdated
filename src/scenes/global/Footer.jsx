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

const FooterBar = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

 
  return (
    <Box display="flex" justifyContent="center" p={2} ml={0.2} sx={{background:"#0A6E7C", color:"white"}}>
   CSI Employee Management Portal | All Rights Reserved
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
     
    </Box>
  );
};

export default FooterBar;
