import mongoose from "mongoose";
import { Schema } from "mongoose";



const transactionSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    amount: { type: Number, default: 0 },
    created: { type: Date, default: Date.now },
    transactions: [transactionSchema],
})

const User = mongoose.model('User', userSchema);

export default User;