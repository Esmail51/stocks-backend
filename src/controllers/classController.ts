import { NextFunction, Request, Response } from 'express';
import { Class } from '../models/class';
import { User } from '../models/user';
import { Booking } from '../models/booking';
import { sendEmail } from './emailController';

export const createClass = async (req: Request, res: Response) => {
    const { courseName, date, startTime, endTime, maxSeats, type } = req.body;

    try {
        const newClass = new Class({
            courseName,
            date,
            startTime,
            endTime,
            type,
            maxSeats,
            availableSeats: maxSeats,
        });

        await newClass.save();
        res.json({ success: true, message: 'Class created!', classId: newClass._id });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const getClasses = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filter = req.query.type;
        let query = {};

        if (filter === 'all') {
            query = {};
        } else if (filter === 'intro') {
            query = { type: 'intro' };
        } else if (filter === 'advanced') {
            query = { type: 'advanced' };
        } else {
            query = { date: { $gte: new Date() } };
        }

        const classes = await Class.find(query);
        const totalClasses = classes.length;

        return res.json({
            classes,
            totalClasses,
        });
    } catch (error) {
        console.error('Error fetching classes:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
export const createBooking = async (req: Request, res: Response) => {
    const { name, email, classId } = req.body;

    try {
        // Check class availability
        const selectedClass = await Class.findById(classId);
        if (!selectedClass || selectedClass.availableSeats === undefined || selectedClass.availableSeats === null || selectedClass.availableSeats <= 0) {
            return res.status(400).json({ error: 'No seats available.' });
        }

        // Create or fetch the user
        let user = await User.findOne({ email });
        if (!user) {
            user = new User({ name, email});
            await user.save();
        }

        // Create booking
        const booking = new Booking({ userId: user._id, classId, date: selectedClass.date });
        await booking.save();

        // Update seat availability
        selectedClass.availableSeats -= 1;
        const response = await selectedClass.save();
        if( response ) {
            const courseDetails = {
                name: selectedClass.courseName,
                price: '$399'
            };
            const paymentDetails = {
                amount: 39900,
                payment_method: 'Credit Card',
                status: 'Paid',
                billing_details: {
                    name: user.name,
                    email: user.email
                }
            };
            const response = await sendEmail(paymentDetails, courseDetails);
            if (response) {
                console.log(response);
                console.log('Email sent successfully');
            } else {
                console.error('Error sending email');
            }

        }

        res.json({ success: true, message: 'Booking confirmed!', bookingId: booking._id });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const getBookingsByEmail = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const bookings = await Booking.find({ userId: user._id }).populate('classId');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};