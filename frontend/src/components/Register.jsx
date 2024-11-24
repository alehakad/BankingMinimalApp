import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { Link } from "react-router-dom";
import axios from 'axios';
import OtpDialog from './OtpDialog';
import { useNotification } from '../context/NotificationContext.js';


const RegisterForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false);

    const { showError } = useNotification();

    const handleOtpDialogOpen = () => setIsOtpDialogOpen(true);
    const handleOtpDialogClose = () => setIsOtpDialogOpen(false);

    function handleSubmit(event) {
        event.preventDefault();
        console.log(email, password, phone)
        axios.post('http://localhost:5000/register', { email, password, phone })
            .then((response) => {
                console.log('Success:', response.data);
                // show field to enter otp
                handleOtpDialogOpen();
            })
            .catch((error) => {
                console.error('Error Status:', error.response.status);
                console.error('Error Data:', error.response.data);
                showError(error.response.data.error);
            });
    }

    return (
        <React.Fragment>
            <OtpDialog open={isOtpDialogOpen} handleClose={handleOtpDialogClose} email={email} />

            <h2>Register</h2>
            <form onSubmit={handleSubmit} action={<Link to="/login" />}>
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