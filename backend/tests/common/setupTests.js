import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "../../src/app";
import User from "../../src/models/userSchema";
import { disconnectDB } from "../../src/models/dbConnect";


// load env variables
dotenv.config();

let server;

const PORT = process.env.PORT || 5000;

beforeAll(async () => {
    // create separate server for tests from app
    server = app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

// clear database after each test
afterEach(async () => {
   await User.deleteMany();
});

afterAll(async () => {
    await disconnectDB();
    server.close(); // close the server
});


