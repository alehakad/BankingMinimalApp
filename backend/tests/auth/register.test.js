import request from 'supertest';
import app from "../../src/app";
import User from "../../src/models/userSchema";



describe("POST /register", () => {
  test('register new user successfully', async () => {

    const newUser = {
      email: "ab@gmail.com",
      password: "BlaBla123!",
      phone: "+79213456789",
      name: "Olo",
    };

    const response = await request(app).
      post('/register').send(newUser);
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
    await request(app).post("/register").send(existingUser);

    // Second request
    const response = await request(app).post("/register").send(existingUser);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("User already exists");
  });


  test("fail to register becasuse of incomplete form input", async () => {
    const unfilledUser = {
      email: "a@example.com",
      password: "Password123!",
      name: "Olowe",
    };

    const response = await request(app).post("/register").send(unfilledUser);

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  test("fail to register becasuse of unsuitable form field ", async () => {
    const newUser = {
      email: "ab@gmail.com",
      password: "BlaBla123!",
      phone: "+79213456789",
      name: "Olo1",
    };

    const response = await request(app).post("/register").send(newUser);

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

});





