<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getSeriesList, deleteSeries, Series } from "../chrome/api";
import VisitIcon from "../components/icons/external.vue";
import HomeLink from "../components/icons/home.vue";
import DeleteIcon from "../components/icons/delete.vue";

const seriesList = ref<Series[]>([]);

const onDeleteSeries = (title: string) => {
  seriesList.value = seriesList.value.filter((s) => s.title !== title);
  deleteSeries(title);
};

onMounted(() => getSeriesList().then((list) => (seriesList.value = list)));
</script>

<template>
  <div class="flex items-center justify-between pb-6">
    <div class="flex items-center gap-1">
      <img src="../assets/logo.png" alt="logo" class="w-[1.5rem] h-[1.5rem]" />
      <h1 class="font-extrabold text-[1.5rem] text-center">BINGE FLIX</h1>
    </div>
    <a
      href="http://www.todaytvseries6.com/"
      class="text-[1.5rem] hover:text-[#2e5ce5]"
      ><home-link
    /></a>
  </div>
  <ul class="flex flex-col gap-6">
    <div
      @click.self="$router.push(`/series/${series.title}`)"
      class="bg-white p-4 flex flex-col gap-4 rounded-[4px] border border-transparent hover:border-[#2e5ce5] transition duration-[.4s] shadow-[0_6px_24px_rgba(160,162,175,.1)] hover:shadow-[0_6px_24px_rgba(46,92,229,.1)] relative"
      v-for="series in seriesList"
      :key="series.title"
    >
      <span
        class="text-[16px] opacity-0 hover:opacity-80 transition absolute z-10 top-0 right-0 p-2 bg-[#2e5ce5] rounded-[2px] cursor-pointer"
        @click="onDeleteSeries(series.title)"
      >
        <delete-icon />
      </span>

      <img
        @click="$router.push(`/series/${series.title}`)"
        class="rounded-[2px] cursor-pointer"
        :src="series.image"
        :alt="series.title"
      />
      <div class="flex justify-between items-center">
        <span
          class="font-bold text-[1.2rem] text-[#121737] leading-[16px] cursor-pointer"
          @click="$router.push(`/series/${series.title}`)"
        >
          {{ series.title.split("Tv Series")[0].trim() }}
        </span>
        <a
          :href="series.url"
          target="_blank"
          class="flex items-center text-[#a0a2af] text-[10px] border border-[#e7e8eb] bg-[#f6f6f7] uppercase py-[3px] px-[8px] rounded-[2px] hover:text-[#2e5ce5] hover:border-[#2e5ce5]"
        >
          <span>Visit</span><span><visit-icon /></span>
        </a>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <span
          v-for="genre in series.genres || []"
          class="py-1 px-2 text-[10px] bg-[#ebf3ff] rounded-[2px] text-center text-[#2e5ce5]"
        >
          {{ genre }}
        </span>
      </div>
    </div>
  </ul>
</template>
