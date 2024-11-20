import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import UserProfileCard from "./UserProfileCard";

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('jwtToken');
        // navigate to login
        navigate('/login');
    };


    // get user data once
    useEffect(() => {
        console.log("useEffect ran!");
        const fetchUserData = async () => {
            const token = localStorage.getItem('jwtToken');
            console.log(token);
            await axios.get('http://localhost:5000/user/home', {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((response) => {
                    console.log(response.data);
                    setUserData(response.data.user);
                })
                .catch((error) => {
                    console.log(error.response.data);
                    navigate('/');
                });
        };
        fetchUserData();
    }, [navigate]);
    

    return (
        <React.Fragment>
            Welcome to Dashboard
            <UserProfileCard user={userData} />
            <Button onClick={logout}>Logout</Button>
        </React.Fragment>
    );
}

export default Dashboard;
