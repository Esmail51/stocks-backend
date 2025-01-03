import express from 'express';
import app from './app'; // Assuming this contains your Express app configuration
import connectDB from './config/db';
import cors from 'cors';

const PORT = process.env.PORT || 5000;

// CORS Configuration
app.use(cors({
  origin: ['http://localhost:3000', 'https://stocks-academy.vercel.app/']
}));

// Start Server
const startServer = async () => {
  try {
    // Connect to the database
    await connectDB();
    console.log('Database connected successfully');

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error:any) {
    console.error('Error starting the server:', error.message);
    process.exit(1); // Exit with failure code
  }
};

// Initialize the server
startServer();
