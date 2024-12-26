import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
    courseName: String, // 'Intro to Stock Investing' or 'Options In
    date: Date,
    startTime: String,
    endTime: String,
    maxSeats: Number,
    type: String, 
    availableSeats: Number,
  });
  
  export const Class = mongoose.model('Class', classSchema);
  