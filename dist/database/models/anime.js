"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const mongosoePaginate = require('mongoose-paginate-v2');
const Anime = new Schema({
    title: { type: String, required: true },
    img: { type: String, required: true },
    description: { type: String, required: false },
    link: { type: String, required: true },
    year: { type: String, required: true },
    numYear: { type: Number, required: true },
    rating: { type: String, required: true },
    tags: { type: Array, required: true }
});
Anime.plugin(mongosoePaginate);
module.exports = mongoose_1.default.model('Anime', Anime);
