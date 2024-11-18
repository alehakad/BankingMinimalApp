import express from 'express';
import jwtMiddleware from "../middleware/auth.js";
import { checkSchema, validationResult } from 'express-validator';
import User from '../models/userSchema.js';
import mongoose from 'mongoose';



const transactionSchema = {
    'transaction.receiver': {
        isEmail: {
            errorMessage: 'Please provide a valid email',
        },
        normalizeEmail: true,
    },
    'transaction.amount': {
        isFloat: {
            options: { gt: 0 },
            errorMessage: 'Amount must be greater than 0',
        },
        isInt: {
            errorMessage: 'Amount must be an integer',
        },
    },
};
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
    if (req.auth && req.auth.userId) {
        const userEmail = req.auth.userId;
        // get user data
        const currentUser = await User.findByEmailOrPhone(userEmail);
        if (!currentUser) return res.status(401).json({ error: 'No user with such email' });
        return res.status(200).json({ message: `Welcome to dashboard ${userEmail}`, user: currentUser });
    }
    return res.status(401).json({ error: 'Unauthorized: No email found in token' });
});


// transaction are sent in /home get
// router.get('/transactions', async (req, res) => {
// });

router.put('/transactions', checkSchema(transactionSchema), async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    if (req.auth && req.auth.userId) {
        const userEmail = req.auth.userId;

        // sender
        const senderUser = await User.findByEmailOrPhone(userEmail);
        if (!senderUser) return res.status(401).json({ error: 'No user with such email' });

        const { recieverEmail, amount } = req.body.transaction;
        // reciever
        const receiverUser = await User.findByEmailOrPhone(recieverEmail);
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
        })

    }
    return res.status(401).json({ error: 'Unauthorized: No email found in token' });
})


export default router;