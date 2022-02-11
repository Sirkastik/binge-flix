<template>
	<div class="series">
		<div class="top">
			<div class="left">
				<span class="back" @click="$router.push('/popup.html')">
					<back-icon />
				</span>
				<h1>{{ title }}</h1>
			</div>
			<div class="change">
				<span class="prev" @click="prev">
					<left-caret-icon />
				</span>
				<span class="currentSn">Sn 0{{ currentSn }}</span>
				<span class="next" @click="next">
					<right-caret-icon />
				</span>
			</div>
		</div>
		<div class="episodes">
			<a
				:href="episode.link"
				:download="name + '.' + episode.name + '.rar'"
				v-for="episode of currentList"
				class="episode"
				:key="episode.name"
			>
				<span class="name">
					<span> <film-icon /> </span>
					<span>{{ episode.name }}</span>
				</span>
				<span>{{ episode.size }}</span>
				<span class="btn"><download-icon /></span>
			</a>
		</div>
	</div>
</template>

<script>
import BackIcon from "./icons/BackIcon.vue";
import LeftCaretIcon from "./icons/LeftCaretIcon.vue";
import RightCaretIcon from "./icons/RightCaretIcon.vue";
import FilmIcon from "./icons/FilmIcon.vue";
import DownloadIcon from "./icons/DownloadIcon.vue";
export default {
	components: {
		BackIcon,
		LeftCaretIcon,
		RightCaretIcon,
		FilmIcon,
		DownloadIcon,
	},
	data() {
		return {
			episodes: [],
			currentSn: 1,
		};
	},

	computed: {
		title() {
			return this.$route.params.name;
		},
		name() {
			return this.title.replaceAll(" ", ".");
		},
		currentList() {
			return this.episodes.filter(
				(episode) => episode.name[2] === `${this.currentSn}`
			);
		},
	},

	created() {
		let episodes = localStorage.getItem(this.title);
		this.episodes = JSON.parse(episodes);
		this.currentSn = parseInt(this.episodes[0].name[2]);
	},

	methods: {
		prev() {
			this.currentSn =
				this.currentSn === 1
					? parseInt(this.episodes[0].name[2])
					: this.currentSn - 1;
		},
		next() {
			this.currentSn =
				this.currentSn === parseInt(this.episodes[0].name[2])
					? 1
					: this.currentSn + 1;
		},
	},
};
</script>

<style scoped>
.top {
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	padding: 0.75rem 1rem;
	border-bottom: 1px solid var(--gray);
}

h1 {
	font-weight: bold;
	text-transform: uppercase;
	letter-spacing: 1px;
	font-size: 1.25em;
}

.left {
	display: flex;
	align-items: center;
	gap: 1rem;
}

.back {
	font-size: 1.15em;
}

.currentSn {
	font-family: Bethania, Alfa Slab One, serif;
	font-size: 1.25em;
	font-weight: bold;
}

.change {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	padding-right: 0.5rem;
	font-size: 1.15em;
}

.back:hover,
.prev:hover,
.next:hover {
	cursor: pointer;
	transform: scale(1.3);
	filter: drop-shadow(0px 0px 3px currentColor);
}

.episodes {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	padding: 1rem;
}

.episode {
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	border-bottom: 1px solid var(--gray);
	padding-left: 0.75rem;
	border-radius: 3px;
	cursor: pointer;
}

.episode:hover {
	color: var(--accent);
	border-color: var(--accent);
	filter: drop-shadow(0px 0px 2px currentColor);
	transition: 0.25s ease-in;
}

.name {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

.btn {
	border: 1px solid var(--gray);
	border-bottom: none;
	padding: 0.75rem;
	border-radius: 3px;
}

.episode:hover .btn {
	color: var(--accent);
	border-color: var(--accent);
	transition: 0.25s ease-in-out;
}
</style>
