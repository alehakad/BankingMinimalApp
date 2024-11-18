import express from 'express';
import generateOtp from '../utils/genrateOtp.js';
import User from '../models/userSchema.js';
import validateRequest from '../middleware/validator.js';
import { userRegisterSchema, userOtpSchema } from '../validators/authValidators.js';

// TODO: save otp per user in redis
const usersOtp = new Map();


const router = express.Router()


router.get('/', (req, res) => {
    res.send('Register page');
});


router.post('/', validateRequest(userRegisterSchema), async (req, res) => {

    // check that user is not in database
    const { email, phone, password } = req.body;
    const existingUser = await User.findByEmailOrPhone(email, phone);
    if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
    }

    // create user with random amount
    const amount = Math.floor(Math.random() * 10000);
    const newUser = new User({ email, phone, password, amount });
    newUser.save();

    // generate otp
    const otp = generateOtp();
    // send otp
    console.log(`sending otp ${otp} to email ${email}`)

    usersOtp.set(email, otp);

    return res.status(201).json({ message: 'OTP sent successfully' });
})


router.post('/verify-passcode', validateRequest(userOtpSchema), async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, passcode } = req.body;

    const currentUser = await User.findByEmailOrPhone(email);
    if (!currentUser) return res.status(401).json({ error: 'Invalid credentials' });

    // check otp
    if (!passcode || passcode != usersOtp.get(email)) {
        return res.status(401).json({ error: 'Wrong otp' });
    }

    // change user verified flag
    currentUser.verified = true;
    await currentUser.save();
    // user will be redirected to login
    res.status(200).json({ message: 'Account verified' });

})

export default router;
