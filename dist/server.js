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
const app_1 = __importDefault(require("./app")); // Assuming this contains your Express app configuration
const db_1 = __importDefault(require("./config/db"));
const cors_1 = __importDefault(require("cors"));
const PORT = process.env.PORT || 5000;
// CORS Configuration
app_1.default.use((0, cors_1.default)({
    origin: ['https://stocks-academy.vercel.app', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
// Start Server
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Connect to the database
        yield (0, db_1.default)();
        console.log('Database connected successfully');
        // Start the Express server
        app_1.default.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('Error starting the server:', error.message);
        process.exit(1); // Exit with failure code
    }
});
// Initialize the server
startServer();
