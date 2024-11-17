import express from 'express';
import jwtMiddleware from "../middleware/auth.js"
import User from '../models/userSchema.js';



const transactionSchema = {
    transaction: {
        receiver: {
            isEmail: {
                errorMessage: 'Please provide a valid email',
            },
            normalizeEmail: true,
        },
        amount: {
            isFloat: {
                options: { gt: 0 },
                errorMessage: 'Amount must be greater than 0',
            },
            isInt: {
                errorMessage: 'Amount must be an integer',
            },
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


router.get('/transactions', async (req, res) => {

})

router.put('/transactions', checkSchema(transactionSchema), async (req, res) => {
    // add transaction to user list
    if (req.auth && req.auth.userId) {
        const userEmail = req.auth.userId;
    }
    return res.status(401).json({ error: 'Unauthorized: No email found in token' });
})


export default router;