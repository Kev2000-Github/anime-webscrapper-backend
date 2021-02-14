const Anime = require('../../database/models/anime');

export const getAnimes = async (page: Number, limit: Number, exclude: Array<String> = [], include: Array<String> = []) => {
    const options = { page, limit };
    let query = { tags: {} };
    if (exclude.length > 0) query['tags']["$not"] = { $in: exclude };
    if (include.length > 0) query['tags']["$in"] = include;
    console.log(query);
    return await Anime.paginate(query, options);
}