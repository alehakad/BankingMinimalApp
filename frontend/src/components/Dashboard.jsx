import React from "react";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import UserProfileCard from "./UserProfileCard";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {

    const userData = useAuth();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('jwtToken');
        // navigate to login
        navigate('/login');
    };

    const goToTransfer = () => {
        navigate('/transfer')
    }



    return (
        <React.Fragment>
            Dashboard
            <UserProfileCard user={userData} />
            <Button onClick={logout}>Logout</Button>
            <Button onClick={goToTransfer}>Transfer money</Button>
        </React.Fragment>
    );
}

export default Dashboard;
