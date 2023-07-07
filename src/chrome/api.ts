import { jsonParse } from "../utils";

export type Series = {
  title: string;
  url: string;
  image: string;
  genres: string[];
};

export type Episode = {
  number: number;
  title: string;
  size: string;
  url: string;
  season: string;
};

type SeriesAndEpisodes = {
  series: Series[];
  episodes: Episode[];
};

const SERIES_LIST_STORAGE_KEY = "TODAY_TV_SERIES_LIST";

const getEpisodeKey = (title: string) => `TTS_${title}_EPISODES`;

export const deleteSeries = (title: string) => {
  chrome.storage.local.get([SERIES_LIST_STORAGE_KEY], (result) => {
    const seriesList = jsonParse<Series[]>(result[SERIES_LIST_STORAGE_KEY], []);
    const filteredList = seriesList.filter((s) => s.title !== title);
    chrome.storage.local.set({
      [SERIES_LIST_STORAGE_KEY]: JSON.stringify(filteredList),
    });
  });
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
): Promise<SeriesAndEpisodes> => {
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
