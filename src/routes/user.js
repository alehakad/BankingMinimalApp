import express from 'express';
import jwtMiddleware from "../middleware/auth.js";
import User from '../models/userSchema.js';
import mongoose from 'mongoose';
import validateRequest from '../middleware/validator.js';
import { transactionSchema } from '../validators/dashboardValidators.js';



const router = express.Router();

// protect route
router.use(jwtMiddleware);

// error-handling middleware
router.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        return res.status(err.status || 401).json({
            error: 'Unauthorized',
            message: err.message,
        });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
});


router.get('/home', async (req, res) => {
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
});


// transaction are sent in /home get
// router.get('/transactions', async (req, res) => {
// });

router.patch('/transactions', validateRequest(transactionSchema), async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

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
})


export default router;