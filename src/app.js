import express from 'express';
import docsRouter from './routes/docs.js'; 

const app = express();

app.use(docsRouter);

app.get('/', (req, res) => {
  res.send('Welcome to bank app');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
