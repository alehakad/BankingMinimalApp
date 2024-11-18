import { expressjwt } from "express-jwt";


const SECRET_KEY = process.env.SECRET_KEY;


const jwtMiddleware = expressjwt({ secret: SECRET_KEY, algorithms: ['HS256'], requestProperty: 'auth' });


export default jwtMiddleware;
