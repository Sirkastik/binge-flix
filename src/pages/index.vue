<script setup lang="ts">
const library = useLibrary();

onMounted(library.getList);
</script>

<template>
  <home-header />
  <ul class="flex flex-col gap-6">
    <home-series-item
      v-for="series in library.list.value"
      :key="series.title"
      :series="series"
      @click.self="$router.push(`/series/${series.title}`)"
      @delete="library.deleteSeries"
    />
  </ul>
</template>
