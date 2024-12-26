"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Class = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const classSchema = new mongoose_1.default.Schema({
    courseName: String, // 'Intro to Stock Investing' or 'Options In
    date: Date,
    startTime: String,
    endTime: String,
    maxSeats: Number,
    type: String,
    availableSeats: Number,
});
exports.Class = mongoose_1.default.model('Class', classSchema);
