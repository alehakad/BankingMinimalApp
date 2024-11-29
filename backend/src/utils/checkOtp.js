import otpGenerator from 'otp-generator';
import redisClient from '../models/redisConnect.js';

const generateOtp = () => {
    if (process.env.NODE_ENV === 'test') {
        return 123456;
    }
    return otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
};


// store for 5 minutes by default
const storeOtp = async (userId, otp, ttl = 300) => {
    const key = `otp:${userId}`;
    await redisClient.set(key, otp, 'EX', ttl, (err) => {
        if (err) {
            console.error('Error storing OTP:', err);
        } else {
            console.log(`OTP stored for ${userId}`);
        }
    });

};

// validate OTP
const validateOtp = async (userId, inputOtp) => {
    const key = `otp:${userId}`;
    try {
        // get stored OTP
        const storedOtp = await redisClient.get(key);
        if (storedOtp === inputOtp) {
            await redisClient.del(key); // delete otp after match
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.error('Error validating OTP:', err);
        return false;
    }
};





export { generateOtp, storeOtp, validateOtp };