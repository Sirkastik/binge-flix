<template>
	<div class="show" @click="$router.push(`/series/${show.title}`)">
		<div class="left">
			<span>
				<tv-icon />
			</span>
			<span>{{ show.title }}</span>
		</div>
		<div class="right">
			<a :href="show.link" target="_blank">
				<external-link-icon />
			</a>
			<span class="delBtn" @click.stop="handleDel">
				<trash-icon />
			</span>
		</div>
	</div>
</template>

<script>
import TvIcon from "./icons/TvIcon.vue";
import ExternalLinkIcon from "./icons/ExternalLinkIcon.vue";
import TrashIcon from "./icons/TrashIcon.vue";
export default {
	props: ["show"],

	components: { TvIcon, ExternalLinkIcon, TrashIcon },

	created() {},

	methods: {
		handleDel() {
			// *Get user's series from localStorage and convert to array
			const text = localStorage.getItem("series");
			let seriesArray = JSON.parse(text);
			seriesArray = seriesArray.filter(
				(series) => series.title !== this.show.title
			);
			localStorage.removeItem(`${this.show.title}`);
			this.$emit("delShow");
			// *Update the series list from localStorage
			const titles = JSON.stringify(seriesArray);
			localStorage.setItem("series", titles);
		},
	},
};
</script>

<style scoped>
.show {
	padding: 1rem;
	cursor: pointer;

	display: flex;
	justify-content: space-between;
}

.show:hover {
	background: var(--accent);
	transition: 0.25s ease-in;
}

.left,
.right {
	display: flex;
	gap: 1rem;
	align-items: center;
	text-transform: uppercase;
	letter-spacing: 1px;
	font-size: 0.9em;
	font-weight: bold;
}

.left {
	font-size: 0.8em;
}

.delBtn:hover {
	transform: scale(1.2);
	transition: 0.25s ease-in-out;
}
</style>
