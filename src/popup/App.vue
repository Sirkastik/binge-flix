<template>
	<router-view />
</template>

<script>
export default {
	created() {
		document.body.classList.add("dark");
	},
};
</script>

<style>
/* Remove all the styles of the "User-Agent-Stylesheet", except for the 'display' property */
*:where(:not(iframe, canvas, img, svg, video):not(svg *)) {
	all: unset;
	display: revert;
}

/* Preferred box-sizing value */
*,
*::before,
*::after {
	box-sizing: border-box;
}

/*
  Remove list styles (bullets/numbers)
  in case you use it with normalize.css
*/
ol,
ul {
	list-style: none;
}

/* For images to not be able to exceed their container */
img {
	max-width: 100%;
}

/* Removes spacing between cells in tables */
table {
	border-collapse: collapse;
}

/* Revert the 'white-space' property for textarea elements on Safari */
textarea {
	white-space: revert;
}
/* End of CSS reset */

::-webkit-scrollbar {
	opacity: 0;
	width: 0.2em;
	height: 0;
}

::-webkit-scrollbar-thumb {
	border-radius: 100vw;
	background-color: var(--gray);
}

html {
	width: 350px;
	height: 500px;
}

body {
	background: var(--bg);
	color: var(--color);
	font-family: Josefin Sans, Itim, Ink Free, Fauna One, Delius, Arcon,
		Andika New Basic, Anivers, Avenir LT Std, sans-serif;
}

body.dark {
	--bg: #020925;
	--gray: #bababb;
	--accent: #49d0eebf;
	--color: #fff;
}

body.light {
	--bg: #fff;
	--gray: #bababb;
	--accent: #66d4ff8f;
	--color: #020925;
}
</style>
