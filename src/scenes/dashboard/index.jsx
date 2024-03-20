import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import UploadExcel from "../../components/UploadExcel";
import { useSelector } from "react-redux";
import { useState } from "react";
import DashboardData from "../../components/DashboardData";
import { DownloadOutlined } from '@mui/icons-material';
import BandGraph from "../../components/BandGraph";
import USTExp from "../../components/USTExp";
import PrimarySkills from "../global/PrimarySkills";
import CountryCountTable from "../../components/CountryCountTable";
import TableRepresentation from "../../components/TableRepresentation";
import EmployeeStatusGraph from "../../components/EmployeeStatusGraph";
import AllocationPerGraph from "../../components/AllocationPerGraph";
import ResourceType from "../../components/ResourceType";



const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  // State for tracking data upload
  const [isDataUploaded, setIsDataUploaded] = useState(0);

  // Handle the uploaded data
  const handleUploadSuccess = () => {
    setIsDataUploaded(isDataUploaded + 1);
  };


  return (

    <div>
      <div className=""  >
        <UploadExcel onUploadSuccess={handleUploadSuccess}  />



        <DashboardData isDataUploaded={isDataUploaded} />



      </div>









    </div>

  );
};

export default Dashboard;
