import express from 'express';
import { checkSchema, validationResult } from 'express-validator';


const userLoginSchema = {
    username: {
        isLength: {
            options: { min: 3 },
            errorMessage: 'Username should be at least 3 characters long',
        },
        notEmpty: {
            errorMessage: 'Username is required',
        },
    },
    password: {
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

router.post('/', (req, res) => {
    res.send("successful login")
})

export default router;