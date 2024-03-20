import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Label, Input, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import logos from '../Assets/logo.jpg';

function LoginPage(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3004/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Username: username,
                    password: password
                }),
            });

            if (response.ok) {
                // Login successful
                const data = await response.json();
                alert(data.message);
                localStorage.setItem('token', data.token);
                console.log(localStorage.getItem('token'));
                props.handleUserAuthentication(data.token)
                
               
            } else {
                // Login failed, handle error
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert("An error occurred. Please try again.");
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection:"column" ,justifyContent: 'space-between', alignItems: 'center', height: '100vh', width: '100vw', color: 'white', backgroundColor: '#0A6E7C',}}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100vw', color: 'white', backgroundColor: '#0A6E7C',padding:"12px",
        paddingLeft:"26px" }}>
            <img src={logos} alt="logo" width={"50px"} height={"50px"} />
      <h2 style={{color:"white",fontWeight:"bold"}}>CIS Employee Management Portal</h2>
      <img src={logos} alt="logo" width={"50px"} height={"50px"} style={{visibility: 'hidden'}}/>
      </div>
      {/* <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center',width:"100vw"}}> */}
            <div style={{ border: '1px solid white', height: '450px', width: '450px', borderRadius: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ height: '60%', width: '100%', margin: '1rem', padding: '1rem', textAlign: 'center' }}>
                    <h1>Login Page</h1>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="Username" hidden>Username</Label>
                            <Input
                                id="Username"
                                name="Username"
                                placeholder="Username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword" hidden>Password</Label>
                            <Input
                                id="examplePassword"
                                name="password"
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormGroup>
                        <Button type='submit' className='mb-4'>Submit</Button>
                    </Form>
                    <Link to="/register" style={{ textDecoration: 'none', color: 'white', cursor: 'pointer' }}>Click to Register here</Link>
                </div>
            </div>
            <div style={{ visibility: 'hidden', justifyContent: 'space-between', alignItems: 'center', width: '100vw', color: 'white', backgroundColor: '#0A6E7C' }}>
            <img src={logos} alt="logo" width={"50px"} height={"50px"} />
      <h2 style={{color:"white",fontWeight:"bold"}}>CIS Employee Management Portal</h2>
      </div>
        </div>
    )
}

export default LoginPage;
