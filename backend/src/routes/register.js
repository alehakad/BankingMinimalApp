import express from 'express';
import { registerUser, verifyOtp } from '../services/authController.js'
import validateRequest from '../middleware/validator.js';
import { userRegisterSchema, userOtpSchema } from '../validators/authValidators.js';


const router = express.Router()

router.get('/', (req, res) => {
    res.send('Register page');
});

router.post('/', validateRequest(userRegisterSchema), registerUser);

router.post('/verify-passcode', validateRequest(userOtpSchema), verifyOtp);

export default router;
