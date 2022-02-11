<template>
	<div>
		<app-header></app-header>
		<app-main></app-main>
	</div>
</template>

<script>
import AppHeader from "../../components/AppHeader.vue";
import AppMain from "../../components/AppMain.vue";
export default {
	components: { AppHeader, AppMain },
};
</script>
