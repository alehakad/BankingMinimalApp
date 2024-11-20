import React from "react";
import Button from '@mui/material/Button';
import useAuth from "../hooks/useAuth";

const TransferPage = () => {
    const userData = useAuth();

    if (!userData) {
        return <div>Loading...</div>;
    }

    const makeTransfer = () => {
        console.log("Make transfer");
    }

    return (
        <React.Fragment>
            Choose receiver
            <Button onClick={makeTransfer}>Transfer money</Button>
        </React.Fragment>
    );
}

export default TransferPage;
