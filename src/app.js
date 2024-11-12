import express from 'express';
import docsRouter from './routes/docs.js';
import loginRouter from './routes/login.js';
import regRouter from './routes/register.js';


const app = express();

app.use(express.json());

app.use('/docs', docsRouter);
app.use('/login', loginRouter);
app.use('/register', regRouter);

app.get('/', (req, res) => {
  res.send('Welcome to bank app');
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
