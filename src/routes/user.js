import express from 'express';
import jwtMiddleware from "../middleware/auth.js"


const router = express.Router();

// protect route
router.use(jwtMiddleware);

router.post('/home', (req, res) => {
    const userEmail = req.user.email;
    res.status(200).json(`Welcome to dashboard ${userEmail}`);
});


// should be done with websocket
router.get('/transactions', (req, res) => {
})

router.put('/transactions', (req, res) => {
    // TODO: add transaction
})


export default router;