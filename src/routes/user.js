import express from 'express';
import jwtMiddleware from "../middleware/auth.js"


const router = express.Router();

// protect route
router.use(jwtMiddleware);

router.post('/home', (req, res) => {
    res.send("Welcome to dashboard");
});


router.get('/transactions', (req, res) => {
    res.status(200).json({
        "transactions": [
            {
                "transactionId": "string",
                "amount": 0
            }
        ]
    })
})

router.put('/transactions', (req, res) => {
    // TODO: add transaction
})


export default router;