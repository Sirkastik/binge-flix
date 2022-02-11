/* eslint-disable no-unused-vars */
window.addEventListener("DOMContentLoaded", () => {
	const metadata = getMetaDataFROMDOM(".row1.footer");

	const episodes = getEpisodesFromDOM(".row2.footer");

	browser.runtime.sendMessage({ type: "data", data: { metadata, episodes } });
});

const $ = (selector) => {
	return document.querySelector(selector);
};

const getMetaDataFROMDOM = (selector) => {
	return {
		title: $(".uk-article-title").innerText,
		link: window.location.href,
		description: $(".size-1.extravote").nextSibling.innerText,
		photoUrl: $(".imageseries1 img").src,
		genres: $(selector).childNodes[0].innerText,
	};
};

const getEpisodesFromDOM = (selector) => {
	let episodes = [];
	const episodesList = document.querySelectorAll(selector);
	episodesList.forEach((episodeNode, index) => {
		let episode = {
			index: index,
			name: episodeNode.childNodes[0].textContent,
			size: episodeNode.childNodes[1].textContent,
			link: episodeNode.childNodes[2].firstChild.href,
		};
		episodes.push(episode);
	});
	return episodes;
};
