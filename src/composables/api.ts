export const useLibrary = () => {
  const list = ref<Series[]>([]);

  const upsertSeries = (series: Series, episodes: Episode[]) => {
    getList((list) => {
      const filteredList = list.filter((s) => s.title !== series.title);

      chrome.storage.local.set({
        [useSeriesKey()]: useStringify([series, ...filteredList]),
        [useEpisodeKey(series.title)]: useStringify(episodes),
      });
    });
  };

  const deleteSeries = (title: string) => {
    list.value = list.value.filter((s) => s.title !== title);
    chrome.storage.local.set({
      [useSeriesKey()]: useStringify(list.value),
    });
  };

  const getList = (onFetch?: (list: Series[]) => void) => {
    chrome.storage.local.get([useSeriesKey()], (result) => {
      list.value = useParse(result[useSeriesKey()], list.value);
      onFetch && onFetch(list.value);
    });
  };

  const getEpisodes = async (title: string): Promise<Episode[]> => {
    return new Promise((resolve) => {
      chrome.storage.local.get([useEpisodeKey(title)], (result) => {
        const episodes = useParse<Episode[]>(result[useEpisodeKey(title)], []);
        resolve(episodes);
      });
    });
  };

  return {
    list,
    upsertSeries,
    deleteSeries,
    getList,
    getEpisodes,
  };
};
