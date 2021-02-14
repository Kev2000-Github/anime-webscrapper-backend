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
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeAnimeData = exports.getLatestYear = void 0;
const Anime = require('../../database/models/anime');
const getLatestYear = () => __awaiter(void 0, void 0, void 0, function* () {
    let lastYearRow = yield Anime.find({}).sort([['numyear', -1]]).limit(1);
    return lastYearRow.length > 0 ? lastYearRow[0]['numYear'] : 2020;
});
exports.getLatestYear = getLatestYear;
const storeAnimeData = (animes) => __awaiter(void 0, void 0, void 0, function* () {
    let foundAnimes = yield Anime.find({ title: { $in: animes.map(anime => anime.title) } }, '-_id title');
    foundAnimes = foundAnimes.map(anime => anime.title);
    const newAnimes = animes.filter(anime => !foundAnimes.includes(anime.title));
    const results = yield Promise.all(newAnimes.map(({ title, img, description, link, tags, year, numYear, rating }) => __awaiter(void 0, void 0, void 0, function* () {
        const insertAnime = new Anime({ title, img, description, link, tags, rating, numYear, year });
        yield insertAnime.save();
        return true;
    })));
    return newAnimes.map((anime, index) => ({ [anime.title]: results[index] }));
});
exports.storeAnimeData = storeAnimeData;
