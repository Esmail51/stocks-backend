"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookingsByEmail = exports.createBooking = exports.getClasses = exports.createClass = void 0;
const class_1 = require("../models/class");
const user_1 = require("../models/user");
const booking_1 = require("../models/booking");
const createClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseName, date, startTime, endTime, maxSeats, type } = req.body;
    try {
        const newClass = new class_1.Class({
            courseName,
            date,
            startTime,
            endTime,
            type,
            maxSeats,
            availableSeats: maxSeats,
        });
        yield newClass.save();
        res.json({ success: true, message: 'Class created!', classId: newClass._id });
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.createClass = createClass;
const getClasses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const classes = yield class_1.Class.find({ date: { $gte: new Date() } });
        res.json(classes);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.getClasses = getClasses;
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone, classId } = req.body;
    try {
        // Check class availability
        const selectedClass = yield class_1.Class.findById(classId);
        if (!selectedClass || selectedClass.availableSeats === undefined || selectedClass.availableSeats === null || selectedClass.availableSeats <= 0) {
            return res.status(400).json({ error: 'No seats available.' });
        }
        // Create or fetch the user
        let user = yield user_1.User.findOne({ email });
        if (!user) {
            user = new user_1.User({ name, email, phone });
            yield user.save();
        }
        // Create booking
        const booking = new booking_1.Booking({ userId: user._id, classId, date: selectedClass.date });
        yield booking.save();
        // Update seat availability
        selectedClass.availableSeats -= 1;
        yield selectedClass.save();
        res.json({ success: true, message: 'Booking confirmed!', bookingId: booking._id });
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.createBooking = createBooking;
const getBookingsByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.User.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        const bookings = yield booking_1.Booking.find({ userId: user._id }).populate('classId');
        res.json(bookings);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.getBookingsByEmail = getBookingsByEmail;
