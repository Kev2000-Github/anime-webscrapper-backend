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
exports.getAnimes = void 0;
const Anime = require('../../database/models/anime');
const getAnimes = (page, limit, exclude = [], include = []) => __awaiter(void 0, void 0, void 0, function* () {
    const options = { page, limit };
    let query = {};
    if (exclude.length + include.length > 0) {
        query["tags"] = {};
        if (exclude.length > 0)
            query['tags']["$not"] = { $in: exclude };
        if (include.length > 0)
            query['tags']["$in"] = include;
    }
    return yield Anime.paginate(query, options);
});
exports.getAnimes = getAnimes;
