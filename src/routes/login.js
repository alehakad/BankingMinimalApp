import express from 'express';
import { checkSchema, validationResult } from 'express-validator';
import generateToken from "../utils/token.js";
import User from '../models/user_schema.js';

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
    const existingUser = await User.findByEmailOrPhone(email, phone);
    if (!existingUser) return res.status(401).send('Invalid credentials');

    const checkPassword = await existingUser.comparePassword(password);
    if (!checkPassword) {
        return res.status(401).json({ message: 'Invalid password' });
    }

    const token = generateToken(existingUser.email);
    res.status(200).json({ token });
})

export default router;