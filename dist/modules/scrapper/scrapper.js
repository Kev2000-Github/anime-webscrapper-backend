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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInformation = void 0;
const utils_1 = require("../../utils/utils");
const scrapperService_1 = require("./scrapperService");
const scrapeIt = require('scrape-it');
//This function likely needs constant maintenance because it is a scrapper, and such
//it needs to change everytime the web source has changed
function scrapeAnimes(baseURL, URL, params) {
    return __awaiter(this, void 0, void 0, function* () {
        let scrapeResult = yield scrapeIt(baseURL + URL + params, {
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
            else
                anime['tags'] = [];
            if (description) {
                description = description[0].replace(/<(.*?)>/g, "");
                anime['description'] = description;
            }
            else
                anime['description'] = "";
            anime['link'] = anime['link'] ? baseURL + anime['link'] : "";
            anime['year'] = year ? year[0] : "";
            anime['numYear'] = year ? +year[0].split(' ')[0] : 0;
            anime['img'] = anime['img'] ? baseURL + anime['img'] : "";
            anime['rating'] = rating ? rating[0] : '0';
            return anime;
        });
        return scrapeResult.data['animes'];
    });
}
;
function getInformation() {
    return __awaiter(this, void 0, void 0, function* () {
        const yearLimit = yield scrapperService_1.getLatestYear();
        let animeList = yield scrapeAnimes(utils_1.utils.baseURL, utils_1.utils.URL, utils_1.utils.initialSort);
        let page = 2;
        let lastYear = animeList[animeList.length - 1]["year"];
        while (+lastYear.substr(0, 4) >= yearLimit) {
            animeList = animeList.concat(yield scrapeAnimes(utils_1.utils.baseURL, utils_1.utils.URL, `${utils_1.utils.initialSort}&page=${page}`));
            lastYear = animeList[animeList.length - 1]["year"];
            page++;
        }
        animeList = animeList.filter(anime => +anime['year'].substr(0, 4) >= yearLimit);
        const results = yield scrapperService_1.storeAnimeData(animeList);
        console.log(new Date(), "number of animes added: ", results.length);
    });
}
exports.getInformation = getInformation;
