import compression from 'compression';
import express from 'express';
import cors from 'cors';
import { router } from './modules/app';
import { corsOptions } from './config/cors.config';
import { getInformation } from './modules/scrapper/scrapper'
import { checkTime, utils } from './utils/utils';
require('dotenv').config();
const { mongoose } = require('./database');

const app = express();

//SETTINGS
app.set("PORT", process.env.PORT || 3000);

//SCRAPPER RUNNING IN INTERVALS
getInformation();
setInterval(checkTime, utils.time, getInformation);

//MIDDLEWARES
if (process.env.NODE_MODE == "development") app.use(require('morgan')("dev"));
app.use(compression());
app.use(cors(corsOptions));
app.use(express.json());
app.use('/', router);
//STATIC FILE

export const server = app.listen(app.get("PORT"), () => console.log(`server up on port ${app.get("PORT")}`))