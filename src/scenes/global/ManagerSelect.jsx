import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useSelector } from "react-redux";


const ManagerSelect = (props) => {
  const empData = useSelector((state) => state.Empdata);
  const [selectedOption, setSelectedOption] = useState();
  const [managers, setManagers] = useState([]);

  // Extracting manager names from employee data
  useEffect(() => {
    if (empData.length > 0) {
      const allManagers = empData.reduce((acc, emp) => {
        const { "1st Manager": manager1, "2nd Manager": manager2, "3rd Manager": manager3, "Manager Name": managerName } = emp;
        if (manager1) acc.add(manager1);
        if (manager2) acc.add(manager2);
        if (manager3) acc.add(manager3);
        if (managerName) acc.add(managerName);
        return acc;
      }, new Set());
      setManagers(Array.from(allManagers));
    }
  }, [empData]);

  function handleSelect(selectedOption) {
    setSelectedOption(selectedOption);
    if (selectedOption) {
      props.handleBoxClick(selectedOption.label);
    
      
      
    }
  }

  return (
    <div className="text-white" style={{ width: "200px", margin: "10px" }}>
      <Select
        options={managers.map((name) => ({
          value: name,
          label: name
        }))}
        placeholder="Select manager"
        value={selectedOption}
        onChange={handleSelect}
        isSearchable={true}
        styles={{
          control: (provided, state) => ({
            ...provided,
            color: "white",
            border: state.isFocused ? "2px solid gray" : "2px solid white",
            borderRadius: "8px",
            backgroundColor: "#0A6E7C",
            color: "white",
            
        
          }),
          placeholder: (provided) => ({
            ...provided,
            color: "white"
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "gray" : "gray",
            color: "white"
          }),
          singleValue: (provided) => ({
            ...provided,
            color: "white"
          })
        }}
      />
    </div>
  );
};

export default ManagerSelect;
