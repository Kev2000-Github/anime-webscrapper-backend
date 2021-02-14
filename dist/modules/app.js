"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const anime_1 = require("./anime/anime");
const router = express_1.Router();
exports.router = router;
router.get('/', (req, res) => res.send("Home"));
router.use('/', anime_1.animeRouter);
