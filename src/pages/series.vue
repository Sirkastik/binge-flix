<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { getSeriesAndEpisodes, Series, Episode } from "../chrome/api";
import CopyLink from "../components/icons/link.vue";
import DownLoad from "../components/icons/download.vue";
import HomeLink from "../components/icons/home.vue";

const seriesList = ref<Series[]>([]);
const episodes = ref<Episode[]>([]);
const copiedLink = ref("");

const series = computed(() => {
  return seriesList.value.find((s) => s.title === useRoute().params.title);
});

const copyLinkToClipboard = (url: string) => {
  const el = document.createElement("textarea");
  el.value = url;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  copiedLink.value = url;
  setTimeout(() => {
    copiedLink.value = "";
  }, 2000);
};

const visit = (url: string) => window.open(url, "_blank");

onMounted(() => {
  getSeriesAndEpisodes(useRoute().params.title as string).then((result) => {
    seriesList.value = result.series;
    episodes.value = result.episodes;
  });
});
</script>

<template>
  <a :href="series?.url" target="_blank">
    <img :src="series?.image" alt="" class="cursor-pointer rounded-[4px]" />
  </a>
  <div
    class="text-xl text-[#121737] flex items-center justify-between mt-5 border-b pb-3"
  >
    <h2 class="leading-[130%]">
      {{ series?.title.split("Tv Series")[0].trim() }}
    </h2>
    <router-link class="hover:text-[#2e5ce5] text-2xl" to="/">
      <HomeLink />
    </router-link>
  </div>
  <ul class="flex flex-col gap-4 mt-4">
    <li
      class="flex justify-between items-center bg-white rounded-[4px] border border-transparent hover:border-[#2e5ce5] transition duration-[.4s] shadow-[0_6px_24px_rgba(160,162,175,.1)] hover:shadow-[0_6px_24px_rgba(46,92,229,.1)] px-4 py-2 cursor-pointer"
      v-for="episode in episodes"
      @click="copyLinkToClipboard(episode.url)"
    >
      <div class="title font-semibold px-2 leading-[130%]">
        {{ episode.title }}
      </div>
      <div class="description py-2 text-gray-500">{{ episode.size }}</div>
      <div class="downloads flex gap-3 justify-center items-center">
        <span
          class="cursor-pointer relative"
          @click="copyLinkToClipboard(episode.url)"
        >
          <span
            class="absolute -left-10 -right-10 bottom-5 bg-slate-900 bg-opacity-30 rounded px-2 py-1 text-xs text-center"
            v-if="copiedLink === episode.url"
          >
            Link Copied
          </span>
          <CopyLink />
        </span>
        <a :href="episode.url" download><DownLoad /></a>
      </div>
    </li>
  </ul>
</template>
