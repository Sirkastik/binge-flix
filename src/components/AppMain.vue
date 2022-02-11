<template>
	<div class="main">
		<div class="series">
			<tv-show
				@delShow="fetchShows"
				v-for="(show, index) of series"
				:key="index"
				:show="show"
			></tv-show>
		</div>
	</div>
</template>

<script>
import TvShow from "./Tv-Show.vue";
export default {
	components: { TvShow },
	data() {
		return {
			series: [],
		};
	},
	created() {
		this.fetchShows();
	},
	methods: {
		fetchShows() {
			const text = localStorage.getItem("series");
			this.series = JSON.parse(text).reverse();
		},
	},
};
</script>

<style scoped>
.main {
	/* padding: 1rem; */
	text-align: center;
	font-size: 14px;
}

.series {
	display: flex;
	flex-direction: column;
}
</style>
