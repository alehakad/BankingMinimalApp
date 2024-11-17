import express from 'express';
import { checkSchema, validationResult } from 'express-validator';
import generateOtp from '../utils/genrateOtp.js';
import User from '../models/user_schema.js';


// TODO: save in redis
const usersOtp = new Map();

const userRegisterSchema = {
    email: {
        isEmail: {
            errorMessage: 'Please provide a valid email',
        },
        normalizeEmail: true,
    },
    phone: {
        matches: {
            options: [/^\+\d+$/], // phone should start with +
            errorMessage: 'Phone number must start with a + and contain only digits afterwards',
        },
        isLength: {
            options: { min: 10, max: 15 },
            errorMessage: 'Phone number must be between 10 and 15 characters',
        },
    },
    password: {
        isLength: {
            options: { min: 8, max: 20 },
            errorMessage: 'Password should be between 8 and 20 characters',
        },
        matches: {
            options: [
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            ],
            errorMessage:
                'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)',
        },
    },
};


const userOtpSchema = {
    phone: {
        matches: {
            options: [/^\+\d+$/], // phone should start with +
            errorMessage: 'Phone number must start with a + and contain only digits afterwards',
        },
        isLength: {
            options: { min: 10, max: 15 },
            errorMessage: 'Phone number must be between 10 and 15 characters',
        },
    },
    passcode: {
        isLength: {
            options: { min: 6, max: 6 },
            errorMessage: 'OTP should be between 6 numbers',
        },
        matches: {
            options: [/^\d+$/], // only numbers
            errorMessage:
                'OTP must contain only numbers',
        },
    },
};


const router = express.Router()


router.get('/', (req, res) => {
    res.send('Register page');
});


router.post('/', checkSchema(userRegisterSchema), async (req, res) => {
    // validate data
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // check that user is not in database
    const { email, phone, password } = req.body;
    const existingUser = await User.findByEmailOrPhone(email, phone);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // create user
    const newUser = new User({ email, phone, password });
    newUser.save();

    // generate and send otp to email
    const otp = generateOtp();
    console.log(`sending otp ${otp} to email ${email}`)

    usersOtp.set(phone, { otp });

    res.status(200);
})


router.post('/verify-passcode', checkSchema(userOtpSchema), async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, otp } = req.body;

    const currentUser = await User.findByEmailOrPhone(email);
    if (!currentUser) return res.status(401).send('Invalid credentials');

    // check otp
    if (otp != usersOtp.get(email)) {
        return res.status(401).send('Wrong otp');
    }

    // generate token - signup completed
    const token = generateToken(currentUser.email);
    res.status(200).json({ token });

})

export default router;
