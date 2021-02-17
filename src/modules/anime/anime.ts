import express from 'express';
import { getAnimes } from './animeService';
const router = express.Router();

router.get('/anime', async (req, res) => {
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
    const animes = await getAnimes(numPage, numLimit, excludeArr, includeArr, sortBy);
    res.json(animes);
})

export { router as animeRouter };