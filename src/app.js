import express from 'express';
import docsRouter from './routes/docs.js';
import loginRouter from './routes/login.js';
import regRouter from './routes/register.js';
import userRouter from './routes/user.js';
import connectDB from './models/db_connect.js';

const app = express();

// connect to datebase
connectDB();

app.use(express.json());

app.use('/docs', docsRouter);
app.use('/login', loginRouter);
app.use('/register', regRouter);
app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.send('Welcome to bank app');
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
