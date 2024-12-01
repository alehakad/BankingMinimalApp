import express from 'express';
import jwtMiddleware from "../middleware/auth.js";
import { getUsersEmails } from '../services/usersController.js';

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

router.get('/', getUsersEmails);

export default router;