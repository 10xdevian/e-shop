import express from 'express';
import * as path from 'path';
import cors from 'cors';
import proxy from 'express-http-proxy';
import morgan from 'morgan';
import { rateLimit, ipKeyGenerator } from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import axios from 'axios';
import swaggerUi from 'swagger-ui-express';

const app = express();

app.use(
  cors({
    origin: ['http://localhost:3000'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    credentials: true,
  })
);

app.use(morgan('dev'));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cookieParser());
app.set('trust proxy', 1);
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Apply rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: (req: any) => (req.user ? 1000 : 100),
  message: { error: 'Too many requests , please try again later ' },
  standardHeaders: true,
  legacyHeaders: true,
  keyGenerator: (req: any) => ipKeyGenerator(req.ip),
});

app.use(limiter);

// Health check route
app.get('/gateway-health', (req, res) => {
  res.send({
    message: 'Welcome to api-gateway!',
  });
});

app.use(
  '/',
  proxy('http://localhost:6001', {
    proxyReqPathResolver: (req) => {
      const path = req.originalUrl;
      console.log(`Proxying to: http://localhost:6001${path}`);
      return path;
    },
  })
);

// Start the server
const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/gateway-health`);
});
server.on('error', console.error);
