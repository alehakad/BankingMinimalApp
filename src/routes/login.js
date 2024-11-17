import express from 'express';
import { checkSchema, validationResult } from 'express-validator';
import generateToken from "../utils/generateToken.js";
import User from '../models/userSchema.js';

const userLoginSchema = {
    email: {
        isEmail: {
            errorMessage: 'Please provide a valid email',
        },
        normalizeEmail: true,
    }
};

const router = express.Router();


router.get('/', async (req, res) => {
    res.send('Login page');
});

router.post('/', checkSchema(userLoginSchema), async (req, res) => {
    const { email, password } = req.body;

    // validate data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // authenticate user
    const existingUser = await User.findByEmailOrPhone(email);
    if (!existingUser) return res.status(401).json({ error: 'Invalid credentials' });

    // check user verified
    if (!existingUser.verified) return res.status(403).json({ error: 'Account not verified' });

    const checkPassword = await existingUser.comparePassword(password);
    if (!checkPassword) {
        return res.status(401).json({ error: 'Wrong password or email' });
    }

    const token = generateToken(existingUser.email);
    res.status(200).json({ token });
})

export default router;