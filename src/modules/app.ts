import { Router } from 'express';
import { animeRouter } from './anime/anime';

const router = Router();
router.get('/', (req, res) => res.send("Home"));
router.use('/', animeRouter);

export { router };