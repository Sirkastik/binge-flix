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
  <series-header :series="series" :max="latestSeason" v-model="currentSeason" />
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
