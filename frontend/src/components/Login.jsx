import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext.js';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const { showError } = useNotification();

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault()

        setEmailError(false)
        setPasswordError(false)

        if (email === '') {
            setEmailError(true)
        }
        if (password === '') {
            setPasswordError(true)
        }

        if (email && password) {
            console.log(email, password)
        }

        // send request to login
        axios.post('http://localhost:5000/login', { email, password })
            .then((response) => {
                console.log('Success:', response.data);
                // set token 
                const token = response.data.token;
                console.log("Before setting:", localStorage.getItem("jwtToken"));
                localStorage.setItem("jwtToken", token);
                console.log("After setting:", localStorage.getItem("jwtToken"));
                // navigate to dashboard
                navigate('/');
            })
            .catch((error) => {
                // display errors
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
            <form autoComplete="off" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <TextField
                    label="Email"
                    onChange={e => setEmail(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="email"
                    sx={{ mb: 3 }}
                    fullWidth
                    value={email}
                    error={emailError}
                />
                <TextField
                    label="Password"
                    onChange={e => setPassword(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="password"
                    value={password}
                    error={passwordError}
                    fullWidth
                    sx={{ mb: 3 }}
                />
                <Button variant="outlined" color="secondary" type="submit">Login</Button>

            </form>
            <small>Need an account? <Link to="/register">Register here</Link></small>
        </React.Fragment>
    );
}

export default Login;