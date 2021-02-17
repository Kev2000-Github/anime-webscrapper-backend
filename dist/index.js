"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const compression_1 = __importDefault(require("compression"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app_1 = require("./modules/app");
const cors_config_1 = require("./config/cors.config");
const scrapper_1 = require("./modules/scrapper/scrapper");
const utils_1 = require("./utils/utils");
require('dotenv').config();
const { mongoose } = require('./database');
const app = express_1.default();
//SETTINGS
app.set("PORT", process.env.PORT || 3000);
//SCRAPPER RUNNING IN INTERVALS
scrapper_1.getInformation();
setInterval(utils_1.checkTime, utils_1.utils.time, scrapper_1.getInformation);
//MIDDLEWARES
if (process.env.NODE_MODE == "development")
    app.use(require('morgan')("dev"));
app.use(compression_1.default());
app.use(cors_1.default(cors_config_1.corsOptions));
app.use(express_1.default.json());
app.use('/', app_1.router);
//STATIC FILE
exports.server = app.listen(app.get("PORT"), () => console.log(`server up on port ${app.get("PORT")}`));
