import React, { useState, useEffect } from 'react';
import {  Route, Routes, } from 'react-router-dom';
import MainDashboard from './MainDashboard';
import LoginPage from './components/LoginPage';

import Register from './components/Register'
import { useNavigate } from 'react-router-dom';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token,setToken] =  useState("")
    const Navigate = useNavigate()

    useEffect(() => {
        // Check if the user is authenticated when the component mounts
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            setIsAuthenticated(true);
        }
    }, []);

    const handleUserAuthentication = (token) => {
        localStorage.setItem('token', token); // Store token in local storage upon successful login
        setToken(token)
        
        setIsAuthenticated(true); // Set authentication state to true
     
    }

  

    return (
        <div>

            <Routes>
              
              
                 <Route path="/*" element={token ? <MainDashboard />:<LoginPage handleUserAuthentication={handleUserAuthentication} />}  />
                
                <Route path="/register" element={<Register />} />


            </Routes>

        </div>
    );
}

export default App;
