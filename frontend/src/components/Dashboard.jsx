import { React, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';
import UserProfileCard from "./UserProfileCard";
import useAuth from "../hooks/useAuth";
import { io } from 'socket.io-client';
import { useNotification } from "../context/NotificationContext";

const Dashboard = () => {

    const userData = useAuth();
    const navigate = useNavigate();

    const { showInfo } = useNotification();
    const [socket, setSocket] = useState(null);

    // connect to websocker
    useEffect(() => {
        const userId = userData._id;
        const newSocket = io(process.env.REACT_APP_API_BASE_URL, {
            query: { userId }
        });

        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Connected to WebSocket with socket ID: ', socket.id);
        });

        // show new transaction event
        newSocket.on('new-transaction', (transaction) => {
            console.log('New transaction received');

            showInfo("New money transfer received");
        });

        newSocket.on('disconnect', () => {
            console.log('Disconnected from WebSocket');
        });

        return () => {
            if (newSocket) {
                newSocket.disconnect();
            }
        }

    });

    const logout = () => {
        // delete jwt
        localStorage.removeItem('jwtToken');
        // disconnect from socketio
        if (socket) {

            socket.disconnect();
        }
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
