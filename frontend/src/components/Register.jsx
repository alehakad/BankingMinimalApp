import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { Link } from "react-router-dom";
import OtpDialog from './OtpDialog';
import { useNotification } from '../context/NotificationContext.js';
import api from "../utils/axiosClient.js";
import useAuth from "../hooks/useAuth";

const RegisterForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false);

    const { showSuccess, showError } = useNotification();


    const userData = useAuth();

    if (userData) {
        return <div>Redirecting to Dashboard...</div>;
    }

    const handleOtpDialogOpen = () => setIsOtpDialogOpen(true);
    const handleOtpDialogClose = () => setIsOtpDialogOpen(false);

    function handleSubmit(event) {
        event.preventDefault();
        console.log(email, password, phone, name)
        api.post('/register', { email, password, phone, name })
            .then((response) => {
                console.log('Success:', response.data);
                showSuccess('New user created');
                // show field to enter otp
                handleOtpDialogOpen();
            })
            .catch((error) => {
                if (error.response) {
                    console.error('Error Status:', error.response.status);
                    console.error('Error Data:', error.response.data);
                    showError(error.response.data.error);
                }
                else if (error.request) {
                    console.error('No response received:', error.request);
                    showError("Server not avaliable");
                }
                else {
                    console.error('Error:', error.message);
                    showError(error.message);
                }
            });
    }

    return (
        <React.Fragment>
            <OtpDialog open={isOtpDialogOpen} handleClose={handleOtpDialogClose} email={email} />

            <h2>Register</h2>
            <form onSubmit={handleSubmit} action={<Link to="/login" />}>

                <TextField
                    type="text"
                    variant='outlined'
                    color='secondary'
                    label="Name"
                    onChange={e => setName(e.target.value)}
                    value={name}
                    required
                    fullWidth
                    sx={{ mb: 4 }}
                />

                <TextField
                    type="email"
                    variant='outlined'
                    color='secondary'
                    label="Email"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    fullWidth
                    required
                    sx={{ mb: 4 }}
                />
                <TextField
                    type="password"
                    variant='outlined'
                    color='secondary'
                    label="Password"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    required
                    fullWidth
                    sx={{ mb: 4 }}
                />
                <TextField
                    type="tel"
                    variant='outlined'
                    color='secondary'
                    label="Phone"
                    onChange={e => setPhone(e.target.value)}
                    value={phone}
                    fullWidth
                    required
                    sx={{ mb: 4 }}
                />
                <Button variant="outlined" color="secondary" type="submit">Register</Button>
            </form>
            <small>Already have an account? <Link to="/login">Login Here</Link></small>

        </React.Fragment>
    )
}

export default RegisterForm;