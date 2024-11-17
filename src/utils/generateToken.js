import jwt from "jsonwebtoken";
import dotenv from "dotenv"


dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

function generateToken(userId) {
    return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '5h' })
}

export default generateToken;