"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoose = void 0;
const mongoose = require('mongoose');
exports.mongoose = mongoose;
const URI = "mongodb://localhost/animeDB";
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('the database is up and working'))
    .catch(err => console.log(err));
