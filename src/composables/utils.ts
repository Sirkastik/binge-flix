export const useSeriesKey = () => "TODAY_TV_SERIES_LIST" as const;

export const useEpisodeKey = (title: string) =>
  `TTS_${title}_EPISODES` as const;

export const useParse = <T>(str: string, fallback: T) => {
  try {
    if (!str) throw new Error();
    return JSON.parse(str) as T;
  } catch (error) {
    return fallback;
  }
};

export const useStringify = <T>(value: T) => JSON.stringify(value);
