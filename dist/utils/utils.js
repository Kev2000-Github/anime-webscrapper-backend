"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTime = exports.utils = void 0;
exports.utils = {
    baseURL: "https://www.anime-planet.com",
    URL: "/anime/all",
    initialSort: "?sort=year&order=desc",
    time: 60000 * 60 * 24,
};
function checkTime(executeFun) {
    const currentDay = new Date().getDate();
    if (currentDay == 1)
        executeFun();
}
exports.checkTime = checkTime;
