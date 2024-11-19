import generateToken from "../utils/generateToken.js";
import generateOtp from '../utils/genrateOtp.js';
import User from '../models/userSchema.js';


// TODO: save otp per user in redis
const usersOtp = new Map();

const loginUser = async (req, res) => {
    const { email, password } = req.body;

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
    return res.status(200).json({ token });
};

const registerUser = async (req, res) => {
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

}

const verifyOtp = async (req, res) => {

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
    // user will be redirected to home
    const token = generateToken(currentUser.email);

    res.status(200).json({ message: 'Account verified', token });

}

export { loginUser, registerUser, verifyOtp };