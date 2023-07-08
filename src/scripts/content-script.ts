import { upsertSeries } from "../api";
import { Series, Episode } from "../api/types"

window.addEventListener("DOMContentLoaded", async () => {
  const series: Series = scrapeSeriesInfo();
  const episodes: Episode[] = scrapeEpisodes();
  upsertSeries(series, episodes)
});

function scrapeSeriesInfo() {
  const title = select(body()).find(".uk-article-title").text();
  const image = select(body()).find(".imageseries1 img").src();
  const url = window.location.href;
  const genres = select(body())
    .find(".row1.footer")
    .find(".cell1")
    .text()
    .split("|")
    .map((g) => g.trim());
  return { title, url, image, genres };
}

function scrapeEpisodes() {
  return select(body())
    .all(".uk-accordion-title")
    .map((sn) => {
      return sn
        .next()
        .all(".row2.footer")
        .map((e, index) => {
          return {
            number: index + 1,
            title: e.find(".cell2").content(),
            size: e.find(".cell3").content(),
            url: e.find(".cell4 a").href(),
            season: sn.text().replace("Download Season ", ""),
          };
        });
    })
    .flat();
}

function select(element: Element) {
  return {
    all: (selector: string) => [...element.querySelectorAll(selector)].map(select),
    find: (selector: string) => select(element.querySelector(selector)!),
    next: () => select(element.nextElementSibling!),
    text: () => (element as HTMLElement).innerText,
    content: () => element.textContent || '',
    src: () => (element as HTMLImageElement).src,
    href: () => (element as HTMLAnchorElement).href,
  };
}

function body() {
  return document.body
}
