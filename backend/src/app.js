import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import docsRouter from './routes/docs.js';
import loginRouter from './routes/login.js';
import regRouter from './routes/register.js';
import dashboardRouter from './routes/dashboard.js';
import usersRouter from './routes/users.js';
import { connectDB, disconnectDB } from './models/dbConnect.js';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import http from "http";
import { initSocket } from './utils/webSocketSetup.js';

// load .env variables
dotenv.config();
import redisClient from "./models/redisConnect.js";


const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

// create app
const app = express();
const server = http.createServer(app);

// init socketio
initSocket(server);


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


// middleware to serve static images
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


// parse json
app.use(express.json());

app.use('/docs', docsRouter);
app.use('/login', loginRouter);
app.use('/register', regRouter);
app.use('/me', dashboardRouter);
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.send('Welcome to bank app');
});



const PORT = process.env.PORT || 5000;

// connect to MongoDB
await connectDB();

// connect to redis
await redisClient.connect();

if (process.env.NODE_ENV !== 'test') {
  // connect to datebase
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

async function shutdown() {
  console.log('Shutting down gracefully...');

  if (process.env.NODE_ENV !== 'test') {
    if (redisClient) {
      console.log('Closing Redis connection...');
      await redisClient.quit();
    }


    console.log("Closing DB connection");
    await disconnectDB();
  }

  console.log('All connections closed.');
  process.exit(0);
}

// Handle termination signals
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

export default app;