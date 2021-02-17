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
exports.animeRouter = void 0;
const express_1 = __importDefault(require("express"));
const animeService_1 = require("./animeService");
const router = express_1.default.Router();
exports.animeRouter = router;
router.get('/anime', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { page, limit, exclude, include, sort } = req.query;
    let numPage = page ? +page : 1;
    let numLimit = limit ? +limit : 30;
    let sortBy = sort == "true" ? "-1" : null;
    function processQuery(query) {
        query = query ? query.toString().replace(/_/g, " ") : undefined;
        let queryArr = query ? query.split('-') : undefined;
        return queryArr;
    }
    let excludeArr = processQuery(exclude);
    let includeArr = processQuery(include);
    const animes = yield animeService_1.getAnimes(numPage, numLimit, excludeArr, includeArr, sortBy);
    res.json(animes);
}));
