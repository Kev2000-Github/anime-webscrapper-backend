import { Router } from 'express';
import { animeRouter } from './anime/anime';

const router = Router();

router.use('/', animeRouter);

export { router };