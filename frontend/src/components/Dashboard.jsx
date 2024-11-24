import React from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography} from '@mui/material';
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
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: 3,
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                        fontWeight: 'bold',
                        color: 'primary.main',
                        textAlign: 'center',
                        marginBottom: 2,
                    }}
                >
                    Dashboard Overview
                </Typography>
            </Box>
            <UserProfileCard user={userData} />
            <Button onClick={logout}>Logout</Button>
            <Button onClick={goToTransfer}>Transfer money</Button>
        </React.Fragment>
    );
}

export default Dashboard;
