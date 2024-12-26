import express from 'express';
import { createClass, getBookingsByEmail, getClasses } from "../controllers/classController";
import { createBooking } from "../controllers/classController";

const router = express.Router();

router.get('/classes', async (req, res, next) => {
    try {
        await getClasses(req, res, next);
    } catch (err) {
        next(err);
    }
});
router.post('/bookings', async (req, res, next) => {
    try {
        await createBooking(req, res);
    } catch (err) {
        next(err);
    }
});

router.get('/bookings/:email', async (req, res, next) => {
    try {
        await getBookingsByEmail(req, res);
    } catch (err) {
        next(err);
    }
});
router.post('/classes', async (req, res, next) => {
    try {
        await createClass(req, res);
    } catch (err) {
        next(err);
    }
});

router.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
    const currentTime = new Date().toISOString();
    console.log(`[${currentTime}] ${req.method} ${req.originalUrl}`);
});

export default router;



