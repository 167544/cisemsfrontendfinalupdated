import React from 'react';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Button, Table, Spinner } from 'reactstrap';
import './team.css'


function Team() {
  const data = useSelector((state) => state.Empdata);
  const [EmployeeData, setEmpData] = useState(null);

  const addedToShortlist = (id) => {
    alert(id)
  }

  useEffect(() => {
    setEmpData(data);
  }, [data]);

  return (
    <>
      <div className='bg-light m-4 text-dark' >
        <div>
          <button type="button" className="btn btn-primary">Selected List</button>
        </div>
      </div>

      {EmployeeData !== null && EmployeeData.length > 0 ? (
        <div>
          <div>
            <div style={{ height: '70vh', width: '80vw', overflow: 'scroll', overflowX: 'scroll', margin: 'auto' }}>
              <Table responsive id="tablestyles">
                <thead>
                  <tr>
                    <th style={{ flex: 1  }}>S.No</th>
                    <th style={{ flex: 1 }}>Employee ID</th>
                    <th style={{ flex: 1 }}>Employee Name</th>
                    <th style={{ flex: 1 }}>Band</th>
                    <th style={{ flex: 1 }}>Account Name</th>
                    <th style={{ flex: 1 }}>Location Descr</th>
                    <th style={{ flex: 1 }}>Resource Type</th>
                    <th style={{ flex: 1 }}>Category</th>
                    <th style={{ flexBasis: '10%'}}>Primary Skill</th>
                    <th style={{ flexBasis: '10%'}}>Skill Category for Primary Skill</th>
                    <th style={{ flex: 1 }}>Skill Level for Primary Skill</th>
                    <th style={{ flex: 1 }}>Tools Known</th>
                    <th style={{ flex: 1 }}>Selection</th>
                  </tr>
                </thead>
                <tbody>
                  {EmployeeData.map((emp, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{emp['Employee ID']}</td>
                      <td>{emp['Employee Name']}</td>
                      <td>{emp['Band']}</td>
                      <td>{emp['Account']}</td>
                      <td>{emp['Location Descr']}</td>
                      <td>{emp['Resource Type']}</td>
                      <td>{emp['Category']}</td>
                      <td style={{ flexBasis: '10%'}} >{emp['Primary Skill']}</td>
                      <td style={{ flexBasis: '10%'}}>{emp['Skill Category for Primary Skill']}</td>
                      <td>{emp['Skill Level for Primary Skill']}</td>
                      <td>{emp['Tools Known']}</td>
                      <td>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                          <Button color="primary" onClick={() => { addedToShortlist(emp['Employee ID']) }}>Add</Button>
                          <Button color="primary">Remove</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

            </div>
          </div>
        </div>
      ) : (
        <Spinner>Loading...</Spinner>
      )}
    </>
  );
}

export default Team;
