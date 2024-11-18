import express from 'express';
import { loginUser } from '../services/authController.js';
import validateRequest from '../middleware/validator.js';
import { userLoginSchema } from '../validators/authValidators.js';


const router = express.Router();


router.get('/', async (req, res) => {
    res.send('Login page');
});

router.post('/', validateRequest(userLoginSchema), loginUser);

export default router;