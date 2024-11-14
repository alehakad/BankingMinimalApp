import { expressjwt } from "express-jwt";
import dotenv from "dotenv"


dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;


const jwtMiddleware = expressjwt({ secret: SECRET_KEY, algorithms: ['HS256'] });


export default jwtMiddleware
