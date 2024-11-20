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
        <Card sx={{ maxWidth: 400, margin: '0 auto', padding: 2, borderRadius: 2, boxShadow: 3 }}>
            {/* Profile Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                <Avatar alt="User Image" sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
                </Avatar>
                <Box sx={{ marginLeft: 2 }}>
                    <Typography variant="h6" component="div">
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
                <Typography variant="body2">📧 {email}</Typography>
                <Typography variant="body2">📞 {phone}</Typography>

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
                    : 'No transactions yet'}
            </CardContent>
        </Card>
    );
};

export default UserProfileCard;
