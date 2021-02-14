const Anime = require('../../database/models/anime');

export const getAnimes = async (page: Number, limit: Number) => {
    const options = { page, limit };
    return await Anime.paginate({}, options);
}