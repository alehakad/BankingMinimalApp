import jwt from "jsonwebtoken";
import dotenv from "dotenv"


dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

function generateToken(userEmail) {
    return jwt.sign({ userEmail: userEmail }, SECRET_KEY, { expiresIn: '5h' });
}


export default generateToken;