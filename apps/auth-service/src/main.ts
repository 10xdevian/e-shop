import express from 'express';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 6001;

const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'Hello Auth API this is me ' });
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
