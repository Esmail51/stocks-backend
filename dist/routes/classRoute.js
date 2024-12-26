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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const classController_1 = require("../controllers/classController");
const classController_2 = require("../controllers/classController");
const router = express_1.default.Router();
router.get('/classes', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, classController_1.getClasses)(req, res, next);
    }
    catch (err) {
        next(err);
    }
}));
router.post('/api/bookings', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, classController_2.createBooking)(req, res);
    }
    catch (err) {
        next(err);
    }
}));
router.get('/api/bookings/:email', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, classController_1.getBookingsByEmail)(req, res);
    }
    catch (err) {
        next(err);
    }
}));
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
    const currentTime = new Date().toISOString();
    console.log(`[${currentTime}] ${req.method} ${req.originalUrl}`);
});
exports.default = router;
