import React, { useState } from 'react';
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
    Button
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import { useNotification } from '../context/NotificationContext';
import api from "../utils/axiosClient.js";


const UserProfileCard = ({ user }) => {
    const [imagePreview, setImagePreview] = useState(null); // State to manage the image preview
    const [uploading, setUploading] = useState(false); // State to show upload status

    const { showSuccess, showError } = useNotification();

    if (!user) {
        return <div>Loading...</div>;
    }
    const { email, phone, amount, transactions, name, profileImage } = user;

    // handle image upload
    const handleImageUpload = async (e) => {

        const file = e.target.files[0];
        if (!file) {
            showError("First select image!");
            return;
        }

        setImagePreview(URL.createObjectURL(file));
        setUploading(true);
        try {
            const token = localStorage.getItem('jwtToken');
            // create form data
            const formData = new FormData();
            formData.append("profileImage", file);
            const response = await api.post("/me/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                showSuccess("Image updated");
            } else {
                showError("Failed to upload image");
            }

        }
        catch (error) {
            console.log("Error uploading image", error);
            showError("Error uploading image");
        }
        finally {
            setUploading(false);
        }

    }

    // handle image input
    const handleFileInputClick = () => {
        document.getElementById('profile-image-upload').click();
    };

    const profileImageUrl = imagePreview || (profileImage ? `${process.env.REACT_APP_API_BASE_URL}${profileImage}` : `${process.env.REACT_APP_API_BASE_URL}/uploads/default-profile-picture.jpg`);

    console.log(profileImageUrl);
    return (
        <Card sx={{ maxWidth: 400, margin: '20px auto', padding: 3, borderRadius: 2, boxShadow: 3 }}>
            {/* Profile Header */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Avatar Display */}
                <Avatar
                    src={profileImageUrl}
                    sx={{ bgcolor: 'primary.main', width: 64, height: 64 }}
                />

                {/* Image Upload Button */}
                <input
                    type="file"
                    accept="image/*"
                    id="profile-image-upload"
                    style={{ display: 'none' }}
                    onChange={handleImageUpload}
                />
                <label htmlFor="profile-image-upload">
                    <Button
                        onClick={handleFileInputClick}
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                        disabled={uploading}
                    >
                        {uploading ? 'Uploading...' : 'Upload Profile Picture'}
                    </Button>
                </label>

                <Box sx={{ marginLeft: 2 }}>
                    <Typography variant="h6" component="span" sx={{ fontWeight: 'bold', display: 'block' }}>
                        {name}
                    </Typography>
                    <Typography variant="body2" component="span" color="text.secondary" sx={{ display: 'block' }}>
                        Balance: ${amount.toFixed(2)}
                    </Typography>
                </Box>
            </Box>

            <CardContent>
                {/* Contact Details */}
                <Typography variant="subtitle1" component="span" sx={{ fontWeight: 'bold', marginBottom: 1, display: 'block' }}>
                    Contact Info
                </Typography>
                <Box sx={{ marginBottom: 1 }}>
                    <Typography variant="body2" component="span">
                        <span role="img" aria-label="email">📧</span> {email}
                    </Typography>
                </Box>
                <Box sx={{ marginBottom: 1 }}>
                    <Typography variant="body2" component="span">
                        <span role="img" aria-label="phone">📞</span> {phone}
                    </Typography>
                </Box>

                <Divider sx={{ marginY: 2 }} />

                {/* Transactions */}
                <Typography variant="subtitle1" component="span" sx={{ fontWeight: 'bold', marginBottom: 1, display: 'block' }}>
                    Transactions
                </Typography>
                {transactions.length > 0 ? (
                    <List>
                        {transactions.map((transaction, index) => {
                            const isReceiver = transaction.receiver.email === email;

                            return (
                                <React.Fragment key={index}>
                                    <ListItem disablePadding>
                                        <ListItemText
                                            primary={
                                                <>
                                                    {isReceiver ? (
                                                        <AddCircleOutlineIcon sx={{ color: 'green', marginRight: 1 }} />
                                                    ) : (
                                                        <RemoveCircleOutlineIcon sx={{ color: 'red', marginRight: 1 }} />
                                                    )}
                                                    {isReceiver ? transaction.sender.email : transaction.receiver.email}
                                                </>
                                            }
                                            secondary={
                                                <>
                                                    <Typography variant="body2" component="span" color="text.secondary" sx={{ display: 'block' }}>
                                                        Amount: ${transaction.amount.toFixed(2)}
                                                    </Typography>
                                                    <Typography variant="body2" component="span" color="text.secondary" sx={{ display: 'block' }}>
                                                        Date: {transaction.date}
                                                    </Typography>
                                                </>
                                            }
                                        />
                                    </ListItem>
                                    {index < transactions.length - 1 && <Divider />}
                                </React.Fragment>
                            );
                        })}
                    </List>
                ) : (
                    <Typography variant="body2" component="span" color="text.secondary" sx={{ display: 'block' }}>
                        No transactions yet
                    </Typography>
                )}
            </CardContent>
        </Card>
    );

}

export default UserProfileCard;
