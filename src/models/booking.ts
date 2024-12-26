import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    date: Date,
    status: { type: String, default: 'confirmed' },
  });
  
  export const Booking = mongoose.model('Booking', bookingSchema);
  