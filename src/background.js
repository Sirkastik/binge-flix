browser.runtime.onMessage.addListener((request, _s, _sR) => {
	if (request.type === "data") {
		// *Get new series sent from webpage
		let series = request.data;
		let metadata = series.metadata;
		let episodes = series.episodes
		// *Get user's series from localStorage and convert to array
		const text = localStorage.getItem("series");
		let seriesArray = text ? JSON.parse(text) : [metadata];
		// *Add the series to series list if it doesn't exist
		if (text && !seriesArray.some((series) => series.title === metadata.title))
			seriesArray.push(metadata);
		// *Update localStorage with series sent from webpage
		let episodesAsStr = JSON.stringify(episodes);
		localStorage.setItem(metadata.title, episodesAsStr);
		// *Update the series list from localStorage
		const titles = JSON.stringify(seriesArray);
		localStorage.setItem("series", titles);
	}
});
