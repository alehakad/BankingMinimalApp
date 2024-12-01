import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { TextField, Button, Card, CardContent, Typography, Box, Divider, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useNotification } from '../context/NotificationContext.js';
import api from "../utils/axiosClient.js";
import { useEffect } from "react";


const TransferPage = () => {
    const userData = useAuth();

    const [emails, setEmails] = useState([]);
    const [receiverEmail, setReceiverEmail] = useState("");
    const [amount, setAmount] = useState(0.0);

    const { showSuccess, showError } = useNotification();

    const token = localStorage.getItem('jwtToken');

    // fetch list of all verified users emails
    useEffect(() => {
        if (!userData) {
            return;
        }
        api.get('/users/', { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                const filteredEmails = response.data.emails.filter(email => email !== userData.email);
                setEmails(filteredEmails);
            })
            .catch(error => {
                console.error('Error fetching emails:', error);
            });
    }, [userData, token]);

    if (!userData) {
        return <div>Loading...</div>;
    }


    function sendMoney(event) {
        event.preventDefault();
        console.log(receiverEmail, amount);
        api.patch('/me/transactions', {

            transaction: { receiver: receiverEmail, amount }
        },
            { headers: { Authorization: `Bearer ${token}` } },)
            .then((response) => {
                console.log('Success:', response.data);
                showSuccess("Operation completed");
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
    };

    const handleChange = (event) => {
        setReceiverEmail(event.target.value);
    };

    return (
        <Card
            sx={{
                maxWidth: 400,
                margin: '20px auto',
                padding: 3,
                borderRadius: 2,
                boxShadow: 3,
            }}
        >
            {/* Page Header */}
            <Box sx={{ marginBottom: 3 }}>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: 'primary.main',
                    }}
                >
                    Transfer Money
                </Typography>
            </Box>

            <CardContent>
                <form onSubmit={sendMoney}>
                    {/* Receiver Email */}
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                        Receiver Info
                    </Typography>
                    {/* Dropdown to select receiver email */}
                    <FormControl fullWidth required sx={{ marginBottom: 3 }}>
                        <InputLabel id="receiver-email-label">Receiver Email</InputLabel>
                        <Select
                            labelId="receiver-email-label"
                            id="receiver-email"
                            value={receiverEmail}
                            label="Receiver Email"
                            onChange={handleChange}
                        >
                            {/* Render a MenuItem for each email */}
                            {emails.map((email, index) => (
                                <MenuItem key={index} value={email}>
                                    {email}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {/* Transfer Amount */}
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                        Amount
                    </Typography>
                    <TextField
                        label="Enter Amount"
                        variant="outlined"
                        value={amount}
                        onChange={(e) => {
                            const value = e.target.value;
                            // Check if the value is a valid integer
                            if (/^\d*$/.test(value)) {
                                setAmount(value);  // Update only if the value is a valid integer
                            }
                        }}
                        fullWidth
                        type="text"  // Use text type to handle custom validation
                        slotProps={{
                            htmlInput: {
                                inputMode: 'numeric',  // Sets numeric input mode for mobile devices
                                min: "0",
                                step: "1",  // Only allow integer steps
                            },
                        }}
                        required
                        sx={{ marginBottom: 3 }}
                    />

                    <Divider sx={{ marginY: 2 }} />

                    {/* Submit Button */}
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        type="submit"
                        sx={{
                            padding: 1.5,
                            fontWeight: 'bold',
                            textTransform: 'none',
                            fontSize: '1rem',
                        }}
                    >
                        Transfer Money
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default TransferPage;
