export const utils = {
    baseURL: "https://www.anime-planet.com",
    URL: "/anime/all",
    initialSort: "?sort=year&order=desc",
    time: 60000 * 60 * 24,
}

export function checkTime(executeFun) {
    const currentDay = new Date().getDate();
    if (currentDay == 1) executeFun();
}
