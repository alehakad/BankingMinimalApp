import mongoose from 'mongoose';
import User from '../models/userSchema.js';
import { getUserFolderPath } from '../utils/imageParser.js';

const getDashboard = async (req, res) => {
    if (req.auth && req.auth.userEmail) {
        const userEmail = req.auth.userEmail;
        // get user data
        const currentUser = await User.findByEmailOrPhone(userEmail);
        if (!currentUser) return res.status(401).json({ error: 'No user with such email' });
        // exclude password
        const { email, phone, amount, transactions, name, profileImage } = currentUser.toObject();
        return res.status(200).json({ message: `Welcome to dashboard ${userEmail}`, user: { email, phone, amount, transactions, name, profileImage } });
    }
    return res.status(401).json({ error: 'Unauthorized: No email found in token' });
};

const addTransaction = async (req, res) => {
    if (req.auth && req.auth.userEmail) {
        const userEmail = req.auth.userEmail;

        // sender
        const senderUser = await User.findByEmailOrPhone(userEmail);
        if (!senderUser) return res.status(401).json({ error: 'No user with such email' });

        const { receiver, amount } = req.body.transaction;
        // reciever
        const receiverUser = await User.findByEmailOrPhone(receiver);
        if (!receiverUser) return res.status(401).json({ error: 'No reciever with such email' });


        // start session
        const session = await mongoose.startSession();

        const transaction = { sender: senderUser._id, receiver: receiverUser._id, amount };
        if (senderUser.amount < amount) {
            return res.status(403).json({ error: 'Insufficient balance' });
        }

        try {
            await session.withTransaction(async () => {

                senderUser.transactions.push(transaction);
                receiverUser.transactions.push(transaction);

                senderUser.amount -= amount;
                receiverUser.amount += amount;

                await senderUser.save();
                await receiverUser.save();
            });

            return res.status(200).json({ message: 'Transaction completed', transaction });

        } catch (error) {
            return res.status(500).json({ error: 'An error occurred during the transaction' });
        }
    }
    return res.status(401).json({ error: 'Unauthorized: No email found in token' });
}

const uploadImage = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }

    // add url to database for user

    const userEmail = req.auth.userEmail;
    const user = await User.findByEmailOrPhone(userEmail);

    if (!user) return res.status(401).json({ error: 'No user with such email' });

    const folderPath = getUserFolderPath(userEmail);
    const imageUrl = `/${folderPath}/${req.file.filename}`;

    user.profileImage = imageUrl;
    user.save();

    res.status(200).json({
        message: 'File uploaded successfully',
        filePath: imageUrl
    });
}

export { getDashboard, addTransaction, uploadImage };