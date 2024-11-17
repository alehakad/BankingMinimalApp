import express from 'express';
import jwtMiddleware from "../middleware/auth.js"


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


router.get('/home', (req, res) => {
    if (req.auth && req.auth.userId) {
        const userEmail = req.auth.userId;
        return res.status(200).json({ message: `Welcome to dashboard ${userEmail}` });
    }
    return res.status(401).json({ error: 'Unauthorized: No email found in token' });
});


// should be done with websocket
router.get('/transactions', (req, res) => {
})

router.put('/transactions', (req, res) => {
    // TODO: add transaction
})


export default router;