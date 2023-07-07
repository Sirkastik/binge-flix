window.addEventListener("DOMContentLoaded", async () => {
  const series = scrapeSeriesInfo();
  const episodes = scrapeEpisodes();

  const SERIES_LIST_STORAGE_KEY = "TODAY_TV_SERIES_LIST";
  const SERIES_EPISODES_STORAGE_KEY = `TTS_${series.title}_EPISODES`;

  chrome.storage.local.get([SERIES_LIST_STORAGE_KEY], (result) => {
    const storedSeriesList = JSON.parse(
      result[SERIES_LIST_STORAGE_KEY] || "[]"
    );
    const filteredList = storedSeriesList.filter(
      (s) => s.title !== series.title
    );

    chrome.storage.local.set({
      [SERIES_LIST_STORAGE_KEY]: stringed([series, ...filteredList]),
      [SERIES_EPISODES_STORAGE_KEY]: stringed(episodes),
    });
  });
});

function scrapeSeriesInfo() {
  const title = select(document).find(".uk-article-title").text();
  const image = select(document).find(".imageseries1 img").src();
  const url = window.location.href;
  const genres = select(document)
    .find(".row1.footer")
    .find(".cell1")
    .text()
    .split("|")
    .map((g) => g.trim());
  return { title, url, image, genres };
}

function scrapeEpisodes() {
  return select(document)
    .all(".row2.footer")
    .map((e, index) => {
      return {
        number: index + 1,
        title: e.find(".cell2").content(),
        size: e.find(".cell3").content(),
        url: e.find(".cell4 a").href(),
      };
    });
}

function select(element = {}) {
  return {
    all: (selector) => [...element.querySelectorAll(selector)].map(select),
    find: (selector) => select(element.querySelector(selector)),
    text: () => element.innerText,
    content: () => element.textContent,
    src: () => element.src,
    href: () => element.href,
  };
}

function stringed(value) {
  return JSON.stringify(value);
}
