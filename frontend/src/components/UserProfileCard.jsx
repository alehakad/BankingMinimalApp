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
import { useNotification } from '../context/NotificationContext';
import api from "../utils/axiosClient.js";


const UserProfileCard = ({ user }) => {
    const [imagePreview, setImagePreview] = useState(null); // State to manage the image preview
    const [uploading, setUploading] = useState(false); // State to show upload status

    const { showSuccess, showError } = useNotification();

    if (!user) {
        return <p>Loading...</p>;
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
            const response = await api.post("/user/upload", formData, {
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
                    {/* Upload Button */}
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
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                        {name}
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
