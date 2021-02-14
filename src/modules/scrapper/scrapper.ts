import { utils } from '../../utils/utils';
import { getLatestYear, storeAnimeData } from './scrapperService';
const scrapeIt = require('scrape-it');

//This function likely needs constant maintenance because it is a scrapper, and such
//it needs to change everytime the web source has changed
async function scrapeAnimes(baseURL: string, URL: string, params: string) {
    let scrapeResult = await scrapeIt(baseURL + URL + params, {
        animes: {
            listItem: 'li.card',
            data: {
                title: 'h3.cardName',
                img: {
                    selector: 'a div.crop img',
                    attr: 'data-src'
                },
                description: {
                    selector: 'a',
                    attr: 'title'
                },
                link: {
                    selector: 'a',
                    attr: 'href'
                }
            }
        }
    });
    scrapeResult.data['animes'] = scrapeResult.data['animes'].map(anime => {
        let description = anime['description'].match(/(?<=<p>)(.*?)(?=<\/p>)/);
        const year = anime['description'].match(/(?<=<li class='iconYear'>)(.*?)(?=<\/li>)/);
        const rating = anime['description'].match(/(?<='ttRating'>)(.*?)(?=<\/div>)/);
        let tags = anime['description'].match(/(?<=<h4>Tags<\/h4><ul>)(.*?)(?=<\/ul>)/);
        if (tags) {
            tags = tags[0].match(/(?<=<li>)(.*?)(?=<\/li>)/g);
            anime['tags'] = tags;
        }
        else anime['tags'] = [];
        if (description) {
            description = description[0].replace(/<(.*?)>/g, "");
            anime['description'] = description;
        }
        else anime['description'] = "";
        anime['link'] = anime['link'] ? baseURL + anime['link'] : "";
        anime['year'] = year ? year[0] : "";
        anime['numYear'] = year ? +year[0].split(' ')[0] : 0;
        anime['img'] = anime['img'] ? baseURL + anime['img'] : "";
        anime['rating'] = rating ? rating[0] : '0';
        return anime;
    });
    return scrapeResult.data['animes'];
};

export async function getInformation() {
    const yearLimit = await getLatestYear();
    let animeList = await scrapeAnimes(utils.baseURL, utils.URL, utils.initialSort);
    let page = 2;
    let lastYear = animeList[animeList.length - 1]["year"];
    while (+lastYear.substr(0, 4) >= yearLimit) {
        animeList = animeList.concat(await scrapeAnimes(utils.baseURL, utils.URL, `${utils.initialSort}&page=${page}`));
        lastYear = animeList[animeList.length - 1]["year"];
        page++;
    }
    animeList = animeList.filter(anime => +anime['year'].substr(0, 4) >= yearLimit);
    const results = await storeAnimeData(animeList);
    console.log(new Date(), results);
}
