// src/app.ts
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import router from './routes/index';
import cors from 'cors';


dotenv.config();

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'https://stocks-academy.vercel.app/'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


// Middleware

app.use(bodyParser.json());

// Routes
app.use('/api', router);

export default app;
