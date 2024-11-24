import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Avatar,
    List,
    ListItem,
    ListItemText,
    Divider,
    Box,
} from '@mui/material';

const UserProfileCard = ({ user }) => {
    if (!user) {
        return <p>Loading...</p>;
    }
    const { email, phone, amount, transactions } = user;

    return (
        <Card sx={{ maxWidth: 400, margin: '20px auto', padding: 3, borderRadius: 2, boxShadow: 3 }}>
            {/* Profile Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
                <Avatar alt="User Image" sx={{ bgcolor: 'primary.main', width: 64, height: 64 }} />
                <Box sx={{ marginLeft: 2 }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                        {email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Balance: ${amount.toFixed(2)}
                    </Typography>
                </Box>
            </Box>

            <CardContent>
                {/* Contact Details */}
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                    Contact Info
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 1 }}>
                    <span role="img" aria-label="email">📧</span> {email}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 1 }}>
                    <span role="img" aria-label="phone">📞</span> {phone}
                </Typography>

                <Divider sx={{ marginY: 2 }} />

                {/* Transactions */}
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                    Transactions
                </Typography>
                {transactions.length > 0 ?
                    <List>
                        {transactions.map((transaction, index) => (
                            <React.Fragment key={index}>
                                <ListItem disablePadding>
                                    <ListItemText
                                        primary={transaction.receiver}
                                        secondary={
                                            <>
                                                <Typography variant="body2" color="text.secondary">
                                                    Amount: ${transaction.amount.toFixed(2)}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Date: {transaction.date}
                                                </Typography>
                                            </>
                                        }
                                    />
                                </ListItem>
                                {index < transactions.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                    </List>
                    : <Typography variant="body2" color="text.secondary">No transactions yet</Typography>}
            </CardContent>
        </Card>
    );
}

export default UserProfileCard;
