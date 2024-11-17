import mongoose from "mongoose";

const mongoURI = 'mongodb://127.0.0.1:27017/bankApp';

// connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    }
};

export default connectDB;