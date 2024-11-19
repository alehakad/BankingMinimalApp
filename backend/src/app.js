import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import docsRouter from './routes/docs.js';
import loginRouter from './routes/login.js';
import regRouter from './routes/register.js';
import userRouter from './routes/user.js';
import connectDB from './models/dbConnect.js';
import dotenv from 'dotenv';
import morgan from 'morgan';

// load .env variables
dotenv.config();

const app = express();

// connect to datebase
connectDB();


// add helmet security middleware
app.use(helmet());

// set cors
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


// logging middeware
app.use(morgan('combined'));

// parse json
app.use(express.json());

app.use('/docs', docsRouter);
app.use('/login', loginRouter);
app.use('/register', regRouter);
app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.send('Welcome to bank app');
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
