<template>
	<div class="header">
		<div class="logo">
			<img :src="link" alt="logo" />
		</div>
		<h1>Binge Flix</h1>
		<div class="mode" @click="switchMode">
			<span class="dark" :class="{ hidden: mode === 'dark' }">
				<dark-mode-icon />
			</span>
			<span class="light" :class="{ hidden: mode === 'light' }">
				<light-mode-icon />
			</span>
		</div>
	</div>
</template>

<script>
import LightModeIcon from "./icons/LightModeIcon.vue";
import DarkModeIcon from "./icons/DarkModeIcon.vue";
export default {
	components: { LightModeIcon, DarkModeIcon },
	
	computed: {
		mode() {
			return document.body.className;
		},
		logo() {
			return this.mode === "light" ? "logo" : "logo-white";
		},
		link() {
			return require(`@/assets/${this.logo}.png`);
		},
	},
	methods: {
		switchMode() {
			const mode = document.body.className;
			if (mode === "light") {
				document.body.classList.replace("light", "dark");
				this.btn(mode).classList.remove("hidden");
				this.btn(mode).previousSibling.classList.add("hidden");
			} else {
				document.body.classList.replace("dark", "light");
				this.btn(mode).classList.remove("hidden");
				this.btn(mode).nextSibling.classList.add("hidden");
			}
		},
		btn(mode) {
			return document.querySelector(`span.${mode}`);
		},
	},
};
</script>

<style scoped>
.header {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	padding: 0.7rem;
	background: var(--bg);
	color: var(--color);
	border-bottom: 1px solid var(--gray);
}

.logo {
	height: 22px;
	width: 30px;
}

h1 {
	font-family: Bethania, Alfa Slab One, serif;
	user-select: none;
	font-size: 2.5em;

	/* letter-spacing: 2px; */
	/* font-weight: bold; */
	/* text-transform: uppercase; */
}

.mode {
	cursor: pointer;
	font-size: 1.5em;
	margin-left: auto;
	padding: 0 0.5rem;
}

.hidden {
	display: none;
}
</style>
