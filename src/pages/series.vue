<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { getSeriesAndEpisodes } from "../api";
import { Episode, Series } from "../api/types";
import CopyLink from "../components/icons/link.vue";
import DownLoad from "../components/icons/download.vue";
import HomeLink from "../components/icons/home.vue";
import NextIcon from "../components/icons/next.vue";

const seriesList = ref<Series[]>([]);
const episodes = ref<Episode[]>([]);
const copiedLink = ref("");
const currentSeason = ref(1);

const series = computed(() => {
  return seriesList.value.find((s) => s.title === useRoute().params.title);
});

const latestSeason = computed(() => {
  return episodes.value.length ? Number(episodes.value[0].season) : 1;
});

const isLast = computed(() => {
  return currentSeason.value >= latestSeason.value;
});

const isFirst = computed(() => {
  return currentSeason.value <= 1;
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

const changeSeason = (next?: boolean) => {
  if (next && isLast.value) return (currentSeason.value = 1);
  if (!next && isFirst.value) return (currentSeason.value = latestSeason.value);
  next ? currentSeason.value++ : currentSeason.value--;
};

onMounted(() => {
  getSeriesAndEpisodes(useRoute().params.title as string).then((result) => {
    seriesList.value = result.series;
    episodes.value = result.episodes;
    const [latestEp] = result.episodes;
    if (!latestEp) return;
    currentSeason.value = Number(latestEp.season);
  });
});
</script>

<template>
  <a :href="series?.url" target="_blank">
    <img :src="series?.image" alt="" class="cursor-pointer rounded-[4px]" />
  </a>
  <div class="text-[#121737] flex items-center justify-between mt-5 border-b pb-3">
    <h2 class="leading-[130%] font-bold flex items-center gap-1">
      <router-link class="hover:text-[#2e5ce5] text-lg" to="/">
        <HomeLink />
      </router-link>
      <span class="text-[14px]">{{
        series?.title.split("Tv Series")[0].trim()
      }}</span>
    </h2>
    <div class="flex items-center justify-between">
      <span @click="changeSeason(false)"
        class="cursor-pointer border text-[1rem] border-[#e7e8eb] bg-[#fff] py-[2px] px-[6px] rounded-[2px] text-gray-500 hover:bg-white hover:text-gray-900">
        <next-icon class="-scale-100" />
      </span>
      <span class="font-bold px-2">Season {{ currentSeason.toString().padStart(2, "0") }}</span>
      <span @click="changeSeason(true)"
        class="cursor-pointer border text-[1rem] border-[#e7e8eb] bg-[#fff] py-[2px] px-[6px] rounded-[2px] text-gray-500 hover:bg-white hover:text-gray-900">
        <next-icon />
      </span>
    </div>
  </div>
  <ul class="flex flex-col gap-4 mt-4">
    <li
      class="flex justify-between items-center bg-white rounded-[4px] border border-transparent hover:border-[#2e5ce5] transition duration-[.4s] shadow-[0_6px_24px_rgba(160,162,175,.1)] hover:shadow-[0_6px_24px_rgba(46,92,229,.1)] px-4 py-2 cursor-pointer"
      v-for="episode in episodes.filter(
        (e) => Number(e.season) === currentSeason
      )" @click="copyLinkToClipboard(episode.url)">
      <div class="font-semibold px-2 leading-[130%]">
        {{ episode.title }}
      </div>
      <div class="py-2 text-gray-500">{{ episode.size }}</div>
      <div class="flex gap-3 justify-center items-center">
        <span class="cursor-pointer relative" @click="copyLinkToClipboard(episode.url)">
          <span
            class="absolute -left-10 -right-10 bottom-5 bg-slate-900 bg-opacity-30 rounded px-2 py-1 text-xs text-center"
            v-if="copiedLink === episode.url">
            Link Copied
          </span>
          <CopyLink />
        </span>
        <a :href="episode.url" download>
          <DownLoad />
        </a>
      </div>
    </li>
  </ul>
</template>../api