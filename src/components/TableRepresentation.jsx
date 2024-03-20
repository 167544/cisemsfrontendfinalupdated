import React, { useState, useEffect } from 'react';
import './TableRepresentation.css';
import { useSelector } from 'react-redux';

const TableRepresentation = ({ columnname }) => {
  const data = useSelector((state) => state.selectedData);

  const graphbox = {
    borderRadius: '10px',
    height: '330px',
    width: '50%',
    padding: '1rem',
    boxShadow: '1px 5px 5px ',
  };

  let country_codes = {
    ARM: 'Europe',
    AUS: 'Asia',
    CAN: 'North America',
    CHE: 'Europe',
    CHN: 'Asia',
    COL: 'South America',
    DEU: 'Europe',
    ESP: 'Europe',
    FRA: 'Europe',
    GBR: 'Europe',
    HKG: 'Asia',
    IND: 'Asia',
    IRL: 'Europe',
    JPN: 'Asia',
    MEX: 'North America',
    MYS: 'Asia',
    NLD: 'Europe',
    PHL: 'Asia',
    POL: 'Europe',
    PRT: 'Europe',
    ROU: 'Europe',
  };

  const getCountsByCountry = () => {
    const counts = {};
    data.forEach((item) => {
      const country = item.Country;
      counts[country] = counts[country] ? counts[country] + 1 : 1;
    });
    return Object.entries(counts).map(([country, count]) => ({ _id: country, count }));
  };

  const [countryCounts, setCountryCounts] = useState(getCountsByCountry());

  useEffect(() => {
    setCountryCounts(getCountsByCountry());
  }, [data]);

  return (
    <div className="m-2" style={graphbox}>
      <h1 style={{ fontSize: '1rem', fontWeight: 'bold', textAlign: 'center', color: '#0A6E7C' }}>
        {columnname}
      </h1>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Country</th>
              <th>Continent</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {countryCounts.map((country, index) => (
              <tr key={index}>
                <td>{country._id}</td>
                <td>{country_codes[country._id]}</td>
                <td>{country.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableRepresentation;
