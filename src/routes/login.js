import express from 'express';
import { checkSchema, validationResult } from 'express-validator';
import generateToken from "../utils/token.js"


// list of users, should be in DB
const users = [{ id: 1, email: "a@gmail.com", password: "123" }, { id: 2, email: "b@gmail.com", password: "321" }, { id: 3, email: "c@gmail.com", password: "456" }]

const userLoginSchema = {
    email: {
        isEmail: {
            errorMessage: 'Please provide a valid email',
        },
        normalizeEmail: true,
    }
};

const router = express.Router()


router.get('/', (req, res) => {
    res.send('Login page');
});

router.post('/', checkSchema(userLoginSchema), (req, res) => {
    const { email, password } = req.body;

    // validate data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Authenticate user (dummy logic here)
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return res.status(401).send('Invalid credentials');

    const token = generateToken(user.id);
    res.status(200).json({ token });
})

export default router;