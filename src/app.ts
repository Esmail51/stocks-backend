// src/app.ts
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import router from './routes/index';
import cors from 'cors';


dotenv.config();

const app = express();

app.use(cors({
  origin: ['https://stocks-academy.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.options('*', cors())

// Middleware

app.use(bodyParser.json());

// Routes
app.use('/api', router);

export default app;
