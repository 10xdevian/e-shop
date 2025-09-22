import express from 'express';

const port = process.env.PORT ? Number(process.env.PORT) : 6001;

const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'Hello Auth API this is me ' });
});

const server = app.listen(port, () => {
  console.log(`Auth server is running at http://localhost:${port}/api`);
});

server.on('error', (err) => {
  console.log('Server Error', err);
});
