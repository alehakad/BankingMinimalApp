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
        const fetchUserData = async () => {
            const token = localStorage.getItem('jwtToken');
            console.log(token);
            await axios.get('http://localhost:5000/user/home', {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((response) => {
                    setUserData(response.data);
                })
                .catch((error) => {
                    // navigate to login
                    console.log(error.response.data);
                    navigate('/');
                });
        };
        fetchUserData();
    }, [navigate]);
    
    const user = { name: 'John Doe', email: 'johndoe@example.com', phone: '+1234567890', balance: 1500.75, transactions: [{ receiver: 'User A', amount: 200, date: '01-01-2024' }, { receiver: 'User B', amount: 50, date: '01-02-2024' }, { receiver: 'User C', amount: 75.5, date: '01-03-2024' }]};

    return (
        <React.Fragment>
            Welcome to Dashboard
            <UserProfileCard user={user}/>
            <Button onClick={logout}>Logout</Button>
        </React.Fragment>
    );
}

export default Dashboard;
