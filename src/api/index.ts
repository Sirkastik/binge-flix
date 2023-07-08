import { SERIES_LIST_STORAGE_KEY } from "./constants";
import { Episode, Series } from "./types";
import { getEpisodeKey, jsonParse, stringified } from "./utils";


export const upsertSeries = (series: Series, episodes: Episode[]) => {
    getSeriesList().then((storedSeriesList) => {
        const filteredList = storedSeriesList.filter(
            (s) => s.title !== series.title
        );

        chrome.storage.local.set({
            [SERIES_LIST_STORAGE_KEY]: stringified([series, ...filteredList]),
            [getEpisodeKey(series.title)]: stringified(episodes),
        });
    })
}

export const deleteSeries = (title: string): Promise<Series[]> => {
    return new Promise((resolve) => {
        chrome.storage.local.get([SERIES_LIST_STORAGE_KEY], (result) => {
            const seriesList = jsonParse<Series[]>(result[SERIES_LIST_STORAGE_KEY], []);
            const filteredList = seriesList.filter((s) => s.title !== title);
            chrome.storage.local.set({
                [SERIES_LIST_STORAGE_KEY]: stringified(filteredList),
            });
            resolve(filteredList)
        });
    })
};

export const getSeriesList = async (): Promise<Series[]> => {
    return new Promise((resolve) => {
        chrome.storage.local.get([SERIES_LIST_STORAGE_KEY], (result) => {
            resolve(jsonParse(result[SERIES_LIST_STORAGE_KEY], []));
        });
    });
};

export const getSeriesAndEpisodes = async (
    title: string
): Promise<{ series: Series[], episodes: Episode[] }> => {
    return new Promise((resolve) => {
        chrome.storage.local.get(
            [SERIES_LIST_STORAGE_KEY, getEpisodeKey(title)],
            (result) => {
                resolve({
                    series: jsonParse(result[SERIES_LIST_STORAGE_KEY], []),
                    episodes: jsonParse(result[getEpisodeKey(title)], []),
                });
            }
        );
    });
};