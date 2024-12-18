import generateToken from "../utils/generateToken.js";
import { generateOtp, storeOtp, validateOtp } from '../utils/checkOtp.js';
import User from '../models/userSchema.js';


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // authenticate user
    const existingUser = await User.findByEmailOrPhone(email);
    if (!existingUser) return res.status(401).json({ error: 'Invalid credentials' });

    const checkPassword = await existingUser.comparePassword(password);
    if (!checkPassword) {
        return res.status(401).json({ error: 'Wrong password or email' });
    }

    // check user verified
    if (!existingUser.verified) {
        const otp = generateOtp();
        // send otp
        console.log(`sending otp ${otp} to email ${email}`);
        // save otp in redis
        storeOtp(existingUser._id, otp);

        return res.status(403).json({ error: 'Account not verified' });
    };

    const token = generateToken(existingUser.email, existingUser.roles);
    return res.status(200).json({ token });
};

const registerUser = async (req, res) => {
    // check that user is not in database
    const { email, phone, password, name } = req.body;
    const existingUser = await User.findByEmailOrPhone(email, phone);
    if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
    }

    // create user with random amount
    const amount = Math.floor(Math.random() * 10000);
    const newUser = new User({ email, phone, password, amount, name });
    await newUser.save();

    // generate otp
    const otp = generateOtp();
    // send otp
    console.log(`sending otp ${otp} to email ${email}`)

    // save otp in redis
    storeOtp(newUser._id, otp);

    return res.status(201).json({ message: 'OTP sent successfully' });

}

const verifyOtp = async (req, res) => {

    const { email, passcode } = req.body;

    const currentUser = await User.findByEmailOrPhone(email);
    if (!currentUser) return res.status(401).json({ error: 'Invalid credentials' });

    // check otp
    if (!passcode || !(await validateOtp(currentUser._id, passcode))) {
        return res.status(401).json({ error: 'Wrong otp' });
    }
    // change user verified flag
    currentUser.verified = true;
    await currentUser.save();
    // user will be redirected to home
    const token = generateToken(currentUser.email, currentUser.roles);

    res.status(200).json({ message: 'Account verified', token });

}

export { loginUser, registerUser, verifyOtp };