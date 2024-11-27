import { registerUser, verifyOtp } from '../common/testUtils';
import request from 'supertest';
import app from "../../src/app";
import User from "../../src/models/userSchema";
import { describe, expect } from '@jest/globals';


describe("POST /register", () => {
  test('register new user successfully', async () => {
    const newUser = {
      email: "ab@gmail.com",
      password: "BlaBla123!",
      phone: "+79213456789",
      name: "Olo",
    };

    const response = await registerUser(newUser);

    // check response
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("OTP sent successfully");

    // Validate database changes
    const userInDB = await User.findOne({ email: newUser.email });
    expect(userInDB).not.toBeNull();
    expect(userInDB.amount).toBeGreaterThanOrEqual(0);
    expect(userInDB.amount).toBeLessThan(10000);
  });

  test("fail to register when user already exists", async () => {
    const existingUser = {
      email: "a@example.com",
      password: "Password123!",
      phone: "+79213456789",
      name: "Olowe",
    };

    // First request
    await registerUser(existingUser);

    // Second request
    const response = await registerUser(existingUser);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("User already exists");
  });

  test("fail to register because of incomplete form input", async () => {
    const unfilledUser = {
      email: "a@example.com",
      password: "Password123!",
      name: "Olowe",
    };

    const response = await request(app).post("/register").send(unfilledUser);

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  test("fail to register because of unsuitable form field", async () => {
    const newUser = {
      email: "ab@gmail.com",
      password: "BlaBla123!",
      phone: "+79213456789",
      name: "Olo1",
    };

    const response = await registerUser(newUser);

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });
});


// generateOtp returns 123456 in test
describe("POST /register/verify-passcode", () => {

  test('fail to verify non-existing user', async () => {
    const userPasscode = { email: "a@gmail.com", passcode: 123456 };

    const response = await request(app).post('/register/verify-passcode').send(userPasscode);

    expect(response.status).toBe(400);
  });

  test('fail to verify wrong passcode', async () => {
    const newUser = {
      email: "ab@gmail.com",
      password: "BlaBla123!",
      phone: "+79213456789",
      name: "Olo",
    };

    await registerUser(newUser);

    const userPasscode = { email: newUser.email, passcode: "123457" };

    const response = await verifyOtp(newUser.email, userPasscode.passcode);

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Wrong otp');

    // check that verified flag in db is false
    const userInDB = await User.findOne({ email: newUser.email });
    expect(userInDB.verified).toBe(false);
  });

  test("verify passcode successfully", async () => {
    const newUser = {
      email: "ab@gmail.com",
      password: "BlaBla123!",
      phone: "+79213456789",
      name: "Olo",
    };

    await registerUser(newUser);

    const userPasscode = { email: newUser.email, passcode: "123456" };

    const response = await verifyOtp(newUser.email, userPasscode.passcode);

    expect(response.status).toBe(200);

    // check that verified flag in db is true
    const userInDB = await User.findOne({ email: newUser.email });
    expect(userInDB.verified).toBe(true);
  })
});
