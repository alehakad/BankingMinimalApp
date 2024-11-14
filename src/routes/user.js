import express from 'express';
import generateToken from '../utils/token.js';
import jwtMiddleware from "../middleware/auth.js"


const router = express.Router();


router.use(jwtMiddleware);

// list of users, should be in DB
const users = [{username: "Alek", password: "123"}, {username: "Gio", password: "321"}, {username: "Lop", password: "456"}] 

router.post('/home', (req, res) => {
    const { username, password } = req.body;
    // Authenticate user (dummy logic here)
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) return res.status(401).send('Invalid credentials');
  
    const token = generateToken(user.id);
    res.json({ token });
  });


export default router;