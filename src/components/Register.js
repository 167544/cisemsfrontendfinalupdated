import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Label, Input, FormGroup } from 'reactstrap';
import axios from 'axios';
import logos from '../Assets/logo.jpg';

function Register(props) {
    const [userData, setUserData] = useState({
        name: "",
        Username: "",
        password: "",
        repeatPassword: "",
        userRole: ""
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm(userData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            console.log(userData)
            const response = await axios.post("http://localhost:3004/registerdata", userData);
            console.log("Registration successful:", response.data);
            alert("successfully Registered")
            navigate("/"); // Redirect to login page
        } catch (error) {
            console.error("Error registering user:", error);
            alert("An error occurred during registration. Please try again later.");
        }
    };

    const validateForm = (data) => {
        let errors = {};
        if (!data.name.trim()) {
            errors.name = "Name is required";
        }
        if (!data.Username.trim()) {
            errors.Username = "First Name is required";
        }
        if (!data.password.trim()) {
            errors.password = "Password is required";
        }
        if (data.password !== data.repeatPassword) {
            errors.repeatPassword = "Passwords do not match";
        }
        return errors;
    };

    return (
        <div  style={{display:"flex" ,flexDirection:"column" , justifyContent: 'space-between', alignItems: 'center',height: '100vh', width: '100vw', backgroundColor: '#0A6E7C', color: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100vw', color: 'white', backgroundColor: '#0A6E7C' ,padding:"12px",
        paddingLeft:"26px"}}>
            <img src={logos} alt="logo" width={"50px"} height={"50px"} />
      <h2 style={{color:"white",fontWeight:"bold"}}>CIS Employee Management Portal</h2>
      <img src={logos} alt="logo" width={"50px"} height={"50px"} style={{visibility: 'hidden'}}/>
      </div>
            <div style={{ border: '1px solid white', width: '500px', padding: '20px', textAlign: 'center', borderRadius: '10px' }}>
                <h1>Registration Form</h1>
                <Form onSubmit={(e) => { handleSubmit(e) }}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder=" Name"
                            type="text"
                            value={userData.name}
                            onChange={(e) => handleChange(e)}
                            invalid={errors.name ? true : false}
                        />
                        {errors.name && <span className="text-danger">{errors.name}</span>}
                    </FormGroup>
                    <FormGroup>
                        <Label for="Username">User Name</Label>
                        <Input
                            id="Username"
                            name="Username"
                            placeholder="User Name"
                            type="text"
                            value={userData.Username}
                            onChange={(e) => handleChange(e)}
                            invalid={errors.Username ? true : false}
                        />
                        {errors.Username && <span className="text-danger">{errors.Username}</span>}
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            placeholder="Password"
                            type="password"
                            value={userData.password}
                            onChange={(e) => handleChange(e)}
                            invalid={errors.password ? true : false}
                        />
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                    </FormGroup>
                    <FormGroup>
                        <Label for="repeatPassword">Repeat Password</Label>
                        <Input
                            id="repeatPassword"
                            name="repeatPassword"
                            placeholder="Repeat Password"
                            type="password"
                            value={userData.repeatPassword}
                            onChange={(e) => handleChange(e)}
                            invalid={errors.repeatPassword ? true : false}
                        />
                        {errors.repeatPassword && <span className="text-danger">{errors.repeatPassword}</span>}
                    </FormGroup>
                    <FormGroup tag="fieldset" >
                        {/* <legend>User Role</legend> */}
                        {/* <FormGroup check> */}
                            <Label check style={{cursor:"pointer"}}>
                                <Input type="radio" name="userRole" value="User" checked={userData.userRole === "User"} onChange={(e) => handleChange(e)} />
                                User
                            </Label>
                            <Label check style={{visibility:"hidden"}}>
                                <Input type="radio" name="userRole" value="User" checked={userData.userRole === "User"} onChange={(e) => handleChange(e)} />
                                User
                            </Label>
                        {/* </FormGroup> */}
                        {/* <FormGroup check> */}
                            <Label check style={{cursor:"pointer"}}>
                                <Input type="radio" name="userRole" value="Admin" checked={userData.userRole === "Admin"} onChange={(e) => handleChange(e)} />
                                Admin
                            </Label>
                        {/* </FormGroup> */}
                    </FormGroup>
                    <Button type='submit'>Register</Button>
                </Form>

            </div>

            <div style={{ visibility:"hidden",display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100vw', color: 'white', backgroundColor: '#0A6E7C' }}>
            <img src={logos} alt="logo" width={"50px"} height={"50px"} />
      <h2 style={{color:"white",fontWeight:"bold"}}>CIS Employee Management Portal</h2>
      <img src={logos} alt="logo" width={"50px"} height={"50px"} style={{visibility: 'hidden'}}/>
      </div>
        </div>
    );
}

export default Register;
