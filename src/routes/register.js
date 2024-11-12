import express from 'express';
import { checkSchema, validationResult } from 'express-validator';


const userRegisterSchema = {
    username: {
        isLength: {
            options: { min: 3 },
            errorMessage: 'Username should be at least 3 characters long',
        },
        notEmpty: {
            errorMessage: 'Username is required',
        },
    },
    email: {
        isEmail: {
            errorMessage: 'Please provide a valid email',
        },
        normalizeEmail: true,
    },
    phone : {
        matches: {
            options: [/^\+\d+$/], // phone should start with +
            errorMessage: 'Phone number must start with a + and contain only digits afterwards',
          },
          isLength: {
            options: { min: 10, max: 15 },
            errorMessage: 'Phone number must be between 10 and 15 characters',
          },
    },
    password : {
        matches: {
            options: [/^\+\d+$/], // phone should start with +
            errorMessage: 'Phone number must start with a + and contain only digits afterwards',
          },
          isLength: {
            options: { min: 6, max: 15 },
            errorMessage: 'Password should be between 6 and 15 letters',
          },
    }
};



const router = express.Router()


router.get('/', (req, res) => {
    res.send('Register page');
});


router.post('/', checkSchema(userRegisterSchema), (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.status(200).json({ message: 'Form data is valid!', data: req.body });
})

export default router;
