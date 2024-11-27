import { registerUser, loginUser, verifyOtp } from '../common/testUtils';
import request from 'supertest';
import app from "../../src/app";
import { describe, expect } from '@jest/globals';

describe("GET /dashboard", () => {

    test('get dashoard fail invalid token', async () => {
        const invalidToken = "invalidtoken";

        const response = await request(app)
            .get("/user/home")
            .set("Authorization", `Bearer ${invalidToken}`);

        expect(response.status).toBe(401);
    });

    test('get dashboard success', async () => {
        const userCredentials = {
            email: "test@example.com",
            password: "CorrectPassword123!",
        };

        const newUser = {
            email: userCredentials.email,
            password: userCredentials.password,
            phone: "+79213456789",
            name: "Test User",
        };

        // Register user
        await registerUser(newUser);
        // Verify OTP
        await verifyOtp(newUser.email, "123456");
        // Login
        const loginResponse = await loginUser(userCredentials.email, userCredentials.password);
        // get dashboard with token
        const token = loginResponse.body.token;

        const response = await request(app)
            .get("/user/home")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);

    });

});
