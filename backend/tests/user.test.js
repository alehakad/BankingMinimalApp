import mongoose from "mongoose";
import request from "supertest";
import dotenv from "dotenv";
import app from "../src/app";

// load env variables
dotenv.config();

afterAll(async () => {
    await mongoose.connection.close();
});


describe("Test login", () => {
    test("add two numbers", () => {
        expect(2 + 3).toBe(5);
    })
})