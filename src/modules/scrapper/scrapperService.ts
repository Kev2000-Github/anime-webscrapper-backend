const Anime = require('../../database/models/anime');

export const getLatestYear = async () => {
    let lastYearRow = await Anime.find({}).sort([['numyear', -1]]).limit(1);
    return lastYearRow.length > 0 ? lastYearRow[0]['numYear'] : 2020;
}

export const storeAnimeData = async (animes) => {
    let foundAnimes = await Anime.find({ title: { $in: animes.map(anime => anime.title) } }, '-_id title');
    foundAnimes = foundAnimes.map(anime => anime.title);
    const newAnimes = animes.filter(anime => !foundAnimes.includes(anime.title));
    const results = await Promise.all(newAnimes.map(async ({ title, img, description, link, tags, year, numYear, rating }) => {
        const insertAnime = new Anime({ title, img, description, link, tags, rating, numYear, year });
        await insertAnime.save();
        return true;
    }));
    return newAnimes.map((anime, index) => ({ [anime.title]: results[index] }));
}   