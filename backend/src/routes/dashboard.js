import express from 'express';
import jwtMiddleware from "../middleware/auth.js";
import validateRequest from '../middleware/validator.js';
import { transactionSchema } from '../validators/dashboardValidators.js';
import { addTransaction, getDashboard, uploadImage } from '../services/dashboardController.js';
import upload from '../utils/imageParser.js';


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


router.get('/home', getDashboard);

router.patch('/transactions', validateRequest(transactionSchema), addTransaction);

router.post('/upload', upload.single('profileImage'), uploadImage);


export default router;