// deleteAllData.js
import mongoose from 'mongoose';

const DB_URI = 'mongodb://127.0.0.1:27017/bankApp';
async function deleteAllData() {
    try {
        // Connect to MongoDB
        await mongoose.connect(DB_URI);

        // Get the list of collections in the database
        const collections = await mongoose.connection.db.listCollections().toArray();

        // Loop through each collection and delete all documents
        for (const collection of collections) {
            await mongoose.connection.db.dropCollection(collection.name);
            console.log(`Deleted all data from collection: ${collection.name}`);
        }

        console.log('All data deleted from database');
        mongoose.disconnect(); // Disconnect from the database
    } catch (error) {
        console.error('Error deleting data:', error);
        mongoose.disconnect();
    }
}

deleteAllData();
