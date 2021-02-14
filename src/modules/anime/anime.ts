import express from 'express';
import { getAnimes } from './animeService';
const router = express.Router();

router.get('/anime', async (req, res) => {
    let { page, limit } = req.query;
    let numPage = page ? +page : 1;
    let numLimit = limit ? +limit : 30;
    const animes = await getAnimes(numPage, numLimit);
    res.json(animes);
})

export { router as animeRouter };