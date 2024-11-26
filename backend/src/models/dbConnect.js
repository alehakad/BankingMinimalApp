import mongoose from "mongoose";
import { MongoMemoryServer } from 'mongodb-memory-server';

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;

const mongoURI = `mongodb://${dbHost}:${dbPort}/${dbName}`;
let mongoServer;


// connect to MongoDB
const connectDB = async () => {
    const isTestEnvironment = process.env.NODE_ENV === 'test';

    try {
        if (isTestEnvironment) {
            mongoServer = await MongoMemoryServer.create();
            const uri = mongoServer.getUri();
            console.log("Connected to in-memory MongoDB for testing:", uri);
            await mongoose.connect(uri);
        }
        else {
            await mongoose.connect(mongoURI);
            console.log('MongoDB connected');
        }
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    }

};

// disconnect from MongoDB
const disconnectDB = async () => {
    console.log("Disconnect from MongoDB");
    await mongoose.disconnect();
    if (mongoServer) {
        await mongoServer.stop(); // Stop the in-memory MongoDB server if used
    }
};

export { connectDB, disconnectDB };