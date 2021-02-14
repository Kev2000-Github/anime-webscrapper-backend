"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, "..", "..", ".env") });
exports.corsOptions = {
    origin: process.env.NODE_ENV === 'production'
        ? [/TODO/]
        : [/localhost/],
    credentials: true,
    allowedHeaders: 'Content-Type, user-id, X-Requested-With, Accept',
    methods: 'GET',
    exposedHeaders: 'user-id'
};
