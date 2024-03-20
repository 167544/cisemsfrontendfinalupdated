import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as XLSX from 'xlsx';
import setdata from '../actions';
import axios from 'axios';
import './UploadExcel.css'
import setSelectedData from '../actions/setSetlecteddata';
import { Spinner } from 'reactstrap'; // Import Spinner from reactstrap

function UploadExcel({ onUploadSuccess }) {
  const [jsonData, setJsonData] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // State to track upload status
  const dispatch = useDispatch();

  const storeDataINDb = async (data) => {
    try {
      setIsUploading(true); // Set isUploading to true when starting upload
      const response = await axios.post("http://localhost:3004/employeedata", data);
      const response1 = await axios.get('http://localhost:3004/fetchdata');
      dispatch(setdata(response1.data));
      dispatch(setSelectedData(response1.data))
      setIsUploading(false); // Set isUploading to false after upload is complete
    } catch (error) {
      setIsUploading(false); // Set isUploading to false if upload fails
      console.error("Error storing data:", error);
      // Handle error appropriately (e.g., show error message to user)
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0]; // Assuming you want the first sheet
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const formattedData = formatData(jsonData); // Format data into desired format

      try {
        const formatedjsondata = JSON.stringify(formattedData);
        await storeDataINDb(formattedData); // Sending formatted data to the backend
        onUploadSuccess();
      } catch (error) {
        console.error("Error processing upload:", error);
        // Handle error appropriately (e.g., show error message to user)
      }
    };

    reader.readAsArrayBuffer(file);
  };


  // Function to format the data into individual JSON objects
  const formatData = (data) => {
    const fieldNames = data[0]; // First row contains field names
    const formattedData = data.slice(1).map((row) => {
      const formattedRow = {};
      for (let i = 0; i < fieldNames.length; i++) {
        formattedRow[fieldNames[i]] = row[i];
      }
      return formattedRow;
    });
    return formattedData;
  };

  return (
    <div style={{ maxWidth: '250px', display: "inline-block" }}  >
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', padding: "5px", margin: "5px", color: "#0A6E7C", fontFamily: "san-serif" }}>Upload data</h1>

      <div className='d-flex'>
        <input
          type="file"
          id="fileInput"
          onChange={handleFileUpload}
          placeholder='chod'
          style={{
            width: "200px",
            padding: "10px",
            margin: "1rem",
            boxShadow: "1px 4px 5px #0A6E7C",
            borderRadius: "5px",
            border: "none"
          }}
        />
        {isUploading && ( // Display spinner if isUploading is true
          <div className="spinner d-inline-block">
            <Spinner color="primary" />
          </div>
        )}

      </div>
    </div>
  );
}

export default UploadExcel;
