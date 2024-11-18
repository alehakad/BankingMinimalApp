import mongoose from 'mongoose';
import User from '../models/userSchema.js';

const getDashboard = async (req, res) => {
    if (req.auth && req.auth.userEmail) {
        const userEmail = req.auth.userEmail;
        // get user data
        const currentUser = await User.findByEmailOrPhone(userEmail);
        if (!currentUser) return res.status(401).json({ error: 'No user with such email' });
        // exclude password
        const { email, phone, amount, transactions } = currentUser.toObject();
        return res.status(200).json({ message: `Welcome to dashboard ${userEmail}`, user: { email, phone, amount, transactions } });
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

        await session.withTransaction(async (session) => {
            // check balance
            if (senderUser.amount < amount) return res.status(403).json({ error: 'Insufficient balance' });
            // add transaction to users lists
            const transaction = { sender: senderUser._id, receiver: receiverUser._id, amount };
            senderUser.transactions.push(transaction);
            receiverUser.transactions.push(transaction);

            // change balance
            senderUser.amount -= amount;
            receiverUser.amount += amount;

            await senderUser.save();
            await receiverUser.save();
        })


        return res.status(200).json({ message: 'Transaction completed' });
    }
    return res.status(401).json({ error: 'Unauthorized: No email found in token' });
}

export { getDashboard, addTransaction };