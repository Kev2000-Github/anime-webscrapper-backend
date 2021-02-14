import mongoose from 'mongoose';
const { Schema } = mongoose;
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
module.exports = mongoose.model('Anime', Anime);