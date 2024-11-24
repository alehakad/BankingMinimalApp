import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { TextField, Button, Card, CardContent, Typography, Box, Divider } from "@mui/material";
import { useNotification } from '../context/NotificationContext.js';
import api from "../utils/axiosClient.js";


const TransferPage = () => {
    const userData = useAuth();

    const [receiverEmail, setReceiverEmail] = useState("");
    const [amount, setAmount] = useState(0.0);

    const { showSuccess, showError } = useNotification();

    if (!userData) {
        return <div>Loading...</div>;
    }

    function sendMoney(event) {
        event.preventDefault();
        console.log(receiverEmail, amount);
        const token = localStorage.getItem('jwtToken');
        api.patch('/user/transactions', {

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
    }

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
                    <TextField
                        type="email"
                        variant="outlined"
                        color="primary"
                        label="Receiver Email"
                        onChange={(e) => setReceiverEmail(e.target.value)}
                        value={receiverEmail}
                        fullWidth
                        required
                        sx={{ marginBottom: 3 }}
                    />

                    {/* Transfer Amount */}
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                        Amount
                    </Typography>
                    <TextField
                        label="Enter Amount"
                        variant="outlined"
                        value={amount}
                        onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                        fullWidth
                        type="number"
                        inputProps={{
                            min: "0",
                            step: "0.01",
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
