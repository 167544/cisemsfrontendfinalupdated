import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useSelector } from "react-redux";

const PrimarySkills = (props) => {
  const data = useSelector((state) => state.Empdata);
  const [selectedOption, setSelectedOption] = useState();
  const [primarySkills, setPrimarySkills] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to extract primary skills from employee data
  const extractPrimarySkills = (data) => {
    let skills = [];
    data.forEach((employee) => {
      if (employee["Primary Skill"]) {
        const skillsArray = employee["Primary Skill"].split(",").map((skill) => skill.trim());
        skills = skills.concat(skillsArray);
      }
    });
    return Array.from(new Set(skills));
  };

  useEffect(() => {
    if (data.length > 0) {
      const extractedSkills = extractPrimarySkills(data);
      setPrimarySkills(extractedSkills);
      setLoading(false);
    }
  }, [data]);

  function handleSelect(selectedOption) {
    setSelectedOption(selectedOption);
    if (selectedOption) {
      props.handleBoxClick(selectedOption.label);
    }
  }
  return (
    <div className="text-white " style={{ width: "200px", margin: "10px" }}>
      {loading ? ( // Show loading indicator while data is being fetched
        <p>Loading...</p>
      ) : (
        <Select
          options={primarySkills.map((name) => ({
            value: name,
            label: name
          }))}
          placeholder="Primary Skills"
          value={selectedOption}
          onChange={handleSelect}
          isSearchable={true}
         
          styles={{
            control: (provided, state) => ({
              ...provided,
              color: "white",
              border: state.isFocused ? "2px solid gray" : "2px solid white",
              borderRadius: "8px",
              backgroundColor: "#0A6E7C"
         
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
      )}
    </div>
  );
};

export default PrimarySkills;
