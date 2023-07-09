<script setup lang="ts">
const library = useLibrary();

const episodes = ref<Episode[]>([]);
const copiedLink = ref("");
const currentSeason = ref(1);

const series = computed(() => {
  return library.list.value.find((s) => s.title === useRoute().params.title);
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
  if (!url) return;
  const el = document.createElement("textarea");
  el.value = url;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  copiedLink.value = url;
  setTimeout(() => (copiedLink.value = ""), 2000);
};

const changeSeason = (next?: boolean) => {
  if (next && isLast.value) return (currentSeason.value = 1);
  if (!next && isFirst.value) return (currentSeason.value = latestSeason.value);
  next ? currentSeason.value++ : currentSeason.value--;
};

onMounted(() => {
  library.getList();
  library.getEpisodes(useRoute().params.title as string).then((result) => {
    episodes.value = result;
    if (!result.length) return;
    currentSeason.value = Number(result[0].season);
  });
});

watch(copiedLink, copyLinkToClipboard);
</script>

<template>
  <a :href="series?.url" target="_blank">
    <img :src="series?.image" alt="" class="cursor-pointer rounded-[4px]" />
  </a>
  <div
    class="text-[#121737] flex items-center justify-between mt-5 border-b pb-3"
  >
    <h2 class="leading-[130%] font-bold flex items-center gap-1">
      <router-link class="hover:text-[#2e5ce5] text-lg" to="/">
        <icon-home />
      </router-link>
      <span class="text-[14px]">
        {{ series?.title.split("Tv Series")[0].trim() }}
      </span>
    </h2>
    <div class="flex items-center justify-between">
      <span
        @click="changeSeason(false)"
        class="cursor-pointer border text-[1rem] border-[#e7e8eb] bg-[#fff] py-[2px] px-[6px] rounded-[2px] text-gray-500 hover:bg-white hover:text-gray-900"
      >
        <icon-next class="-scale-100" />
      </span>
      <span class="font-bold px-2"
        >Season {{ currentSeason.toString().padStart(2, "0") }}</span
      >
      <span
        @click="changeSeason(true)"
        class="cursor-pointer border text-[1rem] border-[#e7e8eb] bg-[#fff] py-[2px] px-[6px] rounded-[2px] text-gray-500 hover:bg-white hover:text-gray-900"
      >
        <icon-next />
      </span>
    </div>
  </div>
  <ul class="flex flex-col gap-4 mt-4">
    <episode-item
      @click="copyLinkToClipboard(episode.url)"
      class="flex justify-between items-center bg-white rounded-[4px] border border-transparent hover:border-[#2e5ce5] transition duration-[.4s] shadow-[0_6px_24px_rgba(160,162,175,.1)] hover:shadow-[0_6px_24px_rgba(46,92,229,.1)] px-4 py-2 cursor-pointer"
      v-for="episode in episodes.filter(
        (e) => Number(e.season) === currentSeason
      )"
      :episode="episode"
      v-model="copiedLink"
    />
  </ul>
</template>
