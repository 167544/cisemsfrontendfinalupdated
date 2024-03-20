import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../theme';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import StatBox from '../components/StatBox';
import EmailIcon from '@mui/icons-material/Email';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import BandGraph from './BandGraph';
import USTExp from './USTExp';
import TableRepresentation from './TableRepresentation';
import ResourceType from './ResourceType';
import EmployeeStatusGraph from './EmployeeStatusGraph';
import AllocationPerGraph from './AllocationPerGraph';
import DashboardRepresentation from './DashboardRepresentation';
import ManagerSelect from '../scenes/global/ManagerSelect';
import PrimarySkills from '../scenes/global/PrimarySkills';
import setdata from '../actions';
import setSelectedData from '../actions/setSetlecteddata';
import Category from '../scenes/global/Category';


function DashboardData(props) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [employeeData, setEmployeeData] = useState([]);
  const [customerCount, setCustomerCount] = useState(0);
  const [activeEmployeeCount, setActiveEmployeeCount] = useState(0);
  const [resourceWithValidVisaCount, setResourceWithValidVisaCount] = useState(0);
  const [showRepresentation, setShowRepresentation] = useState(false);
  const [selectedBoxName, setSelectedBoxName] = useState(null);

  useEffect(() => {
    fetchData();
  }, [props.isDataUploaded]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3004/fetchdata');
      dispatch(setdata(response.data));
      dispatch(setSelectedData(response.data))
      const data = response.data;

      setEmployeeData(data);

      const customerIDs = [...new Set(data.map(item => item['Customer ID']))];
      setCustomerCount(customerIDs.length);

      const activeEmployees = data.filter(item => item['Employee Status'] === 'Active');
      setActiveEmployeeCount(activeEmployees.length);

      const resourcesWithValidVisa = data.filter(item => item['Resource with Valid VISA']);
      setResourceWithValidVisaCount(resourcesWithValidVisa.length);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleBoxClick = (boxName) => {
    setSelectedBoxName(boxName);
    setShowRepresentation(true);
  };

  const handlePrimarySelect = (boxName) => {
    setSelectedBoxName(boxName + 'skills');
    setShowRepresentation(true);
  };

  const handleManagerSelect = (boxName) => {
    setSelectedBoxName(boxName + 'manager');
    setShowRepresentation(true);
  };

  const handleCategory = (boxName) => {
    setSelectedBoxName(boxName + 'categry');
    setShowRepresentation(true);
  };
  const boxes = [
    { title: 'Total Employees', value: employeeData.length,  color:"#006E74"  },
    { title: 'Total Customers', value: customerCount, color:"#0097AC"},
    { title: 'Active Employee Count', value: activeEmployeeCount, color: "#01B27C" },
    { title: 'Resources with Valid Visa', value: resourceWithValidVisaCount,  color: "#003C51"  },
  ];

  return (
<>
<span style={{ display: 'inline-block', marginBottom: '1rem',  }}>
    <div className='d-flex'>
  
      <div className='d-flex'>
        <ManagerSelect handleBoxClick={handleManagerSelect} />
        <PrimarySkills handleBoxClick={handlePrimarySelect} />
        <Category  handleBoxClick={handleCategory}/>
        
      </div>
    </div>



  </span>
    <div>

      <div style={{ margin: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'start', gap: '1rem', flexWrap: 'wrap', }}>
        <div style={{display:'flex',backgroundColor:"white",borderRadius:"5px",boxShadow:"2px 1px 5px"}}>
        {boxes.map((box, index) => (
         
              <div key={index} style={{ padding: '0.5rem', borderRadius: '4px', backgroundColor:`${box.color}`, textAlign: 'center', cursor: 'pointer',margin:"1rem", }} onClick={() => handleBoxClick(box.title)}>
              <h4 style={{ fontSize: '1rem', fontWeight: 'bold', fontFamily: 'serif', color: 'white' }}>{box.title}</h4>
              <p style={{ color: 'white', fontSize: '2rem' }}>{box.value}</p>
            </div>
         
          ))}
          </div>
        
        </div>
        <div className="d-flex justify-content-around" style={{ marginTop: '2rem' }}>
          <BandGraph isDataUploaded={props.isDataUploaded} />
          <USTExp isDataUploaded={props.isDataUploaded} />
          <ResourceType columnname="Resource Type" isDataUploaded={props.isDataUploaded} />

        </div>
        <div className="d-flex justify-content-around" style={{ marginTop: '2rem' }}>
        <TableRepresentation columnname="Country" isDataUploaded={props.isDataUploaded} />

          <EmployeeStatusGraph columnname="Employee Status" isDataUploaded={props.isDataUploaded} />
          {/* <AllocationPerGraph columnname="Allocation Percentage" isDataUploaded={props.isDataUploaded} /> */}

        </div>

        <Button className="m-2" variant="contained" color="primary" onClick={() => handleBoxClick('selectedlist')}>Shortlist List</Button>
      <Button className="m-2" variant="contained" color="primary" onClick={() => handleBoxClick('removedlist')}>Removed List</Button>

        {showRepresentation && <DashboardRepresentation data={selectedBoxName} />}
      </div>
    </div>
</>
  );
}

export default DashboardData;
