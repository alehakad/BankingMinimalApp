import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import docsRouter from './routes/docs.js';
import loginRouter from './routes/login.js';
import regRouter from './routes/register.js';
import userRouter from './routes/user.js';
import { connectDB } from './models/dbConnect.js';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';


// load .env variables
dotenv.config();

const app = express();

// add helmet security middleware
app.use(helmet({ crossOriginResourcePolicy: false, }));

// set cors
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


// logging middeware
app.use(morgan('combined'));

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
// middleware to serve static images
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


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

connectDB();

if (process.env.NODE_ENV !== 'test') {
  // connect to datebase

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}


export default app;