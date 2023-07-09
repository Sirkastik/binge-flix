<script setup lang="ts">
const library = useLibrary();

const episodes = ref<Episode[]>([]);
const copiedLink = ref("");
const currentSeason = ref(1);

const title = computed(() => useRoute().params.title as string);

const series = computed(() => {
  return library.list.value.find((s) => s.title === title.value);
});

const seasonEpisodes = computed(() => {
  return episodes.value.filter((e) => Number(e.season) === currentSeason.value);
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
  library.getEpisodes(title.value).then((result) => {
    episodes.value = result;
    if (!result.length) return;
    currentSeason.value = Number(result[0].season);
  });
});

watch(copiedLink, copyLinkToClipboard);
</script>

<template>
  <series-header :series="series" :max="latestSeason" v-model="currentSeason" />
  <ul class="flex flex-col gap-4 mt-4">
    <series-episode-item
      v-for="episode in seasonEpisodes"
      :episode="episode"
      v-model="copiedLink"
      @click="copyLinkToClipboard(episode.url)"
    />
  </ul>
</template>
