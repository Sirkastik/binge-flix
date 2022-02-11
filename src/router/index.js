import { createRouter, createWebHistory } from "vue-router";
import Home from "../popup/views/Home.vue";

const routes = [
	{
		path: "/popup.html",
		name: "Home",
		component: Home,
	},
	{
		path: "/series/:name",
		name: "Series",
		// route level code-splitting
		// this generates a separate chunk (series.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "series" */ "../popup/views/Series.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
