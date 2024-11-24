import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { Schema } from "mongoose";



const transactionSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

const userSchema = new Schema({
    email: { type: String, required: true, unique: true, trim: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    amount: { type: Number, default: 0 },
    verified: { type: Boolean, default: false }, // if passcode verified
    transactions: [transactionSchema],
}, { timestamps: true });


// middleware to hash password on creation
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();  // if password isn't modified, skip hashing
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt); // hash password with salt
        next()
    } catch (err) {
        next(err);
    }
})


// check password 
userSchema.methods.comparePassword = async function (passedPassword) {
    return bcrypt.compare(passedPassword, this.password);
}

userSchema.statics.findByEmailOrPhone = async function (email, phone) {
    const user = await this.findOne({ $or: [{ email }, { phone }] });
    return user;
}

const User = mongoose.model('User', userSchema);

export default User;