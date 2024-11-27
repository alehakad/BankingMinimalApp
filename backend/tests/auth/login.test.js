import { registerUser, loginUser, verifyOtp } from '../common/testUtils';
import { describe, expect } from '@jest/globals';

describe("POST /login", () => {
  test('login user fail for nonverified user', async () => {
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

    // Register user without verifying OTP
    await registerUser(newUser);

    const response = await loginUser(userCredentials.email, userCredentials.password);  // Using helper function

    expect(response.status).toBe(403);
    expect(response.body.error).toBe('Account not verified');
  });

  test('login user fail for non existing user', async () => {
    const userCredentials = {
      email: "test@example.com",
      password: "CorrectPassword123!",
    };

    const response = await loginUser(userCredentials.email, userCredentials.password);  // Using helper function

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Invalid credentials');
  });

  test('login user fail wrong password', async () => {
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

    // Attempt login with wrong password
    const response = await loginUser(userCredentials.email, "WrongPassword123!");  // Using helper function

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Wrong password or email');
  });

  test('login successful', async () => {
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

    // Attempt login
    const response = await loginUser(userCredentials.email, userCredentials.password);  // Using helper function

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });
});
