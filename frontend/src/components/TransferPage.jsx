import React from "react";
import Button from '@mui/material/Button';
import useAuth from "../hooks/useAuth";
import { TextField, MenuItem, Select } from "@mui/material";

const TransferPage = () => {
    const userData = useAuth();

    const [receiverEmail, setReceiverEmail] = useState("");
    const [amount, setAmount] = useState(0.0);

    if (!userData) {
        return <div>Loading...</div>;
    }

    function sendMoney(event) {
        event.preventDefault();
        console.log(receiverEmail, amount);
        axios.patch('http://localhost:5000/user/transactions', { transaction: { receiver: receiverEmail, amount } })
            .then((response) => {
                console.log('Success:', response.data);
            })
            .catch((error) => {
                console.error('Error Status:', error.response.status);
                console.error('Error Data:', error.response.data);
            });
    }

    const makeTransfer = () => {
        console.log("Make transfer");
    }

    return (
        <React.Fragment>
            <form onSubmit={sendMoney}>

                <Select
                    value={receiverEmail}
                    label="Receiver"
                    onChange={e => setReceiverEmail(e.target.value)}
                >
                    <MenuItem value={1}>One</MenuItem>
                    <MenuItem value={2}>Two</MenuItem>
                    <MenuItem value={3}>Three</MenuItem>
                </Select>

                <TextField
                    label="Enter amount"
                    variant="outlined"
                    value={amount}
                    onChange={e => { setAmount(e.target.value) }}
                    fullWidth
                    type="text" // Use text for better validation handling
                    inputProps={{
                        inputMode: "decimal", // Allows decimal input on mobile
                        pattern: "[0-9]*[.,]?[0-9]*", // Decimal pattern
                    }}
                />



            </form>
            <Button onClick={makeTransfer}>Transfer money</Button>
        </React.Fragment>
    );
}

export default TransferPage;
