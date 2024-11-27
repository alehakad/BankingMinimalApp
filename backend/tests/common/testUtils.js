import request from 'supertest';
import app from "../../src/app";

// Helper function to register a new user
export const registerUser = async (user) => {
    return await request(app).post('/register').send(user);
};

// Helper function to verify OTP
export const verifyOtp = async (email, passcode) => {
    const userPasscode = { email, passcode };
    return await request(app).post('/register/verify-passcode').send(userPasscode);
};

// Helper function to login user
export const loginUser = async (email, password) => {
    return await request(app).post('/login').send({ email, password });
};
